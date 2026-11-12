import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Financial & Tax Disclaimer",
  description:
    "TaxEstimator Online financial disclaimer explaining the educational simulation nature of our 2024–2026 tax, fee, and compound wealth calculators.",
  alternates: {
    canonical: "https://taxestimator.online/disclaimer",
  },
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 text-slate-800">
      <div className="border-b border-[#EAEAE3] pb-6">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-amberWarm-50 px-3 py-1 text-xs font-semibold text-amberWarm-700 mb-3">
          <AlertTriangle className="h-3.5 w-3.5" />
          <span>Regulatory Compliance</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Financial &amp; Tax Disclaimer
        </h1>
        <p className="mt-2 text-xs text-slate-500 font-mono">
          Last Updated: November 2026 &bull; Published for User Protection
        </p>
      </div>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-slate-700">
        <div className="rounded-2xl border border-amberWarm-100 bg-amberWarm-50/70 p-6">
          <h2 className="text-base font-bold text-slate-900">
            Important Notice Regarding Professional Advice
          </h2>
          <p className="mt-2 text-xs text-slate-700 leading-relaxed">
            TaxEstimator Online provides mathematical estimation models based on public tax formulas, payment gateway schedules, and compound interest algorithms. TaxEstimator Online is NOT a certified public accountant (CPA), certified financial planner (CFP), enrolled agent (EA), or legal counsel. The information presented on this site does not constitute formal tax, legal, or financial advice.
          </p>
        </div>

        <section className="space-y-3">
          <h3 className="text-base font-bold text-slate-900">1. Tax Estimations (2024–2026 Federal, Schedule SE &amp; State)</h3>
          <p>
            Tax laws are complex and vary depending on individual household circumstances, local municipal ordinances, phase-out limitations, alternative minimum tax (AMT), itemized deductions, and statutory amendments. While TaxEstimator Online integrates official IRS 2024, 2025, and 2026 brackets, standard deductions, Social Security wage base ceilings, and Section 199A QBI limitations, your actual tax liability may differ. Always consult a qualified CPA or licensed tax attorney prior to filing your federal, state, or quarterly Form 1040-ES returns.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-base font-bold text-slate-900">2. Payment Gateway Fees</h3>
          <p>
            Payment processing fees for Stripe, PayPal, Wise, and Square are derived from publicly accessible merchant fee schedules. Payment providers frequently introduce customized volume pricing, regional interchange variations, card brand surcharges, and interchange-plus schedules. Verify your exact merchant fee schedule directly within your payment processor&apos;s admin dashboard.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-base font-bold text-slate-900">3. HYSA Compound Wealth Projections</h3>
          <p>
            Compound interest simulations and inflation discount models are theoretical projections. Variable Annual Percentage Yields (APYs) set by financial institutions fluctuate in response to the Federal Reserve&apos;s Federal Funds rate and are not guaranteed over multi-year horizons. Past performance and current APY rates do not guarantee future yields.
          </p>
        </section>

        <section className="rounded-xl border border-[#EAEAE3] bg-[#FBFBF9] p-5 text-xs text-slate-600">
          <p>
            Want to examine how we verify tax years 2024–2026 against primary IRS publications? Review our{" "}
            <Link href="/about#editorial-standards" className="font-semibold text-emeraldTactile-700 underline underline-offset-2">
              Editorial &amp; Verification Standards
            </Link>{" "}
            or report a potential discrepancy via our{" "}
            <Link href="/contact" className="font-semibold text-emeraldTactile-700 underline underline-offset-2">
              Contact Page
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
