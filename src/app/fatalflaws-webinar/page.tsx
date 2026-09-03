import type { Metadata } from "next";
import Image from "next/image";
import { RegistrationForm } from "./registration-form";
import { TestimonialCarousel } from "./testimonial-carousel";

export const metadata: Metadata = {
  title: "The 18 Fatal Flaws That Kill CPG Brands | Free Live Webinar",
  description:
    "Join 8x CPG founder Jeff Church live on September 16 for a free 90-minute webinar covering the avoidable legal, financial, operational, people, sales, and marketing mistakes that derail promising brands.",
  openGraph: {
    title: "The 18 Fatal Flaws That Kill CPG Brands",
    description: "Free 90-minute live webinar and founder Q&A with Jeff Church — September 16, 2026.",
    images: ["/images/jeff-teaching.webp"],
  },
};

const riskAreas = [
  {
    number: "01",
    eyebrow: "Legal & equity",
    title: "The paperwork that quietly puts everything at risk",
    description: "Long-term and evergreen contracts, personal guarantees, trademark exposure, and casual equity promises that become painfully expensive later.",
  },
  {
    number: "02",
    eyebrow: "Cash & operations",
    title: "The operational decisions that drain runway",
    description: "Overstocked inventory, fragile quality controls, unrealistic production promises, and the cash-flow blind spots that catch founders too late.",
  },
  {
    number: "03",
    eyebrow: "People & focus",
    title: "The team problems founders wait too long to fix",
    description: "Misaligned partners, wrong-stage hires, bad advice, unclear expectations, and “Popeye Syndrome” — trying to carry the whole company yourself.",
  },
  {
    number: "04",
    eyebrow: "Sales & marketing",
    title: "The growth moves that look good but hurt the business",
    description: "Distribution without velocity, giving away control of sales, launching too many products, and promoting your way into broken margins.",
  },
];

const bonuses = [
  {
    label: "BONUS 01",
    title: "The CPG Fatal Flaw Assessment",
    description: "A practical 30-question scorecard to surface the risks already hiding in your business — across legal, financial, operational, and strategic categories.",
  },
  {
    label: "BONUS 02",
    title: "The Fatal Flaws White Paper",
    description: "Jeff&rsquo;s complete 18-flaw framework and key prevention moves, organized so you can review it with your team after the session.",
  },
  {
    label: "BONUS 03",
    title: "The Full Webinar Replay",
    description: "Can&rsquo;t attend every minute live? Register anyway. We&rsquo;ll send the complete training and Q&A replay to everyone who saves a seat.",
  },
];

const faqs = [
  ["Who is this webinar for?", "CPG founders and leadership teams from pre-launch through growth stage. It is especially useful if you are signing contracts, raising capital, expanding retail, building a team, or managing a tightening runway."],
  ["Is it really free?", "Yes. The 60-minute training, 30-minute live Q&A, assessment, field guide, and replay are all free when you register."],
  ["Where will it take place?", "Online. Your confirmation and reminders will include the link to join the live session."],
  ["What if I can&rsquo;t attend live?", "Register anyway. We&rsquo;ll email the replay to registrants after the webinar."],
  ["Can Jeff answer a question about my actual business?", "That is exactly what the final 30 minutes are for. Bring a real decision, problem, or risk. Jeff will answer as many founder questions as time allows."],
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
    tag: "CPG industry leader",
    quote: "Jeff shows that great companies aren’t built on shortcuts or luck — they’re built on timeless principles, disciplined execution, and relentless learning. This is required reading for anyone building a brand they want to endure.",
    name: "Mark Rampolla",
    title: "Founder of ZICO Coconut Water",
    image: "/images/testimonials/mark-rampolla.jpg",
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
    quote: "In CPG, the difference between the brands that endure and the brands that disappear comes down to discipline — about margin, about culture, about cash. Jeff has built it, lost it, and won it back.",
    name: "John Foraker",
    title: "Co-Founder & CEO, Once Upon a Farm; former CEO, Annie’s",
    image: "/images/testimonials/john-foraker.jpg",
  },
  {
    tag: "CPG industry leader",
    quote: "Jeff Church has done it all as an entrepreneur — driven hypergrowth and delivered stellar returns to investors. But he’s also managed disappointments and setbacks. Any entrepreneur at any stage can learn from his wisdom — I know I did!",
    name: "Seth Goldman",
    title: "Founder of Honest Tea",
    image: "/images/testimonials/seth-goldman.jpg",
  },
];

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function FatalFlawsWebinarPage() {
  const promoVideoUrl = process.env.NEXT_PUBLIC_FATAL_FLAWS_VIDEO_EMBED_URL;

  return (
    <>
      <div className="bg-accent px-4 py-2.5 text-center text-xs font-bold uppercase tracking-[0.16em] text-white sm:text-sm">
        Free live webinar · Wednesday, September 16, 2026
      </div>

      <section className="relative isolate overflow-hidden bg-foreground text-white">
        <div className="absolute inset-0 -z-10 opacity-30" aria-hidden="true" style={{ backgroundImage: "radial-gradient(circle at 16% 22%, #1b3a5f 0, transparent 40%), radial-gradient(circle at 82% 12%, #a56a16 0, transparent 28%)" }} />
        <div className="absolute inset-y-0 right-0 -z-10 hidden w-1/2 opacity-[0.07] lg:block" aria-hidden="true" style={{ backgroundImage: "linear-gradient(135deg, transparent 25%, #fff 25%, #fff 26%, transparent 26%, transparent 50%, #fff 50%, #fff 51%, transparent 51%, transparent 75%, #fff 75%, #fff 76%, transparent 76%)", backgroundSize: "32px 32px" }} />

        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:px-8">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-gold">
              60 minutes of training · 30 minutes of live Q&A
            </div>
            <h1 className="max-w-3xl text-4xl font-bold leading-[1.03] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
              The 18 Fatal Flaws That <span className="text-gold">Kill CPG Brands</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/72 sm:text-xl">
              The most dangerous mistakes in CPG rarely look dangerous at first. Join Jeff Church to find the legal, financial, operational, people, sales, and marketing risks hiding in your business — before they cost you the company.
            </p>

            <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-lg border border-white/12 bg-white/[0.06] px-4 py-3">
                <span className="text-gold"><CalendarIcon /></span>
                <div><p className="text-xs uppercase tracking-wider text-white/50">Date</p><p className="text-sm font-bold">Wednesday, September 16</p></div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-white/12 bg-white/[0.06] px-4 py-3">
                <span className="text-gold"><ClockIcon /></span>
                <div><p className="text-xs uppercase tracking-wider text-white/50">Time</p><p className="text-sm font-bold">9:00–10:30 AM PT</p></div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a href="#register" className="inline-flex items-center justify-center rounded-lg bg-accent px-7 py-4 text-base font-bold text-white shadow-xl shadow-black/20 transition hover:bg-accent-dark">
                Save My Free Seat <span className="ml-2" aria-hidden="true">&rarr;</span>
              </a>
              <p className="text-sm text-white/55">Free registration · Replay included</p>
            </div>
          </div>

          <div className="mx-auto w-full max-w-xl">
            <div className="relative">
              <div className="absolute -inset-3 rotate-2 rounded-3xl border border-gold/25" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-ridge shadow-2xl">
              {promoVideoUrl ? (
                <div className="aspect-video">
                  <iframe src={promoVideoUrl} title="A message from Jeff Church about the CPG Fatal Flaws webinar" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="h-full w-full" />
                </div>
              ) : (
                <div className="relative aspect-[5/4]">
                  <Image src="/images/jeff-teaching.webp" alt="Jeff Church teaching at a whiteboard" fill priority className="object-cover" sizes="(min-width: 1024px) 42vw, 90vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold">Live with Jeff Church</p>
                    <p className="mt-1 text-lg font-semibold">8x founder · Co-founder of Suja Juice</p>
                  </div>
                </div>
              )}
              </div>
            </div>
            <div className="mt-5 flex items-center gap-4 rounded-xl border border-white/12 bg-white/[0.07] px-5 py-4">
              <p className="shrink-0 text-3xl font-bold text-gold">35+ years</p>
              <div className="h-8 w-px bg-white/15" aria-hidden="true" />
              <p className="text-xs font-semibold uppercase leading-relaxed tracking-wider text-white/60">of lessons earned the hard way</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white py-7">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Image src="/images/as-seen-in-banner.png" alt="Jeff Church recognition and media features" width={900} height={100} className="h-auto w-full opacity-80" />
        </div>
      </section>

      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">The blind spots are predictable</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Most fatal flaws are avoidable.<br />But only if you see them coming.</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">Jeff has watched promising brands get derailed by the same preventable decisions for decades. In one focused hour, he&rsquo;ll show you where to look and what to do next.</p>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
            {riskAreas.map((area) => (
              <article key={area.number} className="group bg-white p-7 transition hover:bg-card-flagship sm:p-9">
                <div className="flex items-start gap-5">
                  <span className="font-mono text-sm font-bold text-accent">{area.number}</span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">{area.eyebrow}</p>
                    <h3 className="mt-2 text-xl font-bold leading-snug">{area.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{area.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a href="#register" className="inline-flex items-center font-bold text-accent underline decoration-accent/30 underline-offset-8 transition hover:text-accent-dark">Show me what I&rsquo;m missing <span className="ml-2">&rarr;</span></a>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:px-8">
          <div className="relative min-h-[440px] overflow-hidden rounded-2xl">
            <Image src="/images/jeff-suja.webp" alt="Jeff Church at the Suja Juice production line" fill className="object-cover" sizes="(min-width: 1024px) 40vw, 92vw" />
            <div className="absolute inset-x-5 bottom-5 rounded-xl bg-foreground/92 p-5 text-white backdrop-blur">
              <p className="font-serif text-xl italic leading-snug">&ldquo;Most fatal flaws and mistakes are avoidable with awareness.&rdquo;</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-wider text-gold">Jeff Church</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">What you&rsquo;ll leave with</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">A sharper eye for risk — and a plan to fix what matters first.</h2>
            <div className="mt-8 space-y-6">
              {[
                ["Know your exposure", "Identify which of the 18 flaws are already present — or likely to show up in your next stage of growth."],
                ["Prioritize the real threats", "Separate an annoying problem from a company-killing one, so your limited time and cash go to the right place."],
                ["Make stronger decisions", "Use Jeff&rsquo;s practical prevention rules when evaluating contracts, inventory, hires, retailers, promotions, and capital."],
                ["Get unstuck live", "Bring your actual business question to the final 30-minute Q&A and hear how an experienced operator thinks it through."],
              ].map(([title, description]) => (
                <div key={title} className="flex gap-4">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-light text-accent">
                    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true"><path d="m4 10 4 4 8-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <div><h3 className="font-bold">{title}</h3><p className="mt-1 text-sm leading-relaxed text-muted" dangerouslySetInnerHTML={{ __html: description }} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-foreground py-16 text-white md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Free gifts for registrants</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">The training is free. So are the tools that help you use it.</h2>
            <p className="mt-4 text-lg text-white/65">Save your seat and Jeff will send you everything you need to audit your brand after the live session.</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {bonuses.map((bonus) => (
              <article key={bonus.label} className="rounded-2xl border border-white/12 bg-white/[0.055] p-7">
                <p className="text-xs font-bold tracking-[0.16em] text-gold">{bonus.label}</p>
                <h3 className="mt-5 text-xl font-bold">{bonus.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/62" dangerouslySetInnerHTML={{ __html: bonus.description }} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-background py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Trusted by people who have built it</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">What leading founders say about Jeff.</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">Entrepreneurs and CPG leaders on the judgment, discipline, and hard-earned experience Jeff brings to founders.</p>
          </div>
          <div className="mt-4">
            <TestimonialCarousel testimonials={testimonials} />
          </div>
        </div>
      </section>

      <section className="bg-card-flagship py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Your host</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Jeff Church has made the mistakes, survived them, and built the playbook.</h2>
              <p className="mt-5 leading-relaxed text-muted">Jeff has spent more than 35 years founding, leading, scaling, and advising CPG companies. He co-founded Suja Juice, helped scale it past $100M, and has been involved in more than 40 fundraising rounds.</p>
              <p className="mt-4 leading-relaxed text-muted">This isn&rsquo;t theory from the sidelines. It&rsquo;s the pattern recognition that comes from building eight companies, navigating hard turns, and seeing which small decisions create very expensive problems.</p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
              {[["8x", "CPG founder"], ["$300M", "capital raised"], ["5", "successful exits"], ["Harvard", "MBA · CPA"]].map(([number, label]) => (
                <div key={label} className="rounded-xl border border-accent/20 bg-white p-6 shadow-sm"><p className="text-3xl font-bold text-accent">{number}</p><p className="mt-1 text-sm font-semibold text-muted">{label}</p></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="register" className="scroll-mt-24 bg-white py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[.85fr_1.15fr] lg:items-start lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Reserve your seat</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Catch the flaw before it becomes the failure.</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">Join Jeff live for 90 practical minutes built around the decisions CPG founders are making right now.</p>
            <div className="mt-8 space-y-4 border-l-2 border-accent/30 pl-5">
              <div><p className="text-xs font-bold uppercase tracking-wider text-muted">When</p><p className="mt-1 font-bold">Wednesday, September 16, 2026</p></div>
              <div><p className="text-xs font-bold uppercase tracking-wider text-muted">Time</p><p className="mt-1 font-bold">9:00–10:30 AM Pacific</p></div>
              <div><p className="text-xs font-bold uppercase tracking-wider text-muted">Format</p><p className="mt-1 font-bold">Live online · Replay included</p></div>
              <div><p className="text-xs font-bold uppercase tracking-wider text-muted">Price</p><p className="mt-1 font-bold text-accent">Free</p></div>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-background p-6 shadow-xl shadow-foreground/[0.06] sm:p-8">
            <h3 className="text-2xl font-bold">Save your free seat</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">Register now and we&rsquo;ll send your access details, bonuses, and the full replay.</p>
            <div className="mt-6"><RegistrationForm /></div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-background py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold tracking-tight">Questions, answered.</h2>
          <div className="mt-10 divide-y divide-border border-y border-border">
            {faqs.map(([question, answer]) => (
              <details key={question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold">
                  <span dangerouslySetInnerHTML={{ __html: question }} />
                  <span className="text-xl font-normal text-accent transition group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 pr-10 text-sm leading-relaxed text-muted" dangerouslySetInnerHTML={{ __html: answer }} />
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
