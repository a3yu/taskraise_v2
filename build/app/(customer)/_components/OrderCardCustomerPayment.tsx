import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { initiateOrderPayment } from "@/lib/order";
import { OrderCustomer } from "@/lib/types";
import { formatToDollar } from "@/lib/utils";
import { Mail, MapPin, User2, Users } from "lucide-react";
import Link from "next/link";
import React from "react";

function OrderCardCustomerPayment({
  order,
  variant,
}: {
  order: OrderCustomer;
  variant: "created" | "ongoing" | "completed";
}) {
  const getVariantStyles = () => {
    switch (variant) {
      case "created":
        return {
          bg: "bg-gradient-to-r from-gray-200 to-gray-400",
          text: "Created",
          textColor: "text-gray-800",
        };
      case "ongoing":
        return {
          bg: "bg-gradient-to-r from-yellow-200 to-yellow-400",
          text: "In progress",
          textColor: "text-yellow-900",
        };
      case "completed":
        return {
          bg: "bg-gradient-to-r from-green-200 to-green-400",
          text: "Completed",
          textColor: "text-green-900",
        };
      default:
        return {
          bg: "bg-gradient-to-r from-gray-200 to-gray-400",
          text: "Not claimed",
          textColor: "text-gray-800",
        };
    }
  };

  const getPaymentStatusStyles = () => {
    switch (order.status) {
      case "CLAIMED":
        return {
          text: "Pay now to complete order.",
          bgColor: "bg-orange-500",
          textColor: "text-white",
        };
      case "ONGOING":
        return {
          text: "Customer payment processed.",
          bgColor: "bg-green-500",
          textColor: "text-white",
        };
      default:
        return {
          text: "",
          bgColor: "",
          textColor: "",
        };
    }
  };

  const variantStyles = getVariantStyles();
  const paymentStatusStyles = getPaymentStatusStyles();
  const handlePayment = async () => {
    await initiateOrderPayment(order);
  };

  return (
    <Card
      className="shadow transform transition-transform duration-200 hover:scale-[1.01] hover:backface-hidden cursor-pointer"
      onClick={handlePayment}
    >
      <div
        className={`${variantStyles.bg} rounded-t-md px-6 py-2 flex justify-between items-center`}
      >
        <p className={`text-sm font-medium ${variantStyles.textColor}`}>
          {variantStyles.text}
        </p>
        <div
          className={`h-2 w-2 rounded-full ${variantStyles.textColor}`}
        ></div>
      </div>

      <div className="bg-gradient-to-r from-[#324DC7] via-indigo-500 to-blue-500 flex border p-6">
        <CardTitle className="font-unbounded text-2xl flex items-center text-white">
          <span className="text-sm mr-2 mt-1 font-sans font-medium">
            Donate
          </span>
          {formatToDollar(order.amount + order.fee)}
        </CardTitle>
      </div>

      <CardContent className="py-4">
        <h1 className="text-xl font-bold line-clamp-2 leading-snug">
          {order.title}
        </h1>

        <div className="mt-10 space-y-2">
          <p className="text-xs font-medium">Email</p>
          <Link
            href={`mailto:${order.transactions?.organizations?.email}`}
            className="font-bold text-xs  hover:cursor-pointer hover:underline"
          >
            {order.transactions?.organizations?.email}
          </Link>{" "}
        </div>
        {paymentStatusStyles.text && (
          <div className="mt-4">
            <p
              className={`inline-block px-2 py-1 text-xs font-semibold ${paymentStatusStyles.textColor} ${paymentStatusStyles.bgColor} rounded`}
            >
              {paymentStatusStyles.text}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t flex items-center py-4 space-x-6">
        <div className="flex space-x-2 items-center">
          <MapPin className="h-5 w-5 text-gray-500" />
          <p className="text-sm font-medium text-gray-600">
            {order.location_name}
          </p>
        </div>
        {order.transactions?.organizations && (
          <div className="flex space-x-2 items-center">
            <Users className="h-5 w-5 text-gray-500" />
            <p className="text-sm font-medium text-gray-600">
              {order.transactions.organizations.name}
            </p>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

export default OrderCardCustomerPayment;
