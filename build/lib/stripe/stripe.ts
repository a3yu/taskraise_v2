"use server";

import type { Stripe } from "stripe";

import { formatAmountForStripe } from "./stripe-helpers";
import { stripe } from "../stripe";
import { redirect } from "next/navigation";

export async function createPaymentIntent(
  amt: number
): Promise<{ client_secret: string; id: string }> {
  const paymentIntent: Stripe.PaymentIntent =
    await stripe.paymentIntents.create({
      amount: formatAmountForStripe(amt, "usd"),
      capture_method: "manual",
      currency: "usd",
    });

  return {
    client_secret: paymentIntent.client_secret as string,
    id: paymentIntent.id,
  };
}

export async function capturePaymentIntent(
  paymentIntentId: string
): Promise<Stripe.PaymentIntent> {
  const paymentIntent: Stripe.PaymentIntent =
    await stripe.paymentIntents.capture(paymentIntentId);
  return paymentIntent;
}
export async function denyPaymentIntent(
  paymentIntentId: string
): Promise<Stripe.PaymentIntent> {
  const paymentIntent: Stripe.PaymentIntent =
    await stripe.paymentIntents.cancel(paymentIntentId);
  return paymentIntent;
}
export async function createStripeAccount() {
  try {
    const account = await stripe.accounts.create({ type: "standard" });
    return account;
  } catch (error) {
    console.log(error);
    throw Error("Error creating stripe account");
  }
}

export async function createStripeCustomer() {
  try {
    const customer = await stripe.customers.create();
    return customer;
  } catch (error) {
    console.log(error);
    throw Error("Error creating stripe customer");
  }
}

export async function createStripeAccountOnboardingLink(account: string) {
  const accountLink = await stripe.accountLinks.create({
    account: account,
    refresh_url: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
    return_url: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
    type: "account_onboarding",
  });
  return accountLink;
}

export async function fetchAccount(account: string) {
  const accountInfo = await stripe.accounts.retrieve(account);
  return accountInfo;
}
export async function fetchCustomer(customer: string) {
  const accountInfo = await stripe.customers.retrieve(customer);
  if (accountInfo.deleted == true) {
    throw Error("Customer not found");
  }
  return accountInfo;
}

export async function fetchClientSecretAccount(account: string) {
  const accountLink = await stripe.accountSessions.create({
    account: account,
    components: {
      account_management: {
        enabled: true,
        features: {},
      },
      payments: {
        enabled: true,
        features: {
          refund_management: true,
          dispute_management: true,
          capture_payments: true,
        },
      },
      payouts: {
        enabled: true,
        features: {
          standard_payouts: true,
        },
      },
    },
  });
  return accountLink;
}

export async function transferToConnectedAccount(
  connectedAccountId: string,
  amount: number,
  transactionId: number,
  intent: string
) {
  const transfer = await stripe.transfers.create({
    amount: formatAmountForStripe(amount, "usd"),
    currency: "usd",
    source_transaction: intent,
    transfer_group: transactionId.toString(),
    destination: connectedAccountId,
  });
  return transfer;
}

export async function setUpCheckout(customer: string) {
  // Get the current base
  console.log(process.env.NEXT_PUBLIC_URL);
  const session = await stripe.checkout.sessions.create({
    mode: "setup",
    currency: "usd",
    customer,
    success_url: `${process.env.NEXT_PUBLIC_URL}/create-order`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/home`,
  });

  return session;
}

export async function retrievePaymentMethods(customer: string) {
  try {
    const pm = await stripe.customers.listPaymentMethods(customer);
    return pm;
  } catch (error) {
    console.log(error);
    throw Error("Error retrieving payment method");
  }
}

export async function createCustomerPaymentIntent(
  customer: string,
  amount: number,
  fee: number,
  transaction: number
) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: formatAmountForStripe(amount, "usd"),
    currency: "usd",
    application_fee_amount: formatAmountForStripe(fee, "usd"),
    off_session: true,
    metadata: {
      transaction: transaction.toString(),
    },
  });
  return paymentIntent;
}

export async function configBilling(customer: string) {
  const session = await stripe.billingPortal.sessions.create({
    customer,
  });
  return session;
}

export async function initiateCheckout(
  title: string,
  amount: number,
  fee: number,

  transaction: number
) {
  const session = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_URL}/home`,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          product_data: {
            name: title,
          },
          unit_amount: formatAmountForStripe(amount + fee, "usd"),
        },
      },
    ],
    payment_intent_data: {
      transfer_group: transaction.toString(),
      metadata: {
        transaction: transaction,
      },
    },
    mode: "payment",
  });
  if (session.url) redirect(session.url);
  else {
    throw Error("Error creating checkout session");
  }
}
