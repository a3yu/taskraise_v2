"use server";

import { createAdminClient } from "./supabase/admin";
import { getProfile } from "./auth";

export async function getOrganizationData() {
  const supabase = createAdminClient();
  try {
    const profile = await getProfile();
    const { data, error } = await supabase
      .from("profiles_organizations")
      .select(
        "*, organizations(*, transactions(*, orders!orders_transaction_fkey(*, profiles(*))), profiles_organizations(*, profiles(*)))"
      )
      .eq("profile", profile.id)
      .single();

    if (error) {
      console.log(error);
      throw Error("Could not get organization data");
    }
    return data;
  } catch (error) {
    console.log(error);
    throw Error("Could not get organization data");
  }
}

export async function getCustomerData() {
  const supabase = createAdminClient();
  try {
    const profile = await getProfile();
    const { data, error } = await supabase
      .from("profiles")
      .select(
        "*, orders(*, transactions!orders_transaction_fkey(*, organizations(*)))"
      )
      .eq("id", profile.id)
      .single();

    if (error) {
      console.log(error);
      throw Error("Could not get customer data");
    }
    return data;
  } catch (error) {
    console.log(error);
    throw Error("Could not get customer data");
  }
}
