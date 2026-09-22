import { NextResponse } from "next/server";
import { getDropboxTemporaryLink } from "@/lib/dropbox";

export const dynamic = "force-dynamic";

// Replay videos live in Jeff's Dropbox (Pro) under Website Media/replays.
// Vercel Blob was suspended on the Hobby plan after the first replay exceeded
// the monthly transfer quota, so the <video> tag points here instead and gets
// redirected to a short-lived direct Dropbox URL. The bytes stream from
// Dropbox, never through Vercel.
const REPLAYS: Record<string, string> = {
  "cpg-fatal-flaws-2026-09-16":
    "/2026 Dream Makers/Website Media/replays/cpg-fatal-flaws-workshop-replay-2026-09-16.mp4",
};

// Temporary links last 4 hours; let the CDN reuse the redirect for 1 hour so
// a busy page costs a handful of Dropbox API calls, not one per viewer.
const REDIRECT_TTL_SECONDS = 3600;

export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get("v") ?? "";
  const path = REPLAYS[slug];
  if (!path) return NextResponse.json({ error: "Unknown replay" }, { status: 404 });

  try {
    const link = await getDropboxTemporaryLink(path);
    return NextResponse.redirect(link, {
      status: 302,
      headers: {
        "Cache-Control": `public, max-age=0, s-maxage=${REDIRECT_TTL_SECONDS}`,
        "Vercel-CDN-Cache-Control": `max-age=${REDIRECT_TTL_SECONDS}`,
      },
    });
  } catch (err) {
    console.error("replay redirect failed", err);
    return NextResponse.json({ error: "Replay temporarily unavailable" }, { status: 503 });
  }
}
