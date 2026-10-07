// Jeff's launch list: shared rows for /cpt-launch-plan#list.
//   GET              -> { contacts, activity }
//   POST   { row, who }        -> insert
//   PATCH  { id, patch, who }  -> update
//   DELETE { id, who }         -> remove
// Same-origin only. The page itself is unlisted; this keeps the API from being
// a public write endpoint without adding a login Jeff would have to deal with.
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { listContacts, recentActivity, logActivity, normalizeInput, sameOrigin, type Contact } from "@/lib/cpt-launch-list";

export const dynamic = "force-dynamic";

function who(body: Record<string, unknown>): string {
  return typeof body.who === "string" ? body.who.trim().slice(0, 60) : "";
}

export async function GET(request: Request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  try {
    const [contacts, activity] = await Promise.all([listContacts(), recentActivity()]);
    return NextResponse.json({ contacts, activity });
  } catch (e) {
    console.error("[cpt-launch-list] GET:", e);
    return NextResponse.json({ error: "could not load" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  if (body.action === "view") {
    await logActivity(who(body), "opened the list");
    return NextResponse.json({ ok: true });
  }
  const input = normalizeInput((body.row as Record<string, unknown>) ?? {});
  if (!input) return NextResponse.json({ error: "tier and name are required" }, { status: 400 });
  const db = getSupabaseAdmin();
  if (!db) return NextResponse.json({ error: "storage unavailable" }, { status: 500 });

  const by = who(body);
  const { data, error } = await db
    .from("cpt_launch_contacts")
    .insert({ ...input, added_by: by })
    .select("*")
    .single();
  if (error) {
    console.error("[cpt-launch-list] insert:", error.message);
    return NextResponse.json({ error: "could not save" }, { status: 500 });
  }
  await logActivity(by, "add", `${input.tier}: ${input.name}`);
  return NextResponse.json({ contact: data as Contact });
}

export async function PATCH(request: Request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const id = typeof body.id === "string" ? body.id : "";
  const patchRaw = (body.patch as Record<string, unknown>) ?? {};
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  const db = getSupabaseAdmin();
  if (!db) return NextResponse.json({ error: "storage unavailable" }, { status: 500 });

  // Only known columns, trimmed. Name can't be blanked.
  const allowed = ["tier", "name", "how_i_know_them", "channel", "contact", "notes"] as const;
  const patch: Record<string, string> = {};
  for (const k of allowed) {
    const v = patchRaw[k];
    if (typeof v === "string") patch[k] = v.trim().slice(0, 1000);
  }
  if (patch.name === "") delete patch.name;
  if (patch.tier && !["Tier 1", "Tier 2", "Tier 3", "Champion"].includes(patch.tier)) delete patch.tier;
  if (Object.keys(patch).length === 0) return NextResponse.json({ ok: true });

  const { data, error } = await db
    .from("cpt_launch_contacts")
    .update({ ...patch, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select("*")
    .single();
  if (error) {
    console.error("[cpt-launch-list] update:", error.message);
    return NextResponse.json({ error: "could not save" }, { status: 500 });
  }
  const c = data as Contact;
  await logActivity(who(body), "edit", `${c.tier}: ${c.name} (${Object.keys(patch).join(", ")})`);
  return NextResponse.json({ contact: c });
}

export async function DELETE(request: Request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const id = typeof body.id === "string" ? body.id : "";
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  const db = getSupabaseAdmin();
  if (!db) return NextResponse.json({ error: "storage unavailable" }, { status: 500 });

  const { data, error } = await db.from("cpt_launch_contacts").delete().eq("id", id).select("tier,name").maybeSingle();
  if (error) {
    console.error("[cpt-launch-list] delete:", error.message);
    return NextResponse.json({ error: "could not delete" }, { status: 500 });
  }
  if (data) await logActivity(who(body), "remove", `${data.tier}: ${data.name}`);
  return NextResponse.json({ ok: true });
}
