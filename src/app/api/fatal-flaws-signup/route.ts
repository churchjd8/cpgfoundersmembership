import { NextResponse } from "next/server";
import { submitToKajabiForm } from "@/lib/kajabi";

const FATAL_FLAWS_FORM_ID = "2149711410";

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json();

    if (typeof name !== "string" || !name.trim() || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Name and a valid email are required." }, { status: 400 });
    }

    await submitToKajabiForm(FATAL_FLAWS_FORM_ID, {
      name: name.trim(),
      email: email.trim(),
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Fatal Flaws webinar signup error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
