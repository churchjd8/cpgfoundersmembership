import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ToolboxForm } from "./toolbox-form";

// Book-only landing page. This is the destination printed as a QR code and URL
// in the front matter of "The Cold-Pressed Truth", kept separate from /resources
// so book-sourced traffic and signups are trackable on their own.

export const metadata: Metadata = {
  title: "The Toolbox - Free CPG Tools from The Cold-Pressed Truth",
  description:
    "You've got the book. Here's the toolbox that goes with it. Every calculator, model, workshop, and white paper Jeff Church uses with the founders he advises. Free.",
  openGraph: {
    title: "The Toolbox - Free CPG Tools from The Cold-Pressed Truth",
    description:
      "Every calculator, model, workshop, and white paper Jeff Church uses with the founders he advises. One signup, one email, all of it.",
    url: "https://cpgfoundersgroup.com/toolbox",
    siteName: "CPG Founders Group",
    type: "website",
  },
};

const kits = [
  {
    label: "Video Trainings",
    items: [
      {
        title: "Reducing the Burn",
        body: "90 minutes on getting to profitability faster. Pricing, trade spend, SKU rationalization, cash conversion, and runway planning.",
      },
      {
        title: "Fundraising Masterclass",
        body: "Three hours on raising capital. Valuations, decks, investor targeting, dilution math, SAFEs vs. equity - the frameworks from 44 rounds and $275M+ raised.",
      },
      {
        title: "The CPG Playbook Training",
        body: "All 23 plays for building and scaling a brand, walked through live. KPIs to exit planning.",
      },
    ],
  },
  {
    label: "Profitability Kit",
    items: [
      { title: "Pricing Calculator", body: "Start from MSRP or COGS, compare both, find your optimal price." },
      { title: "Trade Promo Break-Even Calculator", body: "Know if a promo is worth running before you commit." },
      { title: "SKU Rationalization Tool", body: "See which SKUs carry your brand and which ones to cut." },
      { title: "Cash Conversion Cycle Tool", body: "See how your payment terms trap or free cash." },
      { title: "Cash Runway Calculator", body: "Model your burn across three years and size your next raise." },
    ],
  },
  {
    label: "Fundraising Kit",
    items: [
      { title: "CPG Chart of Accounts", body: "Set up your financials correctly from day one." },
      { title: "Capital Raise & Runway Calculator", body: "Model your burn rate and plan your raise. Includes a video walkthrough." },
      { title: "Unit Pricing & Break-Even Model", body: "Find your break-even point and test pricing scenarios. Includes a video walkthrough." },
    ],
  },
  {
    label: "White Papers",
    items: [
      {
        title: "Suja: Lessons Learned",
        body: "What actually took us from $600K to $100 million in six years, and what I'd do differently.",
      },
      {
        title: "CPG Fatal Flaws",
        body: "The 18 mistakes that kill emerging brands before they get a fair shot. Learn them on my dime.",
      },
    ],
  },
];

export default function ToolboxPage() {
  return (
    <>
      {/* ========== HERO + OPT-IN ========== */}
      <section className="bg-foreground text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full mb-6">
                For readers of the book
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight">
                You&rsquo;ve got the book.
                <br />
                Here&rsquo;s the toolbox.
              </h1>
              <p className="mt-6 text-lg text-white/70 leading-relaxed">
                I wrote <em>The Cold-Pressed Truth</em> to hand you things, not just tell you
                things. Everything below is what I use with the founders I advise - the
                calculators, the models, the workshops, the war stories.
              </p>
              <p className="mt-4 text-lg text-white/70 leading-relaxed">
                One signup. One email. All of it. No cost, no call, no pitch.
              </p>

              <div className="mt-10">
                <ToolboxForm variant="dark" idPrefix="hero" />
              </div>
            </div>

            <div className="lg:pl-8">
              <div className="relative aspect-[2/3] max-w-sm mx-auto rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/book-covers/cover-b.jpg"
                  alt="The Cold-Pressed Truth by Jeff Church"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <p className="mt-6 text-center text-sm text-white/50 max-w-sm mx-auto">
                <em>The Cold-Pressed Truth</em> - A Founder&rsquo;s Field Guide to Building,
                Scaling &amp; Selling a Consumer Brand. Foreword by Jay Shetty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== WHAT'S INSIDE ========== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
              What&rsquo;s inside
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Thirteen tools, three trainings, two white papers
            </h2>
            <p className="mt-4 text-lg text-muted leading-relaxed">
              Built over 35 years and eight companies. Most of them exist because I got something
              wrong first and had to build the thing that would have saved me.
            </p>
          </div>

          <div className="space-y-12">
            {kits.map((kit) => (
              <div key={kit.label}>
                <h3 className="text-sm font-bold uppercase tracking-wider text-accent border-b border-border pb-3 mb-6">
                  {kit.label}
                </h3>
                <div className="grid gap-6 sm:grid-cols-2">
                  {kit.items.map((item) => (
                    <div key={item.title} className="flex gap-3">
                      <span className="text-accent font-bold mt-0.5 shrink-0">&#10003;</span>
                      <div>
                        <p className="font-bold leading-snug">{item.title}</p>
                        <p className="mt-1 text-sm text-muted leading-relaxed">{item.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== WHATSAPP BAND ========== */}
      <section className="bg-green-600 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
            <p className="text-4xl shrink-0">💬</p>
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                The tools are free. So is the room they came from.
              </h2>
              <p className="mt-2 text-white/80 leading-relaxed">
                275+ CPG founders in one WhatsApp group, answering each other&rsquo;s questions in
                real time. Nobody sells anything in there. The link is in your email too.
              </p>
            </div>
            <Link
              href="/founders-only"
              className="shrink-0 inline-flex items-center justify-center px-6 py-3 bg-white text-green-700 hover:bg-white/90 font-semibold rounded-lg transition-colors"
            >
              Request to join &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ========== SECOND OPT-IN ========== */}
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Take the tools. Then let&rsquo;s get to work.
            </h2>
            <p className="mt-4 text-lg text-muted leading-relaxed">
              Everything above, delivered in a single email you can come back to.
            </p>
          </div>
          <ToolboxForm idPrefix="footer" />
        </div>
      </section>

      {/* ========== ADVISORY CTA ========== */}
      <section className="py-16 md:py-24 bg-foreground text-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Want Jeff&rsquo;s eyes on your business?
          </h2>
          <p className="mt-6 text-lg text-white/70 leading-relaxed">
            The book and the toolbox are what he learned the hard way. If you want him working
            through it with you directly, he takes on a small number of founders at a time.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center px-8 py-4 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors text-lg"
            >
              Apply to work with Jeff &rarr;
            </Link>
            <Link
              href="/resources"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors text-lg"
            >
              Browse everything else
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
