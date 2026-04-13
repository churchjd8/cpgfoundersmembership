import type { Metadata } from "next";
import Image from "next/image";
import { WorkshopModal } from "./workshop-modal";

export const metadata: Metadata = {
  title: "CPG Profitability Workshop - Reduce Your Burn and Get to Profitability Faster",
  description:
    "Free 90-minute live workshop with Jeff Church. Learn the exact frameworks, cost benchmarks, and trade strategies CPG founders use to extend their runway. April 23rd on Zoom.",
};

const whatYouLearn = [
  "How to calculate your true burn rate and exact runway length",
  "The most common costs killing early-stage CPG brands",
  "Target gross margin benchmarks at every stage",
  "Cost reduction strategies that preserve brand integrity",
  "How to optimize your product mix for profitability",
  "Trade spend management strategies that actually work",
  "How to evaluate lift and promotion effectiveness",
  "How to grow top-line revenue without excess burn",
  "Strategies to reduce dilution in your next raise",
];

const tools = [
  {
    icon: "📊",
    title: "Cash Runway Calculator",
    description:
      "Calculate your exact runway timeframe and model how changes to your burn rate affect your timeline.",
  },
  {
    icon: "🔄",
    title: "Cash Conversion Cycle Model",
    description:
      "Identify opportunities to free up cash through working capital adjustments in AR, AP, and inventory.",
  },
  {
    icon: "📈",
    title: "Launch & Scale Product Line P&L Tool",
    description:
      "Model the unit economics of each SKU and find the most profitable growth path for your brand.",
  },
];

const testimonials = [
  {
    quote:
      "For me personally, this has been a tremendous asset to growth and my brand's future. As someone with Jeff's beverage success, he's incredibly gracious with time and guidance.",
    name: "Erick Rothchild",
    title: "CEO, WheyUp",
  },
  {
    quote:
      "The bootcamp created an incredible momentum shift for my business in 2024. From exposure to the CPG community, to intentional detail tailored to each brand.",
    name: "Hannah Minardi",
    title: "Co-Founder, Standard Self Care",
  },
  {
    quote:
      "It's truly an MBA in CPG. Videos were relevant and detailed; dialogue during calls invaluable. Jeff and his team are a wealth of knowledge.",
    name: "Simon Solis-Cohen",
    title: "Founder, Huxley",
  },
];

const faqs = [
  {
    q: "Who is this for?",
    a: "Pre-launch or early-stage CPG founders (1-2 years in) who want a solid financial foundation. If you're burning cash faster than you'd like, want to understand your unit economics and margin targets, or are ready to make data-driven decisions on costs, trade spend, and product mix - this is for you.",
  },
  {
    q: "What's included?",
    a: "One 90-minute live virtual session with operational frameworks and benchmarks, plus three downloadable tools: Cash Runway Calculator, Cash Conversion Cycle Model, and Launch & Scale Product Line P&L Tool.",
  },
  {
    q: "Why should I attend?",
    a: "Stop guessing at your burn rate and know your exact numbers. Access cost benchmarks most early founders don't see until it's too late. Leave with an actionable plan to reduce your burn within weeks.",
  },
  {
    q: "When and where?",
    a: "April 23rd, 90 minutes, live on Zoom. You'll receive the Zoom link after you sign up.",
  },
];

export default function BurnRateWorkshopPage() {
  return (
    <>
      {/* ========== HELLO BAR ========== */}
      <div className="bg-accent text-white text-center py-2 text-sm font-semibold">
        FREE 90-MIN LIVE WORKSHOP - APRIL 23
      </div>

      {/* ========== HERO ========== */}
      <section className="relative bg-foreground text-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full mb-6">
                Free Live Workshop with Jeff Church
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
                The CPG Profitability Workshop: Reduce Your Burn and Get to Profitability Faster
              </h1>
              <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
                Learn the exact frameworks, cost benchmarks, and trade strategies CPG founders use to
                extend their runway and build a healthier business.
              </p>
            </div>

            {/* Video in hero */}
            <div className="mt-10 relative aspect-video rounded-xl overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/oJO_KDLk6VY"
                title="CPG Profitability Workshop with Jeff Church"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>

            <div className="mt-6 text-center">
              <p className="text-base text-white/50 mb-4">
                April 23rd - 90 Minutes - Live on Zoom - Free
              </p>
              <WorkshopModal buttonStyle="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* ========== AS SEEN IN ========== */}
      <section className="py-8 bg-white border-b border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="relative w-full">
            <Image
              src="/images/as-seen-in-banner.png"
              alt="As seen in: Whole Foods Supplier of the Year, Forbes, The New York Times, Inc. 500, EY Entrepreneur of the Year, BevNet"
              width={900}
              height={100}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* ========== WHAT YOU'LL LEARN ========== */}
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
              Session Preview
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Reducing the Burn: From Cash Drain to Cash Clarity
            </h2>
          </div>

          <ul className="space-y-3">
            {whatYouLearn.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="text-accent font-bold text-lg">🎯</span>
                <span className="text-muted leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 text-center">
            <WorkshopModal buttonStyle="section" />
          </div>
        </div>
      </section>

      {/* ========== FREE TOOLS ========== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              3 Free Tools Included
            </h2>
            <p className="mt-4 text-lg text-muted">
              Walk away with tools you can use immediately to understand and improve your financial
              position.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {tools.map((tool) => (
              <div
                key={tool.title}
                className="bg-card-flagship rounded-xl border border-accent/30 p-6 sm:p-8 text-center"
              >
                <p className="text-3xl mb-3">{tool.icon}</p>
                <h3 className="text-lg font-bold mb-2">{tool.title}</h3>
                <p className="text-sm text-muted">{tool.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== ABOUT JEFF ========== */}
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="/images/jeff-suja.webp"
                alt="Jeff Church at the Suja Juice production line"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
                Your Workshop Leader
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Jeff Church</h2>
              <p className="mt-4 text-muted leading-relaxed">
                30+ years founding and leading 8 CPG companies. Co-founded Suja Juice in 2012 and
                scaled it to $100M+ in revenue in under 7 years before selling to Coca-Cola.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-muted">
                <li className="flex gap-2">
                  <span className="text-accent font-bold">&#10003;</span>
                  5 exits totaling $700M+ (median angel return: 10x)
                </li>
                <li className="flex gap-2">
                  <span className="text-accent font-bold">&#10003;</span>
                  Led 35+ fundraising rounds raising $275M+
                </li>
                <li className="flex gap-2">
                  <span className="text-accent font-bold">&#10003;</span>
                  BevNET Person of the Year, E&Y Entrepreneur of the Year
                </li>
                <li className="flex gap-2">
                  <span className="text-accent font-bold">&#10003;</span>
                  NYT bestselling author (The Suja Juice Solution)
                </li>
                <li className="flex gap-2">
                  <span className="text-accent font-bold">&#10003;</span>
                  Advised Health-Ade, Once Upon a Farm, Juni, Live Pure & more
                </li>
                <li className="flex gap-2">
                  <span className="text-accent font-bold">&#10003;</span>
                  Harvard MBA, CPA
                </li>
              </ul>
              <div className="mt-6">
                <WorkshopModal buttonStyle="section" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              What founders are saying about working with Jeff.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-card rounded-xl border border-border p-6 sm:p-8">
                <blockquote className="text-muted leading-relaxed italic text-sm">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted">{t.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8">
            Frequently Asked Questions
          </h2>
          <div className="divide-y divide-border">
            {faqs.map((faq) => (
              <div key={faq.q} className="py-6">
                <h3 className="text-base font-semibold mb-2">{faq.q}</h3>
                <p className="text-muted leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="py-16 md:py-24 bg-foreground text-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Stop guessing. Start building a profitable brand.
          </h2>
          <p className="mt-4 text-lg text-white/70">
            April 23rd. 90 minutes. Free. Three tools you keep forever.
          </p>
          <div className="mt-8">
            <WorkshopModal buttonStyle="final" />
          </div>
        </div>
      </section>
    </>
  );
}
