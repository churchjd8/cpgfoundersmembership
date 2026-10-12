"use client";

import type { ReactNode } from "react";

// Same plain-form POST to /api/mba-checkout as the regular MBA page. With
// `founder`, the route charges the founder price while this visitor's window
// is still open.
export function CheckoutButton({
  founder,
  valueUsd,
  className,
  children,
}: {
  founder: boolean;
  valueUsd: number;
  className: string;
  children: ReactNode;
}) {
  function trackCheckout() {
    const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
    if (typeof fbq === "function") {
      fbq("track", "InitiateCheckout", { content_name: "MBA for CPG", currency: "USD", value: valueUsd });
    }
  }

  return (
    <form action="/api/mba-checkout" method="POST" onSubmit={trackCheckout}>
      <input type="hidden" name="plan" value="full" />
      {founder && <input type="hidden" name="offer" value="founder" />}
      <button type="submit" className={`${className} cursor-pointer`}>
        {children}
      </button>
    </form>
  );
}
