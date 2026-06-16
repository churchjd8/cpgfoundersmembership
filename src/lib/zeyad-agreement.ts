// Single source of truth for Zeyad Moussa's (Tulua) onboarding agreement.
// Used by the onboarding wizard (display) and the API routes (signing record
// + Stripe checkout metadata) so the terms can never drift between them.
//
// Structure reflects the engagement Joshua pitched on the 6/15 call: a half-day
// in-person VIP strategy deep dive, then bi-weekly (every other week) 60-minute
// 1:1s with Jeff across the 3-month intensive. Current rate ($5,000/mo), not a
// founding discount. Ongoing month-to-month rate after the Initial Term is set
// by mutual agreement before the term ends (left open per Joshua).

export const AGREEMENT_VERSION = "2026-06-15";

export const ENGAGEMENT = {
  clientName: "Zeyad Moussa",
  business: "Tulua",
  providerName: "Jeffrey Church",
  providerAddress: "PO Box 2036, Rancho Santa Fe, CA 92067",
  effectiveDateLabel: "June 15, 2026",
  initialMonths: 3,
  initialFeeUsd: 5000,
  totalInitialUsd: 15000,
  babuProValueUsd: 200,
  cancelNoticeDays: 10,
} as const;

export const WHATS_INCLUDED: string[] = [
  "A half-day, in-person VIP strategy deep dive to kick things off, where Jeff goes deep on your business under NDA and helps you build a strategic roadmap across every function of your business.",
  "Bi-weekly 60-minute 1:1 sessions with Jeff every other week across the full 3-month intensive, to work the roadmap and support you in real time as you execute.",
  "Email and async support between calls, like a quick gut-check on a supplier contract, feedback on your deck or model, and anything else you want eyes on.",
  `Access to Babu Pro ($${ENGAGEMENT.babuProValueUsd}/mo), the MBA for CPG modules, and all of Jeff's templates and tools.`,
  "Warm introductions to relevant industry contacts, suppliers, and service providers (retail buyers, co-mans, Amazon, and more).",
];

// Plain-text agreement clauses shown in the review step. Mirrors the
// executed Advisory Services Agreement.
export const AGREEMENT_SECTIONS: { title: string; body: string }[] = [
  {
    title: "1. Services",
    body: "During the Term, Provider will deliver the advisory services described above: a one-time half-day in-person VIP strategy deep dive, bi-weekly (every other week) 60-minute 1:1 sessions with Jeff Church across the three-month Initial Term, reasonable email and async support between sessions, access to Babu Pro, the MBA for CPG modules, and Provider's templates and tools, and warm introductions where appropriate. Sessions are scheduled by mutual agreement. Provider takes a limited annual summer break; any affected sessions will be rescheduled in good faith so Client does not lose a session.",
  },
  {
    title: "2. Term & Commitment",
    body: "This Agreement begins on the Effective Date and continues for an initial term of three (3) months (the \"Initial Term\"), which is a minimum commitment. After the Initial Term it automatically continues on a month-to-month basis until cancelled under Section 4.",
  },
  {
    title: "3. Fees & Payment",
    body: "$5,000 per month for each of the three (3) months of the Initial Term ($15,000 total). After the Initial Term, the engagement continues month-to-month at a rate agreed in writing by both Parties before the Initial Term ends. Fees are billed monthly in advance via a recurring subscription auto-draft through Stripe, charged to the card or ACH payment method on file on each Billing Date. Fees are non-refundable, including for partial months.",
  },
  {
    title: "4. Cancellation",
    body: "The Initial Term may not be cancelled; the three monthly payments are committed in full. After the Initial Term, either Party may cancel at any time with at least ten (10) days' written notice before the next Billing Date. Cancellation takes effect at the end of the then-current paid month. Upon cancellation, access to Babu Pro, the MBA modules, and Provider's tools ends.",
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
