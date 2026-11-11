// Every /apply submission is written to Supabase (`advisory_applications`)
// before anything else happens, including the ones the bot screen drops. The
// inbox email and Kajabi can both fail or be skipped; this row cannot be lost
// with them. Shown on /admin/applications.
import { getSupabaseAdmin } from "@/lib/supabase";
import type { SpamVerdict } from "@/lib/application-spam";

const TABLE = "advisory_applications";

export type ApplicationRow = {
  id: string;
  created_at: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  business: string | null;
  website: string | null;
  revenue: string | null;
  challenge: string | null;
  breakthrough: string | null;
  referral: string | null;
  interest: string | null;
  readiness: string | null;
  screen: "ok" | "likely-spam" | "bot";
  screen_reason: string | null;
  fill_ms: number | null;
  user_agent: string | null;
  kajabi_ok: boolean | null;
  email_ok: boolean | null;
  error: string | null;
};

const text = (v: unknown, max = 5000): string | null =>
  typeof v === "string" && v.trim() ? v.trim().slice(0, max) : null;

/** Insert the submission. Never throws; returns the row id, or null if it could not be saved. */
export async function saveApplication(
  body: Record<string, unknown>,
  verdict: SpamVerdict,
  userAgent: string | null,
): Promise<string | null> {
  try {
    const supabase = getSupabaseAdmin();
    if (!supabase) {
      console.error("[applications] Supabase not configured; application not saved");
      return null;
    }
    const fillMs = Number(body.fillMs);
    const { data, error } = await supabase
      .from(TABLE)
      .insert({
        first_name: text(body.firstName, 200),
        last_name: text(body.lastName, 200),
        email: text(body.email, 320)?.toLowerCase() ?? null,
        business: text(body.business, 300),
        website: text(body.website, 500),
        revenue: text(body.revenue, 200),
        challenge: text(body.challenge),
        breakthrough: text(body.breakthrough),
        referral: text(body.referral, 1000),
        interest: text(body.interest, 100),
        readiness: text(body.readiness, 100),
        screen: verdict.kind,
        screen_reason:
          verdict.kind === "bot"
            ? verdict.reason
            : verdict.kind === "likely-spam"
              ? verdict.reasons.join(", ")
              : null,
        fill_ms: Number.isFinite(fillMs) && fillMs > 0 && fillMs < 2_000_000_000 ? Math.round(fillMs) : null,
        user_agent: text(userAgent, 500),
      })
      .select("id")
      .single();
    if (error) {
      console.error("[applications] insert failed:", error.message);
      return null;
    }
    return data.id as string;
  } catch (err) {
    console.error("[applications] insert threw:", err);
    return null;
  }
}

/** Record what happened downstream (Kajabi, inbox email). Never throws. */
export async function markApplication(
  id: string | null,
  patch: Partial<Pick<ApplicationRow, "kajabi_ok" | "email_ok" | "error">>,
): Promise<void> {
  if (!id) return;
  try {
    const supabase = getSupabaseAdmin();
    if (!supabase) return;
    const { error } = await supabase.from(TABLE).update(patch).eq("id", id);
    if (error) console.error("[applications] update failed:", error.message);
  } catch (err) {
    console.error("[applications] update threw:", err);
  }
}

export async function listApplications(
  limit = 300,
): Promise<{ rows: ApplicationRow[]; error: string | null }> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return { rows: [], error: "Supabase is not configured on this environment." };
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) return { rows: [], error: error.message };
  return { rows: (data || []) as ApplicationRow[], error: null };
}
