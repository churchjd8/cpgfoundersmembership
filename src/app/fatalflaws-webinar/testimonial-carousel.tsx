"use client";

import { useRef } from "react";

type Testimonial = {
  quote: string;
  name: string;
  title: string;
  tag: string;
};

export function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scroll(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * Math.min(track.clientWidth * 0.85, 620), behavior: "smooth" });
  }

  return (
    <div>
      <div className="mb-6 flex justify-end gap-2">
        <button type="button" onClick={() => scroll(-1)} aria-label="Previous testimonial" className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-foreground transition hover:border-accent hover:text-accent">
          <span aria-hidden="true">&larr;</span>
        </button>
        <button type="button" onClick={() => scroll(1)} aria-label="Next testimonial" className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-foreground transition hover:border-accent hover:text-accent">
          <span aria-hidden="true">&rarr;</span>
        </button>
      </div>

      <div ref={trackRef} className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6" aria-label="Testimonials and endorsements">
        {testimonials.map((testimonial) => (
          <figure key={testimonial.name} className="flex min-h-[310px] w-[88%] shrink-0 snap-start flex-col rounded-2xl border border-border bg-white p-7 shadow-sm sm:w-[64%] lg:w-[42%]">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">{testimonial.tag}</p>
              <svg viewBox="0 0 32 24" className="h-7 w-9 text-accent/20" fill="currentColor" aria-hidden="true">
                <path d="M0 24V13.9C0 5.8 4.1 1.2 12.2 0l1 3.4C8.4 4.8 6.1 7.4 6.1 11.2H12V24H0Zm18.8 0V13.9C18.8 5.8 23 1.2 31 0l1 3.4c-4.8 1.4-7.1 4-7.1 7.8h5.9V24h-12Z" />
              </svg>
            </div>
            <blockquote className="mt-7 flex-1 text-lg font-medium leading-relaxed text-foreground">&ldquo;{testimonial.quote}&rdquo;</blockquote>
            <figcaption className="mt-8 border-t border-border pt-5">
              <p className="font-bold text-foreground">{testimonial.name}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{testimonial.title}</p>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-2 text-center text-xs font-semibold uppercase tracking-[0.14em] text-muted sm:hidden">Swipe to read more &rarr;</p>
    </div>
  );
}
