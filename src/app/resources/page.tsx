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

const tools = [
  {
    icon: "📊",
    title: "CPG Chart of Accounts",
    description:
      "The CPG-specific chart of accounts template that sets up your financials correctly from day one. Get freight, trade spend, and slotting in the right places.",
    tag: "CPG Chart of Accounts",
  },
  {
    icon: "💰",
    title: "Capital Raise & Runway Calculator",
    description:
      "Model your burn rate, calculate your exact runway, and plan your next raise. Know exactly when you need to start fundraising.",
    tag: "Capital Raise & Runway Calculator",
  },
  {
    icon: "📈",
    title: "Unit Pricing & Break-Even Model",
    description:
      "Model your unit economics, find your break-even point, and test different pricing scenarios before you commit.",
    tag: "Unit Pricing & Break-Even Model",
  },
];

const whitePapers = [
  {
    icon: "📄",
    title: "Suja Lessons Learned",
    description:
      "The key lessons from building Suja Juice from $600K to $100M in revenue. What worked, what didn't, and what Jeff would do differently.",
    tag: "Suja Lessons Learned White Paper",
  },
  {
    icon: "⚠️",
    title: "CPG Fatal Flaws",
    description:
      "The most common mistakes that kill CPG brands before they have a chance to succeed. Learn from other founders' fatal flaws so you don't repeat them.",
    tag: "CPG Fatal Flaws White Paper",
  },
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

      {/* ========== FEATURED: FUNDRAISING WEBINAR ========== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-card-flagship rounded-xl border border-accent/30 ring-2 ring-accent/20 p-6 sm:p-8 md:p-10">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full mb-4">
                  Featured Training
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Fundraising Masterclass with Jeff Church
                </h2>
                <p className="mt-4 text-muted leading-relaxed">
                  3 hours of deep-dive training on everything you need to know about raising capital
                  for your CPG brand. Valuations, pitch decks, investor targeting, dilution math,
                  SAFEs vs equity, and the exact frameworks Jeff used to raise $275M+ across 40+
                  rounds.
                </p>
                <p className="mt-2 text-sm text-muted">
                  Includes the CPG Chart of Accounts, Capital Raise Calculator, and Unit Pricing
                  Model.
                </p>
                <div className="mt-6">
                  <ResourceModal
                    resourceName="Fundraising Masterclass Replay (3 Hours)"
                    buttonLabel="Get the replay &rarr;"
                  />
                </div>
              </div>
              <div className="relative aspect-video rounded-xl overflow-hidden bg-foreground/5 border border-border">
                <div className="flex items-center justify-center h-full text-muted text-sm">
                  <div className="text-center">
                    <p className="text-4xl mb-2">🎬</p>
                    <p className="font-semibold">3-Hour Video Replay</p>
                    <p className="text-xs mt-1">Sign up to get instant access</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FREE TOOLS ========== */}
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
              Tools & Templates
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Free tools to run your business
            </h2>
            <p className="mt-4 text-lg text-muted">
              The same financial models and templates Jeff uses with his portfolio brands. Yours for
              free.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {tools.map((tool) => (
              <div
                key={tool.title}
                className="bg-card rounded-xl border border-border p-6 flex flex-col"
              >
                <p className="text-3xl mb-3">{tool.icon}</p>
                <h3 className="text-lg font-bold mb-2">{tool.title}</h3>
                <p className="text-sm text-muted leading-relaxed flex-1">{tool.description}</p>
                <div className="mt-5 pt-4 border-t border-border">
                  <ResourceModal
                    resourceName={tool.tag}
                    buttonLabel="Get this tool &rarr;"
                  />
                </div>
              </div>
            ))}
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

      {/* ========== UPCOMING: PROFITABILITY WORKSHOP ========== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-foreground rounded-xl p-6 sm:p-8 md:p-10 text-white">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full mb-4">
                  Upcoming Workshop
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  CPG Profitability Workshop
                </h2>
                <p className="mt-4 text-white/70 leading-relaxed">
                  Reduce your burn and get to profitability faster. 90 minutes of live training with
                  Jeff on the exact frameworks CPG founders use to extend their runway. Free.
                </p>
                <p className="mt-2 text-white/50 text-sm">
                  April 23rd - 90 Minutes - Live on Zoom
                </p>
                <p className="mt-1 text-white/40 text-xs italic">
                  Replay will be available here after the live event.
                </p>
                <div className="mt-6">
                  <Link
                    href="/burn-rate-workshop"
                    className="inline-flex items-center justify-center px-6 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors"
                  >
                    Reserve your spot &rarr;
                  </Link>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/5 rounded-xl p-8">
                  <p className="text-5xl mb-3">🔥</p>
                  <p className="text-2xl font-bold">April 23rd</p>
                  <p className="text-white/50 mt-1">Free - Live on Zoom</p>
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
                Join 150+ CPG founders for peer-to-peer support, quick answers, vetted partner
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

      {/* Bottom CTA */}
      <section className="py-16 md:py-24 bg-dark">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Ready to unlock everything CPG Founders Group has to offer?
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Explore our programs and ways to work with Jeff.
          </p>
          <div className="mt-8">
            <Link
              href="/#programs"
              className="inline-flex items-center justify-center px-8 py-4 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors text-lg"
            >
              View programs &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
