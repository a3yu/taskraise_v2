"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";
import { PlacesAutocomplete } from "@/app/_components/PlacesAutocomplete";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { ChevronsLeft, Loader, Loader2, X } from "lucide-react";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { createOrganization } from "@/lib/organization";

// Schema definition using Zod
const organizationSchema = z.object({
  name: z
    .string()
    .min(1, "Name must be more than 1 character.")
    .max(50, "Name must be at most 50 characters."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long.")
    .max(200, "Description must be at most 200 characters."),

  location: z.string(),
  location_text: z.string(),
  email: z.string().email("Invalid email address"),
});

function CreateOrganizationForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [locationSelect, setLocationSelect] = useState(false);
  const [showError, setShowError] = useState(false);

  const form = useForm({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: "",
      description: "",
      location: "",
      location_text: "",
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof organizationSchema>) => {
    try {
      setLoading(true);
      await createOrganization(values);
    } catch (e) {
      if (e instanceof Error) {
        setLoading(false);

        setError(e.message);
        setShowError(true);
      }
    }
  };

  return (
    <div className="container flex h-screen  flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <>
          <ChevronsLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>
      <Card className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[500px] drop-shadow">
        <CardContent className="p-10">
          <section>
            <div className="space-y-1 mb-6">
              <h1 className="text-3xl font-bold">Let&apos;s get started...</h1>
              <p className="text-sm text-muted-foreground">
                Tell us some details about your organization.
              </p>
            </div>
          </section>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What&apos;s your organizations name?</FormLabel>
                    <FormControl>
                      <Input placeholder="Acme Robotics Inc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      What&apos;s an email customers an reach you at?
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Acme@robotics.com" {...field} />
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
                    <FormLabel>Describe your organization</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="We are a student organization that builds robots..."
                        {...field}
                      />
                    </FormControl>
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
                      What city is your organization located in?
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
                                  const { lat, lng } = getLatLng(results[0]);
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
              <Button className="w-full" disabled={loading} variant={"fancy"}>
                {!loading && <span>Create Organization</span>}
                {loading && <Loader2 className="animate-spin" />}
              </Button>
              <div className="flex space-x-4"></div>
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

export default CreateOrganizationForm;
