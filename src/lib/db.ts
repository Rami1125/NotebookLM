import { pendingMigrations } from "../../scripts/migration-plan.mjs";
import { resolveDatabaseUrl } from "./database-url";

/** Which database backend is active. */
export type DbSource = "neon" | "pglite";

// Prefer DATABASE_URL, then Vercel \u2194 Supabase integration (POSTGRES_URL, \u2026).
const databaseUrl = resolveDatabaseUrl(
  typeof process !== "undefined" ? process.env : {},
);

/**
 * Active backend: real **Neon** when a Postgres URL is set (deployed / configured
 * sandbox), otherwise a local embedded **PGLite** (Postgres compiled to WASM) so
 * the app has a working database even with nothing configured \u2014 the live preview
 * included. Vercel Supabase integration sets POSTGRES_URL automatically.
 */
export const dbSource: DbSource = databaseUrl ? "neon" : "pglite";

/**
 * Minimal shared SQL surface, satisfied by both Neon and PGLite. Both the
 * tagged-template and `.query()` forms resolve to an array of row objects:
 *
 *   const sql = await getSql();
 *   const rows = await sql`select * from todos where id = ${id}`; // parameterized
 *   const rows2 = await sql.query("select * from todos where id = $1", [id]);
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

/**
 * Result of a one-time backend init. Kept on `globalThis` so Vite SSR HMR reloads
 * of this module still reuse the same Pool / PGlite instance (and the same applied
 * migrations) for the life of the process.
 *
 * The Promise itself is also cached: concurrent `getSql()` callers during the first
 * init share one init in flight rather than each starting their own (and racing on
 * `pendingMigrations`). A failed init clears its slot so the next call retries.
 */
type Backend = { kind: "neon"; sql: Sql } | { kind: "pglite"; sql: Sql; driver: import("@electric-sql/pglite").PGlite };

const globalBoot = globalThis as typeof globalThis & {
  __pgBackendPromise__?: Promise<Backend>;
  __pgBootstrapPromise__?: Promise<void>;
};

function isConnectionError(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err);
  return /ECONNREFUSED|ENOTFOUND|ETIMEDOUT|connection terminated|Connection terminated|password authentication failed|SSL/i.test(
    msg,
  );
}

/**
 * Tagged-template + `.query()` wrapper over a row-returning async function.
 * Shared by both backends so the rest of the app never branches on driver.
 */
function makeSql(run: (text: string, params: unknown[]) => Promise<Record<string, unknown>[]>): Sql {
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
  const pool = new pg.Pool({ connectionString });
  const sql = makeSql(async (text, params) => {
    const result = await pool.query(text, params);
    return result.rows as Record<string, unknown>[];
  });
  return { kind: "neon", sql };
}

async function initPglite(): Promise<Backend> {
  const { PGlite } = await import("@electric-sql/pglite");
  const driver = new PGlite();
  // Apply pending migrations once per process for the in-memory preview DB.
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

/**
 * Get the shared, **server-only** SQL client. Postgres when a connection string
 * is set (DATABASE_URL or Vercel Supabase POSTGRES_URL), otherwise PGLite.
 *
 * Throws when called in the browser bundle.
 */
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

/**
 * PGLite instance (preview / no connection string path).
 */
export async function getPglite(): Promise<import("@electric-sql/pglite").PGlite> {
  const backend = await getBackend();
  if (backend.kind !== "pglite") {
    throw new Error(
      "getPglite() is only available on the PGLite fallback (no DATABASE_URL / POSTGRES_URL)",
    );
  }
  return backend.driver;
}

/**
 * Ensure the database backend is ready (and migrations applied for PGLite).
 * Safe to call multiple times; concurrent callers share one init.
 */
export function ensureDbReady(): Promise<void> {
  return getSql().then(() => undefined);
}

// Eager bootstrap on the server so the first request does not pay full init cost.
// Node only. Client bundles never hit this path (`getSql` throws in the browser).
if (typeof window === "undefined") {
  globalBoot.__pgBootstrapPromise__ ??= ensureDbReady().catch((err) => {
    console.error("[db] bootstrap failed:", err instanceof Error ? err.message : err);
  });
}
