import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DisplayOrdersPaginated from "./DisplayOrdersPaginated";
import { Transaction } from "@/lib/types";

function SwitchDisplay({
  ongoingTransactions,
  completedTransactions,
}: {
  ongoingTransactions: Transaction[];
  completedTransactions: Transaction[];
}) {
  return (
    <div className="w-full">
      <Tabs defaultValue="ongoing" className="w-full space-y-4">
        <TabsList>
          <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="complete">Complete</TabsTrigger>
        </TabsList>
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
