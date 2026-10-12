"use client";

import { useEffect, useState, type ReactNode } from "react";

const STARTED_KEY = "free_training_started_at";

/**
 * Holds the offer back until the viewer has been on the training for as long
 * as it takes Jeff to reach it. The start time is remembered, so anyone who
 * comes back later sees the offer straight away.
 */
export function OfferReveal({ afterMinutes, children }: { afterMinutes: number; children: ReactNode }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let startedAt = Date.now();
    try {
      const stored = Number(window.localStorage.getItem(STARTED_KEY));
      if (stored > 0) startedAt = stored;
      else window.localStorage.setItem(STARTED_KEY, String(startedAt));
    } catch {
      // No storage (private mode): the offer shows after one full viewing.
    }

    const wait = Math.max(0, startedAt + afterMinutes * 60 * 1000 - Date.now());
    const timer = setTimeout(() => setVisible(true), wait);
    return () => clearTimeout(timer);
  }, [afterMinutes]);

  if (!visible) return null;
  return <>{children}</>;
}
