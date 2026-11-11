/**
 * Secure one-shot admin bootstrap for production when Grok OAuth is unavailable.
 * Requires SABAN_BOOTSTRAP_SECRET in the server environment. Never expose the
 * secret in client code — pass it once via /login?key=… or a manual field.
 */
import { randomBytes } from "node:crypto";
import { auth } from "@/lib/auth/server";
import { getSql } from "@/lib/db";
import { isPrimaryAdminEmail } from "./admin-emails";

const RAMI = {
  email: "rami.msarwa1@gmail.com",
  name: "ראמי מסארווה",
} as const;

function bootstrapSecret(): string | undefined {
  return process.env.SABAN_BOOTSTRAP_SECRET?.trim() || undefined;
}

export function isBootstrapConfigured(): boolean {
  return Boolean(bootstrapSecret());
}

export async function bootstrapRamiAdmin(secret: string): Promise<
  | { ok: true; redirectTo: string }
  | { ok: false; error: string }
> {
  const expected = bootstrapSecret();
  if (!expected) {
    return {
      ok: false,
      error: "Bootstrap לא מוגדר בשרת. הגדירו SABAN_BOOTSTRAP_SECRET ב-Vercel.",
    };
  }
  if (!secret || secret !== expected) {
    return { ok: false, error: "מפתח bootstrap שגוי." };
  }

  const password =
    process.env.SABAN_ADMIN_BOOTSTRAP_PASSWORD?.trim() ||
    `Saban!${randomBytes(12).toString("base64url")}`;

  try {
    // Ensure account exists (ignore "already exists")
    try {
      await auth.api.signUpEmail({
        body: {
          email: RAMI.email,
          password,
          name: RAMI.name,
        },
      });
    } catch {
      /* user may already exist */
    }

    const signed = await auth.api.signInEmail({
      body: {
        email: RAMI.email,
        password,
        rememberMe: true,
      },
      returnHeaders: true,
    });

    // Force ADMIN membership for the primary operator email
    const sql = await getSql();
    const users = await sql<{ id: string; email: string }>`
      select id, email from "user" where lower(email) = lower(${RAMI.email}) limit 1`;
    const user = users[0];
    if (user) {
      await sql`
        insert into members (user_id, name, email, role, status)
        values (${user.id}, ${RAMI.name}, ${user.email}, 'ADMIN', 'ACTIVE')
        on conflict (user_id) do update set
          role = 'ADMIN',
          status = 'ACTIVE',
          name = excluded.name,
          email = excluded.email`;
    }

    // Better Auth sets Set-Cookie via return headers when available; TanStack
    // cookie bridge on the auth routes normally handles this. For server fn we
    // rely on the sign-in API having written the session.
    void signed;

    if (!isPrimaryAdminEmail(RAMI.email)) {
      return { ok: false, error: "כתובת המנהל לא תואמת להגדרה." };
    }

    return { ok: true, redirectTo: "/" };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Bootstrap נכשל",
    };
  }
}
