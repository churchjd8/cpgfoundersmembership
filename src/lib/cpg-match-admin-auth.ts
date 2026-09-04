export const CPG_MATCH_ADMIN_COOKIE = "cpg_match_admin";

export async function cpgMatchAdminToken() {
  const secret = process.env.CPG_MATCH_ADMIN_PASSWORD || "";
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`cpg-match-admin:${secret}`));
  return [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, "0")).join("");
}

export async function isCpgMatchAdmin(token?: string) {
  return Boolean(token && process.env.CPG_MATCH_ADMIN_PASSWORD && token === await cpgMatchAdminToken());
}
