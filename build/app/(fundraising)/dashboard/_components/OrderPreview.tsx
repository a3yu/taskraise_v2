import React from "react";
import OrderCardTransaction from "./OrderCardTransaction";
import { SearchResultOrders, Transaction } from "@/lib/types";
import OrderCardOrder from "./OrderCardOrder";
import Link from "next/link";

function OrderPreview({
  organizationTransactions,
  nearbyOrders,
}: {
  organizationTransactions: Transaction[];
  nearbyOrders: SearchResultOrders[];
}) {
  // Filter transactions based on their status
  const ongoingOrders = organizationTransactions
    .filter(
      (transaction) =>
        transaction.orders?.status === "CLAIMED" ||
        transaction.orders?.status === "ONGOING"
    )
    .slice(0, 2);
  const completeOrders = organizationTransactions
    .filter((transaction) => transaction.orders?.status === "COMPLETED")
    .slice(0, 2);

  // Placeholder component
  const Placeholder = ({ text }: { text: string }) => (
    <div className="flex justify-center items-center h-24 bg-gray-100 border border-gray-300 rounded-lg">
      <p className="text-gray-500 text-sm">{text}</p>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex gap-16 w-full">
        <div className="w-1/3">
          <div className="flex items-center mb-4 w-full">
            <div className="space-x-2 flex">
              <h2 className="text-sm">Recommended</h2>
              <div className="bg-gray-200 text-black font-medium rounded-lg font-sans text-sm px-2">
                {nearbyOrders.length > 10 ? "10+" : nearbyOrders.length}
              </div>
            </div>
            <div className="ml-auto">
              <Link
                className="text-sm pl-auto underline-offset-2 underline font-medium hover:cursor-pointer"
                href="/dashboard/marketplace"
              >
                View all
              </Link>
            </div>
          </div>
          <div className="space-y-6">
            {nearbyOrders.length > 0 ? (
              nearbyOrders
                .slice(0, 2)
                .map((order) => (
                  <OrderCardOrder key={order.id} variant="open" order={order} />
                ))
            ) : (
              <Placeholder text="No recommended tasks yet." />
            )}
          </div>
        </div>
        <div className="w-1/3">
          <div className="flex items-center mb-4 w-full">
            <div className="flex space-x-2 items-center">
              <h2 className="text-sm">Ongoing</h2>
              <div className="bg-gray-200 text-black font-medium rounded-lg font-sans text-sm px-2">
                {ongoingOrders.length > 10 ? "10+" : ongoingOrders.length}
              </div>
            </div>
            <div className="ml-auto">
              <Link
                className="text-sm pl-auto underline-offset-2 underline font-medium hover:cursor-pointer"
                href="/dashboard/orders"
              >
                View all
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            {ongoingOrders.length > 0 ? (
              ongoingOrders.map((transaction) => (
                <OrderCardTransaction
                  key={transaction.id}
                  variant="ongoing"
                  transaction={transaction}
                />
              ))
            ) : (
              <Placeholder text="No ongoing orders" />
            )}
          </div>
        </div>
        <div className="w-1/3">
          <div className="flex mb-4 items-center">
            <div className="flex space-x-2 items-center">
              <h2 className="text-sm">Complete</h2>
              <div className="bg-gray-200 text-black font-medium rounded-lg font-sans text-sm px-2">
                {completeOrders.length > 10 ? "10+" : completeOrders.length}
              </div>
            </div>
            <div className="ml-auto">
              <Link
                className="text-sm pl-auto underline-offset-2 underline font-medium hover:cursor-pointer"
                href="/dashboard/orders"
              >
                View all
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            {completeOrders.length > 0 ? (
              completeOrders.map((transaction) => (
                <OrderCardTransaction
                  key={transaction.id}
                  variant="completed"
                  transaction={transaction}
                />
              ))
            ) : (
              <Placeholder text="No completed orders" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderPreview;
