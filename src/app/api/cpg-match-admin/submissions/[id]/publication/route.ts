import { cookies } from "next/headers";
import {
  CPG_MATCH_ADMIN_COOKIE,
  isCpgMatchAdmin,
} from "@/lib/cpg-match-admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase";
import { parseReview } from "@/lib/cpg-match-review";
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (
    !(await isCpgMatchAdmin(
      (await cookies()).get(CPG_MATCH_ADMIN_COOKIE)?.value,
    ))
  )
    return Response.json({ error: "Please sign in again." }, { status: 401 });
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return Response.json({ error: "Invalid request origin." }, { status: 403 });
  const body = await request.json().catch(() => null);
  if (
    !body ||
    typeof body.publish !== "boolean" ||
    (body.publish && body.verified !== true)
  )
    return Response.json(
      { error: "Confirm private verification before publication." },
      { status: 400 },
    );
  const { id } = await params;
  if (!/^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(id))
    return Response.json({ error: "Invalid nomination." }, { status: 400 });
  const db = getSupabaseAdmin();
  if (!db)
    return Response.json({ error: "Database unavailable." }, { status: 503 });
  const { data: row, error } = await db
    .from("cpg_match_submissions")
    .select("*")
    .eq("id", id)
    .eq("submission_type", "recommendation")
    .maybeSingle();
  if (error)
    return Response.json({ error: "Could not load review." }, { status: 500 });
  if (!row)
    return Response.json({ error: "Review not found." }, { status: 404 });
  if (body.publish) {
    if (
      row.review_schema_version !== 2 ||
      !row.approved_at ||
      !row.public_review
    )
      return Response.json(
        {
          error:
            "This historical review has no recorded approval for the new publication policy. Obtain a new approved submission first.",
        },
        { status: 409 },
      );
    try {
      const approved = parseReview(row.payload).publicReview;
      // Compare structured values independently of PostgreSQL JSONB key order.
      const canonical = (value: unknown): string =>
        Array.isArray(value)
          ? `[${value.map(canonical).join(",")}]`
          : value && typeof value === "object"
            ? `{${Object.entries(value)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([key, v]) => `${JSON.stringify(key)}:${canonical(v)}`)
                .join(",")}}`
            : JSON.stringify(value);
      if (canonical(approved) !== canonical(row.public_review))
        throw new Error("Public content differs from the reviewer's approval.");
    } catch {
      return Response.json(
        {
          error:
            "The review no longer matches recorded approval. Obtain a new approved submission before publishing.",
        },
        { status: 409 },
      );
    }
  }
  const { data, error: saveError } = await db
    .from("cpg_match_submissions")
    .update({
      publication_status: body.publish ? "published" : "pending",
      ...(body.publish ? { verified_at: new Date().toISOString() } : {}),
    })
    .eq("id", id)
    .select("*")
    .single();
  if (saveError)
    return Response.json(
      { error: "Could not update publication." },
      { status: 500 },
    );
  return Response.json(data, { headers: { "Cache-Control": "no-store" } });
}
