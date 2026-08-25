import type { Metadata } from "next";
import Link from "next/link";
import { BookingEmbed, BOOKING_URL } from "./booking-embed";

// Step 2 of the work-with-Jeff funnel: /apply (form) → this page (sent by hand
// in Joshua's response email) → the intro call booking. Unlisted rather than
// gated — not linked from nav or the footer and noindexed — so the link itself
// is the invitation, and the page can talk about capacity and pricing frankly.
// Source of truth for the offer is "Jeff Church Advisory - Offers One-Pager.md";
// that file, this page, and the response email must move together.

export const metadata: Metadata = {
  title: "Working with Jeff Church - The 3-Month Intensive",
  description:
    "Two ways to work with Jeff Church over three months. The full breakdown of what's included, what it costs, and what happens after.",
  robots: { index: false, follow: false },
};

// The booking widget lives on the page itself; the hero button scrolls to it.
const bookingAnchor = "#book";

const tiers = [
  {
    name: "3-Month Intensive",
    price: "$2,500",
    total: "$7,500 total, billed monthly",
    blurb:
      "For founders who want senior strategic guidance and a clear plan without needing Jeff in the weeds every week.",
    flagship: false,
    points: [
      {
        title: "2-hour 1:1 strategy deep dive to start",
        body: "Jeff goes deep on your business under NDA. He sends pre-work and does his own research first, so the session is spent solving, not catching him up. You come out with a growth strategy and a 6-month action plan.",
      },
      {
        title: "Monthly 60-minute 1:1 with Jeff",
        body: "Every month for all three months, to work the plan and make the calls in real time.",
      },
      {
        title: "Email and async support in between",
        body: "Gut-checks on a retailer ask, eyes on your model or your deck, whatever you want a second opinion on.",
      },
    ],
  },
  {
    name: "3-Month VIP Intensive",
    price: "$5,000",
    total: "$15,000 total, billed monthly",
    blurb:
      "For founders who want Jeff close, with more face time and a deeper, hands-on kickoff.",
    flagship: true,
    points: [
      {
        title: "Half-day VIP strategy deep dive to start",
        body: "A half day with Jeff under NDA, building a strategic roadmap across every function of the business at once instead of assembling it over three months. Pre-work and his own research done in advance.",
      },
      {
        title: "Bi-weekly 60-minute 1:1s with Jeff",
        body: "Every other week across all three months. Double the direct time, which matters when you're actively working resets, raises, or distributor conversations.",
      },
      {
        title: "Email and async support in between",
        body: "Same direct line. Gut-checks and feedback whenever you need them.",
      },
    ],
  },
];

const included = [
  {
    title: "Babu Pro",
    tag: "$200/mo value",
    body: "Unlimited use of our AI CPG advisor, trained on Jeff's 35+ years in the industry.",
  },
  {
    title: "MBA for CPG modules",
    body: "Video trainings on marketing, sales, manufacturing, team and fundraising, plus the financial models, tools, templates and white papers behind each one.",
  },
  {
    title: "Warm industry introductions",
    body: "Brokers, buyers, distributors, suppliers, co-mans and investors, where appropriate. Jeff is one degree from most of the space.",
  },
  {
    title: "Monthly speaker series",
    body: "Fireside chats and Q&A with industry legends, including founders from brands like Poppi and Zico.",
  },
  {
    title: "Retailer and investor pitch slams",
    body: "Pitch in front of real retailers and angel investors, get live feedback, compete for a cash prize.",
  },
  {
    title: "Founder community",
    body: "Other operators going through the same thing alongside you, not a forum full of strangers.",
  },
];

const comparison = [
  { label: "Investment", a: "$2,500/mo — $7,500 total", b: "$5,000/mo — $15,000 total" },
  { label: "Strategy deep dive", a: "2-hour 1:1 deep dive", b: "Half-day VIP deep dive" },
  { label: "1:1s with Jeff", a: "Monthly 60-min", b: "Bi-weekly 60-min" },
  { label: "Email & async support", a: true, b: true },
  { label: "Babu Pro ($200/mo)", a: true, b: true },
  { label: "MBA for CPG modules", a: true, b: true },
  { label: "Templates, tools & white papers", a: true, b: true },
  { label: "Warm industry intros", a: true, b: true },
  { label: "Monthly speaker series", a: true, b: true },
  { label: "Retailer + investor pitch slams", a: true, b: true },
  { label: "Founder community", a: true, b: true },
  { label: "ROI guarantee", a: true, b: true },
  {
    label: "After 3 months",
    a: "Month-to-month, $1,500–$4,000/mo",
    b: "Month-to-month, $1,500–$4,000/mo",
  },
];

const guaranteeTerms = [
  {
    title: "You show up 100%",
    body: "Every call on the calendar, pre-work done before it, and you\u2019re there ready to work. No ghosting a month and calling it a wash.",
  },
  {
    title: "You work the strategy",
    body: "Jeff builds the plan with you, not for you. The guarantee counts when you actually run it, not when it sits in a doc.",
  },
];

const credentials = [
  "8x founder/CEO across consumer brands, manufacturing, and building products",
  "Co-founded Suja Juice — scaled to $100M+ revenue in 5 years, sold for $300M",
  "5 exits totaling $700M+ in value returned to investors",
  "$275M+ raised across 40+ funding rounds",
  "Back operating now with Proda, so the advice is current, not 20 years stale",
  "35+ years in CPG with deep relationships across buyers, investors, brokers, and operators",
];

const steps = [
  {
    n: "01",
    title: "You applied",
    body: "Done. Jeff and I read every application that comes in, and we look at the brand before we reply to anyone.",
  },
  {
    n: "02",
    title: "You're reading this",
    body: "The full offer, the real numbers, nothing held back for a sales call. Take your time with it and figure out whether it's worth a conversation.",
  },
  {
    n: "03",
    title: "We talk",
    body: "A short intro call to make sure it's a fit in both directions, and to point you at the right tier. If we're aligned, we get your kickoff with Jeff on the calendar.",
  },
];

function Check() {
  return (
    <svg
      className="h-5 w-5 flex-shrink-0 text-accent"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.8 3.8 6.8-6.8a1 1 0 0 1 1.4 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function IntensivePage() {
  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative bg-foreground text-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full mb-6">
              Private &mdash; by application only
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
              What working with Jeff actually looks like.
            </h1>
            <p className="mt-6 text-lg text-white/70 leading-relaxed">
              You&rsquo;re reading this because your application made it through. This page
              isn&rsquo;t linked anywhere on the site and isn&rsquo;t public. It goes to the
              founders we think Jeff can actually move the needle for.
            </p>
            <p className="mt-6 text-lg text-white/70 leading-relaxed">
              What he does is a focused three-month intensive. He gets deep in your business,
              builds the strategy and roadmap with you, and stays in your corner while you
              execute. There are two ways in. The difference is how much direct time you get
              with him.
            </p>
            <p className="mt-6 rounded-xl border border-gold/30 bg-white/5 px-5 py-4 text-white/80 leading-relaxed">
              <strong className="text-gold">Jeff has room for 1-2 more founders right now.</strong>{" "}
              He works with a small number at a time because every engagement is built around
              your business, not a template. When those spots fill, this closes until one opens
              back up.
            </p>
            <p className="mt-4 text-white/70 leading-relaxed">
              And it&rsquo;s backed. If you show up 100%, work Jeff&rsquo;s strategy, and
              still don&rsquo;t see a tangible return by the end of the three months, he keeps
              working with you for free until you do or refunds you in full.{" "}
              <a href="#guarantee" className="text-gold font-semibold hover:underline">
                The full terms are here.
              </a>
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href={bookingAnchor}
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-accent hover:bg-accent-dark text-white font-semibold transition-colors"
              >
                Book your intro call
              </a>
              <a
                href="#compare"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-white/25 hover:bg-white/10 text-white font-semibold transition-colors"
              >
                Compare the two tiers
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========== TIERS ========== */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl border p-8 md:p-10 h-full ${
                  tier.flagship
                    ? "border-accent bg-card-flagship shadow-sm"
                    : "border-border bg-card"
                }`}
              >
                {tier.flagship && (
                  <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full mb-4">
                    Most founders with revenue start here
                  </span>
                )}
                <h2 className="text-2xl font-bold tracking-tight">{tier.name}</h2>
                <p className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  <span className="text-muted">/month</span>
                </p>
                <p className="mt-1 text-sm font-semibold text-accent">{tier.total}</p>
                <p className="mt-5 text-muted leading-relaxed">{tier.blurb}</p>

                <ul className="mt-8 space-y-5">
                  {tier.points.map((point) => (
                    <li key={point.title} className="flex gap-3">
                      <Check />
                      <div>
                        <p className="font-semibold">{point.title}</p>
                        <p className="mt-1 text-sm text-muted leading-relaxed">{point.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <p className="mt-8 pt-6 border-t border-border text-sm text-muted leading-relaxed">
                  Plus everything in <strong className="text-foreground">Included in both</strong>{" "}
                  below.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== INCLUDED IN BOTH ========== */}
      <section className="py-16 md:py-24 bg-card border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Included in both</h2>
            <p className="mt-4 text-muted leading-relaxed">
              The 1:1 time with Jeff is the main event. This is everything that comes with it.
            </p>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {included.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border bg-background p-6"
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold">{item.title}</h3>
                  {item.tag && (
                    <span className="px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider bg-accent-light text-accent-dark rounded-full">
                      {item.tag}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-muted leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== COMPARISON ========== */}
      <section id="compare" className="py-16 md:py-24 scroll-mt-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Side by side</h2>
          <p className="mt-4 text-muted leading-relaxed max-w-2xl">
            The two real differences are the kickoff (a 2-hour deep dive versus a half day) and
            the 1:1 cadence (monthly versus every other week). Everything else is shared.
          </p>

          <div className="mt-10 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[640px] text-left bg-card">
              <thead>
                <tr className="border-b border-border">
                  <th className="p-5 text-sm font-semibold text-muted w-1/3">&nbsp;</th>
                  <th className="p-5 text-sm font-bold">3-Month Intensive</th>
                  <th className="p-5 text-sm font-bold bg-card-flagship">
                    3-Month VIP Intensive
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.label} className="border-b border-border last:border-0">
                    <th className="p-5 text-sm font-semibold align-top">{row.label}</th>
                    <td className="p-5 text-sm text-muted align-top">
                      {row.a === true ? <Check /> : row.a}
                    </td>
                    <td className="p-5 text-sm text-muted align-top bg-card-flagship">
                      {row.b === true ? <Check /> : row.b}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-sm text-muted leading-relaxed">
            After the three months you can continue month to month at a reduced rate and
            cadence, roughly $1,500 to $4,000/mo depending on Jeff&rsquo;s involvement. That
            gets set during your three months. Cancel anytime.
          </p>
        </div>
      </section>

      {/* ========== THE BAR ========== */}
      <section className="py-16 md:py-24 bg-foreground text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                The bar Jeff sets on his own work
              </h2>
              <p className="mt-6 text-lg text-white/70 leading-relaxed">
                A minimum 5-10x return on what you put in, usually through capital raised or
                cost taken out. That is the standard he holds himself to, and it is the reason
                he works with a small number of founders at a time.
              </p>
              <p className="mt-4 text-white/70 leading-relaxed">
                What you&rsquo;re really buying is his brain in your business. Someone who has
                already made these calls, catching the things you don&rsquo;t know you
                don&rsquo;t know before they cost you.
              </p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-8">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gold">
                Who you&rsquo;re working with
              </h3>
              <ul className="mt-6 space-y-4">
                {credentials.map((line) => (
                  <li key={line} className="flex gap-3 text-sm text-white/80 leading-relaxed">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========== ROI GUARANTEE ========== */}
      <section
        id="guarantee"
        className="py-16 md:py-24 bg-card-flagship border-b border-border scroll-mt-20"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border-2 border-accent bg-background p-8 md:p-12">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full">
              The guarantee
            </span>
            <h2 className="mt-6 text-2xl sm:text-3xl font-bold tracking-tight leading-tight">
              If you don&rsquo;t see a tangible return in three months, Jeff keeps working with
              you for free until you do &mdash; or refunds you 100%.
            </h2>
            <p className="mt-6 text-muted leading-relaxed">
              At the end of the three months, if you&rsquo;ve shown up fully and worked the
              strategy and there is still no real return on what you put in, we make it right.
              Either Jeff stays in it with you at no cost until the return shows up, or you get
              every dollar back. No panel, no hoops, no fine print about &ldquo;qualifying
              results.&rdquo;
            </p>

            <div className="mt-10 pt-8 border-t border-border">
              <h3 className="text-sm font-bold uppercase tracking-wider text-accent">
                What we ask in return
              </h3>
              <div className="mt-6 grid sm:grid-cols-2 gap-6">
                {guaranteeTerms.map((term) => (
                  <div key={term.title} className="flex gap-3">
                    <Check />
                    <div>
                      <p className="font-semibold">{term.title}</p>
                      <p className="mt-1 text-sm text-muted leading-relaxed">{term.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-8 text-muted leading-relaxed">
              That&rsquo;s the whole deal. Jeff is willing to carry the risk on his side
              because he&rsquo;s asking you to go all in on yours.
            </p>
          </div>
        </div>
      </section>

      {/* ========== HOW THIS WORKS ========== */}
      <section className="py-16 md:py-24 bg-card border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">How this works</h2>
            <p className="mt-4 text-muted leading-relaxed">
              Three steps, and you&rsquo;ve already done the first one.
            </p>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {steps.map((step) => (
              <div key={step.n} className="rounded-xl border border-border bg-background p-6">
                <span className="text-sm font-bold tracking-wider text-accent">{step.n}</span>
                <h3 className="mt-3 font-bold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA + BOOKING ========== */}
      <section id="book" className="py-16 md:py-24 scroll-mt-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              The last step is a conversation.
            </h2>
            <p className="mt-6 text-muted leading-relaxed">
              Before anyone starts, we get on a call to make sure it&rsquo;s a fit in both
              directions. Twenty minutes. We&rsquo;ll talk through where you are, what
              you&rsquo;re trying to hit, and which of the two tiers actually makes sense for
              you. If it isn&rsquo;t a fit, we&rsquo;ll tell you that too.
            </p>
            <p className="mt-4 text-sm text-muted">
              Booking with Joshua from Jeff&rsquo;s team. Pick any time that works.
            </p>
          </div>

          <div className="mt-10">
            <BookingEmbed />
          </div>

          <p className="mt-4 text-center text-sm text-muted">
            Prefer to open it in its own tab?{" "}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent font-semibold hover:underline"
            >
              Book here instead
            </a>
            .
          </p>

          <div className="mt-16 pt-10 border-t border-border">
            <h3 className="font-bold">If the timing isn&rsquo;t right yet</h3>
            <p className="mt-3 text-muted leading-relaxed">
              The{" "}
              <Link href="/mba-for-cpg" className="text-accent font-semibold hover:underline">
                MBA for CPG
              </Link>{" "}
              is $997 one time with lifetime access. Eight self-paced modules covering
              marketing, sales, manufacturing, team and fundraising, plus the financial models
              and templates. It covers a lot of the same fundamentals without the commitment.
            </p>
            <p className="mt-3 text-muted leading-relaxed">
              There&rsquo;s also a{" "}
              <Link href="/resources" className="text-accent font-semibold hover:underline">
                free resource library
              </Link>{" "}
              and the CPG Founders WhatsApp community. The door stays open either way.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
