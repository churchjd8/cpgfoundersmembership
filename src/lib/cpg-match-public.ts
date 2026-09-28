import { getSupabaseAdmin } from "@/lib/supabase";
import { publishedReview, type PublicReview } from "@/lib/cpg-match-review";
export async function loadPublicReviews(): Promise<
  { id: string; review: PublicReview }[]
> {
  const db = getSupabaseAdmin();
  if (!db) throw new Error("Database unavailable");
  const reviews: { id: string; review: PublicReview }[] = [];
  for (let offset = 0; ; offset += 1000) {
    // Private answers and contact columns are never selected by public readers.
    const { data, error } = await db
      .from("cpg_match_submissions")
      .select(
        "id,review_schema_version,publication_status,verified_at,approved_at,public_review",
      )
      .eq("submission_type", "recommendation")
      .eq("publication_status", "published")
      .eq("review_schema_version", 2)
      .order("id")
      .range(offset, offset + 999);
    if (error) throw new Error("Could not load public reviews");
    for (const row of data) {
      const review = publishedReview(row);
      if (review) reviews.push({ id: row.id, review });
    }
    if (data.length < 1000) return reviews;
  }
}
