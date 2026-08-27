import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { ALWAYS_ON, KITS } from "@/lib/kits";
import { KitModal, KitOptIn, type KitTarget } from "@/components/kit-form";

// The public door to the free library. Same inventory and same three kits as
// /toolbox (the book door) — both render from src/lib/kits.ts so they can't
// drift. What differs is the framing: this page has to explain who Jeff is and
// why the tools are worth having, where the book has already done that.

export const metadata: Metadata = {
  title: "Free CPG Kits from Jeff Church - CPG Founders Group",
  description:
    "Three free kits for CPG founders: profitability, fundraising, and getting started. Every calculator, model, workshop, and white paper Jeff Church uses with the founders he advises.",
  openGraph: {
    title: "Free CPG Kits from Jeff Church",
    description:
      "Every calculator, model, workshop, and white paper Jeff Church uses with the founders he advises. Free.",
    url: "https://cpgfoundersgroup.com/resources",
    siteName: "CPG Founders Group",
    type: "website",
  },
};

const KIT_VISUALS = {
  profitability: {
    image: "/images/resources/profitability-kit.webp",
    alt: "Profitability kit with calculators, charts, and CPG product boxes",
    accent: "bg-accent",
    tint: "bg-accent-light",
    stat: "6 resources",
  },
  fundraising: {
    image: "/images/resources/fundraising-kit.webp",
    alt: "Fundraising kit with investor materials, charts, and CPG product boxes",
    accent: "bg-ridge",
    tint: "bg-blue-50",
    stat: "4 resources",
  },
  "starting-line": {
    image: "/images/resources/starting-line-kit.webp",
    alt: "Starting line kit with a playbook, checklist, map, and launch materials",
    accent: "bg-green-700",
    tint: "bg-green-50",
    stat: "4 resources",
  },
} as const;

const KIND_LABELS = {
  training: "Training",
  tool: "Tool",
  paper: "Paper",
  assessment: "Assessment",
} as const;

function ResourceIcon({ kind }: { kind: keyof typeof KIND_LABELS }) {
  const common = "h-4 w-4";

  if (kind === "training") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 6.5h16v11H4z" stroke="currentColor" strokeWidth="2" />
        <path d="M10 9.5l5 2.5-5 2.5z" fill="currentColor" />
      </svg>
    );
  }

  if (kind === "paper") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M7 3.5h7l3 3v14H7z" stroke="currentColor" strokeWidth="2" />
        <path d="M14 3.5v4h4M9.5 12h5M9.5 16h5" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }

  if (kind === "assessment") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M8 11l2.5 2.5L16 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M5 4.5h14v15H5z" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }

  return (
    <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 19h16M7 16v-5M12 16V7M17 16v-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M6 5h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function ResourcesPage() {
  const posts = getAllPosts();
  const featuredPost = posts.find((p) => p.featured);
  const recentPosts = posts.filter((p) => !p.featured).slice(0, 2);
  const displayPosts = featuredPost ? [featuredPost, ...recentPosts] : recentPosts;

  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative bg-foreground text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(120deg,transparent_0,transparent_46%,#dfa13c_46%,#dfa13c_47%,transparent_47%,transparent_100%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full mb-6">
                All free
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
                Three kits.
                <br />
                Everything I use with the founders I advise.
              </h1>
              <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">
                Not a folder of spreadsheets. Three kits, each one built around a job you&rsquo;re
                actually trying to do &mdash; get profitable, raise money, or start without
                stepping on the mines. Every calculator, model, workshop, and white paper I built
                across 35 years and eight companies.
              </p>
              <p className="mt-4 text-lg text-white/70 max-w-2xl leading-relaxed">
                All of it free. No call, no pitch, no catch.
              </p>
              <div className="mt-8">
                <a
                  href="#kits"
                  className="inline-flex items-center justify-center px-8 py-4 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors text-lg"
                >
                  See what&rsquo;s in them &rarr;
                </a>
              </div>
              <div className="mt-10 grid grid-cols-3 gap-3 max-w-xl">
                {[
                  ["14", "resources"],
                  ["3", "kits"],
                  ["0", "pitch calls"],
                ].map(([value, label]) => (
                  <div key={label} className="border border-white/15 bg-white/5 rounded-lg p-4">
                    <p className="text-2xl font-bold text-gold">{value}</p>
                    <p className="mt-1 text-xs uppercase tracking-wider text-white/55">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl border border-white/15 bg-white/[0.06] p-4 shadow-2xl">
                <div className="grid gap-3">
                  {KITS.map((kit, index) => {
                    const visual = KIT_VISUALS[kit.id];
                    return (
                      <div
                        key={kit.id}
                        className={`grid grid-cols-[96px_1fr] items-center gap-4 rounded-xl bg-white text-foreground p-3 shadow-lg ${
                          index === 1 ? "translate-x-0 sm:translate-x-6" : ""
                        }`}
                      >
                        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-background">
                          <Image
                            src={visual.image}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="96px"
                            priority={index === 0}
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className={`h-2.5 w-2.5 rounded-full ${visual.accent}`} />
                            <p className="text-xs font-bold uppercase tracking-wider text-muted">
                              {visual.stat}
                            </p>
                          </div>
                          <p className="mt-1 font-bold leading-snug">{kit.name}</p>
                          <p className="mt-1 text-sm text-muted line-clamp-2">{kit.promise}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="absolute -bottom-6 -left-4 hidden sm:block rounded-xl bg-gold px-5 py-4 text-foreground shadow-xl">
                <p className="text-sm font-bold">Built from Jeff&rsquo;s operating files</p>
                <p className="mt-1 text-xs text-foreground/70">Spreadsheets, workshops, and playbooks</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== ALWAYS-ON: BABU + FOUNDERS CLUB ========== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
              Start here
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              These two need no signup
            </h2>
            <p className="mt-4 text-lg text-muted leading-relaxed">
              Every spreadsheet in the kits answers one question. These two answer whatever you
              bring them &mdash; one machine, and 350 founders who have already been where you
              are. Go get them right now, then come back for the kits.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {ALWAYS_ON.map((a, i) => {
              const inner = (
                <>
                  <span
                    className={`inline-block self-start px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full mb-5 ${
                      i === 0 ? "bg-accent text-white" : "bg-gold text-foreground"
                    }`}
                  >
                    {a.badge}
                  </span>
                  <p className="text-4xl mb-4">{a.emoji}</p>
                  <h3 className="text-2xl font-bold tracking-tight">{a.title}</h3>
                  <p className="mt-3 text-white/75 leading-relaxed flex-1">{a.body}</p>
                  <span className="mt-6 inline-flex items-center font-semibold text-gold group-hover:text-white transition-colors">
                    {a.cta} &rarr;
                  </span>
                </>
              );

              const className = `group flex flex-col ${
                i === 0 ? "bg-foreground" : "bg-ridge"
              } text-white rounded-2xl p-8 hover:shadow-xl transition-all`;

              return a.external ? (
                <a
                  key={a.title}
                  href={a.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {inner}
                </a>
              ) : (
                <Link key={a.title} href={a.href} className={className}>
                  {inner}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== THE THREE KITS ========== */}
      <section id="kits" className="py-16 md:py-24 bg-background scroll-mt-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
              The kits
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Take the one that matches your week
            </h2>
            <p className="mt-4 text-lg text-muted leading-relaxed">
              Each kit is a workshop plus the tools that go with it. Most of them exist because I
              got something wrong first and had to build the thing that would have saved me. Take
              one, take all three &mdash; it costs the same either way.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {KITS.map((kit) => (
              <div
                key={kit.id}
                className="group flex flex-col overflow-hidden bg-card rounded-2xl border border-border shadow-sm hover:shadow-xl transition-shadow"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-background">
                  <Image
                    src={KIT_VISUALS[kit.id].image}
                    alt={KIT_VISUALS[kit.id].alt}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    sizes="(min-width: 1024px) 33vw, 100vw"
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-foreground shadow-sm">
                    {KIT_VISUALS[kit.id].stat}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div
                    className={`mb-5 h-1.5 w-16 rounded-full ${KIT_VISUALS[kit.id].accent}`}
                    aria-hidden="true"
                  />
                  <h3 className="text-xl font-bold tracking-tight leading-snug">{kit.name}</h3>
                  <p className="mt-2 text-sm font-semibold text-accent leading-snug">
                    {kit.promise}
                  </p>
                  <p className="mt-3 text-sm text-muted leading-relaxed">{kit.lead}</p>

                  <ul className="mt-6 space-y-3 flex-1">
                    {kit.items.map((item) => (
                      <li
                        key={item.title}
                        className={`rounded-xl border border-border p-3 ${KIT_VISUALS[kit.id].tint}`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-accent shadow-sm">
                            <ResourceIcon kind={item.kind} />
                          </span>
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="font-bold text-sm leading-snug">{item.title}</p>
                              <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted">
                                {KIND_LABELS[item.kind]}
                              </span>
                            </div>
                            <p className="mt-1 text-xs text-muted leading-relaxed">{item.body}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 pt-5 border-t border-border">
                    <KitModal
                      kit={kit.id as KitTarget}
                      source="resources"
                      idPrefix={`kit-${kit.id}`}
                      kitName={kit.name}
                      buttonLabel="Get this kit"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TAKE ALL THREE ========== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Or just take all three.
            </h2>
            <p className="mt-4 text-lg text-muted leading-relaxed">
              Every kit above, delivered in a single email you can come back to.
            </p>
          </div>
          <KitOptIn
            kit="all"
            source="resources"
            idPrefix="bundle"
            heading="Send me all three kits"
            subheading="One email. Everything in it. No cost, no call, no pitch."
            buttonLabel="Send me all three kits"
          />
        </div>
      </section>

      {/* ========== BOOK CALLOUT ========== */}
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-xl border border-border p-6 sm:p-8 md:p-10">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2">
                <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full mb-4">
                  Coming soon
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  The Cold-Pressed Truth
                </h2>
                <p className="mt-3 text-lg font-medium leading-snug">
                  A Founder&rsquo;s Field Guide to Building, Scaling, and Selling a Consumer
                  Brand
                </p>
                <p className="mt-3 text-sm font-semibold text-accent">Foreword by Jay Shetty</p>
                <p className="mt-4 text-muted leading-relaxed">
                  The kits above are the tools. The book is the thinking behind them &mdash; Suja
                  from an ice closet to $100 million in six years, the July 3rd call from
                  Coca-Cola, and everything it cost. Part memoir, part operating manual. It keeps
                  stopping to hand you a tool.
                </p>
                <div className="mt-6">
                  <Link
                    href="/book"
                    className="inline-flex items-center px-6 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors"
                  >
                    Join the waitlist &rarr;
                  </Link>
                </div>
              </div>
              <div className="text-center">
                <div className="relative aspect-[1007/1562] max-w-[220px] mx-auto rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src="/images/book-covers/cold-pressed-truth.png"
                    alt="Cold Pressed Truth by Jeff Church"
                    fill
                    sizes="(max-width: 768px) 220px, 220px"
                    className="object-cover"
                  />
                </div>
                <p className="mt-4 text-sm text-muted">
                  <span className="font-bold text-accent">23</span> chapters, three parts
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FROM THE BLOG ========== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
                From the blog
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

      {/* ========== ADVISORY CTA ========== */}
      <section className="py-16 md:py-24 bg-foreground text-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold uppercase tracking-wider bg-green-600 text-white rounded-full mb-6">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            Currently accepting applications
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Want Jeff&rsquo;s eyes on your business?
          </h2>
          <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Everything on this page is what Jeff learned the hard way. If you want him working
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
              href="/mba-for-cpg"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors text-lg"
            >
              Or start with the MBA for CPG
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
