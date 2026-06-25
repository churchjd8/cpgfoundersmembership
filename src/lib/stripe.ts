import Stripe from "stripe";

let cached: Stripe | null = null;

export function getStripe(): Stripe {
  if (cached) return cached;
  cached = new Stripe(process.env.STRIPE_SECRET_KEY!);
  return cached;
}

export type StripeClient = {
  email: string;
  name: string | null;
  customerId: string;
  status: string; // active | past_due | canceled | trialing | ...
  amount: number; // dollars, per interval
  interval: string; // month | year
  nextCharge: string | null; // YYYY-MM-DD
  card: string | null; // "visa ····4242"
};

function cardLabel(pm: Stripe.PaymentMethod | string | null | undefined): string | null {
  if (!pm || typeof pm === "string" || !pm.card) return null;
  return `${pm.card.brand} ····${pm.card.last4}`;
}

// Rank statuses so the "primary" subscription per customer wins.
const STATUS_RANK: Record<string, number> = {
  active: 0,
  trialing: 1,
  past_due: 2,
  unpaid: 3,
  paused: 4,
  canceled: 5,
  incomplete: 6,
  incomplete_expired: 7,
};

/** One row per customer (their primary subscription), pulled live from Stripe. */
export async function listStripeClients(): Promise<StripeClient[]> {
  const stripe = getStripe();
  const subs = await stripe.subscriptions.list({
    status: "all",
    limit: 100,
    expand: ["data.customer", "data.default_payment_method"],
  });

  const byEmail = new Map<string, StripeClient>();
  for (const s of subs.data) {
    const cust = s.customer as Stripe.Customer;
    const email = (cust?.email || "").toLowerCase();
    if (!email || cust?.deleted) continue;
    const item = s.items.data[0];
    const price = item?.price;
    const end = item?.current_period_end ?? null;
    const row: StripeClient = {
      email,
      name: cust.name || null,
      customerId: cust.id,
      status: s.status,
      amount: price?.unit_amount ? price.unit_amount / 100 : 0,
      interval: price?.recurring?.interval ?? "month",
      nextCharge: end ? new Date(end * 1000).toISOString().slice(0, 10) : null,
      card: cardLabel(s.default_payment_method as Stripe.PaymentMethod | null),
    };
    const existing = byEmail.get(email);
    if (!existing || (STATUS_RANK[s.status] ?? 9) < (STATUS_RANK[existing.status] ?? 9)) {
      byEmail.set(email, row);
    }
  }
  return [...byEmail.values()];
}

export type StripeClientDetail = StripeClient & {
  invoices: { date: string; amount: number; status: string }[];
};

/** Full Stripe picture for one client (by email): primary sub + payment history. */
export async function getStripeClientByEmail(email: string): Promise<StripeClientDetail | null> {
  const stripe = getStripe();
  const found = await stripe.customers.list({ email: email.toLowerCase(), limit: 1 });
  const customer = found.data[0];
  if (!customer) return null;

  const subs = await stripe.subscriptions.list({
    customer: customer.id,
    status: "all",
    limit: 10,
    expand: ["data.default_payment_method"],
  });
  // Primary = best-ranked subscription.
  const primary = [...subs.data].sort(
    (a, b) => (STATUS_RANK[a.status] ?? 9) - (STATUS_RANK[b.status] ?? 9),
  )[0];

  const invoiceList = await stripe.invoices.list({ customer: customer.id, limit: 10 });
  const invoices = invoiceList.data.map((inv) => ({
    date: inv.created ? new Date(inv.created * 1000).toISOString().slice(0, 10) : "-",
    amount: (inv.amount_paid ?? 0) / 100,
    status: inv.status ?? "-",
  }));

  const item = primary?.items.data[0];
  const price = item?.price;
  const end = item?.current_period_end ?? null;

  return {
    email: email.toLowerCase(),
    name: customer.name || null,
    customerId: customer.id,
    status: primary?.status ?? "none",
    amount: price?.unit_amount ? price.unit_amount / 100 : 0,
    interval: price?.recurring?.interval ?? "month",
    nextCharge: end ? new Date(end * 1000).toISOString().slice(0, 10) : null,
    card: cardLabel(primary?.default_payment_method as Stripe.PaymentMethod | null),
    invoices,
  };
}
