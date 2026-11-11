/**
 * Local email/password sign-in (this app's Better Auth DB — not the broker).
 *
 * ENABLED for SABAN Creative Studio production on Vercel.
 * Sign-up / sign-in forms use `authClient.signUp.email` / `authClient.signIn.email`
 * from `@/lib/auth/client` (see LoginPanel in shell.tsx).
 *
 * Do NOT edit `server.ts` for this — that file is frozen pre-wired config.
 * Must stay `true` so production users can register and log in.
 */
export const emailAndPasswordEnabled = true;
