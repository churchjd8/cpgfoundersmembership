import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Jeff's CPG Playbook - Live Walkthrough - CPG Founders Group",
  description:
    "Watch Jeff walk through all 23 plays from his CPG Founder's Playbook live. KPIs, fundraising, retail strategy, operations, team building, and exit planning - straight from 35 years of building brands.",
};

export default function CpgPlaybookTrainingPage() {
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
              Jeff&rsquo;s CPG Playbook - Live Walkthrough
            </h1>
            <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
              Watch Jeff walk through all 23 plays from his CPG Founder&rsquo;s Playbook live.
              KPIs, fundraising, retail strategy, operations, team building, and exit planning
              &mdash; straight from 35 years of building brands.
            </p>
          </div>
        </div>
      </section>

      {/* ========== VIDEO EMBED ========== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
            <iframe
              src="https://www.youtube.com/embed/QnALXWlDKR4"
              title="Jeff's CPG Playbook - Live Walkthrough"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* ========== THE 23 PLAYS ========== */}
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
              The 23 Plays
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              The complete CPG operating system
            </h2>
            <p className="mt-4 text-lg text-muted">
              Every play you need to launch, scale, and exit your CPG brand.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "KPIs & Metrics",
                description:
                  "The key performance indicators that actually matter at each stage of growth. Know what to measure and when.",
              },
              {
                title: "Fundraising",
                description:
                  "How to raise capital at every stage - from friends & family to Series A and beyond.",
              },
              {
                title: "Gross Margins",
                description:
                  "Pricing, COGS optimization, and the margin targets you need to hit to build a sustainable business.",
              },
              {
                title: "Retail Strategy",
                description:
                  "How to get on shelf, stay on shelf, and expand your retail footprint the right way.",
              },
              {
                title: "Team Building",
                description:
                  "When to hire, who to hire first, and how to build a team that scales with your brand.",
              },
              {
                title: "Exit Planning",
                description:
                  "Position your brand for acquisition from day one. What buyers look for and how to maximize your outcome.",
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

      {/* ========== READ THE WRITTEN VERSION ========== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-card-flagship rounded-xl border border-accent/30 ring-2 ring-accent/20 p-6 sm:p-8 md:p-10">
            <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full mb-4">
                  Written Version
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Prefer to read? Get the full playbook as a blog post.
                </h2>
                <p className="mt-4 text-muted leading-relaxed">
                  All 23 plays broken down in detail. Bookmark it, share it with your co-founder,
                  or reference it whenever you need a refresher.
                </p>
                <div className="mt-6">
                  <Link
                    href="/blog/cpg-founders-playbook"
                    className="inline-flex items-center justify-center px-6 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors"
                  >
                    Read the full playbook &rarr;
                  </Link>
                </div>
              </div>
              <div className="hidden md:block text-center">
                <div className="bg-background rounded-xl p-8">
                  <p className="text-5xl mb-3">🎯</p>
                  <p className="text-3xl font-bold text-accent">23 Plays</p>
                  <p className="text-muted mt-1 text-sm">The complete guide</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FREE RESOURCES CTA ========== */}
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
            Free Resources
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            More free tools and training
          </h2>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
            Download the CPG Chart of Accounts, Capital Raise Calculator, Unit Pricing Model,
            white papers, and more.
          </p>
          <div className="mt-8">
            <Link
              href="/resources"
              className="inline-flex items-center justify-center px-8 py-4 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors text-lg"
            >
              Access all free resources &rarr;
            </Link>
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
              Whether you&rsquo;re just getting started or scaling past $10M, Jeff has programs
              designed for every stage of your CPG journey. From 1-on-1 coaching to AI-powered
              advisory, see how Jeff can help you build and scale your brand.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/#programs"
                className="inline-flex items-center justify-center px-8 py-4 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors text-lg"
              >
                See how to work with Jeff &rarr;
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
