"use client";
import { Button } from "@/components/ui/button";
import { createStripeAccountOnboardingLink } from "@/lib/stripe/stripe";
import { useRouter } from "next/navigation";
import React from "react";

function StripeOnboardingNotice({
  stripeAccountId,
}: {
  stripeAccountId: string;
}) {
  const router = useRouter();
  const completeSetup = async () => {
    const billingLink = await createStripeAccountOnboardingLink(
      stripeAccountId
    );
    router.push(billingLink.url);
  };
  return (
    <div
      className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded-lg"
      role="alert"
    >
      <p className="font-bold">Action Needed</p>
      <p>Complete your Stripe setup to claim tasks.</p>
      <Button
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={completeSetup}
      >
        Complete Setup
      </Button>
    </div>
  );
}

export default StripeOnboardingNotice;
