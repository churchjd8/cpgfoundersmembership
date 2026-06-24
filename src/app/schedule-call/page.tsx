"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";

type Slot = { id: string; startIso: string; durationMinutes: number };

// A short, friendly list for the override dropdown. "Auto" uses the browser's
// detected zone. The full IANA zone is what actually drives formatting.
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

export default function ScheduleCallPage() {
  const [zone, setZone] = useState<string>("America/Los_Angeles");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    setZone(detectZone());
    fetch("/api/coaching-call")
      .then((r) => r.json())
      .then((d) => setSlots(d.slots || []))
      .catch(() => setSlots([]))
      .finally(() => setLoading(false));
  }, []);

  // Group slots by their day label in the chosen timezone.
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

  // Is the dropdown showing a known zone, or did we detect an uncommon one?
  const zoneInList = COMMON_ZONES.some((z) => z.tz === zone);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selected) return;
    setStatus("loading");
    setErrorMsg("");

    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/coaching-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, slotId: selected, timezone: zone }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        const d = await res.json().catch(() => ({}));
        setErrorMsg(d.error || "Something went wrong. Please try again.");
        setStatus("error");
        // If the slot was taken, drop it from the list.
        if (res.status === 409) {
          setSlots((prev) => prev.filter((s) => s.id !== selected));
          setSelected(null);
        }
      }
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    const slot = slots.find((s) => s.id === selected);
    return (
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-6">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold">You&rsquo;re on the list.</h1>
          <p className="mt-4 text-lg text-muted">
            {slot ? (
              <>
                We&rsquo;ve got your request for{" "}
                <strong>{dayLabel(slot.startIso, zone)}</strong> at{" "}
                <strong>{timeLabel(slot.startIso, zone)}</strong>. You&rsquo;ll get a
                confirmation by email shortly.
              </>
            ) : (
              <>We&rsquo;ve got your request. You&rsquo;ll get a confirmation by email shortly.</>
            )}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Book your coaching call with Jeff.
          </h1>
          <p className="mt-4 text-lg text-muted">
            Pick a time that works for you. Each call is one hour.
          </p>
        </div>

        {/* Timezone selector */}
        <div className="mb-8 rounded-lg border border-black/10 bg-black/[0.02] p-4">
          <label htmlFor="tz" className="block text-sm font-medium mb-1">
            Your timezone
          </label>
          <p className="text-xs text-muted mb-2">
            Times below are shown in this zone. We auto-detected it &mdash; change it if it&rsquo;s wrong.
          </p>
          <select
            id="tz"
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            className="w-full rounded-md border border-black/15 bg-white px-3 py-2 text-sm"
          >
            {!zoneInList && <option value={zone}>{zone.replace(/_/g, " ")} (detected)</option>}
            {COMMON_ZONES.map((z) => (
              <option key={z.tz} value={z.tz}>
                {z.label}
              </option>
            ))}
          </select>
        </div>

        {/* Slot picker */}
        {loading ? (
          <p className="text-center text-muted py-8">Loading available times&hellip;</p>
        ) : slots.length === 0 ? (
          <p className="text-center text-muted py-8">
            No times are available right now. Please check back soon or{" "}
            <a href="/contact" className="underline">
              reach out
            </a>
            .
          </p>
        ) : (
          <div className="space-y-6">
            {grouped.map((g) => (
              <div key={g.day}>
                <h2 className="text-sm font-semibold text-muted uppercase tracking-wide mb-2">
                  {g.day}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {g.slots.map((s) => {
                    const isSel = selected === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setSelected(s.id)}
                        className={`rounded-md border px-3 py-2.5 text-sm font-medium transition ${
                          isSel
                            ? "border-amber-500 bg-amber-500 text-white"
                            : "border-black/15 bg-white hover:border-amber-400"
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

        {/* Contact form — appears once a slot is chosen */}
        {selected && (
          <form onSubmit={handleSubmit} className="mt-10 space-y-5 border-t border-black/10 pt-8">
            <p className="text-sm text-muted">
              You picked{" "}
              <strong className="text-foreground">
                {(() => {
                  const s = slots.find((x) => x.id === selected);
                  return s ? `${dayLabel(s.startIso, zone)} at ${timeLabel(s.startIso, zone)}` : "";
                })()}
              </strong>
              . Just need your details:
            </p>
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full rounded-md border border-black/15 bg-white px-3 py-2 text-sm"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-md border border-black/15 bg-white px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="w-full rounded-md border border-black/15 bg-white px-3 py-2 text-sm"
                />
              </div>
            </div>

            {status === "error" && <p className="text-sm text-red-600">{errorMsg}</p>}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-md bg-amber-500 px-4 py-3 text-sm font-semibold text-white hover:bg-amber-600 disabled:opacity-60"
            >
              {status === "loading" ? "Requesting…" : "Request this time"}
            </button>
            <p className="text-xs text-muted text-center">
              This sends a request. You&rsquo;ll get a confirmation email once it&rsquo;s locked in.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
