import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HotSeatForm from "./hot-seat-form";

// The next Hot Seat. Update these two lines for each new round.
const HOT_SEAT_DAY = "Thursday, October 22";
const APPLY_BY = "Monday, October 19";

const description =
  "One founder, one real business challenge, 375+ CPG founders weighing in for 24 hours. Apply to be in the Hot Seat in the CPG Founders WhatsApp group.";

export const metadata: Metadata = {
  title: "The Hot Seat - CPG Founders Group",
  description,
  openGraph: {
    title: "The Hot Seat - CPG Founders Group",
    description,
  },
};

const steps = [
  {
    title: "You apply",
    body: "Tell us about your business and the one challenge you most want help with. It takes about three minutes.",
  },
  {
    title: "We pick one founder",
    body: "We'll let you know within a week whether you're up this round or a fit for a later one.",
  },
  {
    title: "The group goes to work",
    body: "On Hot Seat day we put your challenge in front of the group. For 24 hours founders ask questions, share what worked for them, and make introductions.",
  },
];

export default function HotSeatPage() {
  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative bg-foreground text-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full mb-6">
                CPG Founders WhatsApp Group
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
                The Hot Seat
              </h1>
              <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">
                One founder. One real business challenge. 375+ CPG founders weighing in for 24
                hours.
              </p>
              <p className="mt-6 text-sm font-semibold text-accent">
                Next Hot Seat: {HOT_SEAT_DAY}. Apply by {APPLY_BY}.
              </p>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/jeff-teaching.webp"
                alt="Jeff Church strategizing at the whiteboard"
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section className="py-12 md:py-16 bg-card">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div key={step.title} className="bg-white rounded-xl border border-border p-6">
                <p className="text-sm font-bold text-accent">Step {i + 1}</p>
                <h2 className="mt-1 text-lg font-bold">{step.title}</h2>
                <p className="mt-2 text-sm text-muted leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FORM ========== */}
      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight">Apply for the Hot Seat</h2>
            <p className="mt-4 text-muted">
              Free for founders in the group. Not in the WhatsApp group yet?{" "}
              <Link href="/founders-only" className="font-semibold text-accent hover:underline">
                Click here to join.
              </Link>
            </p>
          </div>

          <HotSeatForm />
        </div>
      </section>
    </>
  );
}
