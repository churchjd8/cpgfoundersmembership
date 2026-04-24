import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Fundraising Masterclass Replay - CPG Founders Group",
  description:
    "3 hours of deep-dive training on raising capital for your CPG brand. Valuations, pitch decks, investor targeting, dilution math, SAFEs vs equity, and the exact frameworks Jeff used to raise $275M+ across 40+ rounds.",
};

const tools = [
  {
    icon: "📊",
    title: "CPG Chart of Accounts",
    description:
      "The CPG-specific chart of accounts template that sets up your financials correctly from day one.",
    downloadHref: "https://drive.google.com/uc?export=download&id=1tqSBrstaRNyrdK3jVNWPH8odWWGhO0JD",
  },
  {
    icon: "💰",
    title: "Capital Raise & Runway Calculator",
    description:
      "Model your burn rate, calculate your exact runway, and plan your next raise with precision.",
    downloadHref: "https://drive.google.com/uc?export=download&id=1ITv8j6I0le2Ge6jdIE26Ef-iom91BUHC",
    videoHref: "https://drive.google.com/uc?export=download&id=10vAkJYhL_na6kqXmE7EJjz6IjSgZ_2bM",
  },
  {
    icon: "📈",
    title: "Unit Pricing & Break-Even Model",
    description:
      "Model your unit economics, find your break-even point, and test different pricing scenarios.",
    downloadHref: "https://drive.google.com/uc?export=download&id=1BYW6fUvuS3p3b4F0-vLARE0j985aHg_D",
    videoHref: "https://drive.google.com/uc?export=download&id=1nL1tqta3miixB3aYK0vkl7FdyMxSghFl",
  },
];

export default function FundraisingMasterclassPage() {
  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative bg-foreground text-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full mb-6">
              Free Training
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
              Fundraising Masterclass with Jeff Church
            </h1>
            <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
              3 hours of deep-dive training on everything you need to know about raising
              capital for your CPG brand.
            </p>
          </div>
        </div>
      </section>

      {/* ========== VIDEO EMBED ========== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
            <iframe
              src="https://www.youtube.com/embed/Z_4cPeWG1RI"
              title="Fundraising Masterclass with Jeff Church"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* ========== INCLUDED TOOLS ========== */}
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
              Included Tools
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              3 free tools to put it into action
            </h2>
            <p className="mt-4 text-lg text-muted">
              Download the Excel files, plug in your numbers, and start planning your raise.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {tools.map((tool) => (
              <div
                key={tool.title}
                className="bg-card-flagship rounded-xl border border-accent/30 p-6 text-center flex flex-col"
              >
                <p className="text-4xl mb-4">{tool.icon}</p>
                <h3 className="text-lg font-bold mb-2">{tool.title}</h3>
                <p className="text-sm text-muted leading-relaxed flex-1">
                  {tool.description}
                </p>
                <div className="mt-5 pt-4 border-t border-border space-y-2">
                  <a
                    href={tool.downloadHref}
                    className="inline-flex items-center justify-center w-full px-5 py-2.5 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors text-sm"
                  >
                    Download Excel &darr;
                  </a>
                  {"videoHref" in tool && tool.videoHref && (
                    <a
                      href={tool.videoHref}
                      className="inline-flex items-center justify-center w-full px-5 py-2.5 bg-foreground/10 hover:bg-foreground/20 text-foreground font-semibold rounded-lg transition-colors text-sm"
                    >
                      Download video walkthrough &darr;
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== WHAT YOU'LL LEARN ========== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
              What You&rsquo;ll Learn
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Everything you need to raise capital
            </h2>
            <p className="mt-4 text-lg text-muted">
              The exact frameworks Jeff used to raise $275M+ across 40+ rounds.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Valuations",
                description:
                  "How to value your CPG brand at every stage and what investors actually look for in the numbers.",
              },
              {
                title: "Pitch Decks",
                description:
                  "Build a pitch deck that gets meetings. The slides that matter, the ones that don't, and how to tell your story.",
              },
              {
                title: "Investor Targeting",
                description:
                  "Find the right investors for your stage and category. Stop wasting time on bad-fit conversations.",
              },
              {
                title: "Dilution Math",
                description:
                  "Understand exactly how much you're giving up in every round and how to protect your ownership.",
              },
              {
                title: "SAFEs vs Equity",
                description:
                  "When to use a SAFE, when to do a priced round, and the real tradeoffs most founders miss.",
              },
              {
                title: "Fundraising Frameworks",
                description:
                  "The step-by-step process for running a successful raise from first outreach to signed term sheet.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-card rounded-xl border border-border p-6"
              >
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== WORK WITH JEFF CTA ========== */}
      <section className="py-16 md:py-24 bg-foreground text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full mb-6">
              Go Deeper
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Ready to work with Jeff?
            </h2>
            <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
              Whether you&rsquo;re preparing for your first raise or scaling past $10M, Jeff has
              programs designed for every stage of your CPG journey. From 1-on-1 coaching to
              AI-powered advisory, see how Jeff can help you build and scale your brand.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/90-day-breakthrough-apply"
                className="inline-flex items-center justify-center px-8 py-4 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors text-lg"
              >
                Apply for the 90-Day Breakthrough &rarr;
              </Link>
              <Link
                href="/resources"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors text-lg"
              >
                Explore free resources
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
