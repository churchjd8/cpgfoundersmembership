import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: Request) {
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
        to: "info@teamchurch.co",
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

  return NextResponse.json({ received: true });
}
