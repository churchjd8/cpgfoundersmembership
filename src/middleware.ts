import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE, isValidToken } from "@/lib/admin-auth";
import { CPG_MATCH_ADMIN_COOKIE, isCpgMatchAdmin } from "@/lib/cpg-match-admin-auth";

export async function middleware(req: NextRequest) {
  const host = (req.headers.get("host") || "").split(":")[0];
  const onAdminSubdomain = host.startsWith("admin.");
  const onCpgMatchAdmin = host === "admin.cpgmatch.com";
  const onCpgMatchDomain = host === "cpgmatch.com" || host === "www.cpgmatch.com";

  const url = req.nextUrl.clone();
  let pathname = url.pathname;
  let doRewrite = false;

  // Give CPG Match its own root domain while keeping the launch page in this app.
  if (onCpgMatchDomain && pathname === "/") {
    url.pathname = "/cpg-match";
    pathname = url.pathname;
    doRewrite = true;
  }

  // Serve the admin panel at the root of the admin subdomain by mapping its
  // paths onto the /admin route tree. (API routes are left untouched.)
  if (onAdminSubdomain && !pathname.startsWith("/admin") && !pathname.startsWith("/api")) {
    const root = onCpgMatchAdmin ? "/cpg-match-admin" : "/admin";
    url.pathname = pathname === "/" ? root : `${root}${pathname}`;
    pathname = url.pathname;
    doRewrite = true;
  }

  // Paths outside /admin that still require a login. /jeff-budget carries the
  // full P&L — client counts, churn, cost structure, comp — so it is gated even
  // though it sits at the public root.
  const GATED_PATHS = ["/jeff-budget"];
  const isGatedPath = GATED_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );

  if (pathname.startsWith("/cpg-match-admin")) {
    if (pathname !== "/cpg-match-admin/login") {
      const token = req.cookies.get(CPG_MATCH_ADMIN_COOKIE)?.value;
      if (!(await isCpgMatchAdmin(token))) {
        const redirect = req.nextUrl.clone();
        redirect.pathname = onCpgMatchAdmin ? "/login" : "/cpg-match-admin/login";
        return NextResponse.redirect(redirect);
      }
    }
    return NextResponse.rewrite(url);
  }

  // Everything outside the /admin tree and the gated list passes straight through.
  if (!pathname.startsWith("/admin") && !isGatedPath) {
    return doRewrite ? NextResponse.rewrite(url) : NextResponse.next();
  }

  // Gate the /admin tree and the listed paths (login page excepted).
  if (pathname !== "/admin/login") {
    const token = req.cookies.get(ADMIN_COOKIE)?.value;
    if (!(await isValidToken(token))) {
      const redirect = req.nextUrl.clone();
      redirect.pathname = "/admin/login";
      redirect.searchParams.set("next", pathname);
      return NextResponse.redirect(redirect);
    }
  }

  return doRewrite ? NextResponse.rewrite(url) : NextResponse.next();
}

export const config = {
  // Run on everything except Next internals and static files (those have a dot).
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
