// Routes that render without the public site header and footer. These are
// internal working pages (Jeff + Joshua), reached only by direct link.
export const CHROMELESS_PREFIXES = ["/cpt-launch-plan"];

// Exact paths only, for internal pages whose children are public. /clients is
// the billing board; /clients/schedule-session is client-facing.
export const CHROMELESS_PATHS = ["/clients"];

export function isChromeless(pathname: string | null): boolean {
  if (!pathname) return false;
  if (CHROMELESS_PATHS.includes(pathname)) return true;
  return CHROMELESS_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}
