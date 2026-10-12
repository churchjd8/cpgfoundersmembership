"use client";

import { useEffect, useState } from "react";

function remaining(expiresAt: number) {
  const diff = Math.max(0, expiresAt - Date.now());
  return {
    hours: Math.floor(diff / (1000 * 60 * 60)),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

/** Hours, minutes and seconds left until a founder-offer deadline. */
export function OfferCountdown({ expiresAt, dark = false }: { expiresAt: number; dark?: boolean }) {
  // Starts empty so the server render and the first client render match.
  const [time, setTime] = useState<ReturnType<typeof remaining> | null>(null);

  useEffect(() => {
    const tick = () => setTime(remaining(expiresAt));
    const first = setTimeout(tick, 0);
    const interval = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(interval);
    };
  }, [expiresAt]);

  const blocks = [
    { value: time?.hours, label: "Hours" },
    { value: time?.minutes, label: "Minutes" },
    { value: time?.seconds, label: "Seconds" },
  ];

  return (
    <div className="flex gap-3" role="timer" aria-label="Time left at the founder price">
      {blocks.map((block) => (
        <div key={block.label} className="text-center">
          <div className={`flex h-14 w-14 items-center justify-center rounded-lg ${dark ? "bg-white/10 text-white" : "bg-foreground text-white"}`}>
            <span className="text-xl font-bold tabular-nums">
              {block.value === undefined ? "--" : String(block.value).padStart(2, "0")}
            </span>
          </div>
          <p className={`mt-1 text-xs ${dark ? "text-white/55" : "text-muted"}`}>{block.label}</p>
        </div>
      ))}
    </div>
  );
}
