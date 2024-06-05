"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";
import { PlacesAutocomplete } from "@/app/_components/PlacesAutocomplete";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { Loader2, X } from "lucide-react";
import { addTask } from "@/lib/order";
import { calculateFee, formatToDollar } from "@/lib/utils";

// Schema definition using Zod
const orderSchema = z.object({
  title: z
    .string()
    .min(10, "Title must be more than 10 characters.")
    .max(50, "Title must be at most 50 characters."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long.")
    .max(200, "Description must be at most 200 characters."),
  payment: z.coerce.number().min(10, "Minimum donation is $10"),
  location: z.string().optional(),
  location_text: z.string().optional(),
});

function CreateOrderForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [locationSelect, setLocationSelect] = useState(false);
  const [showError, setShowError] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      location_text: "",
      payment: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof orderSchema>) => {
    try {
      setLoading(true);
      await addTask(values);
    } catch (e) {
      if (e instanceof Error) {
        setLoading(false);
        setError(e.message);
        setShowError(true);
      }
    }
  };

  const handleNext = async () => {
    let isValid;
    if (currentStep === 1) {
      isValid = await form.trigger(["title", "description"]);
    } else if (currentStep === 2) {
      isValid = await form.trigger(["payment", "location", "location_text"]);
    }
    if (isValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };
  const tCost =
    +calculateFee(form.watch("payment")).originalAmount +
    +calculateFee(form.watch("payment")).feeAmount;

  return (
    <div className="container flex h-screen  flex-col items-center justify-center">
      <Card className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[500px] drop-shadow">
        <CardContent className="p-10">
          {currentStep === 1 && (
            <section>
              <div className="space-y-1 mb-6">
                <h1 className="text-3xl font-bold">
                  Let&apos;s get started...
                </h1>
                <p className="text-sm text-muted-foreground">
                  Tell us what you need help with.
                </p>
              </div>
            </section>
          )}
          {currentStep === 2 && (
            <section>
              <div className="space-y-1 mb-6">
                <h1 className="text-3xl font-bold">
                  Now let&apos;s talk specifics...
                </h1>
                <p className="text-sm text-muted-foreground">
                  Your donation is fueling an organization&apos;s passions.
                </p>
              </div>
            </section>
          )}
          {currentStep === 3 && (
            <section>
              <div className="space-y-1 mb-6">
                <h1 className="text-3xl font-bold">Review your details</h1>
                <p className="text-sm text-muted-foreground">
                  Ensure all the information is correct.
                </p>
              </div>
              <div className="space-y-4">
                <p className="line-clamp-2">
                  <strong>Title:</strong> {form.watch("title")}
                </p>
                <p className="line-clamp-2">
                  <strong>Description:</strong> {form.watch("description")}
                </p>
                <p className="line-clamp-2">
                  <strong>Payment:</strong> ${form.watch("payment")}
                </p>
                {form.watch("location_text") && (
                  <p>
                    <strong>Location:</strong> {form.watch("location_text")}
                  </p>
                )}
                <p>
                  <strong>Total Cost:</strong> {formatToDollar(tCost)}
                </p>
                <p className="text-red-500 text-xs font-semibold">
                  You will be automatically charged when the order is picked up
                  by an organization.
                </p>
              </div>
            </section>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {currentStep === 1 && (
                <>
                  <FormField
                    name="title"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Give your task a brief title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Example: Walk my dog"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="description"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          What are you looking to get done? (include dates,
                          details, contact, or any relevant information)
                        </FormLabel>
                        <FormControl>
                          <Textarea placeholder="I need..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    onClick={handleNext}
                    className="w-full"
                    variant={"fancy"}
                  >
                    Next
                  </Button>
                </>
              )}
              {currentStep === 2 && (
                <>
                  <FormField
                    name="payment"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Donation amount</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter amount"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          5% + .30&#162; processing & platform fee will be
                          applied
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="location"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          What city are you located in? (leave blank if remote
                          task)
                        </FormLabel>
                        <FormControl>
                          <div className="flex">
                            <div className="w-full">
                              <PlacesAutocomplete
                                setSelectState={setLocationSelect}
                                selectState={locationSelect}
                                onAddressSelect={(address) => {
                                  getGeocode({ address: address }).then(
                                    (results) => {
                                      const { lat, lng } = getLatLng(
                                        results[0]
                                      );
                                      form.setValue(
                                        "location",
                                        "POINT(" + lat + " " + lng + ")"
                                      );
                                      form.setValue("location_text", address);
                                      setLocationSelect(true);
                                    }
                                  );
                                }}
                              />
                            </div>
                            {locationSelect && (
                              <div className="m-2 ml-auto">
                                <X
                                  className="hover:cursor-pointer"
                                  onClick={() => {
                                    form.setValue("location", "");
                                    form.setValue("location_text", "");
                                    setLocationSelect(false);
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex space-x-4">
                    <Button
                      type="button"
                      className="w-full mt-2"
                      size="lg"
                      variant={"outline"}
                      onClick={handleBack}
                    >
                      <span className="font-bold text-sm">Back</span>
                    </Button>
                    <Button
                      type="button"
                      className="w-full mt-2"
                      size="lg"
                      variant={"fancy"}
                      onClick={handleNext}
                    >
                      <span className="font-bold text-sm">Next</span>
                    </Button>
                  </div>
                </>
              )}
              {currentStep === 3 && (
                <>
                  <div className="flex space-x-4">
                    <Button
                      type="button"
                      className="w-full mt-2"
                      size="lg"
                      variant={"outline"}
                      onClick={handleBack}
                    >
                      <span className="font-bold text-sm">Back</span>
                    </Button>
                    <Button
                      type="submit"
                      className="w-full mt-2"
                      size="lg"
                      variant={"fancy"}
                      disabled={loading}
                    >
                      {!loading && (
                        <span className="font-bold text-sm">Submit</span>
                      )}
                      {loading && (
                        <span className="font-bold text-sm">
                          <Loader2 className="animate-spin" />
                        </span>
                      )}
                    </Button>
                  </div>
                </>
              )}
              {showError && (
                <p className="text-red-500 text-xs font-semibold">{error}</p>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default CreateOrderForm;
