"use client";
import React, { useState } from "react";
import { OrderCustomer } from "@/lib/types";
import OrderCardCustomer from "../../_components/OrderCardCustomer";
import Image from "next/image";
import OrderCardCustomerPayment from "../../_components/OrderCardCustomerPayment";

function DisplayOrdersPaginated({
  transactions,
  variant,
}: {
  transactions: OrderCustomer[];
  variant: "created" | "ongoing" | "completed";
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Adjust the number of items per page as needed

  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const currentTransactions = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const Placeholder = ({ text }: { text: string }) => (
    <div className="flex justify-center items-center h-24 w-full mt-4 bg-gray-100 border border-gray-300 rounded-lg">
      <p className="text-gray-500 text-sm">{text}</p>
    </div>
  );

  const getPlaceholderText = (variant: "created" | "ongoing" | "completed") => {
    switch (variant) {
      case "ongoing":
        return "No ongoing orders";
      case "completed":
        return "No completed orders";
      case "created":
        return "No open orders";
      default:
        return "No orders";
    }
  };

  return (
    <div>
      {transactions.length === 0 ? (
        <div className="flex flex-col items-center w-full">
          <Placeholder text={getPlaceholderText(variant)} />
        </div>
      ) : (
        <div>
          <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-6">
            {currentTransactions.map((order) =>
              order.status == "CLAIMED" ? (
                <OrderCardCustomerPayment
                  key={order.id}
                  order={order}
                  variant={variant}
                />
              ) : (
                <OrderCardCustomer
                  key={order.id}
                  order={order}
                  variant={variant}
                />
              )
            )}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center mt-4">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-4 py-2 mx-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 mx-1 ${
                    currentPage === index + 1
                      ? "bg-black-500 text-white"
                      : "bg-gray-200"
                  } rounded`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-4 py-2 mx-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DisplayOrdersPaginated;
