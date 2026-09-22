// After the workshop, set replay to an embed URL (YouTube/Vimeo) or a hosted
// video file. Self-hosted replays go through /api/replay (Dropbox-backed; see
// src/app/api/replay/route.ts). Redeploy; this same URL then shows the replay.
export const workshop: {
  babuTrialUrl: string;
  replay: { kind: "embed" | "video"; url: string } | null;
} = {
  babuTrialUrl: "https://www.askbabu.ai",
  replay: {
    kind: "video",
    url: "/api/replay?v=cpg-fatal-flaws-2026-09-16",
  },
};
