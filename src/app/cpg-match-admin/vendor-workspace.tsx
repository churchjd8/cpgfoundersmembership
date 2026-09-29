"use client";

import { useEffect, useState, type FormEvent } from "react";
import { CRM_STATUSES, vendorCrm, type CrmStatus } from "@/lib/cpg-match-crm";
import { ReviewPublication } from "./review-publication";
import type { Entry } from "@/lib/cpg-match-submissions";

const input = "mt-1 w-full rounded-lg border border-border bg-white px-3 py-2";
export function VendorWorkspace({
  entry,
  onSaved,
  onClose,
  onDirty,
}: {
  entry: Entry;
  onSaved: (entry: Entry) => void;
  onClose: () => void;
  onDirty: (dirty: boolean) => void;
}) {
  const crm = vendorCrm(entry.crm);
  const [status, setStatus] = useState(crm.status);
  const [owner, setOwner] = useState(crm.owner);
  const [nextAction, setNextAction] = useState(crm.nextAction);
  const [followUpDate, setFollowUpDate] = useState(crm.followUpDate);
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const dirty =
    status !== crm.status ||
    owner !== crm.owner ||
    nextAction !== crm.nextAction ||
    followUpDate !== crm.followUpDate ||
    note.trim() !== "";
  useEffect(() => {
    onDirty(dirty);
  }, [dirty, onDirty]);
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
  async function save(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");
    try {
      const response = await fetch(
        `/api/cpg-match-admin/submissions/${entry.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            version: entry.crm_version,
            status,
            owner,
            nextAction,
            followUpDate,
            note,
          }),
        },
      );
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "Could not save changes.");
      onSaved({ ...entry, crm: result.crm, crm_version: result.crm_version });
      setOwner(result.crm.owner);
      setNextAction(result.crm.nextAction);
      setNote("");
      setMessage("Changes saved.");
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Could not save changes. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  }
  return (
    <section
      id="vendor-workspace"
      aria-label="Vendor workspace"
      className="my-6 rounded-xl border-2 border-accent bg-white p-5 sm:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-accent">
            Vendor workspace
          </p>
          <h2 className="mt-1 text-2xl font-bold">{entry.vendor_name}</h2>
          <p className="mt-1 text-sm text-muted">
            Submitted by {entry.first_name} {entry.last_name} · {entry.brand}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          disabled={saving}
          className="rounded-lg border border-border px-3 py-2 text-sm disabled:opacity-50"
        >
          Close workspace
        </button>
      </div>
      <p className="mt-4 rounded-lg bg-background p-3 text-sm">
        Internal only. Statuses and notes are never sent to vendors or
        reviewers. Marking a nomination Approved does not publish it.
      </p>
      <form onSubmit={save} className="mt-5">
        <fieldset
          disabled={saving}
          className="grid gap-4 sm:grid-cols-2 disabled:opacity-60"
        >
          <label className="text-sm font-semibold">
            Status
            <select
              className={input}
              value={status}
              onChange={(e) => setStatus(e.target.value as CrmStatus)}
            >
              {CRM_STATUSES.map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </label>
          <label className="text-sm font-semibold">
            Owner
            <input
              className={input}
              maxLength={120}
              placeholder="e.g. Nina"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
            />
          </label>
          <label className="text-sm font-semibold">
            Next action
            <input
              className={input}
              maxLength={500}
              placeholder="e.g. Verify review with founder"
              value={nextAction}
              onChange={(e) => setNextAction(e.target.value)}
            />
          </label>
          <label className="text-sm font-semibold">
            Follow-up date
            <input
              className={input}
              type="date"
              value={followUpDate}
              onChange={(e) => setFollowUpDate(e.target.value)}
            />
          </label>
          <label className="text-sm font-semibold sm:col-span-2">
            Add an internal note
            <textarea
              className={input}
              maxLength={4000}
              rows={4}
              placeholder="Record conversations, verification details, or anything to remember…"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <span className="text-xs font-normal text-muted">
              Notes are added to the activity history when you save. Follow-up
              dates appear in the dashboard; no reminder emails are sent.
            </span>
          </label>
        </fieldset>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            disabled={saving || !dirty}
            className="rounded-lg bg-accent px-5 py-2.5 font-bold text-white disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
          <span aria-live="polite" className="text-sm text-muted">
            {dirty
              ? "Unsaved changes"
              : message ||
                (crm.updatedAt
                  ? `Last saved ${new Date(crm.updatedAt).toLocaleString()}`
                  : "No workflow updates yet")}
          </span>
        </div>
        {error && (
          <p role="alert" className="mt-3 text-sm text-red-700">
            {error}
          </p>
        )}
      </form>
      <h3 className="mt-6 font-bold">Activity & notes</h3>
      <div className="mt-3 max-h-80 space-y-3 overflow-y-auto">
        {crm.activity.length ? (
          crm.activity.map((item, index) => (
            <div
              key={`${item.at}-${index}`}
              className="rounded-lg border border-border p-3"
            >
              <time dateTime={item.at} className="text-xs text-muted">
                {new Date(item.at).toLocaleString()}
              </time>
              <p className="mt-1 whitespace-pre-wrap break-words text-sm">
                {item.text}
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted">
            No notes yet. Add the first update above.
          </p>
        )}
      </div>
      {typeof entry.payload.buyerNeeds === "string" && entry.payload.buyerNeeds && <section className="mt-6 rounded-lg bg-background p-4"><h3 className="font-bold">Private sourcing request</h3><p className="mt-2 whitespace-pre-wrap text-sm">{entry.payload.buyerNeeds}</p>{entry.payload.sourcingTimeline ? <p className="mt-2 text-sm">Timing: {String(entry.payload.sourcingTimeline)}</p> : null}{entry.payload.sourcingBudget ? <p className="mt-2 text-sm">Budget / order size: {String(entry.payload.sourcingBudget)}</p> : null}<p className="mt-2 text-sm font-semibold">Nina follow-up permission: {entry.payload.ninaFollowUp === "yes" ? "Yes" : "Not granted"}</p><p className="mt-2 text-xs text-muted">Private to CPG Match. Obtain approval for each specific introduction before sharing contact information or a project brief with vendors.</p></section>}
      <ReviewPublication entry={entry} onSaved={onSaved} />
    </section>
  );
}
