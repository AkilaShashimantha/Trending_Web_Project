import type { Metadata } from "next";
import Link from "next/link";
import { Award, CheckCircle, Code, Cpu, ShieldCheck, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "About CashPulse | Engineering Transparent Solopreneur Finance",
  description:
    "Learn about CashPulse: our mission, mathematical modeling principles, zero dark-patterns design philosophy, and verified sources.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 text-slate-800">
      <div className="border-b border-[#EAEAE3] pb-6">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-spruce-50 px-3 py-1 text-xs font-semibold text-spruce-800 mb-3">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Our Mission &amp; Methodology</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Engineering Clarity for Independent Creators
        </h1>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          CashPulse was founded with a singular conviction: independent contractors, freelancers, and solopreneurs deserve the same financial rigor that Fortune 500 treasury departments take for granted.
        </p>
      </div>

      <div className="mt-8 space-y-10 text-sm leading-relaxed text-slate-700">
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Why We Built CashPulse</h2>
          <p>
            When entering the freelance economy, creative and technical professionals are suddenly thrust into complex taxation rules: Self-Employment Tax (Schedule SE), quarterly 1040-ES vouchers, payment gateway merchant cuts, and inflationary purchasing power decay.
          </p>
          <p>
            Most online calculators are cluttered with intrusive popups, inaccurate oversimplifications, or dark AI themes that look like crypto casinos. CashPulse rejects these tropes. We created an open, transparent, Scandinavian-inspired FinTech environment where numbers are verifiable, calculations happen entirely client-side, and typography respects your focus.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Core Engineering Principles</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-[#EAEAE3] bg-white p-5">
              <Code className="h-5 w-5 text-emeraldTactile mb-2" />
              <h3 className="font-bold text-slate-900">Pure Mathematical Engines</h3>
              <p className="mt-1 text-xs text-slate-600">
                All business logic resides in pure, zero-dependency mathematical modules with zero hallucinations. What the IRS formulas state is what our code outputs.
              </p>
            </div>

            <div className="rounded-xl border border-[#EAEAE3] bg-white p-5">
              <ShieldCheck className="h-5 w-5 text-emeraldTactile mb-2" />
              <h3 className="font-bold text-slate-900">Client-Side Privacy</h3>
              <p className="mt-1 text-xs text-slate-600">
                Your financial numbers never leave your browser. Calculations execute in memory on your device, ensuring zero exposure of your private earnings.
              </p>
            </div>

            <div className="rounded-xl border border-[#EAEAE3] bg-white p-5">
              <Cpu className="h-5 w-5 text-emeraldTactile mb-2" />
              <h3 className="font-bold text-slate-900">Zero AI / Dark Tropes</h3>
              <p className="mt-1 text-xs text-slate-600">
                Clean warm parchment backgrounds, tactile emerald buttons, deep spruce headers, and tabular numerals. Built for professionals, not hype.
              </p>
            </div>

            <div className="rounded-xl border border-[#EAEAE3] bg-white p-5">
              <Award className="h-5 w-5 text-emeraldTactile mb-2" />
              <h3 className="font-bold text-slate-900">Source Transparency</h3>
              <p className="mt-1 text-xs text-slate-600">
                Every calculation engine cites official IRS publications, statutory tax code provisions (e.g. TCJA Section 199A), and published merchant fee schedules.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Authoritative Sources &amp; Citations</h2>
          <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-600">
            <li>IRS Publication 334 (Tax Guide for Small Business)</li>
            <li>IRS Schedule C (Form 1040) Profit or Loss From Business</li>
            <li>IRS Schedule SE (Form 1040) Self-Employment Tax</li>
            <li>IRS Form 1040-ES (Estimated Tax for Individuals)</li>
            <li>Stripe Official Pricing &amp; Fee Schedule (Standard &amp; International)</li>
            <li>PayPal Merchant Fee Schedule (Standard Checkout &amp; Invoicing)</li>
            <li>Bureau of Labor Statistics (BLS) Consumer Price Index (CPI)</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
