/**
 * Resolve the Postgres connection string for deploy.
 *
 * Priority:
 * 1. DATABASE_URL (explicit)
 * 2. POSTGRES_URL (Vercel \u2194 Supabase integration, pooled)
 * 3. POSTGRES_URL_NON_POOLING (direct)
 * 4. POSTGRES_PRISMA_URL (last resort)
 */
export function resolveDatabaseUrl(
  env: NodeJS.ProcessEnv = process.env,
): string | undefined {
  const keys = [
    "DATABASE_URL",
    "POSTGRES_URL",
    "POSTGRES_URL_NON_POOLING",
    "POSTGRES_PRISMA_URL",
  ] as const;

  for (const key of keys) {
    const value = env[key]?.trim();
    if (value) return value;
  }
  return undefined;
}

/**
 * pg Pool config for Supabase / Vercel.
 * Supabase terminates TLS with a cert chain Node may not trust in serverless
 * (SELF_SIGNED_CERT_IN_CHAIN). rejectUnauthorized:false is the standard
 * approach for managed Postgres over require-SSL links.
 */
export function postgresPoolConfig(connectionString: string): {
  connectionString: string;
  ssl: { rejectUnauthorized: boolean } | undefined;
} {
  const url = connectionString.trim();
  const needsSsl =
    /supabase\.co|pooler\.supabase|sslmode=require|ssl=true/i.test(url) ||
    process.env.PGSSLMODE === "require" ||
    process.env.NODE_ENV === "production";

  return {
    connectionString: url,
    ssl: needsSsl ? { rejectUnauthorized: false } : undefined,
  };
}
