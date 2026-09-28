import { cookies } from "next/headers";
import {
  CPG_MATCH_ADMIN_COOKIE,
  isCpgMatchAdmin,
} from "@/lib/cpg-match-admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase";
import {
  vendorCrm,
  validateCrmUpdate,
  updateVendorCrm,
} from "@/lib/cpg-match-crm";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const token = (await cookies()).get(CPG_MATCH_ADMIN_COOKIE)?.value;
  if (!(await isCpgMatchAdmin(token)))
    return Response.json(
      { error: "Please sign in again before saving." },
      { status: 401 },
    );
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return Response.json({ error: "Invalid request origin." }, { status: 403 });
  const { id } = await params;
  if (!/^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(id))
    return Response.json({ error: "Invalid nomination." }, { status: 400 });
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || Array.isArray(body))
    return Response.json({ error: "Invalid update." }, { status: 400 });
  const validation = validateCrmUpdate(body);
  if (validation) return Response.json({ error: validation }, { status: 400 });
  const supabase = getSupabaseAdmin();
  if (!supabase)
    return Response.json({ error: "Database unavailable." }, { status: 503 });
  const { data: entry, error } = await supabase
    .from("cpg_match_submissions")
    .select("crm,crm_version")
    .eq("id", id)
    .eq("submission_type", "recommendation")
    .maybeSingle();
  if (error)
    return Response.json(
      { error: "Could not load nomination." },
      { status: 500 },
    );
  if (!entry)
    return Response.json({ error: "Nomination not found." }, { status: 404 });
  if (entry.crm_version !== body.version)
    return Response.json(
      {
        error:
          "Someone else updated this nomination. Copy your unsaved note, reload the page, and try again.",
      },
      { status: 409 },
    );
  const crm = updateVendorCrm(
    vendorCrm(entry.crm),
    body,
    new Date().toISOString(),
  );
  const { data: saved, error: saveError } = await supabase
    .from("cpg_match_submissions")
    .update({ crm, crm_version: body.version + 1 })
    .eq("id", id)
    .eq("submission_type", "recommendation")
    .eq("crm_version", body.version)
    .select("crm,crm_version")
    .maybeSingle();
  if (saveError)
    return Response.json(
      {
        error:
          "Could not save changes. Your draft is still here; please try again.",
      },
      { status: 500 },
    );
  if (!saved)
    return Response.json(
      {
        error:
          "Someone else updated this nomination. Copy your unsaved note, reload the page, and try again.",
      },
      { status: 409 },
    );
  return Response.json(saved, { headers: { "Cache-Control": "no-store" } });
}
