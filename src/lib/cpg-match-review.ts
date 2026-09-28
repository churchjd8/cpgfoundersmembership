// Shared contract for intake, draft generation, consent previews and public output.
export const REVIEW_VERSION = 2;
export const categories = [
  "Brand identity",
  "Packaging design",
  "Packaging Suppliers",
  "R&D / formulation",
  "Co-manufacturing",
  "3PL / logistics",
  "Brokers & sales",
  "Amazon / ecommerce",
  "Growth marketing",
  "PR & communications",
  "Finance / fractional CFO",
  "Operations & supply chain",
  "Legal & regulatory",
  "Data & analytics",
  "Recruiting & talent",
  "Other",
];
export const stages = [
  "Pre-launch",
  "Launched, under $1M annual revenue",
  "$1M–$5M",
  "$5M–$20M",
  "$20M+",
  "Not sure / prefer not to say",
];
export const recommendations = [
  "Yes",
  "Yes, for certain projects or customers",
  "Not sure yet",
  "No",
];
export const pricingBases = [
  "One-time project",
  "Per month",
  "Per order / production run",
  "Other",
  "Don’t know / prefer not to say",
];
export const sourcingTimes = [
  "ASAP",
  "Within 1 month",
  "Within 3 months",
  "Later",
  "Just exploring",
];
export const ratings = [
  "5 — Excellent",
  "4 — Very good",
  "3 — Okay",
  "2 — Disappointing",
  "1 — Poor",
];
export const ratingFields = [
  ["quality", "Quality of work"],
  ["ease", "Ease of working together"],
  ["communication", "Communication"],
  ["delivery", "On-time delivery"],
  ["value", "Value for cost"],
  ["expectations", "Promise vs. delivery"],
  ["stageFit", "Fit for your stage"],
] as const;
export const unavailableOptions = [
  "Very disappointed",
  "Somewhat disappointed",
  "Not disappointed",
  "Relieved",
];
export type ReviewAnswers = Record<string, string>;
export type PublicReview = {
  policyVersion: 2;
  source: "Customer-reported experience";
  vendor: string;
  category: string[];
  text: string;
  attribution: string;
  context: { scope: string; engagement?: string; companyStage?: string };
  commercial?: {
    amountOrRange?: string;
    currency?: string;
    basis?: string;
    covers?: string;
    terms?: string;
    engagement: string;
    scope: string;
    notice: string;
  };
};
export function isPositive(a: ReviewAnswers) {
  return (
    a.recommendation === recommendations[0] ||
    a.recommendation === recommendations[1]
  );
}
export function engagementLabel(a: ReviewAnswers) {
  if (a.engagementStatus === "unknown") return "Engagement dates not recalled";
  return `${a.startYear}–${a.engagementStatus === "ongoing" ? "ongoing at submission" : a.endYear}`;
}
export function buildReviewDraft(a: ReviewAnswers) {
  const paragraphs = [
    `We hired ${a.vendorName || "this vendor"} to: ${a.scope || "[project scope]"}`,
  ];
  if (a.valuable?.trim())
    paragraphs.push(`What was especially valuable: ${a.valuable.trim()}`);
  const scores = ratingFields
    .filter(([field]) => a[field])
    .map(([field, label]) => `${label}: ${a[field]}`);
  if (scores.length) paragraphs.push(scores.join(". ") + ".");
  if (a.disappointed)
    paragraphs.push(
      `If we needed similar work and this vendor were unavailable, we would feel: ${a.disappointed}.`,
    );
  if (a.recommendation)
    paragraphs.push(`Would we recommend this vendor? ${a.recommendation}.`);
  if (isPositive(a) && a.bestFor?.trim())
    paragraphs.push(`A good fit for: ${a.bestFor.trim()}`);
  if (!isPositive(a) && a.reservations?.trim())
    paragraphs.push(`Before deciding: ${a.reservations.trim()}`);
  if (a.improvement?.trim())
    paragraphs.push(`What could have been better: ${a.improvement.trim()}`);
  if (a.knowBeforeHiring?.trim())
    paragraphs.push(
      `What another founder should know: ${a.knowBeforeHiring.trim()}`,
    );
  // Commercial answers, private identities and sourcing requests NEVER enter this draft.
  return paragraphs.join("\n\n");
}
export function publicReview(
  a: ReviewAnswers,
  category: string[],
): PublicReview {
  const result: PublicReview = {
    policyVersion: 2,
    source: "Customer-reported experience",
    vendor: a.vendorName,
    category: [...category],
    text: a.reviewText,
    attribution:
      a.attribution === "anonymous"
        ? "Verified CPG Founder"
        : `${a.firstName} ${a.lastName} · ${a.brand}`,
    context: { scope: a.scope },
  };
  if (a.publishTiming === "yes") result.context.engagement = engagementLabel(a);
  if (a.publishStage === "yes" && a.companyStage !== stages[5])
    result.context.companyStage = a.companyStage;
  if (
    a.commercialVisibility === "public" &&
    [a.spend, a.spendCovers, a.commercialTerms].some((x) => x?.trim())
  ) {
    result.commercial = {
      engagement: engagementLabel(a),
      scope: a.scope,
      notice:
        "Historical customer-reported spending and terms for this engagement, not the vendor’s current prices.",
    };
    if (a.spend?.trim())
      Object.assign(result.commercial, {
        amountOrRange: a.spend,
        currency: a.currency,
        basis: a.pricingBasis,
      });
    if (a.spendCovers?.trim()) result.commercial.covers = a.spendCovers;
    if (a.commercialTerms?.trim()) result.commercial.terms = a.commercialTerms;
  }
  return result;
}
export function publicationFingerprint(a: ReviewAnswers, category: string[]) {
  return JSON.stringify(publicReview(a, category));
}
export function anonymityError(a: ReviewAnswers, category: string[]) {
  if (a.attribution !== "anonymous") return null;
  const view = publicReview(a, category);
  const publicText = [
    view.text,
    view.context.scope,
    view.commercial?.covers,
    view.commercial?.terms,
    view.commercial?.amountOrRange,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  const identities = [
    `${a.firstName || ""} ${a.lastName || ""}`.trim(),
    a.email,
    a.brand,
    a.engagementCompany,
  ].filter((x) => x && x.length >= 3);
  if (
    identities.some((identity) => publicText.includes(identity.toLowerCase()))
  )
    return "Your public content includes your name, email, or company. Remove or generalize those details to keep this review anonymous.";
  return null;
}
const fields = [
  "vendorName",
  "scope",
  "engagementStatus",
  "startYear",
  "endYear",
  "engagementCompany",
  "companyStage",
  ...ratingFields.map(([key]) => key),
  "disappointed",
  "recommendation",
  "bestFor",
  "reservations",
  "valuable",
  "improvement",
  "knowBeforeHiring",
  "spend",
  "currency",
  "pricingBasis",
  "spendCovers",
  "commercialTerms",
  "commercialVisibility",
  "buyerNeeds",
  "sourcingTimeline",
  "sourcingBudget",
  "ninaFollowUp",
  "firstName",
  "lastName",
  "email",
  "brand",
  "attribution",
  "vendorContactName",
  "vendorContactEmail",
  "vendorNotificationPermission",
  "certification",
  "publishTiming",
  "publishStage",
  "reviewText",
  "draftAcknowledgement",
  "approvedPublicReview",
];
export function parseReview(body: Record<string, unknown>) {
  const a: ReviewAnswers = {};
  for (const field of fields) {
    const value = body[field];
    if (value != null && typeof value !== "string")
      throw new Error(`Invalid ${field}.`);
    if (
      typeof value === "string" &&
      value.length >
        (field === "approvedPublicReview"
          ? 30000
          : field === "draftAcknowledgement" || field === "reviewText"
            ? 12000
            : 2000)
    )
      throw new Error(`${field} is too long.`);
    // Exact approved text and fingerprint must not be silently rewritten.
    a[field] = typeof value === "string" ? value : "";
  }
  const category = body.category;
  if (
    !Array.isArray(category) ||
    !category.length ||
    category.some((c) => typeof c !== "string" || !categories.includes(c))
  )
    throw new Error("Select at least one valid category.");
  if (body.schemaVersion !== REVIEW_VERSION)
    throw new Error("Please reload the review form before submitting.");
  for (const key of [
    "vendorName",
    "scope",
    "firstName",
    "lastName",
    "email",
    "brand",
    "reviewText",
  ])
    if (!a[key].trim()) throw new Error("Please complete the required fields.");
  if (!/^\S+@\S+\.\S+$/.test(a.email))
    throw new Error("Enter a valid work email.");
  if (!["completed", "ongoing", "unknown"].includes(a.engagementStatus))
    throw new Error("Choose when you worked together.");
  const currentYear = new Date().getUTCFullYear();
  const year = (s: string) =>
    /^\d{4}$/.test(s) && +s >= 1900 && +s <= currentYear;
  if (a.engagementStatus !== "unknown" && !year(a.startYear))
    throw new Error("Enter a valid start year.");
  if (
    a.engagementStatus === "completed" &&
    (!year(a.endYear) || +a.endYear < +a.startYear)
  )
    throw new Error("End year must be at or after start year.");
  if (
    !stages.includes(a.companyStage) ||
    !recommendations.includes(a.recommendation)
  )
    throw new Error("Choose your company stage and recommendation.");
  for (const [key] of ratingFields)
    if (!ratings.includes(a[key]))
      throw new Error("Please complete the experience ratings.");
  if (!unavailableOptions.includes(a.disappointed))
    throw new Error(
      "Choose how you would feel if the vendor were unavailable.",
    );
  if (a.pricingBasis && !pricingBases.includes(a.pricingBasis))
    throw new Error("Choose a valid pricing basis.");
  if (a.spend.trim() && (!/^[A-Z]{3}$/.test(a.currency) || !a.pricingBasis))
    throw new Error(
      "Add currency and pricing basis for the approximate spend, or skip spend.",
    );
  if (!["private", "public"].includes(a.commercialVisibility))
    throw new Error("Choose how commercial information may be used.");
  if (!["anonymous", "named"].includes(a.attribution))
    throw new Error("Choose your public attribution.");
  for (const key of ["publishTiming", "publishStage", "ninaFollowUp"])
    if (!["yes", "no"].includes(a[key]))
      throw new Error(`Choose a valid ${key} option.`);
  if (
    a.buyerNeeds.trim() &&
    a.sourcingTimeline &&
    !sourcingTimes.includes(a.sourcingTimeline)
  )
    throw new Error("Choose a valid sourcing timeline.");
  if (!["yes", "no"].includes(a.vendorNotificationPermission))
    throw new Error(
      "Choose whether we may identify you to the vendor for a positive review.",
    );
  if (!isPositive(a) && a.vendorNotificationPermission !== "no")
    throw new Error(
      "Vendor notification permission applies only to positive recommendations.",
    );
  if (a.vendorNotificationPermission === "yes" && !a.vendorContactEmail)
    throw new Error("Provide the vendor contact email when giving permission.");
  if (a.vendorContactEmail && !/^\S+@\S+\.\S+$/.test(a.vendorContactEmail))
    throw new Error("Enter a valid vendor contact email.");
  if (a.certification !== "confirmed" || body.reviewApproved !== true)
    throw new Error(
      "Confirm your first-hand experience and approve the public review.",
    );
  if (a.draftAcknowledgement !== buildReviewDraft(a))
    throw new Error(
      "Your answers changed. Review the updated suggestion before approving.",
    );
  if (a.approvedPublicReview !== publicationFingerprint(a, category))
    throw new Error("Review and approve the latest public text and context.");
  const privacyError = anonymityError(a, category);
  if (privacyError) throw new Error(privacyError);
  if (a.engagementStatus === "unknown") {
    a.startYear = "";
    a.endYear = "";
  }
  if (a.engagementStatus === "ongoing") a.endYear = "";
  if (isPositive(a)) a.reservations = "";
  else a.bestFor = "";
  if (!a.buyerNeeds.trim()) {
    a.sourcingTimeline = "";
    a.sourcingBudget = "";
    a.ninaFollowUp = "no";
  }
  return {
    answers: a,
    category: [...new Set(category)] as string[],
    publicReview: publicReview(a, category),
  };
}
// Fail closed for legacy records; CRM approval alone is not publication consent.
export function publishedReview(row: {
  review_schema_version?: number | null;
  publication_status?: string;
  verified_at?: string | null;
  approved_at?: string | null;
  public_review?: PublicReview | null;
}): PublicReview | null {
  if (
    row.review_schema_version !== 2 ||
    row.publication_status !== "published" ||
    !row.verified_at ||
    !row.approved_at ||
    row.public_review?.policyVersion !== 2
  )
    return null;
  const p = row.public_review;
  return {
    policyVersion: 2,
    source: "Customer-reported experience",
    vendor: p.vendor,
    category: p.category,
    text: p.text,
    attribution: p.attribution,
    context: {
      scope: p.context.scope,
      ...(p.context.engagement ? { engagement: p.context.engagement } : {}),
      ...(p.context.companyStage
        ? { companyStage: p.context.companyStage }
        : {}),
    },
    ...(p.commercial
      ? {
          commercial: {
            amountOrRange: p.commercial.amountOrRange,
            currency: p.commercial.currency,
            basis: p.commercial.basis,
            covers: p.commercial.covers,
            terms: p.commercial.terms,
            scope: p.commercial.scope,
            engagement: p.commercial.engagement,
            notice: p.commercial.notice,
          },
        }
      : {}),
  };
}
