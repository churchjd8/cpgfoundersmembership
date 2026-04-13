import Image from "next/image";
import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter-form";
import { BreakthroughLogo, BabuLogo, MbaLogo, VipDayLogo } from "@/components/offer-logos";

const credibility = [
  { stat: "8x", label: "CPG Founder" },
  { stat: "5", label: "Exits Totaling $700M+" },
  { stat: "$275M+", label: "Raised Across 40+ Rounds" },
  { stat: "$100M", label: "Revenue at Suja in 5 Years" },
  { stat: "BevNET", label: "Person of the Year" },
  { stat: "Harvard", label: "MBA" },
];

const testimonials = [
  {
    headline: "Led us through a successful $1.5M Angel fundraising",
    quote:
      "Jeff has amazing CPG knowledge, business experience and life lessons. 5-star review from us. Jeff led us all the way through a successful $1.5M Angel fundraising.",
    name: "Tiffany Tatom",
    title: "CEO",
    brand: "Live Pure",
  },
  {
    headline: "A game-changing crash course for my business",
    quote:
      "Working with Jeff has been a game-changing crash course for my business. It really is an MBA in CPG. Jeff and his team are a wealth of knowledge when it comes to finance, fundraising, brand strategy, and more.",
    name: "Simon Solis-Cohen",
    title: "Founder",
    brand: "Huxley",
  },
  {
    headline: "Got JUNI into retail and secured our Natural Foods broker",
    quote:
      "Jeff is a rare individual in that he has deep knowledge of all departments and functional areas. Jeff was the primary reason that we got JUNI into Moscoe and helped us secure Presence Marketing as our Natural Foods broker.",
    name: "Kim Perell",
    title: "Co-Founder & CEO",
    brand: "JUNI",
  },
];

const offers = [
  {
    flagship: true,
    tag: "FLAGSHIP",
    title: "The 90-Day Breakthrough with Jeff Church",
    price: "$2,000/mo for 3 months, then $1,500/mo month-to-month",
    pitch:
      "90 days to break through whatever's between you and your next stage. An onboarding diagnostic with Jeff to identify your bottleneck and map the 90 days, then 3 months of direct work together: group sessions, weekly accountability, 1:1 support, and everything you need to move.",
    who: "Founders serious about leveling up who want Jeff's strategic support in their business.",
    cta: "See the full program",
    href: "/90-day-breakthrough",
  },
  {
    title: "Babu - Your CPG AI Advisor",
    price: "Starting at $39/mo",
    pitch:
      "Your on-demand CPG advisor. Trained on what actually works. Ask anything, anytime - from fundraising strategy to retail negotiation to formulation questions.",
    who: "Anyone with a CPG brand, from idea to scale.",
    cta: "Try Babu",
    href: "https://www.askbabu.ai",
    external: true,
  },
  {
    title: "MBA for CPG",
    price: "$997, lifetime access",
    pitch:
      "Everything you'd learn in a $50K business school, built specifically for CPG founders. 15+ hours of training, 450+ slides, and the full template library Jeff used to build and sell multi-category brands. Self-paced, yours forever.",
    who: "Founders who want the systems and education and will implement themselves.",
    cta: "Get lifetime access",
    href: "/mba-for-cpg",

  },
  {
    title: "VIP Day with Jeff",
    price: "Starting at $15,000 (intensive + 3 months support)",
    pitch:
      "A half-day intensive with Jeff at your business's highest-leverage moment. Walk out with a written strategic plan on your biggest decision - next raise, retail expansion, exit prep, category expansion, or team build - plus 3 months of direct support to execute.",
    who: "Founders facing a high-leverage moment who want to bring Jeff in directly.",
    cta: "Apply now",
    href: "/vip-day-apply",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ========== 1. HERO ========== */}
      <section className="relative bg-foreground text-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                The operator&rsquo;s playbook for the next generation of CPG founders.
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-white/70 max-w-2xl leading-relaxed">
                Strategic direction, operating infrastructure, and AI-powered tools from Jeff Church
                - 8x founder, co-founder of Suja Juice - to help you scale, raise, and exit.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/#programs"
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
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <Image
                  src="/images/jeff-hero.webp"
                  alt="Jeff Church with CPG founders"
                  fill
                  className="object-cover"
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
                Four ways to work with Jeff.
              </h2>
              <p className="mt-4 text-lg text-muted">
                From self-paced learning to direct strategic work - whatever stage you&rsquo;re at,
                there&rsquo;s a door in.
              </p>
            </div>
          </div>

          {/* Flagship card - full width */}
          {offers.filter((o) => o.flagship).map((offer) => (
            <div
              key={offer.title}
              className="rounded-xl border bg-card-flagship border-accent/30 ring-2 ring-accent/20 p-6 sm:p-8 md:p-10 mb-6"
            >
              <div className="md:flex md:items-start md:justify-between md:gap-8">
                <div className="flex-1">
                  <BreakthroughLogo className="h-12 w-auto mb-4" />
                  <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full mb-4">
                    {offer.tag}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold">{offer.title}</h3>
                  <p className="mt-2 text-sm font-semibold text-accent">{offer.price}</p>
                  <p className="mt-4 text-muted leading-relaxed">{offer.pitch}</p>
                  <p className="mt-3 text-sm text-muted">
                    <span className="font-semibold text-foreground">Who it&rsquo;s for:</span>{" "}
                    {offer.who}
                  </p>
                </div>
                <div className="mt-6 md:mt-0 md:flex-shrink-0 md:self-center">
                  <Link
                    href={offer.href}
                    className="inline-flex items-center justify-center px-6 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors text-base"
                  >
                    {offer.cta} &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Secondary offers - three columns */}
          <div className="grid gap-6 md:grid-cols-3">
            {offers.filter((o) => !o.flagship).map((offer) => {
              const LogoComponent =
                offer.title.includes("Babu") ? BabuLogo :
                offer.title.includes("MBA") ? MbaLogo :
                VipDayLogo;
              return (
              <div
                key={offer.title}
                className="rounded-xl border bg-card border-border p-6 sm:p-8 flex flex-col"
              >
                <LogoComponent className="h-10 w-auto mb-4" />
                <h3 className="text-xl font-bold">{offer.title}</h3>
                <p className="mt-2 text-sm font-semibold text-accent">{offer.price}</p>
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
                Join 150+ CPG founders in our free WhatsApp group.
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
            <div className="text-center">
              <div className="inline-flex flex-col items-center gap-4 bg-white/5 rounded-2xl p-8 sm:p-12">
                <p className="text-6xl">💬</p>
                <p className="text-4xl sm:text-5xl font-bold text-accent">150+</p>
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

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-card rounded-xl border border-border p-6 sm:p-8">
                <p className="text-lg font-bold text-foreground">{t.headline}</p>
                <blockquote className="mt-4 text-muted leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted">
                      {t.title}, {t.brand}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
    </>
  );
}
