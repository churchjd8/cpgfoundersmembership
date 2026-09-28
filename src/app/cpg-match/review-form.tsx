"use client";

import { useState, type FormEvent } from "react";
import {
  categories,
  stages,
  recommendations,
  pricingBases,
  sourcingTimes,
  ratings,
  ratingFields,
  unavailableOptions,
  isPositive,
  buildReviewDraft,
  publicReview,
  publicationFingerprint,
  anonymityError,
  parseReview,
  type ReviewAnswers,
} from "@/lib/cpg-match-review";
import { PublicReviewCard } from "@/components/cpg-match/public-review";

const input =
  "mt-1.5 w-full rounded-lg border border-border bg-white px-4 py-3 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20";
const button =
  "rounded-lg bg-accent px-5 py-3 font-bold text-white hover:bg-accent-dark disabled:opacity-50";
const initial: ReviewAnswers = {
  commercialVisibility: "private",
  publishTiming: "no",
  publishStage: "no",
  ninaFollowUp: "no",
  vendorNotificationPermission: "",
  currency: "USD",
};
export function ReviewForm({ onDone }: { onDone: () => void }) {
  const [a, setAnswers] = useState<ReviewAnswers>({ ...initial });
  const [category, setCategory] = useState<string[]>([]);
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);
  const [lastSuggestion, setLastSuggestion] = useState("");
  const [acknowledged, setAcknowledged] = useState("");
  const [approval, setApproval] = useState("");
  const suggestion = buildReviewDraft(a);
  const stale = acknowledged !== suggestion;
  const fingerprint = publicationFingerprint(a, category);
  const approved = approval === fingerprint;
  function change(key: string, value: string) {
    setApproval("");
    setError("");
    setAnswers((current) => ({
      ...current,
      [key]: value,
      ...(key === "recommendation" && !isPositive({ recommendation: value })
        ? { vendorNotificationPermission: "no" }
        : {}),
    }));
  }
  const props = (name: string) => ({
    name,
    value: a[name] || "",
    onChange: (value: string) => change(name, value),
  });
  async function advance(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const currentFields = Array.from(
      event.currentTarget.querySelectorAll<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >(
        `[data-step="${step}"] input,[data-step="${step}"] select,[data-step="${step}"] textarea`,
      ),
    );
    if (currentFields.some((field) => !field.reportValidity())) return;
    if (step === 1) {
      if (!category.length) {
        setError("Select at least one category.");
        return;
      }
      if (a.engagementStatus === "completed" && +a.endYear < +a.startYear) {
        setError("End year must be at or after start year.");
        return;
      }
    }
    if (step < 4) {
      if (step === 3 && (!a.reviewText || a.reviewText === lastSuggestion)) {
        setAnswers((current) => ({ ...current, reviewText: suggestion }));
        setLastSuggestion(suggestion);
        setAcknowledged(suggestion);
      }
      setStep(step + 1);
      return;
    }
    const body = {
      ...a,
      type: "recommendation",
      category,
      schemaVersion: 2,
      reviewApproved: approved,
      draftAcknowledgement: acknowledged,
      approvedPublicReview: approval,
    };
    try {
      parseReview(body);
      setBusy(true);
      const response = await fetch("/api/cpg-match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "Could not save your review.");
      setSuccess(true);
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Could not save your review. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }
  if (success)
    return (
      <div className="py-8 text-center">
        <h3 className="text-2xl font-bold">Thanks for your review!</h3>
        <p className="mt-3 text-muted">
          We’ll verify it privately before publication. Your sourcing requests
          remain private.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            className={button}
            onClick={() => {
              setAnswers({
                ...initial,
                firstName: a.firstName,
                lastName: a.lastName,
                email: a.email,
                brand: a.brand,
                attribution: a.attribution,
              });
              setCategory([]);
              setApproval("");
              setAcknowledged("");
              setLastSuggestion("");
              setStep(1);
              setSuccess(false);
            }}
          >
            Review Another Vendor
          </button>
          <button
            onClick={onDone}
            className="rounded-lg border border-border px-5 py-3"
          >
            I’m Done
          </button>
        </div>
      </div>
    );
  return (
    <form noValidate onSubmit={advance}>
      <div className="flex justify-between text-xs font-bold uppercase tracking-[.16em] text-muted">
        <span>Step {step} of 4</span>
        <span>
          {
            ["Engagement", "Experience", "Private details", "Review & approve"][
              step - 1
            ]
          }
        </span>
      </div>
      <div className="mt-3 h-1.5 rounded-full bg-background">
        <div
          className="h-full rounded-full bg-accent transition-all"
          style={{ width: `${step * 25}%` }}
        />
      </div>
      <fieldset disabled={busy} className="mt-6">
        <div data-step="1" hidden={step !== 1} className="space-y-5">
          <h3 className="text-2xl font-bold">Who did you work with?</h3>
          <p className="rounded-lg bg-accent-light/45 p-4 text-sm">
            Honest positive, mixed, and negative experiences are welcome. We
            verify reviews privately. You can publish anonymously and omit
            identifying context.
          </p>
          <Text
            {...props("vendorName")}
            label="Vendor / company name"
            required
          />
          <fieldset>
            <legend className="text-sm font-semibold">Categories *</legend>
            <div className="mt-3 grid gap-2 rounded-lg border border-border p-3 sm:grid-cols-2">
              {categories.map((c) => (
                <label key={c} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={category.includes(c)}
                    onChange={(e) => {
                      setApproval("");
                      setCategory(
                        e.target.checked
                          ? [...category, c]
                          : category.filter((x) => x !== c),
                      );
                    }}
                  />
                  {c}
                </label>
              ))}
            </div>
          </fieldset>
          <Text
            {...props("scope")}
            label="What did you hire them to do?"
            required
            multiline
            help="This scope appears in your review. Keep it broad or omit identifying project details if you want to stay anonymous."
          />
          <Select
            {...props("engagementStatus")}
            label="When did you work with this vendor?"
            required
            options={[
              ["completed", "The engagement has ended"],
              ["ongoing", "We’re still working together"],
              ["unknown", "I don’t remember"],
            ]}
          />
          {a.engagementStatus && a.engagementStatus !== "unknown" && (
            <div className="grid gap-5 sm:grid-cols-2">
              <Text
                {...props("startYear")}
                label="Start year"
                type="number"
                min={1900}
                max={new Date().getFullYear()}
                required
              />
              {a.engagementStatus === "completed" && (
                <Text
                  {...props("endYear")}
                  label="End year"
                  type="number"
                  min={+(a.startYear || 1900)}
                  max={new Date().getFullYear()}
                  required
                />
              )}
            </div>
          )}
          <Select
            {...props("companyStage")}
            label="What stage was your company at when you worked together?"
            required
            options={stages}
          />
          <p className="text-sm text-muted">
            This helps other founders understand whether your experience is
            relevant to their business. Use the stage of the company involved in
            this engagement, even if you worked at a previous company.
          </p>
          <Text
            {...props("engagementCompany")}
            label="Company involved in this engagement (optional, private)"
            help="Useful for private verification if this was a previous employer. You can skip this."
          />
        </div>
        <div data-step="2" hidden={step !== 2} className="space-y-5">
          <h3 className="text-2xl font-bold">How did it go?</h3>
          <div className="grid gap-5 sm:grid-cols-2">
            {ratingFields.map(([name, label]) => (
              <Select
                key={name}
                {...props(name)}
                label={label}
                options={ratings}
                required
              />
            ))}
          </div>
          <Select
            {...props("disappointed")}
            label="Imagine you needed similar work again. If this vendor were unavailable, how would you feel?"
            options={unavailableOptions}
            required
          />
          <Select
            {...props("recommendation")}
            label="Based on your experience, would you recommend this vendor?"
            options={recommendations}
            required
          />
          {isPositive(a) ? (
            <Text
              {...props("bestFor")}
              multiline
              label="Who or what kind of project would they be a good fit for? (optional)"
            />
          ) : (
            a.recommendation && (
              <Text
                {...props("reservations")}
                multiline
                label="What should another founder know before deciding? (optional)"
              />
            )
          )}
          <Text
            {...props("valuable")}
            multiline
            label="What, if anything, was especially valuable? (optional)"
          />
          <Text
            {...props("improvement")}
            multiline
            label="What could have been better? (optional)"
          />
          <Text
            {...props("knowBeforeHiring")}
            multiline
            label="Anything else another founder should know? (optional)"
          />
        </div>
        <div data-step="3" hidden={step !== 3} className="space-y-5">
          <h3 className="text-2xl font-bold">
            A little context, then you’re done.
          </h3>
          <details className="rounded-lg border border-border p-4">
            <summary className="cursor-pointer font-semibold">
              Add historical spend or commercial context (optional)
            </summary>
            <div className="mt-4 space-y-4">
              <p className="text-sm text-muted">
                Skip any sensitive or identifying details. These describe this
                engagement, not the vendor’s current prices. They stay private
                unless you choose to publish them in the final step.
              </p>
              <Text
                {...props("spend")}
                label="Approximately what did your company spend? (optional)"
                placeholder="e.g. 10,000 or 10,000–15,000"
              />
              {a.spend?.trim() && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <Text
                    {...props("currency")}
                    label="Currency (three-letter code)"
                    maxLength={3}
                    required
                    onChange={(value) =>
                      change("currency", value.toUpperCase())
                    }
                  />
                  <Select
                    {...props("pricingBasis")}
                    label="Pricing basis"
                    options={pricingBases}
                    required
                  />
                </div>
              )}
              <Text
                {...props("spendCovers")}
                label="What did that cover? (optional)"
                multiline
                placeholder="Three-SKU packaging redesign, including two revision rounds."
              />
              <Text
                {...props("commercialTerms")}
                label="Anything useful to know about minimums, contract terms, extra costs, or lead times? (optional)"
                multiline
              />
            </div>
          </details>
          <Text
            {...props("buyerNeeds")}
            label="Who are you looking for—and what do you want help with? (optional, private)"
            multiline
          />
          {a.buyerNeeds?.trim() && (
            <div className="space-y-4 rounded-lg bg-background p-4">
              <Select
                {...props("sourcingTimeline")}
                label="When would you like to get started? (optional)"
                options={sourcingTimes}
              />
              <Text
                {...props("sourcingBudget")}
                label="Do you have an approximate budget or order size? (optional)"
                help="Feel free to skip this."
              />
              <Check
                checked={a.ninaFollowUp === "yes"}
                onChange={(value) =>
                  change("ninaFollowUp", value ? "yes" : "no")
                }
                label="Nina may follow up with me about this sourcing request."
              />
              <p className="text-sm text-muted">
                Private to CPG Match. This does not authorize sharing your
                contact information or project brief with vendors. We’ll ask for
                your approval for each specific introduction.
              </p>
            </div>
          )}
          <h4 className="font-bold">Private verification</h4>
          <p className="text-sm text-muted">
            We use your details to verify first-hand experience. Your email,
            verification contact, previous employer, and sourcing needs are
            never included in the public review.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Text {...props("firstName")} label="First name" required />
            <Text {...props("lastName")} label="Last name" required />
            <Text
              {...props("email")}
              label="Work email"
              type="email"
              required
            />
            <Text
              {...props("brand")}
              label="Your current company / brand"
              required
            />
          </div>
          <Select
            {...props("attribution")}
            label="Public review attribution"
            options={[
              ["anonymous", "Show “Verified CPG Founder”"],
              ["named", "Show my name and current company"],
            ]}
            required
          />
          {isPositive(a) && (
            <Select
              {...props("vendorNotificationPermission")}
              label="For this positive review, may we tell the vendor you nominated them?"
              options={[
                [
                  "yes",
                  "Yes — share my name and company for this positive review",
                ],
                ["no", "No — do not identify me to the vendor"],
              ]}
              required
            />
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <Text
              {...props("vendorContactName")}
              label="Vendor contact name (optional, private)"
            />
            <Text
              {...props("vendorContactEmail")}
              label={
                a.vendorNotificationPermission === "yes"
                  ? "Vendor contact email (private)"
                  : "Vendor contact email (optional, private)"
              }
              type="email"
              required={a.vendorNotificationPermission === "yes"}
            />
          </div>
          <p className="text-sm text-muted">
            Providing a vendor contact sends no email. Permission to identify
            you for a positive review is separate from public anonymity and does
            not authorize a sourcing introduction.
          </p>
          <Check
            checked={a.certification === "confirmed"}
            onChange={(value) =>
              change("certification", value ? "confirmed" : "")
            }
            required
            label="This reflects my genuine first-hand experience."
          />
        </div>
        <div data-step="4" hidden={step !== 4} className="space-y-5">
          <h3 className="text-2xl font-bold">
            Review exactly what may be published.
          </h3>
          <p className="text-sm text-muted">
            Edit freely. Remove or generalize any details that could identify
            you. Only the text and context shown in the public preview below are
            approved for publication; other answers remain private.
          </p>
          {stale && (
            <div className="rounded-lg border border-gold bg-background p-4">
              <p className="font-semibold">
                Your earlier answers changed. Your edits have been kept.
              </p>
              <details className="mt-3">
                <summary className="cursor-pointer">
                  See updated suggestion
                </summary>
                <p className="mt-3 whitespace-pre-wrap text-sm">{suggestion}</p>
              </details>
              <div className="mt-3 flex flex-wrap gap-3">
                <button
                  type="button"
                  className={button}
                  onClick={() => {
                    change("reviewText", suggestion);
                    setLastSuggestion(suggestion);
                    setAcknowledged(suggestion);
                  }}
                >
                  Use updated suggestion
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-border px-4 py-2"
                  onClick={() => {
                    setApproval("");
                    setLastSuggestion(suggestion);
                    setAcknowledged(suggestion);
                  }}
                >
                  Keep my edited review
                </button>
              </div>
            </div>
          )}
          <Text
            {...props("reviewText")}
            label="Your editable review"
            multiline
            rows={12}
            maxLength={12000}
            required
          />
          <fieldset className="space-y-3 rounded-lg border border-border p-4">
            <legend className="font-semibold">Public context</legend>
            <p className="text-sm">
              Vendor, categories, and project scope appear publicly. Use Back to
              generalize your scope or change attribution.
            </p>
            <Check
              checked={a.publishTiming === "yes"}
              onChange={(value) =>
                change("publishTiming", value ? "yes" : "no")
              }
              label="Include engagement dates publicly"
            />
            <Check
              checked={a.publishStage === "yes"}
              onChange={(value) => change("publishStage", value ? "yes" : "no")}
              label="Include company stage during the engagement publicly"
            />
          </fieldset>
          {[a.spend, a.spendCovers, a.commercialTerms].some((x) =>
            x?.trim(),
          ) && (
            <div className="space-y-2">
              <Select
                {...props("commercialVisibility")}
                label="Optional commercial details"
                options={[
                  ["public", "May be published with my review."],
                  ["private", "For CPG Match’s private research only."],
                ]}
                required
              />
              <p className="text-sm text-muted">
                If published, these details always include engagement timing and
                scope for context. Omit them or keep them private if they could
                identify you.
              </p>
            </div>
          )}
          <h4 className="font-bold">
            Public preview — this is what you’re approving
          </h4>
          <PublicReviewCard review={publicReview(a, category)} />
          {anonymityError(a, category) && (
            <p className="text-sm text-red-700">
              {anonymityError(a, category)}
            </p>
          )}
          <Check
            checked={approved}
            onChange={(value) => setApproval(value ? fingerprint : "")}
            required
            disabled={stale || !!anonymityError(a, category)}
            label="I approve this exact review text, attribution, and displayed context for publication after private verification."
          />
          <p className="text-xs text-muted">
            Approving this preview does not authorize publishing any other
            answers. We will verify the review privately before it can appear
            publicly.
          </p>
        </div>
      </fieldset>
      {error && (
        <p role="alert" className="mt-4 text-sm text-red-700">
          {error}
        </p>
      )}
      <div className="mt-8 flex gap-3">
        {step > 1 && (
          <button
            type="button"
            disabled={busy}
            className="rounded-lg border border-border px-5 py-3 font-bold"
            onClick={() => {
              setError("");
              setStep(step - 1);
            }}
          >
            Back
          </button>
        )}
        <button
          type="submit"
          disabled={busy || (step === 4 && (!approved || stale))}
          className={`${button} flex-1`}
        >
          {busy
            ? "Submitting…"
            : step === 4
              ? "Submit approved review"
              : "Continue"}
        </button>
      </div>
    </form>
  );
}

type Base = {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  help?: string;
};
function Text({
  name,
  label,
  value,
  onChange,
  required,
  help,
  type = "text",
  multiline,
  placeholder,
  min,
  max,
  maxLength = 2000,
  rows = 3,
}: Base & {
  type?: string;
  multiline?: boolean;
  placeholder?: string;
  min?: number;
  max?: number;
  maxLength?: number;
  rows?: number;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold" htmlFor={name}>
        {label}
        {required && " *"}
      </label>
      {multiline ? (
        <textarea
          id={name}
          name={name}
          className={input}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          required={required}
          maxLength={maxLength}
          placeholder={placeholder}
        />
      ) : (
        <input
          id={name}
          name={name}
          className={input}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          type={type}
          required={required}
          min={min}
          max={max}
          maxLength={maxLength}
          placeholder={placeholder}
        />
      )}
      {help && <p className="mt-1 text-sm text-muted">{help}</p>}
    </div>
  );
}
function Select({
  name,
  label,
  value,
  onChange,
  required,
  options,
}: Base & { options: string[] | string[][] }) {
  return (
    <div>
      <label className="block text-sm font-semibold" htmlFor={name}>
        {label}
        {required && " *"}
      </label>
      <select
        id={name}
        name={name}
        className={input}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">
          {required ? "Select one" : "Skip / select one"}
        </option>
        {options.map((option) => {
          const [v, text] = Array.isArray(option) ? option : [option, option];
          return (
            <option key={v} value={v}>
              {text}
            </option>
          );
        })}
      </select>
    </div>
  );
}
function Check({
  label,
  checked,
  onChange,
  required,
  disabled,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  required?: boolean;
  disabled?: boolean;
}) {
  return (
    <label className="flex items-start gap-3 text-sm">
      <input
        type="checkbox"
        className="mt-1 h-4 w-4 shrink-0 accent-[var(--accent)]"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        required={required}
        disabled={disabled}
      />
      {label}
    </label>
  );
}
