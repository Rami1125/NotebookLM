import { pendingMigrations } from "../../scripts/migration-plan.mjs";
import { postgresPoolConfig, resolveDatabaseUrl } from "./database-url";

/** Which database backend is active. */
export type DbSource = "neon" | "pglite";

// Prefer DATABASE_URL, then Vercel \u2194 Supabase integration (POSTGRES_URL, \u2026).
const databaseUrl = resolveDatabaseUrl(
  typeof process !== "undefined" ? process.env : {},
);

/**
 * Active backend: real **Postgres** when a connection string is set (deployed /
 * Supabase / Neon), otherwise a local embedded **PGLite**.
 */
export const dbSource: DbSource = databaseUrl ? "neon" : "pglite";

/**
 * Minimal shared SQL surface, satisfied by both Neon and PGLite.
 */
export interface Sql {
  <T = Record<string, unknown>>(
    strings: TemplateStringsArray,
    ...values: unknown[]
  ): Promise<T[]>;
  query<T = Record<string, unknown>>(
    text: string,
    params?: unknown[],
  ): Promise<T[]>;
}

type Backend =
  | { kind: "neon"; sql: Sql }
  | { kind: "pglite"; sql: Sql; driver: import("@electric-sql/pglite").PGlite };

const globalBoot = globalThis as typeof globalThis & {
  __pgBackendPromise__?: Promise<Backend>;
  __pgBootstrapPromise__?: Promise<void>;
};

function isConnectionError(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err);
  return /ECONNREFUSED|ENOTFOUND|ETIMEDOUT|connection terminated|Connection terminated|password authentication failed|SELF_SIGNED_CERT|certificate/i.test(
    msg,
  );
}

function makeSql(
  run: (text: string, params: unknown[]) => Promise<Record<string, unknown>[]>,
): Sql {
  async function query<T = Record<string, unknown>>(
    text: string,
    params: unknown[] = [],
  ): Promise<T[]> {
    const rows = await run(text, params);
    return rows as T[];
  }
  function sql<T = Record<string, unknown>>(
    strings: TemplateStringsArray,
    ...values: unknown[]
  ): Promise<T[]> {
    let text = strings[0] ?? "";
    const params: unknown[] = [];
    for (let i = 0; i < values.length; i += 1) {
      params.push(values[i]);
      text += `$${params.length}${strings[i + 1] ?? ""}`;
    }
    return query<T>(text, params);
  }
  sql.query = query;
  return sql as Sql;
}

async function initNeon(connectionString: string): Promise<Backend> {
  const { default: pg } = await import("pg");
  // SSL: Supabase on Vercel triggers SELF_SIGNED_CERT_IN_CHAIN without this.
  const pool = new pg.Pool(postgresPoolConfig(connectionString));
  const sql = makeSql(async (text, params) => {
    const result = await pool.query(text, params);
    return result.rows as Record<string, unknown>[];
  });
  return { kind: "neon", sql };
}

async function initPglite(): Promise<Backend> {
  const { PGlite } = await import("@electric-sql/pglite");
  const driver = new PGlite();
  for (const migration of pendingMigrations as { id?: string; sql: string }[]) {
    try {
      await driver.exec(migration.sql);
    } catch {
      /* already applied / partial */
    }
  }
  const sql = makeSql(async (text, params) => {
    const result = await driver.query(text, params);
    return (result.rows ?? []) as Record<string, unknown>[];
  });
  return { kind: "pglite", sql, driver };
}

async function initBackend(): Promise<Backend> {
  if (databaseUrl) {
    try {
      return await initNeon(databaseUrl);
    } catch (err) {
      if (!isConnectionError(err)) throw err;
      console.error(
        "[db] Postgres connection failed, falling back to PGLite for this process:",
        err instanceof Error ? err.message : err,
      );
    }
  }
  return initPglite();
}

function getBackend(): Promise<Backend> {
  if (!globalBoot.__pgBackendPromise__) {
    globalBoot.__pgBackendPromise__ = initBackend().catch((err) => {
      globalBoot.__pgBackendPromise__ = undefined;
      throw err;
    });
  }
  return globalBoot.__pgBackendPromise__;
}

/** Get the shared, server-only SQL client. */
export function getSql(): Promise<Sql> {
  if (typeof window !== "undefined") {
    return Promise.reject(
      new Error(
        "@/lib/db is server-only \u2014 call getSql() from a createServerFn handler " +
          "or other server code, not from the browser.",
      ),
    );
  }
  return getBackend().then((b) => b.sql);
}

/** PGLite instance (preview / fallback path). */
export async function getPglite(): Promise<import("@electric-sql/pglite").PGlite> {
  const backend = await getBackend();
  if (backend.kind !== "pglite") {
    throw new Error(
      "getPglite() is only available on the PGLite fallback (no DATABASE_URL / POSTGRES_URL)",
    );
  }
  return backend.driver;
}

/** Ensure the database backend is ready. */
export function ensureDbReady(): Promise<void> {
  return getSql().then(() => undefined);
}

if (typeof window === "undefined") {
  globalBoot.__pgBootstrapPromise__ ??= ensureDbReady().catch((err) => {
    console.error("[db] bootstrap failed:", err instanceof Error ? err.message : err);
  });
}
