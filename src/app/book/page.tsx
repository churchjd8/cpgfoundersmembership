import type { Metadata } from "next";
import Link from "next/link";
import { BookWaitlistForm } from "@/components/book-waitlist-form";

export const metadata: Metadata = {
  title: "The Cold-Pressed Truth - A Founder's Field Guide | Jeff Church",
  description:
    "Jeff Church's book on building Suja from an ice closet to $100 million in six years. A Founder's Field Guide to Building, Scaling, and Selling a Consumer Brand. Foreword by Jay Shetty. Join the waitlist.",
};

const praise = [
  {
    quote:
      "Jeff shows that great companies aren't built on shortcuts or luck - they're built on timeless principles, disciplined execution, and relentless learning. This is required reading for anyone building a brand they want to endure.",
    name: "Mark Rampolla",
    title: "Founder of ZICO Coconut Water; author of An Entrepreneur's Guide to Freedom",
  },
  {
    quote:
      "Jeff Church has done it all as an entrepreneur - driven hypergrowth and delivered stellar returns to investors. But he's also managed disappointments and setbacks. Through it all, he's been the same level-headed and resilient leader. Any entrepreneur at any stage can learn from the wisdom in this book - I know I did!",
    name: "Seth Goldman",
    title: "Founder of Honest Tea",
  },
  {
    quote:
      "Jeff is truly the Yoda of CPG. When I made the leap from tech into beverage with JUNI, his guidance helped us avoid mistakes that could have cost us years and millions. The Cold-Pressed Truth is the kind of book every founder should have from day one: practical, honest, and packed with hard-earned wisdom. Must-read.",
    name: "Kim Perell",
    title:
      "Co-Founder of JUNI Adaptogen Tea; bestselling author of Mistakes That Made Me a Millionaire",
  },
  {
    quote:
      "In CPG, the difference between the brands that endure and the brands that disappear comes down to discipline - about margin, about culture, about cash. Jeff has built it, lost it, and won it back, and he teaches it here with a generosity that's rare in this industry. The Cold-Pressed Truth belongs on the desk of every CPG founder.",
    name: "John Foraker",
    title: "Co-Founder & CEO, Once Upon a Farm; former CEO, Annie's",
  },
];

const parts = [
  {
    number: "Part I",
    title: "Building a Strong Foundation",
    detail:
      "Founder's DNA, pre-launch roadmap and budget, the M.A.P. framework, stage-gate process, the life stages of a brand, fundraising, culture, and the ten startup misconceptions that crack a foundation.",
  },
  {
    number: "Part II",
    title: "Scaling the Engine",
    detail:
      "Scaling without losing control, systems, the battle of the shelf, innovation and the art of the pivot, strategic partnerships, retail relationships, and Coca-Cola's fateful decision.",
  },
  {
    number: "Part III",
    title: "The Exit",
    detail:
      "The moment of truth, personal reflections on leading a startup, Babu's field guide, fatal flaws versus recoverable mistakes, and the universal principles for any startup.",
  },
];

export default function BookPage() {
  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative bg-foreground text-white overflow-hidden">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full mb-6">
            Coming soon
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
            The Cold-Pressed Truth
          </h1>
          <p className="mt-5 text-xl sm:text-2xl text-white/80 font-medium leading-snug">
            A Founder&rsquo;s Field Guide to Building, Scaling, and Selling a Consumer Brand
          </p>
          <p className="mt-6 text-lg text-accent font-semibold">
            Foreword by Jay Shetty
          </p>
          <p className="mt-8 text-lg text-white/70 leading-relaxed">
            An eight-time founder tells the unvarnished story of building Suja Juice from an ice
            closet to $100 million in six years - and of the July 3rd phone call when Coca-Cola
            declined to buy the rest of it - then turns three decades of wins and wipeouts into a
            working manual for anyone building a consumer brand.
          </p>
          <p className="mt-6 text-white/50">
            It isn&rsquo;t out yet. Drop your name below and you&rsquo;ll hear the day it lands.
          </p>
          <BookWaitlistForm />
        </div>
      </section>

      {/* ========== FOREWORD ========== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
              From the Foreword
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Jay Shetty</h2>
          </div>
          <blockquote className="space-y-6 text-lg text-muted leading-relaxed">
            <p>
              &ldquo;In a world that often glorifies hype, noise, and overnight success, Jeff
              Church has chosen a different path.&rdquo;
            </p>
            <p>
              &ldquo;He understands that entrepreneurship isn&rsquo;t about having the best idea or
              being the smartest person in the room. The real work of leading a startup for the
              long haul begins within. He also knows that outcomes are shaped long before they are
              visible, through the countless small decisions most people never see.&rdquo;
            </p>
            <p className="text-foreground font-semibold">
              &ldquo;I would strongly consider it essential reading for entrepreneurs in Consumer
              related industries.&rdquo;
            </p>
          </blockquote>
          <p className="mt-8 text-sm text-muted text-center">
            &mdash; Jay Shetty, author of <em>Think Like a Monk</em>
          </p>
        </div>
      </section>

      {/* ========== WHAT IT IS ========== */}
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
              What&rsquo;s inside
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Part memoir, part operating manual
            </h2>
            <p className="mt-4 text-lg text-muted leading-relaxed">
              Twenty-three chapters across three parts, plus an epilogue and a field guide to the
              retail metrics that actually matter. It keeps interrupting the story to hand you a
              tool, and it keeps admitting what the story cost. Failures get as much airtime as
              wins.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {parts.map((p) => (
              <div
                key={p.number}
                className="bg-card rounded-xl border border-border p-6 sm:p-8 flex flex-col"
              >
                <p className="text-sm font-bold uppercase tracking-wider text-accent">
                  {p.number}
                </p>
                <h3 className="mt-2 text-xl font-bold tracking-tight">{p.title}</h3>
                <p className="mt-3 text-muted leading-relaxed">{p.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PRAISE ========== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
              Advance Praise
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              What founders who&rsquo;ve done it are saying
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {praise.map((p) => (
              <figure
                key={p.name}
                className="bg-card rounded-xl border border-border p-6 sm:p-8 flex flex-col"
              >
                <blockquote className="text-muted leading-relaxed flex-1">
                  &ldquo;{p.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 pt-4 border-t border-border">
                  <p className="font-bold">{p.name}</p>
                  <p className="text-sm text-muted">{p.title}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ========== WAITLIST REPEAT ========== */}
      <section className="py-16 md:py-24 bg-foreground text-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Know the day it lands
          </h2>
          <p className="mt-4 text-lg text-white/70 leading-relaxed">
            <strong className="text-white">The Cold-Pressed Truth: A Founder&rsquo;s Field Guide
            to Building, Scaling, and Selling a Consumer Brand.</strong> Foreword by Jay Shetty.
          </p>
          <BookWaitlistForm />
          <p className="mt-10 text-white/50">
            In the meantime, everything Jeff has that&rsquo;s already free lives{" "}
            <Link href="/resources" className="text-accent hover:text-accent-dark font-semibold">
              here
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
