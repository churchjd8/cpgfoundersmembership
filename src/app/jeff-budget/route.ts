import { BUDGET_MODEL_HTML } from "./model-html";

// The Dreammakers marketing + budget model, Sep 2026 – Jun 2027.
// Served as a standalone document rather than a React page so the model's own
// styling and scripts run untouched by the site chrome.
//
// Access is gated: middleware requires the admin cookie for this path. The page
// carries live client counts, churn, cost structure and comp — it must not be
// reachable without a login.
export async function GET() {
  return new Response(BUDGET_MODEL_HTML, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
