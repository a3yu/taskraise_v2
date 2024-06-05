import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function Security() {
  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute top-0 right-0 left-0 bottom-0 bg-gradient-to-bl from-orange-100 from-15% via-blue-200 via-75% to-yellow-100 -z-20"></div>
      <div className="h-full flex flex-col bg-white/80">
        <div className="w-full px-32 py-4 flex">
          <h1 className="text-2xl font-bold text-black/70">Security</h1>
          <Link href={"/log-in"} className="ml-auto">
            <Button className="bg-black/10 rounded-3xl hover:bg-black/20 font-bold text-md text-black/60">
              Sign In
            </Button>
          </Link>
        </div>
        <div className="flex-1 flex items-center justify-center overflow-hidden px-32 py-4">
          <div className="bg-white p-6 rounded-lg shadow-lg overflow-y-auto max-h-full w-full">
            <h2 className="text-xl font-bold mb-4">Overview</h2>
            <p>
              This page gives an overview of security procedures that we follow
              in building MathRanksLLC and product.
            </p>
            <h3 className="text-lg font-bold mt-4">Payments</h3>
            <p>
              We process payments with Stripe, a fully PCI-compliant service
              provider certified with PCI DSS v3.2.1 compliance.
            </p>
            <p>
              Your Company does not process or store any payment information.
            </p>
            <h3 className="text-lg font-bold mt-4">Privacy</h3>
            <p>
              Your Company does not share or sell any of your data with other
              sources. You can read more information about how seriously we take
              your privacy at{" "}
              <Link href="/privacy">https://taskraise.com/privacy</Link>.
            </p>
            <h3 className="text-lg font-bold mt-4">Infrastructure</h3>
            <p>
              We use Supabase for our backend services and Amazon AWS ECS + EC2
              to host our technical infrastructure and servers. Amazon AWS has
              the following compliance certifications:
            </p>
            <ul className="list-disc list-inside">
              <li>PCI-DSS Level 1 Service Provider</li>
              <li>ISO 27001 certified</li>
              <li>SAS-70 Type II and SSAE16</li>
            </ul>
            <h3 className="text-lg font-bold mt-4">Development Process</h3>
            <p>
              We employ both internal and external testing and validation of our
              development process.
            </p>
            <p>
              Our application and code are scanned for static and dynamic code
              vulnerabilities. All engineers receive training and guidance
              regarding best-in-industry level security practices.
            </p>
            <h3 className="text-lg font-bold mt-4">Encryption</h3>
            <p>
              Data is encrypted in transit and at rest. We work with Amazon AWS
              to encrypt our data stored in our database and cache.
            </p>
            <h3 className="text-lg font-bold mt-4">Incident Response</h3>
            <p>
              All engineers are trained in incident response. We have systems
              monitoring the performance and reliability of our servers 24x7.
            </p>
            <p>
              Engineers serve rotating on-call rotations and are able to respond
              to incidents in a timely manner.
            </p>
            <h3 className="text-lg font-bold mt-4">
              SOC Compliance In Progress
            </h3>
            <p>
              We have begun the process of SOC Compliance audit. We will update
              this page when the audit has been completed.
            </p>
            <h3 className="text-lg font-bold mt-4">Contact</h3>
            <p>
              If you have questions or have found a suspected vulnerability, you
              can contact us at aedinyu05@gmail.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Security;
