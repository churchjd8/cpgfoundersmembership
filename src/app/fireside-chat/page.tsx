import type { Metadata } from "next";
import Link from "next/link";

const title = "The Cold Pressed Truth Fireside Chat | Replay with Jeff Church";
const description = "Watch the launch day fireside chat with Jeff Church, Joey Gonzalez and Nicky Vidaurreta. An hour of straight answers on building, scaling and selling a consumer brand, plus audience Q&A.";
const url = "https://cpgfoundersgroup.com/fireside-chat";
const replaySrc = "/api/replay?v=cpt-fireside-chat-2026-11-17";
const bookUrl = "https://www.amazon.com/dp/B0HM123G9W";
const reviewUrl = "https://www.amazon.com/review/create-review/?ie=UTF8&channel=glance-detail&asin=B0HM123G9W";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const topics = [
  "Why Jeff used to think entrepreneurs were born, and what changed his mind",
  "Being third to market with Suja, and why taste wins",
  "Why PRODA gave one retailer a full year exclusive",
  "The difference between a money problem and a real problem",
  "How he builds culture, and why EQ beats IQ",
  "Open Q&A with founders in the audience",
];

type Step = { number: string; label: string; title: string; body: string; cta: string; href: string; external?: boolean };

const steps: Step[] = [
  { number: "01", label: "The book", title: "Get The Cold Pressed Truth", body: "Jeff’s field guide to building, scaling and selling a consumer brand. Ebook, paperback and hardcover are all on the same Amazon page.", cta: "Get the book on Amazon", href: bookUrl, external: true },
  { number: "02", label: "Already read it?", title: "Leave a Review", body: "It takes about thirty seconds, and reviews are how a founder who has never heard of Jeff finds this book two years from now.", cta: "Leave a review", href: reviewUrl, external: true },
  { number: "03", label: "Work together", title: "Coaching with Jeff", body: "Want help working through the decisions in your business? See how Jeff works with founders and apply for a spot.", cta: "Work with Jeff", href: "/work-with-jeff" },
  { number: "04", label: "Your community", title: "Join the Founders Only WhatsApp Group", body: "Get connected with other CPG founders. Ask questions, share what’s working, and learn from people building alongside you.", cta: "Join the founders group", href: "/founders-only" },
];

const linkClass = "inline-flex min-h-11 items-center gap-2 font-semibold text-accent underline decoration-accent/30 underline-offset-4 hover:text-accent-dark";

export default function FiresideChatPage() {
  return (
    <>
      <section className="bg-foreground text-white">
        <div className="mx-auto max-w-6xl px-4 pb-28 pt-12 sm:px-6 md:pb-36 md:pt-16 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Fireside chat replay · Recorded November 17, 2026</p>
          <h1 className="mt-6 max-w-3xl font-[family-name:var(--font-playfair)] text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">The Cold Pressed Truth,<br />live and unfiltered.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">On launch day, Jeff Church sat down with Joey Gonzalez and Nicky Vidaurreta, hosted by Khalid Shaher, for an hour of the questions most founders don&rsquo;t ask out loud.</p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <section aria-label="Fireside chat replay" className="relative -mt-20 md:-mt-24">
          <div className="aspect-video overflow-hidden rounded-2xl bg-black shadow-xl shadow-foreground/10">
            <video src={replaySrc} controls playsInline preload="metadata" poster="/images/cpt-fireside-chat-poster.jpg" aria-label="The Cold Pressed Truth fireside chat replay with Jeff Church" className="h-full w-full" />
          </div>
          <p className="mt-3 text-sm text-muted">About 65 minutes. The last 20 minutes are open Q&amp;A.</p>
        </section>

        <section aria-labelledby="next-steps-title" className="py-14 sm:py-16">
          <h2 id="next-steps-title" className="text-2xl font-bold tracking-tight sm:text-3xl">After you watch.</h2>
          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            {steps.map((step) => (
              <article key={step.number} className="flex flex-col rounded-xl border border-border bg-white p-7">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-accent"><span>{step.label}</span><span aria-hidden="true" className="text-stone">{step.number}</span></div>
                <h3 className="mt-5 text-xl font-bold leading-snug">{step.title}</h3>
                <p className="mb-6 mt-4 flex-1 leading-relaxed text-muted">{step.body}</p>
                {step.external ? (
                  <a href={step.href} target="_blank" rel="noopener noreferrer" className={linkClass}>{step.cta} <span aria-hidden="true">↗</span></a>
                ) : (
                  <Link href={step.href} className={linkClass}>{step.cta} <span aria-hidden="true">→</span></Link>
                )}
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="topics-title" className="border-t border-border py-12 sm:py-14">
          <p className="text-xs font-bold uppercase tracking-wider text-accent">In this conversation</p>
          <h2 id="topics-title" className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">What they got into.</h2>
          <ul className="mt-7 grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {topics.map((topic) => (
              <li key={topic} className="flex gap-3 leading-relaxed text-muted"><span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{topic}</li>
            ))}
          </ul>
        </section>

        <aside className="mb-14 rounded-xl border border-border px-6 py-5 text-center text-sm leading-relaxed text-muted">Looking for more free tools and guides? <Link href="/resources" className="font-semibold text-accent underline underline-offset-4 hover:text-accent-dark">Explore the Resources tab <span aria-hidden="true">→</span></Link></aside>
      </div>
    </>
  );
}
