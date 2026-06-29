import { getSupabaseAdmin } from "@/lib/supabase";
import { listStripeClients, getStripeClientByEmail, type StripeClientDetail } from "@/lib/stripe";

export type AdminClientMeta = {
  email: string;
  name: string | null;
  business: string | null;
  product: string | null;
  start_date: string | null;
  alt_emails: string[];
  status: string;
  notes: string | null;
  on_roster: boolean;
};

export type Booking = {
  slotStart: string;
  name: string;
  phone: string;
  timezone: string | null;
};

export type RosterRow = {
  email: string;
  name: string;
  business: string | null;
  manualStatus: string | null; // from admin_clients
  stripeStatus: string | null; // active | past_due | canceled | ...
  amount: number;
  interval: string;
  nextCharge: string | null;
  card: string | null;
  inStripe: boolean;
  nextCall: string | null; // ISO
};

async function getClientMeta(): Promise<Map<string, AdminClientMeta>> {
  const supabase = getSupabaseAdmin();
  const map = new Map<string, AdminClientMeta>();
  if (!supabase) return map;
  const { data, error } = await supabase
    .from("admin_clients")
    .select("email,name,business,product,start_date,alt_emails,status,notes,on_roster");
  if (error) {
    console.error("admin_clients read error:", error.message);
    return map;
  }
  for (const r of data || []) {
    const meta = { ...r, alt_emails: r.alt_emails || [] } as AdminClientMeta;
    map.set(r.email.toLowerCase(), meta);
  }
  return map;
}

/** Upcoming bookings grouped by email (soonest first). */
async function getUpcomingByEmail(): Promise<Map<string, Booking[]>> {
  const supabase = getSupabaseAdmin();
  const map = new Map<string, Booking[]>();
  if (!supabase) return map;
  const nowIso = new Date().toISOString();
  const { data, error } = await supabase
    .from("coaching_bookings")
    .select("email,name,phone,slot_start,client_timezone")
    .gte("slot_start", nowIso)
    .order("slot_start", { ascending: true });
  if (error) {
    console.error("coaching_bookings read error:", error.message);
    return map;
  }
  for (const r of data || []) {
    const email = (r.email || "").toLowerCase();
    const list = map.get(email) || [];
    list.push({
      slotStart: r.slot_start,
      name: r.name,
      phone: r.phone,
      timezone: r.client_timezone,
    });
    map.set(email, list);
  }
  return map;
}

/**
 * The roster is the curated high-ticket list (admin_clients where on_roster =
 * true). Stripe only enriches payment data, matched by the client's primary
 * email or any of their alt_emails. Stripe customers not on the list are hidden.
 */
export async function getRoster(): Promise<RosterRow[]> {
  const [stripeClients, meta, upcoming] = await Promise.all([
    listStripeClients().catch((e) => {
      console.error("Stripe roster error:", e.message);
      return [];
    }),
    getClientMeta(),
    getUpcomingByEmail(),
  ]);

  // Index Stripe subs by email so we can join on primary-or-alt.
  const stripeByEmail = new Map(stripeClients.map((s) => [s.email.toLowerCase(), s]));

  const rows: RosterRow[] = [];
  for (const [email, m] of meta) {
    if (m.on_roster === false) continue;

    const candidates = [email, ...(m.alt_emails || []).map((e) => e.toLowerCase())];
    const s = candidates.map((e) => stripeByEmail.get(e)).find(Boolean) || null;
    const matchedEmail = s?.email.toLowerCase();
    const nextCall =
      candidates.map((e) => upcoming.get(e)?.[0]?.slotStart).find(Boolean) ?? null;

    rows.push({
      email,
      name: m.name || s?.name || email,
      business: m.business ?? null,
      manualStatus: m.status ?? null,
      stripeStatus: s?.status ?? null,
      amount: s?.amount ?? 0,
      interval: s?.interval ?? "month",
      nextCharge: s?.nextCharge ?? null,
      card: s?.card ?? null,
      inStripe: Boolean(s),
      nextCall,
    });
    if (matchedEmail) stripeByEmail.delete(matchedEmail);
  }

  // Active first, then by monthly value descending.
  const rank = (r: RosterRow) =>
    r.stripeStatus === "active" || r.stripeStatus === "trialing" ? 0 : r.stripeStatus === "past_due" ? 1 : 2;
  return rows.sort((a, b) => rank(a) - rank(b) || b.amount - a.amount);
}

export type CallNote = {
  title: string | null;
  meetingDate: string | null;
  summary: string | null;
  attendees: string[];
  source: string;
};

export type ClientDetail = {
  email: string;
  meta: AdminClientMeta | null;
  stripe: StripeClientDetail | null;
  upcoming: Booking[];
  past: Booking[];
  callNotes: CallNote[];
};

export async function getClientDetail(email: string): Promise<ClientDetail> {
  const key = email.toLowerCase();
  const supabase = getSupabaseAdmin();

  const [metaRes, bookingsRes, notesRes] = await Promise.all([
    supabase ? supabase.from("admin_clients").select("*").eq("email", key).maybeSingle() : Promise.resolve({ data: null }),
    supabase
      ? supabase.from("coaching_bookings").select("email,name,phone,slot_start,client_timezone").eq("email", key).order("slot_start", { ascending: true })
      : Promise.resolve({ data: [] }),
    supabase
      ? supabase.from("call_notes").select("title,meeting_date,summary,attendees,source").eq("client_email", key).order("meeting_date", { ascending: false, nullsFirst: false })
      : Promise.resolve({ data: [] }),
  ]);

  const meta = (metaRes as { data: (AdminClientMeta & Record<string, unknown>) | null }).data ?? null;

  // Stripe sub may be under the primary email or any alt email.
  const candidates = [key, ...((meta?.alt_emails as string[] | undefined) || []).map((e) => e.toLowerCase())];
  let stripe: StripeClientDetail | null = null;
  for (const email of candidates) {
    stripe = await getStripeClientByEmail(email).catch((e) => {
      console.error("Stripe detail error:", e.message);
      return null;
    });
    if (stripe) break;
  }

  const now = Date.now();
  const bookings = ((bookingsRes as { data: { slot_start: string; name: string; phone: string; client_timezone: string | null }[] }).data || []).map((r) => ({
    slotStart: r.slot_start,
    name: r.name,
    phone: r.phone,
    timezone: r.client_timezone,
  }));

  const callNotes = ((notesRes as { data: { title: string | null; meeting_date: string | null; summary: string | null; attendees: string[] | null; source: string }[] }).data || []).map((n) => ({
    title: n.title,
    meetingDate: n.meeting_date,
    summary: n.summary,
    attendees: n.attendees || [],
    source: n.source,
  }));

  return {
    email: key,
    meta: meta ?? null,
    stripe,
    upcoming: bookings.filter((b) => new Date(b.slotStart).getTime() >= now),
    past: bookings.filter((b) => new Date(b.slotStart).getTime() < now).reverse(),
    callNotes,
  };
}
