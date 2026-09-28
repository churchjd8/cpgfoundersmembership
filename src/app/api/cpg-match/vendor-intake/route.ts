import { getSupabaseAdmin } from "@/lib/supabase";
import { parseVendorIntake } from "@/lib/cpg-match-vendor-intake";
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || Array.isArray(body))
    return Response.json(
      { error: "Invalid vendor information." },
      { status: 400 },
    );
  let data: Record<string, string>;
  try {
    data = parseVendorIntake(body);
  } catch (cause) {
    return Response.json(
      {
        error:
          cause instanceof Error
            ? cause.message
            : "Invalid vendor information.",
      },
      { status: 400 },
    );
  }
  const db = getSupabaseAdmin();
  if (!db)
    return Response.json(
      { error: "Submissions are temporarily unavailable." },
      { status: 503 },
    );
  const confirmedAt = new Date().toISOString();
  const { error } = await db
    .from("cpg_match_vendor_intakes")
    .insert({
      vendor_name: data.vendorName,
      category: data.category,
      inquiry_email: data.inquiryEmail,
      payload: {
        ...data,
        source: "Vendor-provided information",
        confirmed: true,
        publicationConsent: true,
      },
      confirmed_at: confirmedAt,
    });
  if (error) {
    console.error("CPG Match vendor intake error:", error);
    return Response.json(
      { error: "Could not save vendor information. Please try again." },
      { status: 500 },
    );
  }
  return Response.json({ success: true, confirmedAt });
}
