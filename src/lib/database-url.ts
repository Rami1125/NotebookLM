/**
 * Resolve the Postgres connection string for deploy.
 *
 * Priority:
 * 1. DATABASE_URL (explicit / Neon-style)
 * 2. POSTGRES_URL (Vercel \u2194 Supabase integration, pooled)
 * 3. POSTGRES_URL_NON_POOLING (direct)
 * 4. POSTGRES_PRISMA_URL (last resort)
 *
 * Empty/whitespace values are treated as unset so we never pass a blank string
 * into `pg` / Better Auth.
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
