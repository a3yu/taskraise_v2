import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Transaction } from "@/lib/types";
import { formatToDollar } from "@/lib/utils";
import { Mail, MapPin, SquareMousePointer, User2 } from "lucide-react";
import Link from "next/link";
import React from "react";

function OrderCardTransaction({
  variant,
  transaction,
}: {
  variant: "open" | "ongoing" | "completed";
  transaction: Transaction;
}) {
  const getVariantStyles = () => {
    switch (variant) {
      case "open":
        return {
          bg: "bg-gradient-to-r from-gray-200 to-gray-400",
          text: "Open",
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
    switch (transaction.orders?.status) {
      case "CLAIMED":
        return {
          text: "Customer has not paid yet.",
          bgColor: "bg-red-600",
          textColor: "text-white",
        };
      case "ONGOING":
        return {
          text: "Customer payment processed.",
          bgColor: "bg-green-600",
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="shadow transform transition-transform duration-200 hover:scale-[1.01] hover:backface-hidden cursor-pointer">
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
                Raise
              </span>
              {formatToDollar(transaction.orders?.amount)}
            </CardTitle>
          </div>

          <CardContent className="py-4">
            <h1 className="text-xl font-bold line-clamp-2 leading-snug">
              {transaction.orders?.title}
            </h1>
            <div className="mt-10 space-y-2">
              <p className="text-xs font-medium">Email</p>
              <Link
                href={`mailto:${transaction.orders?.profiles?.email}`}
                className="font-bold text-xs  hover:cursor-pointer hover:underline"
              >
                {transaction.orders?.profiles?.email}
              </Link>
            </div>
            {paymentStatusStyles.text && (
              <div className="mt-4">
                <p
                  className={`inline-block px-2 py-1 text-xs font-semibold ${paymentStatusStyles.textColor} ${paymentStatusStyles.bgColor} rounded-lg`}
                >
                  {paymentStatusStyles.text}
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t flex items-center py-4">
            <div className="flex space-x-2 items-center">
              <User2 className="h-5 w-5 text-gray-500" />
              <p className="text-sm font-medium text-gray-600">
                {transaction.orders?.profiles?.full_name}
              </p>
            </div>
            <div className="flex space-x-2 items-center ml-auto">
              <MapPin className="h-5 w-5 text-gray-500" />
              <p className="text-sm font-medium text-gray-600">
                {transaction.orders?.location_name}
              </p>
            </div>
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{transaction.orders?.title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <p>{transaction.orders?.description}</p>
        </div>
        <div className="flex items-center mt-4">
          <div className="flex space-x-2 items-center">
            <User2 className="h-5 w-5 text-gray-500" />
            <p className="text-sm font-medium text-gray-600">
              {transaction.orders?.profiles?.full_name}
            </p>
          </div>
          <div className="flex space-x-2 items-center ml-4">
            <MapPin className="h-5 w-5 text-gray-500" />
            <p className="text-sm font-medium text-gray-600">
              {transaction.orders?.location_name}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default OrderCardTransaction;
