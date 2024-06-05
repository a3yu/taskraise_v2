import React from "react";
import TopRow from "./_components/TopRow";
import { getOrganizationData } from "@/lib/ordersAdmin";
import OrderCard from "./_components/OrderCardTransaction";
import OrderPreview from "./_components/OrderPreview";
import { redirect } from "next/navigation";
import { taskSearch } from "@/lib/search";
import { formatToDollar } from "@/lib/utils";
import {
  createStripeAccountOnboardingLink,
  fetchAccount,
} from "@/lib/stripe/stripe";
import StripeOnboardingNotice from "../_components/StripeOnboardingNotice";
export const dynamic = "force-dynamic";
async function Dashboard() {
  const org = await getOrganizationData();
  if (!org.organizations) {
    redirect("/");
  }
  const fetchAccountInfo = await fetchAccount(org.organizations.stripe_id);
  const onboarded = fetchAccountInfo.details_submitted == false;
  const nearbyOrders = await taskSearch(null, null, null, null, 0, 2);

  // Check if transactions exist and filter them if they do
  const transactions = org.organizations.transactions || [];
  const completedTransactions = transactions.filter(
    (transaction) => transaction.orders?.status === "COMPLETED"
  );
  const totalFundsRaised = completedTransactions.reduce(
    (total, transaction) => total + (transaction.orders?.amount || 0),
    0
  );

  return (
    <div className="space-y-8">
      {onboarded && (
        <StripeOnboardingNotice stripeAccountId={org.organizations.stripe_id} />
      )}
      <div>
        <h1 className="font-extrabold text-3xl">Total Funds Raised</h1>
        <span className="font-extrabold font-serif text-3xl bg-clip-text text-transparent bg-gradient-to-r from-[#324DC7] via-indigo-500 to-blue-500 ">
          {formatToDollar(totalFundsRaised)}
        </span>
      </div>

      <div className="w-full">
        <OrderPreview
          organizationTransactions={transactions}
          nearbyOrders={nearbyOrders}
        />
      </div>
    </div>
  );
}

export default Dashboard;
