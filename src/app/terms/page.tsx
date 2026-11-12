import type { Metadata } from "next";
import Link from "next/link";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions governing the use of TaxEstimator Online and its financial simulation tools.",
  alternates: {
    canonical: "https://taxestimator.online/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 text-slate-800">
      <div className="border-b border-[#EAEAE3] pb-6">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-spruce-50 px-3 py-1 text-xs font-semibold text-spruce-800 mb-3">
          <Shield className="h-3.5 w-3.5" />
          <span>User Agreement</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-2 text-xs text-slate-500 font-mono">
          Effective: November 2026 &bull; Last Updated: November 2026
        </p>
      </div>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-slate-700">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the TaxEstimator Online website and tools (
            <Link href="https://taxestimator.online" className="text-spruce-800 font-semibold underline">
              https://taxestimator.online
            </Link>
            ), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you must discontinue use of our site immediately.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">2. Educational Simulation Only</h2>
          <p>
            All financial calculation tools, tax estimators, models, editorial reports, and tables provided on TaxEstimator Online are offered strictly for educational and illustrative purposes. TaxEstimator Online is not a certified public accounting (CPA) firm, registered investment advisor, broker-dealer, or legal consultancy. Your use of these tools does not establish a fiduciary or professional client relationship. Please also review our{" "}
            <Link href="/disclaimer" className="text-spruce-800 font-semibold underline">
              Financial &amp; Tax Disclaimer
            </Link>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">3. Intellectual Property</h2>
          <p>
            The software, calculation engines, user interface designs, editorial content, and research tables published on TaxEstimator Online are protected by intellectual property laws. You may use our tools for personal and business financial modeling, but automated scraping, bulk redistribution, or commercial republication of the platform without prior written consent is prohibited.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">4. Limitation of Liability</h2>
          <p>
            In no event shall TaxEstimator Online, its contributors, or affiliates be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our tools, including tax underpayment penalties, processor dispute fees, or investment losses. You remain solely responsible for verifying tax filings and business decisions with qualified licensed professionals.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">5. Contact &amp; Governing Inquiries</h2>
          <p>
            Questions regarding these Terms of Service or our{" "}
            <Link href="/privacy" className="text-spruce-800 font-semibold underline">
              Privacy Policy
            </Link>{" "}
            may be submitted through our{" "}
            <Link href="/contact" className="text-spruce-800 font-semibold underline">
              Contact Page
            </Link>{" "}
            or by emailing{" "}
            <a href="mailto:support@taxestimator.online" className="font-mono text-xs text-spruce-800 underline">
              support@taxestimator.online
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
