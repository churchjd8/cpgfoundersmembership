import type { Metadata } from "next";
import Link from "next/link";
import { workshop } from "./content";

const title = "CPG Fatal Flaws | Workshop Resources & Replay";
const description = "Your next steps from the CPG Fatal Flaws workshop with Jeff Church: try Babu free for 10 days, connect with founders, get CPG Match early access, and watch the replay.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://cpgfoundersgroup.com/fatal-flaws-resources" },
  openGraph: { title, description, url: "https://cpgfoundersgroup.com/fatal-flaws-resources", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const resources = [
  { number: "01", label: "Your community", title: "Join the Founders Only WhatsApp Group", body: "Get connected with other CPG founders. Ask questions, share what’s working, and learn from people building alongside you.", cta: "Join the founders group", href: "/founders-only" },
  { number: "02", label: "Your next vendor", title: "CPG Match for Vendors: Get Early Access", body: "Have a vendor you’ve worked with and want to review? Share your experience to help other founders and get early access to CPG Match.", cta: "Review a vendor & get early access", href: "/cpg-match" },
  { number: "03", label: "Work together", title: "Apply to Work with Jeff", body: "Want help working through the decisions in your business? Tell Jeff about your brand, where you’re stuck, and what you want to build next.", cta: "Apply to work with Jeff", href: "/apply" },
];

export default function FatalFlawsResourcesPage() {
  const replay = workshop.replay;
  return (
    <>
      <section className="bg-foreground text-white">
        <div className="mx-auto max-w-6xl px-4 pb-24 pt-12 sm:px-6 md:pb-28 md:pt-16 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">CPG Fatal Flaws · Workshop with Jeff Church</p>
          <h1 className="mt-6 max-w-3xl font-[family-name:var(--font-playfair)] text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">Catch the flaws.<br />Build a stronger business.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">Your workshop resources, next steps, and replay. Keep this page handy and start with the challenge that matters most to your brand.</p>
          <a href="#replay" className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gold underline underline-offset-4 hover:text-white">{replay ? "Watch the replay" : "Replay Available Soon"} <span aria-hidden="true">↓</span></a>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <section aria-labelledby="babu-title" className="relative -mt-12 overflow-hidden rounded-2xl border border-border bg-white shadow-xl shadow-foreground/5">
          <div className="grid lg:grid-cols-[1fr_280px]">
            <div className="p-7 sm:p-10 lg:p-12">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-signal">Start here · Babu AI</p>
              <h2 id="babu-title" className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Run your own<br />fatal flaw assessment.</h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">Take what we covered and apply it to your business. Sign up for Babu&rsquo;s 10-day free trial, then ask Babu to help you assess your brand for fatal flaws in margins, cash flow, fundraising, and growth.</p>
              <a href={workshop.babuTrialUrl} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-signal px-6 py-4 text-center font-bold text-white transition hover:bg-signal/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal">Start Your 10-Day Free Trial <span aria-hidden="true">↗</span></a>
              <p className="mt-3 text-sm text-muted">Explore Babu at askbabu.ai.</p>
            </div>
            <div className="flex flex-col justify-center border-t border-border bg-signal/5 p-7 sm:p-10 lg:border-l lg:border-t-0">
              <p className="text-7xl font-bold tracking-tighter text-signal sm:text-8xl">10<span className="mt-2 block text-xl font-semibold tracking-normal">days free</span></p>
              <p className="mt-6 text-sm leading-relaxed text-muted">A place to work through the real questions behind your CPG business.</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="next-steps-title" className="py-14 sm:py-16">
          <h2 id="next-steps-title" className="text-2xl font-bold tracking-tight sm:text-3xl">Keep moving after the workshop.</h2>
          <div className="mt-7 grid gap-5 lg:grid-cols-3">
            {resources.map((resource) => (
              <article key={resource.number} className="flex flex-col rounded-xl border border-border bg-white p-7">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-accent"><span>{resource.label}</span><span aria-hidden="true" className="text-stone">{resource.number}</span></div>
                <h3 className="mt-5 text-xl font-bold leading-snug">{resource.title}</h3>
                <p className="mb-6 mt-4 flex-1 leading-relaxed text-muted">{resource.body}</p>
                <Link href={resource.href} className="inline-flex min-h-11 items-center gap-2 font-semibold text-accent underline decoration-accent/30 underline-offset-4 hover:text-accent-dark">{resource.cta} <span aria-hidden="true">→</span></Link>
              </article>
            ))}
          </div>
        </section>

        <section id="replay" aria-labelledby="replay-title" className="scroll-mt-24 border-t border-border py-12 sm:py-14">
          <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
            <div><p className="text-xs font-bold uppercase tracking-wider text-accent">Watch & revisit</p><h2 id="replay-title" className="mt-2 text-2xl font-bold sm:text-3xl">The CPG Fatal Flaws replay</h2></div>
            <span className="rounded-full bg-accent-light px-4 py-2 text-sm font-semibold text-accent">{replay ? "Replay Available" : "Replay Available Soon"}</span>
          </div>
          {replay ? (
            <div className="aspect-video overflow-hidden rounded-xl bg-foreground">
              {replay.kind === "video" ? (
                <video src={replay.url} controls preload="metadata" aria-label="CPG Fatal Flaws workshop replay" className="h-full w-full" />
              ) : (
                <iframe src={replay.url} title="CPG Fatal Flaws workshop replay with Jeff Church" loading="lazy" allow="fullscreen; picture-in-picture; encrypted-media" allowFullScreen className="h-full w-full border-0" />
              )}
            </div>
          ) : (
            <div className="flex min-h-64 flex-col items-center justify-center rounded-xl bg-foreground px-6 py-12 text-center text-white sm:aspect-video">
              <svg viewBox="0 0 48 48" fill="none" className="mb-5 h-12 w-12 text-gold" aria-hidden="true"><rect x="5" y="9" width="38" height="30" rx="5" stroke="currentColor" strokeWidth="1.5" /><path d="m20 17 11 7-11 7V17Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
              <p className="text-xl font-bold sm:text-2xl">Replay Available Soon</p>
              <p className="mt-3 max-w-md leading-relaxed text-white/70">The recording will be right here after the workshop. Bookmark this page and come back to watch.</p>
            </div>
          )}
        </section>

        <aside className="mb-14 rounded-xl border border-border px-6 py-5 text-center text-sm leading-relaxed text-muted">Looking for more free tools and guides? <Link href="/resources" className="font-semibold text-accent underline underline-offset-4 hover:text-accent-dark">Explore the Resources tab <span aria-hidden="true">→</span></Link></aside>
      </div>
    </>
  );
}
