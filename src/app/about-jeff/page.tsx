import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Jeff Church - CPG Founders Group",
  description:
    "8x CPG founder, co-founder of Suja Juice, 5 exits totaling $700M+, Harvard MBA. Jeff Church's full story.",
};

const credibility = [
  { stat: "8x", label: "CEO & Founder" },
  { stat: "$700M+", label: "Investor Returns" },
  { stat: "3.1x", label: "Median Return" },
  { stat: "40+", label: "Funding Rounds" },
  { stat: "$100M", label: "Suja Revenue in 5 Years" },
  { stat: "35", label: "Years in CPG" },
];

const companies = [
  "Suja Juice",
  "Rowdy Beverage",
  "Lynx Professional Grills",
  "Aztec Concrete Accessories",
  "ERICO International",
];

const accolades = [
  { src: "/images/award-bevnet.png", alt: "BevNET Person of the Year - Jeff Church" },
  { src: "/images/award-forbes.png", alt: "Forbes #2 Most Promising Companies - Suja" },
  { src: "/images/award-inc500.png", alt: "Inc. 500 #13 Fastest Growing Company" },
  { src: "/images/award-whole-foods.png", alt: "Whole Foods Supplier of the Year 2013" },
  { src: "/images/book-suja-solution.png", alt: "The Suja Juice Solution - NYT Bestseller" },
  { src: "/images/award-prevention.png", alt: "Prevention 100 Cleanest Packaged Food Awards" },
];

const competencies = [
  {
    title: "Entrepreneurial Track Record",
    items: [
      "Scaled Suja Juice from $600K to $100M in revenue in just over 5 years, sold for $300M",
      "3.1x median investor return across eight transactions (5 of 8 winners)",
      "Deep CPG expertise: branding, manufacturing, FDA/USDA Organic compliance",
      "Named BevNET Beverage Entrepreneur of the Year (2015)",
      "E&Y Entrepreneur of the Year finalist",
    ],
  },
  {
    title: "Executive Leadership",
    items: [
      "Strong team builder with a track record of developing high-performing teams",
      "Experience across large CPG (Coca-Cola) and high-growth startups",
      "Charismatic, humble leadership style built on 30+ years of integrity",
      "High-risk tolerance with calm decision-making under extreme pressure",
      "Cross-functional problem solver across sales, marketing, ops, and finance",
    ],
  },
  {
    title: "Financial Expertise",
    items: [
      "CPA (Ernst & Young, 4 years) and Harvard Business School MBA",
      "Led 40+ funding rounds raising $275M+, with a median angel investor return of 10x",
      "Deep working capital and balance sheet management experience",
      "Expert in budgeting, forecasting, risk management, and cost accounting",
      "Co-authored the New York Times bestseller The Suja Juice Solution",
    ],
  },
  {
    title: "Network & Advising",
    items: [
      "Advised founders at Health-Ade, Once Upon a Farm, Juni, Live Pure, Cheeky Cocktails, and dozens more",
      "Deeply connected across CPG: buyers, investors, brokers, operators, and service providers",
      "Guest speakers in his programs include founders from Poppi, Honest Tea, ZICO, and more",
      "One intro away from most CPG needs after 35+ years in the industry",
    ],
  },
];

export default function AboutJeffPage() {
  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative bg-foreground text-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full mb-6">
                About Jeff Church
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                I&rsquo;m passionate about helping you grow and make an impact.
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-white/70 max-w-2xl leading-relaxed">
                8x founder. Harvard MBA. CPA. Co-founder of Suja Juice. 35 years in CPG building,
                scaling, raising, and exiting brands that actually win.
              </p>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <Image
                  src="/images/jeff-suja.webp"
                  alt="Jeff Church at the Suja Juice production line"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CREDIBILITY BAR ========== */}
      <section className="py-10 bg-white border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {credibility.map((item) => (
              <div key={item.label} className="p-4">
                <p className="text-2xl sm:text-3xl font-bold text-accent">{item.stat}</p>
                <p className="mt-1 text-sm text-muted">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== MY STORY ========== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
                My Story
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                From CPA to 8x founder.
              </h2>
              <div className="mt-6 space-y-4 text-lg text-muted leading-relaxed">
                <p>
                  Jeff started his career as a CPA at Ernst & Young, spent four years in audit and
                  advisory, then earned his MBA from Harvard Business School. At 38, with four young
                  children, he made the leap into entrepreneurship.
                </p>
                <p>
                  Over the next three decades, Jeff served as CEO for eight companies, generating
                  nearly $700 million in investor returns. His biggest chapter: co-founding Suja
                  Juice and scaling it from $600K in year one to $100M in revenue by year five. Suja
                  sold for $300 million and today generates roughly $300M in annual revenue.
                </p>
                <p>
                  Along the way, Jeff learned what most founders learn the hard way: that the
                  difference between brands that make it and brands that don&rsquo;t almost always
                  comes down to having the right guidance at the right time. That&rsquo;s why he
                  built the CPG Founders Group - to give founders the playbook, the network, and the
                  direct support he wishes he&rsquo;d had.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/jeff-suja-interview.png"
                alt="Jeff Church speaking about Suja Juice"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========== ACCOLADES ========== */}
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
              Recognition
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Accolades.
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {accolades.map((a) => (
              <div
                key={a.alt}
                className="bg-white rounded-xl border border-border p-4 flex items-center justify-center"
              >
                <div className="relative w-full aspect-square">
                  <Image
                    src={a.src}
                    alt={a.alt}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PRIOR COMPANIES ========== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
                Track Record
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Companies Jeff has built as CEO.
              </h2>
              <p className="mt-4 text-lg text-muted">
                Eight companies over three decades. Five successful exits. Nearly $700M in investor
                returns.
              </p>
              <ul className="mt-6 space-y-3">
                {companies.map((company) => (
                  <li key={company} className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-accent flex-shrink-0" />
                    <span className="text-lg font-semibold">{company}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/jeff-coca-cola.png"
                alt="Jeff Church at The Coca-Cola Company"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========== CORE COMPETENCIES ========== */}
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto mb-12">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
              What Jeff Brings
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Core competencies and intangibles.
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {competencies.map((comp) => (
              <div
                key={comp.title}
                className="bg-card rounded-xl border border-border p-6 sm:p-8"
              >
                <h3 className="text-xl font-bold mb-4">{comp.title}</h3>
                <ul className="space-y-2">
                  {comp.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-muted">
                      <span className="text-accent font-bold mt-0.5">&#10003;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== BEYOND THE BOARDROOM ========== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto mb-12">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
              Beyond the Boardroom
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              The person behind the operator.
            </h2>
          </div>

          {/* Family */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative aspect-[3/1] rounded-2xl overflow-hidden">
              <Image
                src="/images/jeff-family.png"
                alt="Jeff Church and family"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-3xl mb-3">👨‍👩‍👧‍👦</p>
              <h3 className="text-2xl font-bold mb-3">Family</h3>
              <p className="text-lg text-muted leading-relaxed">
                Married 35 years to Linda. Four children. Family has been the foundation through
                every chapter of the journey - from the early startup days to the biggest exits.
              </p>
            </div>
          </div>

          {/* Mountaineering & Adventure */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 lg:order-1">
              <p className="text-3xl mb-3">🏔️</p>
              <h3 className="text-2xl font-bold mb-3">Adventure</h3>
              <p className="text-lg text-muted leading-relaxed mb-4">
                Jeff brings the same relentless drive to the outdoors that he brings to business.
              </p>
              <ul className="space-y-2 text-muted">
                <li className="flex gap-2">
                  <span className="text-accent font-bold">&#10003;</span>
                  <span><span className="font-semibold text-foreground">5 of 7 Summits climbed</span> - Kilimanjaro, Elbrus, Vinson Massif, Kosciuszko, Aconcagua</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent font-bold">&#10003;</span>
                  <span><span className="font-semibold text-foreground">56 marathons</span> across 4 continents</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent font-bold">&#10003;</span>
                  <span><span className="font-semibold text-foreground">Ultramarathon winner</span> - San Diego One Day, 61 miles</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent font-bold">&#10003;</span>
                  <span>Skiing and outdoor pursuits in epic environments around the world</span>
                </li>
              </ul>
            </div>
            <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                <Image
                  src="/images/jeff-summit.png"
                  alt="Jeff Church climbing a mountain summit"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                <Image
                  src="/images/jeff-mountains-1.png"
                  alt="Jeff Church mountaineering"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Social Impact */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[2/1] rounded-2xl overflow-hidden">
              <Image
                src="/images/nika-water.png"
                alt="Nika Water - A Thirst for Change by Linda and Jeff Church"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-3xl mb-3">🌍</p>
              <h3 className="text-2xl font-bold mb-3">Social Impact</h3>
              <p className="text-lg text-muted leading-relaxed">
                Through Nika Water, Jeff and Linda helped bring clean water, education, and
                microfinance to 32,000+ people across Nicaragua, Kenya, Ethiopia, and Mexico.
                They co-authored <span className="italic">A Thirst for Change</span> on how social
                entrepreneurship can make the world a better place. Making an impact beyond business
                has always been core to who Jeff is.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="py-16 md:py-24 bg-foreground text-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Ready to work with Jeff?
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Whether you&rsquo;re looking for direct strategic support, self-paced education, or an
            AI advisor trained on 35 years of CPG experience, there&rsquo;s a way in.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#programs"
              className="px-6 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors"
            >
              See all programs
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
