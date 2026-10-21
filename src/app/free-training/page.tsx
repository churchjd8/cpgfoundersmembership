import type { Metadata } from "next";
import Image from "next/image";
import { TRAINING_SUBTITLE, TRAINING_TITLE } from "@/lib/founder-offer";
import { TestimonialCarousel } from "../fatalflaws-webinar/testimonial-carousel";
import { RegistrationForm } from "./registration-form";

export const metadata: Metadata = {
  title: `${TRAINING_TITLE} | Free Training with Jeff Church`,
  description:
    "93% of new CPG brands don't make it. In a free 45-minute training, 8x founder Jeff Church, co-founder of Suja, shows the 5 fatal mistakes founders make in the first 24 months and how to be the 7%.",
  openGraph: {
    title: "93% of New CPG Brands Don't Make It",
    description: "The 5 fatal mistakes founders make in the first 24 months. Free training with Jeff Church, co-founder of Suja.",
    images: ["/images/jeff-teaching.webp"],
  },
};

const lessons = [
  {
    number: "01",
    title: "Underestimating what it takes to get on shelf",
    description: "What it really costs and how long it takes to get a first brand on shelf, and the 8-phase roadmap to spend it in the right order.",
  },
  {
    number: "02",
    title: "Setting your price before you do the math",
    description: "Where a $5.99 shelf price actually goes, the gross margin to plan for, and the one product swap that took Suja from 32% to 40%.",
  },
  {
    number: "03",
    title: "Chasing stores instead of velocity",
    description: "Why more doors can sink you, how long you get to prove you belong on the shelf, and the order to open retailers in.",
  },
  {
    number: "04",
    title: "Running out of cash, or giving away the company to get it",
    description: "How much runway to raise for, how much of the company to give up per round, and how founders end up owning 4% at exit.",
  },
  {
    number: "05",
    title: "Signing the wrong paper",
    description: "The three things Jeff will not sign, and the handshake deal that cost Suja more than $1 million in 90 days.",
  },
];

const sevenPercent = [
  { name: "Poppi", line: "Acquired by PepsiCo for $1.95 billion." },
  { name: "Olipop", line: "Valued at $1.85 billion." },
  { name: "Grüns", line: "Turned daily nutrition into a gummy and built a category around it." },
];

const sujaStory = [
  ["$0 to $100M", "in six years"],
  ["30%", "stake taken by Coca-Cola in 2015, at a $300M valuation"],
  ["~10x", "returned to Suja's angel investors"],
  ["$700M+", "valuation when Suja went public on Nasdaq, May 2026"],
];

const audiences = [
  {
    eyebrow: "You just launched",
    title: "And you are finding out CPG is a different beast.",
    points: [
      "You are in stores, and the money is not adding up the way the plan said.",
      "Distributors, deductions, slotting, brokers. Nobody explained any of it.",
      "You suspect you are making an expensive mistake and cannot see which one.",
    ],
  },
  {
    eyebrow: "You are about to launch",
    title: "And you want to get it right the first time.",
    points: [
      "You have a product, maybe a name, maybe a co-packer quote.",
      "You want to know what it really costs before you spend your savings.",
      "You would rather learn the order of operations than pay for it twice.",
    ],
  },
];

const faqs = [
  ["Is it really free?", "Yes. Register and the full training opens right away. No card, nothing to buy to watch it."],
  ["Is this live?", "No. Jeff recorded it so you can watch it now, pause it, and come back to it."],
  ["How long is it?", "About 45 minutes."],
  ["I have not launched yet. Is it too early?", "It is the best time. Every one of the five mistakes is cheaper to learn before you sign a co-packer agreement or take a first check."],
  ["I am already past $1M. Is this for me?", "You will recognize most of it. Jeff works with brands at your stage through his advisory programs, and we will point you there after you register."],
];

const testimonials = [
  {
    tag: "Author & entrepreneur",
    quote: "In a world that often glorifies hype, noise, and overnight success, Jeff Church has chosen a different path. He also knows that outcomes are shaped long before they are visible, through the countless small decisions most people never see.",
    name: "Jay Shetty",
    title: "Author of Think Like a Monk",
    image: "/images/testimonials/jay-shetty.jpg",
  },
  {
    tag: "Founder & investor",
    quote: "Jeff is truly the Yoda of CPG. When I made the leap from tech into beverage with JUNI, his guidance helped us avoid mistakes that could have cost us years and millions.",
    name: "Kim Perell",
    title: "Co-Founder of JUNI Adaptogen Tea; bestselling author",
    image: "/images/testimonials/kim-perell.jpg",
  },
  {
    tag: "CPG industry leader",
    quote: "Jeff Church has done it all as an entrepreneur — driven hypergrowth and delivered stellar returns to investors. But he’s also managed disappointments and setbacks. Any entrepreneur at any stage can learn from his wisdom — I know I did!",
    name: "Seth Goldman",
    title: "Founder of Honest Tea",
    image: "/images/testimonials/seth-goldman.jpg",
  },
  {
    tag: "CPG industry leader",
    quote: "Jeff shows that great companies aren’t built on shortcuts or luck — they’re built on timeless principles, disciplined execution, and relentless learning.",
    name: "Mark Rampolla",
    title: "Founder of ZICO Coconut Water",
    image: "/images/testimonials/mark-rampolla.jpg",
  },
  {
    tag: "CPG industry leader",
    quote: "In CPG, the difference between the brands that endure and the brands that disappear comes down to discipline — about margin, about culture, about cash. Jeff has built it, lost it, and won it back.",
    name: "John Foraker",
    title: "Co-Founder & CEO, Once Upon a Farm; former CEO, Annie’s",
    image: "/images/testimonials/john-foraker.jpg",
  },
];

export default function FreeTrainingPage() {
  return (
    <>
      <div className="bg-accent px-4 py-2.5 text-center text-xs font-bold uppercase tracking-[0.16em] text-white sm:text-sm">
        Free training · 45 minutes · Watch right away
      </div>

      <section className="relative isolate overflow-hidden bg-foreground text-white">
        <div className="absolute inset-0 -z-10 opacity-30" aria-hidden="true" style={{ backgroundImage: "radial-gradient(circle at 16% 22%, #1b3a5f 0, transparent 40%), radial-gradient(circle at 82% 12%, #a56a16 0, transparent 28%)" }} />

        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-8">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-gold">
              Free training for new food and beverage founders
            </div>
            <h1 className="max-w-3xl text-4xl font-bold leading-[1.05] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
              93% of new CPG brands don&rsquo;t make it.{" "}
              <span className="text-gold">5 fatal mistakes to avoid in your first 24 months.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/72 sm:text-xl">{TRAINING_SUBTITLE}</p>
            <p className="mt-6 max-w-2xl border-l-2 border-gold/50 pl-5 text-base leading-relaxed text-white/72">
              &ldquo;I had started six companies and had a Harvard MBA. Then a Whole Foods buyer asked for my HACCP plan, and I had no idea what she was talking about.&rdquo;
            </p>
          </div>

          <div id="register" className="scroll-mt-24 rounded-2xl border border-white/15 bg-background p-6 text-foreground shadow-2xl sm:p-8">
            <h2 className="text-2xl font-bold">Watch the free training</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">Tell us where to send it and it opens on the next page.</p>
            <div className="mt-6"><RegistrationForm trainingTitle={TRAINING_TITLE} /></div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white py-7">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Image src="/images/as-seen-in-banner.png" alt="Jeff Church recognition and media features" width={900} height={100} className="h-auto w-full opacity-80" />
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">How to be the 7%</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Everyone wants to be the next Poppi.</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">Of every 5,000 CPG brands that launch, only about 7% make it to proof of concept. The ones that make it didn&rsquo;t have better ideas. They avoided the mistakes that kill the other 93%.</p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {sevenPercent.map((brand) => (
              <article key={brand.name} className="rounded-2xl border border-border bg-card p-7">
                <h3 className="text-2xl font-bold">{brand.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{brand.line}</p>
              </article>
            ))}
          </div>

          <div className="mt-5 rounded-2xl bg-foreground p-7 text-white sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Jeff&rsquo;s 7% story: Suja</p>
            <h3 className="mt-3 text-2xl font-bold sm:text-3xl">From juice delivered by skateboard to the Nasdaq.</h3>
            <div className="mt-8 grid grid-cols-2 gap-6 lg:grid-cols-4">
              {sujaStory.map(([number, label]) => (
                <div key={number}>
                  <p className="text-3xl font-bold text-gold">{number}</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/65">{label}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-3xl text-sm leading-relaxed text-white/65">
              Along the way Jeff made every one of the five mistakes in this training. One cost a million dollars in 90 days. This is the playbook he wishes he had on day one.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Who this is for</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">CPG has its own language, its own math and its own rules.</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">You can be smart, you can have run a business before, and you can have a great product. This industry will still charge you tuition.</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {audiences.map((audience) => (
              <article key={audience.eyebrow} className="rounded-2xl border border-border bg-white p-7 sm:p-9">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">{audience.eyebrow}</p>
                <h3 className="mt-3 text-2xl font-bold leading-snug">{audience.title}</h3>
                <ul className="mt-5 space-y-3">
                  {audience.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-0.5 font-bold text-accent" aria-hidden="true">&#10003;</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">The 5 fatal mistakes</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Jeff made all five. Here&rsquo;s the fix for each.</h2>
          </div>
          <div className="mt-10 divide-y divide-border border-y border-border">
            {lessons.map((lesson) => (
              <article key={lesson.number} className="flex items-start gap-6 py-7">
                <span className="font-mono text-sm font-bold text-accent">{lesson.number}</span>
                <div>
                  <h3 className="text-xl font-bold leading-snug">{lesson.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{lesson.description}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10">
            <a href="#register" className="inline-flex items-center justify-center rounded-lg bg-accent px-7 py-4 text-base font-bold text-white transition hover:bg-accent-dark">
              Watch the Free Training <span className="ml-2" aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </section>

      <section className="bg-card-flagship py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <div className="relative min-h-[420px] overflow-hidden rounded-2xl">
              <Image src="/images/jeff-suja.webp" alt="Jeff Church at the Suja Juice production line" fill className="object-cover" sizes="(min-width: 1024px) 38vw, 92vw" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Your teacher</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Five home runs. Three strikeouts. Lessons from both.</h2>
              <p className="mt-5 leading-relaxed text-muted">Jeff Church has started or acquired eight companies and is building his ninth. He co-founded Suja Juice and took it from zero to $100 million in six years, with Coca-Cola and Goldman Sachs as investors. Suja sold for about $300 million in 2020 and went public on Nasdaq in 2026.</p>
              <p className="mt-4 leading-relaxed text-muted">He has also paid a million dollars in slotting for a brand that was off the shelf in eight months. This training is what he learned on both sides of that scoreboard.</p>
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[["8", "companies"], ["$212M", "raised"], ["~$700M", "returned to investors"], ["44", "fundraising rounds"]].map(([number, label]) => (
                  <div key={label} className="rounded-xl border border-accent/20 bg-white p-5 shadow-sm"><p className="text-2xl font-bold text-accent">{number}</p><p className="mt-1 text-xs font-semibold text-muted">{label}</p></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-background py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Trusted by people who have built it</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">What leading founders say about Jeff.</h2>
          </div>
          <div className="mt-4">
            <TestimonialCarousel testimonials={testimonials} />
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-white py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold tracking-tight">Questions, answered.</h2>
          <div className="mt-10 divide-y divide-border border-y border-border">
            {faqs.map(([question, answer]) => (
              <details key={question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold">
                  <span>{question}</span>
                  <span className="text-xl font-normal text-accent transition group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 pr-10 text-sm leading-relaxed text-muted">{answer}</p>
              </details>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href="#register" className="inline-flex items-center justify-center rounded-lg bg-accent px-7 py-4 text-base font-bold text-white transition hover:bg-accent-dark">
              Watch the Free Training <span className="ml-2" aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
