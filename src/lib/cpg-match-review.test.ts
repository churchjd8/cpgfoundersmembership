import { test } from "node:test";
import assert from "node:assert/strict";
import {
  buildReviewDraft,
  publicReview,
  publicationFingerprint,
  parseReview,
  publishedReview,
  recommendations,
  ratingFields,
  type ReviewAnswers,
} from "./cpg-match-review";
import { parseVendorIntake } from "./cpg-match-vendor-intake";
function answers(overrides: ReviewAnswers = {}): ReviewAnswers {
  return {
    vendorName: "Test Vendor",
    scope: "Packaging design",
    engagementStatus: "completed",
    startYear: "2023",
    endYear: "2024",
    companyStage: "$1M–$5M",
    ...Object.fromEntries(
      ratingFields.map(([key]) => [key, "2 — Disappointing"]),
    ),
    disappointed: "Relieved",
    recommendation: "No",
    firstName: "Private",
    lastName: "Founder",
    email: "private@example.invalid",
    brand: "Secret Company",
    engagementCompany: "Previous Employer",
    attribution: "anonymous",
    commercialVisibility: "private",
    publishTiming: "no",
    publishStage: "no",
    ninaFollowUp: "yes",
    buyerNeeds: "PRIVATE SOURCING",
    sourcingBudget: "PRIVATE BUDGET",
    vendorNotificationPermission: "no",
    certification: "confirmed",
    ...overrides,
  };
}
function submission(a: ReviewAnswers) {
  a = { ...a, reviewText: a.reviewText || buildReviewDraft(a) };
  return {
    ...a,
    category: ["Packaging design"],
    schemaVersion: 2,
    reviewApproved: true,
    draftAcknowledgement: buildReviewDraft(a),
    approvedPublicReview: publicationFingerprint(a, ["Packaging design"]),
  };
}
test("all recommendation paths can submit with optional commercial fields skipped", () => {
  for (const recommendation of recommendations) {
    const result = parseReview(submission(answers({ recommendation })));
    assert.equal(result.publicReview.commercial, undefined);
    assert.match(
      result.publicReview.text,
      /We hired Test Vendor to: Packaging design/,
    );
    assert.ok(result.publicReview.text.includes(recommendation));
  }
});
test("best-fit answer never replaces project scope; negative and uncertain text is not softened", () => {
  const yes = buildReviewDraft(
    answers({
      recommendation: recommendations[1],
      bestFor: "Small packaging projects",
    }),
  );
  assert.match(yes, /Packaging design/);
  assert.match(yes, /Small packaging projects/);
  const negative = buildReviewDraft(
    answers({
      valuable: "",
      bestFor: "STALE POSITIVE ANSWER",
      reservations: "We would not hire them again.",
      improvement: "They missed every deadline.",
    }),
  );
  assert.match(negative, /We would not hire them again/);
  assert.match(negative, /missed every deadline/);
  assert.doesNotMatch(negative, /STALE POSITIVE|especially valuable/);
  const unsure = buildReviewDraft(answers({ recommendation: "Not sure yet" }));
  assert.match(unsure, /Not sure yet/);
  assert.doesNotMatch(unsure, /recommend them|great fit/);
});
test("private commercial, verification and sourcing information never enters a draft or public projection", () => {
  const a = answers({
    spend: "12345",
    currency: "USD",
    pricingBasis: "One-time project",
    spendCovers: "PRIVATE COMMERCIAL",
    commercialTerms: "PRIVATE TERMS",
  });
  a.reviewText = buildReviewDraft(a);
  const text = JSON.stringify(publicReview(a, ["Packaging design"]));
  for (const secret of [
    "12345",
    "PRIVATE COMMERCIAL",
    "PRIVATE TERMS",
    "PRIVATE SOURCING",
    "PRIVATE BUDGET",
    "private@example.invalid",
    "Secret Company",
    "Previous Employer",
    "2023",
  ])
    assert.ok(!text.includes(secret), secret);
  assert.ok(text.includes("Verified CPG Founder"));
});
test("published commercial details always carry timing, scope, currency and historical qualification", () => {
  const a = answers({
    spend: "10,000–15,000",
    currency: "EUR",
    pricingBasis: "Per order / production run",
    commercialVisibility: "public",
    spendCovers: "Two SKUs",
    reviewText: "An honest review.",
  });
  const review = parseReview(submission(a)).publicReview;
  assert.equal(review.commercial?.engagement, "2023–2024");
  assert.equal(review.commercial?.scope, "Packaging design");
  assert.equal(review.commercial?.currency, "EUR");
  assert.match(review.commercial!.notice, /not the vendor’s current prices/);
  assert.equal(review.context.engagement, undefined);
});
test("dates reject impossible ordering and future dates; unknown and ongoing need no end year", () => {
  const invalidDates: ReviewAnswers[] = [
    { endYear: "2022" },
    { startYear: "2999" },
    { endYear: "abc" },
  ];
  for (const patch of invalidDates)
    assert.throws(() => parseReview(submission(answers(patch))));
  assert.equal(
    parseReview(
      submission(
        answers({ engagementStatus: "unknown", startYear: "", endYear: "" }),
      ),
    ).answers.startYear,
    "",
  );
  assert.equal(
    parseReview(
      submission(answers({ engagementStatus: "ongoing", endYear: "" })),
    ).answers.endYear,
    "",
  );
});
test("approval is bound to the latest exact text, attribution, context and draft source", () => {
  const body = submission(answers());
  for (const patch of [
    { reviewText: "Changed after approval" },
    { publishStage: "yes" },
    { commercialVisibility: "public", commercialTerms: "Extra cost" },
    { attribution: "named" },
    { reviewApproved: false },
    { scope: "Different scope" },
  ])
    assert.throws(() => parseReview({ ...body, ...patch }));
  const edited = answers({
    reviewText: "My own wording, including reservations.",
  });
  assert.equal(
    parseReview(submission(edited)).publicReview.text,
    edited.reviewText,
  );
});
test("known identifying details are blocked in anonymous public text and commercial context", () => {
  for (const reviewText of [
    "Contact private@example.invalid",
    "I work at Secret Company",
    "I am Private Founder",
    "This was at Previous Employer",
  ])
    assert.throws(() => parseReview(submission(answers({ reviewText }))));
  assert.throws(() =>
    parseReview(
      submission(
        answers({
          commercialVisibility: "public",
          commercialTerms: "Secret Company negotiated this",
        }),
      ),
    ),
  );
});
test("historical and unverified records cannot publish, even with CRM Approved", () => {
  const p = parseReview(submission(answers())).publicReview;
  assert.equal(
    publishedReview({ public_review: p, publication_status: "published" }),
    null,
  );
  assert.equal(
    publishedReview({
      review_schema_version: 2,
      public_review: p,
      approved_at: "today",
      publication_status: "published",
    }),
    null,
  );
  assert.equal(
    publishedReview({
      review_schema_version: 2,
      public_review: p,
      approved_at: "today",
      verified_at: "today",
      publication_status: "pending",
    }),
    null,
  );
  assert.deepEqual(
    publishedReview({
      review_schema_version: 2,
      public_review: p,
      approved_at: "today",
      verified_at: "today",
      publication_status: "published",
    }),
    p,
  );
});
test("sourcing follow-ups are ignored when no needs are supplied and introductions are never inferred", () => {
  const parsed = parseReview(submission(answers({ buyerNeeds: "" })));
  assert.equal(parsed.answers.ninaFollowUp, "no");
  assert.equal(parsed.answers.sourcingBudget, "");
  assert.ok(!JSON.stringify(parsed.publicReview).includes("ninaFollowUp"));
});
test("vendor intake validates its own confirmation and current pricing independently", () => {
  const vendor = {
    vendorName: "Supplier",
    category: "Co-manufacturing",
    services: "Beverages",
    inquiryEmail: "hello@example.invalid",
    confirmed: true,
    productionConstraints: "Cold fill",
  };
  assert.equal(parseVendorIntake(vendor).productionConstraints, "Cold fill");
  assert.throws(() => parseVendorIntake({ ...vendor, confirmed: false }));
  assert.throws(() => parseVendorIntake({ ...vendor, pricingRange: "1000" }));
  assert.equal(
    parseVendorIntake({ ...vendor, category: "Brand identity" })
      .productionConstraints,
    "",
  );
});
