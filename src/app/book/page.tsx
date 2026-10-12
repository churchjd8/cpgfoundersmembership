import type { Metadata } from "next";
import Image from "next/image";
import { BookWaitlistForm } from "@/components/book-waitlist-form";

export const metadata: Metadata = {
  title: "The Cold Pressed Truth - A Founder's Field Guide | Jeff Church",
  description:
    "Jeff Church's book on building Suja from an ice closet to $100 million in six years. A Founder's Field Guide to Building, Scaling, and Selling a Consumer Brand. Foreword by Jay Shetty. Out November 17, 2026. Join the insider list for first access.",
};

export default function BookPage() {
  return (
    <section className="bg-foreground text-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div className="relative aspect-[1007/1562] w-full max-w-[280px] md:max-w-[360px] mx-auto rounded-lg overflow-hidden shadow-2xl">
          <Image
            src="/images/book-covers/cold-pressed-truth.png"
            alt="The Cold Pressed Truth by Jeff Church"
            fill
            priority
            sizes="(max-width: 768px) 280px, 360px"
            className="object-cover"
          />
        </div>

        <div className="text-center md:text-left">
          <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full mb-5">
            Out November 17
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight">
            The Cold Pressed Truth
          </h1>
          <p className="mt-3 text-lg text-white/70">
            By Jeff Church. Foreword by Jay Shetty.
          </p>
          <p className="mt-6 text-lg text-white/80">
            Get first access the morning it&rsquo;s out.
          </p>
          <BookWaitlistForm stacked />
        </div>
      </div>
    </section>
  );
}
