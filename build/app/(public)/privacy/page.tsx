import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function PrivacyPolicy() {
  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute top-0 right-0 left-0 bottom-0 bg-gradient-to-bl from-orange-100 from-15% via-blue-200 via-75% to-yellow-100 -z-20"></div>
      <div className="h-full flex flex-col bg-white/80">
        <div className="w-full px-32 py-4 flex">
          <h1 className="text-2xl font-bold text-black/70">Privacy Policy</h1>
          <Link href={"/log-in"} className="ml-auto">
            <Button className="bg-black/10 rounded-3xl hover:bg-black/20 font-bold text-md text-black/60">
              Sign In
            </Button>
          </Link>
        </div>
        <div className="flex-1 flex items-center justify-center overflow-hidden px-32 py-4">
          <div className="bg-white p-6 rounded-lg shadow-lg overflow-y-auto max-h-full w-full">
            <h2 className="text-xl font-bold mb-4">Last updated: 2023-11-28</h2>
            <p>
              MathRanks LLC. (&quot;us&quot;, &quot;we&quot;, or
              &quot;our&quot;) operates https://taskraise.com (the
              &quot;Service&quot;). This page informs you of our policies
              regarding the collection, use, and disclosure of Personal
              Information we receive from users of the Service.
            </p>
            <p>
              We use your Personal Information only for providing and improving
              the Service. By using the Service, you agree to the collection and
              use of information in accordance with this policy.
            </p>
            <h3 className="text-lg font-bold mt-4">
              Information Collection And Use
            </h3>
            <p>
              While using our Service, we may ask you to provide us with certain
              personally identifiable information that can be used to contact or
              identify you. Personally identifiable information may include, but
              is not limited to, your name and email address (&quot;Personal
              Information&quot;).
            </p>
            <p>
              We may share your personal data with third-parties to provide
              necessary services, including:
            </p>
            <ul className="list-disc list-inside">
              <li>
                if you are the host of a fundraiser, we will share your personal
                data with your guests;
              </li>
              <li>
                when you participate in a fundraiser, we will share your
                personal data with the fundraiser host host; and
              </li>
              <li>
                when you make a donation, we will share relevant information
                with Stripe, our payment processor.
              </li>
            </ul>
            <p>
              We make it clear to you throughout the Service when we share your
              personal data with third-parties. We have no control over, and are
              not responsible or liable for, the ways those third-parties use
              your personal data.
            </p>
            <p>
              Any information shared from our short code SMS program will not be
              shared with any third-parties for marketing or other reasons.
            </p>
            <h3 className="text-lg font-bold mt-4">Log Data</h3>
            <p>
              Like many site operators, we collect information that your browser
              sends whenever you visit our Service (&quot;Log Data&quot;).
            </p>
            <p>
              This Log Data may include information such as your computer&apos;s
              Internet Protocol (&quot;IP&quot;) address, browser type, browser
              version, the pages of our Service that you visit, the time and
              date of your visit, the time spent on those pages, and other
              statistics. In addition, we may use third party services such as
              Google Analytics that collect data about your visit.
            </p>
            <h3 className="text-lg font-bold mt-4">Cookies</h3>
            <p>
              Cookies are files with small amounts of data, which may include an
              anonymous unique identifier. Cookies are sent to your browser from
              a web site and stored on your computer&apos;s hard drive.
            </p>
            <p>
              Like many sites, we use &quot;cookies&quot; to collect
              information. You can instruct your browser to refuse all cookies
              or to indicate when a cookie is being sent. However, if you do not
              accept cookies, you may not be able to use some portions of our
              Service.
            </p>
            <h3 className="text-lg font-bold mt-4">Security</h3>
            <p>
              The security of your Personal Information is important to us, but
              remember that no method of transmission over the Internet, or
              method of electronic storage, is 100% secure. While we use
              commercially acceptable means to protect your Personal
              Information, we cannot guarantee its absolute security.
            </p>
            <h3 className="text-lg font-bold mt-4">Data Retention</h3>
            <p>
              We retain your personal data in order to provide a consistent
              service. We retain different types of data for different lengths
              depending on the type of data and what it is used for. We will
              retain your Personal Information for the period necessary to
              fulfill obligations to the law.
            </p>
            <h3 className="text-lg font-bold mt-4">
              Third-Party Web Sites and Applications
            </h3>
            <p>
              The Service contains links to third-party web sites and
              applications. Clicking on these links may allow those third
              parties to collect data about you. We do not control such web
              sites and applications and are not responsible for how they
              collect or use your data.
            </p>
            <h3 className="text-lg font-bold mt-4">Your Rights</h3>
            <p>
              Where and when required by the law, you have the right to request
              access, correction, or erasure of your personal data. We may need
              to request information from you to confirm your identity.
            </p>
            <p>
              If while using the Service, you grant us access to any external
              account of yours, for example, your Google account, you may revoke
              such access at any time and we will delete the associated data.
            </p>
            <h3 className="text-lg font-bold mt-4">
              Changes To This Privacy Policy
            </h3>
            <p>
              This Privacy Policy is effective as of the date above and will
              remain in effect except with respect to any changes in its
              provisions in the future, which will be in effect immediately
              after being posted on this page.
            </p>
            <p>
              We reserve the right to update or change our Privacy Policy at any
              time and you should check this Privacy Policy periodically. Your
              continued use of the Service after we post any modifications to
              the Privacy Policy on this page will constitute your
              acknowledgment of the modifications and your consent to abide and
              be bound by the modified Privacy Policy.
            </p>
            <p>
              If we make any material changes to this Privacy Policy, we will
              notify you either through the email address you have provided us,
              or by placing a prominent notice on our website.
            </p>
            <h3 className="text-lg font-bold mt-4">Contact Us</h3>
            <p>
              If you have any questions about this Privacy Policy, please email
              us at aedinyu05@gmail.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
