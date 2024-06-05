"use server";
import React from "react";
import SwitchDisplay from "./_components/SwitchDisplay";
import { getCustomerData } from "@/lib/ordersAdmin";
import { redirect } from "next/navigation";

export default async function Home() {
  let customer;
  try {
    customer = await getCustomerData();
  } catch (e) {
    redirect("/");
    return null; // Ensure the function stops execution if redirection happens
  }

  const createdTransactions = customer.orders.filter(
    (transaction) => transaction.status === "OPEN"
  );
  const completedTransactions = customer.orders.filter(
    (transaction) => transaction.status === "COMPLETED"
  );
  const ongoingTransactions = customer.orders.filter(
    (transaction) =>
      transaction.status === "CLAIMED" || transaction.status === "ONGOING"
  );

  return (
    <div>
      <SwitchDisplay
        completedTransactions={completedTransactions}
        createdTransactions={createdTransactions}
        ongoingTransactions={ongoingTransactions}
      />
    </div>
  );
}
