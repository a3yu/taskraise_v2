import { getProfile } from "@/lib/auth";
import {
  createStripeCustomer,
  retrievePaymentMethods,
  setUpCheckout,
} from "@/lib/stripe/stripe";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

export default async function CreateOrderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  try {
    return <div>{children}</div>;
  } catch (error) {
    redirect("/log-in");
  }
}
