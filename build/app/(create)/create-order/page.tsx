import React from "react";
import CreateOrderForm from "./_components/Form";
import { getProfile } from "@/lib/auth";
import { redirect } from "next/navigation";

async function CreateOrder() {
  try {
    await getProfile();
    return <CreateOrderForm />;
  } catch (error) {
    redirect("/log-in");
  }
}

export default CreateOrder;
