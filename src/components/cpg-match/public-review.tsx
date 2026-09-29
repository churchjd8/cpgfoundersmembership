import type { PublicReview } from "@/lib/cpg-match-review";

// The only review renderer used by public profiles and the consent preview.
export function PublicReviewCard({ review }: { review: PublicReview }) {
  return (
    <article className="rounded-xl border border-border bg-white p-5 text-left">
      <p className="text-xs font-bold uppercase tracking-wide text-muted">
        {review.source}
      </p>
      <h3 className="mt-2 text-xl font-bold">{review.vendor}</h3>
      <p className="mt-1 text-sm text-muted">{review.category.join(", ")}</p>
      <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-relaxed">
        {review.text}
      </p>
      <p className="mt-4 font-semibold">{review.attribution}</p>
      <dl className="mt-4 space-y-2 text-sm">
        <div>
          <dt className="font-semibold">Project scope</dt>
          <dd className="whitespace-pre-wrap">{review.context.scope}</dd>
        </div>
        {review.context.engagement && (
          <div>
            <dt className="font-semibold">Engagement timing</dt>
            <dd>{review.context.engagement}</dd>
          </div>
        )}
        {review.context.companyStage && (
          <div>
            <dt className="font-semibold">
              Company stage during this engagement
            </dt>
            <dd>{review.context.companyStage}</dd>
          </div>
        )}
      </dl>
      {review.commercial && (
        <section className="mt-4 rounded-lg bg-background p-4 text-sm">
          <h4 className="font-bold">Historical engagement details</h4>
          <p className="mt-1 text-muted">{review.commercial.notice}</p>
          <p className="mt-2">Engagement: {review.commercial.engagement}</p>
          <p>Scope: {review.commercial.scope}</p>
          {review.commercial.amountOrRange && (
            <p className="mt-2">
              Approximate spend: {review.commercial.amountOrRange}{" "}
              {review.commercial.currency} · {review.commercial.basis}
            </p>
          )}
          {review.commercial.covers && (
            <p className="mt-2 whitespace-pre-wrap">
              Covered: {review.commercial.covers}
            </p>
          )}
          {review.commercial.terms && (
            <p className="mt-2 whitespace-pre-wrap">
              Minimums, terms, extra costs or lead times:{" "}
              {review.commercial.terms}
            </p>
          )}
        </section>
      )}
    </article>
  );
}
