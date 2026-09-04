import { NextResponse } from "next/server";
import { CPG_MATCH_ADMIN_COOKIE, cpgMatchAdminToken } from "@/lib/cpg-match-admin-auth";

export async function POST(request: Request) {
  const { password } = await request.json().catch(() => ({ password: "" }));
  if (!process.env.CPG_MATCH_ADMIN_PASSWORD || password !== process.env.CPG_MATCH_ADMIN_PASSWORD) return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  const response = NextResponse.json({ success: true });
  response.cookies.set(CPG_MATCH_ADMIN_COOKIE, await cpgMatchAdminToken(), { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30 });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(CPG_MATCH_ADMIN_COOKIE, "", { path: "/", maxAge: 0 });
  return response;
}
