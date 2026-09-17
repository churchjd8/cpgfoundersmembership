// After the workshop, set replay to an embed URL (YouTube/Vimeo) or a hosted
// video file. Redeploy; the same resource-page URL then shows the replay.
export const workshop: {
  babuTrialUrl: string;
  replay: { kind: "embed" | "video"; url: string } | null;
} = {
  babuTrialUrl: "https://www.askbabu.ai",
  replay: {
    kind: "video",
    url: "https://vo8sl8ej2beje2wu.public.blob.vercel-storage.com/replays/cpg-fatal-flaws-workshop-replay-2026-09-16.mp4",
  },
};
