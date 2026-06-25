// Shared-password gate for the admin panel. The cookie holds a token derived
// from ADMIN_PASSWORD via SHA-256, so it can't be forged without the password.
// Uses Web Crypto so it works in both edge middleware and node route handlers.

export const ADMIN_COOKIE = "cpg_admin";

export async function expectedToken(): Promise<string> {
  const secret = process.env.ADMIN_PASSWORD || "";
  const data = new TextEncoder().encode(`cpg-admin:${secret}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function isValidToken(token: string | undefined): Promise<boolean> {
  if (!token || !process.env.ADMIN_PASSWORD) return false;
  return token === (await expectedToken());
}
