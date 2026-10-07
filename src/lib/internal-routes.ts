// Routes that render without the public site header and footer. These are
// internal working pages (Jeff + Joshua), reached only by direct link.
export const CHROMELESS_PREFIXES = ["/cpt-launch-plan"];

export function isChromeless(pathname: string | null): boolean {
  if (!pathname) return false;
  return CHROMELESS_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}
