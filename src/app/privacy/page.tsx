import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Lock, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy & Google AdSense DART Cookie Notice",
  description:
    "CashPulse Privacy Policy detailing data protection practices, zero server-side storage of financial inputs, and mandatory Google AdSense DART cookie disclosures.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 text-slate-800">
      <div className="border-b border-[#EAEAE3] pb-6">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-spruce-50 px-3 py-1 text-xs font-semibold text-spruce-800 mb-3">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Transparency &amp; Consumer Privacy</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Privacy Policy &amp; Cookie Disclosure
        </h1>
        <p className="mt-2 text-xs text-slate-500 font-mono">
          Last Updated: January 1, 2025 &bull; Compliant with Google AdSense, GDPR &amp; CCPA
        </p>
      </div>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-slate-700">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">1. Core Privacy Principle: Zero Financial Data Stored</h2>
          <p>
            At CashPulse (accessible at cashpulse.vercel.app), the privacy of our visitors is of paramount importance. All financial calculations—including gross 1099 revenue, deductions, invoice amounts, savings balances, and tax brackets—are processed <strong>100% locally in your web browser</strong> using client-side JavaScript. 
          </p>
          <p>
            We do not transmit, record, store, sell, or inspect any financial figures entered into our calculators. If you choose to share a calculation using the &quot;Share Calculation Link&quot; feature, your parameters are encoded purely as client-side URL query parameters and are never saved to our database.
          </p>
        </section>

        {/* Section 2: Google AdSense & DART Cookie Disclosure */}
        <section className="space-y-3 rounded-2xl border border-spruce-200 bg-spruce-50/50 p-6">
          <h2 className="text-lg font-bold text-spruce-900">
            2. Google AdSense &amp; Third-Party Advertising Disclosures
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed">
            This website partners with Google AdSense and authorized third-party ad networks to display advertisements when you visit our web application. Please review the following mandatory disclosures regarding advertising cookies:
          </p>
          <ul className="list-disc list-inside space-y-2 text-xs text-slate-700">
            <li>
              <strong>Google DART Cookie:</strong> Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to this website or other websites on the internet.
            </li>
            <li>
              Google&apos;s use of advertising cookies enables it and its partners to serve ads to our users based on their visit to CashPulse and/or other sites on the Internet.
            </li>
            <li>
              <strong>Opt-Out Options:</strong> Users may opt out of personalized advertising by visiting Google&apos;s Ads Settings page at{" "}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-spruce-800 font-semibold underline inline-flex items-center gap-1"
              >
                https://adssettings.google.com <ExternalLink className="h-3 w-3" />
              </a>
              . Alternatively, users can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting{" "}
              <a
                href="https://www.aboutads.info/choices/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-spruce-800 font-semibold underline inline-flex items-center gap-1"
              >
                www.aboutads.info <ExternalLink className="h-3 w-3" />
              </a>
              .
            </li>
            <li>
              Third-party ad networks or servers may also use technologies such as cookies, JavaScript, or Web Beacons in their respective advertisements and links that appear on CashPulse, which are sent directly to users&apos; browsers. They automatically receive your IP address when this occurs. CashPulse has no access to or control over these cookies used by third-party advertisers.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">3. Log Files &amp; Web Hosting</h2>
          <p>
            CashPulse follows a standard procedure of utilizing hosting log files provided by our cloud hosting platform (Vercel). The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamps, referring/exit pages, and number of clicks. These are not linked to any personally identifiable information and are strictly used to diagnose system stability, prevent DDoS attacks, and analyze aggregate traffic trends.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">4. California Consumer Privacy Act (CCPA)</h2>
          <p>
            Under the CCPA, California consumers have the right to request that a business disclose the categories and specific pieces of personal data collected, request deletion of collected data, and request that a business not sell their personal data. As CashPulse does not collect or sell personal consumer records, California visitors can freely use our tools with full anonymity.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">5. Contact Information</h2>
          <p>
            If you have questions or require further information regarding our Privacy Policy or data handling practices, please contact us via our{" "}
            <Link href="/contact" className="text-spruce-800 font-semibold underline">
              Contact Page
            </Link>{" "}
            or email us at <code className="font-mono text-xs">privacy@cashpulse.app</code>.
          </p>
        </section>
      </div>
    </div>
  );
}
