import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { submitToKajabiForm } from "@/lib/kajabi";
import {
  FOUNDER_COOKIE_MAX_AGE,
  FOUNDER_OFFER_COOKIE,
  TRAINING_KAJABI_FORM_ID,
  createFounderOfferToken,
  readFounderOfferToken,
} from "@/lib/founder-offer";

// Kajabi form "MBA Funnel - Free Training Registration".
// Fields: name, email, custom_2 = Business Name,
// custom_3 = "What stage is your brand currently in?" (radio).

// Our landing-page stage options → Kajabi's radio option strings (must match exactly).
const KAJABI_STAGE: Record<string, string> = {
  "Planning to launch": "🧪 Idea / Pre-launch (not selling yet)",
  "Launched, under $500K": "🚀 Launched (early sales, building consistency)",
  "$500K–$1M": "🛒 Growing / Scaling (repeatable growth + traction)",
  "$1M+": "📈 Established (strong sales + team + systems)",
};

export async function POST(request: Request) {
  try {
    const { name, email, business, stage } = await request.json();

    if (typeof name !== "string" || !name.trim() || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Name and a valid email are required." }, { status: 400 });
    }

    const businessName = typeof business === "string" && business.trim() ? business.trim() : "Not provided";
    const kajabiStage = typeof stage === "string" ? KAJABI_STAGE[stage] : undefined;

    await submitToKajabiForm(TRAINING_KAJABI_FORM_ID, {
      name: name.trim(),
      email: email.trim(),
      custom_2: businessName,
      ...(kajabiStage ? { custom_3: kajabiStage } : {}),
    });

    // Registering starts the founder-price window. Someone who registers a
    // second time keeps their original deadline.
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Free training signup error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
