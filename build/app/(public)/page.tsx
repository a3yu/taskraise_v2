"use server";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import WhatsNew from "./_components/WhatsNew";
import Pricing from "./_components/Pricing";
import HowItWorks from "./_components/HowItWorks";
import { createClient } from "@/lib/supabase/server";
import { checkOrgRedirect } from "@/lib/organization";

export default async function Home() {
  const supabase = createClient();
  const user = await supabase.auth.getUser();
  if (user.data.user) {
    await checkOrgRedirect(user.data.user.id);
    redirect("/home");
  }
  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute top-0 right-0 left-0 bottom-0 bg-gradient-to-bl from-orange-100 from-15% via-blue-200 via-75% to-yellow-100 -z-20"></div>
      <div className="h-full flex flex-col bg-white/80">
        <div className="w-full px-4 md:px-32 py-4 flex">
          <h1 className="text-2xl font-bold text-black/70">Taskraise</h1>
          <Link href={"/log-in"} className="ml-auto">
            <Button className="bg-black/10 rounded-3xl hover:bg-black/20 font-bold text-md text-black/60">
              Sign In
            </Button>
          </Link>
        </div>
        <div className="flex-1 flex items-center justify-center overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-center w-full lg:w-2/3 p-8 space-y-8 lg:space-y-0 lg:space-x-12">
            <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
              <h1 className="text-4xl sm:text-6xl font-semibold text-black">
                Get a hand. <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#324DC7] via-indigo-500 to-blue-500 ">
                  Support a cause.
                </span>
              </h1>
              <p className="text-md sm:text-lg text-black/70">
                Post tasks that you need help with and let fundraising
                organizations handle them for you.
              </p>
              <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 items-center">
                <Link href="/log-in">
                  <Button
                    className="bg-black/80 rounded-3xl"
                    variant={"fancy"}
                    size={"sm"}
                  >
                    Get Started
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
                <HowItWorks />
              </div>
            </div>
            <div className="w-full sm:w-1/2 hidden lg:block">
              <Image
                src="/Rectangle1.jpg"
                className="rounded-xl shadow-xl border-gray-200 border-2"
                alt="Description of Image"
                layout="responsive"
                width={700}
                height={700}
                priority
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center w-full mt-auto">
          <Separator className="w-2/3 mx-auto" />
          <div className="flex flex-col w-2/3 mx-auto mb-4 space-y-2 mt-4">
            <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-8 mb-2">
              <WhatsNew />
              <Pricing />
              <Link
                href="mailto:aedinyu05@gmail.com"
                className="text-md font-semibold text-black/60 hover:text-black"
              >
                Contact Us
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 text-sm text-black/50">
              <Link href="/terms" className="hover:text-black">
                Terms
              </Link>
              <Link href="/privacy" className="hover:text-black">
                Privacy
              </Link>
              <Link href="/security" className="hover:text-black">
                Security
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
