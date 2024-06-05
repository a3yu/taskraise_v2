import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DisplayOrdersPaginated from "./DisplayOrdersPaginated";
import { OrderCustomer, Transaction } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

function SwitchDisplay({
  createdTransactions,
  ongoingTransactions,
  completedTransactions,
}: {
  createdTransactions: OrderCustomer[];
  ongoingTransactions: OrderCustomer[];
  completedTransactions: OrderCustomer[];
}) {
  return (
    <div className="w-full">
      <Tabs defaultValue="created" className="w-full space-y-4">
        <div className="w-full flex">
          <TabsList>
            <TabsTrigger value="created">Created</TabsTrigger>
            <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
            <TabsTrigger value="complete">Complete</TabsTrigger>
          </TabsList>{" "}
          <Link href={"/create-order"} className="ml-auto">
            <Button variant={"fancy"}>
              Create Order <Plus className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <TabsContent value="created">
          <DisplayOrdersPaginated
            transactions={createdTransactions}
            variant="created"
          />
        </TabsContent>
        <TabsContent value="ongoing">
          <DisplayOrdersPaginated
            transactions={ongoingTransactions}
            variant="ongoing"
          />
        </TabsContent>
        <TabsContent value="complete">
          <DisplayOrdersPaginated
            transactions={completedTransactions}
            variant="completed"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default SwitchDisplay;
