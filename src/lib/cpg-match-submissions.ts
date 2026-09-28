import type { VendorCrm } from "@/lib/cpg-match-crm";
import { getSupabaseAdmin } from "@/lib/supabase";

export type Entry = { id: string; submission_type: string; first_name: string; last_name: string; email: string; brand: string; vendor_name: string | null; vendor_category: string | null; payload: Record<string, unknown>; created_at: string; crm: Partial<VendorCrm>; crm_version: number };

export async function loadSubmissions(type?: string) {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Database unavailable");
  const entries: Entry[] = [];
  for (let offset = 0; ; offset += 1000) {
    let query = supabase.from("cpg_match_submissions").select("*").order("created_at", { ascending: false }).order("id").range(offset, offset + 999);
    if (type) query = query.eq("submission_type", type);
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    entries.push(...(data as Entry[]));
    if (data.length < 1000) return entries;
  }
}
