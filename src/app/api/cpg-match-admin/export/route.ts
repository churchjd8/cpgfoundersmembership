import { cookies } from "next/headers";
import { getSupabaseAdmin } from "@/lib/supabase";
import { CPG_MATCH_ADMIN_COOKIE, isCpgMatchAdmin } from "@/lib/cpg-match-admin-auth";

function csv(value: unknown) { return `"${String(value ?? "").replace(/"/g, '""')}"`; }
export async function GET() {
  const token = (await cookies()).get(CPG_MATCH_ADMIN_COOKIE)?.value;
  if (!await isCpgMatchAdmin(token)) return new Response("Unauthorized", { status: 401 });
  const supabase = getSupabaseAdmin(); if (!supabase) return new Response("Database unavailable", { status: 500 });
  const { data, error } = await supabase.from("cpg_match_submissions").select("*").order("created_at", { ascending: false });
  if (error) return new Response(error.message, { status: 500 });
  const header = ["type", "first_name", "last_name", "email", "brand", "vendor_name", "vendor_category", "created_at", "full_response"];
  const lines = (data || []).map(row => [row.submission_type, row.first_name, row.last_name, row.email, row.brand, row.vendor_name, row.vendor_category, row.created_at, JSON.stringify(row.payload)].map(csv).join(","));
  return new Response([header.join(","), ...lines].join("\n"), { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": "attachment; filename=cpg-match-submissions.csv" } });
}
