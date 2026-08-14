import { NextResponse } from "next/server";
import { submitToKajabiForm, BOOK_WAITLIST_FORM_ID } from "@/lib/kajabi";

export async function POST(request: Request) {
  try {
    const { email, first_name } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await submitToKajabiForm(BOOK_WAITLIST_FORM_ID, { name: first_name, email });

    console.log(`Book waitlist: ${first_name} <${email}>`);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Book waitlist error:", err);
    return NextResponse.json({ error: "Failed to sign up" }, { status: 500 });
  }
}
