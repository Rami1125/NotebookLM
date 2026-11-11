/**
 * Secure admin bootstrap for production when Grok OAuth is unavailable.
 * Requires SABAN_BOOTSTRAP_SECRET + SABAN_ADMIN_BOOTSTRAP_PASSWORD in Vercel.
 */
import { auth } from "@/lib/auth/server";
import { getSql } from "@/lib/db";

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
  | { ok: true; message: string; email: string }
  | { ok: false; error: string }
> {
  const expected = bootstrapSecret();
  if (!expected) {
    return {
      ok: false,
      error: "Bootstrap לא מוגדר. הגדירו SABAN_BOOTSTRAP_SECRET ב-Vercel.",
    };
  }
  if (!secret || secret !== expected) {
    return { ok: false, error: "מפתח bootstrap שגוי." };
  }

  const password = process.env.SABAN_ADMIN_BOOTSTRAP_PASSWORD?.trim();
  if (!password || password.length < 8) {
    return {
      ok: false,
      error: "הגדירו SABAN_ADMIN_BOOTSTRAP_PASSWORD (לפחות 8 תווים) ב-Vercel.",
    };
  }

  try {
    try {
      await auth.api.signUpEmail({
        body: {
          email: RAMI.email,
          password,
          name: RAMI.name,
        },
      });
    } catch {
      /* already exists */
    }

    try {
      await auth.api.signInEmail({
        body: {
          email: RAMI.email,
          password,
          rememberMe: true,
        },
      });
    } catch {
      return {
        ok: false,
        error:
          "החשבון קיים אך הסיסמה ב-SABAN_ADMIN_BOOTSTRAP_PASSWORD אינה תואמת. עדכנו או השתמשו בטופס למעלה.",
      };
    }

    const sql = await getSql();
    const users = await sql<{ id: string; email: string }>`
      select id, email from "user" where lower(email) = lower(${RAMI.email}) limit 1`;
    const user = users[0];
    if (!user) {
      return { ok: false, error: "המשתמש לא נוצר במסד." };
    }

    await sql`
      insert into members (user_id, name, email, role, status)
      values (${user.id}, ${RAMI.name}, ${user.email}, 'ADMIN', 'ACTIVE')
      on conflict (user_id) do update set
        role = 'ADMIN',
        status = 'ACTIVE',
        name = excluded.name,
        email = excluded.email`;

    return {
      ok: true,
      email: RAMI.email,
      message:
        "חשבון מנהל מוכן. אם לא הועברתם אוטומטית — התחברו עם הדוא\"ל והסיסמה בטופס למעלה.",
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Bootstrap נכשל",
    };
  }
}
