"use client";

import { useEffect, useMemo, useState } from "react";

type Slot = { id: string; startIso: string; durationMinutes: number };
type Step = 1 | 2 | 3;

const STEPS: { n: Step; label: string }[] = [
  { n: 1, label: "Timezone" },
  { n: 2, label: "Pick a time" },
  { n: 3, label: "Your details" },
];

// Friendly override list. "Auto" uses the browser's detected zone; the IANA
// zone string is what actually drives formatting.
const COMMON_ZONES: { label: string; tz: string }[] = [
  { label: "Eastern (New York)", tz: "America/New_York" },
  { label: "Central (Chicago)", tz: "America/Chicago" },
  { label: "Mountain (Denver)", tz: "America/Denver" },
  { label: "Pacific (Los Angeles)", tz: "America/Los_Angeles" },
  { label: "Arizona (Phoenix)", tz: "America/Phoenix" },
  { label: "London (GMT/BST)", tz: "Europe/London" },
  { label: "Central Europe (Paris)", tz: "Europe/Paris" },
  { label: "India (Kolkata)", tz: "Asia/Kolkata" },
  { label: "Singapore", tz: "Asia/Singapore" },
  { label: "Sydney", tz: "Australia/Sydney" },
];

function detectZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "America/Los_Angeles";
  } catch {
    return "America/Los_Angeles";
  }
}

function dayLabel(iso: string, tz: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date(iso));
}

function timeLabel(iso: string, tz: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(new Date(iso));
}

export function ScheduleWizard({
  monthKey,
  monthLabel,
}: {
  monthKey: string;
  monthLabel: string;
}) {
  const [step, setStep] = useState<Step>(1);
  const [zone, setZone] = useState<string>("America/Los_Angeles");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  // Detect timezone + load this month's slots once.
  useEffect(() => {
    setZone(detectZone());
    fetch(`/api/coaching-call?month=${encodeURIComponent(monthKey)}`)
      .then((r) => r.json())
      .then((d) => setSlots(d.slots || []))
      .catch(() => setSlots([]))
      .finally(() => setLoading(false));
  }, [monthKey]);

  const selectedSlot = slots.find((s) => s.id === selected) || null;

  if (done) {
    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <Card>
          <div className="text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent-light text-accent-dark">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="font-serif text-3xl font-bold tracking-tight">You&apos;re on the list.</h1>
            <p className="mt-4 text-muted leading-relaxed">
              {selectedSlot ? (
                <>
                  We&apos;ve got your request for{" "}
                  <strong className="text-foreground">{dayLabel(selectedSlot.startIso, zone)}</strong>{" "}
                  at <strong className="text-foreground">{timeLabel(selectedSlot.startIso, zone)}</strong>.
                  You&apos;ll get a confirmation by email shortly.
                </>
              ) : (
                <>We&apos;ve got your request. You&apos;ll get a confirmation by email shortly.</>
              )}
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="mb-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          CPG Founders Group
        </p>
        <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
          Book your {monthLabel} 1:1 session with Jeff
        </h1>
      </div>
      <Stepper current={step} />
      <div className="mt-10">
        {step === 1 && (
          <TimezoneStep zone={zone} setZone={setZone} onNext={() => setStep(2)} />
        )}
        {step === 2 && (
          <SessionsStep
            zone={zone}
            slots={slots}
            loading={loading}
            selected={selected}
            setSelected={setSelected}
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
          />
        )}
        {step === 3 && selectedSlot && (
          <DetailsStep
            zone={zone}
            slot={selectedSlot}
            onBack={() => setStep(2)}
            onDone={() => setDone(true)}
            onSlotTaken={() => {
              setSlots((prev) => prev.filter((s) => s.id !== selected));
              setSelected(null);
              setStep(2);
            }}
          />
        )}
      </div>
    </div>
  );
}

function Stepper({ current }: { current: Step }) {
  return (
    <ol className="flex items-center justify-center gap-2 sm:gap-4">
      {STEPS.map((s, i) => {
        const active = s.n === current;
        const isDone = s.n < current;
        return (
          <li key={s.n} className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                  active
                    ? "bg-accent text-white"
                    : isDone
                      ? "bg-accent-light text-accent-dark"
                      : "bg-stone-200 text-muted"
                }`}
              >
                {isDone ? "✓" : s.n}
              </span>
              <span
                className={`hidden text-sm font-medium sm:inline ${
                  active ? "text-foreground" : "text-muted"
                }`}
              >
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <span className="h-px w-6 bg-border sm:w-12" aria-hidden />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      {children}
    </div>
  );
}

/* ----------------------------- Step 1: Timezone ---------------------------- */

function TimezoneStep({
  zone,
  setZone,
  onNext,
}: {
  zone: string;
  setZone: (z: string) => void;
  onNext: () => void;
}) {
  const zoneInList = COMMON_ZONES.some((z) => z.tz === zone);
  return (
    <Card>
      <h2 className="font-serif text-2xl font-bold tracking-tight sm:text-3xl">
        What timezone are you in?
      </h2>

      <label className="mt-6 block">
        <span className="text-sm font-medium">Your timezone</span>
        <select
          value={zone}
          onChange={(e) => setZone(e.target.value)}
          className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2.5 text-foreground outline-none focus:border-accent focus:ring-1 focus:ring-accent"
        >
          {!zoneInList && (
            <option value={zone}>{zone.replace(/_/g, " ")} (detected)</option>
          )}
          {COMMON_ZONES.map((z) => (
            <option key={z.tz} value={z.tz}>
              {z.label}
            </option>
          ))}
        </select>
      </label>

      <div className="mt-8 flex justify-end">
        <button
          onClick={onNext}
          className="rounded-full bg-accent px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-dark"
        >
          See available times &rarr;
        </button>
      </div>
    </Card>
  );
}

/* ----------------------------- Step 2: Sessions ---------------------------- */

function SessionsStep({
  zone,
  slots,
  loading,
  selected,
  setSelected,
  onBack,
  onNext,
}: {
  zone: string;
  slots: Slot[];
  loading: boolean;
  selected: string | null;
  setSelected: (id: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const grouped = useMemo(() => {
    const groups: { day: string; slots: Slot[] }[] = [];
    for (const s of slots) {
      const day = dayLabel(s.startIso, zone);
      const last = groups[groups.length - 1];
      if (last && last.day === day) last.slots.push(s);
      else groups.push({ day, slots: [s] });
    }
    return groups;
  }, [slots, zone]);

  return (
    <Card>
      <h2 className="font-serif text-2xl font-bold tracking-tight sm:text-3xl">
        Pick a session
      </h2>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-light/60 px-3 py-1 font-medium text-accent-dark">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="12" r="9" strokeWidth={2} />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 7v5l3 2" />
          </svg>
          Each session is 60 minutes with Jeff
        </span>
        <span className="text-muted">
          Times shown in {zone.replace(/_/g, " ")}.
        </span>
      </div>

      <div className="mt-6">
        {loading ? (
          <p className="py-8 text-center text-muted">Loading available times&hellip;</p>
        ) : slots.length === 0 ? (
          <p className="py-8 text-center text-muted">
            No times are available right now. Please check back soon or{" "}
            <a href="/contact" className="text-accent underline">
              reach out
            </a>
            .
          </p>
        ) : (
          <div className="space-y-6">
            {grouped.map((g) => (
              <div key={g.day}>
                <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted">
                  {g.day}
                </h2>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {g.slots.map((s) => {
                    const isSel = selected === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setSelected(s.id)}
                        className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition ${
                          isSel
                            ? "border-accent bg-accent text-white"
                            : "border-border bg-white hover:border-accent"
                        }`}
                      >
                        {timeLabel(s.startIso, zone)}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-sm font-medium text-muted hover:text-foreground"
        >
          &larr; Back
        </button>
        <button
          onClick={onNext}
          disabled={!selected}
          className="rounded-full bg-accent px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-40"
        >
          Continue &rarr;
        </button>
      </div>
    </Card>
  );
}

/* ----------------------------- Step 3: Details ----------------------------- */

function DetailsStep({
  zone,
  slot,
  onBack,
  onDone,
  onSlotTaken,
}: {
  zone: string;
  slot: Slot;
  onBack: () => void;
  onDone: () => void;
  onSlotTaken: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const emailOk = /.+@.+\..+/.test(email);
  const canSubmit =
    name.trim().length > 1 && emailOk && phone.trim().length >= 7 && !submitting;

  async function handleSubmit() {
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/coaching-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          slotId: slot.id,
          timezone: zone,
        }),
      });
      if (res.ok) {
        onDone();
        return;
      }
      const data = await res.json().catch(() => ({}));
      if (res.status === 409) {
        // Slot got taken between load and submit — bounce back to picker.
        onSlotTaken();
        return;
      }
      throw new Error(data.error || "Something went wrong. Please try again.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card>
      <h2 className="font-serif text-2xl font-bold tracking-tight sm:text-3xl">
        Almost there.
      </h2>

      <div className="mt-4 rounded-xl bg-accent-light/60 p-5">
        <p className="text-sm font-medium text-accent-dark">Your session</p>
        <p className="mt-1 text-lg font-semibold text-foreground">
          {dayLabel(slot.startIso, zone)} at {timeLabel(slot.startIso, zone)}
        </p>
        <p className="mt-1 text-sm text-muted">60 minutes with Jeff</p>
      </div>

      <div className="mt-6 space-y-4">
        <label className="block">
          <span className="text-sm font-medium">Full name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-foreground outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-foreground outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium">Phone</span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-foreground outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </label>
        </div>
      </div>

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-sm font-medium text-muted hover:text-foreground"
        >
          &larr; Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="rounded-full bg-accent px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-40"
        >
          {submitting ? "Requesting…" : "Request this time →"}
        </button>
      </div>

      <p className="mt-4 text-center text-xs text-muted">
        This sends a request. You&apos;ll get a confirmation email once it&apos;s locked in.
      </p>
    </Card>
  );
}
