import type { Metadata } from "next";
import Link from "next/link";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions governing the use of the CashPulse FinTech Suite.",
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
        <p className="mt-2 text-xs text-slate-500 font-mono">Effective: January 1, 2025</p>
      </div>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-slate-700">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the CashPulse website and tools (cashpulse.vercel.app), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you must discontinue use of our site immediately.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">2. Educational Simulation Only</h2>
          <p>
            All financial calculation tools, estimators, models, and tables provided on CashPulse are offered strictly for educational and illustrative purposes. CashPulse is not a certified public accounting (CPA) firm, registered investment advisor, broker-dealer, or legal consultancy. Your use of these tools does not establish a fiduciary or professional client relationship.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">3. Intellectual Property</h2>
          <p>
            The software, algorithms, user interface designs, color palettes, and educational content on CashPulse are protected by intellectual property laws. You may use our tools for personal and business evaluation, but reproduction, reverse-engineering, or scraping of the platform without prior written consent is strictly prohibited.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">4. Limitation of Liability</h2>
          <p>
            In no event shall CashPulse, its contributors, or affiliates be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our tools, including tax underpayment penalties, processor dispute fees, or investment losses.
          </p>
        </section>
      </div>
    </div>
  );
}
