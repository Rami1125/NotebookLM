import { Pool } from "pg";
import { PGlite } from "@electric-sql/pglite";
import { pendingMigrations } from "../../scripts/migration-plan.mjs";
import { resolveDatabaseUrl } from "./database-url";

/** Which database backend is active. */
export type DbSource = "neon" | "pglite";

// Prefer DATABASE_URL, then Vercel Supabase integration vars (POSTGRES_*).
const databaseUrl = resolveDatabaseUrl(
  typeof process !== "undefined" ? process.env : {},
);

/**
 * Active backend: real **Postgres** when a connection string is set (deployed /
 * Supabase / Neon), otherwise a local embedded **PGLite** so the app has a
 * working database even with nothing configured — the live preview included.
 */
export const dbSource: DbSource = databaseUrl ? "neon" : "pglite";

/**
 * Minimal shared SQL surface, satisfied by both Neon and PGLite. Both the
 * tagged-template and `.query()` forms resolve to an array of row objects:
 *
 *   const sql = await getSql();
 *   const rows = await sql`select * from todos where id = ${id}`;
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
 * JSON-safe row shapes:
 *   int8/bigint (incl. count(*)) -> number (past 2^53 loses precision — cast
 *                                   `::text` if you ever need huge integers)
 *   date                         -> 'YYYY-MM-DD' string
 *   interval                     -> Postgres interval text
 * numeric already comes back as a string on both (arbitrary precision).
 */
const OID_INT8 = 20;
const OID_DATE = 1082;
const OID_INTERVAL = 1186;
const identity = (v: string) => v;

type Run = <T>(text: string, params: unknown[]) => Promise<T[]>;

/** Wrap a query runner in the tagged-template + `.query()` `Sql` surface. */
function toSql(run: Run): Sql {
  const sql = (async <T = Record<string, unknown>>(
    strings: TemplateStringsArray,
    ...values: unknown[]
  ): Promise<T[]> => {
    // Rebuild with $1, $2, … placeholders so values stay parameterized.
    let text = strings[0] ?? "";
    for (let i = 0; i < values.length; i += 1) text += `$${i + 1}${strings[i + 1] ?? ""}`;
    return run<T>(text, values);
  }) as Sql;

  sql.query = async <T = Record<string, unknown>>(text: string, params: unknown[] = []) =>
    run<T>(text, params);

  return sql;
}

const globalDb = globalThis as typeof globalThis & {
  __sabanPgPool__?: Pool;
  __sabanPglite__?: PGlite;
  __sabanPgliteReady__?: Promise<void>;
  __sabanSql__?: Sql;
};

async function createNeonSql(connectionString: string): Promise<Sql> {
  const pool = globalDb.__sabanPgPool__ ?? new Pool({ connectionString });
  globalDb.__sabanPgPool__ = pool;

  const run: Run = async <T>(text: string, params: unknown[]) => {
    const result = await pool.query({
      text,
      values: params,
      // Keep date/interval as text; let node-pg parse the rest.
      types: {
        getTypeParser: (oid: number, format?: string) => {
          if (oid === OID_DATE || oid === OID_INTERVAL) return identity;
          // Default parser
          const { types } = require("pg") as typeof import("pg");
          return types.getTypeParser(oid, format as "text" | "binary" | undefined);
        },
      },
    });
    // int8 -> number when safe
    return result.rows.map((row) => {
      const out: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(row as Record<string, unknown>)) {
        if (typeof v === "string" && /^\d+$/.test(v) && v.length <= 15) {
          // leave as-is unless field is clearly a count — better-auth may need strings for ids
          out[k] = v;
        } else if (typeof v === "bigint") {
          out[k] = Number(v);
        } else {
          out[k] = v;
        }
      }
      return out as T;
    });
  };

  return toSql(run);
}

async function ensurePglite(): Promise<PGlite> {
  if (globalDb.__sabanPglite__) return globalDb.__sabanPglite__;
  const db = new PGlite();
  globalDb.__sabanPglite__ = db;
  return db;
}

async function createPgliteSql(): Promise<Sql> {
  const db = await ensurePglite();
  const run: Run = async <T>(text: string, params: unknown[]) => {
    const result = await db.query(text, params);
    return (result.rows ?? []) as T[];
  };
  return toSql(run);
}

let sqlPromise: Promise<Sql> | undefined;

/**
 * Get the shared, **server-only** SQL client. Postgres when a connection string
 * is set, otherwise PGLite.
 */
export async function getSql(): Promise<Sql> {
  if (globalDb.__sabanSql__) return globalDb.__sabanSql__;
  if (!sqlPromise) {
    sqlPromise = (async () => {
      const sql = databaseUrl
        ? await createNeonSql(databaseUrl)
        : await createPgliteSql();
      globalDb.__sabanSql__ = sql;
      return sql;
    })();
  }
  return sqlPromise;
}

/**
 * PGLite instance (preview / no connection string). Throws when Postgres URL is set.
 */
export async function getPglite(): Promise<PGlite> {
  if (databaseUrl) {
    throw new Error(
      "getPglite() is only available on the PGLite fallback (no DATABASE_URL / POSTGRES_URL)",
    );
  }
  return ensurePglite();
}

/**
 * Apply pending migrations. Safe to call multiple times.
 * - **Postgres** (Supabase / Neon): no-op here (migrations run at build via scripts)
 * - **PGLite**: open the in-memory DB and apply pending SQL from migration-plan
 */
export async function ensureDbReady(): Promise<void> {
  if (databaseUrl) return;
  if (globalDb.__sabanPgliteReady__) {
    await globalDb.__sabanPgliteReady__;
    return;
  }
  globalDb.__sabanPgliteReady__ = (async () => {
    const db = await ensurePglite();
    const pending = pendingMigrations as { id: string; sql: string }[];
    for (const migration of pending ?? []) {
      try {
        await db.exec(migration.sql);
      } catch {
        /* already applied / partial — ignore for preview bootstrap */
      }
    }
  })();
  await globalDb.__sabanPgliteReady__;
}
