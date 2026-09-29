"use client";
import { useState, type FormEvent } from "react";
import { categories, pricingBases } from "@/lib/cpg-match-review";
import {
  parseVendorIntake,
  productionCategories,
} from "@/lib/cpg-match-vendor-intake";
const input =
  "mt-1.5 w-full rounded-lg border border-border bg-white px-4 py-3 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20";
export function VendorIntakeForm() {
  const [data, setData] = useState<Record<string, string>>({ currency: "USD" });
  const [confirmed, setConfirmed] = useState(false);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  function field(
    name: string,
    label: string,
    required = false,
    options?: string[],
  ) {
    return (
      <div key={name}>
        <label className="block text-sm font-semibold" htmlFor={name}>
          {label}
          {required ? " *" : " (optional)"}
        </label>
        {options ? (
          <select
            id={name}
            className={input}
            required={required}
            value={data[name] || ""}
            onChange={(e) => setData({ ...data, [name]: e.target.value })}
          >
            <option value="">Select one</option>
            {options.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        ) : (
          <input
            id={name}
            className={input}
            type={name === "inquiryEmail" ? "email" : "text"}
            maxLength={name === "currency" ? 3 : 2000}
            required={required}
            value={data[name] || ""}
            onChange={(e) =>
              setData({
                ...data,
                [name]:
                  name === "currency"
                    ? e.target.value.toUpperCase()
                    : e.target.value,
              })
            }
          />
        )}
      </div>
    );
  }
  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    try {
      const body = { ...data, confirmed };
      parseVendorIntake(body);
      setStatus("saving");
      const response = await fetch("/api/cpg-match/vendor-intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setStatus("success");
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Could not save. Please try again.",
      );
      setStatus("idle");
    }
  }
  if (status === "success")
    return (
      <p role="status" className="mt-8 rounded-lg bg-accent-light p-5">
        Thanks. Your vendor information and confirmation date have been recorded
        for CPG Match’s review.
      </p>
    );
  return (
    <form className="mt-7 space-y-5" onSubmit={submit}>
      <fieldset disabled={status === "saving"} className="space-y-5">
        {field("vendorName", "Vendor / company name", true)}
        {field("category", "Main service category", true, categories)}
        {field("services", "Main services", true)}
        {field("projectTypes", "Specific project types")}
        {field("bestFit", "Best-fit customers and projects")}
        {field("cannotServe", "Customers or projects you cannot serve well")}
        <details className="rounded-lg border border-border p-4">
          <summary className="cursor-pointer font-semibold">
            Pricing, minimums and inclusions (optional)
          </summary>
          <div className="mt-4 space-y-4">
            {field("pricingRange", "Typical pricing range")}
            {data.pricingRange?.trim() && (
              <div className="grid gap-4 sm:grid-cols-2">
                {field("currency", "Currency (three-letter code)", true)}
                {field("pricingBasis", "Pricing basis", true, pricingBases)}
              </div>
            )}
            {field("inclusions", "What does that pricing include?")}
            {field("minimum", "Minimum engagement or order size")}
          </div>
        </details>
        {field("leadTime", "Typical lead time")}
        {field("availability", "Current availability")}
        {field("geography", "Geographic service area or constraints")}
        {productionCategories.includes(data.category) &&
          field(
            "productionConstraints",
            "Production constraints: formats, capabilities, certifications, or run-size limits",
          )}
        {data.category === "3PL / logistics" &&
          field(
            "logisticsConstraints",
            "Warehouse locations, shipping regions, temperature or handling constraints",
          )}
        {field("inquiryName", "Inquiry contact name")}
        {field("inquiryEmail", "Inquiry contact email", true)}
        <label className="flex items-start gap-3 text-sm">
          <input
            className="mt-1 h-4 w-4 shrink-0"
            type="checkbox"
            checked={confirmed}
            required
            onChange={(e) => setConfirmed(e.target.checked)}
          />
          I represent this vendor and confirm this information is current today.
          CPG Match may publish these vendor-provided details, including the
          inquiry contact, after review.
        </label>
        <p className="text-xs text-muted">
          We record the confirmation date when you submit. Future changes
          require a new confirmation.
        </p>
        <button
          disabled={status === "saving"}
          className="w-full rounded-lg bg-accent px-5 py-3 font-bold text-white disabled:opacity-50"
        >
          {status === "saving" ? "Saving…" : "Submit vendor information"}
        </button>
        {error && (
          <p role="alert" className="text-sm text-red-700">
            {error}
          </p>
        )}
      </fieldset>
    </form>
  );
}
