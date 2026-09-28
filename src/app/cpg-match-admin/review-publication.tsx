"use client";
import { useState } from "react";
import type { Entry } from "@/lib/cpg-match-submissions";
import { PublicReviewCard } from "@/components/cpg-match/public-review";
export function ReviewPublication({
  entry,
  onSaved,
}: {
  entry: Entry;
  onSaved: (entry: Entry) => void;
}) {
  const [verified, setVerified] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const published = entry.publication_status === "published";
  async function publish() {
    setBusy(true);
    setError("");
    try {
      const response = await fetch(
        `/api/cpg-match-admin/submissions/${entry.id}/publication`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ publish: !published, verified }),
        },
      );
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      onSaved(result);
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Could not update publication.",
      );
    } finally {
      setBusy(false);
    }
  }
  if (
    entry.review_schema_version !== 2 ||
    !entry.public_review ||
    !entry.approved_at
  )
    return (
      <p className="mt-6 rounded-lg bg-background p-4 text-sm">
        Historical submission: no consent recorded for the current publication
        policy. Keep private; request a newly approved review before publishing.
        CRM status does not grant publication consent.
      </p>
    );
  return (
    <section className="mt-6 border-t border-border pt-5">
      <h3 className="font-bold">
        Publication: {published ? "Published" : "Awaiting private verification"}
      </h3>
      <p className="mt-2 text-sm text-muted">
        Only this reviewer-approved snapshot may be published. Raw answers,
        private commercial details, sourcing requests and CRM notes remain
        internal.
      </p>
      <details className="mt-3">
        <summary className="cursor-pointer font-semibold">
          See exactly what the reviewer approved
        </summary>
        <div className="mt-3">
          <PublicReviewCard review={entry.public_review} />
        </div>
      </details>
      {!published && (
        <label className="mt-4 flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            checked={verified}
            onChange={(e) => setVerified(e.target.checked)}
            className="mt-1"
          />
          I have privately verified this reviewer’s first-hand experience and
          checked the approved public content for identifying details.
        </label>
      )}
      <button
        type="button"
        onClick={publish}
        disabled={busy || (!published && !verified)}
        className="mt-4 rounded-lg border border-accent px-4 py-2 font-semibold text-accent disabled:opacity-50"
      >
        {busy
          ? "Saving…"
          : published
            ? "Unpublish review"
            : "Publish approved review"}
      </button>
      {error && (
        <p role="alert" className="mt-3 text-sm text-red-700">
          {error}
        </p>
      )}
    </section>
  );
}
