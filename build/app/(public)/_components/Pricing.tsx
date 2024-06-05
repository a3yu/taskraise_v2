import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import React from "react";

function Pricing() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <h1 className="text-md font-semibold text-black/60 hover:text-black hover:cursor-pointer">
          Pricing
        </h1>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Pricing Details</DialogTitle>
        Our platform uses Stripe for secure payments. Here is a breakdown of the
        fees:
        <ul className="list-disc pl-5 mt-2">
          <li>Stripe Fee: 2.9% + 30 cents per transaction</li>
          <li>Platform Fee: 5% per transaction</li>
        </ul>
        These fees help us provide you with a secure and efficient payment
        experience.
        <DialogClose asChild>
          <Button variant={"fancy"}>Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export default Pricing;
