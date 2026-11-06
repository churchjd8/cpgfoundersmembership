import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BOOKING_URL } from "@/components/booking-embed";
import {
  ADVISORY_MIN_MONTHS,
  PRIVATE_ADVISORY_PRICE_USD,
  VIP_ADVISORY_PRICE_USD,
} from "@/lib/advisory-offer";
import { MBA_LIST_PRICE_USD, MBA_PRICE_USD } from "@/lib/mba-offer";
import {
  STRATEGY_SESSION_CREDIT_DAYS,
  STRATEGY_SESSION_PRICE_USD,
} from "@/lib/strategy-session-offer";

// Step 2 of the advisory funnel: /apply (form) → this page (sent in Joshua's
// reply, see routines/application-reply-drafts.md) → the intro call. Unlisted
// rather than gated: not linked from nav, the footer or /work-with-jeff, and
// noindexed, so the link itself is the invitation and the page can talk about
// capacity and pricing frankly. The public ladder on /work-with-jeff shows
// these two tiers without prices on purpose. Prices come from
// src/lib/advisory-offer.ts.

export const metadata: Metadata = {
  title: "Private Advisory with Jeff Church - The Full Breakdown",
  description:
    "Both ways to work with Jeff Church 1:1. What's included, what it costs, and the guarantee behind it.",
  robots: { index: false, follow: false },
};

const usd = (n: number) => `$${n.toLocaleString()}`;
const session = usd(STRATEGY_SESSION_PRICE_USD);
const privatePrice = usd(PRIVATE_ADVISORY_PRICE_USD);
const vipPrice = usd(VIP_ADVISORY_PRICE_USD);
const commitment = `${ADVISORY_MIN_MONTHS}-month minimum, then month to month`;
const sessionCredit = `${session} credited if you start within ${STRATEGY_SESSION_CREDIT_DAYS} days`;

const tiers = [
  {
    name: "Private Advisory",
    price: privatePrice,
    blurb: "Jeff in your corner every month while you execute the plan.",
    flagship: false,
    points: [
      {
        title: "Strategy Session to kick off",
        body: `Your engagement opens with the 90-minute session. You send your deck, roadmap or P&L ahead of time, Jeff does his homework, and you walk out with your priorities ranked. Already did one in the last ${STRATEGY_SESSION_CREDIT_DAYS} days? It's credited.`,
      },
      {
        title: "Monthly 60-minute 1:1 with Jeff",
        body: "Every month, to work the plan and make the calls in real time.",
      },
      {
        title: "Email support in between",
        body: "Gut-checks on a retailer ask, eyes on your model or deck, a second opinion when you need one.",
      },
    ],
  },
  {
    name: "VIP Advisory",
    price: vipPrice,
    blurb: "Jeff close, for founders in the middle of a raise, a reset, or a big retail push.",
    flagship: true,
    points: [
      {
        title: "Half-day VIP deep dive to kick off",
        body: "A half day with Jeff under NDA, building your roadmap across every function of the business at once instead of assembling it over three months. Pre-work and his own research done in advance.",
      },
      {
        title: "Bi-weekly 60-minute 1:1s with Jeff",
        body: "Every other week. Double the direct time, which matters when you're actively working resets, raises or distributor conversations.",
      },
      {
        title: "Priority email access",
        body: "You go to the front of the line. Jeff gets back to you first, between every call.",
      },
    ],
  },
];

const included = [
  {
    title: "Babu AI Pro",
    tag: "$200/mo value",
    body: "Unlimited use of the AI CPG advisor trained on Jeff's 35+ years in the industry.",
  },
  {
    title: "MBA for CPG",
    body: "Eight modules on marketing, sales, manufacturing, team and fundraising, plus the financial models, templates and white papers behind each one. Lifetime access.",
  },
  {
    title: "Warm industry introductions",
    body: "Buyers, brokers, distributors, co-mans and investors, where appropriate. Jeff is one degree from most of the space.",
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
    title: "ROI guarantee",
    body: "Show up, work the strategy, and if there's no tangible return in three months Jeff keeps going for free or refunds you. Full terms below.",
  },
];

const comparison: { label: string; a: string | boolean; b: string | boolean }[] = [
  { label: "Investment", a: `${privatePrice}/mo`, b: `${vipPrice}/mo` },
  { label: "Commitment", a: commitment, b: commitment },
  { label: "Kickoff", a: "90-min Strategy Session", b: "Half-day VIP deep dive" },
  { label: "1:1s with Jeff", a: "Monthly 60-min", b: "Bi-weekly 60-min" },
  { label: "Email support", a: true, b: "Priority, between every call" },
  { label: "Babu AI Pro ($200/mo value)", a: true, b: true },
  { label: "MBA for CPG", a: true, b: true },
  { label: "Warm industry intros", a: true, b: true },
  { label: "Monthly speaker series", a: true, b: true },
  { label: "Retailer + investor pitch slams", a: true, b: true },
  { label: "ROI guarantee", a: true, b: true },
  { label: "Strategy Session credit", a: sessionCredit, b: sessionCredit },
];

const guaranteeTerms = [
  {
    title: "You show up 100%",
    body: "Every call on the calendar, pre-work done before it, and you’re there ready to work. No ghosting a month and calling it a wash.",
  },
  {
    title: "You work the strategy",
    body: "Jeff builds the plan with you, not for you. The guarantee counts when you actually run it, not when it sits in a doc.",
  },
];

const credentials = [
  "Co-founded Suja Juice: $100M+ revenue in 5 years, sold for $300M",
  "8x founder/CEO, 5 exits totaling $700M+ returned to investors",
  "$275M+ raised across 40+ funding rounds",
  "Back operating now with Proda, so the advice is current, not 20 years stale",
  "35+ years in CPG, one degree from most buyers, brokers and investors",
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

function BookButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center px-8 py-4 rounded-lg bg-accent hover:bg-accent-dark text-white font-semibold text-lg transition-colors ${className}`}
    >
      Book your intro call &rarr;
    </a>
  );
}

export default function AdvisoryPage() {
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
              What working with Jeff 1:1 actually looks like.
            </h1>
            <p className="mt-6 text-lg text-white/70 leading-relaxed">
              You&rsquo;re reading this because you applied. This page isn&rsquo;t linked
              anywhere on the site and isn&rsquo;t public. It goes to the founders we think Jeff
              can actually move the needle for, so it has the full breakdown: both tiers,
              what&rsquo;s included, and what it costs.
            </p>
            <p className="mt-6 text-lg text-white/70 leading-relaxed">
              Jeff gets deep in your business, builds the strategy and roadmap with you, and stays
              in your corner while you execute. There are two ways in. The difference is how much
              direct time you get with him.
            </p>
            <p className="mt-6 rounded-xl border border-gold/30 bg-white/5 px-5 py-4 text-white/80 leading-relaxed">
              <strong className="text-gold">Jeff has room for 1-2 more founders right now.</strong>{" "}
              He works with a small number at a time because every engagement is built around
              your business, not a template. When those spots fill, this closes until one opens
              back up.
            </p>
            <p className="mt-4 text-white/70 leading-relaxed">
              And it&rsquo;s backed. If you show up 100%, work Jeff&rsquo;s strategy, and still
              don&rsquo;t see a tangible return by the end of the three months, he keeps working
              with you for free until you do or refunds you in full.{" "}
              <a href="#guarantee" className="text-gold font-semibold hover:underline">
                The full terms are here.
              </a>
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="#book"
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
          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`flex flex-col rounded-2xl border p-8 md:p-10 ${
                  tier.flagship ? "border-accent bg-card-flagship shadow-sm" : "border-border bg-card"
                }`}
              >
                {tier.flagship && (
                  <span className="self-start inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full mb-4">
                    Most founders with revenue start here
                  </span>
                )}
                <h2 className="text-2xl font-bold tracking-tight">{tier.name}</h2>
                <p className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  <span className="text-muted">/month</span>
                </p>
                <p className="mt-1 text-sm font-semibold text-accent">{commitment}</p>
                <p className="mt-5 text-muted leading-relaxed">{tier.blurb}</p>

                <ul className="mt-8 space-y-5 flex-1">
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
              <div key={item.title} className="rounded-xl border border-border bg-background p-6">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold">{item.title}</h3>
                  {"tag" in item && item.tag && (
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
            The two real differences are the kickoff (a 90-minute session versus a half day) and
            the 1:1 cadence (monthly versus every other week). Everything else is shared.
          </p>

          <div className="mt-10 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[640px] text-left bg-card">
              <thead>
                <tr className="border-b border-border">
                  <th className="p-5 text-sm font-semibold text-muted w-1/3">&nbsp;</th>
                  <th className="p-5 text-sm font-bold">Private Advisory</th>
                  <th className="p-5 text-sm font-bold bg-card-flagship">VIP Advisory</th>
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
            Billed monthly. After the first {ADVISORY_MIN_MONTHS} months you continue month to
            month and can stop whenever the work is done.
          </p>
        </div>
      </section>

      {/* ========== THE BAR ========== */}
      <section className="py-16 md:py-24 bg-foreground text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[auto_1fr_1fr] gap-12 items-center">
            <div className="relative mx-auto h-72 w-56 sm:h-80 sm:w-64 rounded-2xl overflow-hidden ring-4 ring-gold/30">
              <Image
                src="/images/jeff-headshot.webp"
                alt="Jeff Church"
                fill
                sizes="256px"
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                The bar Jeff sets on his own work
              </h2>
              <p className="mt-6 text-lg text-white/70 leading-relaxed">
                A minimum 5-10x return on what you put in, usually through capital raised or cost
                taken out. That is the standard he holds himself to, and it is the reason he works
                with a small number of founders at a time.
              </p>
              <p className="mt-4 text-white/70 leading-relaxed">
                What you&rsquo;re really buying is his brain in your business. Someone who has
                already made these calls, catching the things you don&rsquo;t know you don&rsquo;t
                know before they cost you.
              </p>
            </div>
            <ul className="space-y-4">
              {credentials.map((line) => (
                <li key={line} className="flex gap-3 text-white/80 leading-relaxed">
                  <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                  {line}
                </li>
              ))}
            </ul>
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
              you for free until you do, or refunds you 100%.
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
              That&rsquo;s the whole deal. Jeff is willing to carry the risk on his side because
              he&rsquo;s asking you to go all in on yours.
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
              you&rsquo;re trying to hit, and which of the two tiers actually makes sense for you.
              If it isn&rsquo;t a fit, we&rsquo;ll tell you that too.
            </p>
          </div>

          <div className="mt-10 rounded-2xl border border-border bg-card p-8 md:p-10 text-center">
            <BookButton />
            <p className="mt-4 text-sm text-muted">
              Booking with Joshua from Jeff&rsquo;s team. The scheduler opens in a new tab.
            </p>
          </div>

          <div className="mt-16 pt-10 border-t border-border">
            <h3 className="font-bold">If the timing isn&rsquo;t right yet</h3>
            <p className="mt-3 text-muted leading-relaxed">
              The{" "}
              <Link href="/work-with-jeff#session" className="text-accent font-semibold hover:underline">
                Strategy Session
              </Link>{" "}
              is {session} one time: ninety minutes with Jeff on the one decision that matters
              most right now, MBA for CPG included, and credited toward advisory if you start
              within {STRATEGY_SESSION_CREDIT_DAYS} days. No application, no commitment past the
              call.
            </p>
            <p className="mt-3 text-muted leading-relaxed">
              The{" "}
              <Link href="/mba-for-cpg" className="text-accent font-semibold hover:underline">
                MBA for CPG
              </Link>{" "}
              on its own is <span className="line-through">${MBA_LIST_PRICE_USD}</span> $
              {MBA_PRICE_USD} one time with lifetime access. Eight self-paced modules plus the
              financial models and templates. It covers a lot of the same fundamentals without the
              commitment.
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
