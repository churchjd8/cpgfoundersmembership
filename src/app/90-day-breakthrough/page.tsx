import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FAQAccordion } from "./faq-accordion";
import { StickyCTA } from "./sticky-cta";

export const metadata: Metadata = {
  title: "The 90-Day Breakthrough with Jeff Church - Dream Makers HQ",
  description:
    "90 days of direct work with Jeff Church, 8x CPG founder, to break through what's blocking your next stage. For founders serious about leveling up.",
};

const testimonials = [
  {
    quote:
      "Working with Jeff has been a game-changing crash course for my business. It really is an MBA in CPG. The bootcamp videos were full of relevant and detailed lessons and the dialogue during the in-person calls has been invaluable. Jeff and his team are a wealth of knowledge when it comes to finance, fundraising, brand strategy, and more.",
    name: "Simon Solis-Cohen",
    title: "Founder",
    brand: "Huxley",
  },
  {
    quote:
      "Being part of this program has been an absolute game-changer for my CPG brand. The depth of insight into launching and scaling a brand is unparalleled, offering practical, MBA-level education that has far exceeded my expectations in terms of ROI. Jeff's thoughtful leadership, unwavering integrity, and genuine passion for helping others succeed make him not only a brilliant mentor but also an exceptional person, whose guidance has saved me invaluable time and money.",
    name: "Carolyn Hamlet",
    title: "Founder",
    brand: "Oku Conscious Energy Gummy Snacks",
  },
  {
    quote:
      "Jeff has amazing CPG knowledge, business experience and life lessons. 5-star review from us. Jeff led us all the way through a successful $1.5M Angel fundraising.",
    name: "Tiffany Tatom",
    title: "CEO",
    brand: "Live Pure",
  },
  {
    quote:
      "Jeff is a rare individual in that he has deep knowledge of all departments and functional areas - whether it be financial model building, sales, marketing, cost accounting, operations - he can add deep value in any of these areas. Jeff was the primary reason that we got JUNI into Moscoe and helped us secure Presence Marketing as our Natural Foods broker. Jeff is extremely well connected in the CPG world.",
    name: "Kim Perell",
    title: "Co-Founder & CEO",
    brand: "JUNI",
  },
  {
    quote:
      "The program that Jeff and his partners put together was a huge help for TIZZ. My partner Todd and I are both entertainment professionals, with zero beverage or CPG experience, but going through the program was the perfect way to learn many aspects of the business and set us up for success going forward.",
    name: "Abe Schwartz & Todd Strauss",
    title: "Co-Founders",
    brand: "TIZZ",
  },
  {
    quote:
      "Working with Jeff was an incredible momentum shift for my business in 2024. From exposure to the most connected CPG community, to the level of detail that Jeff had in each session. He tailored everything to be intentional with each brand. We loved being involved in the network that spiraled from it as well!",
    name: "Hannah Minardi",
    title: "Co-Founder",
    brand: "Standard Self Care",
  },
];

const highlights = [
  "Co-founded Suja Juice and scaled it to $100M+ in revenue in just over 5 years",
  "Led 5 successful exits totaling over $700M in value",
  "Raised $275M+ across 40+ funding rounds, with a median angel investor return of 10x",
  "Named BevNET's Person of the Year (2015) and E&Y Entrepreneur of the Year",
  "Co-authored a New York Times bestseller (The Suja Juice Solution)",
  "Harvard Business School MBA and CPA",
  "Advised founders at Health-Ade, Once Upon a Farm, Juni, Live Pure, Cheeky Cocktails, and dozens more",
];

const pricingIncludes = [
  "Onboarding diagnostic with Jeff",
  "1:1 support phone calls with Jeff (as needed)",
  "3x/mo group sessions with Jeff",
  "Weekly accountability calls (optional)",
  "Email access to Jeff",
  "MBA for CPG (lifetime access)",
  "Babu Pro (included)",
  "Full template library",
  "Private community",
  "Pitch Slams (priority registration)",
];

const membershipIncludes = [
  "Continued access to everything above",
  "3x/mo group sessions",
  "Weekly accountability calls",
  "Email access to Jeff",
  "MBA for CPG, Babu, templates",
  "Community and events",
  "Stay plugged in as long as it's valuable",
];

const applyHref = "/contact";
const emailHref =
  "mailto:info@teamchurch.co?subject=Questions about the 90-Day Breakthrough";

export default function NinetyDayBreakthroughPage() {
  return (
    <>
      <StickyCTA href={applyHref} />

      {/* ========== 1. HERO ========== */}
      <section className="relative bg-foreground text-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full mb-6">
                The 90-Day Breakthrough with Jeff Church
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                Whatever&rsquo;s between you and your next stage, we&rsquo;ll help you break
                through.
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-white/70 max-w-2xl leading-relaxed">
                90 days of direct work with Jeff Church - 8x CPG founder, co-founder of Suja Juice -
                to diagnose the bottleneck that&rsquo;s actually blocking your next stage and break
                through it.
              </p>
              <p className="mt-4 text-base text-white/50">
                $2,000/mo for 3 months or $5,000 paid in full (save $1,000). Then $1,500/mo,
                month-to-month.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href={applyHref}
                  className="inline-flex items-center justify-center px-6 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors text-base"
                >
                  Apply to join &rarr;
                </Link>
                <a
                  href={emailHref}
                  className="inline-flex items-center justify-center px-6 py-3 border border-white/30 hover:border-white/60 text-white font-semibold rounded-lg transition-colors text-base"
                >
                  Email us with questions
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/images/jeff-teaching.webp"
                  alt="Jeff Church strategizing at the whiteboard"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 2. THE PROBLEM ========== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
            The Reality
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            You&rsquo;ve done the hard part. Now comes the harder part.
          </h2>
          <div className="mt-6 space-y-4 text-lg text-muted leading-relaxed">
            <p>
              Whether you&rsquo;re launching your CPG brand or you&rsquo;ve been grinding for the
              past year or more, you&rsquo;re all in. Real skin in the game. You should feel proud.
              Most people never get this far.
            </p>
            <p>But now you&rsquo;re in the thick of it.</p>
            <p>
              Fundraising. Retail expansion. DTC growth. Marketing. Operations. Supply chain.
              Margins. A million decisions, limited cash to make them with, and every wrong move
              costs you. A bad distribution deal, a pricing mistake, a fumbled investor pitch can
              cost you months of runway, or worse.
            </p>
            <p>
              CPG is one of the hardest industries to survive in, let alone win. It&rsquo;s easy to
              feel overwhelmed, isolated, and like you&rsquo;re reinventing the wheel while everyone
              else seems to have it figured out.
            </p>
            <p className="font-semibold text-foreground">
              You can keep learning the hard way on your own dime. Or you can work directly with
              someone who&rsquo;s already been through it, identify what&rsquo;s actually blocking
              your next stage, and break through it in 90 days.
            </p>
          </div>
        </div>
      </section>

      {/* ========== 3. THE BREAKTHROUGH ========== */}
      <section id="breakthrough" className="py-16 md:py-24 bg-background scroll-mt-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
            The Breakthrough
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Every CPG founder has one thing between them and their next stage.
          </h2>
          <p className="mt-6 text-lg text-muted leading-relaxed">
            For some it&rsquo;s raising the next round. For some it&rsquo;s landing retail. For some
            it&rsquo;s margins, cash, supply chain, team, or category. Whatever yours is, Jeff has
            seen it from the inside. He&rsquo;s built and sold multi-category CPG brands and spent
            35 years in the category.
          </p>
          <p className="mt-4 text-lg text-muted leading-relaxed">
            In 90 days of working together, we diagnose what&rsquo;s actually in your way and break
            through it.
          </p>
          <div className="mt-8 p-6 bg-card-flagship border border-accent/30 rounded-xl">
            <p className="text-lg font-semibold text-foreground leading-relaxed">
              90 days of direct access to Jeff. A diagnostic to find the real bottleneck. A plan to
              break through it. And everything you need to execute.
            </p>
          </div>
        </div>
      </section>

      {/* ========== 4. HOW IT WORKS ========== */}
      <section id="how-it-works" className="py-16 md:py-24 bg-white scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto mb-12">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              90 days, structured for breakthrough.
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Day 0 */}
            <div className="bg-card rounded-xl border border-border p-6 sm:p-8">
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-foreground text-white rounded-full mb-4">
                Day 0
              </span>
              <h3 className="text-xl font-bold">Onboarding Diagnostic</h3>
              <p className="mt-4 text-muted leading-relaxed">
                A 1:1 session where Jeff asks the right questions, looks at the business, and
                identifies the real bottleneck. You walk out with a clear picture of what&rsquo;s
                actually blocking your next stage, and how the 90 days will attack it.
              </p>
            </div>

            {/* Days 1-90 */}
            <div className="bg-card-flagship rounded-xl border border-accent/30 ring-2 ring-accent/20 p-6 sm:p-8">
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full mb-4">
                Days 1-90
              </span>
              <h3 className="text-xl font-bold">Direct Work with Jeff</h3>
              <p className="mt-4 text-muted leading-relaxed mb-4">
                Three months of hands-on work to break through. You get:
              </p>
              <ul className="space-y-2 text-sm text-muted">
                <li className="flex gap-2">
                  <span className="text-accent font-bold">&#10003;</span>
                  3x/mo group sessions with Jeff and the cohort
                </li>
                <li className="flex gap-2">
                  <span className="text-accent font-bold">&#10003;</span>
                  Weekly accountability call (optional)
                </li>
                <li className="flex gap-2">
                  <span className="text-accent font-bold">&#10003;</span>
                  Email access to Jeff for ongoing questions
                </li>
                <li className="flex gap-2">
                  <span className="text-accent font-bold">&#10003;</span>
                  The MBA for CPG (lifetime access)
                </li>
                <li className="flex gap-2">
                  <span className="text-accent font-bold">&#10003;</span>
                  Babu (included)
                </li>
                <li className="flex gap-2">
                  <span className="text-accent font-bold">&#10003;</span>
                  Full template library
                </li>
                <li className="flex gap-2">
                  <span className="text-accent font-bold">&#10003;</span>
                  1:1 individual support from Jeff as needed
                </li>
              </ul>
            </div>

            {/* Day 91+ */}
            <div className="bg-card rounded-xl border border-border p-6 sm:p-8">
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-foreground text-white rounded-full mb-4">
                Day 91+
              </span>
              <h3 className="text-xl font-bold">Membership Continues</h3>
              <p className="mt-4 text-muted leading-relaxed">
                Continue month-to-month at $1,500/mo for ongoing support, group sessions, email
                access, and everything above. No pressure to stay, no pressure to leave.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 5. WHAT'S INCLUDED ========== */}
      <section id="whats-included" className="py-16 md:py-24 bg-background scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto mb-12">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
              What You Get
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Everything you need to break through.
            </h2>
            <p className="mt-4 text-lg text-muted">
              Four pillars of support, built to help you move faster, smarter, and with less
              guesswork.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Pillar 1 */}
            <div className="bg-card rounded-xl border border-border p-6 sm:p-8">
              <h3 className="text-xl font-bold mb-1">Expert Access & Guidance</h3>
              <p className="text-sm text-muted italic mb-4">
                Direct work with someone who&rsquo;s built and sold CPG brands.
              </p>
              <ul className="space-y-3 text-sm text-muted">
                <li>
                  🎯{" "}
                  <span className="font-semibold text-foreground">
                    Onboarding diagnostic with Jeff.
                  </span>{" "}
                  A private 1:1 session at kickoff to identify your bottleneck and map the 90 days.
                </li>
                <li>
                  📞{" "}
                  <span className="font-semibold text-foreground">
                    3x/mo group sessions with Jeff
                  </span>{" "}
                  (90 minutes each). Part education, part live Q&A. Real answers to real problems.
                </li>
                <li>
                  ✉️{" "}
                  <span className="font-semibold text-foreground">1:1 support as needed.</span> Some
                  things can&rsquo;t wait. You have direct email access to Jeff for time-sensitive
                  decisions.
                </li>
                <li>
                  🎤{" "}
                  <span className="font-semibold text-foreground">Monthly guest speakers.</span>{" "}
                  Past and upcoming guests include founders from Poppi, Honest Tea, ZICO, Once Upon a
                  Farm, and more.
                </li>
              </ul>
            </div>

            {/* Pillar 2 */}
            <div className="bg-card rounded-xl border border-border p-6 sm:p-8">
              <h3 className="text-xl font-bold mb-1">Community & Accountability</h3>
              <p className="text-sm text-muted italic mb-4">
                Founders who get it, and have your back.
              </p>
              <ul className="space-y-3 text-sm text-muted">
                <li>
                  💬{" "}
                  <span className="font-semibold text-foreground">
                    Private members community (WhatsApp).
                  </span>{" "}
                  Connect with other CPG founders. Share wins, ask questions, build relationships
                  that last.
                </li>
                <li>
                  ⏰{" "}
                  <span className="font-semibold text-foreground">
                    Weekly accountability calls (optional).
                  </span>{" "}
                  Monday mornings. Quick call to set your #1 priority for the week.
                </li>
                <li>
                  🤝{" "}
                  <span className="font-semibold text-foreground">
                    In-person meetups at industry events.
                  </span>{" "}
                  Happy hours and community events at Expo West, BevNET, and other major trade shows.
                </li>
                <li>
                  🔗{" "}
                  <span className="font-semibold text-foreground">Founder-to-founder support.</span>{" "}
                  You&rsquo;re connected to founders who understand the grind and are actively
                  helping each other.
                </li>
              </ul>
            </div>

            {/* Pillar 3 */}
            <div className="bg-card rounded-xl border border-border p-6 sm:p-8">
              <h3 className="text-xl font-bold mb-1">Proven Tools & Resources</h3>
              <p className="text-sm text-muted italic mb-4">
                Battle-tested resources so you skip the expensive mistakes.
              </p>
              <ul className="space-y-3 text-sm text-muted">
                <li>
                  🎓{" "}
                  <span className="font-semibold text-foreground">The MBA for CPG.</span> 15+ hours
                  of content, 450+ narrated slides, and dozens of downloadable financial models,
                  templates, and tools. Lifetime access.
                </li>
                <li>
                  🤖{" "}
                  <span className="font-semibold text-foreground">Babu Pro subscription.</span>{" "}
                  Purpose-built AI advisor trained on 20+ years of CPG knowledge and 4,000+ expert
                  resources.
                </li>
                <li>
                  📋{" "}
                  <span className="font-semibold text-foreground">Full template library.</span>{" "}
                  Financial model, fundraising deck, retail pitch, ops playbook, and more.
                </li>
                <li>
                  📇{" "}
                  <span className="font-semibold text-foreground">
                    Curated directory of vetted service providers.
                  </span>{" "}
                  Co-packers, brokers, agencies, designers the community trusts.
                </li>
              </ul>
            </div>

            {/* Pillar 4 */}
            <div className="bg-card rounded-xl border border-border p-6 sm:p-8">
              <h3 className="text-xl font-bold mb-1">Experiential & Networking</h3>
              <p className="text-sm text-muted italic mb-4">
                Practice your pitches and get in front of the right people.
              </p>
              <ul className="space-y-3 text-sm text-muted">
                <li>
                  🏪{" "}
                  <span className="font-semibold text-foreground">
                    Retailer Pitch Slams (2x/year).
                  </span>{" "}
                  Practice your retail pitch with real feedback from former category buyers at Whole
                  Foods, Walmart, and Ahold.
                </li>
                <li>
                  💰{" "}
                  <span className="font-semibold text-foreground">
                    Investor Pitch Slams (2x/year).
                  </span>{" "}
                  Pitch real investors. Top brands compete for a $10K investment prize.
                </li>
                <li>
                  🌐{" "}
                  <span className="font-semibold text-foreground">
                    One intro away from most CPG needs.
                  </span>{" "}
                  Jeff has spent 35+ years building relationships with buyers, investors, brokers,
                  and operators.
                </li>
                <li>
                  🧭{" "}
                  <span className="font-semibold text-foreground">
                    Mentorship from CPG coaches, funds, buyers, and advisors.
                  </span>{" "}
                  A network who&rsquo;ve sat on the other side of the table.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 6. WHO IT'S FOR ========== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
            Who This Is For
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">This is for you if...</h2>

          <ul className="mt-8 space-y-3">
            {[
              "You're committed. Whether you're just launching or scaling toward $10M, you're all in on building this brand.",
              "You've got skin in the game. You've already invested real time, money, or both.",
              "You've been grinding for the past year or more and you're ready for guidance so you stop learning every lesson the hard way.",
              "You're overwhelmed by all the things you need to figure out - fundraising, retail, DTC, ops, marketing - and you're not sure which one will sink you first.",
              "You want to fundraise and get your business to a point where it's investor-ready.",
              "You're tired of piecing together advice from Google, podcasts, and random LinkedIn posts, and you're ready for a real playbook.",
              "You're done trying to figure it all out alone.",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-muted">
                <span className="text-green-600 font-bold text-lg leading-6">&#10003;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h3 className="mt-10 text-xl font-bold">This probably isn&rsquo;t for you if...</h3>

          <ul className="mt-4 space-y-3">
            {[
              "You're just exploring the idea of starting a CPG business with no real commitment yet.",
              "You're looking for a magic bullet or someone to do the work for you.",
              "You're not willing to show up, ask questions, and put in the reps.",
              "You just want content. This is about direct access, community, and accountability, not just another library of videos.",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-muted">
                <span className="text-red-500 font-bold text-lg leading-6">&#10007;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-sm text-muted italic bg-background p-4 rounded-lg border border-border">
            Pre-revenue with prior operating experience or a strong background? You may be a great
            fit. We&rsquo;ve worked with pre-revenue founders who are all-in and bring the right
            foundation. If you&rsquo;re unsure, reach out.
          </p>
        </div>
      </section>

      {/* ========== 7. TESTIMONIALS ========== */}
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto mb-12">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
              What Founders Are Saying
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Founders who&rsquo;ve worked with Jeff.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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

      {/* ========== 8. MEET JEFF ========== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
                About Jeff Church
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Meet your guide.</h2>
              <p className="mt-6 text-lg text-muted leading-relaxed">
                Jeff Church isn&rsquo;t a consultant who read about CPG in a book. He&rsquo;s an
                8-time founder who&rsquo;s been in the trenches - building, scaling, raising, and
                exiting.
              </p>
              <ul className="mt-6 space-y-2">
                {highlights.map((h) => (
                  <li key={h} className="flex gap-2 text-sm text-muted">
                    <span className="text-accent font-bold">&#10003;</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-muted leading-relaxed">
                Jeff built Dream Makers because he kept seeing the same pattern: talented founders
                making avoidable mistakes because they didn&rsquo;t have the right guidance at the
                right time. The 90-Day Breakthrough is his playbook, the same strategies and
                frameworks he&rsquo;s used to build and advise brands that actually win.
              </p>
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
                src="/images/jeff-suja.webp"
                alt="Jeff Church at the Suja Juice production line"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========== 9. PRICING ========== */}
      <section id="pricing" className="py-16 md:py-24 bg-background scroll-mt-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
              Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Simple, transparent pricing.
            </h2>
          </div>

          {/* Single pricing card */}
          <div className="bg-card-flagship rounded-xl border border-accent/30 ring-2 ring-accent/20 p-6 sm:p-8 md:p-10">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full mb-6">
              The 90-Day Breakthrough
            </span>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg border border-border p-5">
                <p className="text-sm font-semibold text-muted uppercase tracking-wide mb-2">
                  Pay monthly
                </p>
                <p className="text-3xl font-bold">
                  $2,000<span className="text-base font-normal text-muted">/mo</span>
                </p>
                <p className="text-sm text-muted mt-1">for 3 months ($6,000 total)</p>
              </div>
              <div className="bg-white rounded-lg border border-accent/30 p-5 relative">
                <span className="absolute -top-2.5 right-4 px-2 py-0.5 text-xs font-bold bg-green-600 text-white rounded-full">
                  Save $1,000
                </span>
                <p className="text-sm font-semibold text-muted uppercase tracking-wide mb-2">
                  Pay in full
                </p>
                <p className="text-3xl font-bold">$5,000</p>
                <p className="text-sm text-muted mt-1">one-time payment</p>
              </div>
            </div>

            <ul className="space-y-2 mb-8">
              {pricingIncludes.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-muted">
                  <span className="text-accent font-bold">&#10003;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href={applyHref}
              className="block w-full text-center px-6 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors text-lg"
            >
              Apply to join &rarr;
            </Link>
          </div>

          {/* After 90 days */}
          <div className="mt-8 bg-card rounded-xl border border-border p-6 sm:p-8">
            <h3 className="text-lg font-bold mb-2">After your 90 days</h3>
            <p className="text-muted leading-relaxed">
              Continue with group support, email access to Jeff, and all the resources for{" "}
              <span className="font-semibold text-foreground">$1,500/mo</span> - month-to-month,
              cancel anytime with 30 days notice. No annual contracts. Stay as long as it&rsquo;s
              valuable.
            </p>
          </div>

          <p className="mt-6 text-center text-sm text-muted">
            No waiting for the next cohort. Start when you&rsquo;re ready.
          </p>
        </div>
      </section>

      {/* ========== 10. FAQ ========== */}
      <section id="faq" className="py-16 md:py-24 bg-white scroll-mt-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8">
            Questions? We&rsquo;ve got answers.
          </h2>
          <FAQAccordion />
        </div>
      </section>

      {/* ========== 11. FINAL CTA ========== */}
      <section className="py-16 md:py-24 bg-foreground text-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Ready to stop going it alone?
          </h2>
          <p className="mt-6 text-lg text-white/70 leading-relaxed">
            You&rsquo;ve built something worth fighting for. Let&rsquo;s make sure it wins. The
            90-Day Breakthrough gives you direct access to Jeff, the playbook, the community, and
            the support to break through to your next stage.
          </p>
          <div className="mt-8">
            <Link
              href={applyHref}
              className="inline-flex items-center justify-center px-8 py-4 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors text-lg"
            >
              Apply to join &rarr;
            </Link>
          </div>
          <p className="mt-4 text-sm text-white/50">
            Questions?{" "}
            <a href={emailHref} className="underline hover:text-white transition-colors">
              Email us
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
