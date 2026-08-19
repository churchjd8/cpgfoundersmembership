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
    label: "The Profitability Kit",
    lead: "Five tools and the workshop that goes with them.",
    items: [
      { title: "Pricing Calculator", body: "Start from MSRP or COGS, compare both, find your optimal price." },
      { title: "Trade Promo Break-Even Calculator", body: "Know if a promo is worth running before you commit." },
      { title: "SKU Rationalization Tool", body: "See which SKUs carry your brand and which ones to cut." },
      { title: "Cash Conversion Cycle Tool", body: "See how your payment terms trap or free cash." },
      { title: "Cash Runway Calculator", body: "Model your burn across three years and size your next raise." },
      {
        title: "Reducing the Burn (90-min workshop)",
        body: "Getting to profitability faster. Pricing, trade spend, SKU rationalization, cash conversion, runway planning.",
      },
    ],
  },
  {
    label: "The Fundraising Kit",
    lead: "Three tools and the three-hour masterclass.",
    items: [
      { title: "CPG Chart of Accounts", body: "Set up your financials correctly from day one." },
      { title: "Capital Raise & Runway Calculator", body: "Model your burn rate and plan your raise. Includes a video walkthrough." },
      { title: "Unit Pricing & Break-Even Model", body: "Find your break-even point and test pricing scenarios. Includes a video walkthrough." },
      {
        title: "Fundraising Masterclass (3 hrs)",
        body: "Valuations, decks, investor targeting, dilution math, SAFEs vs. equity - the frameworks from 44 rounds and $275M+ raised.",
      },
    ],
  },
  {
    label: "Training & White Paper",
    lead: "The operating system, and the mistakes to avoid building it.",
    items: [
      {
        title: "The CPG Playbook Training",
        body: "All 23 plays for building and scaling a brand, walked through live. KPIs to exit planning.",
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
                things. So here is 10 days of Babu AI free, the WhatsApp group where 350+ CPG
                founders answer each other in real time, and every calculator, model, and
                workshop I use with the founders I advise.
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
              Start with these two
            </h2>
            <p className="mt-4 text-lg text-muted leading-relaxed">
              The book is the thinking. These two are the thinking on demand - one machine that
              answers whatever you bring it, and 350 founders who have already been where you
              are. Everything else in the toolbox comes with them.
            </p>
          </div>

          {/* Two headliners */}
          <div className="grid gap-6 lg:grid-cols-2 mb-16">
            <a
              href="https://www.askbabu.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col bg-foreground text-white rounded-2xl p-8 hover:shadow-xl transition-all"
            >
              <span className="inline-block self-start px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full mb-5">
                10 days free
              </span>
              <p className="text-4xl mb-4">🤖</p>
              <h3 className="text-2xl font-bold tracking-tight">Babu AI</h3>
              <p className="mt-3 text-white/70 leading-relaxed flex-1">
                Every spreadsheet below answers one question. Babu answers whatever you bring it -
                pricing, promo math, retailer strategy, co-man contracts, fundraising prep -
                trained on 35+ years of operating experience and 4,000+ of my own resources.
                Underneath it sit 40+ purpose-built Gurus, each one built for a single job.
              </p>
              <span className="mt-6 inline-flex items-center font-semibold text-gold group-hover:text-white transition-colors">
                Start the free trial &rarr;
              </span>
            </a>

            <Link
              href="/founders-only"
              className="group flex flex-col bg-ridge text-white rounded-2xl p-8 hover:shadow-xl transition-all"
            >
              <span className="inline-block self-start px-3 py-1 text-xs font-bold uppercase tracking-wider bg-gold text-foreground rounded-full mb-5">
                Always free
              </span>
              <p className="text-4xl mb-4">💬</p>
              <h3 className="text-2xl font-bold tracking-tight">The CPG Founders Club</h3>
              <p className="mt-3 text-white/80 leading-relaxed flex-1">
                350+ CPG founders in one WhatsApp group, every stage from pre-launch to exit,
                answering each other&rsquo;s questions in real time. Somebody in there has already
                solved the thing you&rsquo;re stuck on today. Nobody sells anything in there - that
                is the whole rule, and it is why it works.
              </p>
              <span className="mt-6 inline-flex items-center font-semibold text-gold group-hover:text-white transition-colors">
                Request to join &rarr;
              </span>
            </Link>
          </div>

          <div className="max-w-3xl mb-10 pt-4 border-t border-border">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              And the rest of the toolbox
            </h2>
            <p className="mt-3 text-lg text-muted leading-relaxed">
              Two kits, the Playbook, and the Fatal Flaws paper. Built over 35 years and eight
              companies. Most of them exist because I got something wrong first and had to build
              the thing that would have saved me.
            </p>
          </div>

          <div className="space-y-12">
            {kits.map((kit) => (
              <div key={kit.label}>
                <div className="border-b border-border pb-3 mb-6">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-accent">
                    {kit.label}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{kit.lead}</p>
                </div>
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
