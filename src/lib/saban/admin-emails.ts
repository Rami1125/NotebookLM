/** Emails that always receive ADMIN role after successful authentication. */
export const SABAN_PRIMARY_ADMIN_EMAILS = ["rami.msarwa1@gmail.com"] as const;

export function isPrimaryAdminEmail(email: string | null | undefined): boolean {
  const normalized = (email ?? "").trim().toLowerCase();
  return SABAN_PRIMARY_ADMIN_EMAILS.some((item) => item === normalized);
}
