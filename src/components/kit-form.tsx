"use client";

import { useState, type FormEvent } from "react";

// The single opt-in used everywhere a kit is offered.
//
// Two shells around one form: an inline panel for "send me everything", and a
// modal for the individual kit cards. Both post to /api/kit-signup, so a kit
// can be offered from any page without inventing new plumbing.

export type KitTarget = "all" | "profitability" | "fundraising" | "starting-line";

type Shared = {
  kit: KitTarget;
  source: "resources" | "toolbox";
  /** "full" also asks stage + challenge — the segmentation Jeff actually sorts on. */
  fields?: "minimal" | "full";
  idPrefix: string;
};

const STAGES = [
  "Idea / Pre-launch (not selling yet)",
  "Launched (early sales, building consistency)",
  "Growing / Scaling (repeatable growth + traction)",
  "Established (strong sales + team + systems)",
];

const CHALLENGES = [
  "Fundraising",
  "Launching my product",
  "Profitability",
  "Getting retail distribution",
  "Cash management / runway",
  "Scaling operations",
  "Building my team",
];

function useKitSubmit(kit: KitTarget, source: Shared["source"]) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorDetail, setErrorDetail] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorDetail("");

    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const res = await fetch("/api/kit-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, kit, source }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setErrorDetail(err.error || `Error ${res.status}`);
        setStatus("error");
        return;
      }

      // A single kit has a page of its own — send them there to start watching
      // while the email lands behind them.
      const { redirectTo } = await res.json().catch(() => ({ redirectTo: null }));
      if (redirectTo) {
        window.location.href = redirectTo;
        return;
      }
      setStatus("success");
    } catch {
      setErrorDetail("Network error");
      setStatus("error");
    }
  }

  return { status, errorDetail, submit, setStatus };
}

function Fields({
  idPrefix,
  fields,
  dark,
}: {
  idPrefix: string;
  fields: "minimal" | "full";
  dark: boolean;
}) {
  const labelClass = `block text-sm font-medium mb-1 ${dark ? "text-white/80" : ""}`;
  const inputClass = `w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-accent ${
    dark ? "bg-white/10 border-white/20 text-white placeholder-white/40" : "bg-white border-border"
  }`;

  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor={`${idPrefix}-first`} className={labelClass}>
            First name
          </label>
          <input
            type="text"
            id={`${idPrefix}-first`}
            name="firstName"
            autoComplete="given-name"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-last`} className={labelClass}>
            Last name
          </label>
          <input
            type="text"
            id={`${idPrefix}-last`}
            name="lastName"
            autoComplete="family-name"
            required
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor={`${idPrefix}-email`} className={labelClass}>
          Email
        </label>
        <input
          type="email"
          id={`${idPrefix}-email`}
          name="email"
          autoComplete="email"
          required
          className={inputClass}
        />
      </div>

      {fields === "full" && (
        <>
          <div>
            <label htmlFor={`${idPrefix}-stage`} className={labelClass}>
              What stage is your business in?
            </label>
            <select
              id={`${idPrefix}-stage`}
              name="stage"
              required
              defaultValue=""
              className={inputClass}
            >
              <option value="" disabled>
                Select one...
              </option>
              {STAGES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor={`${idPrefix}-challenge`} className={labelClass}>
              Biggest challenge right now?
            </label>
            <select
              id={`${idPrefix}-challenge`}
              name="challenge"
              required
              defaultValue=""
              className={inputClass}
            >
              <option value="" disabled>
                Select one...
              </option>
              {CHALLENGES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </>
  );
}

function SuccessPanel({ dark, headline }: { dark: boolean; headline: string }) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-green-100 text-green-600 mb-4">
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className={`text-xl font-bold ${dark ? "text-white" : ""}`}>{headline}</h3>
      <p className={`mt-2 leading-relaxed ${dark ? "text-white/70" : "text-muted"}`}>
        It&rsquo;s on its way in one email from Jeff. If it&rsquo;s not there in a couple of
        minutes, check promotions or spam and drag it over.
      </p>
    </div>
  );
}

/** Inline opt-in panel — the "send me everything" surface. */
export function KitOptIn({
  kit,
  source,
  fields = "full",
  idPrefix,
  variant = "light",
  heading = "Send me everything",
  subheading = "One email. Every kit in it. No cost, no call, no pitch.",
  buttonLabel = "Send me everything",
}: Shared & {
  variant?: "light" | "dark";
  heading?: string;
  subheading?: string;
  buttonLabel?: string;
}) {
  const dark = variant === "dark";
  const { status, errorDetail, submit } = useKitSubmit(kit, source);

  const shell = `rounded-2xl p-6 sm:p-8 ${
    dark ? "bg-white/10 border border-white/20" : "bg-card border border-border"
  }`;

  if (status === "success") {
    return (
      <div className={shell}>
        <SuccessPanel dark={dark} headline="Check your inbox." />
      </div>
    );
  }

  return (
    <div className={shell}>
      <h3 className={`text-xl font-bold ${dark ? "text-white" : ""}`}>{heading}</h3>
      <p className={`mt-1 text-sm ${dark ? "text-white/60" : "text-muted"}`}>{subheading}</p>

      <form onSubmit={submit} className="mt-6 space-y-4">
        <Fields idPrefix={idPrefix} fields={fields} dark={dark} />

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full px-6 py-4 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50 text-lg"
        >
          {status === "loading" ? "Sending..." : `${buttonLabel} →`}
        </button>

        {status === "error" && (
          <p className={`text-sm text-center ${dark ? "text-red-400" : "text-red-500"}`}>
            Something went wrong. Please try again.{errorDetail && ` (${errorDetail})`}
          </p>
        )}
      </form>
    </div>
  );
}

/** Button + modal — used on the individual kit cards. */
export function KitModal({
  kit,
  source,
  fields = "full",
  idPrefix,
  kitName,
  buttonLabel,
  buttonClass,
}: Shared & {
  kitName: string;
  buttonLabel: string;
  buttonClass?: string;
}) {
  const [open, setOpen] = useState(false);
  const { status, errorDetail, submit, setStatus } = useKitSubmit(kit, source);

  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
          setStatus("idle");
        }}
        className={
          buttonClass ||
          "w-full inline-flex items-center justify-center px-5 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors"
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

          <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6 sm:p-8 z-10 text-foreground max-h-[90vh] overflow-y-auto">
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
              <div className="py-6">
                <SuccessPanel dark={false} headline="Check your inbox." />
                <button
                  onClick={() => setOpen(false)}
                  className="mt-6 w-full px-6 py-3 bg-foreground text-white rounded-lg font-semibold"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-bold text-center pr-6">Get the kit, free</h3>
                <p className="mt-1 text-sm text-muted text-center mb-6">{kitName}</p>

                <form onSubmit={submit} className="space-y-4">
                  <Fields idPrefix={idPrefix} fields={fields} dark={false} />

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full px-6 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
                  >
                    {status === "loading" ? "Sending..." : "Send it to me"}
                  </button>

                  {status === "error" && (
                    <p className="text-sm text-red-500 text-center">
                      Something went wrong. Please try again.{errorDetail && ` (${errorDetail})`}
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
