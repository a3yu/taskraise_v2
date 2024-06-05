import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { ChevronRight } from "lucide-react";
import React from "react";

function HowItWorks() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <h1 className="flex items-center hover:cursor-pointer">
          How it works <ChevronRight className="h-4 w-4 ml-2" />
        </h1>
      </DialogTrigger>
      <DialogContent>
        <h2 className="font-bold">Fundraisers</h2>
        <ul className="list-disc pl-5">
          <li>Create your organization.</li>
          <li>Pick tasks posted by customers.</li>
          <li>Complete tasks.</li>
          <li>Receive payments upon completion through Stripe.</li>
        </ul>
        <h2 className="font-bold">Customers</h2>
        <ul className="list-disc pl-5">
          <li>Post tasks for things you need help with.</li>
          <li>Wait for fundraisers to pick up your tasks.</li>
          <li>Confirm task completion.</li>
          <li>Payments are processed through our platform using Stripe.</li>
        </ul>

        <DialogClose asChild>
          <Button variant={"fancy"}>Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export default HowItWorks;
