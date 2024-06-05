import { getProfile } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function CreateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative h-screen">
      <div className="absolute top-0 right-0 left-0 bottom-0 bg-gradient-to-bl from-orange-100 from-15% via-blue-200 via-75% to-yellow-100 -z-20"></div>
      <div className="h-full bg-white/60">{children}</div>
    </div>
  );
}
