"use server";
import { z } from "zod";
import { createClient } from "./supabase/server";
import { calculateFee } from "./utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Tables } from "@/types/supabase";
import { getOrg } from "./organization";
import { Order, OrderCustomer, SearchResultOrders } from "./types";
import {
  createCustomerPaymentIntent,
  createStripeAccountOnboardingLink,
  fetchAccount,
  initiateCheckout,
  transferToConnectedAccount,
} from "./stripe/stripe";
import {
  orderClaimedForCustomer,
  orderCompletedForOrganization,
} from "./emails";
const orderSchema = z.object({
  title: z
    .string()
    .min(10, "Title must be more than 10 characters.")
    .max(50, "Title must be at most 50 characters."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long.")
    .max(200, "Description must be at most 200 characters."),
  payment: z.coerce.number().min(10, "Minimum donation is $10"),
  location: z.string().optional(),
  location_text: z.string().optional(),
});
export async function addTask(values: z.infer<typeof orderSchema>) {
  const supabase = createClient();
  const user = await supabase.auth.getUser();
  if (!user.data.user) {
    throw Error("No authentication");
  }
  const pay = calculateFee(values.payment);
  if (values.location === "") {
    const { error } = await supabase.from("orders").insert({
      title: values.title,
      description: values.description,
      amount: pay.originalAmount,
      fee: pay.feeAmount,
      location_name: "Remote",
      profile: user.data.user.id,
    });
    if (error) {
      console.log(error);
      throw Error("Error creating task");
    }
  } else {
    const { error } = await supabase.from("orders").insert({
      title: values.title,
      description: values.description,
      amount: pay.originalAmount,
      fee: pay.feeAmount,
      profile: user.data.user.id,
      location: values.location,
      location_name: values.location_text,
    });

    if (error) {
      console.log(error);
      throw Error("Error creating task");
    }
  }
  revalidatePath("/home", "layout");
  redirect("/home");
}

export async function acceptTask(order: SearchResultOrders) {
  const supabase = createClient();
  let redirectUrl = null;

  try {
    const organization = await getOrg();
    if (!organization.organizations?.stripe_id) {
      console.log(organization.organizations?.stripe_id);
      throw Error("Organization does not have a stripe account");
    }
    const fetchAccountInfo = await fetchAccount(
      organization.organizations?.stripe_id
    );
    if (!fetchAccountInfo.details_submitted) {
      const billingLink = await createStripeAccountOnboardingLink(
        fetchAccountInfo.id
      );
      redirectUrl = billingLink.url;
    } else {
      const { error } = await supabase.from("transactions").insert({
        organization: organization.organizations.id,
        order: order.id,
      });
      if (error) {
        throw Error("Error creating transaction");
      }
      await orderClaimedForCustomer(
        order.email,
        order.full_name,
        order.title,
        organization.organizations.name
      );
      redirectUrl = "/dashboard/orders";
    }
  } catch (error) {
    console.log(error);
    throw Error("Error creating transaction");
  }

  revalidatePath("/orders", "layout");

  if (redirectUrl) {
    redirect(redirectUrl);
  }
}

export async function deleteTask(id: number) {
  const supabase = createClient();
  const response = await supabase.from("orders").delete().eq("id", id);
  if (response.error) {
    console.log(response.error);
    throw Error("Error deleting task");
  }
  revalidatePath("/home", "layout");
  redirect("/home");
}

export async function initiateOrderPayment(order: OrderCustomer) {
  if (!order.transactions?.id) throw Error("No transaction id found");
  await initiateCheckout(
    order.title,
    order.amount,
    order.fee,
    order.transactions.id
  );
}

export async function orderDelete(order: number) {
  const supabase = createClient();
  const response = await supabase.from("orders").delete().eq("id", order);
  if (response.error) {
    console.log(response.error);
    throw Error("Error deleting order");
  }
  revalidatePath("/home", "layout");
  redirect("/home");
}

export async function orderComplete(
  order: number,
  stripe_account: string,
  amount: number,
  transaction: number,
  orderObject: OrderCustomer
) {
  const supabase = createClient();
  const response = await supabase
    .from("orders")
    .update({ status: "COMPLETED" })
    .eq("id", order)
    .select("*");
  if (response.error) {
    console.log(response.error);
    throw Error("Error completing order");
  }
  try {
    await transferToConnectedAccount(stripe_account, amount, transaction);
  } catch (error) {
    throw Error("Error transferring funds");
  }
  if (orderObject.transactions?.organizations) {
    await orderCompletedForOrganization(
      orderObject.transactions.organizations.email,
      orderObject.title,
      orderObject.transactions.organizations.name
    );
  }

  revalidatePath("/home", "layout");
  redirect("/home");
}
