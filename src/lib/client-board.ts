import type Stripe from "stripe";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getStripe } from "@/lib/stripe";

// The /clients billing board. The curated rows (plan, commitment, notes) live
// in Supabase `client_board`; billing status, next charge and what's owed come
// live from Stripe on every load.

export type BillingState = "current" | "past_due" | "paused" | "ended" | "not_in_stripe";

export type BoardClient = {
  id: string;
  name: string;
  business: string;
  plan: string;
  monthlyAmount: number;
  notes: string | null;
  stripeCustomerId: string | null;
  stripeUrl: string | null;
  state: BillingState;
  statusDetail: string;
  nextCharge: string | null; // YYYY-MM-DD
  pausedUntil: string | null; // YYYY-MM-DD
  amountOwed: number;
  term: string; // today: "Month 2 of 3", "Ongoing monthly (...)", "Monthly, no minimum"
  nextTerm: string | null; // the same, for the month the next charge (or resume) lands in
  finalMonth: boolean; // the next charge is the last month of the minimum

};

export type Prospect = {
  id: string;
  name: string;
  business: string | null;
  amount: number | null;
  stage: string;
  notes: string | null;
};

type BoardRow = {
  id: string;
  name: string;
  business: string;
  stripe_customer_id: string | null;
  plan: string;
  monthly_amount: number;
  commitment_start: string | null;
  commitment_months: number | null;
  status_override: string | null;
  notes: string | null;
  ignored_invoice_ids: string[] | null;
};

// Only high-ticket billing matters here; this skips AskBabu plans that share
// the Stripe account and customer records.
const MIN_AMOUNT_CENTS = 50000;

function ymd(unix: number | null | undefined): string | null {
  return unix ? new Date(unix * 1000).toISOString().slice(0, 10) : null;
}

function money(n: number): string {
  return `$${n.toLocaleString()}`;
}

function fmtShort(date: string): string {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" }).format(
    new Date(`${date}T00:00:00Z`),
  );
}

/** Which month of a minimum term we're in today, 1-based. */
function termMonth(start: string, now: Date): number {
  const s = new Date(`${start}T00:00:00Z`);
  let months = (now.getUTCFullYear() - s.getUTCFullYear()) * 12 + (now.getUTCMonth() - s.getUTCMonth());
  if (now.getUTCDate() < s.getUTCDate()) months -= 1;
  return Math.max(1, months + 1);
}

function describeTerm(row: BoardRow, on: Date): { term: string; final: boolean } {
  if (!row.commitment_months || !row.commitment_start) return { term: "Monthly, no minimum", final: false };
  const n = termMonth(row.commitment_start, on);
  if (n > row.commitment_months) {
    return { term: `Ongoing monthly (month ${n}, ${row.commitment_months}-mo min done)`, final: false };
  }
  return { term: `Month ${n} of ${row.commitment_months}`, final: n === row.commitment_months };
}

async function loadStripe() {
  const stripe = getStripe();
  const subsByCustomer = new Map<string, Stripe.Subscription[]>();
  for await (const sub of stripe.subscriptions.list({ status: "all", limit: 100 })) {
    const item = sub.items.data[0];
    if ((item?.price?.unit_amount || 0) * (item?.quantity || 1) < MIN_AMOUNT_CENTS) continue;
    const id = typeof sub.customer === "string" ? sub.customer : sub.customer.id;
    subsByCustomer.set(id, [...(subsByCustomer.get(id) || []), sub]);
  }

  // Every open invoice counts as owed, however old, until it's paid or voided
  // in Stripe. The board only shows customers on it, so stale invoices from
  // former clients never surface here.
  const openByCustomer = new Map<string, Stripe.Invoice[]>();
  for await (const inv of stripe.invoices.list({ status: "open", limit: 100 })) {
    if (inv.amount_remaining < MIN_AMOUNT_CENTS) continue;
    const id = typeof inv.customer === "string" ? inv.customer : inv.customer?.id;
    if (!id) continue;
    openByCustomer.set(id, [...(openByCustomer.get(id) || []), inv]);
  }
  return { subsByCustomer, openByCustomer };
}

const SUB_RANK: Record<string, number> = { active: 0, trialing: 1, past_due: 2, unpaid: 3, paused: 4, canceled: 9 };

function buildClient(
  row: BoardRow,
  subs: Stripe.Subscription[],
  open: Stripe.Invoice[],
  now: Date,
): BoardClient {
  const { term } = describeTerm(row, now);
  const base = {
    id: row.id,
    name: row.name,
    business: row.business,
    plan: row.plan,
    monthlyAmount: Number(row.monthly_amount),
    notes: row.notes,
    stripeCustomerId: row.stripe_customer_id,
    stripeUrl: row.stripe_customer_id ? `https://dashboard.stripe.com/customers/${row.stripe_customer_id}` : null,
    term,
    nextTerm: null as string | null,
    finalMonth: false,
    nextCharge: null as string | null,
    pausedUntil: null as string | null,
    amountOwed: 0,
  };

  if (row.status_override === "ended") {
    return { ...base, state: "ended", statusDetail: "Ended", term: "—" };
  }
  if (!row.stripe_customer_id) {
    return { ...base, state: "not_in_stripe", statusDetail: "Not billed in Stripe" };
  }

  const sub = [...subs].sort((a, b) => (SUB_RANK[a.status] ?? 5) - (SUB_RANK[b.status] ?? 5))[0];
  const live = sub && sub.status !== "canceled" ? sub : null;
  const nextCharge = live ? ymd(live.items.data[0]?.current_period_end) : null;
  const pause = live?.pause_collection;
  const owed = open.reduce((sum, inv) => sum + inv.amount_remaining, 0) / 100;
  const oldestOpen = open.map((inv) => ymd(inv.due_date || inv.created)!).sort()[0];
  const canceled = subs.length > 0 && !live;
  const ahead = (date: string | null) => {
    if (!date) return {};
    const t = describeTerm(row, new Date(`${date}T00:00:00Z`));
    return { nextTerm: t.term, finalMonth: t.final };
  };

  if (owed > 0) {
    return {
      ...base,
      ...ahead(nextCharge),
      nextCharge,
      amountOwed: owed,
      state: "past_due",
      statusDetail: `${money(owed)} unpaid since ${fmtShort(oldestOpen)}${canceled ? ", subscription canceled" : ""}`,
      term: canceled ? "Subscription canceled" : term,
    };
  }
  if (pause) {
    const until = ymd(pause.resumes_at);
    return {
      ...base,
      ...ahead(until),
      pausedUntil: until,
      state: "paused",
      statusDetail: until ? `Paused until ${fmtShort(until)}` : "Paused, no resume date",
    };
  }
  if (live) {
    return { ...base, ...ahead(nextCharge), nextCharge, state: "current", statusDetail: live.status === "past_due" ? "Retrying card" : "Current" };
  }
  return { ...base, state: "ended", statusDetail: "No active subscription", term: "—" };
}

export async function getBoard(): Promise<{ clients: BoardClient[]; prospects: Prospect[]; stripeError: string | null }> {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase is not configured");

  const [rowsRes, prospectsRes, stripeData] = await Promise.all([
    supabase.from("client_board").select("*").order("monthly_amount", { ascending: false }),
    supabase.from("client_prospects").select("*").order("created_at", { ascending: true }),
    loadStripe().catch((e: Error) => e),
  ]);
  if (rowsRes.error) throw new Error(rowsRes.error.message);
  if (prospectsRes.error) throw new Error(prospectsRes.error.message);

  const stripeError = stripeData instanceof Error ? stripeData.message : null;
  const { subsByCustomer, openByCustomer } =
    stripeData instanceof Error ? { subsByCustomer: new Map(), openByCustomer: new Map() } : stripeData;

  const now = new Date();
  const clients = (rowsRes.data as BoardRow[]).map((row) => {
    const id = row.stripe_customer_id || "";
    const ignored = new Set(row.ignored_invoice_ids || []);
    const open = (openByCustomer.get(id) || []).filter((inv: Stripe.Invoice) => !ignored.has(inv.id || ""));
    return buildClient(row, subsByCustomer.get(id) || [], open, now);
  });

  const prospects = (prospectsRes.data || []).map((p) => ({
    id: p.id,
    name: p.name,
    business: p.business,
    amount: p.amount === null ? null : Number(p.amount),
    stage: p.stage,
    notes: p.notes,
  }));

  return { clients, prospects, stripeError };
}
