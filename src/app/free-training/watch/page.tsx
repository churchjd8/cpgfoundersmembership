import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { OfferCountdown } from "@/components/offer-countdown";
import {
  FOUNDER_GUARANTEE_DAYS,
  FOUNDER_OFFER_COOKIE,
  FOUNDER_PRICE_USD,
  TRAINING_SUBTITLE,
  TRAINING_TITLE,
  readFounderOfferToken,
} from "@/lib/founder-offer";
import { MBA_PRICE_USD } from "@/lib/mba-offer";
import { OfferReveal } from "./offer-reveal";

export const metadata: Metadata = {
  title: `${TRAINING_TITLE} - Watch the Training`,
  robots: { index: false, follow: false },
};

// Minute of the recording where Jeff introduces the MBA for CPG. The offer
// below the video stays hidden until then.
const OFFER_MINUTE = Number(process.env.NEXT_PUBLIC_FREE_TRAINING_OFFER_MINUTE) || 40;

export default async function FreeTrainingWatchPage() {
  const videoUrl = process.env.NEXT_PUBLIC_FREE_TRAINING_VIDEO_EMBED_URL;
  const offer = readFounderOfferToken((await cookies()).get(FOUNDER_OFFER_COOKIE)?.value);

  return (
    <>
      <section className="bg-foreground text-white">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Free training with Jeff Church</p>
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{TRAINING_TITLE}</h1>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-white/65">{TRAINING_SUBTITLE}</p>

          <div className="mt-8 overflow-hidden rounded-2xl border border-white/15 bg-ridge shadow-2xl">
            <div className="aspect-video">
              {videoUrl ? (
                <iframe
                  src={videoUrl}
                  title={TRAINING_TITLE}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center px-6 text-center">
                  <p className="text-xl font-bold">The training is being recorded.</p>
                  <p className="mt-2 max-w-md text-sm text-white/65">
                    You&rsquo;re registered. We&rsquo;ll email you the moment it&rsquo;s ready to watch.
                  </p>
                </div>
              )}
            </div>
          </div>
          <p className="mt-4 text-sm text-white/55">
            About 45 minutes. Grab a notebook. We also emailed you this link so you can come back to it.
          </p>
        </div>
      </section>

      <OfferReveal afterMinutes={OFFER_MINUTE}>
        <section className="bg-card-flagship py-14 md:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-accent/30 bg-white p-7 shadow-xl ring-2 ring-accent/20 sm:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">For everyone who watched</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">The MBA for CPG, at the founder price.</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                Those were five mistakes. The MBA for CPG is the whole curriculum: 8 modules, 450+ slides narrated by Jeff, his 5-year financial model, the Trade Spend Calculator, deck templates and the Playbook.
              </p>

              {offer?.active ? (
                <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-muted line-through">Regular price ${MBA_PRICE_USD}</p>
                    <p className="text-5xl font-bold text-accent">${FOUNDER_PRICE_USD}</p>
                    <p className="mt-1 text-sm text-muted">{FOUNDER_GUARANTEE_DAYS}-day money-back guarantee</p>
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted">Founder price ends in</p>
                    <OfferCountdown expiresAt={offer.expiresAt} />
                  </div>
                </div>
              ) : (
                <p className="mt-8 text-lg font-semibold">One payment of ${MBA_PRICE_USD}. Lifetime access.</p>
              )}

              <div className="mt-8">
                <Link
                  href={offer?.active || !offer ? "/mba-for-cpg/founder-offer" : "/mba-for-cpg"}
                  className="inline-flex w-full items-center justify-center rounded-lg bg-accent px-8 py-4 text-lg font-bold text-white transition hover:bg-accent-dark sm:w-auto"
                >
                  See everything inside <span className="ml-2" aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </OfferReveal>
    </>
  );
}
