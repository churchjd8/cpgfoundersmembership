// Explicit, public-safe snapshot of the four real September 4–5 submissions.
// No contact details, reviewer identities, inferred verification, or invented reviews.
export const dimensions = [
  "Quality of work",
  "Communication",
  "On-time delivery",
  "Value for cost",
  "Promise vs. delivery",
  "Stage fit",
];
export type Vendor = {
  slug: string;
  name: string;
  initials: string;
  category: string;
  color: string;
  summary: string;
  scope: string;
  stage: string;
  cost: string | null;
  period: string;
  scores: number[];
  bestFor: string | null;
  services: string[];
};
export const vendors: Vendor[] = [
  {
    slug: "parker-lambert",
    name: "Parker-Lambert",
    initials: "PL",
    category: "Amazon / ecommerce",
    color: "sage",
    summary: "Getting your brand set up on Amazon.",
    scope: "Set up Amazon store",
    stage: "Under $1M revenue",
    cost: "Under $5K",
    period: "2026",
    scores: [4, 5, 4, 5, 4, 5],
    bestFor: null,
    services: ["Amazon store setup"],
  },
  {
    slug: "pom-team",
    name: "POM Team",
    initials: "POM",
    category: "Finance / fractional CFO",
    color: "lavender",
    summary: "Bookkeeping and payroll for your next chapter.",
    scope: "Bookkeeping and payroll",
    stage: "Under $1M revenue",
    cost: "Under $5K",
    period: "2026",
    scores: [5, 5, 5, 5, 5, 5],
    bestFor: "Anyone staring up that doesn’t need a FT Controller yet",
    services: ["Bookkeeping", "Payroll"],
  },
  {
    slug: "rmiq",
    name: "Rmiq",
    initials: "R",
    category: "Amazon / ecommerce",
    color: "peach",
    summary: "Instacart advertising, from strategy to optimization.",
    scope: "Instacart ads/ strategy/ optimization",
    stage: "$1M–$5M revenue",
    cost: null,
    period: "2026",
    scores: [4, 5, 5, 4, 5, 5],
    bestFor: null,
    services: ["Instacart ads", "Ad strategy", "Optimization"],
  },
  {
    slug: "welch-packaging",
    name: "Welch Packaging",
    initials: "W",
    category: "Packaging",
    color: "sand",
    summary: "Corrugated packaging behind your product.",
    scope: "They supply corrugated packaging",
    stage: "$20M+ revenue",
    cost: null,
    period: "2022–Present",
    scores: [5, 5, 5, 5, 5, 5],
    bestFor:
      "Competitive pricing, excellent customer service, and solid packaging design team.",
    services: ["Corrugated packaging"],
  },
];
