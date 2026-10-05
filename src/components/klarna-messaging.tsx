"use client";

import { useEffect, useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";

/**
 * Stripe's Payment Method Messaging Element: the "4 interest-free payments
 * of $X with Klarna" line plus its info modal. Stripe and Klarna generate the
 * wording and the numbers, so the terms shown are always the real ones for
 * the visitor's country. Renders nothing where Klarna isn't offered.
 */
export function KlarnaMessaging({
  publishableKey,
  amountUsd,
  dark = false,
  centered = false,
  className,
}: {
  publishableKey: string;
  amountUsd: number;
  dark?: boolean;
  centered?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let unmount: (() => void) | undefined;

    loadStripe(publishableKey)
      .then((stripe) => {
        if (!stripe || cancelled || !ref.current) return;
        const elements = stripe.elements({
          appearance: {
            theme: dark ? "night" : "stripe",
            rules: centered
              ? { ".PaymentMethodMessaging": { textAlign: "center" } }
              : undefined,
          },
        });
        const element = elements.create("paymentMethodMessaging", {
          amount: amountUsd * 100,
          currency: "USD",
          paymentMethodTypes: ["klarna"],
        });
        element.mount(ref.current);
        unmount = () => element.destroy();
      })
      .catch(() => {
        // Messaging is a nice-to-have. The buy button works without it.
      });

    return () => {
      cancelled = true;
      unmount?.();
    };
  }, [publishableKey, amountUsd, dark, centered]);

  return <div ref={ref} className={className} />;
}
