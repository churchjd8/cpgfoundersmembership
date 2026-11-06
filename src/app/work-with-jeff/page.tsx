import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MBA_PRICE_USD } from "@/lib/mba-offer";
import {
  STRATEGY_SESSION_CREDIT_DAYS,
  STRATEGY_SESSION_PRICE_USD,
} from "@/lib/strategy-session-offer";

// One offer, one action. This page sells a call: a two-minute application at
// /apply, then a 20-minute intro call with Joshua, where advisory (and the
// Strategy Session as the lighter option) gets sold. No tiers and no advisory
// prices here on purpose; the two tiers and their numbers live on the unlisted
// /advisory breakdown Joshua sends after an application (see
// src/lib/advisory-offer.ts). The $997 Strategy Session keeps a buy button in
// the strip at the bottom because this is the only page that sells it.

export const metadata: Metadata = {
  title: "Work with Jeff Church - CPG Founders Group",
  description:
    "Get Jeff Church in your corner. Apply in two minutes, then book a short intro call with his team.",
  robots: { index: false, follow: false },
};

const BABU_URL = "https://www.askbabu.ai";
const session = `$${STRATEGY_SESSION_PRICE_USD.toLocaleString()}`;

// Written tier-neutral. The Private vs VIP split (kickoff length, 1:1 cadence,
// price) is deliberately not on this page; it's on /advisory.
const points = [
  {
    title: "A deep-dive kickoff",
    body: "Jeff goes deep on your business under NDA, with pre-work and his own research done first. You walk out with the roadmap and your priorities ranked.",
  },
  {
    title: "Regular 1:1s with Jeff",
    body: "Standing calls to work the plan and make the calls in real time, with Jeff in your corner while you execute.",
  },
  {
    title: "Email access between calls",
    body: "Gut-checks on a retailer ask, eyes on your model or deck, a second opinion when you need one.",
  },
  {
    title: "Warm industry intros",
    body: "Buyers, brokers, distributors, co-mans and investors. Jeff is one degree from most of the space.",
  },
  {
    title: "Babu AI Pro and the MBA for CPG included",
    body: "The AI advisor trained on Jeff's playbook, plus lifetime access to the full course and template library.",
  },
  {
    title: "The ROI guarantee",
    body: "Show up fully, work the strategy, and if you don't see a tangible return in three months, Jeff keeps working with you for free until you do or refunds you 100%.",
  },
];

const credentials = [
  "Co-founded Suja Juice: $100M+ revenue in 5 years, sold for $300M",
  "8x founder/CEO, 5 exits totaling $700M+ returned to investors",
  "$275M+ raised across 40+ funding rounds",
  "35+ years in CPG, one degree from most buyers, brokers and investors",
];

const steps = [
  {
    n: "01",
    title: "Apply",
    body: "Two minutes. Tell us where the business is and what you're up against.",
  },
  {
    n: "02",
    title: "Book the call",
    body: "You pick a time right after you apply. Twenty minutes with Joshua from Jeff's team, and you get the full breakdown, including what it costs, before you talk.",
  },
  {
    n: "03",
    title: "Start with Jeff",
    body: "If it's a fit both ways, we get your kickoff on Jeff's calendar.",
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

function ApplyButton({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/apply"
      className={`inline-flex w-full sm:w-auto items-center justify-center px-8 py-4 rounded-lg bg-accent hover:bg-accent-dark text-white font-semibold text-lg transition-colors ${className}`}
    >
      Apply to work with Jeff &rarr;
    </Link>
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
              Private advisory &middot; by application
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
              Get Jeff in your corner.
            </h1>
            <p className="mt-6 text-lg text-white/70 leading-relaxed">
              Jeff co-founded Suja Juice and scaled it past $100M in five years before a $300M
              exit. He has raised $275M+ and been founder/CEO eight times. He works 1:1 with a
              small number of founders at a time, and it starts with a two-minute application
              and a 20-minute call with his team.
            </p>
            <div className="mt-8">
              <ApplyButton />
              <p className="mt-3 text-sm text-white/60">1-2 spots open right now.</p>
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

      {/* ========== WHAT IT LOOKS LIKE ========== */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-sm font-bold uppercase tracking-wider text-accent">Private advisory</span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight">
              What working with Jeff looks like
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              Jeff in your corner, building the strategy with you and staying close while you
              execute. The full breakdown, including what it costs, comes after you apply.
            </p>
          </div>
          <ul className="mt-12 grid md:grid-cols-2 gap-x-10 gap-y-8">
            {points.map((item) => (
              <li key={item.title} className="flex gap-3">
                <Check />
                <div>
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted leading-relaxed">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
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

      {/* ========== HOW IT WORKS + CTA ========== */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">How it works</h2>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {steps.map((step) => (
              <div key={step.n} className="rounded-xl border border-border bg-card p-6">
                <span className="text-sm font-bold tracking-wider text-accent">{step.n}</span>
                <h3 className="mt-3 font-bold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-2xl border-2 border-accent bg-card-flagship p-8 md:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">The next step is a conversation.</h2>
            <p className="mt-4 text-muted leading-relaxed max-w-2xl mx-auto">
              Twenty minutes with Jeff&rsquo;s team to talk through where you are and what
              you&rsquo;re trying to hit. If it isn&rsquo;t a fit, we&rsquo;ll tell you that too.
            </p>
            <div className="mt-8">
              <ApplyButton />
            </div>
          </div>
        </div>
      </section>

      {/* ========== NOT READY ========== */}
      <section className="py-12 md:py-16 bg-card border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted">Not ready for a call?</h3>
          <div className="mt-6 grid md:grid-cols-2 gap-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 rounded-xl border border-border bg-background p-6">
              <div className="flex-1">
                <p className="font-bold">Jeff Strategy Session</p>
                <p className="mt-1 text-sm text-muted leading-relaxed">
                  Ninety minutes 1:1 with Jeff on the one decision that matters most right now.{" "}
                  {session} one time, MBA for CPG included, credited toward advisory if you start
                  within {STRATEGY_SESSION_CREDIT_DAYS} days.
                </p>
              </div>
              <form action="/api/strategy-session-checkout" method="POST" className="flex-shrink-0">
                <button
                  type="submit"
                  className="inline-flex w-full sm:w-auto items-center justify-center px-5 py-3 rounded-lg border-2 border-foreground hover:bg-foreground hover:text-white font-semibold transition-colors"
                >
                  Book a session
                </button>
              </form>
            </div>
            <div className="rounded-xl border border-border bg-background p-6">
              <p className="font-bold">Learn on your own</p>
              <p className="mt-1 text-sm text-muted leading-relaxed">
                Start with the{" "}
                <Link href="/resources" className="text-accent font-semibold hover:underline">
                  free resource library
                </Link>
                , get Jeff&rsquo;s answers on call with{" "}
                <a
                  href={BABU_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent font-semibold hover:underline"
                >
                  Babu AI
                </a>{" "}
                from $29/mo, or take the whole playbook self-paced with the{" "}
                <Link href="/mba-for-cpg" className="text-accent font-semibold hover:underline">
                  MBA for CPG
                </Link>{" "}
                for ${MBA_PRICE_USD}.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
