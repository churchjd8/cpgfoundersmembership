"use client";

import { useEffect } from "react";

/** Reports a completed MBA sale to the Meta pixel, once per checkout session. */
export function PurchasePixel({ sessionId, valueUsd }: { sessionId: string; valueUsd: number }) {
  useEffect(() => {
    const key = `mba_purchase_tracked_${sessionId}`;
    try {
      if (window.sessionStorage.getItem(key)) return;
      window.sessionStorage.setItem(key, "1");
    } catch {
      // No storage: track anyway.
    }
    const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
    if (typeof fbq === "function") {
      fbq("track", "Purchase", { content_name: "MBA for CPG", currency: "USD", value: valueUsd });
    }
  }, [sessionId, valueUsd]);

  return null;
}
