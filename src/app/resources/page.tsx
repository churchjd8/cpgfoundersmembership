import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { ResourceModal } from "./resource-modal";

export const metadata: Metadata = {
  title: "Free Resources for CPG Founders - CPG Founders Group",
  description:
    "Free tools, templates, video training, and white papers from Jeff Church. Everything you need to launch and scale your CPG brand.",
};

const whitePapers = [
  {
    icon: "📄",
    title: "Suja Lessons Learned",
    description:
      "The key lessons from building Suja Juice from $600K to $100M in revenue. What worked, what didn't, and what Jeff would do differently.",
    tag: "Suja Lessons Learned (white paper)",
  },
  {
    icon: "⚠️",
    title: "CPG Fatal Flaws",
    description:
      "The most common mistakes that kill CPG brands before they have a chance to succeed. Learn from other founders' fatal flaws so you don't repeat them.",
    tag: "CPG Fatal Flaws (white paper)",
  },
];

const workshopTools = [
  "Pricing Calculator",
  "Trade Promo Break-Even Calculator",
  "SKU Rationalization Tool",
  "Cash Conversion Cycle Tool",
  "Cash Runway Calculator",
];

export default function ResourcesPage() {
  const posts = getAllPosts();
  const featuredPost = posts.find((p) => p.featured);
  const recentPosts = posts.filter((p) => !p.featured).slice(0, 2);
  const displayPosts = featuredPost ? [featuredPost, ...recentPosts] : recentPosts;

  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative bg-foreground text-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full mb-6">
                All Free
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
                Free Resources for CPG Founders
              </h1>
              <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">
                Free tools, templates, and training from Jeff Church to help you with everything
                from fundraising and cash management to retail strategy and scaling operations.
              </p>
              <div className="mt-8">
                <ResourceModal
                  resourceName="All Free Resources Bundle"
                  buttonLabel="Download all resources &rarr;"
                  buttonClass="inline-flex items-center justify-center px-8 py-4 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors text-lg"
                />
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <Image
                  src="/images/jeff-teaching.webp"
                  alt="Jeff Church teaching at whiteboard"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FEATURED TRAININGS ========== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
              Featured Trainings
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Live workshop replays with Jeff
            </h2>
            <p className="mt-4 text-lg text-muted">
              Hours of deep-dive training on fundraising, profitability, and the frameworks Jeff
              used to build and scale CPG brands.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Reducing the Burn Workshop */}
            <div className="bg-card-flagship rounded-xl border border-accent/30 ring-2 ring-accent/20 p-6 sm:p-8 flex flex-col">
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full mb-4 self-start">
                New
              </span>
              <h3 className="text-2xl font-bold tracking-tight">
                Reducing the Burn: CPG Profitability Workshop
              </h3>
              <p className="mt-4 text-muted leading-relaxed">
                90 minutes on reducing your burn rate and getting to profitability faster.
                Pricing strategy, trade spend management, SKU rationalization, cash conversion,
                and runway planning.
              </p>
              <div className="mt-4">
                <p className="text-sm font-semibold mb-2">Includes 5 free tools:</p>
                <ul className="text-sm text-muted space-y-1">
                  {workshopTools.map((tool) => (
                    <li key={tool} className="flex items-start gap-2">
                      <span className="text-accent mt-0.5">&#10003;</span>
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-border mt-auto">
                <ResourceModal
                  resourceName="Reducing the Burn Workshop Replay + Tools"
                  buttonLabel="Watch the replay + get all 5 tools &rarr;"
                  redirectTo="/burn-rate-workshop-replay"
                />
              </div>
            </div>

            {/* Fundraising Masterclass */}
            <div className="bg-card rounded-xl border border-border p-6 sm:p-8 flex flex-col">
              <h3 className="text-2xl font-bold tracking-tight">
                Fundraising Masterclass with Jeff Church
              </h3>
              <p className="mt-4 text-muted leading-relaxed">
                3 hours of deep-dive training on everything you need to know about raising capital
                for your CPG brand. Valuations, pitch decks, investor targeting, dilution math,
                SAFEs vs equity, and the exact frameworks Jeff used to raise $275M+ across 40+
                rounds.
              </p>
              <div className="mt-4">
                <p className="text-sm font-semibold mb-2">Includes 3 free tools:</p>
                <ul className="text-sm text-muted space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">&#10003;</span>
                    CPG Chart of Accounts
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">&#10003;</span>
                    Capital Raise &amp; Runway Calculator
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">&#10003;</span>
                    Unit Pricing &amp; Break-Even Model
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-border mt-auto">
                <ResourceModal
                  resourceName="Fundraising Masterclass Replay (3 Hours)"
                  buttonLabel="Watch the 3-hour replay + get all 3 tools &rarr;"
                  redirectTo="/fundraising-masterclass"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== WHITE PAPERS ========== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
              White Papers
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Deep dives from Jeff
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {whitePapers.map((wp) => (
              <div
                key={wp.title}
                className="bg-card rounded-xl border border-border p-6 flex flex-col"
              >
                <p className="text-3xl mb-3">{wp.icon}</p>
                <h3 className="text-lg font-bold mb-2">{wp.title}</h3>
                <p className="text-sm text-muted leading-relaxed flex-1">{wp.description}</p>
                <div className="mt-5 pt-4 border-t border-border">
                  <ResourceModal
                    resourceName={wp.tag}
                    buttonLabel="Download white paper &rarr;"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== VIDEO PLAYBOOK ========== */}
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-xl border border-border p-6 sm:p-8 md:p-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
                  Video Training
                </span>
                <h2 className="text-2xl font-bold tracking-tight">
                  Jeff&rsquo;s CPG Playbook - Live Walkthrough
                </h2>
                <p className="mt-4 text-muted leading-relaxed">
                  Watch Jeff walk through all 23 plays from his CPG Founder&rsquo;s Playbook live.
                  KPIs, fundraising, retail strategy, operations, team building, and exit planning -
                  straight from 35 years of building brands.
                </p>
                <div className="mt-6">
                  <ResourceModal
                    resourceName="CPG Playbook Video Replay"
                    buttonLabel="Watch the replay &rarr;"
                  />
                </div>
              </div>
              <div className="text-center">
                <div className="bg-background rounded-xl p-8">
                  <p className="text-5xl mb-3">🎯</p>
                  <p className="text-3xl font-bold text-accent">23 Plays</p>
                  <p className="text-muted mt-1">The complete operating system</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== COMMUNITY & BABU ========== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Connect and build with other founders
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* WhatsApp */}
            <div className="bg-card rounded-xl border border-border p-6 sm:p-8 flex flex-col">
              <p className="text-3xl mb-3">💬</p>
              <h3 className="text-xl font-bold mb-2">CPG Founders WhatsApp Group</h3>
              <p className="text-muted leading-relaxed flex-1">
                Join 200+ CPG founders for peer-to-peer support, quick answers, vetted partner
                introductions, and curated resources. Free, forever.
              </p>
              <div className="mt-6 pt-4 border-t border-border">
                <Link
                  href="/founders-only"
                  className="inline-flex items-center px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors text-sm"
                >
                  Request to join &rarr;
                </Link>
              </div>
            </div>

            {/* Babu */}
            <div className="bg-card rounded-xl border border-border p-6 sm:p-8 flex flex-col">
              <p className="text-3xl mb-3">🤖</p>
              <h3 className="text-xl font-bold mb-2">Babu AI - Free Trial</h3>
              <p className="text-muted leading-relaxed flex-1">
                Your on-demand CPG advisor. Deep Research, Launch Checklists, financial review,
                pricing analysis, and more. Trained on Jeff&rsquo;s 35+ years of CPG experience.
              </p>
              <div className="mt-6 pt-4 border-t border-border">
                <Link
                  href="/babu-early"
                  className="inline-flex items-center px-5 py-2.5 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors text-sm"
                >
                  Get free beta access &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FROM THE BLOG ========== */}
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
                From the Blog
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Featured insights
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden sm:inline-flex items-center text-sm font-semibold text-accent hover:text-accent-dark transition-colors"
            >
              See all posts &rarr;
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {displayPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-xl border border-border bg-card overflow-hidden hover:shadow-lg transition-shadow"
              >
                {post.image && (
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  {post.featured && (
                    <span className="inline-block px-2 py-0.5 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full mb-2">
                      Featured
                    </span>
                  )}
                  <h3 className="text-lg font-bold group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted line-clamp-2">{post.description}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm font-semibold text-accent hover:text-accent-dark transition-colors"
            >
              See all posts &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ========== 90-DAY BREAKTHROUGH CTA ========== */}
      <section className="py-16 md:py-24 bg-foreground text-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full mb-6">
            Go Deeper
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Ready to work through it with Jeff?
          </h2>
          <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            The 90-Day Breakthrough is where Jeff works directly with founders to break through
            whatever&rsquo;s blocking the next stage. Onboarding diagnostic, 3x/month group sessions,
            weekly accountability calls, email access to Jeff, and the full toolkit.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/90-day-breakthrough-apply"
              className="inline-flex items-center justify-center px-8 py-4 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors text-lg"
            >
              Apply for the 90-Day Breakthrough &rarr;
            </Link>
            <Link
              href="/#programs"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors text-lg"
            >
              See all programs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
