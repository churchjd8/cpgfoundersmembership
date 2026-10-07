// Upload the Excel file back. Rows with an ID update that row; rows without
// one are added. Blank template rows are ignored.
//   POST /api/cpt-launch-list/import  (multipart: file, who)
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { parseWorkbook, logActivity, sameOrigin } from "@/lib/cpt-launch-list";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  const who = typeof form?.get("who") === "string" ? String(form!.get("who")).trim().slice(0, 60) : "";
  if (!(file instanceof File)) return NextResponse.json({ error: "no file" }, { status: 400 });
  if (file.size > 5 * 1024 * 1024) return NextResponse.json({ error: "file too large" }, { status: 413 });

  const db = getSupabaseAdmin();
  if (!db) return NextResponse.json({ error: "storage unavailable" }, { status: 500 });

  let parsed;
  try {
    parsed = await parseWorkbook(await file.arrayBuffer());
  } catch (e) {
    console.error("[cpt-launch-list] parse:", e);
    return NextResponse.json({ error: "could not read that file. Is it the .xlsx from the download button?" }, { status: 400 });
  }
  if (parsed.rows.length === 0) {
    return NextResponse.json({ error: "no rows found. Tier and Name are required on each line.", skipped: parsed.skipped }, { status: 400 });
  }

  const { data: existing, error: exErr } = await db.from("cpt_launch_contacts").select("id");
  if (exErr) return NextResponse.json({ error: "could not load" }, { status: 500 });
  const known = new Set((existing ?? []).map((r) => r.id as string));

  const now = new Date().toISOString();
  const updates = parsed.rows.filter((r) => r.id && known.has(r.id));
  const inserts = parsed.rows.filter((r) => !r.id || !known.has(r.id));

  let updated = 0;
  for (const r of updates) {
    const { id, ...fields } = r;
    const { error } = await db.from("cpt_launch_contacts").update({ ...fields, updated_at: now }).eq("id", id!);
    if (error) console.error("[cpt-launch-list] import update:", error.message);
    else updated++;
  }
  let added = 0;
  if (inserts.length) {
    const by = who ? `${who} (Excel)` : "Excel import";
    const { error, count } = await db
      .from("cpt_launch_contacts")
      .insert(
        inserts.map((r) => {
          const { id: _drop, ...fields } = r;
          void _drop;
          return { ...fields, added_by: by };
        }),
        { count: "exact" },
      );
    if (error) {
      console.error("[cpt-launch-list] import insert:", error.message);
      return NextResponse.json({ error: "could not save the new rows" }, { status: 500 });
    }
    added = count ?? inserts.length;
  }

  await logActivity(who, "import", `${added} added, ${updated} updated, ${parsed.skipped} skipped`);
  return NextResponse.json({ added, updated, skipped: parsed.skipped });
}
