import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { grantKajabiOffer } from "@/lib/kajabi";
import { MBA_KAJABI_OFFER_ID, MBA_PLAN, MBA_PRODUCT_KEY } from "@/lib/mba-offer";

// The payment plan is a monthly subscription. A subscription schedule with a
// single fixed-length phase makes Stripe cancel it after the last payment.
// Safe to run twice for the same subscription.
async function capMbaPlan(stripe: Stripe, subscriptionId: string) {
  const sub = await stripe.subscriptions.retrieve(subscriptionId);
  const scheduleId =
    typeof sub.schedule === "string" ? sub.schedule : sub.schedule?.id;
  const schedule = scheduleId
    ? await stripe.subscriptionSchedules.retrieve(scheduleId)
    : await stripe.subscriptionSchedules.create({ from_subscription: subscriptionId });
  const phase = schedule.phases[0];

  await stripe.subscriptionSchedules.update(schedule.id, {
    end_behavior: "cancel",
    phases: [
      {
        items: phase.items.map((item) => ({
          price: typeof item.price === "string" ? item.price : item.price.id,
          quantity: item.quantity ?? 1,
        })),
        start_date: phase.start_date,
        duration: { interval: "month", interval_count: MBA_PLAN.payments },
      },
    ],
  });
}

// An MBA for CPG sale from /api/mba-checkout: cap the payment plan if that's
// what they bought, unlock the course in Kajabi, and email the team either
// way. A step that fails is reported in that email instead of thrown, so the
// buyer is never left without someone knowing.
async function fulfillMbaSale(
  stripe: Stripe,
  resend: Resend,
  session: Stripe.Checkout.Session
) {
  const email = session.customer_details?.email || session.customer_email || "";
  const name = session.customer_details?.name || "";
  const isPlan = session.mode === "subscription";
  const paid = isPlan
    ? `${MBA_PLAN.payments} x $${MBA_PLAN.amountUsd} payment plan`
    : `$${((session.amount_total || 0) / 100).toFixed(2)} paid in full`;
  const problems: string[] = [];

  if (isPlan) {
    const subscriptionId =
      typeof session.subscription === "string"
        ? session.subscription
        : session.subscription?.id;
    try {
      if (!subscriptionId) throw new Error("Checkout session has no subscription");
      await capMbaPlan(stripe, subscriptionId);
    } catch (err) {
      console.error("MBA payment plan cap failed:", err);
      problems.push(
        `The payment plan was NOT capped at ${MBA_PLAN.payments} payments. Set subscription ${subscriptionId || "(unknown)"} to cancel after payment ${MBA_PLAN.payments} in Stripe, or it keeps billing monthly.`
      );
    }
  }

  try {
    if (!email) throw new Error("Checkout session has no customer email");
    await grantKajabiOffer(MBA_KAJABI_OFFER_ID, { name, email });
  } catch (err) {
    console.error("MBA Kajabi grant failed:", err);
    problems.push(
      `Course access was NOT granted in Kajabi. Grant the "MBA for CPG" offer to ${email || "(no email on the session)"} by hand.`
    );
  }

  try {
    await resend.emails.send({
      from: "CPG Founders Group <onboarding@resend.dev>",
      to: process.env.STRIPE_FAILURE_NOTIFY_EMAIL!,
      subject: problems.length
        ? `ACTION NEEDED - MBA for CPG sale - ${name || email}`
        : `New MBA for CPG sale - ${name || email} (${paid})`,
      html: `
        <h2>${problems.length ? "MBA for CPG sale needs a manual fix" : "New MBA for CPG sale"}</h2>
        ${problems.map((p) => `<p style="font-family:sans-serif;color:#b91c1c;"><strong>${p}</strong></p>`).join("")}
        <table style="border-collapse:collapse;font-family:sans-serif;">
          <tr><td style="padding:8px;font-weight:bold;">Customer</td><td style="padding:8px;">${name || "Unknown"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;">${email || "Unknown"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Paid</td><td style="padding:8px;">${paid}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Kajabi access</td><td style="padding:8px;">${problems.some((p) => p.startsWith("Course access")) ? "Not granted" : "Granted, welcome email sent by Kajabi"}</td></tr>
        </table>
        <p style="margin-top:16px;"><a href="https://dashboard.stripe.com/payments">View in Stripe Dashboard</a></p>
      `,
    });
  } catch (emailErr) {
    console.error("Failed to send MBA sale notification:", emailErr);
  }
}

export async function POST(request: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const resend = new Resend(process.env.RESEND_API_KEY!);
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (
    event.type === "invoice.payment_failed" ||
    event.type === "charge.failed"
  ) {
    let customerEmail = "Unknown";
    let customerName = "Unknown";
    let amount = "Unknown";
    let failureMessage = "No details available";

    if (event.type === "invoice.payment_failed") {
      const invoice = event.data.object as Stripe.Invoice;
      customerEmail = invoice.customer_email || "Unknown";
      customerName = invoice.customer_name || customerEmail;
      amount = `$${((invoice.amount_due || 0) / 100).toFixed(2)}`;
      failureMessage =
        invoice.last_finalization_error?.message || "Payment method declined";
    } else {
      const charge = event.data.object as Stripe.Charge;
      customerEmail = charge.billing_details?.email || "Unknown";
      customerName = charge.billing_details?.name || customerEmail;
      amount = `$${((charge.amount || 0) / 100).toFixed(2)}`;
      failureMessage = charge.failure_message || "Payment method declined";
    }

    try {
      await resend.emails.send({
        from: "CPG Founders Group <onboarding@resend.dev>",
        to: process.env.STRIPE_FAILURE_NOTIFY_EMAIL!,
        subject: `Failed Payment - ${customerName} (${amount})`,
        html: `
          <h2>Failed Payment Alert</h2>
          <table style="border-collapse:collapse;font-family:sans-serif;">
            <tr><td style="padding:8px;font-weight:bold;">Customer</td><td style="padding:8px;">${customerName}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;">${customerEmail}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Amount</td><td style="padding:8px;">${amount}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Reason</td><td style="padding:8px;">${failureMessage}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Event</td><td style="padding:8px;">${event.type}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Time</td><td style="padding:8px;">${new Date(event.created * 1000).toLocaleString("en-US", { timeZone: "America/Los_Angeles" })}</td></tr>
          </table>
          <p style="margin-top:16px;"><a href="https://dashboard.stripe.com/payments">View in Stripe Dashboard</a></p>
        `,
      });
      console.log(`Failed payment notification sent for ${customerEmail}`);
    } catch (emailErr) {
      console.error("Failed to send payment failure notification:", emailErr);
    }
  }

  if (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded"
  ) {
    const session = event.data.object as Stripe.Checkout.Session;
    // Other checkouts on this Stripe account (client onboarding, Babu) land
    // here too. Only MBA sales that have actually cleared get fulfilled.
    if (
      session.metadata?.product === MBA_PRODUCT_KEY &&
      session.payment_status !== "unpaid"
    ) {
      await fulfillMbaSale(stripe, resend, session);
    }
  }

  return NextResponse.json({ received: true });
}
