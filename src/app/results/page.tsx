import type { Metadata } from "next";
import Link from "next/link";

// Proof page for the work-with-Jeff funnel. Sent by hand alongside /intensive
// when a founder asks who Jeff has worked with. Unlisted like /intensive: not
// linked from nav or the footer and noindexed. Quotes are verbatim from
// "Jeff Church - Testimonials Master List.md" and the /book praise section;
// keep those in sync if a quote changes.

export const metadata: Metadata = {
  title: "Results - Founders on Working with Jeff Church",
  description:
    "What founders and industry leaders say about working with Jeff Church, in their own words.",
  robots: { index: false, follow: false },
};

const highlights = [
  {
    stat: "$1.5M",
    label: "Angel round raised at Live Pure",
    body: "Jeff led the raise all the way through, and it closed the way he designed it.",
  },
  {
    stat: "Retail + broker",
    label: "Landed for JUNI",
    body: "Jeff was the primary reason JUNI got into Moscoe, and he helped secure Presence Marketing as their natural foods broker.",
  },
  {
    stat: "First doors",
    label: "Opened for LIXIR",
    body: "Jeff was pivotal in securing their first retailers and their first DSD distributors.",
  },
];

const founders = [
  {
    headline: "Led us through a successful $1.5M angel raise",
    quote:
      "Prior to meeting Jeff I knew that we were missing something. With Jeff's amazing CPG knowledge, business experience and life lessons, his input has been invaluable. He led us all the way through a successful $1.5M Angel fund raising and it worked out exactly as he designed it. Access to Jeff's team of CPG experts has also been hugely helpful. In addition to being a great leader Jeff is extremely humble and approachable which made it very easy to work with him. 5 star review from Live Pure!",
    name: "Tiffany Tatom",
    title: "Co-Founder & CEO, Live Pure",
  },
  {
    headline: "Got JUNI into retail and secured our natural foods broker",
    quote:
      "Jeff is a rare individual in that he has deep knowledge of all departments and functional areas whether it be financial model building, sales, marketing, cost accounting, operations and whatever else, he can add deep value in any of these areas. Jeff was the primary reason that we got JUNI into Moscoe and helped us secure Presence Marketing as our Natural Foods broker. Jeff is extremely well connected in the CPG world and more specifically the food and beverage areas. Jeff's amiable aggressive personality makes him very easy to work with.",
    name: "Kim Perell",
    title: "Co-Founder & CEO, JUNI",
  },
  {
    headline: "Pivotal in securing our first retailers and DSD distributors",
    quote:
      "Jeff's contribution to LIXIR has been beyond anything I would have ever expected. Jeff was also pivotal in securing our first retailers and our first DSD Distributors.",
    name: "Colin Mckenna",
    title: "Founder & CEO, LIXIR",
  },
  {
    headline: "It really is an MBA in CPG",
    quote:
      "Working with Jeff has been a game-changing crash course for my business. It really is an MBA in CPG. The bootcamp videos were full of relevant and detailed lessons and the dialogue during the in-person calls has been invaluable. Jeff and his team are a wealth of knowledge when it comes to finance, fundraising, brand strategy, and more.",
    name: "Simon Solis-Cohen",
    title: "Founder, Huxley",
  },
  {
    headline: "Far exceeded my expectations in terms of ROI",
    quote:
      "Being part of this program has been an absolute game-changer for my CPG brand. The depth of insight into launching and scaling a brand is unparalleled, offering practical, MBA-level education that has far exceeded my expectations in terms of ROI. Jeff's thoughtful leadership, unwavering integrity, and genuine passion for helping others succeed make him not only a brilliant mentor but also an exceptional person, whose guidance has saved me invaluable time and money.",
    name: "Carolyn Hamlet",
    title: "Founder, Oku Conscious Energy Gummy Snacks",
  },
  {
    headline: "An incredible momentum shift for my business",
    quote:
      "Working with Jeff was an incredible momentum shift for my business in 2024. From exposure to the most connected CPG community, to the level of detail that Jeff had in each session. He tailored everything to be intentional with each brand. We loved being involved in the network that spiraled from it as well!",
    name: "Hannah Minardi",
    title: "Co-Founder, Standard Self Care",
  },
  {
    headline: "Zero CPG experience, set up for success",
    quote:
      "The program that Jeff and his partners put together was a huge help for TIZZ. My partner Todd and I are both entertainment professionals, with zero beverage or CPG experience, but going through the program was the perfect way to learn many aspects of the business and set us up for success going forward.",
    name: "Abe Schwartz & Todd Strauss",
    title: "Co-Founders, TIZZ",
  },
  {
    headline: "Helped us develop the blueprint of success",
    quote:
      "With each slide it seemed as if Jeff told an entire story and without even knowing it I had acquired some amazing and company-changing skills. Jeff's extraordinary knowledge of CPG helped us develop the blueprint of success.",
    name: "Austin Wiberg",
    title: "Co-Founder, G7 Studio",
  },
  {
    headline: "Incredibly gracious with time and guidance",
    quote:
      "For me personally, this has been a tremendous asset to growth and my brand's future. As someone with Jeff's beverage success, he's incredibly gracious with time and guidance.",
    name: "Erick Rothchild",
    title: "CEO, WheyUp",
  },
];

const industry = [
  {
    quote:
      "Jeff Church has done it all as an entrepreneur - driven hypergrowth and delivered stellar returns to investors. But he's also managed disappointments and setbacks. Through it all, he's been the same level-headed and resilient leader. Any entrepreneur at any stage can learn from the wisdom in this book - I know I did!",
    name: "Seth Goldman",
    title: "Founder of Honest Tea",
  },
  {
    quote:
      "Jeff is truly the Yoda of CPG. When I made the leap from tech into beverage with JUNI, his guidance helped us avoid mistakes that could have cost us years and millions. The Cold-Pressed Truth is the kind of book every founder should have from day one: practical, honest, and packed with hard-earned wisdom. Must-read.",
    name: "Kim Perell",
    title:
      "Co-Founder of JUNI Adaptogen Tea; bestselling author of Mistakes That Made Me a Millionaire",
  },
  {
    quote:
      "Jeff shows that great companies aren't built on shortcuts or luck - they're built on timeless principles, disciplined execution, and relentless learning. This is required reading for anyone building a brand they want to endure.",
    name: "Mark Rampolla",
    title: "Founder of ZICO Coconut Water; author of An Entrepreneur's Guide to Freedom",
  },
  {
    quote:
      "In CPG, the difference between the brands that endure and the brands that disappear comes down to discipline - about margin, about culture, about cash. Jeff has built it, lost it, and won it back, and he teaches it here with a generosity that's rare in this industry. The Cold-Pressed Truth belongs on the desk of every CPG founder.",
    name: "John Foraker",
    title: "Co-Founder & CEO, Once Upon a Farm; former CEO, Annie's",
  },
];

export default function ResultsPage() {
  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative bg-foreground text-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full mb-6">
              Results
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
              What founders say after working with Jeff.
            </h1>
            <p className="mt-6 text-lg text-white/70 leading-relaxed">
              Jeff has spent 35+ years building consumer brands, and the last several helping
              other founders build theirs. Capital raised, retailers and distributors landed,
              expensive mistakes avoided. These are their words, not ours.
            </p>
            <div className="mt-8">
              <a
                href="#founders"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-accent hover:bg-accent-dark text-white font-semibold transition-colors"
              >
                Read what they said
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========== HIGHLIGHTS ========== */}
      <section className="py-16 md:py-20 bg-card border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-border bg-background p-6 sm:p-8"
              >
                <p className="text-3xl sm:text-4xl font-bold tracking-tight text-accent">
                  {item.stat}
                </p>
                <p className="mt-2 font-bold">{item.label}</p>
                <p className="mt-2 text-sm text-muted leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FOUNDERS ========== */}
      <section id="founders" className="py-16 md:py-24 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
              Founders Jeff has worked with
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              From the founders themselves
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              Food, beverage, and wellness founders on what changed for their business.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {founders.map((t) => (
              <figure
                key={t.name}
                className="bg-card rounded-xl border border-border p-6 sm:p-8 flex flex-col"
              >
                <p className="font-bold text-lg leading-snug">{t.headline}</p>
                <blockquote className="mt-4 text-sm text-muted leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 pt-4 border-t border-border">
                  <p className="font-bold">{t.name}</p>
                  <p className="text-sm text-muted">{t.title}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FOREWORD ========== */}
      <section className="py-16 md:py-24 bg-foreground text-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-gold mb-6">
            From the foreword to Jeff&rsquo;s book
          </span>
          <blockquote className="space-y-6 text-lg sm:text-xl text-white/80 leading-relaxed">
            <p>
              &ldquo;In a world that often glorifies hype, noise, and overnight success, Jeff
              Church has chosen a different path.&rdquo;
            </p>
            <p>
              &ldquo;The golden thread running through every chapter of this book is the
              generosity with which Jeff prepares founders and leaders for what lies
              ahead.&rdquo;
            </p>
          </blockquote>
          <p className="mt-8 text-sm text-white/60">
            Jay Shetty, author of <em>Think Like a Monk</em>
          </p>
        </div>
      </section>

      {/* ========== INDUSTRY ========== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
              From the people who built the category
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              What founders who&rsquo;ve done it at scale say about Jeff
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              Advance praise for Jeff&rsquo;s book, <em>The Cold-Pressed Truth</em>.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {industry.map((p) => (
              <figure
                key={p.name}
                className="bg-card rounded-xl border border-border p-6 sm:p-8 flex flex-col"
              >
                <blockquote className="text-muted leading-relaxed flex-1">
                  &ldquo;{p.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 pt-4 border-t border-border">
                  <p className="font-bold">{p.name}</p>
                  <p className="text-sm text-muted">{p.title}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="py-16 md:py-24 bg-card border-t border-border">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Want to see what working with Jeff looks like?
          </h2>
          <p className="mt-6 text-muted leading-relaxed">
            The full breakdown of how the three months work, what&rsquo;s included, and the ROI
            guarantee behind it is all on one page.
          </p>
          <div className="mt-8">
            <Link
              href="/intensive"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-accent hover:bg-accent-dark text-white font-semibold transition-colors"
            >
              See how it works
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
