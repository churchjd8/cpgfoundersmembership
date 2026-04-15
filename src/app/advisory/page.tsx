import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Private Strategic Advisory with Jeff Church - CPG Founders Group",
  description:
    "Ongoing, private strategic advisory for established CPG brands. Jeff Church embedded in your business as a hands-on strategic partner.",
};

const emailHref =
  "mailto:info@teamchurch.co?subject=Private Advisory Inquiry";

const engagementAreas = [
  {
    title: "Growth Strategy & Scaling",
    description:
      "Channel expansion, retail strategy, velocity optimization, and the sequencing decisions that determine whether you scale profitably or burn cash getting there.",
  },
  {
    title: "Fundraising & Capital Strategy",
    description:
      "Raise architecture, investor targeting, deck and model review, valuation strategy, and deal negotiation. Jeff has led 40+ funding rounds and raised $275M+.",
  },
  {
    title: "M&A Preparation & Exit Planning",
    description:
      "Positioning the business for acquisition, building the right narrative, identifying buyers, and navigating the process. Five exits, $700M+ in total value returned.",
  },
  {
    title: "Financial & Operational Infrastructure",
    description:
      "Margins, cash conversion, supply chain architecture, co-packer negotiations, and the operational backbone that separates brands that survive from brands that scale.",
  },
  {
    title: "Leadership & Team",
    description:
      "Hiring strategy, organizational design, board dynamics, and the leadership decisions that compound over time. Including when to fire fast and when to coach up.",
  },
  {
    title: "Brand & Category Strategy",
    description:
      "Positioning, innovation pipeline, SKU rationalization, competitive response, and making sure you're building something durable, not just chasing distribution.",
  },
];

const credentials = [
  "8x founder/CEO across consumer brands, manufacturing, and building products",
  "Co-founded Suja Juice — scaled to $100M+ revenue in 5 years, sold for $300M",
  "5 exits totaling $700M+ in value returned to investors",
  "$275M+ raised across 40+ funding rounds, 10x median angel return",
  "Harvard Business School MBA, CPA (Ernst & Young)",
  "BevNET Person of the Year, E&Y Entrepreneur of the Year finalist",
  "35+ years in CPG with deep relationships across buyers, investors, brokers, and operators",
  "Advised Health-Ade, Once Upon a Farm, Juni, Live Pure, and dozens more",
];

export default function AdvisoryPage() {
  return (
    <>
      {/* ========== 1. HERO ========== */}
      <section className="relative bg-foreground text-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full mb-6">
                Private Advisory
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                Jeff Church embedded in your business.
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-white/70 max-w-2xl leading-relaxed">
                Ongoing, private strategic advisory for established CPG brands that need
                an operator&rsquo;s perspective at the table &mdash; not a consultant who read about
                it in a book.
              </p>
              <p className="mt-4 text-sm text-accent font-semibold uppercase tracking-wider">
                By inquiry only &mdash; limited engagements
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href={emailHref}
                  className="inline-flex items-center justify-center px-6 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors text-base"
                >
                  Inquire about advisory &rarr;
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/images/jeff-suja.webp"
                  alt="Jeff Church"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 2. THE DIFFERENCE ========== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
            This Isn&rsquo;t Consulting
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            You don&rsquo;t need another slide deck. You need someone who&rsquo;s been there.
          </h2>
          <div className="mt-6 space-y-4 text-lg text-muted leading-relaxed">
            <p>
              Most consultants hand you a strategy document and wish you luck. Jeff doesn&rsquo;t
              operate that way. He&rsquo;s built eight companies from the inside. He&rsquo;s sat
              across from Costco buyers, negotiated with Goldman Sachs, managed a $300M exit, and
              made every expensive mistake along the way so you don&rsquo;t have to.
            </p>
            <p>
              Private advisory means Jeff is in your business. On your calls. Reviewing your
              numbers. Pressure-testing your strategy. Sitting beside you at the table when the
              stakes are real.
            </p>
            <p className="font-semibold text-foreground">
              This is for brands past the startup phase that need a seasoned operator&rsquo;s eye
              on the decisions that will define the next chapter of their business.
            </p>
          </div>
        </div>
      </section>

      {/* ========== 3. WHAT THIS LOOKS LIKE ========== */}
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto mb-12">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
              The Engagement
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              What private advisory looks like.
            </h2>
            <p className="mt-4 text-lg text-muted">
              Every engagement is structured around what your business actually needs. No templated
              programs. No group calls. This is Jeff, directly, on the problems that matter most.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {engagementAreas.map((area) => (
              <div
                key={area.title}
                className="bg-card rounded-xl border border-border p-6 sm:p-8"
              >
                <h3 className="text-lg font-bold mb-2">{area.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{area.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 max-w-3xl mx-auto">
            <div className="bg-card-flagship rounded-xl border border-accent/30 p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-4">A typical engagement includes:</h3>
              <ul className="space-y-3 text-muted">
                <li className="flex gap-3">
                  <span className="text-accent font-bold flex-shrink-0">&#10003;</span>
                  <span>
                    <span className="font-semibold text-foreground">Direct access to Jeff</span>{" "}
                    &mdash; phone, email, and scheduled working sessions on your timeline
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold flex-shrink-0">&#10003;</span>
                  <span>
                    <span className="font-semibold text-foreground">
                      Strategic working sessions
                    </span>{" "}
                    &mdash; regularly scheduled deep dives on the highest-leverage problems in
                    your business
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold flex-shrink-0">&#10003;</span>
                  <span>
                    <span className="font-semibold text-foreground">
                      Financial and operational review
                    </span>{" "}
                    &mdash; P&amp;L analysis, margin optimization, cash flow strategy, and
                    fundraising architecture
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold flex-shrink-0">&#10003;</span>
                  <span>
                    <span className="font-semibold text-foreground">
                      Network and introductions
                    </span>{" "}
                    &mdash; 35 years of relationships with buyers, investors, brokers, and
                    operators, deployed on your behalf
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold flex-shrink-0">&#10003;</span>
                  <span>
                    <span className="font-semibold text-foreground">
                      Board and investor support
                    </span>{" "}
                    &mdash; preparation for board meetings, investor updates, and the conversations
                    that shape your cap table
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold flex-shrink-0">&#10003;</span>
                  <span>
                    <span className="font-semibold text-foreground">
                      Full toolkit access
                    </span>{" "}
                    &mdash; MBA for CPG, Babu Pro, financial models, templates, and every resource
                    Jeff has built over 35 years
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 4. WHO THIS IS FOR ========== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
            Who This Is For
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Built for brands past the early stage.
          </h2>
          <p className="mt-4 text-lg text-muted">
            Private advisory is for founders and leadership teams running established CPG brands
            who need a strategic partner, not a course or a group program.
          </p>

          <ul className="mt-8 space-y-3">
            {[
              "You're doing $5M+ in revenue and the decisions ahead of you are getting bigger and more consequential.",
              "You're preparing for a raise, a major retail expansion, or an exit and you want someone who's done it before sitting beside you.",
              "You need an experienced operator's perspective on your P&L, your team, your supply chain, or your go-to-market, not just encouragement.",
              "You want direct, private access to Jeff, not a group dynamic.",
              "You're willing to invest at a level that reflects the value of having a battle-tested 8x founder in your corner.",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-muted">
                <span className="text-accent font-bold text-lg leading-6 flex-shrink-0">
                  &#10003;
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 p-5 bg-background rounded-lg border border-border">
            <p className="text-sm text-muted">
              <span className="font-semibold text-foreground">Not there yet?</span> The{" "}
              <Link href="/90-day-breakthrough" className="text-accent hover:text-accent-dark font-semibold">
                90-Day Breakthrough
              </Link>{" "}
              is built for earlier-stage founders who want Jeff&rsquo;s guidance through group
              sessions, community, and direct support. It&rsquo;s where most founders start.
            </p>
          </div>
        </div>
      </section>

      {/* ========== 5. ABOUT JEFF ========== */}
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
                About Jeff Church
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                35 years of building. Yours to leverage.
              </h2>
              <p className="mt-6 text-lg text-muted leading-relaxed">
                Jeff Church has spent 35 years inside CPG &mdash; not advising from the sidelines,
                but building, scaling, raising, and selling. When he sits across from you, he&rsquo;s
                not guessing. He&rsquo;s drawing on decades of real decisions with real money on the
                line.
              </p>
              <ul className="mt-6 space-y-2">
                {credentials.map((c) => (
                  <li key={c} className="flex gap-2 text-sm text-muted">
                    <span className="text-accent font-bold flex-shrink-0">&#10003;</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Link
                  href="/about-jeff"
                  className="inline-flex items-center font-semibold text-accent hover:text-accent-dark transition-colors"
                >
                  Read Jeff&rsquo;s full story &rarr;
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="/images/jeff-teaching.webp"
                alt="Jeff Church working with founders"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========== 6. PRICING & INQUIRY ========== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
              Investment
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Private advisory starts at $20,000/month.
            </h2>
            <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
              Engagements are structured around what your business needs and scoped accordingly.
              This is Jeff&rsquo;s highest level of involvement &mdash; limited to a handful of
              brands at any given time.
            </p>
          </div>

          <div className="bg-card-flagship rounded-xl border border-accent/30 ring-2 ring-accent/20 p-6 sm:p-8 md:p-10">
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg border border-border p-5">
                <p className="text-sm font-semibold text-muted uppercase tracking-wide mb-2">
                  Starting at
                </p>
                <p className="text-3xl font-bold">
                  $20,000<span className="text-base font-normal text-muted">/mo</span>
                </p>
                <p className="text-sm text-muted mt-1">
                  Minimum 3-month engagement
                </p>
              </div>
              <div className="bg-white rounded-lg border border-border p-5">
                <p className="text-sm font-semibold text-muted uppercase tracking-wide mb-2">
                  Structure
                </p>
                <p className="text-lg font-bold mt-1">Scoped to your business</p>
                <p className="text-sm text-muted mt-1">
                  Every engagement is custom-built around the work that matters most
                </p>
              </div>
            </div>

            <a
              href={emailHref}
              className="block w-full text-center px-6 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors text-lg"
            >
              Inquire about private advisory &rarr;
            </a>
            <p className="mt-3 text-xs text-muted text-center">
              We&rsquo;ll set up a call to discuss your business, what you need, and whether
              it&rsquo;s a fit.
            </p>
          </div>
        </div>
      </section>

      {/* ========== 7. FINAL CTA ========== */}
      <section className="py-16 md:py-24 bg-foreground text-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            The decisions ahead of you are too important to make alone.
          </h2>
          <p className="mt-6 text-lg text-white/70 leading-relaxed">
            You&rsquo;ve built something real. The next chapter &mdash; whether it&rsquo;s a raise,
            an expansion, or an exit &mdash; deserves someone at the table who&rsquo;s been through
            it before.
          </p>
          <div className="mt-8">
            <a
              href={emailHref}
              className="inline-flex items-center justify-center px-8 py-4 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors text-lg"
            >
              Start the conversation &rarr;
            </a>
          </div>
          <p className="mt-4 text-sm text-white/40">
            Limited to a small number of engagements at any time.
          </p>
        </div>
      </section>
    </>
  );
}
