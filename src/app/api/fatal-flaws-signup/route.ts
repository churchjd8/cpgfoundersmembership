import { NextResponse } from "next/server";
import { submitToKajabiForm } from "@/lib/kajabi";

// Kajabi form "9.15 Fatal Flaws Webinar Registration".
// Fields: name, email, custom_2 = Business Name (required),
// custom_3 = "What stage is your brand currently in?" (radio, optional).
const FATAL_FLAWS_FORM_ID = "2149711410";

// Our landing-page stage options → Kajabi's radio option strings (must match exactly).
const KAJABI_STAGE: Record<string, string> = {
  "Idea / pre-launch": "🧪 Idea / Pre-launch (not selling yet)",
  "Launched, under $500K": "🚀 Launched (early sales, building consistency)",
  "$500K–$1M": "🛒 Growing / Scaling (repeatable growth + traction)",
  "$1M–$5M": "🛒 Growing / Scaling (repeatable growth + traction)",
  "$5M–$10M": "📈 Established (strong sales + team + systems)",
  "$10M+": "📈 Established (strong sales + team + systems)",
};

export async function POST(request: Request) {
  try {
    const { name, email, business, stage } = await request.json();

    if (typeof name !== "string" || !name.trim() || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Name and a valid email are required." }, { status: 400 });
    }

    const businessName = typeof business === "string" && business.trim() ? business.trim() : "Not provided";
    const kajabiStage = typeof stage === "string" ? KAJABI_STAGE[stage] : undefined;

    await submitToKajabiForm(FATAL_FLAWS_FORM_ID, {
      name: name.trim(),
      email: email.trim(),
      custom_2: businessName,
      ...(kajabiStage ? { custom_3: kajabiStage } : {}),
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Fatal Flaws webinar signup error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
