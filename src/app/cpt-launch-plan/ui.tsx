"use client";

import { useState, useSyncExternalStore, type ReactNode } from "react";

// Client-only "today", at day granularity so the snapshot is stable across
// renders. null on the server, so nothing date-dependent hydrates wrong.
const noop = () => () => {};
function useToday(): number | null {
  return useSyncExternalStore(noop, () => Math.floor(Date.now() / 86_400_000) * 86_400_000, () => null);
}

const LAUNCH_MS = new Date("2026-11-17T00:00:00-08:00").getTime();

// Rendered on the client so the number is right on the day it's viewed, not
// the day the page was built.
export function Countdown() {
  const today = useToday();
  if (today === null) return <span className="opacity-0">00 days</span>;
  const days = Math.max(0, Math.ceil((LAUNCH_MS - today) / 86_400_000));
  if (days === 0) return <span>Launch day</span>;
  return (
    <span>
      {days} {days === 1 ? "day" : "days"} out
    </span>
  );
}

// Native <details>, styled. No state to manage, works without JS, and the
// browser remembers nothing, which is what we want for a plan that changes.
export function Section({
  title,
  kicker,
  defaultOpen = false,
  tone = "plain",
  children,
}: {
  title: string;
  kicker?: string;
  defaultOpen?: boolean;
  tone?: "plain" | "dark";
  children: ReactNode;
}) {
  const dark = tone === "dark";
  return (
    <details
      open={defaultOpen}
      className={`group rounded-xl border ${dark ? "border-white/10 bg-foreground text-white" : "border-border bg-card"}`}
    >
      <summary className="flex cursor-pointer select-none items-center gap-3 px-5 py-4 list-none [&::-webkit-details-marker]:hidden">
        <span
          className={`inline-block transition-transform group-open:rotate-90 ${dark ? "text-gold" : "text-accent"}`}
          aria-hidden
        >
          &#9656;
        </span>
        <span className="flex-1">
          {kicker && (
            <span className={`block text-xs font-bold uppercase tracking-wider ${dark ? "text-gold" : "text-accent"}`}>
              {kicker}
            </span>
          )}
          <span className="font-bold text-lg leading-snug">{title}</span>
        </span>
      </summary>
      <div className={`px-5 pb-5 ${dark ? "text-white/85" : ""}`}>{children}</div>
    </details>
  );
}

export function CopyButton({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          setTimeout(() => setDone(false), 1500);
        } catch {
          // Clipboard blocked: the text is on screen, select it by hand.
        }
      }}
      className="rounded-full border border-accent px-3 py-1 text-xs font-semibold text-accent hover:bg-accent hover:text-white transition-colors"
    >
      {done ? "Copied" : "Copy post"}
    </button>
  );
}

export type WeekBlock = {
  start: string; // ISO date, Monday
  end: string; // ISO date, Sunday
  tag: string;
  dates: string;
  theme: string;
  flag?: string;
  items: { who: string; text: string }[];
};

function statusOf(w: WeekBlock, now: number): "past" | "now" | "future" {
  const start = new Date(`${w.start}T00:00:00-08:00`).getTime();
  const end = new Date(`${w.end}T23:59:59-08:00`).getTime();
  if (now > end) return "past";
  if (now >= start) return "now";
  return "future";
}

export function Who({ who }: { who: string }) {
  return (
    <span className="inline-block flex-shrink-0 rounded-full bg-accent-light px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-accent-dark">
      {who}
    </span>
  );
}

// The current week opens by default; past weeks collapse and dim.
export function WeekList({ weeks }: { weeks: WeekBlock[] }) {
  const now = useToday();

  return (
    <div className="space-y-3">
      {weeks.map((w) => {
        const status = now === null ? "future" : statusOf(w, now);
        return (
          <details
            key={w.tag}
            open={status === "now"}
            className={`group rounded-xl border bg-card ${
              status === "now" ? "border-accent" : "border-border"
            } ${status === "past" ? "opacity-60" : ""}`}
          >
            <summary className="flex cursor-pointer select-none items-center gap-3 px-5 py-4 list-none [&::-webkit-details-marker]:hidden">
              <span className="inline-block text-accent transition-transform group-open:rotate-90" aria-hidden>
                &#9656;
              </span>
              <span className="flex-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-accent">{w.tag}</span>
                <span className="font-bold">{w.dates}</span>
                <span className="text-sm text-muted">{w.theme}</span>
              </span>
              {status === "now" && (
                <span className="rounded-full bg-foreground px-2.5 py-0.5 text-xs font-bold text-gold">This week</span>
              )}
              {status === "past" && (
                <span className="rounded-full bg-border px-2.5 py-0.5 text-xs font-bold text-muted">Done</span>
              )}
              {status === "future" && w.flag && (
                <span className="rounded-full bg-accent-light px-2.5 py-0.5 text-xs font-bold text-accent-dark">{w.flag}</span>
              )}
            </summary>
            <ul className="space-y-3 px-5 pb-5">
              {w.items.map((it) => (
                <li key={it.text} className="flex gap-3 items-start">
                  <Who who={it.who} />
                  <span className="text-sm leading-relaxed">{it.text}</span>
                </li>
              ))}
            </ul>
          </details>
        );
      })}
    </div>
  );
}
