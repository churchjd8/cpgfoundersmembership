import { NextResponse } from "next/server";
import { submitToKajabiForm } from "@/lib/kajabi";

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json();

    if (typeof name !== "string" || !name.trim() || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Name and a valid email are required." }, { status: 400 });
    }

    const formId = process.env.KAJABI_FATAL_FLAWS_FORM_ID;
    if (!formId) {
      console.error("Fatal Flaws signup is missing KAJABI_FATAL_FLAWS_FORM_ID");
      return NextResponse.json({ error: "Registration is not configured." }, { status: 503 });
    }

    await submitToKajabiForm(formId, { name: name.trim(), email: email.trim() });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Fatal Flaws webinar signup error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
