// Single source of truth for Erin Aliaga's (Drops of Dough) onboarding
// agreement. Used by the onboarding wizard (display) and the API routes
// (signing record + Stripe checkout metadata) so the terms can never drift
// between them.
//
// Structure reflects the engagement Joshua pitched on the 6/16 call and the
// overview email already sent to Erin: a 2-hour 1:1 strategy deep dive to
// start, then a monthly 60-minute 1:1 with Jeff across the 3-month intensive.
// Pricing: $2,000/mo for 3 months ($6,000 total), or $5,000 paid in full
// (save $1,000). After the Initial Term, most founders continue month-to-month
// at $1,500/mo.

export const AGREEMENT_VERSION = "2026-06-16";

export const ENGAGEMENT = {
  clientName: "Erin Aliaga",
  business: "Drops of Dough",
  providerName: "Jeffrey Church",
  providerAddress: "PO Box 2036, Rancho Santa Fe, CA 92067",
  effectiveDateLabel: "June 16, 2026",
  initialMonths: 3,
  initialFeeUsd: 2000,
  totalInitialUsd: 6000,
  payInFullUsd: 5000,
  payInFullSavingsUsd: 1000,
  ongoingFeeUsd: 1500,
  babuProValueUsd: 200,
  cancelNoticeDays: 10,
} as const;

export const WHATS_INCLUDED: string[] = [
  "A 2-hour 1:1 strategy deep dive to start, where Jeff goes deep on your business under NDA and you build a clear growth strategy and 6-month action plan together.",
  "A monthly 60-minute 1:1 with Jeff across the full 3-month intensive, to work the plan, make the calls in front of you, and keep momentum.",
  "Email and async support between calls, like a quick gut-check on a retailer ask, feedback on your model or deck, and anything else you want eyes on.",
  `Access to Babu Pro ($${ENGAGEMENT.babuProValueUsd}/mo), the MBA for CPG modules, and all of Jeff's templates and tools, including the operational tooling to streamline how you run things day to day.`,
  "Warm introductions to relevant industry contacts, suppliers, and service providers (frozen co-mans, retail buyers, and more).",
];

// Plain-text agreement clauses shown in the review step. Mirrors the
// executed Advisory Services Agreement.
export const AGREEMENT_SECTIONS: { title: string; body: string }[] = [
  {
    title: "1. Services",
    body: "During the Term, Provider will deliver the advisory services described above: a one-time 2-hour 1:1 strategy deep dive, a monthly 60-minute 1:1 session with Jeff Church across the three-month Initial Term, reasonable email and async support between sessions, access to Babu Pro, the MBA for CPG modules, and Provider's templates and tools, and warm introductions where appropriate. Sessions are scheduled by mutual agreement. Provider takes a limited annual summer break; any affected sessions will be rescheduled in good faith so Client does not lose a session.",
  },
  {
    title: "2. Term & Commitment",
    body: "This Agreement begins on the Effective Date and continues for an initial term of three (3) months (the \"Initial Term\"), which is a minimum commitment. After the Initial Term it automatically continues on a month-to-month basis until cancelled under Section 4.",
  },
  {
    title: "3. Fees & Payment",
    body: "The Initial Term fee is $6,000, payable either as $2,000 per month for each of the three (3) months of the Initial Term, or as a single payment of $5,000 in full up front (a $1,000 savings). After the Initial Term, the engagement continues month-to-month at $1,500 per month unless the Parties agree otherwise in writing before the Initial Term ends. Monthly fees are billed in advance via a recurring subscription auto-draft through Stripe, charged to the card or ACH payment method on file on each Billing Date; the pay-in-full option is charged once at signup. Fees are non-refundable, including for partial months.",
  },
  {
    title: "4. Cancellation",
    body: "The Initial Term may not be cancelled; the three months ($6,000 total) are committed in full whether paid monthly or up front. After the Initial Term, either Party may cancel at any time with at least ten (10) days' written notice before the next Billing Date. Cancellation takes effect at the end of the then-current paid month. Upon cancellation, access to Babu Pro, the MBA modules, and Provider's tools ends.",
  },
  {
    title: "5. Intellectual Property & Access",
    body: "Provider grants Client a limited, non-exclusive, non-transferable, revocable license to access Babu Pro, the MBA for CPG modules, and Provider's templates and tools for Client's internal business use during the Term. Client owns the specific strategic deliverables and roadmap prepared for Client. Provider retains all rights in its own tools, templates, frameworks, methodologies, and software.",
  },
  {
    title: "6. No Guarantee of Results",
    body: "The Services are advisory in nature. Provider does not guarantee any specific business, financial, revenue, or fundraising outcome. Client is responsible for its own business decisions and results.",
  },
  {
    title: "7. Confidentiality",
    body: "Each Party will use the other's confidential information only to perform under this Agreement, protect it with reasonable care, and not disclose it to third parties without consent, except as required by law. This obligation survives termination.",
  },
  {
    title: "8. Independent Contractor",
    body: "Provider is an independent contractor. Nothing in this Agreement creates an employment, partnership, joint venture, or agency relationship.",
  },
  {
    title: "9. Limitation of Liability",
    body: "Neither Party will be liable for indirect, incidental, special, consequential, or punitive damages. Provider's total aggregate liability will not exceed the total fees paid by Client in the three (3) months preceding the claim.",
  },
  {
    title: "10. Governing Law",
    body: "This Agreement is governed by the laws of the State of California, with exclusive jurisdiction in the state and federal courts located in San Diego County, California.",
  },
  {
    title: "11. Entire Agreement",
    body: "This Agreement is the entire agreement between the Parties on its subject matter and supersedes all prior discussions. Any amendment must be in writing and signed by both Parties.",
  },
];
