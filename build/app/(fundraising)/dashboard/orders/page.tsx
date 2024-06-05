"use server";
import { getOrganizationData } from "@/lib/ordersAdmin";
import React from "react";
import SwitchDisplay from "./_components/SwitchDisplay";
import { redirect } from "next/navigation";

async function Orders() {
  const org = await getOrganizationData();
  if (!org.organizations) {
    redirect("/");
  }
  const completedTransactions = org.organizations.transactions.filter(
    (transaction) => transaction.orders?.status === "COMPLETED"
  );
  const ongoingTransactions = org.organizations.transactions.filter(
    (transaction) => transaction.orders?.status === "CLAIMED"
  );
  return (
    <div className="w-full">
      <SwitchDisplay
        completedTransactions={completedTransactions}
        ongoingTransactions={ongoingTransactions}
      />
    </div>
  );
}

export default Orders;
