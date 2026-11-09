import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter-form";
import { TestimonialCarousel } from "../workwithjeff-2/testimonial-carousel";
import styles from "./page.module.css";
import { BabuLogo, MbaLogo, WorkWithJeffLogo } from "@/components/offer-logos";

const credibility = [
  { stat: "8x", label: "CPG Founder" },
  { stat: "5", label: "Exits Totaling $700M+" },
  { stat: "$275M+", label: "Raised Across 40+ Rounds" },
  { stat: "$100M", label: "Revenue at Suja in 5 Years" },
  { stat: "BevNET", label: "Person of the Year" },
  { stat: "Harvard", label: "MBA" },
];

const offers = [
  {
    title: "Work with Jeff",
    pitch:
      "Bring Jeff Church's experience and strategy into your business in a 1:1 way. A custom engagement built around your business and the decisions in front of you - strategy, fundraising, retail, margins, team, or category.",
    who: "Founders ready for direct, hands-on work with Jeff. Due to capacity, he isn't able to accept everyone - submit a form if you're interested.",
    cta: "Explore private advisory",
    href: "/work-with-jeff",
  },
  {
    title: "Babu - Your CPG AI Advisor",
    pitch:
      "Your on-demand CPG advisor. Trained on what actually works. Ask anything, anytime - from fundraising strategy to retail negotiation to formulation questions.",
    who: "Anyone with a CPG brand, from idea to scale.",
    cta: "Try Babu",
    href: "https://www.askbabu.ai",
    external: true,
  },
  {
    title: "MBA for CPG",
    pitch:
      "Everything you'd learn in a $50K business school, built specifically for CPG founders. 15+ hours of training, 450+ slides, and the full template library Jeff used to build and sell multi-category brands. Self-paced, yours forever.",
    who: "Founders who want the systems and education and will implement themselves.",
    cta: "Learn more",
    href: "/mba-for-cpg",
  },

];

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "CPG Founders Group | The Operator’s Playbook for CPG Founders",
  description: "Practical tools, training, and direct advisory from Suja co-founder Jeff Church. Explore The Cold-Pressed Truth, out November 17, 2026.",
  robots: { index: false, follow: false },
  openGraph: { title: "CPG Founders Group | The Operator’s Playbook", description: "Tools, training, and direct access to Jeff Church for CPG founders.", url: "https://cpgfoundersgroup.com/new-homepage", images: [{url:"https://cpgfoundersgroup.com/images/jeff-hero.webp"}] },
};

export default function HomePage() {
  const bookReleased = Date.now() >= Date.parse("2026-11-17T00:00:00-08:00");
  const bookLabel = bookReleased ? "Available now" : "Out November 17";
  return (
    <div className={styles.refinedHome}>
      <a className={styles.bookAnnouncement} href="https://thecoldpressedtruth.com"><span>{bookLabel}</span><strong>The Cold-Pressed Truth</strong><span className={styles.announcementAuthor}>Jeff Church’s new book</span><span aria-hidden="true">↗</span></a>
      {/* ========== 1. HERO ========== */}
      <section className="relative bg-foreground text-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-20 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                The operator&rsquo;s playbook for the next generation of CPG founders.
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-white/70 max-w-2xl leading-relaxed">
                Strategic direction, practical tools, and direct support from Jeff Church
                - 8x founder, co-founder of Suja Juice - to help you scale, raise, and exit.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/work-with-jeff"
                  className="inline-flex items-center justify-center px-6 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors text-base"
                >
                  Work with Jeff
                </Link>
                <a
                  href="https://www.askbabu.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 border border-white/30 hover:border-white/60 text-white font-semibold rounded-lg transition-colors text-base"
                >
                  Try Babu
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[16/10] lg:aspect-[4/5] rounded-2xl overflow-hidden">
                <Image
                  src="/images/jeff-hero.webp"
                  alt="Jeff Church with CPG founders"
                  fill
                  className="object-cover object-[center_30%]"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 2. THE PROMISE ========== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Every CPG founder has one thing between them and their next stage.
          </h2>
          <p className="mt-6 text-lg text-muted leading-relaxed">
            For some it&rsquo;s raising the next round. For some it&rsquo;s landing retail. For some
            it&rsquo;s margins, cash, supply chain, team, or category. Whatever yours is, Jeff has
            seen it from the inside. He&rsquo;s built and sold multi-category CPG brands and spent
            35 years in the category. Along the way, he&rsquo;s developed a suite of tools,
            templates, community, and frameworks that the top CPG founders use to move faster, avoid
            expensive mistakes, and break through to their next stage.
          </p>
        </div>
      </section>

      {/* ========== 3. WHAT WE OFFER ========== */}
      <section id="programs" className="py-16 md:py-24 bg-background scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/jeff-teaching.webp"
                alt="Jeff Church strategizing at the whiteboard"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Three ways to work with Jeff.
              </h2>
              <p className="mt-4 text-lg text-muted">
                Direct 1:1 strategic work, self-paced learning, and on-demand answers.
                Choose the support that fits where you are.
              </p>
            </div>
          </div>

          {/* Offers - three columns */}
          <div className="grid gap-6 md:grid-cols-3">
            {offers.map((offer) => {
              const LogoComponent =
                offer.title.includes("Babu") ? BabuLogo :
                offer.title.includes("MBA") ? MbaLogo :
                WorkWithJeffLogo;
              return (
              <div
                key={offer.title}
                className="rounded-xl border bg-card border-border p-6 sm:p-8 flex flex-col"
              >
                <LogoComponent className="h-10 w-auto mb-4" />
                <h3 className="text-xl font-bold">{offer.title}</h3>
                <p className="mt-4 text-muted leading-relaxed text-sm flex-1">{offer.pitch}</p>
                <p className="mt-3 text-sm text-muted">
                  <span className="font-semibold text-foreground">Who it&rsquo;s for:</span>{" "}
                  {offer.who}
                </p>
                <div className="mt-6 pt-4 border-t border-border">
                  <Link
                    href={offer.href}
                    {...(offer.external
                      ? ({ target: "_blank", rel: "noopener noreferrer" } as React.AnchorHTMLAttributes<HTMLAnchorElement>)
                      : {})}
                    className="inline-flex items-center text-sm font-semibold text-accent hover:text-accent-dark transition-colors"
                  >
                    {offer.cta} &rarr;
                  </Link>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.bookFeature} aria-labelledby="book-title"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className={styles.bookFeatureInner}>
        <a href="https://thecoldpressedtruth.com" aria-label="Explore The Cold-Pressed Truth" className={styles.bookCover}><Image src="/images/book-covers/cold-pressed-truth-home.webp" alt="The Cold-Pressed Truth by Jeff Church, with a foreword by Jay Shetty" width={640} height={993} sizes="(max-width:639px) 104px, 190px"/></a>
        <div><span className={styles.bookLabel}>{bookLabel}</span><h2 id="book-title" className="mt-3 text-2xl sm:text-4xl font-bold tracking-tight">The Cold-Pressed Truth</h2><p className="mt-3 text-sm sm:text-lg text-muted">A founder’s field guide to building, scaling, and selling a consumer brand.</p><p className="mt-3 text-xs sm:text-sm text-muted">By Jeff Church. Foreword by Jay Shetty.</p><a href="https://thecoldpressedtruth.com" className="mt-5 inline-flex items-center justify-center gap-5 rounded-lg bg-accent hover:bg-accent-dark px-5 py-3 text-sm font-semibold text-white transition-colors">Explore the book <span aria-hidden="true">↗</span></a><p className="mt-3 text-xs text-muted"><time dateTime="2026-11-17">November 17, 2026</time></p></div>
      </div></div></section>

      {/* ========== 4. ABOUT JEFF ========== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/jeff-suja.webp"
                alt="Jeff Church at the Suja Juice production line"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                35 years of CPG. Yours to leverage.
              </h2>
              <p className="mt-6 text-lg text-muted leading-relaxed">
                Jeff Church founded Dream Makers because he kept seeing the same pattern: talented
                founders making avoidable mistakes because they didn&rsquo;t have the right guidance at
                the right time. He&rsquo;s been there - as an operator, a founder, and a fundraiser -
                and built Dream Makers to give CPG founders the shortcut he wishes he&rsquo;d had.
              </p>
            </div>
          </div>

          {/* Credibility bar */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {credibility.map((item) => (
              <div key={item.label} className="p-4">
                <p className="text-2xl sm:text-3xl font-bold text-accent">{item.stat}</p>
                <p className="mt-1 text-sm text-muted">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/about-jeff"
              className="inline-flex items-center font-semibold text-accent hover:text-accent-dark transition-colors"
            >
              Read Jeff&rsquo;s full story &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ========== WHATSAPP COMMUNITY ========== */}
      <section className="py-16 md:py-24 bg-foreground text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full mb-4">
                Free Community
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Join 400+ CPG founders in our free WhatsApp group.
              </h2>
              <p className="mt-4 text-lg text-white/70 leading-relaxed">
                Founder-to-founder support, quick answers, and helpful CPG resources - all in one
                place. Connect with like-minded founders, get introductions to vetted partners, and
                share what&rsquo;s working. No spam.
              </p>
              <ul className="mt-6 space-y-2">
                <li className="flex gap-2 text-white/70">
                  <span className="text-accent font-bold">&#10003;</span>
                  Peer-to-peer networking with active CPG founders
                </li>
                <li className="flex gap-2 text-white/70">
                  <span className="text-accent font-bold">&#10003;</span>
                  Introductions to vetted partners and service providers
                </li>
                <li className="flex gap-2 text-white/70">
                  <span className="text-accent font-bold">&#10003;</span>
                  Curated resources and rapid answers to real questions
                </li>
                <li className="flex gap-2 text-white/70">
                  <span className="text-accent font-bold">&#10003;</span>
                  Free, forever. No pitch, no upsell.
                </li>
              </ul>
              <div className="mt-8">
                <a
                  href="/founders-only"
                  className="inline-flex items-center justify-center px-6 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors text-base"
                >
                  Request to join &rarr;
                </a>
              </div>
            </div>
            <div className="hidden lg:block text-center">
              <div className="inline-flex flex-col items-center gap-4 bg-white/5 rounded-2xl p-8 sm:p-12">
                <p className="text-6xl">💬</p>
                <p className="text-4xl sm:text-5xl font-bold text-accent">400+</p>
                <p className="text-lg text-white/70">CPG founders and counting</p>
                <p className="text-sm text-white/40 max-w-xs">
                  From pre-launch to $10M+. Every stage, every category, one community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 5. SUCCESS STORIES ========== */}
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Founders who broke through.
            </h2>
            <p className="mt-4 text-lg text-muted">
              Real outcomes from founders who worked with Jeff.
            </p>
          </div>

          <TestimonialCarousel />
          <p className="mt-3 text-xs text-muted">Individual experiences from work with Jeff. Engagements and results vary.</p>
        </div>
      </section>

      {/* ========== 6. EMAIL SIGNUP ========== */}
      <section className="py-16 md:py-24 bg-foreground text-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Get Jeff&rsquo;s take on what&rsquo;s actually working in CPG.
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Weekly insights on fundraising, retail, margins, and scaling - from someone who&rsquo;s
            been there. Direct to your inbox, no fluff.
          </p>
          <NewsletterForm />
          <p className="mt-3 text-xs text-white/40">Unsubscribe anytime. No spam, ever.</p>
        </div>
      </section>
      <footer className="bg-foreground text-white/80" role="contentinfo"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10"><div className="grid gap-8 sm:grid-cols-3"><div><p className="font-bold text-lg text-white">CPG Founders Group</p><p className="mt-3 text-sm text-white/60">Tools, training, and direct access to Jeff Church for CPG founders going from idea to exit.</p></div><nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-5 gap-y-3 text-sm"><Link href="/work-with-jeff">Work with Jeff</Link><Link href="/about-jeff">About Jeff</Link><Link href="/resources">Free resources</Link><Link href="/mba-for-cpg">MBA for CPG</Link><a href="https://www.askbabu.ai">Babu AI</a><Link href="/blog">Blog</Link><a href="https://thecoldpressedtruth.com">The book</a><Link href="/contact">Contact</Link></nav><div><p className="font-semibold text-white">Get in touch</p><a href="mailto:info@teamchurch.co" className="mt-3 inline-block text-sm text-white/60">info@teamchurch.co</a></div></div><div className="mt-8 border-t border-white/10 pt-5 flex flex-wrap gap-5 text-xs text-white/50"><span>© {new Date().getFullYear()} CPG Founders Group</span><Link href="/privacy">Privacy</Link></div></div></footer>
    </div>
  );
}
