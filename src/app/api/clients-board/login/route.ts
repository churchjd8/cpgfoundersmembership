import { NextResponse } from "next/server";
import { CLIENTS_COOKIE, clientsToken } from "@/lib/clients-auth";

export async function POST(request: Request) {
  const { password } = await request.json().catch(() => ({ password: "" }));
  if (!process.env.CLIENTS_PASSWORD || password !== process.env.CLIENTS_PASSWORD) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }
  const res = NextResponse.json({ success: true });
  res.cookies.set(CLIENTS_COOKIE, await clientsToken(), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.set(CLIENTS_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
