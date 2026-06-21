"use client";

import { useMemo, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";

type UsageFrequency =
  | "daily-weekly"
  | "few-times"
  | "once-twice"
  | "not-at-all";

type FormState = {
  name: string;
  email: string;
  role: string;
  cpgCategory: string;
  cpgCategoryOther: string;
  businessStage: string;
  businessStageOther: string;
  usageFrequency: UsageFrequency | "";
  workflow: string;
  biggestValue: string;
  ratingOverall: number | null;
  ratingEase: number | null;
  ratingUI: number | null;
  ratingJobHelp: number | null;
  gurusUsed: string;
  discoveryHelp: string;
  discoveryHelpOther: string;
  competingTools: string[];
  competingToolsOther: string;
  wouldUpgrade: string;
  pricePoint: string;
  pricePointOther: string;
  whatWouldChange: string;
  nps: number | null;
  openFeedback: string;
};

const INITIAL_STATE: FormState = {
  name: "",
  email: "",
  role: "",
  cpgCategory: "",
  cpgCategoryOther: "",
  businessStage: "",
  businessStageOther: "",
  usageFrequency: "",
  workflow: "",
  biggestValue: "",
  ratingOverall: null,
  ratingEase: null,
  ratingUI: null,
  ratingJobHelp: null,
  gurusUsed: "",
  discoveryHelp: "",
  discoveryHelpOther: "",
  competingTools: [],
  competingToolsOther: "",
  wouldUpgrade: "",
  pricePoint: "",
  pricePointOther: "",
  whatWouldChange: "",
  nps: null,
  openFeedback: "",
};

const CPG_CATEGORIES = [
  "Beverage (non-alcoholic)",
  "Food / Snacks",
  "Confectionery & Chocolate",
  "Health & Wellness / Supplements",
  "Pet Care",
  "Alcohol & Spirits",
  "Other",
];

const BUSINESS_STAGES = [
  "Pre-launch (not yet selling)",
  "Launched — online / DTC only",
  "Launched — omnichannel (retail + online)",
  "B2B — local distribution",
  "B2B — regional distribution",
  "B2B — national distribution",
  "Other",
];

const USAGE_OPTIONS: { value: UsageFrequency; label: string; sub: string }[] = [
  {
    value: "daily-weekly",
    label: "Daily or weekly",
    sub: "Babu is part of my regular workflow",
  },
  {
    value: "few-times",
    label: "A few times this month",
    sub: "I come back when something specific comes up",
  },
  {
    value: "once-twice",
    label: "Once or twice since signup",
    sub: "I tried it but haven't been back much",
  },
  {
    value: "not-at-all",
    label: "Not at all since signup",
    sub: "I signed up but never really used it",
  },
];

const GURU_OPTIONS = [
  { value: "yes-multiple", label: "Yes — I use multiple Gurus regularly" },
  { value: "yes-few", label: "Yes — I have tried a few" },
  { value: "no-didnt-know", label: "No — I did not know they existed" },
  { value: "no-couldnt-find", label: "No — I tried to find them but could not" },
];

const DISCOVERY_OPTIONS = [
  "Onboarding tutorial or guided walkthrough",
  "Prominent menu or sidebar showing all options",
  "Guidance through suggestions or recommendations within the chat",
  "Better naming or descriptions",
  "Pop-up or prompt on first login",
  "Other",
];

const TOOL_OPTIONS = [
  "Free LLM (ChatGPT, Claude, Gemini, etc.)",
  "Paid LLM subscription (ChatGPT Plus, Claude Pro, etc.)",
  "Amazon product analytics tool (e.g., Jungle Scout, Helium 10)",
  "Industry consultant or advisor",
  "Other",
];

const UPGRADE_OPTIONS = [
  { value: "yes", label: "Yes — definitely interested" },
  { value: "maybe", label: "Maybe — depends on price and features" },
  { value: "no", label: "No — not interested" },
];

const PRICE_OPTIONS = [
  "$20–$49 per month",
  "$50–$99 per month",
  "$100 or more per month",
  "Too expensive at any price",
  "Other",
];

export default function BabuBetaSurveyPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [stepIndex, setStepIndex] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const isDormant = form.usageFrequency === "not-at-all";

  const steps = useMemo(() => {
    const list: { id: string; title: string; valid: () => boolean; render: () => ReactNode }[] = [
      {
        id: "intro",
        title: "Welcome",
        valid: () => true,
        render: () => <IntroStep />,
      },
      {
        id: "identity",
        title: "About you",
        valid: () =>
          form.email.trim().length > 0 &&
          form.role.trim().length > 0 &&
          form.cpgCategory.length > 0 &&
          (form.cpgCategory !== "Other" || form.cpgCategoryOther.trim().length > 0) &&
          form.businessStage.length > 0 &&
          (form.businessStage !== "Other" || form.businessStageOther.trim().length > 0),
        render: () => (
          <IdentityStep form={form} update={update} />
        ),
      },
      {
        id: "usage",
        title: "Your usage",
        valid: () => form.usageFrequency !== "",
        render: () => <UsageStep form={form} update={update} />,
      },
      {
        id: "workflow",
        title: "Workflow & value",
        valid: () => form.biggestValue.trim().length > 0,
        render: () => <WorkflowStep form={form} update={update} isDormant={isDormant} />,
      },
    ];

    if (!isDormant) {
      list.push({
        id: "satisfaction",
        title: "Rate Babu",
        valid: () =>
          form.ratingOverall !== null &&
          form.ratingEase !== null &&
          form.ratingUI !== null &&
          form.ratingJobHelp !== null,
        render: () => <SatisfactionStep form={form} update={update} />,
      });
      list.push({
        id: "gurus",
        title: "Gurus",
        valid: () => {
          if (!form.gurusUsed) return false;
          const needsFollowUp =
            form.gurusUsed === "no-didnt-know" || form.gurusUsed === "no-couldnt-find";
          if (!needsFollowUp) return true;
          if (!form.discoveryHelp) return false;
          if (form.discoveryHelp === "Other" && !form.discoveryHelpOther.trim()) return false;
          return true;
        },
        render: () => <GurusStep form={form} update={update} />,
      });
    }

    list.push({
      id: "tools",
      title: "Competing tools",
      valid: () => form.competingTools.length > 0,
      render: () => <ToolsStep form={form} update={update} />,
    });

    if (!isDormant) {
      list.push({
        id: "pricing",
        title: "Pricing",
        valid: () => {
          if (!form.wouldUpgrade) return false;
          if (form.wouldUpgrade === "no") return true;
          if (!form.pricePoint) return false;
          if (form.pricePoint === "Other" && !form.pricePointOther.trim()) return false;
          return true;
        },
        render: () => <PricingStep form={form} update={update} />,
      });
    }

    list.push({
      id: "improvement",
      title: "What would change",
      valid: () => form.whatWouldChange.trim().length > 0,
      render: () => <ImprovementStep form={form} update={update} isDormant={isDormant} />,
    });

    list.push({
      id: "nps",
      title: "Final thoughts",
      valid: () => form.nps !== null,
      render: () => <NpsStep form={form} update={update} />,
    });

    return list;
  }, [form, isDormant]);

  const current = steps[stepIndex];
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === steps.length - 1;
  const progress = Math.round(((stepIndex) / (steps.length - 1)) * 100);

  async function submit() {
    setStatus("loading");
    try {
      const res = await fetch("/api/babu-beta-survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        router.push("/babu-beta-survey/thank-you");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  function goNext() {
    if (!current.valid()) return;
    if (isLast) {
      submit();
      return;
    }
    setStepIndex((i) => i + 1);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function goBack() {
    if (isFirst) return;
    setStepIndex((i) => i - 1);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <section className="bg-background min-h-screen py-10 md:py-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full mb-4">
            Babu Beta Survey
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Help shape the future of Babu
          </h1>
          <p className="mt-2 text-sm text-muted">
            About 7 minutes. Your feedback goes straight to Jeff and the product team.
          </p>
        </div>

        {/* Card */}
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          {/* Progress */}
          <div className="px-6 sm:px-8 pt-6">
            <div className="flex items-center justify-between text-xs text-muted mb-2">
              <span>
                Step {stepIndex + 1} of {steps.length}
              </span>
              <span>{progress}%</span>
            </div>
            <div className="h-1.5 bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-accent transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Body */}
          <div className="px-6 sm:px-8 py-8 min-h-[360px]">{current.render()}</div>

          {/* Footer */}
          <div className="px-6 sm:px-8 py-5 border-t border-border bg-background/50 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={goBack}
              disabled={isFirst}
              className="px-5 py-2.5 text-sm font-medium rounded-lg border border-border bg-white hover:border-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Back
            </button>
            <div className="flex items-center gap-3">
              {status === "error" && (
                <span className="text-sm text-red-500">Something went wrong. Try again.</span>
              )}
              <button
                type="button"
                onClick={goNext}
                disabled={!current.valid() || status === "loading"}
                className="px-6 py-2.5 text-sm font-semibold rounded-lg bg-accent hover:bg-accent-dark text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading"
                  ? "Submitting..."
                  : isLast
                    ? "Submit survey"
                    : isFirst
                      ? "Start"
                      : "Next"}
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-muted mt-6">
          Your responses are confidential and will only be used to improve Babu.
        </p>
      </div>
    </section>
  );
}

/* ============================================================== */
/* Step components                                                */
/* ============================================================== */

function StepHeader({ eyebrow, title, sub }: { eyebrow?: string; title: string; sub?: string }) {
  return (
    <div className="mb-6">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">{eyebrow}</p>
      )}
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{title}</h2>
      {sub && <p className="mt-2 text-sm text-muted leading-relaxed">{sub}</p>}
    </div>
  );
}

function FieldLabel({
  htmlFor,
  required,
  children,
  hint,
}: {
  htmlFor?: string;
  required?: boolean;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <div className="mb-2">
      <label htmlFor={htmlFor} className="block text-sm font-medium">
        {children}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {hint && <p className="text-xs text-muted mt-1">{hint}</p>}
    </div>
  );
}

const inputClass =
  "w-full px-4 py-2.5 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-accent text-sm";

function IntroStep() {
  return (
    <div className="text-center py-4">
      <p className="text-5xl mb-5">🤖</p>
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
        Thanks for being part of the Babu Beta
      </h2>
      <p className="text-muted leading-relaxed mb-6 max-w-md mx-auto">
        We&rsquo;re collecting feedback to shape what Babu becomes next. This takes about{" "}
        <strong>7 minutes</strong>, and every answer goes directly to Jeff and the product team.
      </p>
      <div className="bg-accent-light text-accent-dark rounded-lg p-4 text-sm max-w-md mx-auto">
        <strong>Incentive:</strong> share your name and email at the end to receive a token credit
        as a thank-you.
      </div>
    </div>
  );
}

function IdentityStep({
  form,
  update,
}: {
  form: FormState;
  update: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
}) {
  return (
    <div>
      <StepHeader
        eyebrow="About you"
        title="Tell us a little about your business"
        sub="Helps us segment feedback. Name is optional; email is needed if you want to receive the token credit."
      />

      <div className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <FieldLabel htmlFor="bs-name">Name (optional)</FieldLabel>
            <input
              id="bs-name"
              type="text"
              className={inputClass}
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
            />
          </div>
          <div>
            <FieldLabel htmlFor="bs-email" required>
              Email
            </FieldLabel>
            <input
              id="bs-email"
              type="email"
              required
              className={inputClass}
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </div>
        </div>

        <div>
          <FieldLabel htmlFor="bs-role" required>
            Your role or title
          </FieldLabel>
          <input
            id="bs-role"
            type="text"
            className={inputClass}
            placeholder="e.g., Founder, CMO, Head of Brand"
            value={form.role}
            onChange={(e) => update("role", e.target.value)}
          />
        </div>

        <div>
          <FieldLabel required>CPG category</FieldLabel>
          <div className="grid sm:grid-cols-2 gap-2">
            {CPG_CATEGORIES.map((c) => (
              <label
                key={c}
                className={`flex items-center gap-3 cursor-pointer rounded-lg border px-3 py-2.5 text-sm transition-colors ${
                  form.cpgCategory === c
                    ? "border-accent bg-accent-light"
                    : "border-border bg-white hover:border-foreground/40"
                }`}
              >
                <input
                  type="radio"
                  name="cpgCategory"
                  value={c}
                  checked={form.cpgCategory === c}
                  onChange={() => update("cpgCategory", c)}
                  className="h-4 w-4 text-accent border-border focus:ring-accent"
                />
                <span>{c}</span>
              </label>
            ))}
          </div>
          {form.cpgCategory === "Other" && (
            <input
              type="text"
              placeholder="Please specify"
              className={`${inputClass} mt-2`}
              value={form.cpgCategoryOther}
              onChange={(e) => update("cpgCategoryOther", e.target.value)}
            />
          )}
        </div>

        <div>
          <FieldLabel required>Business stage</FieldLabel>
          <div className="space-y-2">
            {BUSINESS_STAGES.map((s) => (
              <label
                key={s}
                className={`flex items-center gap-3 cursor-pointer rounded-lg border px-3 py-2.5 text-sm transition-colors ${
                  form.businessStage === s
                    ? "border-accent bg-accent-light"
                    : "border-border bg-white hover:border-foreground/40"
                }`}
              >
                <input
                  type="radio"
                  name="businessStage"
                  value={s}
                  checked={form.businessStage === s}
                  onChange={() => update("businessStage", s)}
                  className="h-4 w-4 text-accent border-border focus:ring-accent"
                />
                <span>{s}</span>
              </label>
            ))}
          </div>
          {form.businessStage === "Other" && (
            <input
              type="text"
              placeholder="Please describe"
              className={`${inputClass} mt-2`}
              value={form.businessStageOther}
              onChange={(e) => update("businessStageOther", e.target.value)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function UsageStep({
  form,
  update,
}: {
  form: FormState;
  update: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
}) {
  return (
    <div>
      <StepHeader
        eyebrow="Your usage"
        title="How often have you used Babu in the last 30 days?"
        sub="Be honest — there's no wrong answer. We just want to understand where you're at."
      />
      <div className="space-y-3">
        {USAGE_OPTIONS.map((opt) => (
          <label
            key={opt.value}
            className={`flex items-start gap-3 cursor-pointer rounded-lg border px-4 py-3 transition-colors ${
              form.usageFrequency === opt.value
                ? "border-accent bg-accent-light"
                : "border-border bg-white hover:border-foreground/40"
            }`}
          >
            <input
              type="radio"
              name="usageFrequency"
              value={opt.value}
              checked={form.usageFrequency === opt.value}
              onChange={() => update("usageFrequency", opt.value)}
              className="mt-1 h-4 w-4 text-accent border-border focus:ring-accent"
            />
            <div>
              <p className="text-sm font-medium">{opt.label}</p>
              <p className="text-xs text-muted mt-0.5">{opt.sub}</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

function WorkflowStep({
  form,
  update,
  isDormant,
}: {
  form: FormState;
  update: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
  isDormant: boolean;
}) {
  return (
    <div>
      <StepHeader
        eyebrow="Workflow & value"
        title={isDormant ? "What were you hoping for?" : "Where does Babu fit?"}
        sub={
          isDormant
            ? "Tell us what made you sign up — even if you didn't end up using it much."
            : "Walk us through a typical week, and what stood out from using Babu."
        }
      />
      <div className="space-y-5">
        {!isDormant && (
          <div>
            <FieldLabel htmlFor="bs-workflow">
              Walk us through a typical week. What problems are you trying to solve where Babu —
              with enhanced features — could help?
            </FieldLabel>
            <textarea
              id="bs-workflow"
              rows={4}
              className={`${inputClass} resize-y`}
              placeholder="2-3 sentences is great"
              value={form.workflow}
              onChange={(e) => update("workflow", e.target.value)}
            />
          </div>
        )}

        <div>
          <FieldLabel htmlFor="bs-value" required>
            {isDormant
              ? "What were you hoping to get out of Babu when you signed up?"
              : "What was the single biggest value you received from Babu during the Beta?"}
          </FieldLabel>
          <textarea
            id="bs-value"
            rows={3}
            className={`${inputClass} resize-y`}
            placeholder="1-2 sentences"
            value={form.biggestValue}
            onChange={(e) => update("biggestValue", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

function SatisfactionStep({
  form,
  update,
}: {
  form: FormState;
  update: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
}) {
  const items: { key: keyof FormState; label: string }[] = [
    { key: "ratingOverall", label: "Overall satisfaction" },
    { key: "ratingEase", label: "Ease of use" },
    { key: "ratingUI", label: "Visual appeal / User interface" },
    { key: "ratingJobHelp", label: "Helps me with my job" },
  ];

  return (
    <div>
      <StepHeader
        eyebrow="Rate Babu"
        title="How would you rate Babu on each of these?"
        sub="1 = Not satisfied, 7 = Very satisfied"
      />
      <div className="space-y-6">
        {items.map(({ key, label }) => (
          <div key={key}>
            <p className="text-sm font-medium mb-2">{label}</p>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5, 6, 7].map((n) => {
                const selected = form[key] === n;
                return (
                  <button
                    key={n}
                    type="button"
                    onClick={() => update(key, n as FormState[typeof key])}
                    className={`flex-1 h-10 rounded-md text-sm font-medium border transition-colors ${
                      selected
                        ? "bg-accent text-white border-accent"
                        : "bg-white border-border hover:border-foreground/40"
                    }`}
                  >
                    {n}
                  </button>
                );
              })}
            </div>
            <div className="flex justify-between text-xs text-muted mt-1.5">
              <span>Not satisfied</span>
              <span>Very satisfied</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GurusStep({
  form,
  update,
}: {
  form: FormState;
  update: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
}) {
  const showDiscovery =
    form.gurusUsed === "no-didnt-know" || form.gurusUsed === "no-couldnt-find";
  return (
    <div>
      <StepHeader
        eyebrow="Gurus"
        title="Have you discovered and used Babu's specialized Gurus?"
        sub="Examples: Brand Positioning, Category Research, Financial Analysis, Retail Launch, Investor Prep."
      />
      <div className="space-y-3">
        {GURU_OPTIONS.map((opt) => (
          <label
            key={opt.value}
            className={`flex items-center gap-3 cursor-pointer rounded-lg border px-4 py-3 text-sm transition-colors ${
              form.gurusUsed === opt.value
                ? "border-accent bg-accent-light"
                : "border-border bg-white hover:border-foreground/40"
            }`}
          >
            <input
              type="radio"
              name="gurusUsed"
              value={opt.value}
              checked={form.gurusUsed === opt.value}
              onChange={() => update("gurusUsed", opt.value)}
              className="h-4 w-4 text-accent border-border focus:ring-accent"
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>

      {showDiscovery && (
        <div className="mt-6 pt-6 border-t border-border">
          <FieldLabel required>What would help you discover them?</FieldLabel>
          <div className="space-y-2">
            {DISCOVERY_OPTIONS.map((opt) => (
              <label
                key={opt}
                className={`flex items-center gap-3 cursor-pointer rounded-lg border px-3 py-2.5 text-sm transition-colors ${
                  form.discoveryHelp === opt
                    ? "border-accent bg-accent-light"
                    : "border-border bg-white hover:border-foreground/40"
                }`}
              >
                <input
                  type="radio"
                  name="discoveryHelp"
                  value={opt}
                  checked={form.discoveryHelp === opt}
                  onChange={() => update("discoveryHelp", opt)}
                  className="h-4 w-4 text-accent border-border focus:ring-accent"
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
          {form.discoveryHelp === "Other" && (
            <input
              type="text"
              placeholder="Please describe"
              className={`${inputClass} mt-2`}
              value={form.discoveryHelpOther}
              onChange={(e) => update("discoveryHelpOther", e.target.value)}
            />
          )}
        </div>
      )}
    </div>
  );
}

function ToolsStep({
  form,
  update,
}: {
  form: FormState;
  update: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
}) {
  function toggle(tool: string) {
    const has = form.competingTools.includes(tool);
    update(
      "competingTools",
      has ? form.competingTools.filter((t) => t !== tool) : [...form.competingTools, tool],
    );
  }
  return (
    <div>
      <StepHeader
        eyebrow="Competing tools"
        title="What else are you using for CPG business decisions?"
        sub="Select all that apply — gives us a sense of the landscape Babu sits in."
      />
      <div className="space-y-2">
        {TOOL_OPTIONS.map((tool) => {
          const checked = form.competingTools.includes(tool);
          return (
            <label
              key={tool}
              className={`flex items-center gap-3 cursor-pointer rounded-lg border px-3 py-2.5 text-sm transition-colors ${
                checked
                  ? "border-accent bg-accent-light"
                  : "border-border bg-white hover:border-foreground/40"
              }`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(tool)}
                className="h-4 w-4 text-accent border-border focus:ring-accent rounded"
              />
              <span>{tool}</span>
            </label>
          );
        })}
      </div>
      {form.competingTools.includes("Other") && (
        <input
          type="text"
          placeholder="Please describe"
          className={`${inputClass} mt-3`}
          value={form.competingToolsOther}
          onChange={(e) => update("competingToolsOther", e.target.value)}
        />
      )}
    </div>
  );
}

function PricingStep({
  form,
  update,
}: {
  form: FormState;
  update: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
}) {
  return (
    <div>
      <StepHeader
        eyebrow="Pricing"
        title="Would you consider upgrading to a paid plan?"
        sub="Helps us figure out where to price Babu for founders like you."
      />
      <div className="space-y-3">
        {UPGRADE_OPTIONS.map((opt) => (
          <label
            key={opt.value}
            className={`flex items-center gap-3 cursor-pointer rounded-lg border px-4 py-3 text-sm transition-colors ${
              form.wouldUpgrade === opt.value
                ? "border-accent bg-accent-light"
                : "border-border bg-white hover:border-foreground/40"
            }`}
          >
            <input
              type="radio"
              name="wouldUpgrade"
              value={opt.value}
              checked={form.wouldUpgrade === opt.value}
              onChange={() => update("wouldUpgrade", opt.value)}
              className="h-4 w-4 text-accent border-border focus:ring-accent"
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>

      {(form.wouldUpgrade === "yes" || form.wouldUpgrade === "maybe") && (
        <div className="mt-6 pt-6 border-t border-border">
          <FieldLabel required>At what monthly price would you consider upgrading?</FieldLabel>
          <div className="space-y-2">
            {PRICE_OPTIONS.map((opt) => (
              <label
                key={opt}
                className={`flex items-center gap-3 cursor-pointer rounded-lg border px-3 py-2.5 text-sm transition-colors ${
                  form.pricePoint === opt
                    ? "border-accent bg-accent-light"
                    : "border-border bg-white hover:border-foreground/40"
                }`}
              >
                <input
                  type="radio"
                  name="pricePoint"
                  value={opt}
                  checked={form.pricePoint === opt}
                  onChange={() => update("pricePoint", opt)}
                  className="h-4 w-4 text-accent border-border focus:ring-accent"
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
          {form.pricePoint === "Other" && (
            <input
              type="text"
              placeholder="Please specify"
              className={`${inputClass} mt-2`}
              value={form.pricePointOther}
              onChange={(e) => update("pricePointOther", e.target.value)}
            />
          )}
        </div>
      )}
    </div>
  );
}

function ImprovementStep({
  form,
  update,
  isDormant,
}: {
  form: FormState;
  update: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
  isDormant: boolean;
}) {
  return (
    <div>
      <StepHeader
        eyebrow="What would change"
        title={
          isDormant
            ? "What would need to change for you to give Babu another try?"
            : "What would need to change for you to use Babu more often?"
        }
        sub="Be direct — this is where we get the most value."
      />
      <textarea
        rows={5}
        className={`${inputClass} resize-y`}
        placeholder="A feature, a workflow, a UX change, pricing, integration with another tool..."
        value={form.whatWouldChange}
        onChange={(e) => update("whatWouldChange", e.target.value)}
      />
    </div>
  );
}

function NpsStep({
  form,
  update,
}: {
  form: FormState;
  update: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
}) {
  return (
    <div>
      <StepHeader
        eyebrow="Final thoughts"
        title="How likely are you to recommend Babu to a colleague or fellow founder?"
        sub="0 = Not at all likely, 10 = Extremely likely"
      />
      <div className="grid grid-cols-11 gap-1.5 mb-6">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => {
          const selected = form.nps === n;
          return (
            <button
              key={n}
              type="button"
              onClick={() => update("nps", n)}
              className={`h-10 rounded-md text-sm font-medium border transition-colors ${
                selected
                  ? "bg-accent text-white border-accent"
                  : "bg-white border-border hover:border-foreground/40"
              }`}
            >
              {n}
            </button>
          );
        })}
      </div>
      <div className="flex justify-between text-xs text-muted mb-8">
        <span>Not at all likely</span>
        <span>Extremely likely</span>
      </div>

      <div>
        <FieldLabel htmlFor="bs-open">
          Anything else you would like to tell the Babu team?
        </FieldLabel>
        <textarea
          id="bs-open"
          rows={4}
          className={`${inputClass} resize-y`}
          placeholder="Optional — but encouraged for depth"
          value={form.openFeedback}
          onChange={(e) => update("openFeedback", e.target.value)}
        />
      </div>
    </div>
  );
}
