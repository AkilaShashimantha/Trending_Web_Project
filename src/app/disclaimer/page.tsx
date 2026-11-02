import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Financial & Tax Disclaimer",
  description:
    "CashPulse financial disclaimer explaining the educational simulation nature of our calculators.",
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 text-slate-800">
      <div className="border-b border-[#EAEAE3] pb-6">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-amberWarm-50 px-3 py-1 text-xs font-semibold text-amberWarm-800 mb-3">
          <AlertTriangle className="h-3.5 w-3.5" />
          <span>Regulatory Compliance</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Financial &amp; Tax Disclaimer
        </h1>
        <p className="mt-2 text-xs text-slate-500 font-mono">Published for User Protection</p>
      </div>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-slate-700">
        <div className="rounded-2xl border border-amberWarm-200 bg-amberWarm-50/50 p-6">
          <h2 className="text-base font-bold text-amberWarm-900">
            Important Notice Regarding Professional Advice
          </h2>
          <p className="mt-2 text-xs text-amberWarm-800 leading-relaxed">
            CashPulse provides mathematical estimation models based on public tax formulas, payment gateway schedules, and compound interest algorithms. CashPulse is NOT a certified public accountant (CPA), certified financial planner (CFP), enrolled agent (EA), or legal counsel. The information presented on this site does not constitute formal tax, legal, or financial advice.
          </p>
        </div>

        <section className="space-y-3">
          <h3 className="text-base font-bold text-slate-900">1. Tax Estimations (1099 &amp; Schedule SE)</h3>
          <p>
            Tax laws are complex and vary depending on individual personal circumstances, local municipal ordinances, phase-out limitations, alternative minimum tax (AMT), and changing statutory codes. While CashPulse integrates official IRS 2024 and 2025 brackets, standard deductions, and Section 199A QBI limitations, your actual tax liability may differ. Always consult a qualified CPA or licensed tax attorney prior to filing your federal or state returns.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-base font-bold text-slate-900">2. Payment Gateway Fees</h3>
          <p>
            Payment processing fees for Stripe, PayPal, Wise, and Square are derived from publicly accessible merchant fee tables. Payment providers frequently introduce customized volume pricing, regional interchange variations, card brand surcharges, and interchange-plus schedules. Verify your exact merchant fee schedule directly within your payment processor&apos;s admin dashboard.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-base font-bold text-slate-900">3. HYSA Compound Wealth Projections</h3>
          <p>
            Compound interest simulations and inflation discount models are theoretical projections. Variable Annual Percentage Yields (APYs) set by financial institutions fluctuate in response to the Federal Reserve&apos;s Federal Funds rate and are not guaranteed over multi-year horizons. Past performance and current APY rates do not guarantee future yields.
          </p>
        </section>
      </div>
    </div>
  );
}
