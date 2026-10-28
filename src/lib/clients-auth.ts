// Shared-password gate for /clients (the billing board for Jeff and Joshua).
// Separate from the admin password so it can be handed to Jeff on its own.
// The cookie holds a SHA-256 token derived from CLIENTS_PASSWORD.

export const CLIENTS_COOKIE = "cpg_clients";

export async function clientsToken(): Promise<string> {
  const secret = process.env.CLIENTS_PASSWORD || "";
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`cpg-clients:${secret}`));
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function isClientsViewer(token?: string): Promise<boolean> {
  return Boolean(token && process.env.CLIENTS_PASSWORD && token === (await clientsToken()));
}
