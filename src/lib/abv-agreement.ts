// Single source of truth for the ABV Beverage Group onboarding agreement. Used
// by the onboarding wizard (display) and the API routes (signing record +
// Stripe checkout metadata) so the terms can never drift between them.
//
// Engagement comes off Joshua's 8/27 call with Teng and James: they took the
// top tier of the 3-Month Intensive as it is laid out publicly on /intensive —
// $5,000/mo x 3 ($15,000 total), half-day VIP strategy deep dive to kick off,
// bi-weekly 60-minute 1:1s with Jeff, and the full members' stack. This is the
// STANDARD rate, not a discounted one (unlike Max's friends-and-family deal),
// so there is no strike-through price anywhere in this flow.
//
// Two things to confirm before this link goes out:
//   1. `business` — the 8/24 application came in as "ABV Corp"
//      (t.zhao@abvcorp.net); Joshua said "ABV Beverage Group" on the call.
//      Whichever is the legal entity should be what's here.
//   2. Section 4 carries the ROI guarantee from /intensive, which makes fees
//      refundable under the stated conditions. Max's agreement said flatly
//      "non-refundable" — that predates the guarantee going on the page. Since
//      ABV bought off /intensive, the guarantee is written in here.

export const AGREEMENT_VERSION = "2026-08-27";

export const ENGAGEMENT = {
  clientName: "ABV Beverage Group",
  business: "ABV Beverage Group",
  contacts: "Teng Zhao and James",
  providerName: "Jeffrey Church",
  providerAddress: "PO Box 2036, Rancho Santa Fe, CA 92067",
  effectiveDateLabel: "August 27, 2026",
  initialMonths: 3,
  initialFeeUsd: 5000,
  totalInitialUsd: 15000,
  babuProValueUsd: 200,
  ongoingLowUsd: 1500,
  ongoingHighUsd: 4000,
  cancelNoticeDays: 10,
} as const;

export const WHATS_INCLUDED: string[] = [
  "A half-day VIP strategy deep dive with Jeff to kick things off. You do the pre-work, Jeff does his own research first, and the session goes deep under NDA across every function of the business at once. You come out with a strategic roadmap instead of assembling one over three months.",
  "Bi-weekly 60-minute 1:1 sessions with Jeff, every other week across the full three months. Double the direct time, which is what matters when you're actively working resets, raises, or distributor conversations.",
  "Email and async support between calls. Gut-checks on a retailer ask, eyes on your model or your deck, whatever you want a second opinion on.",
  "Fundraising support where Jeff is strongest: deck structure and feedback, perspective on valuation and terms, investor targeting, and how to actually run the round. He has raised over $300M across 45+ rounds.",
  `Unlimited Babu Pro ($${ENGAGEMENT.babuProValueUsd}/mo), the AI CPG advisor trained on Jeff's 35+ years in the industry.`,
  "The MBA for CPG modules: video trainings on marketing, sales, manufacturing, team and fundraising, plus the financial models, tools, templates and white papers behind each one.",
  "Warm industry introductions where they make sense: brokers, buyers, distributors, suppliers, co-mans and investors. Jeff is one degree from most of the space.",
  "The monthly speaker series, retailer and investor pitch slams, and the founder community alongside other operators working the same problems.",
];

// Plain-text agreement clauses shown in the review step. Mirrors the
// executed Advisory Services Agreement.
export const AGREEMENT_SECTIONS: { title: string; body: string }[] = [
  {
    title: "1. Services",
    body: "During the Term, Provider will deliver the advisory services described above: a one-time half-day VIP strategy deep dive, bi-weekly (every other week) 60-minute 1:1 sessions with Jeff Church across the three-month Initial Term, reasonable email and async support between sessions, access to Babu Pro, the MBA for CPG modules, and Provider's templates and tools, warm introductions where appropriate, and access to the monthly speaker series, pitch slams, and founder community. Sessions are scheduled by mutual agreement. Provider takes a limited annual summer break; any affected sessions will be rescheduled in good faith so Client does not lose a session.",
  },
  {
    title: "2. Term & Commitment",
    body: "This Agreement begins on the Effective Date and continues for an initial term of three (3) months (the \"Initial Term\"), which is a minimum commitment. After the Initial Term it automatically continues on a month-to-month basis until cancelled under Section 5.",
  },
  {
    title: "3. Fees & Payment",
    body: "The Initial Term fee is $15,000, payable either as $5,000 per month for each of the three (3) months of the Initial Term, or as a single payment of $15,000 up front. After the Initial Term, the engagement continues month-to-month at a rate between $1,500 and $4,000 per month, agreed in writing by both Parties before the Initial Term ends. Monthly fees are billed in advance via a recurring subscription auto-draft through Stripe, charged to the card or ACH payment method on file on each Billing Date; the pay-in-full option is charged once at signup.",
  },
  {
    title: "4. ROI Guarantee",
    body: "If, at the end of the Initial Term, Client has not seen a tangible return on the fees paid, Provider will at Client's election either (a) continue working with Client at no additional cost until such a return is realized, or (b) refund one hundred percent (100%) of the fees paid for the Initial Term. This guarantee is conditioned on Client's full participation: attending every scheduled session, completing the pre-work before each session, and working the strategy Provider builds with Client. Client must invoke this guarantee in writing within thirty (30) days after the end of the Initial Term. Apart from this guarantee, fees are non-refundable, including for partial months.",
  },
  {
    title: "5. Cancellation",
    body: "The Initial Term may not be cancelled; the three months ($15,000 total) are committed in full whether paid monthly or up front, subject only to the ROI guarantee in Section 4. After the Initial Term, either Party may cancel at any time with at least ten (10) days' written notice before the next Billing Date. Cancellation takes effect at the end of the then-current paid month. Upon cancellation, access to Babu Pro, the MBA modules, and Provider's tools ends.",
  },
  {
    title: "6. Intellectual Property & Access",
    body: "Provider grants Client a limited, non-exclusive, non-transferable, revocable license to access Babu Pro, the MBA for CPG modules, and Provider's templates and tools for Client's internal business use during the Term. Client owns the specific strategic deliverables and roadmap prepared for Client. Provider retains all rights in its own tools, templates, frameworks, methodologies, and software.",
  },
  {
    title: "7. Advisor Designation",
    body: "Any use of Provider's name, likeness, or title as an advisor to Client, including on investor or brand materials, requires Provider's prior written consent, which may be given for a specific use and withdrawn on written notice. Nothing in this Agreement grants Client equity, a board seat, or a formal advisory role beyond what is separately agreed in writing.",
  },
  {
    title: "8. No Guarantee of Results",
    body: "The Services are advisory in nature. Apart from the ROI guarantee in Section 4, Provider does not guarantee any specific business, financial, revenue, or fundraising outcome. Client is responsible for its own business decisions and results.",
  },
  {
    title: "9. Confidentiality",
    body: "Each Party will use the other's confidential information only to perform under this Agreement, protect it with reasonable care, and not disclose it to third parties without consent, except as required by law. This obligation survives termination.",
  },
  {
    title: "10. Independent Contractor",
    body: "Provider is an independent contractor. Nothing in this Agreement creates an employment, partnership, joint venture, or agency relationship.",
  },
  {
    title: "11. Limitation of Liability",
    body: "Neither Party will be liable for indirect, incidental, special, consequential, or punitive damages. Provider's total aggregate liability will not exceed the total fees paid by Client in the three (3) months preceding the claim.",
  },
  {
    title: "12. Governing Law",
    body: "This Agreement is governed by the laws of the State of California, with exclusive jurisdiction in the state and federal courts located in San Diego County, California.",
  },
  {
    title: "13. Entire Agreement",
    body: "This Agreement is the entire agreement between the Parties on its subject matter and supersedes all prior discussions. Any amendment must be in writing and signed by both Parties.",
  },
];
