import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";

// Babu (AskBabu) subscription MRR review: today, peak, churn and plan mix.
// Served as a standalone document, pulled live from Stripe on each load.
//
// Access is gated: middleware requires the admin cookie for this path. The page
// carries revenue and churn, so it must not be reachable without a login.

export const dynamic = "force-dynamic";

// Babu's live plans. Earlier Base/Pro/Founder products (the $1 test plans and
// the newer catalog entries) have never carried a paying subscription.
const BABU_PRODUCTS: Record<string, string> = {
  prod_TahDkccFOzI3pL: "Base",
  prod_TahBSUBNBvy66K: "Pro",
  prod_TabwIX38kByA89: "Founder",
};
const PLAN_ORDER = ["Base", "Pro", "Founder"];

type Sub = {
  plan: string;
  mrr: number;
  start: number; // unix seconds
  end: number | null;
  active: boolean;
  cancelling: boolean;
  periodEnd: number | null;
};

function monthly(price: Stripe.Price, quantity: number): number {
  const amt = ((price.unit_amount ?? 0) * quantity) / 100;
  const r = price.recurring;
  if (!r) return 0;
  const n = r.interval_count || 1;
  switch (r.interval) {
    case "year": return amt / 12 / n;
    case "week": return (amt * 52) / 12 / n;
    case "day": return (amt * 365) / 12 / n;
    default: return amt / n;
  }
}

async function loadSubs(): Promise<Sub[]> {
  const stripe = getStripe();
  const out: Sub[] = [];
  for await (const s of stripe.subscriptions.list({ status: "all", limit: 100 })) {
    for (const it of s.items.data) {
      const productId = typeof it.price.product === "string" ? it.price.product : it.price.product.id;
      const plan = BABU_PRODUCTS[productId];
      if (!plan) continue;
      out.push({
        plan,
        mrr: monthly(it.price, it.quantity ?? 1),
        start: s.start_date,
        end: s.ended_at ?? null,
        active: s.status === "active" || s.status === "trialing" || s.status === "past_due",
        cancelling: s.cancel_at_period_end,
        periodEnd: it.current_period_end ?? null,
      });
    }
  }
  return out;
}

const DAY = 86400;
const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");
const ymd = (t: number) => new Date(t * 1000).toISOString().slice(0, 10);
const fmtDate = (t: number, opts: Intl.DateTimeFormatOptions) =>
  new Date(t * 1000).toLocaleDateString("en-US", { timeZone: "UTC", ...opts });
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

function buildStats(subs: Sub[]) {
  const now = Math.floor(Date.now() / 1000);
  const first = Math.min(...subs.map((s) => s.start));
  const startDay = Math.floor(first / DAY) * DAY - DAY;
  const series: { t: number; mrr: number; subs: number }[] = [];
  for (let t = startDay; t <= now; t += DAY) {
    const eod = Math.min(t + DAY - 1, now);
    const live = subs.filter((s) => s.start <= eod && (s.end === null || s.end > eod));
    series.push({ t, mrr: live.reduce((a, s) => a + s.mrr, 0), subs: live.length });
  }
  const active = subs.filter((s) => s.active);
  const current = active.reduce((a, s) => a + s.mrr, 0);
  const peak = series.reduce((a, b) => (b.mrr > a.mrr ? b : a));
  const cancelling = active.filter((s) => s.cancelling).sort((a, b) => (a.periodEnd ?? 0) - (b.periodEnd ?? 0));
  const atRisk = cancelling.reduce((a, s) => a + s.mrr, 0);

  const months = new Map<string, { newSubs: number; newMrr: number; lostSubs: number; lostMrr: number }>();
  const bump = (t: number) => {
    const k = ymd(t).slice(0, 7);
    if (!months.has(k)) months.set(k, { newSubs: 0, newMrr: 0, lostSubs: 0, lostMrr: 0 });
    return months.get(k)!;
  };
  for (const s of subs) {
    const a = bump(s.start); a.newSubs++; a.newMrr += s.mrr;
    if (s.end) { const b = bump(s.end); b.lostSubs++; b.lostMrr += s.mrr; }
  }
  const flow = [...months.entries()].sort(([a], [b]) => a.localeCompare(b));

  const plans = PLAN_ORDER.map((plan) => {
    const all = subs.filter((s) => s.plan === plan);
    const act = all.filter((s) => s.active);
    const mrr = act.reduce((a, s) => a + s.mrr, 0);
    const keep = act.filter((s) => !s.cancelling).reduce((a, s) => a + s.mrr, 0);
    return { plan, price: all[0]?.mrr ?? 0, active: act.length, mrr, ever: all.length, churned: all.length - act.length, after: keep };
  });

  const lastNew = Math.max(...active.map((s) => s.start));
  return { now, series, current, currentSubs: active.length, peak, cancelling, atRisk, flow, plans, lastNew };
}

function trendSvg(series: { t: number; mrr: number; subs: number }[], peak: { t: number; mrr: number }) {
  const W = 900, H = 300, m = { t: 26, r: 20, b: 30, l: 56 };
  const maxY = Math.ceil((peak.mrr * 1.15) / 250) * 250;
  const t0 = series[0].t, t1 = series[series.length - 1].t;
  const x = (t: number) => m.l + ((t - t0) / (t1 - t0 || 1)) * (W - m.l - m.r);
  const y = (v: number) => H - m.b - (v / maxY) * (H - m.t - m.b);
  let line = "";
  series.forEach((p, i) => {
    line += i === 0 ? `M${x(p.t).toFixed(1)},${y(p.mrr).toFixed(1)}` : `H${x(p.t).toFixed(1)}V${y(p.mrr).toFixed(1)}`;
  });
  const area = `${line}H${x(t1).toFixed(1)}V${y(0)}H${x(t0).toFixed(1)}Z`;
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((f) => f * maxY);
  const grid = yTicks.map((v) => `<line x1="${m.l}" x2="${W - m.r}" y1="${y(v)}" y2="${y(v)}" class="grid"/><text x="${m.l - 8}" y="${y(v)}" dy="0.32em" text-anchor="end" class="tick">${usd(v)}</text>`).join("");
  const xTicks: string[] = [];
  const d = new Date(t0 * 1000); d.setUTCDate(1); d.setUTCMonth(d.getUTCMonth() + 1);
  for (; d.getTime() / 1000 <= t1; d.setUTCMonth(d.getUTCMonth() + 1)) {
    const t = d.getTime() / 1000;
    xTicks.push(`<text x="${x(t)}" y="${H - 8}" text-anchor="middle" class="tick">${fmtDate(t, { month: "short", day: "numeric" })}</text>`);
  }
  const last = series[series.length - 1];
  const close = Math.abs(x(last.t) - x(peak.t)) < 140;
  const hits = series.map((p) => `<rect x="${(x(p.t) - (W - m.l - m.r) / series.length / 2).toFixed(1)}" y="${m.t}" width="${((W - m.l - m.r) / series.length).toFixed(2)}" height="${H - m.t - m.b}" class="hit"><title>${fmtDate(p.t, { month: "short", day: "numeric", year: "numeric" })}: ${usd(p.mrr)} MRR, ${p.subs} subs</title></rect>`).join("");
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Babu MRR by day">
<defs><linearGradient id="fade" x1="0" x2="0" y1="0" y2="1"><stop offset="0" class="g0"/><stop offset="1" class="g1"/></linearGradient></defs>
${grid}${xTicks.join("")}
<path d="${area}" fill="url(#fade)"/>
<path d="${line}" class="line"/>
<line x1="${m.l}" x2="${W - m.r}" y1="${y(0)}" y2="${y(0)}" class="axis"/>
<circle cx="${x(peak.t)}" cy="${y(peak.mrr)}" r="4.5" class="dot"/>
<text x="${x(peak.t)}" y="${y(peak.mrr) - 10}" text-anchor="middle" class="lbl">Peak ${usd(peak.mrr)}</text>
<circle cx="${x(last.t)}" cy="${y(last.mrr)}" r="4.5" class="dot"/>
<text x="${x(last.t) - 6}" y="${close ? y(last.mrr) + 20 : y(last.mrr) - 10}" text-anchor="end" class="lbl">Today ${usd(last.mrr)}</text>
${hits}
</svg>`;
}

function flowSvg(flow: [string, { newSubs: number; newMrr: number; lostSubs: number; lostMrr: number }][]) {
  const W = 520, H = 240, m = { t: 16, r: 8, b: 28, l: 52 };
  const maxV = Math.max(...flow.flatMap(([, v]) => [v.newMrr, v.lostMrr]));
  const maxY = Math.ceil((maxV * 1.1) / 250) * 250 || 250;
  const y = (v: number) => H - m.b - (v / maxY) * (H - m.t - m.b);
  const band = (W - m.l - m.r) / flow.length;
  const bw = Math.min(28, band * 0.32);
  const yTicks = [0, 0.5, 1].map((f) => f * maxY);
  const grid = yTicks.map((v) => `<line x1="${m.l}" x2="${W - m.r}" y1="${y(v)}" y2="${y(v)}" class="grid"/><text x="${m.l - 8}" y="${y(v)}" dy="0.32em" text-anchor="end" class="tick">${usd(v)}</text>`).join("");
  const bars = flow.map(([k, v], i) => {
    const cx = m.l + band * i + band / 2;
    const label = new Date(k + "-01T00:00:00Z").toLocaleDateString("en-US", { month: "short", timeZone: "UTC" });
    const rect = (val: number, xx: number, cls: string, title: string) =>
      `<rect x="${xx.toFixed(1)}" y="${y(val).toFixed(1)}" width="${bw}" height="${Math.max(0, y(0) - y(val)).toFixed(1)}" rx="4" class="${cls}"><title>${title}</title></rect>`;
    return rect(v.newMrr, cx - bw - 2, "bar-new", `${label}: ${usd(v.newMrr)} new MRR (${v.newSubs} subs)`) +
      rect(v.lostMrr, cx + 2, "bar-lost", `${label}: ${usd(v.lostMrr)} churned MRR (${v.lostSubs} subs)`) +
      `<text x="${cx}" y="${H - 8}" text-anchor="middle" class="tick">${label}</text>`;
  }).join("");
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="New vs churned MRR by month">${grid}${bars}<line x1="${m.l}" x2="${W - m.r}" y1="${y(0)}" y2="${y(0)}" class="axis"/></svg>`;
}

function render(s: ReturnType<typeof buildStats>) {
  const drop = (s.current - s.peak.mrr) / s.peak.mrr;
  const dropPct = `${drop >= 0 ? "+" : "−"}${Math.abs(Math.round(drop * 100))}%`;
  const peakDate = fmtDate(s.peak.t, { month: "short", day: "numeric", year: "numeric" });
  const asOf = new Date(s.now * 1000).toLocaleString("en-US", { timeZone: "America/Los_Angeles", month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });
  const lastNew = fmtDate(s.lastNew, { month: "short", day: "numeric" });
  const plansRows = s.plans.map((p) => `<tr><td>${p.plan}</td><td>${usd(p.price)}</td><td>${p.active}</td><td>${usd(p.mrr)}</td><td>${p.ever}</td><td>${p.churned}</td><td>${usd(p.after)}</td></tr>`).join("");
  const totals = s.plans.reduce((a, p) => ({ active: a.active + p.active, mrr: a.mrr + p.mrr, ever: a.ever + p.ever, churned: a.churned + p.churned, after: a.after + p.after }), { active: 0, mrr: 0, ever: 0, churned: 0, after: 0 });
  const cancelRows = s.cancelling.length
    ? s.cancelling.map((c) => `<tr><td>${c.periodEnd ? fmtDate(c.periodEnd, { month: "short", day: "numeric" }) : "—"}</td><td>${c.plan}</td><td>${usd(c.mrr)}</td></tr>`).join("")
    : `<tr><td colspan="3" class="muted">No subscriptions are set to cancel.</td></tr>`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow, noarchive">
<title>Babu MRR Review</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500&family=IBM+Plex+Sans:wght@400;500&display=swap" rel="stylesheet">
<style>
/* Layout: single 1080px column, tiles row, full-width trend, two-up detail grid. */
:root {
  --bg: #f5f6f3; --panel: #ffffff; --ink: #14171a; --muted: #5d646b; --line: #e1e4df;
  --accent: #1f6f5c; --accent-soft: rgba(31,111,92,.18); --bad: #b4422e;
  --display: "Fraunces", Georgia, serif; --body: "IBM Plex Sans", system-ui, sans-serif;
  color-scheme: light;
}
@media (prefers-color-scheme: dark) {
  :root { --bg: #111413; --panel: #191d1c; --ink: #e8ebe8; --muted: #9aa29f; --line: #2a302e;
    --accent: #5cc0a3; --accent-soft: rgba(92,192,163,.22); --bad: #e57a62; color-scheme: dark; }
}
* { box-sizing: border-box; }
body { margin: 0; background: var(--bg); color: var(--ink); font: 15px/1.5 var(--body); }
.wrap { max-width: 1080px; margin: 0 auto; padding: 40px max(16px, env(safe-area-inset-left)) 56px max(16px, env(safe-area-inset-right)); display: flex; flex-direction: column; gap: 20px; }
h1 { font: 500 34px/1.15 var(--display); margin: 0; text-wrap: balance; }
.take { color: var(--muted); margin: 6px 0 0; max-width: 68ch; }
.asof { font-size: 12px; color: var(--muted); letter-spacing: .02em; }
.tiles { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 210px), 1fr)); gap: 12px; }
.card { background: var(--panel); border: 1px solid var(--line); border-radius: 10px; padding: 20px; min-width: 0; }
.tile { display: flex; flex-direction: column; gap: 4px; }
.label { font-size: 12px; color: var(--muted); letter-spacing: .03em; text-transform: uppercase; }
.num { font: 400 36px/1.1 var(--display); font-variant-numeric: tabular-nums; }
.sub { font-size: 13px; color: var(--muted); }
.bad { color: var(--bad); }
h2 { font-size: 16px; font-weight: 500; margin: 0; }
.note { font-size: 13px; color: var(--muted); margin: 4px 0 14px; }
.grid2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 420px), 1fr)); gap: 12px; }
svg { display: block; overflow: visible; }
svg .grid { stroke: var(--line); }
svg .axis { stroke: var(--muted); stroke-opacity: .5; }
svg .tick { fill: var(--muted); font-size: 12px; font-family: var(--body); }
svg .lbl { fill: var(--ink); font-size: 12.5px; font-weight: 500; font-family: var(--body); }
svg .line { fill: none; stroke: var(--accent); stroke-width: 2.25; stroke-linejoin: round; stroke-linecap: round; }
svg .dot { fill: var(--accent); stroke: var(--panel); stroke-width: 2; }
svg .g0 { stop-color: var(--accent); stop-opacity: .28; }
svg .g1 { stop-color: var(--accent); stop-opacity: 0; }
svg .hit { fill: transparent; }
svg .hit:hover { fill: var(--accent-soft); }
svg .bar-new { fill: var(--accent); }
svg .bar-lost { fill: var(--bad); }
.legend { display: flex; gap: 16px; font-size: 12px; color: var(--muted); margin-bottom: 8px; }
.legend i { display: inline-block; width: 10px; height: 10px; border-radius: 2px; margin-right: 6px; vertical-align: -1px; }
.tw { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; font-variant-numeric: tabular-nums; font-size: 14px; }
th { font-size: 12px; font-weight: 500; color: var(--muted); text-align: right; padding: 6px 8px; border-bottom: 1px solid var(--line); white-space: nowrap; }
td { text-align: right; padding: 7px 8px; border-bottom: 1px solid var(--line); white-space: nowrap; }
th:first-child, td:first-child { text-align: left; }
tfoot td { font-weight: 500; border-bottom: 0; }
.muted { color: var(--muted); }
h2.gap { margin-top: 22px; }
.foot { font-size: 12px; color: var(--muted); max-width: 80ch; margin: 0; }
</style>
</head>
<body>
<main class="wrap">
  <header>
    <div class="asof">Live from Stripe · ${esc(asOf)} PT</div>
    <h1>Babu MRR review</h1>
    <p class="take">Babu is at ${usd(s.current)} MRR, ${drop < 0 ? "down" : "up"} ${Math.abs(Math.round(drop * 100))}% from its ${usd(s.peak.mrr)} peak on ${fmtDate(s.peak.t, { month: "short", day: "numeric" })}. The newest active subscription started ${lastNew}${s.atRisk > 0 ? `, and another ${usd(s.atRisk)} is set to cancel` : ""}.</p>
  </header>

  <section class="tiles">
    <div class="card tile"><span class="label">MRR today</span><span class="num">${usd(s.current)}</span><span class="sub">${s.currentSubs} active subscriptions</span></div>
    <div class="card tile"><span class="label">Peak MRR</span><span class="num">${usd(s.peak.mrr)}</span><span class="sub">${peakDate}, ${s.peak.subs} subscriptions</span></div>
    <div class="card tile"><span class="label">Change since peak</span><span class="num ${drop < 0 ? "bad" : ""}">${dropPct}</span><span class="sub">${usd(s.current - s.peak.mrr)} MRR</span></div>
    <div class="card tile"><span class="label">Set to cancel</span><span class="num ${s.atRisk > 0 ? "bad" : ""}">${usd(s.atRisk)}</span><span class="sub">${s.cancelling.length} subscriptions. Leaves ${usd(s.current - s.atRisk)} MRR</span></div>
  </section>

  <section class="card">
    <h2>MRR by day</h2>
    <p class="note">Monthly recurring revenue from active Base, Pro and Founder subscriptions. Hover for any day.</p>
    ${trendSvg(s.series, s.peak)}
  </section>

  <div class="grid2">
    <section class="card">
      <h2>New vs. churned MRR by month</h2>
      <p class="note">MRR added by new subscriptions against MRR lost to cancellations. The current month is month to date.</p>
      <div class="legend"><span><i style="background:var(--accent)"></i>New MRR</span><span><i style="background:var(--bad)"></i>Churned MRR</span></div>
      ${flowSvg(s.flow)}
    </section>

    <section class="card">
      <h2>By plan</h2>
      <p class="note">Active today, all subscriptions ever, and what's left once pending cancellations end.</p>
      <div class="tw"><table>
        <thead><tr><th>Plan</th><th>Price</th><th>Active</th><th>MRR</th><th>Ever</th><th>Churned</th><th>After cancels</th></tr></thead>
        <tbody>${plansRows}</tbody>
        <tfoot><tr><td>Total</td><td></td><td>${totals.active}</td><td>${usd(totals.mrr)}</td><td>${totals.ever}</td><td>${totals.churned}</td><td>${usd(totals.after)}</td></tr></tfoot>
      </table></div>
      <h2 class="gap">Pending cancellations</h2>
      <p class="note">Active subscriptions set to end at the close of their current period. These are the ones to save.</p>
      <div class="tw"><table>
        <thead><tr><th>Ends</th><th>Plan</th><th>MRR</th></tr></thead>
        <tbody>${cancelRows}</tbody>
      </table></div>
    </section>
  </div>

  <p class="foot">MRR is rebuilt from each Stripe subscription's start and end dates at list price. It does not reflect refunds or proration. Four early $1 test subscriptions are excluded.</p>
</main>
</body>
</html>`;
}

export async function GET() {
  try {
    const subs = await loadSubs();
    if (!subs.length) throw new Error("No Babu subscriptions found");
    return new Response(render(buildStats(subs)), {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  } catch (err) {
    console.error("babu-review-stats", err);
    return new Response("Couldn't load Babu stats from Stripe. Try again in a minute.", {
      status: 502,
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
    });
  }
}
