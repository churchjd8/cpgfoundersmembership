"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

// Quotes: Jeff Church - Testimonials Master List.md; Sean's excerpt and the
// Tiffany/Sean/Collin portraits: JeffChurch_CPG-BrandAccelerator_Overview.pdf,
// reference page 12 (the original TeamChurch brochure).
// Hannah portrait: thelanby.com/blog/get-well-with-hannah (named headshot).
const testimonials = [
  { topic: "Fundraising", quote: "Jeff led us all the way through a successful $1.5M Angel fundraising.", name: "Tiffany Tatom", role: "Co-Founder & CEO, Waav Organic", image: "/images/testimonials/tiffany-tatom.png" },
  { topic: "Retail & distribution", quote: "Jeff was the primary reason that we got JUNI into Moscoe and helped us secure Presence Marketing as our Natural Foods broker.", name: "Kim Perell", role: "Co-Founder & CEO, JUNI", image: "/images/testimonials/kim-perell.jpg" },
  { topic: "Margins & operations", quote: "Jeff helped us develop a roadmap to a lower COGS and higher gross margin by nearly 40%.", name: "Sean McDonald", role: "CEO, Melting Forest", image: "/images/testimonials/sean-mcdonald.png" },
  { topic: "First retail relationships", quote: "Jeff's contribution to LIXIR has been beyond anything I would have ever expected. Jeff was also pivotal in securing our first retailers and our first DSD Distributors.", name: "Collin McKenna", role: "Founder & CEO, LIXIR", image: "/images/testimonials/collin-mckenna.png" },
  { topic: "Guidance built around the brand", quote: "From exposure to the most connected CPG community, to the level of detail that Jeff had in each session. He tailored everything to be intentional with each brand.", name: "Hannah Minardi", role: "Co-Founder, Standard Self Care", image: "/images/testimonials/hannah-minardi.avif" },
];

export function TestimonialCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ start: true, end: false, index: 0 });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => {
      const first = el.firstElementChild as HTMLElement | null;
      const width = (first?.getBoundingClientRect().width || el.clientWidth) + (Number.parseFloat(getComputedStyle(el).columnGap) || 0);
      setPosition({ start: el.scrollLeft < 2, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2, index: Math.min(testimonials.length - 1, Math.round(el.scrollLeft / width)) });
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => { el.removeEventListener("scroll", update); observer.disconnect(); };
  }, []);

  function move(direction: number) {
    const el = track.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const gap = Number.parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: direction * ((first?.getBoundingClientRect().width || el.clientWidth) + gap), behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  return <div className={styles.carousel}>
    <div className={styles.carouselControls}>
      <p><span className={styles.storyCount} aria-live="polite">{String(position.index + 1).padStart(2, "0")} / 05</span> <span className={styles.swipeHint}>Swipe to explore</span></p>
      <div><button type="button" aria-label="Previous testimonials" aria-controls="founder-testimonials" disabled={position.start} onClick={() => move(-1)}>←</button><button type="button" aria-label="Next testimonials" aria-controls="founder-testimonials" disabled={position.end} onClick={() => move(1)}>→</button></div>
    </div>
    <div id="founder-testimonials" ref={track} className={`${styles.proofGrid} ${styles.testimonialTrack}`} role="region" aria-label="Founder testimonials. Scroll horizontally for more stories." tabIndex={0}>
      {testimonials.map((item, index) => <figure key={item.name} aria-label={`${index + 1} of ${testimonials.length}: ${item.name}`}>
        <p className={styles.result}>{item.topic}</p>
        <blockquote>“{item.quote}”</blockquote>
        <figcaption className={styles.testimonialPerson}><Image src={item.image} alt={`${item.name} headshot`} width={56} height={56} className={styles.testimonialPhoto} /><div><strong>{item.name}</strong><span>{item.role}</span></div></figcaption>
      </figure>)}
    </div>
  </div>;
}
