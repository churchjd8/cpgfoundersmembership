import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE, isValidToken } from "@/lib/admin-auth";

export async function middleware(req: NextRequest) {
  const host = (req.headers.get("host") || "").split(":")[0];
  const onAdminSubdomain = host.startsWith("admin.");

  const url = req.nextUrl.clone();
  let pathname = url.pathname;
  let doRewrite = false;

  // Serve the admin panel at the root of the admin subdomain by mapping its
  // paths onto the /admin route tree. (API routes are left untouched.)
  if (onAdminSubdomain && !pathname.startsWith("/admin") && !pathname.startsWith("/api")) {
    url.pathname = pathname === "/" ? "/admin" : `/admin${pathname}`;
    pathname = url.pathname;
    doRewrite = true;
  }

  // Everything outside the /admin tree passes straight through unchanged.
  if (!pathname.startsWith("/admin")) return NextResponse.next();

  // Gate the /admin tree (login page excepted).
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
