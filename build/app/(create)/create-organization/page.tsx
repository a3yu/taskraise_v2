import React from "react";
import CreateOrganizationForm from "./_components/Form";
import { getProfile } from "@/lib/auth";
import { checkOrg, checkOrgReturn } from "@/lib/organization";
import { redirect } from "next/navigation";

async function CreateOrganization() {
  try {
    const profile = await getProfile();
    const org = await checkOrgReturn(profile.id);
    if (org) {
      redirect("/dashboard");
    } else {
      return <CreateOrganizationForm />;
    }
  } catch (error) {
    redirect("/log-in");
  }
}

export default CreateOrganization;
