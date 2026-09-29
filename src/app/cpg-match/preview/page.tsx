import Link from "next/link";
import { loadPublicReviews } from "@/lib/cpg-match-public";
import { PublicReviewCard } from "@/components/cpg-match/public-review";
export const dynamic = "force-dynamic";
export default async function Page() {
  let reviews: Awaited<ReturnType<typeof loadPublicReviews>> = [];
  let unavailable = false;
  try { reviews = await loadPublicReviews(); } catch { unavailable = true; }
  return <main className="mx-auto max-w-5xl px-5 py-12"><h1 className="text-3xl font-bold">Founder-approved vendor reviews</h1><p className="mt-3 text-muted">Customer-reported experiences, privately verified before publication. Historical spending is not a current vendor quote.</p><div className="mt-8 space-y-6">{reviews.map(({ id, review }) => <div key={id}><PublicReviewCard review={review} /><Link href={`/cpg-match/preview/${id}`} className="mt-2 inline-block text-sm font-semibold text-accent">View review →</Link></div>)}{!reviews.length && <p className="rounded-xl border border-border bg-white p-6">{unavailable ? "Reviews are temporarily unavailable. Please try again later." : "Reviews will appear here after the reviewer approves the public content and CPG Match completes private verification."}</p>}</div></main>;
}
