"use server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import { orderPayedFor } from "@/lib/emails";

export async function POST(req: Request) {
  const supabase = createAdminClient();
  const body = await req.text();
  const sig = req.headers.get("stripe-signature") as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK;
  let event: Stripe.Event;
  try {
    if (!sig || !webhookSecret)
      return new Response("Webhook secret not found.", { status: 400 });
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    console.log(`🔔  Webhook received: ${event.type}`);
  } catch (err: any) {
    console.log(`❌ Error message: ${err.message}`);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type == "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const { metadata } = paymentIntent;
    const { transaction } = metadata;
    console.log(transaction);
    const { data, error } = await supabase
      .from("transactions")
      .update({
        payment_intent: paymentIntent.id,
      })
      .eq("id", transaction)
      .select("*")
      .single();
    if (error) {
      console.log(error);
      return new Response("Error updating transaction.", { status: 500 });
    }
    const { data: data1, error: error1 } = await supabase
      .from("orders")
      .update({ status: "ONGOING" })
      .eq("id", data.order);
    if (error1) {
      console.error("Error inserting donation:", error);
      return new Response("Error inserting donation", { status: 500 });
    }
    const { data: data2, error: error2 } = await supabase
      .from("orders")
      .select("*, transactions!orders_transaction_fkey(*, organizations(*))")
      .eq("id", data.order)
      .single();
    if (error2) {
      return new Response("Error fetching order", { status: 500 });
    }
    if (!data2.transactions?.organizations) {
      return new Response("Error fetching order", { status: 500 });
    }
    await orderPayedFor(
      data2.transactions?.organizations?.email,
      data2.title,
      data2.transactions?.organizations?.name
    );
    return new Response("Order inserted successfully", { status: 200 });
  }
  return new Response("No payment intent succeeded", { status: 200 });
}
