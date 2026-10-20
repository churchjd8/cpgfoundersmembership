import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { KlarnaMessaging } from "@/components/klarna-messaging";
import { OfferCountdown } from "@/components/offer-countdown";
import {
  FOUNDER_GUARANTEE_DAYS,
  FOUNDER_OFFER_COOKIE,
  FOUNDER_PRICE_USD,
  readFounderOfferToken,
} from "@/lib/founder-offer";
import { MBA_PRICE_USD, STRIPE_PUBLISHABLE_KEY } from "@/lib/mba-offer";
import { CheckoutButton } from "./checkout-button";

export const metadata: Metadata = {
  title: "MBA for CPG - Founder Price",
  robots: { index: false, follow: false },
};

const modules = [
  ["01", "The Industry, Fiduciary & Fatal Flaws", "How the industry works, where your brand sits on the growth curve, and the mistakes that end companies."],
  ["02", "Fundraising & Your Investor Pitch", "Valuations, deal structure, dilution, and the investor deck and first meeting."],
  ["03", "Revenue, Expenses & Financial Modeling", "Trade spend, gross margin, your chart of accounts, and Jeff's 5-year financial model."],
  ["04", "Marketing", "Your story, your unique selling proposition, packaging tests and where to spend."],
  ["05", "Sales", "Brokers, door expansion, retailer presentations and winning at the shelf."],
  ["06", "Scaling Your Brand", "Proof of concept, repeat and velocity, and scaling without breaking the business."],
  ["07", "Operations & Cash Management", "Co-packers, inventory planning, supply chain, IP and making every dollar count."],
  ["08", "Team, Tools & Jeff's Playbook", "Hiring, culture, goals, and the plays Jeff has run across eight companies."],
];

const tools = [
  "5-year financial model",
  "Trade Spend Calculator",
  "Investor deck template",
  "Retailer deck template",
  "Inventory planning tools",
  "30 white papers",
  "Jeff's CPG Playbook",
  "450+ downloadable slides",
];

const bonuses = [
  {
    label: "Bonus 1",
    title: "The Fatal Flaws session",
    description: "Jeff's full 90-minute session on the 18 fatal flaws, plus the 30-question assessment to score your own business.",
  },
  {
    label: "Bonus 2",
    title: "The Pre-Launch Roadmap worksheet",
    description: "The 8 phases from the training, ready for your own dates and dollars.",
  },
  {
    label: "Bonus 3",
    title: "The Founders Club",
    description: "An invite to 400+ CPG founders on WhatsApp, trading answers every day.",
  },
];

const testimonials = [
  {
    quote: "My partner Todd and I are both entertainment professionals, with zero beverage or CPG experience, but going through the program was the perfect way to learn many aspects of the business and set us up for success going forward.",
    name: "Abe Schwartz & Todd Strauss",
    title: "Co-Founders, TIZZ",
  },
  {
    quote: "It really is an MBA in CPG. The bootcamp videos were full of relevant and detailed lessons... Jeff and his team are a wealth of knowledge when it comes to finance, fundraising, brand strategy, and more.",
    name: "Simon Solis-Cohen",
    title: "Founder, Huxley",
  },
  {
    quote: "Practical, MBA-level education that has far exceeded my expectations in terms of ROI. Jeff's guidance has saved me invaluable time and money.",
    name: "Carolyn Hamlet",
    title: "Founder, Oku Conscious Energy Gummy Snacks",
  },
];

const faqs = [
  ["I haven't launched yet. Is it too early?", "No. Modules 1 through 3 are the ones to finish before you sign a co-packer agreement, set a price or take a first check."],
  ["I'm not a numbers person. Will I keep up?", "Yes. Jeff is a former CPA who teaches finance in plain language, and you build your numbers inside his model instead of starting from a blank spreadsheet."],
  ["How long does it take?", "It is self-paced. Most founders work through a module a week and come back to specific ones when a decision is in front of them. Access is for life."],
  ["Can I pay over time?", "Yes. Choose Klarna at checkout to spread it out. Cards and Apple Pay work too."],
  ["What if it's not for me?", `Email us within ${FOUNDER_GUARANTEE_DAYS} days and we will refund you in full.`],
  ["Is Jeff coaching me directly?", "No. This is the self-paced curriculum. If you want Jeff in your business, ask us about his advisory programs."],
];

const buttonClass =
  "inline-flex w-full items-center justify-center rounded-lg bg-accent px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-accent-dark sm:w-auto";

export default async function FounderOfferPage() {
  const offer = readFounderOfferToken((await cookies()).get(FOUNDER_OFFER_COOKIE)?.value);
  // No window yet: start one, then come straight back here.
  if (!offer) redirect("/api/founder-offer/start");

  const founder = offer.active;
  const price = founder ? FOUNDER_PRICE_USD : MBA_PRICE_USD;
  const cta = `Get the MBA for CPG for $${price}`;

  return (
    <>
      {founder ? (
        <div className="bg-accent px-4 py-2.5 text-center text-xs font-bold uppercase tracking-[0.16em] text-white sm:text-sm">
          Founder price for training registrants · ends at midnight Pacific
        </div>
      ) : (
        <div className="bg-foreground px-4 py-2.5 text-center text-xs font-bold uppercase tracking-[0.16em] text-white/80 sm:text-sm">
          The founder price has ended. The MBA for CPG is available at its regular price.
        </div>
      )}

      {/* ========== HERO ========== */}
      <section className="bg-foreground text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="mb-6 inline-block rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                MBA for CPG
              </span>
              <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Your business school for CPG.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl">
                The training was five lessons. This is the whole curriculum: 8 modules, 450+ slides narrated by Jeff, his financial model, templates and Playbook. Self-paced, yours for life.
              </p>

              <div className="mt-8 flex flex-wrap items-end gap-x-8 gap-y-6">
                <div>
                  {founder && <p className="text-base text-white/50 line-through">Regular price ${MBA_PRICE_USD}</p>}
                  <p className="text-5xl font-bold text-gold">${price}</p>
                  <p className="mt-1 text-sm text-white/55">One payment. Lifetime access.</p>
                </div>
                {founder && (
                  <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-white/55">Founder price ends in</p>
                    <OfferCountdown expiresAt={offer.expiresAt} dark />
                  </div>
                )}
              </div>
              <KlarnaMessaging publishableKey={STRIPE_PUBLISHABLE_KEY} amountUsd={price} dark className="mt-4 max-w-md" />

              <div className="mt-8">
                <CheckoutButton founder={founder} valueUsd={price} className={buttonClass}>
                  {cta} &rarr;
                </CheckoutButton>
                <p className="mt-3 text-sm text-white/55">{FOUNDER_GUARANTEE_DAYS}-day money-back guarantee. Card, Apple Pay or Klarna.</p>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image src="/images/jeff-teaching.webp" alt="Jeff Church teaching CPG strategy" fill className="object-cover" priority sizes="(min-width: 1024px) 45vw, 92vw" />
            </div>
          </div>
        </div>
      </section>

      {/* ========== CURRICULUM ========== */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <span className="mb-4 inline-block text-xs font-bold uppercase tracking-wider text-accent">The Curriculum</span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">8 modules. Every angle of building a CPG brand.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {modules.map(([number, title, description]) => (
              <div key={number} className="flex items-start gap-4 rounded-xl border border-border bg-card p-6">
                <span className="text-3xl font-bold text-accent/30">{number}</span>
                <div>
                  <h3 className="text-lg font-bold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TOOLS + BONUSES ========== */}
      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <span className="mb-4 inline-block text-xs font-bold uppercase tracking-wider text-accent">The Tools</span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">The models and templates Jeff actually uses.</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {tools.map((tool) => (
              <div key={tool} className="rounded-xl border border-border bg-card p-5 text-center">
                <p className="text-sm font-semibold">{tool}</p>
              </div>
            ))}
          </div>

          <div className="mx-auto mb-8 mt-16 max-w-3xl text-center">
            <span className="mb-4 inline-block text-xs font-bold uppercase tracking-wider text-accent">Included When You Join From the Training</span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Three bonuses.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {bonuses.map((bonus) => (
              <article key={bonus.label} className="rounded-2xl border border-accent/25 bg-white p-7">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">{bonus.label}</p>
                <h3 className="mt-4 text-xl font-bold">{bonus.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{bonus.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <span className="mb-4 inline-block text-xs font-bold uppercase tracking-wider text-accent">What Founders Are Saying</span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">&ldquo;It really is an MBA in CPG.&rdquo;</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-xl border border-border bg-card p-6 sm:p-8">
                <blockquote className="text-sm italic leading-relaxed text-muted">&ldquo;{t.quote}&rdquo;</blockquote>
                <p className="mt-6 text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted">{t.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== GUARANTEE + PRICE ========== */}
      <section className="bg-card-flagship py-16 md:py-24">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-accent/30 bg-white p-8 text-center ring-2 ring-accent/20 md:p-12">
            <span className="mb-4 inline-block rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
              {founder ? "Founder price" : "MBA for CPG"}
            </span>
            {founder && <p className="text-base text-muted line-through">${MBA_PRICE_USD}</p>}
            <p className="text-5xl font-bold">${price}</p>
            <p className="mt-2 text-muted">One-time payment. Lifetime access. No subscription.</p>
            <KlarnaMessaging publishableKey={STRIPE_PUBLISHABLE_KEY} amountUsd={price} centered className="mx-auto mt-3 max-w-md" />

            {founder && (
              <div className="mt-6 flex flex-col items-center gap-2">
                <p className="text-xs font-bold uppercase tracking-wider text-muted">Ends in</p>
                <OfferCountdown expiresAt={offer.expiresAt} />
              </div>
            )}

            <div className="mt-8 flex justify-center">
              <CheckoutButton founder={founder} valueUsd={price} className={buttonClass}>
                {cta} &rarr;
              </CheckoutButton>
            </div>

            <div className="mt-8 border-t border-border pt-6 text-left">
              <h3 className="font-bold">{FOUNDER_GUARANTEE_DAYS} days. Full refund. No hoops.</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Go through it. If it isn&rsquo;t worth many times what you paid, email{" "}
                <a href="mailto:info@teamchurch.co?subject=MBA for CPG refund" className="underline hover:text-foreground">info@teamchurch.co</a>{" "}
                within {FOUNDER_GUARANTEE_DAYS} days and we&rsquo;ll refund you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <section className="border-t border-border bg-background py-16 md:py-20">
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
          <p className="mt-8 text-center text-sm text-muted">
            Want to watch the training again?{" "}
            <Link href="/free-training/watch" className="underline hover:text-foreground">Go back to it here</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
