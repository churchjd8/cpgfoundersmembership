import { loadPublicReviews } from "@/lib/cpg-match-public";
export const dynamic = "force-dynamic";
export async function GET() {
  try {
    return Response.json(
      { reviews: await loadPublicReviews() },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json(
      { error: "Reviews are temporarily unavailable." },
      { status: 503 },
    );
  }
}
