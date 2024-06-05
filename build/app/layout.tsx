import type { Metadata } from "next";
import { Inter, Poppins, Roboto, Unbounded } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
});

export const metadata: Metadata = {
  title: "Taskraise",
  description: "Revolutionizing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.variable, inter.className, unbounded.variable)}>
        <Script
          id="googlemaps"
          type="text/javascript"
          strategy="beforeInteractive"
          defer
          async
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBgfQSsBnEUn1pNp-XHatpzO-ttacH1E88&loading=async&libraries=places"
        />
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
