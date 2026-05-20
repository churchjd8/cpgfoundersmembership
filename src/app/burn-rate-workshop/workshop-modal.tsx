"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

const stages = [
  "Idea / Pre-launch",
  "Launched, under $100K",
  "$100K to $500K",
  "$500K to $1M",
  "$1M to $5M",
  "$5M to $10M",
  "$10M+",
];

export function WorkshopModal({
  buttonStyle,
}: {
  buttonStyle: "hero" | "section" | "final";
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/workshop-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
        if (typeof fbq === "function") {
          fbq("track", "Lead", {
            content_name: "Burn Rate Workshop",
            content_category: "workshop",
            currency: "USD",
            value: 0,
          });
        }
        router.push("/burn-rate-workshop/confirmation");
        return;
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const buttonClasses =
    buttonStyle === "hero"
      ? "px-8 py-4 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors text-lg"
      : buttonStyle === "final"
        ? "px-8 py-4 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors text-lg"
        : "px-6 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors";

  return (
    <>
      <button onClick={() => setOpen(true)} className={buttonClasses}>
        Reserve My Spot &rarr;
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => {
              if (status !== "loading") setOpen(false);
            }}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6 sm:p-8 z-10 text-foreground">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-muted hover:text-foreground"
              aria-label="Close"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {status === "success" ? (
              <div className="text-center py-6">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-4">
                  <svg
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">You&rsquo;re in!</h3>
                <p className="mt-2 text-muted">
                  Check your email for the Zoom link. See you April 23rd.
                </p>
                <button
                  onClick={() => setOpen(false)}
                  className="mt-6 px-6 py-2 bg-foreground text-white rounded-lg font-semibold"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-center">
                  Save Your Spot
                </h3>
                <p className="mt-1 text-sm text-muted text-center mb-6">
                  Free 90-Minute Virtual Workshop with Jeff Church
                  <br />
                  April 23rd - Reducing the Burn: Get to Profitability Faster
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="ws-name" className="block text-sm font-medium mb-1">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="ws-name"
                      name="name"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label htmlFor="ws-email" className="block text-sm font-medium mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="ws-email"
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label htmlFor="ws-business" className="block text-sm font-medium mb-1">
                      Business Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="ws-business"
                      name="business"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label htmlFor="ws-stage" className="block text-sm font-medium mb-1">
                      Brand Stage <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="ws-stage"
                      name="stage"
                      required
                      defaultValue=""
                      className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value="" disabled>
                        Select your stage
                      </option>
                      {stages.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full px-6 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
                  >
                    {status === "loading" ? "Reserving..." : "Reserve My Spot"}
                  </button>

                  {status === "error" && (
                    <p className="text-sm text-red-500 text-center">
                      Something went wrong. Please try again.
                    </p>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
