// Recon: list live Stripe subscriptions so we can see the client landscape.
// Run: npx tsx --env-file=.env scripts/stripe-recon.ts
import Stripe from "stripe";

async function main() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const subs = await stripe.subscriptions.list({
    status: "all",
    limit: 100,
    expand: ["data.customer"],
  });

  const rows = subs.data.map((s) => {
    const cust = s.customer as Stripe.Customer;
    const item = s.items.data[0];
    const price = item?.price;
    const amount = price?.unit_amount ? price.unit_amount / 100 : 0;
    const interval = price?.recurring?.interval ?? "?";
    const end = s.items.data[0]?.current_period_end ?? null;
    return {
      name: cust?.name || "(no name)",
      email: cust?.email || "(no email)",
      status: s.status,
      amount: `$${amount}/${interval}`,
      nextCharge: end ? new Date(end * 1000).toISOString().slice(0, 10) : "-",
    };
  });

  console.log(`Found ${rows.length} subscriptions:\n`);
  for (const r of rows) {
    console.log(
      `${r.status.padEnd(10)} ${r.amount.padEnd(12)} next:${r.nextCharge}  ${r.name} <${r.email}>`,
    );
  }

  const active = rows.filter((r) => r.status === "active" || r.status === "trialing");
  console.log(`\n${active.length} active/trialing.`);
}

main().catch((e) => {
  console.error("Stripe recon failed:", e.message);
  process.exit(1);
});

export {};
