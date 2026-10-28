import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { CLIENTS_COOKIE, isClientsViewer } from "@/lib/clients-auth";
import { getSupabaseAdmin } from "@/lib/supabase";

// Edits from the /clients board. Clients only get their curated fields edited
// (billing comes from Stripe); prospects are fully hand-maintained.
const TABLES = {
  clients: { name: "client_board", fields: ["plan", "monthly_amount", "notes"], create: false },
  prospects: { name: "client_prospects", fields: ["name", "business", "amount", "stage", "notes"], create: true },
} as const;

type Params = { params: Promise<{ table: string }> };

async function resolve(params: Params["params"]) {
  if (!(await isClientsViewer((await cookies()).get(CLIENTS_COOKIE)?.value))) {
    return { error: NextResponse.json({ error: "Not signed in." }, { status: 401 }) };
  }
  const table = TABLES[(await params).table as keyof typeof TABLES];
  const supabase = getSupabaseAdmin();
  if (!table || !supabase) return { error: NextResponse.json({ error: "Not found." }, { status: 404 }) };
  return { table, supabase };
}

function pick(body: Record<string, unknown>, fields: readonly string[]) {
  const out: Record<string, unknown> = {};
  for (const f of fields) {
    if (!(f in body)) continue;
    const v = body[f];
    out[f] = typeof v === "string" ? v.trim() || null : v ?? null;
  }
  return out;
}

export async function POST(request: Request, { params }: Params) {
  const r = await resolve(params);
  if ("error" in r) return r.error;
  if (!r.table.create) return NextResponse.json({ error: "Not allowed." }, { status: 405 });
  const values = pick(await request.json().catch(() => ({})), r.table.fields);
  if (!values.name) return NextResponse.json({ error: "Name is required." }, { status: 400 });
  const { data, error } = await r.supabase.from(r.table.name).insert(values).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PATCH(request: Request, { params }: Params) {
  const r = await resolve(params);
  if ("error" in r) return r.error;
  const body = await request.json().catch(() => ({}));
  if (!body.id) return NextResponse.json({ error: "Missing id." }, { status: 400 });
  const values = { ...pick(body, r.table.fields), updated_at: new Date().toISOString() };
  const { error } = await r.supabase.from(r.table.name).update(values).eq("id", body.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request, { params }: Params) {
  const r = await resolve(params);
  if ("error" in r) return r.error;
  if (!r.table.create) return NextResponse.json({ error: "Not allowed." }, { status: 405 });
  const { id } = await request.json().catch(() => ({ id: null }));
  if (!id) return NextResponse.json({ error: "Missing id." }, { status: 400 });
  const { error } = await r.supabase.from(r.table.name).delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
