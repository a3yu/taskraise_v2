"use server";

import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";
import { Tables } from "@/types/supabase";
import { revalidatePath } from "next/cache";

export async function signupGoogle(code: string | null) {
  const supabase = createClient();
  console.log(`${process.env.NEXT_PUBLIC_URL}/auth/callback`);
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_URL}/auth/callback`,
    },
  });
  console.log(data);
  if (error) {
    throw Error("Could not sign in with Google");
  }

  redirect(data.url);
}

export async function getProfile() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    throw Error("Could not get profile");
  }
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*, profiles_organizations(*)")
    .eq("id", data.user.id)
    .single();
  if (error || profile == null) {
    throw Error("Could not get profile");
  }
  return profile;
}

export async function logout() {
  const supabase = createClient();
  await supabase.auth.signOut();
  revalidatePath("/");
}
