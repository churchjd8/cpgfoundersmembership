import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MBA_LIST_PRICE_USD, MBA_PRICE_USD } from "@/lib/mba-offer";
import {
  STRATEGY_SESSION_CREDIT_DAYS,
  STRATEGY_SESSION_PRICE_USD,
} from "@/lib/strategy-session-offer";

// Every way to work with Jeff on one page, as a ladder: free → Babu → MBA are
// buy-now, the Strategy Session is buy-now and leads to onboarding, and the two
// advisory tiers go through /apply, which drops the founder straight onto an
// intro call. Pricing is shown in full on purpose, so the call is about fit,
// not price. Source of truth for the offer is
// "Jeff Church Advisory - Offers One-Pager.md"; keep them moving together.

export const metadata: Metadata = {
  title: "Work with Jeff Church - CPG Founders Group",
  description:
    "Every way to work with Jeff Church, from free resources to private advisory. Start today or apply to work with Jeff 1:1.",
  robots: { index: false, follow: false },
};

const BABU_URL = "https://www.askbabu.ai";
const FOUNDERS_GROUP_URL = "https://chat.whatsapp.com/EclqcEFTX2yAeBmwsq88tq";


const session = `$${STRATEGY_SESSION_PRICE_USD.toLocaleString()}`;

// Line icons for the three self-serve cards, drawn in the accent color.
const iconProps = {
  className: "h-7 w-7",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function FreeIcon() {
  // An open book: the free library and blog.
  return (
    <svg {...iconProps}>
      <path d="M12 6.5C10.3 5.2 7.9 4.5 4 4.5v13c3.9 0 6.3.7 8 2 1.7-1.3 4.1-2 8-2v-13c-3.9 0-6.3.7-8 2Z" />
      <path d="M12 6.5v13" />
    </svg>
  );
}

function BabuIcon() {
  // A chat bubble mid-reply: the AI advisor.
  return (
    <svg {...iconProps}>
      <path d="M4 5.5h16v10H9l-5 4v-14Z" />
      <path d="M8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01" strokeWidth={2.5} />
    </svg>
  );
}

function PrivateIcon() {
  // A compass: Jeff steering the plan month to month.
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    </svg>
  );
}

function VipIcon() {
  // A gem: the VIP tier.
  return (
    <svg {...iconProps}>
      <path d="M6.5 4.5h11l3.5 5-9 10-9-10 3.5-5Z" />
      <path d="M3 9.5h18M9.5 4.5 8 9.5l4 10 4-10-1.5-5" />
    </svg>
  );
}

function MbaIcon() {
  // A graduation cap: the MBA for CPG.
  return (
    <svg {...iconProps}>
      <path d="M2.5 9 12 4.5 21.5 9 12 13.5 2.5 9Z" />
      <path d="M6.5 11v4.5c1.5 1.3 3.4 2 5.5 2s4-.7 5.5-2V11" />
      <path d="M21.5 9v5" />
    </svg>
  );
}

const selfServe = [
  {
    name: "Free",
    Icon: FreeIcon,
    price: "$0",
    unit: "",
    blurb: "Start learning from Jeff today.",
    points: ["Free resource library and templates", "The blog: a new CPG playbook every day", "The CPG Founders WhatsApp group"],
    cta: { label: "Browse free resources", href: "/resources", external: false },
    secondary: { label: "Join the Founders Group", href: FOUNDERS_GROUP_URL },
  },
  {
    name: "Babu AI",
    Icon: BabuIcon,
    prefix: "Starting at",
    price: "$29",
    unit: "/mo",
    blurb: "Jeff's 35 years of CPG answers, on call 24/7.",
    points: ["AI CPG advisor trained on Jeff's playbook", "40+ Gurus for pricing, promo math, pitch prep and more", "10-day free trial"],
    cta: { label: "Start the free trial", href: BABU_URL, external: true },
  },
  {
    name: "MBA for CPG",
    Icon: MbaIcon,
    price: `$${MBA_PRICE_USD}`,
    listPrice: `$${MBA_LIST_PRICE_USD}`,
    unit: " one time",
    blurb: "The whole playbook, self-paced.",
    points: ["8 modules: marketing, sales, manufacturing, team, fundraising", "450+ slides, financial models and templates", "Lifetime access", "Current founder discount"],
    cta: { label: "Get the MBA", href: "/mba-for-cpg", external: false },
  },
];

const sessionIncludes = [
  {
    title: "90 minutes 1:1 with Jeff",
    body: "Bring the decision you're stuck on. Your raise, your retail plan, your pricing, your co-man. Jeff pressure-tests it and tells you what he'd do.",
  },
  {
    title: "Jeff does his homework first",
    body: "You fill out an intake and send your deck, roadmap or P&L before the call. He reads it, so the 90 minutes is spent solving, not catching him up.",
  },
  {
    title: "Your top priorities, ranked",
    body: "You walk out knowing the few things most likely to make or break the business right now, and what to do first.",
  },
  {
    title: "MBA for CPG included ($997 value)",
    body: "Lifetime access to the full course, so you can keep building on the session.",
    link: { label: "See what's in the MBA", href: "/mba-for-cpg" },
  },
];

const advisory = [
  {
    key: "private",
    Icon: PrivateIcon,
    name: "Private Advisory",
    price: "$1,997",
    blurb: "Jeff in your corner every month while you execute the plan.",
    flagship: false,
    points: [
      {
        title: "Strategy Session to kick off",
        body: "Your engagement opens with the 90-minute session. Already did one? It's credited.",
      },
      { title: "Monthly 60-minute 1:1 with Jeff", body: "Every month, to work the plan and make the calls in real time." },
      {
        title: "Email support in between",
        body: "Gut-checks on a retailer ask, eyes on your model or deck, a second opinion when you need one.",
      },
    ],
  },
  {
    key: "vip",
    Icon: VipIcon,
    name: "VIP Advisory",
    price: "$4,997",
    blurb: "Jeff close, for founders in the middle of a raise, a reset, or a big retail push.",
    flagship: true,
    points: [
      {
        title: "Half-day VIP deep dive to kick off",
        body: "A half day with Jeff under NDA, building your roadmap across every function of the business at once.",
      },
      { title: "Bi-weekly 60-minute 1:1s", body: "Every other week. Double the direct time with Jeff." },
      {
        title: "Priority email access",
        body: "You go to the front of the line. Jeff gets back to you first, between every call.",
      },
    ],
  },
];

const advisoryIncludes = [
  "Babu AI Pro subscription ($200/mo value)",
  "MBA for CPG",
  "Warm intros to buyers, brokers, distributors, co-mans and investors",
  "Monthly speaker series",
  "Retailer and investor pitch slams",
  "ROI guarantee",
];

const comparison: { label: string; s: string | boolean; p: string | boolean; v: string | boolean }[] = [
  { label: "Investment", s: `${session} one time`, p: "$1,997/mo", v: "$4,997/mo" },
  { label: "Commitment", s: "None", p: "3-month minimum", v: "3-month minimum" },
  { label: "How to start", s: "Buy now", p: "Apply", v: "Apply" },
  { label: "Kickoff", s: "90-min session", p: "90-min session", v: "Half-day deep dive" },
  { label: "Ongoing 1:1s with Jeff", s: false, p: "Monthly", v: "Bi-weekly" },
  { label: "Email support", s: false, p: true, v: "Priority" },
  { label: "MBA for CPG", s: true, p: true, v: true },
  { label: "Babu AI Pro ($200/mo value)", s: false, p: true, v: true },
  { label: "Warm industry intros", s: false, p: true, v: true },
  { label: "Guarantee", s: "Full refund if it\u2019s not a fit", p: "ROI guarantee", v: "ROI guarantee" },
];

const credentials = [
  "Co-founded Suja Juice: $100M+ revenue in 5 years, sold for $300M",
  "8x founder/CEO, 5 exits totaling $700M+ returned to investors",
  "$275M+ raised across 40+ funding rounds",
  "35+ years in CPG, one degree from most buyers, brokers and investors",
];

const applySteps = [
  { n: "01", title: "Apply", body: "Two minutes. Tell us where the business is and which option you're leaning toward." },
  { n: "02", title: "Book a call", body: "You pick a time right after you apply. No waiting on an email from us." },
  { n: "03", title: "Start with Jeff", body: "If it's a fit both ways, we get your kickoff on Jeff's calendar." },
];

function Check() {
  return (
    <svg className="h-5 w-5 flex-shrink-0 text-accent" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.8 3.8 6.8-6.8a1 1 0 0 1 1.4 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function Cell({ value }: { value: string | boolean }) {
  if (value === true) return <Check />;
  if (value === false) return <span className="text-border">&mdash;</span>;
  return <>{value}</>;
}

function BuySessionButton({ className = "" }: { className?: string }) {
  return (
    <form action="/api/strategy-session-checkout" method="POST">
      <button
        type="submit"
        className={`inline-flex w-full sm:w-auto items-center justify-center px-8 py-4 rounded-lg bg-accent hover:bg-accent-dark text-white font-semibold text-lg transition-colors ${className}`}
      >
        Book your Strategy Session &rarr;
      </button>
    </form>
  );
}

export default function WorkWithJeffPage() {
  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative bg-foreground text-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full mb-6">
              Work with Jeff
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
              Every way to get Jeff&rsquo;s brain in your business.
            </h1>
            <p className="mt-6 text-lg text-white/70 leading-relaxed">
              Jeff co-founded Suja Juice and scaled it past $100M in five years before a $300M
              exit. He has raised $275M+ and been founder/CEO eight times. Whether you want to learn from his
              playbook on your own or have him in your corner 1:1, there&rsquo;s a way in.
              Every price is on this page.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="#session"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-accent hover:bg-accent-dark text-white font-semibold transition-colors"
              >
                Book a Strategy Session
              </a>
              <a
                href="#advisory"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-white/25 hover:bg-white/10 text-white font-semibold transition-colors"
              >
                See private advisory
              </a>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image
              src="/images/jeff-teaching.webp"
              alt="Jeff Church at the whiteboard, mapping out CPG strategy"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* ========== START TODAY ========== */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-sm font-bold uppercase tracking-wider text-accent">Start today</span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight">Learn Jeff&rsquo;s playbook on your own</h2>
            <p className="mt-4 text-muted leading-relaxed">No application, no call. Pick one and go.</p>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {selfServe.map((tier) => (
              <div key={tier.name} className="flex flex-col rounded-2xl border border-border bg-card p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-accent-light text-accent-dark">
                    <tier.Icon />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight">{tier.name}</h3>
                </div>
                <p className="mt-3 flex items-baseline gap-1">
                  {"prefix" in tier && (
                    <span className="mr-1 text-sm text-muted">{tier.prefix}</span>
                  )}
                  {"listPrice" in tier && (
                    <span className="mr-1 text-lg text-muted line-through">{tier.listPrice}</span>
                  )}
                  <span className="text-3xl font-bold">{tier.price}</span>
                  <span className="text-muted text-sm">{tier.unit}</span>
                </p>
                <p className="mt-3 text-muted">{tier.blurb}</p>
                <ul className="mt-6 space-y-3 flex-1">
                  {tier.points.map((p) => (
                    <li key={p} className="flex gap-3 text-sm">
                      <Check />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 space-y-3">
                  {tier.cta.external ? (
                    <a
                      href={tier.cta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center px-6 py-3 rounded-lg border-2 border-foreground hover:bg-foreground hover:text-white font-semibold transition-colors"
                    >
                      {tier.cta.label}
                    </a>
                  ) : (
                    <Link
                      href={tier.cta.href}
                      className="block text-center px-6 py-3 rounded-lg border-2 border-foreground hover:bg-foreground hover:text-white font-semibold transition-colors"
                    >
                      {tier.cta.label}
                    </Link>
                  )}
                  {tier.secondary && (
                    <a
                      href={tier.secondary.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center text-sm font-semibold text-accent hover:underline"
                    >
                      {tier.secondary.label} &rarr;
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== STRATEGY SESSION ========== */}
      <section id="session" className="py-16 md:py-24 bg-card-flagship border-y border-border scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-2">
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full">
                Most founders start here
              </span>
              <h2 className="mt-5 text-3xl sm:text-4xl font-bold tracking-tight">Jeff Strategy Session</h2>
              <p className="mt-4 flex items-baseline gap-2">
                <span className="text-5xl font-bold">{session}</span>
                <span className="text-muted">one time</span>
              </p>
              <p className="mt-2 text-sm font-semibold text-accent">
                MBA for CPG included. Credited toward advisory.
              </p>
              <p className="mt-6 text-muted leading-relaxed">
                Ninety minutes with Jeff on the one decision that matters most right now. The
                fastest way to find out what it&rsquo;s like to have him in your business, with no
                commitment past the call.
              </p>
              <div className="mt-8">
                <BuySessionButton />
                <p className="mt-3 text-xs text-muted">
                  Pay once. You fill out the intake right after checkout.
                </p>
              </div>
              <div className="mt-8 flex gap-3 rounded-xl border border-accent/30 bg-background p-5">
                <svg
                  className="h-6 w-6 flex-shrink-0 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.75}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 3 4.5 6v5.5c0 4.4 3.1 8.2 7.5 9.5 4.4-1.3 7.5-5.1 7.5-9.5V6L12 3Z" />
                  <path d="m8.8 12 2.2 2.2 4.2-4.4" />
                </svg>
                <div>
                  <p className="font-semibold">The fit guarantee</p>
                  <p className="mt-1 text-sm text-muted leading-relaxed">
                    Walk out of your call feeling it wasn&rsquo;t worth it or wasn&rsquo;t the right
                    fit? Tell us, and Jeff refunds you in full. No hard feelings.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 grid sm:grid-cols-2 gap-5">
              {sessionIncludes.map((item) => (
                <div key={item.title} className="rounded-xl border border-border bg-background p-6">
                  <div className="flex gap-3">
                    <Check />
                    <div>
                      <h3 className="font-bold">{item.title}</h3>
                      <p className="mt-2 text-sm text-muted leading-relaxed">{item.body}</p>
                      {"link" in item && item.link && (
                        <Link
                          href={item.link.href}
                          className="mt-2 inline-block text-sm font-semibold text-accent hover:underline"
                        >
                          {item.link.label} &rarr;
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div className="sm:col-span-2 rounded-xl border-2 border-accent bg-background p-6">
                <h3 className="font-bold">Want to keep going with Jeff?</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  Your {session} is credited toward Private or VIP Advisory if you start within{" "}
                  {STRATEGY_SESSION_CREDIT_DAYS} days. The session becomes your kickoff, so you
                  lose nothing by starting here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== ADVISORY ========== */}
      <section id="advisory" className="py-16 md:py-24 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-sm font-bold uppercase tracking-wider text-accent">By application</span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight">Private advisory with Jeff</h2>
            <p className="mt-4 text-muted leading-relaxed">
              Jeff in your corner for three months or more, building the strategy with you and
              staying close while you execute. He works with a small number of founders at a time,
              so these start with a short application and a call.
            </p>
          </div>

          <div className="mt-12 grid lg:grid-cols-2 gap-8 items-stretch">
            {advisory.map((tier) => (
              <div
                key={tier.key}
                className={`flex flex-col rounded-2xl border p-8 md:p-10 ${
                  tier.flagship ? "border-accent bg-card-flagship shadow-sm" : "border-border bg-card"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-accent-light text-accent-dark">
                    <tier.Icon />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight">{tier.name}</h3>
                </div>
                <p className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  <span className="text-muted">/month</span>
                </p>
                <p className="mt-1 text-sm font-semibold text-accent">3-month minimum</p>
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
                <Link
                  href={`/apply?interest=${tier.key}`}
                  className={`mt-10 block text-center px-6 py-4 rounded-lg font-semibold transition-colors ${
                    tier.flagship
                      ? "bg-accent hover:bg-accent-dark text-white"
                      : "border-2 border-foreground hover:bg-foreground hover:text-white"
                  }`}
                >
                  Apply for {tier.name}
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-border bg-card p-8">
            <h3 className="font-bold">Both advisory tiers include</h3>
            <ul className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {advisoryIncludes.map((item) => (
                <li key={item} className="flex gap-3 text-sm">
                  <Check />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted leading-relaxed">
              <strong className="text-foreground">The guarantee:</strong>{" "}show up fully, work the
              strategy, and if you don&rsquo;t see a tangible return in three months, Jeff keeps
              working with you for free until you do or refunds you 100%.
            </p>
          </div>
        </div>
      </section>

      {/* ========== COMPARISON ========== */}
      <section className="py-16 md:py-24 bg-card border-y border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Working with Jeff, side by side</h2>
          <div className="mt-10 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[640px] text-left bg-background">
              <thead>
                <tr className="border-b border-border">
                  <th className="p-5 text-sm font-semibold text-muted w-1/4">&nbsp;</th>
                  <th className="p-5 text-sm font-bold">Strategy Session</th>
                  <th className="p-5 text-sm font-bold">Private Advisory</th>
                  <th className="p-5 text-sm font-bold bg-card-flagship">VIP Advisory</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.label} className="border-b border-border last:border-0">
                    <th className="p-5 text-sm font-semibold align-top">{row.label}</th>
                    <td className="p-5 text-sm text-muted align-top"><Cell value={row.s} /></td>
                    <td className="p-5 text-sm text-muted align-top"><Cell value={row.p} /></td>
                    <td className="p-5 text-sm text-muted align-top bg-card-flagship"><Cell value={row.v} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========== WHO ========== */}
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
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Who you&rsquo;re working with</h2>
              <p className="mt-6 text-lg text-white/70 leading-relaxed">
                Jeff holds himself to a 5-10x return on what you put in, usually through capital
                raised or cost taken out. What you&rsquo;re buying is someone who has already made
                these calls, catching what you don&rsquo;t know you don&rsquo;t know before it costs
                you.
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

      {/* ========== HOW APPLYING WORKS ========== */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">How applying for advisory works</h2>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {applySteps.map((step) => (
              <div key={step.n} className="rounded-xl border border-border bg-card p-6">
                <span className="text-sm font-bold tracking-wider text-accent">{step.n}</span>
                <h3 className="mt-3 font-bold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-2xl border border-border bg-card-flagship p-8 md:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Not sure which one fits?</h2>
            <p className="mt-4 text-muted leading-relaxed max-w-2xl mx-auto">
              Start with a Strategy Session. You get Jeff&rsquo;s read on your business, and if
              you keep going, it&rsquo;s credited. Or apply and we&rsquo;ll help you pick.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <BuySessionButton />
              <Link
                href="/apply?interest=unsure"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg border-2 border-foreground hover:bg-foreground hover:text-white font-semibold transition-colors"
              >
                Apply to work with Jeff
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
