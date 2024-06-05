import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function Terms() {
  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute top-0 right-0 left-0 bottom-0 bg-gradient-to-bl from-orange-100 from-15% via-blue-200 via-75% to-yellow-100 -z-20"></div>
      <div className="h-full flex flex-col bg-white/80">
        <div className="w-full px-32 py-4 flex">
          <h1 className="text-2xl font-bold text-black/70">Terms of Service</h1>
          <Link href="/log-in" className="ml-auto">
            <Button className="bg-black/10 rounded-3xl hover:bg-black/20 font-bold text-md text-black/60">
              Sign In
            </Button>
          </Link>
        </div>
        <div className="flex-1 flex items-center justify-center overflow-hidden px-32 py-4">
          <div className="bg-white p-6 rounded-lg shadow-lg overflow-y-auto max-h-full w-full">
            <h2 className="text-xl font-bold mb-4">Last updated: 2024-05-30</h2>
            <p>
              Please read these Terms of Use (&quot;Terms&quot;, &quot;Terms of
              Use&quot;) carefully before using the fundraiser service provided
              at https://taskraise.com (the &quot;Service&quot;), operated by
              MathRanks LLC.
            </p>
            <h3 className="text-lg font-bold mt-4">Acceptance of Terms</h3>
            <p>
              Your access to and use of the Service is conditioned on your
              acceptance of and compliance with these Terms. These Terms apply
              to all visitors, users, and others who access or use the Service.
            </p>
            <p>
              By accessing or using the Service you agree to be bound by these
              Terms. If you disagree with any part of the terms, you may not
              access the Service.
            </p>
            <h3 className="text-lg font-bold mt-4">Our Role in Fundraisers</h3>
            <p>
              Fundraisers created on our platform are organized by the users,
              not us. We are a third-party service providing the technology for
              managing fundraisers and are not responsible or liable:
            </p>
            <ul className="list-disc list-inside">
              <li>for cancellations by the organizer;</li>
              <li>for any content or activities related to the fundraiser;</li>
              <li>
                for the accuracy of the fundraiser information provided by the
                organizer, including the details and updates.
              </li>
            </ul>
            <p>
              If you have an issue or question regarding any of the above, you
              should contact the fundraiser organizer. Organizers have full
              control over their fundraisers, and it is their responsibility to
              inform you of any relevant terms or policies that apply to your
              use of the Service outside of these Terms, as well as to respond
              to and resolve any disputes that you may have regarding their
              fundraisers.
            </p>
            <h3 className="text-lg font-bold mt-4">Content</h3>
            <p>
              Our Service allows you to post, link, store, share, and otherwise
              make available certain information, text, graphics, videos, or
              other material (&quot;Content&quot;).
            </p>
            <p>
              Subject to these Terms, you may share political opinions or other
              Content as permitted by applicable law. You agree that you are
              solely responsible for any content you post on the Service.
            </p>
            <p>
              You further agree that unless we agree otherwise in writing, you
              grant us and applicable organizers an unrestricted, worldwide,
              irrevocable, non-exclusive and royalty-free right to use, adapt,
              modify, publish, translate, distribute and display any Content you
              post on the Service, in any form or media.
            </p>
            <h3 className="text-lg font-bold mt-4">Links To Other Web Sites</h3>
            <p>
              Our Service may contain links to third-party web sites or services
              that are not owned or controlled by MathRanks LLC.
            </p>
            <p>
              We have no control over, and assume no responsibility for, the
              content, privacy policies, or practices of any third-party web
              sites or services. You further acknowledge and agree that we shall
              not be responsible or liable, directly or indirectly, for any
              damage or loss caused or alleged to be caused by or in connection
              with the use of or reliance on any such content, goods, or
              services available on or through any such web sites or services.
            </p>
            <h3 className="text-lg font-bold mt-4">Acceptable Use</h3>
            <p>
              You must not use the Service in any unlawful or fraudulent manner,
              or in a way that could damage or compromise our systems or
              security. You must not access the Service by any means other than
              our publicly supported interfaces.
            </p>
            <h3 className="text-lg font-bold mt-4">Consent</h3>
            <p>
              If you import people&apos;s data into our Service (names/emails),
              you must have their explicit consent to import them and send them
              emails. Violation of this policy will result in suspension of your
              account.
            </p>
            <h3 className="text-lg font-bold mt-4">
              Copyright, Trademarks, and Other Intellectual Property
            </h3>
            <p>
              All content and other materials available on our website and
              presented as part of the Service, including, without limitation,
              trademarks, service marks, trade names, images, audio, text,
              software, and the &quot;look and feel&quot; of https://yourapp.com
              and its associated lower-level webpages (collectively, &quot;Site
              Content&quot;) are protected by copyright, trademark, and other
              intellectual property laws. Such Site Content includes YourAppTM
              and related stylized designs, which are common law trademarks of
              MathRanks LLC. You may not reproduce, republish, distribute,
              display, perform, transmit, sell, or otherwise use any Site
              Content without our express written permission, except when such
              actions occur in connection with bona fide uses of the Service
              through our publicly supported interfaces.
            </p>
            <h3 className="text-lg font-bold mt-4">Copyright Infringement</h3>
            <p>
              If you believe that any Site Content infringes upon your
              copyright, please notify us at aedinyu05@gmail.com. Your notice
              should include (a) a description of the copyrighted work that you
              claim has been infringed; (b) the URL where the allegedly
              infringing Site Content is located; (c) your full name, postal
              address, telephone number, and email address; (d) a statement that
              you have a good faith belief that the use of the allegedly
              infringing material on the Site is not authorized; (e) your
              physical or electronic signature; and (f) a statement that you are
              the copyright owner or an authorized agent of the copyright owner,
              including any applicable copyright registration number(s).
            </p>
            <h3 className="text-lg font-bold mt-4">Submissions</h3>
            <p>
              We welcome feedback on our Service. However, you agree that any
              ideas, suggestions, drawings, graphics, innovations, concepts,
              recommendations, or similar materials (&quot;Submissions&quot;)
              you send us are not confidential. You hereby assign such
              Submissions to us without compensation (or the expectation of
              compensation), and agree that we may disclose, reproduce,
              republish, modify, distribute, display, perform, transmit, sell,
              or otherwise use your Submissions for commercial or non-commercial
              purposes with no compensation to you.
            </p>
            <h3 className="text-lg font-bold mt-4">Disclaimer</h3>
            <p>
              YOU AGREE THAT USE OF THE SERVICE IS AT YOUR SOLE RISK. THE
              SERVICE IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS
              AVAILABLE&quot; BASIS. WE EXPRESSLY DISCLAIM ALL WARRANTIES OF ANY
              KIND, EXPRESS OR IMPLIED, INCLUDING, WITHOUT LIMITATION, ANY
              WARRANTY OF MERCHANTABILITY, TITLE, QUIET ENJOYMENT, FITNESS FOR A
              PARTICULAR PURPOSE AND NON-INFRINGEMENT. NO ADVICE OR INFORMATION,
              WHETHER ORAL OR WRITTEN, OBTAINED BY YOU FROM US OR AT OR THROUGH
              THE SERVICE SHALL CREATE ANY WARRANTY NOT EXPRESSLY MADE HEREIN.
            </p>
            <p>
              WE MAKE NO WARRANTY THAT THE SERVICE WILL MEET YOUR REQUIREMENTS,
              BE ACCURATE, COMPLETE, CURRENT OR TIMELY, UNINTERRUPTED, SECURE,
              OR ERROR FREE.
            </p>
            <p>
              YOU ARE SOLELY RESPONSIBLE FOR ANY DAMAGE TO YOUR COMPUTER,
              COMPUTER NETWORK, OR DATA (INCLUDING LOSS OF DATA) THAT RESULTS
              FROM YOUR ACCESS OR USE OF THE SERVICE. WE DO NOT WARRANT THAT THE
              SERVICE IS FREE OF DEFECTS, VIRUSES, MALFUNCTIONS, OR HARMFUL
              COMPONENTS THAT COULD DAMAGE OR ALLOW UNAUTHORIZED ACCESS TO YOUR
              COMPUTER, COMPUTER NETWORK, OR DATA.
            </p>
            <p>
              WE ARE NOT RESPONSIBLE FOR ANY LOSS OR DAMAGE CAUSED, OR ALLEGED
              TO HAVE BEEN CAUSED, DIRECTLY OR INDIRECTLY, BY THE INFORMATION OR
              IDEAS CONTAINED, SUGGESTED, OR REFERENCED AT OR THROUGH THE
              SERVICE.
            </p>
            <p>
              WE MAKE NO REPRESENTATIONS OR WARRANTIES THAT THE SERVICE IS
              APPROPRIATE OR AVAILABLE FOR USE IN ALL GEOGRAPHIC LOCATIONS. IF
              YOU ACCESS OR USE THE SERVICE FROM OUTSIDE THE UNITED STATES OF
              AMERICA, YOU ARE SOLELY RESPONSIBLE FOR COMPLIANCE WITH ALL
              APPLICABLE LAWS, INCLUDING WITHOUT LIMITATION, EXPORT AND IMPORT
              REGULATIONS OF OTHER COUNTRIES.
            </p>
            <h3 className="text-lg font-bold mt-4">Limitation of Liability</h3>
            <p>
              NEITHER WE NOR OUR SUBSIDIARIES, OR AFFILIATES, AND RESPECTIVE
              OFFICERS, DIRECTORS, SHAREHOLDERS, EMPLOYEES, AGENTS, OR
              REPRESENTATIVES (OR THEIR RESPECTIVE SUCCESSORS AND ASSIGNS) SHALL
              BE LIABLE IN CONTRACT, TORT (INCLUDING NEGLIGENCE), OR OTHERWISE
              FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, PUNITIVE, OR
              CONSEQUENTIAL DAMAGES RESULTING FROM THE SERVICE OR THE USE,
              ATTEMPTED USE OR INABILITY TO USE THE SERVICE, INCLUDING, BUT NOT
              LIMITED TO, DAMAGES FOR LOST REVENUE, LOSS OF DATA, OR OTHER
              INTANGIBLES EVEN IF FORESEEABLE OR IF WE HAVE BEEN ADVISED OF THE
              POSSIBILITY OF SUCH DAMAGES. IN ANY EVENT, YOU AGREE THAT OUR
              TOTAL LIABILITY FOR DAMAGES, REGARDLESS OF THE FORM OF ACTION,
              SHALL NOT EXCEED THE ACTUAL TOTAL AMOUNT RECEIVED BY US FROM YOU
              TO ACCESS THE SERVICE. THE FOREGOING LIMITATIONS WILL APPLY EVEN
              IF THE ABOVE STATED REMEDY FAILS OF ITS ESSENTIAL PURPOSE. Some
              jurisdictions do not allow the exclusion of implied warranties or
              limitation of liability for incidental or consequential damages.
              Therefore, the exclusions set forth above may not apply to you.
            </p>
            <h3 className="text-lg font-bold mt-4">Indemnification</h3>
            <p>
              You agree to indemnify, hold harmless, and release us, our
              subsidiaries, our affiliates, and our respective officers,
              directors, shareholders, employees, agents, representatives (and
              their respective successors and assigns) from and against any and
              all claims, damages, costs and expenses, including, but not
              limited to, reasonable attorney&apos;s fees, arising from or
              related to your access, use, attempted use, inability to use, or
              misuse of the Service or noncompliance with these Terms of Use.
            </p>
            <h3 className="text-lg font-bold mt-4">
              Export Controls and Designated Persons
            </h3>
            <p>
              The Service is operated from the United States and it is possible,
              however unlikely, that software available at or through the
              Service may be subject to United States export controls
              administered by the United States Commerce Department or sanctions
              programs administered by the United States Treasury Department. No
              software available at or through the Service may be downloaded or
              otherwise exported or re-exported (a) into (or to a national or
              resident of) any country subject to a United States or United
              Nation embargo or sanction; (b) to anyone on the United States
              Treasury Department&apos;s list of Specially Designated Nationals
              and Blocked Persons (&quot;SDN List&quot;); (c) to anyone on the
              United States Commerce Department&apos;s Denied Persons List or
              Entity List; or (d) to anyone subject to the same or similar
              restrictions as the foregoing. By using any software available at
              or through the Service, you represent and warrant that you are not
              located in, under the control of, or a national or resident of any
              such country or on any of the above lists or subject to such
              restrictions.
            </p>
            <h3 className="text-lg font-bold mt-4">
              Governing Law, Jurisdiction, and Limitation of Actions
            </h3>
            <p>
              The Service is created and controlled by MathRanks LLC. in the
              State of Minnesota, United States of America. You agree that these
              Terms of Use will be governed by and construed in accordance with
              the laws of the State of Minnesota, without regard to its
              conflicts of law provisions. You agree that all legal proceedings
              arising out of or in connection with these Terms of Use or the
              Service must be brought in a federal or state court located in
              Eden Prairie, Minnesota, and that your claim(s) will be forever
              waived and barred unless filed within one year of the time in
              which the event(s) giving rise to such claim(s) began. You
              expressly submit to the exclusive jurisdiction of said courts and
              consent to extraterritorial service of process.
            </p>
            <h3 className="text-lg font-bold mt-4">General Provisions</h3>
            <p>
              If any provision of these Terms of Use are found to be invalid or
              unenforceable, such provision shall be severed from the remainder
              of the Terms of Use, which shall remain in full force and effect.
              No waiver of any breach or default of the Terms of Use shall be
              deemed to be a waiver of any preceding or subsequent breach or
              default. You may be required to agree to additional terms and
              conditions to access particular sections or functions of the
              Service. We reserve the right, in our sole discretion and without
              consent or notice, to transfer, assign, sublicense, or pledge the
              Service or these Terms of Use, in whole or in part, to any person
              or entity. You may not assign, sublicense, or otherwise transfer
              in any manner any of your rights or obligations under the Terms of
              Use. The section headings used in the Terms of Use are for
              convenience only.
            </p>
            <h3 className="text-lg font-bold mt-4">Termination</h3>
            <p>
              We may terminate or suspend access to our Service immediately,
              without prior notice or liability, for any reason whatsoever,
              including without limitation if you breach the Terms.
            </p>
            <p>
              All provisions of the Terms which by their nature should survive
              termination shall survive termination, including, without
              limitation, ownership provisions, warranty disclaimers, indemnity,
              and limitations of liability.
            </p>
            <h3 className="text-lg font-bold mt-4">Changes</h3>
            <p>
              We reserve the right, at our sole discretion, to modify or replace
              these Terms at any time. What constitutes a material change will
              be determined at our sole discretion.
            </p>
            <h3 className="text-lg font-bold mt-4">Contact Us</h3>
            <p>Email: aedinyu05@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Terms;
