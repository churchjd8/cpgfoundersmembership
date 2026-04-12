import Image from "next/image";
import Link from "next/link";

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
    headline: "Raised $1.2M in 90 days after 18 months of trying",
    quote:
      "Jeff helped me see exactly what investors were looking for and completely restructured my pitch. Within three months we closed our round and started scaling.",
    name: "Sarah M.",
    title: "Founder & CEO",
    brand: "Placeholder Brand Co.",
  },
  {
    headline: "Landed national retail in under 6 months",
    quote:
      "I had been trying to break into retail for over a year. Jeff mapped out the exact approach, made key introductions, and we were on shelves within six months.",
    name: "Marcus T.",
    title: "Co-Founder",
    brand: "Placeholder Foods Inc.",
  },
  {
    headline: "Doubled margins before our Series A",
    quote:
      "Our unit economics were killing us. Jeff dug into our supply chain, renegotiated key contracts, and we went into our raise with a completely different story.",
    name: "Priya K.",
    title: "CEO",
    brand: "Placeholder Beverage Co.",
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
    title: "VIP Day with Jeff",
    price: "Starting at $15,000 (intensive + 3 months support)",
    pitch:
      "A half-day intensive with Jeff at your business's highest-leverage moment. Walk out with a written strategic plan on your biggest decision - next raise, retail expansion, exit prep, category expansion, or team build - plus 3 months of direct support to execute.",
    who: "Founders facing a high-leverage moment who want to bring Jeff in directly.",
    cta: "Apply now",
    href: "/vip-day-apply",
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
    title: "Babu - Your CPG AI Advisor",
    price: "Starting at $39/mo",
    pitch:
      "Your on-demand CPG advisor. Trained on what actually works. Ask anything, anytime - from fundraising strategy to retail negotiation to formulation questions.",
    who: "Anyone with a CPG brand, from idea to scale.",
    cta: "Try Babu",
    href: "https://www.askbabu.ai",
    external: true,
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
                Whatever&rsquo;s between you and your next stage, we&rsquo;ll help you break through.
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-white/70 max-w-2xl leading-relaxed">
                Tools, training, and direct access to Jeff Church - 8x CPG founder, co-founder of Suja
                Juice - for founders going from idea to exit.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/90-day-breakthrough"
                  className="inline-flex items-center justify-center px-6 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors text-base"
                >
                  Explore the 90-Day Breakthrough
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
            35 years in the category. In 90 days of working together, we diagnose what&rsquo;s
            actually in your way and break through it.
          </p>
        </div>
      </section>

      {/* ========== 3. WHAT WE OFFER ========== */}
      <section id="programs" className="py-16 md:py-24 bg-background scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Four ways to work with Jeff.
            </h2>
            <p className="mt-4 text-lg text-muted">
              From self-paced learning to direct strategic work - whatever stage you&rsquo;re at,
              there&rsquo;s a door in.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {offers.map((offer) => (
              <div
                key={offer.title}
                className={`rounded-xl border p-6 sm:p-8 flex flex-col ${
                  offer.flagship
                    ? "bg-card-flagship border-accent/30 ring-2 ring-accent/20 md:col-span-2"
                    : "bg-card border-border"
                }`}
              >
                {offer.tag && (
                  <span className="inline-block self-start px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full mb-4">
                    {offer.tag}
                  </span>
                )}
                <h3 className="text-xl sm:text-2xl font-bold">{offer.title}</h3>
                <p className="mt-2 text-sm font-semibold text-accent">{offer.price}</p>
                <p className="mt-4 text-muted leading-relaxed">{offer.pitch}</p>
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
                    className={`inline-flex items-center font-semibold transition-colors ${
                      offer.flagship
                        ? "text-accent hover:text-accent-dark text-base"
                        : "text-accent hover:text-accent-dark text-sm"
                    }`}
                  >
                    {offer.cta} &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 4. ABOUT JEFF ========== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
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
          <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              name="email"
              required
              placeholder="you@yourbrand.com"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-3 text-xs text-white/40">Unsubscribe anytime. No spam, ever.</p>
        </div>
      </section>
    </>
  );
}
