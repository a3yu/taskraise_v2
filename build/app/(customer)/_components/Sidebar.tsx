"use client";

import Link from "next/link";

import {
  ArrowLeft,
  BarChart3,
  Edit3,
  Globe,
  Layout,
  LayoutDashboard,
  Megaphone,
  Menu,
  Newspaper,
  Settings,
  Search,
  CircleDollarSign,
  Wallet,
  Building,
  SquareKanban,
  ShoppingCart,
  List,
  Folders,
  SquareGanttChart,
  WalletMinimal,
  Users,
  User,
  LogOut,
  UserIcon,
} from "lucide-react";
import {
  useParams,
  usePathname,
  useSelectedLayoutSegments,
} from "next/navigation";
import { ReactNode, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/lib/auth";
import { Tables } from "@/types/supabase";

export default function SideBar({
  full_name,
  org,
}: {
  full_name: string | null;
  org: Tables<"profiles_organizations">[];
}) {
  const segments = useSelectedLayoutSegments();
  const { organization, fundraiser } = useParams() as {
    organization?: string;
    fundraiser?: string;
  };

  const tabs = useMemo(() => {
    return [
      {
        name: "Orders",
        href: "/home",
        isActive: segments.length === 1,
        icon: <Folders width={18} />,
      },
    ];
  }, [segments, fundraiser, organization]);

  const [showSidebar, setShowSidebar] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    // hide sidebar on path change
    setShowSidebar(false);
  }, [pathname]);

  return (
    <>
      <button
        className={`fixed z-20 ${
          // left align for Editor, right align for other pages
          segments[0] === "post" && segments.length === 2 && !showSidebar
            ? "left-5 top-5"
            : "right-5 top-7"
        } sm:hidden`}
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <Menu width={20} />
      </button>
      <div
        className={`transform ${
          showSidebar ? "w-full translate-x-0" : "-translate-x-full"
        } fixed z-10 flex h-full flex-col justify-between border-r border-stone-200 bg-stone-100 p-4 transition-all dark:border-stone-700 dark:bg-stone-900 sm:w-60 sm:translate-x-0`}
      >
        <div className="grid gap-2">
          <div className="flex items-center space-x-2 rounded-lg px-2 py-1.5">
            {/* <Link
              href="/"
              className="rounded-lg p-2 hover:bg-stone-200 dark:hover:bg-stone-700"
            >
              <Image
                src={Logo}
                width={35}
                height={35}
                alt="Logo"
                className="dark:scale-110 dark:rounded-full dark:border dark:border-stone-400"
              />
            </Link> */}
          </div>
          <div className="grid gap-1">
            {tabs.map(({ name, href, isActive, icon }) => (
              <Link
                key={name}
                href={href}
                className={`flex items-center space-x-3 ${
                  isActive ? "bg-stone-200 text-black dark:bg-stone-700" : ""
                } rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800`}
              >
                {icon}
                <span className="text-sm font-medium">{name}</span>
              </Link>
            ))}
            {org.length === 0 ? (
              <Link
                href={"/create-organization"}
                className="flex items-center space-x-3 rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800"
              >
                <CircleDollarSign width={18} />
                <span className="text-sm font-medium">Start Fundraising</span>
              </Link>
            ) : (
              <Link
                href={"/dashboard"}
                className="flex items-center hover:cursor-pointer space-x-3 rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800"
              >
                <CircleDollarSign width={18} />
                <span className="text-sm font-medium">
                  Fundraiser Dashboard
                </span>
              </Link>
            )}
          </div>
        </div>
        <div>
          <div className="mb-4 border-t border-stone-200 dark:border-stone-700 w-full" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={"outline"}
                size={"sm"}
                className="font-semibold w-full"
              >
                {full_name}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                className="text-red-500"
                onClick={async () => {
                  await logout();
                }}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
}
