// Jeff's launch list for The Cold-Pressed Truth: shared rows in Supabase,
// edited on /cpt-launch-plan#list or in Excel (download, add names, re-upload).
import ExcelJS from "exceljs";
import { getSupabaseAdmin } from "@/lib/supabase";

export const TIERS = ["Tier 1", "Tier 2", "Tier 3", "Champion"] as const;
export type Tier = (typeof TIERS)[number];
export const CHANNELS = ["Text", "Call", "Email", "WhatsApp", "LinkedIn", "In person"] as const;

export const TIER_GUIDE: Record<Tier, { who: string; size: string; ask: string }> = {
  "Tier 1": {
    who: "Ride or dies. Family, close friends, former partners, board members, the Suja crew, longtime clients. People who buy the day Jeff asks.",
    size: "50-100",
    ask: "Buy the ebook AND the paperback on Nov 17. Review that week. Post about it. Personal text or call from Jeff.",
  },
  "Tier 2": {
    who: "Friends of the work. Founders Club WhatsApp, coaching and membership clients, LinkedIn likers and commenters, workshop attendees.",
    size: "Hundreds",
    ask: "'My new book just came out. It's $0.99 this week if you'd like to support.' Ebook link only. WhatsApp, LinkedIn DM, email.",
  },
  "Tier 3": {
    who: "The long tail. First-degree LinkedIn connections Jeff doesn't talk to, old contacts, followers who never engage. Only add people you specifically want included; the AI covers the rest.",
    size: "Optional",
    ask: "'My new book came out. Here's what it's about. Here's the link.' LinkedIn DM, no follow-up.",
  },
  Champion: {
    who: "Blurb writers, the foreword, and anyone with a real audience. Held for AFTER the Amazon week.",
    size: "5-15",
    ask: "One specific ask each (podcast, post, intro, bulk order), pointed at the free book funnel, never the $0.99 week.",
  },
};

export type Contact = {
  id: string;
  tier: Tier;
  name: string;
  how_i_know_them: string;
  channel: string;
  contact: string;
  notes: string;
  added_by: string;
  created_at: string;
  updated_at: string;
};

export type Activity = {
  id: string;
  who: string;
  action: string;
  detail: string;
  created_at: string;
};

export type ContactInput = {
  tier: Tier;
  name: string;
  how_i_know_them?: string;
  channel?: string;
  contact?: string;
  notes?: string;
};

// Same-origin check for the API routes. The page is unlisted; this keeps the
// routes from being an anonymous public write endpoint.
export function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin") || request.headers.get("referer") || "";
  const host = request.headers.get("host") || "";
  if (!host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export function isTier(v: unknown): v is Tier {
  return typeof v === "string" && (TIERS as readonly string[]).includes(v);
}

function clean(v: unknown, max = 500): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export function normalizeInput(raw: Record<string, unknown>): ContactInput | null {
  const tier = raw.tier;
  const name = clean(raw.name, 200);
  if (!isTier(tier) || !name) return null;
  return {
    tier,
    name,
    how_i_know_them: clean(raw.how_i_know_them),
    channel: clean(raw.channel, 40),
    contact: clean(raw.contact, 200),
    notes: clean(raw.notes, 1000),
  };
}

export async function listContacts(): Promise<Contact[]> {
  const db = getSupabaseAdmin();
  if (!db) throw new Error("storage unavailable");
  const { data, error } = await db
    .from("cpt_launch_contacts")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as Contact[];
}

export async function recentActivity(limit = 12): Promise<Activity[]> {
  const db = getSupabaseAdmin();
  if (!db) throw new Error("storage unavailable");
  const { data, error } = await db
    .from("cpt_launch_list_activity")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message);
  return (data ?? []) as Activity[];
}

export async function logActivity(who: string, action: string, detail = ""): Promise<void> {
  const db = getSupabaseAdmin();
  if (!db) return;
  const { error } = await db
    .from("cpt_launch_list_activity")
    .insert({ who: clean(who, 60) || "someone", action, detail: clean(detail, 300) });
  if (error) console.error("[cpt-launch-list] activity log failed:", error.message);
}

/* ------------------------------------------------------------------ */
/* Excel                                                               */
/* ------------------------------------------------------------------ */

const COLUMNS = [
  { header: "ID (leave blank for new)", key: "id", width: 38 },
  { header: "Tier", key: "tier", width: 12 },
  { header: "Name", key: "name", width: 28 },
  { header: "How I know them", key: "how_i_know_them", width: 32 },
  { header: "Best channel", key: "channel", width: 14 },
  { header: "Phone or email", key: "contact", width: 28 },
  { header: "Notes / the ask", key: "notes", width: 44 },
] as const;

const BLANK_ROWS = 300;

// One workbook serves as both the template and the export: it carries every
// row already in the database, then blank validated rows for new names.
export async function buildWorkbook(rows: Contact[]): Promise<Buffer> {
  const wb = new ExcelJS.Workbook();
  wb.creator = "CPG Founders Group";

  const ws = wb.addWorksheet("Jeff's List", { views: [{ state: "frozen", ySplit: 1 }] });
  ws.columns = COLUMNS.map((c) => ({ header: c.header, key: c.key, width: c.width }));
  ws.getRow(1).font = { bold: true };
  ws.getRow(1).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF0B1A2E" } };
  ws.getRow(1).font = { bold: true, color: { argb: "FFDFA13C" } };

  for (const r of rows) {
    ws.addRow({
      id: r.id,
      tier: r.tier,
      name: r.name,
      how_i_know_them: r.how_i_know_them,
      channel: r.channel,
      contact: r.contact,
      notes: r.notes,
    });
  }
  const last = rows.length + 1 + BLANK_ROWS;
  // Range validations exist at runtime but aren't in exceljs's typings.
  const validations = (ws as unknown as { dataValidations: { add(range: string, v: ExcelJS.DataValidation): void } }).dataValidations;
  validations.add(`B2:B${last}`, {
    type: "list",
    allowBlank: true,
    formulae: [`"${TIERS.join(",")}"`],
    showErrorMessage: true,
    errorTitle: "Tier",
    error: `Pick one of: ${TIERS.join(", ")}`,
  });
  validations.add(`E2:E${last}`, {
    type: "list",
    allowBlank: true,
    formulae: [`"${CHANNELS.join(",")}"`],
  });
  ws.getColumn("id").font = { color: { argb: "FF9CA3AF" }, size: 9 };
  ws.autoFilter = { from: "A1", to: `G${Math.max(2, rows.length + 1)}` };

  const guide = wb.addWorksheet("How to use");
  guide.columns = [{ width: 14 }, { width: 100 }];
  const lines: [string, string][] = [
    ["Step 1", "Add names on the Jeff's List sheet. Tier and Name are required. Leave the ID column blank for new people."],
    ["Step 2", "Save the file and upload it on the launch plan page (Jeff's list tab, 'Import Excel'). New rows are added; rows with an ID are updated."],
    ["Step 3", "Download again any time to get the latest list from everyone."],
    ["", ""],
    ["Tiers", ""],
    ...(TIERS.map((t) => [t, `${TIER_GUIDE[t].who} Target: ${TIER_GUIDE[t].size}. The ask: ${TIER_GUIDE[t].ask}`]) as [string, string][]),
    ["", ""],
    ["Channels", CHANNELS.join(", ")],
  ];
  for (const [a, b] of lines) {
    const row = guide.addRow([a, b]);
    row.getCell(2).alignment = { wrapText: true, vertical: "top" };
    if (a && (a.startsWith("Step") || a === "Tiers" || a === "Channels")) row.getCell(1).font = { bold: true };
  }

  const out = await wb.xlsx.writeBuffer();
  return out as unknown as Buffer;
}

export type ParsedRow = ContactInput & { id?: string };

// "Tier 1", "tier1", "1", "T1", "Champion", "champions" all resolve.
export function matchTier(raw: string): Tier | undefined {
  const v = raw.trim().toLowerCase();
  if (!v) return undefined;
  if (v.startsWith("champ")) return "Champion";
  const n = v.match(/(\d)/)?.[1];
  if (n === "1" || n === "2" || n === "3") return `Tier ${n}` as Tier;
  return undefined;
}

function cellText(v: ExcelJS.CellValue): string {
  if (v == null) return "";
  if (typeof v === "object") {
    if ("richText" in v) return v.richText.map((t) => t.text).join("");
    if ("text" in v) return String(v.text);
    if ("result" in v) return v.result == null ? "" : String(v.result);
    if (v instanceof Date) return v.toISOString();
    return "";
  }
  return String(v);
}

export async function parseWorkbook(buf: ArrayBuffer): Promise<{ rows: ParsedRow[]; skipped: number }> {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.load(buf);
  const ws = wb.getWorksheet("Jeff's List") ?? wb.worksheets[0];
  if (!ws) return { rows: [], skipped: 0 };

  // Map headers by name so column order doesn't matter.
  const headerRow = ws.getRow(1);
  const idx: Partial<Record<(typeof COLUMNS)[number]["key"], number>> = {};
  headerRow.eachCell((cell, col) => {
    const h = cellText(cell.value).toLowerCase();
    for (const c of COLUMNS) {
      if (h.startsWith(c.header.toLowerCase().split(" (")[0])) idx[c.key] = col;
    }
  });
  if (!idx.name || !idx.tier) return { rows: [], skipped: 0 };

  const rows: ParsedRow[] = [];
  let skipped = 0;
  ws.eachRow((row, n) => {
    if (n === 1) return;
    const get = (k: keyof typeof idx) => (idx[k] ? cellText(row.getCell(idx[k]!).value).trim() : "");
    const name = get("name");
    const tierRaw = get("tier");
    if (!name && !tierRaw) return; // blank template row
    const tier = matchTier(tierRaw);
    if (!name || !tier) {
      skipped++;
      return;
    }
    const id = get("id");
    rows.push({
      id: /^[0-9a-f-]{36}$/i.test(id) ? id : undefined,
      tier,
      name: name.slice(0, 200),
      how_i_know_them: get("how_i_know_them").slice(0, 500),
      channel: get("channel").slice(0, 40),
      contact: get("contact").slice(0, 200),
      notes: get("notes").slice(0, 1000),
    });
  });
  return { rows, skipped };
}
