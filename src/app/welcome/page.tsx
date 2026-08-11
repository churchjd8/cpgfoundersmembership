import type { Metadata } from "next";
import Link from "next/link";
import { BookWaitlistForm } from "@/components/book-waitlist-form";

export const metadata: Metadata = {
  title: "Welcome to the CPG Founders Group",
  description:
    "You're in the WhatsApp group. Here's everything else Jeff Church has for CPG founders - free tools, Babu AI, the MBA for CPG, and private advisory.",
};

const freeStuff = [
  {
    emoji: "🧰",
    title: "The free resource library",
    description:
      "Runway calculator, unit pricing and break-even model, trade promo break-even, chart of accounts, SKU rationalization tool, the Suja Lessons Learned and Fatal Flaws white papers, plus the workshop replays - Reducing Your Burn Rate and the 3-hour Fundraising Masterclass.",
    href: "/resources",
    linkLabel: "Grab the bundle",
  },
  {
    emoji: "📚",
    title: "100+ articles on the hard stuff",
    description:
      "Co-manufacturing, broker strategy, angel rounds, board management, exit prep. Written for founders who need the answer today, not the theory.",
    href: "/blog",
    linkLabel: "Read the blog",
  },
];

const paidStuff = [
  {
    emoji: "🎓",
    title: "MBA for CPG",
    price: "$997, lifetime access",
    description:
      "8 modules, 450+ slides, the financial models, and the full playbook. Everything you'd get from a $50K business school, built only for CPG founders. Self-paced.",
    href: "/mba-for-cpg",
    linkLabel: "See what's inside",
  },
  {
    emoji: "🤝",
    title: "Private strategic advisory",
    price: "Selective, application only",
    description:
      "Work with Jeff directly on growth, fundraising, and exit planning. A small number of founders at a time, because that's the only way it works.",
    href: "/apply",
    linkLabel: "Learn more",
  },
];

export default function WelcomePage() {
  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative bg-foreground text-white overflow-hidden">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full mb-6">
            You&rsquo;re in
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
            Welcome to the group
          </h1>
          <p className="mt-6 text-lg text-white/70 leading-relaxed">
            Thank you for raising your hand. You&rsquo;re now standing with 275+ CPG founders
            who are building the same thing you are, usually at 11pm, usually with fewer
            answers than they&rsquo;d like.
          </p>
          <p className="mt-4 text-lg text-white/70 leading-relaxed">
            The WhatsApp group is the front door. This page is everything behind it. Some of
            it is free, some of it isn&rsquo;t. Take what&rsquo;s useful, ignore the rest.
          </p>
        </div>
      </section>

      {/* ========== FREE ========== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
              All Free
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Start here</h2>
            <p className="mt-4 text-lg text-muted">
              No cost, no call, no pitch. Built from real mistakes, most of them Jeff&rsquo;s.
            </p>
          </div>

          {/* Babu gets the whole width - it's the one we want people to open first */}
          <a
            href="https://www.askbabu.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-foreground text-white rounded-2xl p-8 sm:p-12 mb-6 hover:shadow-xl transition-all"
          >
            <div className="grid lg:grid-cols-5 gap-8 items-center">
              <div className="lg:col-span-3">
                <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full mb-5">
                  10 days free
                </span>
                <p className="text-5xl mb-4">🤖</p>
                <h3 className="text-3xl sm:text-4xl font-bold tracking-tight">Babu AI</h3>
                <p className="mt-4 text-lg text-white/70 leading-relaxed">
                  An AI advisor trained on 35+ years of CPG operating experience. Pricing,
                  promo math, retailer strategy, fundraising prep. Underneath it sit 40+
                  purpose-trained Gurus, each one built for a single job - brand
                  positioning, investor pitch prep, product line P&amp;L, co-man contract
                  review, fatal flaw assessment - so you get an operator&rsquo;s answer, not
                  a search result.
                </p>
                <span className="mt-8 inline-flex items-center justify-center px-8 py-4 bg-accent group-hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors text-lg">
                  Start the free trial &rarr;
                </span>
              </div>
              <ul className="lg:col-span-2 space-y-3 text-white/70">
                {[
                  "Brand Positioning Guru",
                  "Investor Pitch Prep Coach",
                  "Fatal Flaw Assessment",
                  "Product Line P&L",
                  "Co-Man Contract Review",
                  "...and 35 more",
                ].map((g) => (
                  <li key={g} className="flex items-start gap-3">
                    <span className="text-accent font-bold">&rarr;</span>
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>
          </a>

          <div className="grid gap-6 sm:grid-cols-2">
            {freeStuff.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group bg-card rounded-xl border border-border p-6 sm:p-8 flex flex-col hover:shadow-lg hover:border-accent/30 transition-all"
              >
                <p className="text-4xl mb-4">{card.emoji}</p>
                <h3 className="text-xl font-bold tracking-tight group-hover:text-accent transition-colors">
                  {card.title}
                </h3>
                <p className="mt-3 text-muted leading-relaxed flex-1">{card.description}</p>
                <div className="mt-6 pt-4 border-t border-border">
                  <span className="inline-flex items-center text-sm font-semibold text-accent group-hover:text-accent-dark transition-colors">
                    {card.linkLabel} &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== BOOK ========== */}
      <section className="py-16 md:py-24 bg-foreground text-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full mb-6">
            Coming soon
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            The Cold-Pressed Truth
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-white/80 font-medium leading-snug">
            A Founder&rsquo;s Field Guide to Building, Scaling, and Selling a Consumer Brand
          </p>
          <p className="mt-4 text-accent font-semibold">Foreword by Jay Shetty</p>
          <p className="mt-6 text-lg text-white/70 leading-relaxed">
            Jeff&rsquo;s book on building Suja from an ice closet to $100 million in six years,
            and everything that cost him along the way. The wins are in there. So are the parts
            most founders never say out loud.
          </p>
          <p className="mt-4 text-white/50">
            Drop your email and you&rsquo;ll hear the moment it&rsquo;s out, along with
            Jeff&rsquo;s notes for founders in between.
          </p>
          <BookWaitlistForm />
          <p className="mt-6">
            <Link
              href="/book"
              className="text-accent hover:text-accent-dark font-semibold transition-colors"
            >
              More about the book &rarr;
            </Link>
          </p>
        </div>
      </section>

      {/* ========== PAID ========== */}
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
              When you want more
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Go deeper</h2>
            <p className="mt-4 text-lg text-muted">
              You never have to buy anything to belong here. But if you want the whole
              playbook, or you want Jeff in the room, this is how.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {paidStuff.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group bg-card rounded-xl border border-border p-6 sm:p-8 flex flex-col hover:shadow-lg hover:border-accent/30 transition-all"
              >
                <p className="text-4xl mb-4">{card.emoji}</p>
                <h3 className="text-xl font-bold tracking-tight group-hover:text-accent transition-colors">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm font-semibold text-accent">{card.price}</p>
                <p className="mt-3 text-muted leading-relaxed flex-1">{card.description}</p>
                <div className="mt-6 pt-4 border-t border-border">
                  <span className="inline-flex items-center text-sm font-semibold text-accent group-hover:text-accent-dark transition-colors">
                    {card.linkLabel} &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FOLLOW / SUPPORT ========== */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            One more thing
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            Jeff writes on LinkedIn a few times a week. Shorter than the blog, usually
            something he just watched a founder get wrong.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.linkedin.com/in/jeff-church-06841629/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors"
            >
              Follow Jeff on LinkedIn
            </a>
            <Link
              href="/about-jeff"
              className="px-6 py-3 border border-border hover:border-foreground font-semibold rounded-lg transition-colors"
            >
              About Jeff
            </Link>
          </div>
          <p className="mt-10 text-muted">
            Questions, or something you need and don&rsquo;t see?{" "}
            <a
              href="mailto:info@teamchurch.co"
              className="text-accent hover:text-accent-dark font-semibold transition-colors"
            >
              info@teamchurch.co
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
