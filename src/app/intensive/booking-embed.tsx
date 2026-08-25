"use client";

import { useEffect, useState } from "react";

// Inline Cal.com booking widget for the intro call. The instance is
// self-hosted at cal.arkpartners.ai (ARK Partners), not Cal's cloud, so both
// the loader script and the `origin` have to point there rather than at
// app.cal.com — the default origin renders an empty widget.
//
// This is the official queue-shim loader: `Cal` is defined synchronously as a
// queue so calls can be made before embed.js finishes loading, and the script
// drains the queue on arrival.

const CAL_ORIGIN = "https://cal.arkpartners.ai";
const CAL_LINK = "joshua/intro";
const NAMESPACE = "intro";

export const BOOKING_URL = `${CAL_ORIGIN}/${CAL_LINK}`;

type CalQueue = ((...args: unknown[]) => void) & {
  loaded?: boolean;
  ns?: Record<string, CalQueue>;
  q?: unknown[][];
};

declare global {
  interface Window {
    Cal?: CalQueue;
  }
}

function loadCal() {
  if (window.Cal) return window.Cal;

  const cal = function (...args: unknown[]) {
    const c = window.Cal as CalQueue;
    if (!c.loaded) {
      c.ns = {};
      c.q = c.q || [];
      const script = document.createElement("script");
      script.src = `${CAL_ORIGIN}/embed/embed.js`;
      script.async = true;
      document.head.appendChild(script);
      c.loaded = true;
    }
    if (args[0] === "init") {
      const namespace = args[1];
      if (typeof namespace === "string") {
        const api: CalQueue = Object.assign(
          (...inner: unknown[]) => {
            api.q!.push(inner);
          },
          { q: [] as unknown[][] }
        );
        c.ns![namespace] = c.ns![namespace] || api;
        c.ns![namespace].q!.push(args);
        c.q!.push(["initNamespace", namespace]);
        return;
      }
    }
    c.q!.push(args);
  } as CalQueue;

  window.Cal = cal;
  return cal;
}

export function BookingEmbed() {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const cal = loadCal();

    cal("init", NAMESPACE, { origin: CAL_ORIGIN });
    cal.ns![NAMESPACE]("inline", {
      elementOrSelector: "#cal-intro-embed",
      calLink: CAL_LINK,
      config: { layout: "month_view", theme: "light" },
    });
    cal.ns![NAMESPACE]("ui", {
      theme: "light",
      hideEventTypeDetails: false,
      layout: "month_view",
      cssVarsPerTheme: {
        light: { "cal-brand": "#a56a16" },
        dark: { "cal-brand": "#dfa13c" },
      },
    });

    // Don't trust the iframe merely existing. If cal.arkpartners.ai's
    // `frame-ancestors` CSP doesn't list this domain, the element mounts and
    // then renders nothing — a dead white box. The embed posts a message back
    // to the parent once it's genuinely alive, so that's what we wait on, and
    // it covers the blocked-frame case as well as the script never loading.
    let alive = false;
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== CAL_ORIGIN) return;
      alive = true;
      setFailed(false);
    };
    window.addEventListener("message", onMessage);

    const timer = setTimeout(() => {
      if (!alive) setFailed(true);
    }, 6000);

    return () => {
      window.removeEventListener("message", onMessage);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <div
        id="cal-intro-embed"
        className={
          failed
            ? "hidden"
            : "min-h-[640px] w-full overflow-hidden rounded-2xl border border-border bg-card"
        }
      />
      {failed && <BookingFallback />}
    </>
  );
}

function BookingFallback() {
  return (
    <div className="rounded-2xl border border-border bg-card p-10 text-center">
        <p className="text-muted leading-relaxed">
          The scheduler didn&rsquo;t load. You can book directly here instead.
        </p>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center px-8 py-4 rounded-lg bg-accent hover:bg-accent-dark text-white font-semibold transition-colors"
      >
        Book your intro call
      </a>
    </div>
  );
}
