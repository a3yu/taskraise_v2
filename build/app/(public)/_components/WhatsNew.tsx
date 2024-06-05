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

function WhatsNew() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <h1 className="text-md font-semibold text-black/60 hover:text-black hover:cursor-pointer">
          What&apos;s New
        </h1>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>What&apos;s New</DialogTitle>
        Here are the latest updates and features added to our platform:
        <ul className="list-disc pl-5">
          <li>Nothing at the moment!</li>
        </ul>
        <DialogClose asChild>
          <Button variant={"fancy"}>Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export default WhatsNew;
