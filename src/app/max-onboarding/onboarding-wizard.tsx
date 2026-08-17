"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  AGREEMENT_SECTIONS,
  AGREEMENT_VERSION,
  ENGAGEMENT,
  WHATS_INCLUDED,
} from "@/lib/max-agreement";

type Step = 1 | 2 | 3;
type Plan = "monthly" | "full";

const STEPS: { n: Step; label: string }[] = [
  { n: 1, label: "Overview" },
  { n: 2, label: "Agreement" },
  { n: 3, label: "Payment" },
];

export function OnboardingWizard() {
  const [step, setStep] = useState<Step>(1);

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <Stepper current={step} />
      <div className="mt-10">
        {step === 1 && <OverviewStep onNext={() => setStep(2)} />}
        {step === 2 && (
          <AgreementStep onBack={() => setStep(1)} onSigned={() => setStep(3)} />
        )}
        {step === 3 && <PaymentStep onBack={() => setStep(2)} />}
      </div>
    </div>
  );
}

function Stepper({ current }: { current: Step }) {
  return (
    <ol className="flex items-center justify-center gap-2 sm:gap-4">
      {STEPS.map((s, i) => {
        const active = s.n === current;
        const done = s.n < current;
        return (
          <li key={s.n} className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                  active
                    ? "bg-accent text-white"
                    : done
                      ? "bg-accent-light text-accent-dark"
                      : "bg-stone-200 text-muted"
                }`}
              >
                {done ? "✓" : s.n}
              </span>
              <span
                className={`hidden text-sm font-medium sm:inline ${
                  active ? "text-foreground" : "text-muted"
                }`}
              >
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <span className="h-px w-6 bg-border sm:w-12" aria-hidden />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      {children}
    </div>
  );
}

/* ----------------------------- Step 1: Overview ---------------------------- */

function OverviewStep({ onNext }: { onNext: () => void }) {
  return (
    <Card>
      <p className="text-sm font-semibold uppercase tracking-wide text-accent">
        Welcome, Max
      </p>
      <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
        Let&apos;s get you onboarded.
      </h1>
      <p className="mt-4 text-muted leading-relaxed">
        Here&apos;s everything we talked through, in one place, before we make it
        official. Three quick steps: review what&apos;s included, sign the
        agreement, and set up payment. Should take about five minutes.
      </p>

      <h2 className="mt-8 text-lg font-semibold">What working with Jeff looks like</h2>
      <ul className="mt-4 space-y-3">
        {WHATS_INCLUDED.map((item) => (
          <li key={item} className="flex gap-3 text-foreground">
            <span className="mt-1 text-accent" aria-hidden>
              &#10003;
            </span>
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 rounded-xl bg-accent-light/60 p-5">
        <h3 className="font-semibold text-accent-dark">Your investment</h3>
        <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-serif text-lg text-muted line-through">
            ${ENGAGEMENT.standardTotalUsd.toLocaleString()}
          </span>
          <span className="font-serif text-3xl font-bold text-foreground">
            ${ENGAGEMENT.totalInitialUsd.toLocaleString()}
          </span>
          <span className="text-lg text-muted">
            ${ENGAGEMENT.initialFeeUsd.toLocaleString()}/month &times;{" "}
            {ENGAGEMENT.initialMonths}
          </span>
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            Friends &amp; family rate
          </span>
        </div>
        <p className="mt-3 text-foreground leading-relaxed">
          The {ENGAGEMENT.initialMonths}-month intensive is normally $
          {ENGAGEMENT.standardTotalUsd.toLocaleString()}. Because of the history
          here, yours is ${ENGAGEMENT.totalInitialUsd.toLocaleString()} — a $
          {ENGAGEMENT.friendsAndFamilySavingsUsd.toLocaleString()} write-down —
          billed at ${ENGAGEMENT.initialFeeUsd.toLocaleString()}/month across the
          three months, or paid in full up front if that&apos;s easier. After the
          three months, you can continue month-to-month at a rate we&apos;ll set
          together before the term ends, based on how much of Jeff&apos;s time makes
          sense for where {ENGAGEMENT.business} is headed.
        </p>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={onNext}
          className="rounded-full bg-accent px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-dark"
        >
          Review the agreement &rarr;
        </button>
      </div>
    </Card>
  );
}

/* ---------------------------- Step 2: Agreement ---------------------------- */

function AgreementStep({
  onBack,
  onSigned,
}: {
  onBack: () => void;
  onSigned: () => void;
}) {
  const [fullName, setFullName] = useState<string>(ENGAGEMENT.clientName);
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const padRef = useRef<SignaturePadHandle>(null);

  const emailOk = /.+@.+\..+/.test(email);
  const canSubmit =
    fullName.trim().length > 1 && emailOk && agreed && hasDrawn && !submitting;

  async function handleSubmit() {
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    try {
      const signatureImage = padRef.current?.toDataURL() ?? "";
      const res = await fetch("/api/max-onboarding/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          signatureImage,
          agreementVersion: AGREEMENT_VERSION,
          signedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Could not record your signature.");
      }
      // Stash email + name so the payment step can prefill Stripe Checkout.
      sessionStorage.setItem(
        "maxOnboarding",
        JSON.stringify({ fullName: fullName.trim(), email: email.trim() }),
      );
      onSigned();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card>
      <h1 className="font-serif text-2xl font-bold tracking-tight sm:text-3xl">
        Advisory Services Agreement
      </h1>
      <p className="mt-2 text-sm text-muted">
        Between{" "}
        <strong className="text-foreground">{ENGAGEMENT.providerName}</strong> (
        {ENGAGEMENT.providerAddress}) and{" "}
        <strong className="text-foreground">{ENGAGEMENT.clientName}</strong> on
        behalf of {ENGAGEMENT.business}. Effective {ENGAGEMENT.effectiveDateLabel}.
      </p>

      <div className="mt-5 max-h-72 overflow-y-auto rounded-xl border border-border bg-background p-5 text-sm leading-relaxed">
        {AGREEMENT_SECTIONS.map((s) => (
          <div key={s.title} className="mb-4 last:mb-0">
            <h3 className="font-semibold text-foreground">{s.title}</h3>
            <p className="mt-1 text-muted">{s.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium">Full legal name</span>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-foreground outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Email for receipts &amp; records</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="max@example.com"
            className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-foreground outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </label>
      </div>

      <div className="mt-5">
        <span className="text-sm font-medium">Sign here</span>
        <SignaturePad ref={padRef} onChange={setHasDrawn} />
      </div>

      <label className="mt-5 flex items-start gap-3 text-sm text-muted">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-1 h-4 w-4 accent-[var(--accent)]"
        />
        <span>
          I, {fullName || "the undersigned"}, have read and agree to this Advisory
          Services Agreement. I understand my signature here is the legal equivalent
          of a handwritten signature and authorizes the payment described in the next
          step.
        </span>
      </label>

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-sm font-medium text-muted hover:text-foreground"
        >
          &larr; Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="rounded-full bg-accent px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-40"
        >
          {submitting ? "Saving…" : "Sign & continue to payment →"}
        </button>
      </div>
    </Card>
  );
}

/* --------------------------- Signature pad (canvas) ------------------------ */

type SignaturePadHandle = {
  toDataURL: () => string;
  clear: () => void;
};

const SignaturePad = forwardRef<
  SignaturePadHandle,
  { onChange: (drawn: boolean) => void }
>(function SignaturePad({ onChange }, ref) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const drawn = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ratio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(ratio, ratio);
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.strokeStyle = "#1c1917";
    }
  }, []);

  function clear() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawn.current = false;
    onChange(false);
  }

  function pos(e: React.PointerEvent<HTMLCanvasElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }
  function start(e: React.PointerEvent<HTMLCanvasElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    drawing.current = true;
    const ctx = canvasRef.current?.getContext("2d");
    const { x, y } = pos(e);
    ctx?.beginPath();
    ctx?.moveTo(x, y);
  }
  function move(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current) return;
    const ctx = canvasRef.current?.getContext("2d");
    const { x, y } = pos(e);
    ctx?.lineTo(x, y);
    ctx?.stroke();
    if (!drawn.current) {
      drawn.current = true;
      onChange(true);
    }
  }
  function end() {
    drawing.current = false;
  }

  useImperativeHandle(ref, () => ({
    toDataURL: () => canvasRef.current?.toDataURL("image/png") ?? "",
    clear,
  }));

  return (
    <div className="mt-1">
      <canvas
        ref={canvasRef}
        onPointerDown={start}
        onPointerMove={move}
        onPointerUp={end}
        onPointerLeave={end}
        className="h-40 w-full touch-none rounded-lg border border-border bg-white"
      />
      <button
        type="button"
        onClick={clear}
        className="mt-2 text-xs font-medium text-muted hover:text-foreground"
      >
        Clear signature
      </button>
    </div>
  );
});

/* ----------------------------- Step 3: Payment ----------------------------- */

function PaymentStep({ onBack }: { onBack: () => void }) {
  const [plan, setPlan] = useState<Plan>("monthly");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePay() {
    setLoading(true);
    setError(null);
    try {
      let stash: { fullName?: string; email?: string } = {};
      try {
        stash = JSON.parse(sessionStorage.getItem("maxOnboarding") || "{}");
      } catch {
        stash = {};
      }
      const res = await fetch("/api/max-onboarding/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...stash, plan }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Could not start checkout.");
      }
      window.location.href = data.url as string;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <Card>
      <h1 className="font-serif text-2xl font-bold tracking-tight sm:text-3xl">
        Choose how you&apos;d like to pay
      </h1>
      <p className="mt-2 text-muted leading-relaxed">
        Last step. Both options are the same $
        {ENGAGEMENT.totalInitialUsd.toLocaleString()} friends &amp; family total
        (down from ${ENGAGEMENT.standardTotalUsd.toLocaleString()}). Pick whichever
        works better for your cash flow, then you&apos;ll be taken to our secure
        Stripe checkout to enter your card or bank details. Billing starts today.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => setPlan("monthly")}
          className={`rounded-xl border p-5 text-left transition-colors ${
            plan === "monthly"
              ? "border-accent bg-accent-light/40 ring-1 ring-accent"
              : "border-border bg-background hover:border-accent/50"
          }`}
        >
          <div className="flex items-baseline justify-between">
            <span className="font-medium">Monthly</span>
            <span className="font-serif text-2xl font-bold">
              ${ENGAGEMENT.initialFeeUsd.toLocaleString()}
              <span className="text-base font-normal text-muted">/mo</span>
            </span>
          </div>
          <p className="mt-2 text-sm text-muted">
            Billed monthly via Stripe across your {ENGAGEMENT.initialMonths}-month
            commitment (${ENGAGEMENT.totalInitialUsd.toLocaleString()} total).
          </p>
        </button>

        <button
          type="button"
          onClick={() => setPlan("full")}
          className={`rounded-xl border p-5 text-left transition-colors ${
            plan === "full"
              ? "border-accent bg-accent-light/40 ring-1 ring-accent"
              : "border-border bg-background hover:border-accent/50"
          }`}
        >
          <div className="flex items-baseline justify-between">
            <span className="font-medium">Pay in full</span>
            <span className="font-serif text-2xl font-bold">
              ${ENGAGEMENT.totalInitialUsd.toLocaleString()}
            </span>
          </div>
          <p className="mt-2 text-sm text-muted">
            One payment up front for the full {ENGAGEMENT.initialMonths}-month
            intensive. Nothing else to think about.
          </p>
        </button>
      </div>

      <p className="mt-4 text-sm text-muted">
        After the {ENGAGEMENT.initialMonths}-month intensive, you can continue
        month-to-month at a rate we&apos;ll set together before the term ends, and
        cancel anytime with {ENGAGEMENT.cancelNoticeDays} days&apos; notice.
      </p>

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-sm font-medium text-muted hover:text-foreground"
        >
          &larr; Back
        </button>
        <button
          onClick={handlePay}
          disabled={loading}
          className="rounded-full bg-accent px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading ? "Redirecting…" : "Continue to secure payment →"}
        </button>
      </div>

      <p className="mt-4 text-center text-xs text-muted">
        Payments are processed securely by Stripe. We never see your card details.
      </p>
    </Card>
  );
}
