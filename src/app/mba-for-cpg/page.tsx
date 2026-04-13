import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MBA for CPG - CPG Founders Group",
  description:
    "Everything you'd learn in a $50K business school, built specifically for CPG founders. 8 modules, 450+ slides, financial models, and Jeff Church's full playbook. $997, lifetime access.",
};

const modules = [
  {
    number: "01",
    title: "The Industry, Fiduciary & Fatal Flaws",
    description:
      "Dive into CPG industry dynamics, profitable growth, fiduciary responsibilities, and the most common founder mistakes that derail early-stage brands.",
    bullets: [
      "Secrets behind unicorn CPG success stories",
      "How \"challenger\" brands disrupt established categories",
      "Where your brand sits on the growth curve and how to adjust",
      "Fiduciary roles and relationships that protect your business",
      "The fatal flaws and fatal mistakes to avoid at all costs",
    ],
  },
  {
    number: "02",
    title: "Fundraising & Your Investor Pitch",
    description:
      "The art of raising capital, crafting a compelling pitch, and structuring investments to minimize dilution. Real-world case studies and examples.",
    bullets: [
      "The anatomy of creating shareholder value",
      "The science behind valuations and how to maximize them",
      "How to choose among valuation, raise amount, security type, and investor type",
      "Reduce dilution and avoid the transactions you should never touch",
      "Build a winning investor deck with do's and don'ts for your first meeting",
    ],
  },
  {
    number: "03",
    title: "Revenue, Expenses & Financial Modeling",
    description:
      "Critical financial insights to model success and manage trade spend, gross margins, and contribution metrics. Includes Jeff's 5-year financial model.",
    bullets: [
      "Master your Chart of Accounts tailored for CPG startups",
      "Unlock hidden profitability through optimized trade spend",
      "Strategies to maintain gross margins above 40%",
      "Jeff's detailed 5-year financial model (downloadable)",
      "Trade Spend Calculator: understand your single largest expense",
    ],
  },
  {
    number: "04",
    title: "Marketing",
    description:
      "Create a brand story that resonates, define your USP, and build impactful digital strategies with measurable returns.",
    bullets: [
      "Leverage storytelling to build emotional connections with consumers",
      "Define and capitalize on your unique selling proposition",
      "Build a professional website that converts browsers into buyers",
      "CPG marketing strategies and tactics to drive awareness",
      "A/B testing to optimize your packaging and brand presence",
    ],
  },
  {
    number: "05",
    title: "Sales",
    description:
      "Build an effective sales strategy including brokers, door expansion, retailer presentations, and winning at the shelf.",
    bullets: [
      "When and where to expand into new retail doors",
      "Navigate the broker landscape to optimize costs and performance",
      "The \"truth is at the shelf\" approach for real-time insights",
      "Create compelling retailer presentations that close deals",
      "Align sales compensation with measurable success metrics",
    ],
  },
  {
    number: "06",
    title: "Scaling Your Brand",
    description:
      "Validate proof of concept, understand consumer behavior, and leverage category dynamics to scale effectively.",
    bullets: [
      "Gain proof of concept with repeat purchase and velocity metrics",
      "Build scalable strategies that appeal to investors",
      "Balance innovation with operational scalability",
      "Use Net Promoter Score as a brand satisfaction indicator",
      "Category management and competitive positioning",
    ],
  },
  {
    number: "07",
    title: "Operations & Cash Management",
    description:
      "Navigate co-packing, supply chains, inventory planning, and intellectual property. Maximize the impact of every dollar.",
    bullets: [
      "Identify and partner with the right co-packers",
      "Optimize inventory planning to avoid stockouts or surplus",
      "Protect your brand with robust IP strategies",
      "Build a supply chain that supports growth and profitability",
      "Jeff's \"Poor Man's MRP\" for finished goods and ingredients",
    ],
  },
  {
    number: "08",
    title: "Team, Tools & Jeff's Playbook",
    description:
      "Build a high-performing team, foster a winning culture, and get Jeff's 25 proven plays he's used across 8 transactions.",
    bullets: [
      "Build a championship team with clear roles and responsibilities",
      "Use SMART Goals to dramatically improve internal relationships",
      "Personality tools to enhance team dynamics and hiring",
      "Jeff's CPG Playbook: 25 plays evolved over 8 transactions",
      "30 white papers with actionable insights for decision-making",
    ],
  },
];

const testimonials = [
  {
    quote:
      "It really is an MBA in CPG. The bootcamp videos were full of relevant and detailed lessons and the dialogue during the in-person calls has been invaluable. Jeff and his team are a wealth of knowledge when it comes to finance, fundraising, brand strategy, and more.",
    name: "Simon Solis-Cohen",
    title: "Founder, Huxley",
  },
  {
    quote:
      "The program's depth of insight into launching and scaling a brand is unparalleled, offering practical, MBA-level education that has far exceeded my expectations in terms of ROI. Jeff's guidance has saved me invaluable time and money.",
    name: "Carolyn Hamlet",
    title: "Founder, Oku Conscious Energy Gummy Snacks",
  },
  {
    quote:
      "With each slide it seemed as if Jeff told an entire story and without even knowing it I had acquired some amazing and company-changing skills. Jeff's extraordinary knowledge of CPG helped us develop the blueprint of success.",
    name: "Austin Wiberg",
    title: "Co-Founder, G7 Studio",
  },
];

const includes = [
  { icon: "🎓", label: "8 comprehensive modules" },
  { icon: "📊", label: "450+ downloadable slides" },
  { icon: "📈", label: "5-year financial model" },
  { icon: "📋", label: "Trade Spend Calculator" },
  { icon: "📝", label: "Investor & Retailer deck templates" },
  { icon: "📄", label: "30 white papers & articles" },
  { icon: "🔧", label: "Inventory planning tools" },
  { icon: "📖", label: "Jeff's 25-play CPG Playbook" },
];

// TODO: Replace with actual Kajabi checkout link
const buyHref = "https://learn.dreammakershq.com/offers/MGU8pLuV";

export default function MbaForCpgPage() {
  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative bg-foreground text-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full mb-6">
                MBA for CPG
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                Your business school for CPG.
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-white/70 max-w-2xl leading-relaxed">
                Everything you&rsquo;d learn in a $50K MBA program, built specifically for CPG
                founders. 8 modules, 450+ slides, financial models, templates, and the full playbook
                Jeff used to build and sell multi-category brands. Self-paced, yours forever.
              </p>
              <p className="mt-4 text-2xl font-bold text-white">
                $997 <span className="text-base font-normal text-white/50">one-time, lifetime access</span>
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href={buyHref}
                  className="inline-flex items-center justify-center px-6 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors text-base"
                >
                  Get lifetime access &rarr;
                </Link>
                <a
                  href="mailto:info@teamchurch.co?subject=Questions about MBA for CPG"
                  className="inline-flex items-center justify-center px-6 py-3 border border-white/30 hover:border-white/60 text-white font-semibold rounded-lg transition-colors text-base"
                >
                  Questions? Email us
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/images/jeff-teaching.webp"
                  alt="Jeff Church teaching CPG strategy"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== WHAT'S INSIDE ========== */}
      <section className="py-12 bg-white border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <p className="text-2xl sm:text-3xl font-bold text-accent">8</p>
              <p className="mt-1 text-sm text-muted">In-Depth Modules</p>
            </div>
            <div className="p-4">
              <p className="text-2xl sm:text-3xl font-bold text-accent">450+</p>
              <p className="mt-1 text-sm text-muted">Narrated Slides</p>
            </div>
            <div className="p-4">
              <p className="text-2xl sm:text-3xl font-bold text-accent">$30K+</p>
              <p className="mt-1 text-sm text-muted">Worth of Tools & Models</p>
            </div>
            <div className="p-4">
              <p className="text-2xl sm:text-3xl font-bold text-accent">30</p>
              <p className="mt-1 text-sm text-muted">White Papers & Articles</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== WHO IT'S FOR ========== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
            Who This Is For
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            The foundation every CPG founder needs.
          </h2>
          <p className="mt-6 text-lg text-muted leading-relaxed">
            Previous participants have called this program &ldquo;the MBA of CPG&rdquo; for its
            comprehensive, practical approach. It&rsquo;s built for founders who want the systems,
            education, and tools to build their brand the right way - and who are ready to implement
            themselves.
          </p>
          <p className="mt-4 text-lg text-muted leading-relaxed">
            Whether you&rsquo;re pre-launch or scaling past $5M, the MBA for CPG gives you the same
            frameworks, financial models, and strategic playbook that Jeff used to build Suja from
            $600K to $100M in revenue.
          </p>
        </div>
      </section>

      {/* ========== WHAT'S INCLUDED ========== */}
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
              What You Get
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Everything included for $997.
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {includes.map((item) => (
              <div
                key={item.label}
                className="bg-card rounded-xl border border-border p-5 text-center"
              >
                <p className="text-2xl mb-2">{item.icon}</p>
                <p className="text-sm font-semibold">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CURRICULUM ========== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
              The Curriculum
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              8 modules. Every angle of building a CPG brand.
            </h2>
            <p className="mt-4 text-lg text-muted">
              From fundraising and financial modeling to sales, marketing, operations, and scaling.
              Each module is narrated by Jeff with real-world examples from his 35 years in CPG.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {modules.map((mod) => (
              <div
                key={mod.number}
                className="bg-card rounded-xl border border-border p-6 sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl font-bold text-accent/30">{mod.number}</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold">{mod.title}</h3>
                    <p className="mt-2 text-sm text-muted leading-relaxed">{mod.description}</p>
                    <ul className="mt-4 space-y-1.5">
                      {mod.bullets.map((b) => (
                        <li key={b} className="flex gap-2 text-sm text-muted">
                          <span className="text-accent font-bold">&#10003;</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
              What Founders Are Saying
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              &ldquo;It really is an MBA in CPG.&rdquo;
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

      {/* ========== PRICING CTA ========== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="bg-card-flagship rounded-xl border border-accent/30 ring-2 ring-accent/20 p-8 md:p-12 text-center">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full mb-4">
              MBA for CPG
            </span>
            <p className="text-4xl sm:text-5xl font-bold">$997</p>
            <p className="mt-2 text-muted">One-time payment. Lifetime access. No subscription.</p>
            <ul className="mt-6 space-y-2 text-left max-w-md mx-auto">
              {[
                "8 comprehensive modules narrated by Jeff",
                "450+ downloadable slides",
                "5-year financial model & Trade Spend Calculator",
                "Investor & Retailer deck templates",
                "30 white papers & articles",
                "Jeff's 25-play CPG Playbook",
                "Lifetime access, go at your own pace",
              ].map((item) => (
                <li key={item} className="flex gap-2 text-sm text-muted">
                  <span className="text-accent font-bold">&#10003;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link
                href={buyHref}
                className="inline-flex items-center justify-center px-8 py-4 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors text-lg"
              >
                Get lifetime access &rarr;
              </Link>
            </div>
            <p className="mt-4 text-xs text-muted">
              Questions?{" "}
              <a
                href="mailto:info@teamchurch.co?subject=Questions about MBA for CPG"
                className="underline hover:text-foreground transition-colors"
              >
                Email us
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="py-16 md:py-24 bg-foreground text-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Want more than self-paced?
          </h2>
          <p className="mt-4 text-lg text-white/70">
            The MBA for CPG is included in the 90-Day Breakthrough, along with direct access to
            Jeff, group sessions, accountability, and everything you need to break through. If
            you&rsquo;re ready for hands-on support, check it out.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/90-day-breakthrough"
              className="px-6 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors"
            >
              See the 90-Day Breakthrough
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 border border-white/30 hover:border-white/60 text-white font-semibold rounded-lg transition-colors"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
