// Single source of truth for the free resource inventory.
//
// Everything Jeff gives away is packaged into three kits, each organized around
// a job a founder is actually trying to do rather than around the format of the
// asset. Two doors lead to the same inventory:
//
//   /resources  — the public door, framed for anyone who finds the site
//   /toolbox    — the book door, framed for a reader of The Cold-Pressed Truth
//
// Both render from this file and both deliver through /api/kit-signup, so the
// kits can never drift apart. The only difference between the doors is the copy
// around them and the Kajabi tag the signup carries.

export type KitId = "profitability" | "fundraising" | "starting-line";

export type KitItem = {
  title: string;
  /** What it does, and — where two tools overlap — why it isn't the other one. */
  body: string;
  href: string;
  /** Some spreadsheets ship with a recorded walkthrough. */
  videoHref?: string;
  kind: "training" | "tool" | "paper" | "assessment";
  /**
   * A handful of assets only exist inside a Kajabi automation and have no
   * direct URL we can put in an email. For those we fire the legacy form so
   * Kajabi delivers them, and the kit email says a second email is coming.
   */
  deliveredVia?: "kajabi";
  /** Legacy per-resource form used when deliveredVia === "kajabi". */
  legacyFormId?: string;
};

export type Kit = {
  id: KitId;
  name: string;
  /** One line under the name. Reads as a promise, not a description. */
  promise: string;
  /** The longer framing paragraph on the kit card. */
  lead: string;
  /** The kit's own page — where we drop people right after they opt in. */
  page: string;
  /** Kajabi form whose automation already applies this kit's tag. */
  kajabiFormId: string;
  /** The tag that form automation applies. Recorded here so the mapping is legible. */
  kajabiTag: string;
  items: KitItem[];
};

const DRIVE = (id: string) => `https://drive.google.com/uc?export=download&id=${id}`;

export const LINKS = {
  babu: "https://www.askbabu.ai",
  whatsapp: "/founders-only",
  book: "/book",
} as const;

/** Kajabi form for the "send me all three kits" path. */
export const ALL_KITS_FORM_ID = "2149549983";
export const ALL_KITS_TAG = "All Free Resources Bundle";

export const KITS: Kit[] = [
  {
    id: "profitability",
    name: "The Fastest Path to Profitability Kit",
    promise: "Find the money already sitting in your P&L.",
    lead:
      "Five tools that find the cash you're already leaving on the table, and the 90-minute workshop that walks you through using them.",
    page: "/burn-rate-workshop-replay",
    kajabiFormId: "2149558655",
    kajabiTag: "Burn Rate Workshop Replay Access",
    items: [
      {
        title: "Reducing the Burn (90-min workshop)",
        body:
          "Cutting your burn rate without cutting your growth. Pricing, trade spend, SKU rationalization, cash conversion, and runway planning, start to finish.",
        href: "/burn-rate-workshop-replay",
        kind: "training",
      },
      {
        title: "Pricing Calculator",
        body:
          "Start from MSRP or COGS, compare both, find your optimal price. This is the everyday pricing tool — reach for it when you're setting or resetting a price.",
        href: DRIVE("1BzsfbD05XuR6-XCust69_OGjfPqSPcih"),
        kind: "tool",
      },
      {
        title: "Trade Promo Break-Even Calculator",
        body: "Know whether a promo is worth running before you commit to it.",
        href: DRIVE("1TOA5xBS_4Iwl_ChKbr8O6DT0yVkgKtJv"),
        kind: "tool",
      },
      {
        title: "SKU Rationalization Tool",
        body: "See which SKUs are carrying your brand and which ones are quietly bleeding it.",
        href: DRIVE("1TsyjcooNakJi4ROVMEB0Ta8e-MO4rqGa"),
        kind: "tool",
      },
      {
        title: "Cash Conversion Cycle Tool",
        body: "See exactly how your payment terms trap cash, and what freeing it is worth.",
        href: DRIVE("1eejrhY2elYC-mO5lG4b2GWvmhzEpv3AF"),
        kind: "tool",
      },
      {
        title: "Cash Runway Calculator",
        body:
          "Model your burn across three years and see how long you've got. This is the quick version — start here. The Fundraising Kit has the deeper investor-facing model.",
        href: DRIVE("1scxRZdGvg1YSDGpY828dT7j_oBrH-0Ck"),
        kind: "tool",
      },
    ],
  },
  {
    id: "fundraising",
    name: "The $300M Fundraising Kit",
    promise: "Everything I hand a founder before they talk to a single investor.",
    lead:
      "The three models and the masterclass behind 45 rounds and $300M+ raised. Build the numbers before you build the deck.",
    page: "/fundraising-masterclass",
    kajabiFormId: "2149549980",
    kajabiTag: "Fundraising Masterclass Replay (3 Hours)",
    items: [
      {
        title: "Close Your Investment Round (3-hr masterclass)",
        body:
          "Valuation, deck, investor targeting, dilution math, and the terms nobody explains to you until you've already signed them.",
        href: "/fundraising-masterclass",
        kind: "training",
      },
      {
        title: "CPG Chart of Accounts",
        body:
          "Set your financials up the way an investor expects to read them, on day one instead of the week before diligence.",
        href: DRIVE("1tqSBrstaRNyrdK3jVNWPH8odWWGhO0JD"),
        kind: "tool",
      },
      {
        title: "Capital Raise & Runway Calculator",
        body:
          "The investor-facing runway model. Deeper than the Cash Runway Calculator in the Profitability Kit — built for sizing a raise, not for the weekly check-in.",
        href: DRIVE("1ITv8j6I0le2Ge6jdIE26Ef-iom91BUHC"),
        videoHref: DRIVE("10vAkJYhL_na6kqXmE7EJjz6IjSgZ_2bM"),
        kind: "tool",
      },
      {
        title: "Unit Pricing & Break-Even Model",
        body:
          "Find your break-even and test pricing scenarios at the unit level. Where the Pricing Calculator sets a price, this one proves the price holds up.",
        href: DRIVE("1BYW6fUvuS3p3b4F0-vLARE0j985aHg_D"),
        videoHref: DRIVE("1nL1tqta3miixB3aYK0vkl7FdyMxSghFl"),
        kind: "tool",
      },
    ],
  },
  {
    id: "starting-line",
    name: "The Starting Line Kit",
    promise: "Before you build it, know what you're building.",
    lead:
      "Where you actually stand, the whole operating system, and the mistakes that kill brands before they get a fair shot.",
    page: "/cpg-playbook-training",
    kajabiFormId: "2149549982",
    kajabiTag: "CPG Playbook Video Replay",
    items: [
      {
        title: "Entrepreneurial Readiness Assessment",
        body:
          "50 questions on your experience, your product idea, and your route to market. Twenty minutes now can save you two years. Runs as a Guru inside Babu.",
        href: LINKS.babu,
        kind: "assessment",
      },
      {
        title: "The CPG Playbook (23 plays)",
        body:
          "All 23 plays for building and scaling a brand, walked through live. KPIs, fundraising, retail strategy, operations, team, exit planning.",
        href: "/cpg-playbook-training",
        kind: "training",
      },
      {
        title: "CPG Fatal Flaws",
        body:
          "The 18 mistakes that kill emerging brands before they get a fair shot. Learn them on my dime instead of your own.",
        href:
          "https://docs.google.com/document/d/1MMAs1gP76y98A3JY9agd5GOsH4TAKh0H/edit?usp=sharing&ouid=102243953732961922783&rtpof=true&sd=true",
        kind: "paper",
      },
      {
        title: "Suja Lessons Learned",
        body:
          "How Suja went from $600K to $100M, what worked, what didn't, and what I'd do differently if I started it tomorrow.",
        href: "/book",
        kind: "paper",
        deliveredVia: "kajabi",
        legacyFormId: "2149549977",
      },
    ],
  },
];

export function getKit(id: string): Kit | undefined {
  return KITS.find((k) => k.id === id);
}

/**
 * The two things that are free forever and need no opt-in. They sit above the
 * kits on both doors because they're the fastest thing a founder can act on.
 */
export const ALWAYS_ON = [
  {
    title: "Babu AI",
    badge: "10 days free",
    href: LINKS.babu,
    external: true,
    emoji: "🤖",
    body:
      "Every spreadsheet in the kits answers one question. Babu answers whatever you bring it — pricing, promo math, retailer strategy, co-man contracts, fundraising prep — trained on 35+ years of operating experience and 4,000+ of my own resources. Underneath it sit 40+ purpose-built Gurus, each one built for a single job.",
    cta: "Start the free trial",
  },
  {
    title: "The CPG Founders Club",
    badge: "Always free",
    href: LINKS.whatsapp,
    external: false,
    emoji: "💬",
    body:
      "350+ CPG founders in one WhatsApp group, every stage from pre-launch to exit, answering each other in real time. Somebody in there has already solved the thing you're stuck on today. Nobody sells anything in there — that's the whole rule, and it's why it works.",
    cta: "Request to join",
  },
] as const;
