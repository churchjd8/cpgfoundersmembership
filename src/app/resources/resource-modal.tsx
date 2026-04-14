"use client";

import { useState, type FormEvent } from "react";

export function ResourceModal({
  resourceName,
  buttonLabel,
  buttonClass,
}: {
  resourceName: string;
  buttonLabel: string;
  buttonClass?: string;
}) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/resource-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, resource: resourceName }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
          setStatus("idle");
        }}
        className={
          buttonClass ||
          "inline-flex items-center justify-center px-5 py-2.5 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors text-sm"
        }
      >
        {buttonLabel}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => {
              if (status !== "loading") setOpen(false);
            }}
          />

          <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6 sm:p-8 z-10 text-foreground">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-muted hover:text-foreground"
              aria-label="Close"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {status === "success" ? (
              <div className="text-center py-6">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-4">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Check your email!</h3>
                <p className="mt-2 text-muted">
                  We&rsquo;re sending <span className="font-semibold text-foreground">{resourceName}</span> to your inbox now.
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
                <h3 className="text-lg font-bold text-center">Get Free Access</h3>
                <p className="mt-1 text-sm text-muted text-center mb-6">
                  {resourceName}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor={`res-name-${resourceName}`} className="block text-sm font-medium mb-1">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id={`res-name-${resourceName}`}
                      name="name"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label htmlFor={`res-email-${resourceName}`} className="block text-sm font-medium mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id={`res-email-${resourceName}`}
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label htmlFor={`res-stage-${resourceName}`} className="block text-sm font-medium mb-1">
                      What stage is your business in? <span className="text-red-500">*</span>
                    </label>
                    <select
                      id={`res-stage-${resourceName}`}
                      name="stage"
                      required
                      defaultValue=""
                      className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value="" disabled>Select one...</option>
                      <option value="Idea / Pre-launch">Idea / Pre-launch</option>
                      <option value="Just launched (under $500K)">Just launched (under $500K)</option>
                      <option value="Growing ($500K - $2M)">Growing ($500K - $2M)</option>
                      <option value="Scaling ($2M - $10M)">Scaling ($2M - $10M)</option>
                      <option value="Established ($10M+)">Established ($10M+)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor={`res-challenge-${resourceName}`} className="block text-sm font-medium mb-1">
                      Biggest challenge right now? <span className="text-red-500">*</span>
                    </label>
                    <select
                      id={`res-challenge-${resourceName}`}
                      name="challenge"
                      required
                      defaultValue=""
                      className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value="" disabled>Select one...</option>
                      <option value="Fundraising">Fundraising</option>
                      <option value="Launching my product">Launching my product</option>
                      <option value="Profitability">Profitability</option>
                      <option value="Getting retail distribution">Getting retail distribution</option>
                      <option value="Cash management / runway">Cash management / runway</option>
                      <option value="Scaling operations">Scaling operations</option>
                      <option value="Building my team">Building my team</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full px-6 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
                  >
                    {status === "loading" ? "Sending..." : "Send it to me"}
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
