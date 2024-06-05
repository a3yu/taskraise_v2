"use server";

import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";
import { z } from "zod";
import { createStripeAccount } from "./stripe/stripe";
import { getProfile } from "./auth";

export async function checkOrg(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles_organizations")
    .select("*")
    .eq("profile", id)
    .single();
  if (error) {
    console.log("123");
    throw Error("Could not get organization data");
  }
  return data;
}

export async function checkOrgReturn(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles_organizations")
    .select("*")
    .eq("profile", id)
    .single();
  if (error) {
    return false;
  }
  return true;
}

export async function checkOrgRedirect(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles_organizations")
    .select("*")
    .eq("profile", id)
    .single();
  if (error) {
    return;
  }
  redirect("/dashboard");
}
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
export async function createOrganization(
  values: z.infer<typeof organizationSchema>
) {
  const supabase = createClient();
  const account = await createStripeAccount();
  const { data, error } = await supabase.from("organizations").insert({
    name: values.name,
    description: values.description,
    location: values.location,
    email: values.email,
    location_name: values.location_text,
    stripe_id: account.id,
  });
  if (error) {
    console.log(error);
    throw Error("Error sending message");
  }
  redirect("/dashboard");
}
export async function getOrg() {
  const supabase = createClient();
  const profile = await getProfile();
  const { data, error } = await supabase
    .from("profiles_organizations")
    .select("*, organizations(*)")
    .eq("profile", profile.id)
    .single();
  console.log(error);
  if (error) {
    throw Error("Could not get organization data");
  }

  return data;
}
