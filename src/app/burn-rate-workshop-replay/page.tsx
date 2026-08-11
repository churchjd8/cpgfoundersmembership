import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Reducing the Burn Workshop Replay - CPG Founders Group",
  description:
    "90 minutes of live training on reducing your burn rate and getting to profitability faster. Pricing, trade spend, SKU rationalization, cash conversion, and runway planning — plus 5 free tools.",
};

const topics = [
  {
    title: "True Burn Rate & Runway",
    description:
      "How to calculate your real burn rate, find your exact runway length, and model how changes affect your timeline.",
  },
  {
    title: "Cost Reduction Strategies",
    description:
      "The most common costs killing early-stage CPG brands and how to cut them without sacrificing brand integrity.",
  },
  {
    title: "Pricing & Margin Targets",
    description:
      "How to find your optimal price using two approaches — MSRP down or COGS up — and hit gross margin benchmarks at every stage.",
  },
  {
    title: "Trade Spend Management",
    description:
      "How to evaluate lift, calculate break-even on promotions, and stop running promos that lose money.",
  },
  {
    title: "SKU Rationalization",
    description:
      "Which SKUs are carrying your brand and which are dragging it down. Keep, monitor, or cut — with the math to back it up.",
  },
  {
    title: "Cash Conversion Cycle",
    description:
      "How your payment terms trap or free cash, and the exact levers to pull on AR, AP, and inventory to extend your runway.",
  },
];

const tools = [
  {
    icon: "📊",
    title: "Pricing Calculator",
    description:
      "Start from MSRP and work down, or start from COGS and build up. Compare both approaches to find your optimal price.",
    href: "https://drive.google.com/uc?export=download&id=1BzsfbD05XuR6-XCust69_OGjfPqSPcih",
  },
  {
    icon: "📉",
    title: "Trade Promo Break-Even Calculator",
    description:
      "Should you run that promo? Break-even lift, P&L comparison, and a traffic-light score so you know before you commit.",
    href: "https://drive.google.com/uc?export=download&id=1TOA5xBS_4Iwl_ChKbr8O6DT0yVkgKtJv",
  },
  {
    icon: "🔍",
    title: "SKU Rationalization Tool",
    description:
      "Margin thresholds, portfolio contribution analysis, and keep/monitor/cut decisions for every SKU in your lineup.",
    href: "https://drive.google.com/uc?export=download&id=1TsyjcooNakJi4ROVMEB0Ta8e-MO4rqGa",
  },
  {
    icon: "🔄",
    title: "Cash Conversion Cycle Tool",
    description:
      "See exactly how your payment terms affect your cash position. Change any input and watch the dollar impact in real time.",
    href: "https://drive.google.com/uc?export=download&id=1eejrhY2elYC-mO5lG4b2GWvmhzEpv3AF",
  },
  {
    icon: "💰",
    title: "Cash Runway Calculator",
    description:
      "Model your burn rate across 3 years, calculate your exact runway, and figure out how much you need to raise.",
    href: "https://drive.google.com/uc?export=download&id=1scxRZdGvg1YSDGpY828dT7j_oBrH-0Ck",
  },
];

export default function BurnRateWorkshopReplayPage() {
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
              Reducing the Burn: CPG Profitability Workshop
            </h1>
            <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
              90 minutes of live training with Jeff Church on reducing your burn rate and
              getting to profitability faster. Plus 5 free tools to put it into action.
            </p>
          </div>
        </div>
      </section>

      {/* ========== VIDEO EMBED ========== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
            <iframe
              src="https://www.youtube.com/embed/6sGSgQndxpU"
              title="Reducing the Burn: CPG Profitability Workshop with Jeff Church"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* ========== WHAT YOU'LL LEARN ========== */}
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
              What You&rsquo;ll Learn
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              The frameworks to reduce your burn and extend your runway
            </h2>
            <p className="mt-4 text-lg text-muted">
              The same playbook Jeff uses with his portfolio brands to get to profitability faster.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((item) => (
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

      {/* ========== INCLUDED TOOLS ========== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
              Included Tools
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              5 free tools to put it into action
            </h2>
            <p className="mt-4 text-lg text-muted">
              Download the Excel files, plug in your numbers, and have a clearer picture of
              your business by tomorrow morning.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <a
                key={tool.title}
                href={tool.href}
                className="bg-card-flagship rounded-xl border border-accent/30 p-6 text-center group hover:shadow-lg transition-shadow"
              >
                <p className="text-4xl mb-4">{tool.icon}</p>
                <h3 className="text-lg font-bold mb-2 group-hover:text-accent transition-colors">
                  {tool.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {tool.description}
                </p>
                <p className="mt-4 text-sm font-semibold text-accent">
                  Download Excel &darr;
                </p>
              </a>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/resources"
              className="inline-flex items-center justify-center px-8 py-4 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors text-lg"
            >
              Access all free resources &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ========== 90-DAY BREAKTHROUGH CTA ========== */}
      <section className="py-16 md:py-24 bg-foreground text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full mb-6">
              Go Deeper
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Ready to work through your numbers with Jeff?
            </h2>
            <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
              The 90-Day Breakthrough is where Jeff works directly with founders to break
              through whatever&rsquo;s blocking the next stage. Onboarding diagnostic, 3x/month
              group sessions, weekly accountability calls, email access to Jeff, and the full
              toolkit. 90 days of real work — not a course you watch and forget.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/apply"
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
