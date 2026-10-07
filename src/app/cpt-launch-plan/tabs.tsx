"use client";

import { useSyncExternalStore, type ReactNode } from "react";

// Hash-driven tabs. #timeline, #linkedin, etc. deep-link straight to a tab so
// the two of us can text each other a link to the exact part of the plan.

export type Tab = { id: string; label: string; content: ReactNode };

function subscribeHash(cb: () => void) {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
}
function getHash() {
  return window.location.hash.replace("#", "");
}

export function Tabs({ tabs }: { tabs: Tab[] }) {
  const hash = useSyncExternalStore(subscribeHash, getHash, () => "");
  const active = tabs.some((t) => t.id === hash) ? hash : tabs[0].id;

  function pick(id: string) {
    history.replaceState(null, "", `#${id}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    window.scrollTo({ top: 0 });
  }

  const current = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <>
      <div className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <nav className="-mb-px flex gap-1 overflow-x-auto" aria-label="Sections">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => pick(t.id)}
                aria-current={t.id === active ? "page" : undefined}
                className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
                  t.id === active
                    ? "border-accent text-foreground"
                    : "border-transparent text-muted hover:text-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 md:py-10">{current.content}</div>
    </>
  );
}
