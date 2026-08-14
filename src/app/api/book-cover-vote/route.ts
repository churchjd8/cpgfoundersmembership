import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { getSupabaseAdmin } from "@/lib/supabase";
import { submitToKajabiForm, BOOK_WAITLIST_FORM_ID } from "@/lib/kajabi";

// Cover poll for The Cold-Pressed Truth — see /bookcovers.
//   POST  cast (or change) a vote, returns the running tally
//   PUT   attach name/email/comment to that vote and join the book waitlist

const CHOICES = ["A", "B", "C"] as const;
type Choice = (typeof CHOICES)[number];

const TABLE = "book_cover_votes";

function isChoice(value: unknown): value is Choice {
  return typeof value === "string" && (CHOICES as readonly string[]).includes(value);
}

function isVoterId(value: unknown): value is string {
  return typeof value === "string" && value.length >= 8 && value.length <= 100;
}

// Salted so the table never holds a raw address; enough to spot ballot stuffing.
function hashIp(request: Request) {
  const ip = (request.headers.get("x-forwarded-for") || "").split(",")[0].trim();
  if (!ip) return null;
  const salt = process.env.ADMIN_PASSWORD || "cpg";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
}

async function getTallies() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const { data, error } = await supabase.from(TABLE).select("choice");
  if (error) {
    console.error("Cover vote tally error:", error);
    return null;
  }

  const counts: Record<Choice, number> = { A: 0, B: 0, C: 0 };
  for (const row of data || []) {
    if (isChoice(row.choice)) counts[row.choice] += 1;
  }
  return { counts, total: (data || []).length };
}

export async function POST(request: Request) {
  try {
    const { voterId, choice } = await request.json();

    if (!isChoice(choice) || !isVoterId(voterId)) {
      return NextResponse.json({ error: "Invalid vote" }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      console.error("Cover vote: Supabase is not configured — vote not recorded");
      return NextResponse.json({ error: "Voting is unavailable" }, { status: 503 });
    }

    // One row per device: a second vote from the same browser replaces the first.
    const { error } = await supabase.from(TABLE).upsert(
      {
        voter_id: voterId,
        choice,
        updated_at: new Date().toISOString(),
        ip_hash: hashIp(request),
        user_agent: request.headers.get("user-agent")?.slice(0, 300) || null,
        referrer: request.headers.get("referer")?.slice(0, 300) || null,
      },
      { onConflict: "voter_id" }
    );

    if (error) {
      console.error("Cover vote insert error:", error);
      return NextResponse.json({ error: "Failed to record vote" }, { status: 500 });
    }

    return NextResponse.json({ success: true, results: await getTallies() });
  } catch (err) {
    console.error("Cover vote error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { voterId, name, email, comment } = await request.json();

    if (!isVoterId(voterId)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const firstName = typeof name === "string" ? name.trim().slice(0, 120) : "";
    const note = typeof comment === "string" ? comment.trim().slice(0, 2000) : "";

    const supabase = getSupabaseAdmin();
    if (supabase) {
      const { error } = await supabase
        .from(TABLE)
        .update({
          name: firstName || null,
          email: email.trim(),
          comment: note || null,
          updated_at: new Date().toISOString(),
        })
        .eq("voter_id", voterId);

      if (error) console.error("Cover vote update error:", error);
    }

    // The vote is already banked, so a Kajabi hiccup shouldn't fail the request.
    try {
      await submitToKajabiForm(BOOK_WAITLIST_FORM_ID, {
        name: firstName,
        email: email.trim(),
      });
    } catch (err) {
      console.error("Cover vote waitlist signup failed:", err);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Cover vote signup error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
