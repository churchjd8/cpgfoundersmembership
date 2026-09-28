import { notFound } from "next/navigation";
import { loadPublicReviews } from "@/lib/cpg-match-public";
import { PublicReviewCard } from "@/components/cpg-match/public-review";
export const dynamic = "force-dynamic";
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const row = (await loadPublicReviews()).find(review => review.id === slug);
  if (!row) notFound();
  return <main className="mx-auto max-w-3xl px-5 py-12"><PublicReviewCard review={row.review} /></main>;
}
