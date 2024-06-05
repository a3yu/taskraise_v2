"use client";
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
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { acceptTask } from "@/lib/order";
import { Order, SearchResultOrders, Transaction } from "@/lib/types";
import { formatToDollar } from "@/lib/utils";
import { Loader2, MapPin, User2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

function OrderCardOrder({
  variant,
  order,
}: {
  variant: "open" | "ongoing" | "completed";
  order: SearchResultOrders;
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
  const [loading, setLoading] = useState(false);
  const variantStyles = getVariantStyles();
  const [open, setOpen] = useState(false);
  const handleClaimTask = async () => {
    if (confirm("Are you sure you want to claim this task?")) {
      setLoading(true);
      try {
        await acceptTask(order);
        setOpen(false);
      } catch (e) {
        setLoading(false);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
              {formatToDollar(order.amount)}
            </CardTitle>
          </div>

          <CardContent className="py-4">
            <h1 className="text-xl font-bold line-clamp-2 leading-snug">
              {order.title}
            </h1>
            <div className="mt-10 space-y-2">
              <p className="text-xs font-medium">Email</p>
              <Link
                href={`mailto:${order.email}`}
                className="font-bold text-xs  hover:cursor-pointer hover:underline"
              >
                {order.email}
              </Link>{" "}
            </div>
          </CardContent>
          <CardFooter className="border-t flex items-center py-4">
            <div className="flex space-x-2 items-center">
              <User2 className="h-5 w-5 text-gray-500" />
              <p className="text-sm font-medium text-gray-600">
                {order.full_name}
              </p>
            </div>
            <div className="flex space-x-2 items-center ml-auto">
              <MapPin className="h-5 w-5 text-gray-500" />
              <p className="text-sm font-medium text-gray-600">
                {order.location_name}
              </p>
            </div>
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{order.title}</DialogTitle>
        </DialogHeader>
        {order.description}
        <div className="flex items-center">
          <div className="flex space-x-2 items-center">
            <User2 className="h-5 w-5 text-gray-500" />
            <p className="text-sm font-medium text-gray-600">
              {order.full_name}
            </p>
          </div>
          <div className="flex space-x-2 items-center ml-4">
            <MapPin className="h-5 w-5 text-gray-500" />
            <p className="text-sm font-medium text-gray-600">
              {order.location_name}
            </p>
          </div>
          <div className="ml-auto">
            <Button
              variant={"fancy"}
              onClick={handleClaimTask}
              disabled={loading}
            >
              {!loading && <span>Accept</span>}
              {loading && <Loader2 className="animate-spin" />}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default OrderCardOrder;
