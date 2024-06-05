import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import SideBar from "./_components/Sidebar";
import { getProfile } from "@/lib/auth";
import { redirect } from "next/navigation";
import { checkOrg } from "@/lib/organization";

export default async function FundraisingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  try {
    const profile = await getProfile();
    await checkOrg(profile.id);
    return (
      <div>
        <SideBar full_name={profile.full_name} />
        <div className="relative h-screen">
          <div className="h-full sm:pl-60">
            <div className="px-10 py-8">{children}</div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    redirect("/log-in");
  }
}
