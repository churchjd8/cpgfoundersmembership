# CPG Match review and publication policy (v2)

The four-step review form records customer engagement timing separately from `created_at`.
Stage refers to the company involved in that engagement; an optional previous employer
is for private verification only. Historical spend has its own amount/range, currency,
basis, inclusions and terms. It never establishes a vendor's current pricing.

## Approval and privacy

- `payload` holds private intake answers, verification details, commercial research,
  sourcing requests and recorded choices. This column is never selected by public readers.
- The deterministic suggested draft uses only experience answers and always starts with
  vendor and project scope. It omits unanswered optional questions and ignores hidden
  positive-fit answers on negative or uncertain recommendations.
- When earlier answers change, an untouched draft refreshes. An edited draft is retained;
  the reviewer must explicitly use the new suggestion or keep their edit. Approval is
  reset whenever an answer or publication choice changes.
- `public_review` is an exact, server-built snapshot of approved text, attribution and
  selected context. Commercial context defaults to private. Public commercial context
  always includes historical timing, scope and a qualification about current prices.
- Names and current company are included only for named attribution. Verification email,
  previous employer, vendor contact, sourcing needs, CRM notes and follow-up permissions
  are not public fields. Known reviewer identifiers in anonymous free text are rejected;
  reviewers and moderators must also remove identifying project details.
- `approved_at` records reviewer approval. Nina must privately verify the experience and
  use **Publish approved review** separately; the CRM's Approved status does not publish.
  The publication API checks that the snapshot still matches recorded reviewer approval.
- Public profiles, `/api/cpg-match/reviews`, and the public-review CSV use the same
  allowlisted projection and require v2 consent, private verification and published status.
- The standard admin CSV is **private CRM data**, including sourcing and internal notes.
  Its filename explicitly contains `private`. Use the public export for external sharing.
- Historical submissions retain all original data but receive no inferred approval.
  Previous static preview snapshots no longer feed public profiles. Obtain a newly
  approved submission before publishing historical experiences.

Nina's sourcing follow-up permission authorizes private contact only. It does not grant
permission to share contact information or a brief; each introduction needs separate approval.

## Vendor-provided facts

`/vendor-intake` on cpgmatch.com is separate from founder reviews. It records services,
project types, customer fit/exclusions, current commercial information, availability,
constraints and inquiry contacts in `cpg_match_vendor_intakes`. Conditional production
and logistics questions depend on category. Confirmation time is server-recorded.
These are vendor-provided claims awaiting review, not founder endorsements. Nina reads
them at `/cpg-match-admin/vendor-intakes` and should confirm the vendor's identity before use.

## Storage and verification

Apply the additive, idempotent schema with:

```sh
npx tsx --env-file=.env scripts/setup-cpg-match-table.ts
```

Existing rows remain nullable for the v2 columns. Row-level security stays enabled.

```sh
npx tsx --test src/lib/cpg-match-review.test.ts src/lib/cpg-match-crm.test.ts
npx tsc --noEmit
npm run build
```

Additional browser/API checks covered all four recommendation paths, mobile layout,
optional commercial skipping, unknown/ongoing engagements, edited vs. untouched draft
refresh, approval tampering, private projection checks across HTML/API/CSV, historical
record readability, verified publication/unpublication, and vendor intake persistence.
Review submission calls and confirmation emails were mocked; database integration tests
used temporary records and removed them afterward.
