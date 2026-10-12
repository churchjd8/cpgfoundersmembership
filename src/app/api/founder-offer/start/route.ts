import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  FOUNDER_COOKIE_MAX_AGE,
  FOUNDER_OFFER_COOKIE,
  createFounderOfferToken,
  readFounderOfferToken,
} from "@/lib/founder-offer";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://cpgfoundersgroup.com";

// Someone who reaches the founder offer without a window (an email opened on
// a different device than the one they registered on) gets one started here,
// then goes back to the offer. An existing window, expired or not, is kept.
export async function GET() {
  const cookieStore = await cookies();
  if (!readFounderOfferToken(cookieStore.get(FOUNDER_OFFER_COOKIE)?.value)) {
    cookieStore.set(FOUNDER_OFFER_COOKIE, createFounderOfferToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: FOUNDER_COOKIE_MAX_AGE,
      path: "/",
    });
  }
  return NextResponse.redirect(`${SITE_URL}/mba-for-cpg/founder-offer`, 303);
}
