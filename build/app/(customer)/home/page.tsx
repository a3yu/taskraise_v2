import React from "react";
import SwitchDisplay from "./_components/SwitchDisplay";
import { getCustomerData } from "@/lib/ordersAdmin";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";
export default async function Home() {
  try {
    const customer = await getCustomerData();
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
  } catch (e) {
    redirect("/");
  }
}
