import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy & Google AdSense DART Cookie Notice",
  description:
    "TaxEstimator Online Privacy Policy detailing data protection practices, zero server-side storage of calculator financial inputs, contact inquiry handling, and mandatory Google AdSense DART cookie disclosures.",
  alternates: {
    canonical: "https://taxestimator.online/privacy",
  },
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
          Last Updated: November 2026 &bull; Compliant with Google AdSense, GDPR &amp; CCPA
        </p>
      </div>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-slate-700">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">1. Core Privacy Principle: Zero Financial Data Stored</h2>
          <p>
            At TaxEstimator Online (accessible at{" "}
            <Link href="https://taxestimator.online" className="text-spruce-800 font-semibold underline">
              https://taxestimator.online
            </Link>
            ), the privacy of our visitors is of paramount importance. All financial calculations—including gross 1099 revenue, W-2 wages, deductions, invoice amounts, savings balances, and tax brackets—are processed{" "}
            <strong>100% locally in your web browser</strong> using client-side JavaScript.
          </p>
          <p>
            We do not transmit, record, store, sell, or inspect any financial figures entered into our calculators. Optional preference conveniences—such as your saved local scenario in browser <code className="font-mono text-xs">localStorage</code> or a non-personally-identifying state selector cookie (<code className="font-mono text-xs">SameSite=Lax; Secure</code>)—remain strictly under your browser&apos;s control. If you choose to share a calculation via URL query parameters, those numbers are encoded purely client-side and are never saved to a server database.
          </p>
          <p>
            When you voluntarily submit a question or correction via our{" "}
            <Link href="/contact" className="text-spruce-800 font-semibold underline">
              Contact Form
            </Link>
            , only the name, email address, topic, and message you provide are transmitted for the sole purpose of reviewing and responding to your inquiry. We never sell or share contact submissions with third-party marketers.
          </p>
        </section>

        {/* Section 2: Google AdSense & DART Cookie Disclosure */}
        <section className="space-y-3 rounded-2xl border border-spruce-200 bg-spruce-50/50 p-6">
          <h2 className="text-lg font-bold text-spruce-900">
            2. Google AdSense &amp; Third-Party Advertising Disclosures
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed">
            This website works with Google AdSense and authorized third-party advertising partners to display advertisements when enabled. Please review the following mandatory disclosures regarding advertising cookies:
          </p>
          <ul className="list-disc list-inside space-y-2 text-xs text-slate-700">
            <li>
              <strong>Google DART Cookie:</strong> Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to this website or other websites on the internet.
            </li>
            <li>
              Google&apos;s use of advertising cookies enables it and its partners to serve ads to our users based on their visit to TaxEstimator Online and/or other sites on the Internet.
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
              Third-party ad networks or servers may also use technologies such as cookies, JavaScript, or Web Beacons in advertisements and links that appear on TaxEstimator Online, which are sent directly to users&apos; browsers and automatically receive your IP address when this occurs. TaxEstimator Online has no access to or control over these cookies used by third-party advertisers.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">3. Log Files &amp; Web Hosting</h2>
          <p>
            TaxEstimator Online follows standard operational security practices by utilizing hosting access logs provided by our cloud infrastructure provider (Vercel). Information collected by infrastructure logs may include IP addresses, browser type, Internet Service Provider (ISP), timestamps, referring/exit pages, and aggregate request metrics. These logs are not linked to calculator inputs and are used strictly to ensure uptime, prevent abuse, and diagnose technical errors.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">4. California Consumer Privacy Act (CCPA) &amp; GDPR Rights</h2>
          <p>
            Under the CCPA and GDPR, visitors have the right to request disclosure of personal data collected, request deletion of personal data, and opt out of the sale of personal data. TaxEstimator Online does not sell personal information and does not store calculator financial inputs on any server. If you submitted a direct support inquiry and wish to request deletion or access, please email{" "}
            <a href="mailto:privacy@taxestimator.online" className="text-spruce-800 font-semibold underline">
              privacy@taxestimator.online
            </a>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">5. Contact Information</h2>
          <p>
            If you have questions or require further information regarding our Privacy Policy or data handling practices, please reach out via our{" "}
            <Link href="/contact" className="text-spruce-800 font-semibold underline">
              Contact Page
            </Link>{" "}
            or email us at{" "}
            <a href="mailto:privacy@taxestimator.online" className="font-mono text-xs text-spruce-800 underline">
              privacy@taxestimator.online
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
