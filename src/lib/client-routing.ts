// Decide which client a Granola note belongs to.
//
// Routing is grounded, not guessed. In order:
//   1. EMAIL  — an external attendee email that matches the roster (deterministic).
//   2. TEXT   — a roster client whose business name / email-domain literally
//               appears in the note title or summary (deterministic evidence).
//   3. CLAUDE — only to DISAMBIGUATE when several evidenced candidates tie; it
//               can never invent a client outside that candidate set.
// Anything without solid evidence is SKIPPED rather than misfiled. This avoids
// the failure mode where a free-form LLM force-matches deal/legal calls (which
// have no client on them) to a random roster entry.
import Anthropic from "@anthropic-ai/sdk";
import { getRoster, type RosterRow } from "@/lib/admin-data";
import type { GranolaNoteDetail } from "@/lib/granola";
import { noteEmails } from "@/lib/granola";

// People on Jeff's side of the table — never the "client" for a note.
// cpgfoundersgroup.com + Joshua are baked in; Jeff's other addresses come from
// JEFF_EMAILS (e.g. jeff@teamchurch.co, which the Granola owner field uses).
const BASE_INTERNAL_DOMAINS = ["cpgfoundersgroup.com"];
const BASE_INTERNAL_EMAILS = ["joshuadeanchurch@gmail.com"];

function internalEmails(): Set<string> {
  const fromEnv = (process.env.JEFF_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return new Set([...BASE_INTERNAL_EMAILS, ...fromEnv]);
}

export function isInternalEmail(email: string): boolean {
  const e = email.trim().toLowerCase();
  if (!e || !e.includes("@")) return true; // junk → treat as non-client
  if (internalEmails().has(e)) return true;
  const domain = e.split("@")[1] || "";
  return BASE_INTERNAL_DOMAINS.includes(domain);
}

export type RouteDecision = {
  email: string | null; // null → skip (logged with reason)
  reason: string;
  method: "attendee-email" | "text-match" | "inferred" | "skipped";
  confidence?: number;
};

const MODEL = "claude-sonnet-4-6";

/**
 * Distinctive tokens for a client: business name + the full email-domain stem.
 * Kept strict (exact substring, ≥5 chars) to favor precision — a wrong client
 * note is worse than a missed one. Title-only notes with no attendee email and
 * no in-text brand name are intentionally left to skip.
 */
function clientTokens(r: RosterRow): string[] {
  const tokens: string[] = [];
  if (r.business && r.business.trim().length >= 5) tokens.push(r.business.trim().toLowerCase());
  const stem = (r.email.split("@")[1] || "").split(".")[0].toLowerCase(); // e.g. fermenteria
  if (stem.length >= 5) tokens.push(stem);
  return tokens;
}

/**
 * Resolve a Granola note to a client email, grounded in evidence (see header).
 */
export async function routeNoteToClient(detail: GranolaNoteDetail): Promise<RouteDecision> {
  const roster = await getRoster().catch((e) => {
    console.error("[client-routing] roster load failed:", e?.message || e);
    return [] as RosterRow[];
  });
  const rosterByEmail = new Map(roster.map((r) => [r.email.toLowerCase(), r]));

  // 1. Email match — the strongest signal.
  const external = noteEmails(detail).filter((e) => !isInternalEmail(e));
  const knownByEmail = [...new Set(external.filter((e) => rosterByEmail.has(e)))];
  if (knownByEmail.length === 1) {
    return { email: knownByEmail[0], reason: "single roster attendee", method: "attendee-email", confidence: 1 };
  }

  // 2. Text evidence — roster clients whose name/domain appears in the note.
  const hay = `${detail.title || ""}\n${detail.summary_text || detail.summary_markdown || ""}`.toLowerCase();
  const evidenced = roster.filter((r) => clientTokens(r).some((t) => hay.includes(t)));

  // If email routing was ambiguous (>1 known), prefer the intersection with text.
  const candidates = knownByEmail.length > 1
    ? roster.filter((r) => knownByEmail.includes(r.email.toLowerCase()))
    : evidenced;

  if (candidates.length === 1) {
    const r = candidates[0];
    return {
      email: r.email.toLowerCase(),
      reason: knownByEmail.length > 1 ? "disambiguated by text" : "business/domain in note text",
      method: "text-match",
      confidence: 0.95,
    };
  }

  // 3. Claude disambiguates among the evidenced candidates only.
  if (candidates.length > 1) {
    const inferred = await disambiguate(detail, candidates);
    if (inferred) return inferred;
    return { email: null, reason: `ambiguous among ${candidates.length} evidenced clients`, method: "skipped" };
  }

  const why = external.length
    ? `no roster/text match (attendees: ${external.join(", ")})`
    : "no external attendees and no client named in note";
  return { email: null, reason: why, method: "skipped" };
}

/**
 * Pick the single best client from a SMALL candidate set already supported by
 * evidence. Tool-use guarantees structured output; the model cannot return an
 * email outside the candidates. Returns null when it isn't confident.
 */
async function disambiguate(
  detail: GranolaNoteDetail,
  candidates: RosterRow[],
): Promise<RouteDecision | null> {
  if (!process.env.ANTHROPIC_API_KEY) return null;
  const emails = candidates.map((r) => r.email.toLowerCase());

  const candidateList = candidates
    .map((r) => `- ${r.email.toLowerCase()} :: ${r.name}${r.business ? ` (${r.business})` : ""}`)
    .join("\n");
  const summary = (detail.summary_text || detail.summary_markdown || "").slice(0, 2500);
  const meeting = [
    `TITLE: ${detail.title || "(untitled)"}`,
    detail.attendees?.length
      ? `ATTENDEES: ${detail.attendees.map((a) => `${a.name || ""} <${a.email || ""}>`).join(", ")}`
      : "",
    summary ? `SUMMARY:\n${summary}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  try {
    const resp = await client.messages.create({
      model: MODEL,
      max_tokens: 200,
      tool_choice: { type: "tool", name: "select_client" },
      tools: [
        {
          name: "select_client",
          description: "Record which client this meeting is about.",
          input_schema: {
            type: "object",
            properties: {
              email: {
                type: ["string", "null"],
                enum: [...emails, null],
                description: "The client's email, or null if none clearly fits.",
              },
              confidence: { type: "number", description: "0 to 1" },
              reason: { type: "string" },
            },
            required: ["email", "confidence"],
          },
        },
      ],
      messages: [
        {
          role: "user",
          content: `Candidate clients:\n${candidateList}\n\n---\nMeeting:\n${meeting}\n\nWhich candidate is this meeting about? Return null if unsure.`,
        },
      ],
    });
    const tool = resp.content.find((b): b is Anthropic.ToolUseBlock => b.type === "tool_use");
    const input = (tool?.input ?? {}) as { email?: string | null; confidence?: number; reason?: string };
    const email = (input.email || "").trim().toLowerCase();
    const confidence = typeof input.confidence === "number" ? input.confidence : 0;
    if (!email || !emails.includes(email) || confidence < 0.7) return null;
    return { email, reason: `inferred: ${input.reason || "best candidate"}`, method: "inferred", confidence };
  } catch (e) {
    console.error("[client-routing] disambiguation failed:", e instanceof Error ? e.message : e);
    return null;
  }
}
