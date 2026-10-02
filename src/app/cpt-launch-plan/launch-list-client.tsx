"use client";

import dynamic from "next/dynamic";

// The list lives in localStorage, so it can only render on the client.
export const LaunchList = dynamic(() => import("./launch-list").then((m) => m.LaunchList), {
  ssr: false,
  loading: () => (
    <div className="mt-8 rounded-xl border border-border bg-card p-8 text-center text-muted text-sm">
      Loading the list&hellip;
    </div>
  ),
});
