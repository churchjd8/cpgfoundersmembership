import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ALWAYS_ON, KITS } from "@/lib/kits";
import { KitOptIn } from "@/components/kit-form";

// The book door. This is the destination printed as a QR code and URL in the
// front matter of "The Cold-Pressed Truth", kept separate from /resources so
// book-sourced traffic and signups stay trackable on their own.
//
// Same three kits as /resources — both render from src/lib/kits.ts. The
// difference is the framing (the reader already knows who Jeff is) and the
// friction: three fields here, because a book reader has already paid in.

export const metadata: Metadata = {
  title: "The Toolbox - Free CPG Tools from The Cold-Pressed Truth",
  description:
    "You've got the book. Here's the toolbox that goes with it. Every calculator, model, workshop, and white paper Jeff Church uses with the founders he advises. Free.",
  openGraph: {
    title: "The Toolbox - Free CPG Tools from The Cold-Pressed Truth",
    description:
      "Every calculator, model, workshop, and white paper Jeff Church uses with the founders he advises. One signup, one email, all of it.",
    url: "https://cpgfoundersgroup.com/toolbox",
    siteName: "CPG Founders Group",
    type: "website",
  },
};

export default function ToolboxPage() {
  return (
    <>
      {/* ========== HERO + OPT-IN ========== */}
      <section className="bg-foreground text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full mb-6">
                For readers of the book
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight">
                You&rsquo;ve got the book.
                <br />
                Here&rsquo;s the toolbox.
              </h1>
              <p className="mt-6 text-lg text-white/70 leading-relaxed">
                I didn&rsquo;t write <em>The Cold-Pressed Truth</em> to give you ideas. I wrote
                it to give you tools. So here is 10 days of Babu AI free, the WhatsApp group
                where 350+ CPG founders answer each other in real time, and all three kits &mdash;
                every calculator, model, and workshop I use with the founders I advise.
              </p>
              <p className="mt-4 text-lg text-white/70 leading-relaxed">
                One signup. One email. All of it. No cost, no call, no catch.
              </p>

              <div className="mt-10">
                <KitOptIn
                  kit="all"
                  source="toolbox"
                  fields="minimal"
                  idPrefix="hero"
                  variant="dark"
                  heading="Send me the whole toolbox"
                  subheading="One email. Everything in it. No cost, no call, no pitch."
                  buttonLabel="Send me the toolbox"
                />
              </div>
            </div>

            <div className="lg:pl-8">
              <div className="relative aspect-[1007/1562] max-w-sm mx-auto rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/book-covers/cold-pressed-truth.png"
                  alt="Cold Pressed Truth by Jeff Church"
                  fill
                  sizes="(max-width: 1024px) 100vw, 384px"
                  className="object-cover"
                  preload
                />
              </div>
              <p className="mt-6 text-center text-sm text-white/50 max-w-sm mx-auto">
                <em>The Cold-Pressed Truth</em> - A Founder&rsquo;s Field Guide to Building,
                Scaling &amp; Selling a Consumer Brand. Foreword by Jay Shetty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== WHAT'S INSIDE ========== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
              What&rsquo;s inside
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Start with these two
            </h2>
            <p className="mt-4 text-lg text-muted leading-relaxed">
              The book is the thinking. These two are the thinking on demand &mdash; one machine
              that answers whatever you bring it, and 350 founders who have already been where
              you are. Everything else in the toolbox comes with them.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2 mb-16">
            {ALWAYS_ON.map((a, i) => {
              const inner = (
                <>
                  <span
                    className={`inline-block self-start px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full mb-5 ${
                      i === 0 ? "bg-accent text-white" : "bg-gold text-foreground"
                    }`}
                  >
                    {a.badge}
                  </span>
                  <p className="text-4xl mb-4">{a.emoji}</p>
                  <h3 className="text-2xl font-bold tracking-tight">{a.title}</h3>
                  <p className="mt-3 text-white/75 leading-relaxed flex-1">{a.body}</p>
                  <span className="mt-6 inline-flex items-center font-semibold text-gold group-hover:text-white transition-colors">
                    {a.cta} &rarr;
                  </span>
                </>
              );

              const className = `group flex flex-col ${
                i === 0 ? "bg-foreground" : "bg-ridge"
              } text-white rounded-2xl p-8 hover:shadow-xl transition-all`;

              return a.external ? (
                <a
                  key={a.title}
                  href={a.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {inner}
                </a>
              ) : (
                <Link key={a.title} href={a.href} className={className}>
                  {inner}
                </Link>
              );
            })}
          </div>

          <div className="max-w-3xl mb-10 pt-4 border-t border-border">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              And all three kits
            </h2>
            <p className="mt-3 text-lg text-muted leading-relaxed">
              Built over 35 years and eight companies. Most of them exist because I got something
              wrong first and had to build the thing that would have saved me. You get every one
              of them in the same email.
            </p>
          </div>

          <div className="space-y-12">
            {KITS.map((kit) => (
              <div key={kit.id}>
                <div className="border-b border-border pb-3 mb-6">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-accent">
                    {kit.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{kit.lead}</p>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  {kit.items.map((item) => (
                    <div key={item.title} className="flex gap-3">
                      <span className="text-accent font-bold mt-0.5 shrink-0">&#10003;</span>
                      <div>
                        <p className="font-bold leading-snug">{item.title}</p>
                        <p className="mt-1 text-sm text-muted leading-relaxed">{item.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECOND OPT-IN ========== */}
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Take the tools. Then let&rsquo;s get to work.
            </h2>
            <p className="mt-4 text-lg text-muted leading-relaxed">
              Everything above, delivered in a single email you can come back to.
            </p>
          </div>
          <KitOptIn
            kit="all"
            source="toolbox"
            fields="minimal"
            idPrefix="footer"
            heading="Send me the whole toolbox"
            subheading="One email. Everything in it. No cost, no call, no pitch."
            buttonLabel="Send me the toolbox"
          />
        </div>
      </section>

      {/* ========== ADVISORY CTA ========== */}
      <section className="py-16 md:py-24 bg-foreground text-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Want Jeff&rsquo;s eyes on your business?
          </h2>
          <p className="mt-6 text-lg text-white/70 leading-relaxed">
            The book and the toolbox are what he learned the hard way. If you want him working
            through it with you directly, he takes on a small number of founders at a time.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center px-8 py-4 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors text-lg"
            >
              Apply to work with Jeff &rarr;
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors text-lg"
            >
              Read the blog
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
