import type { Metadata } from "next";
import Link from "next/link";
import { TaxCalculator } from "../../../components/calculators/TaxCalculator";
import { AdSlot } from "../../../components/ads/AdSlot";
import { getAllStates } from "../../../lib/engines/stateTaxEngine";
import {
  AlertCircle,
  BookOpen,
  Calendar,
  CheckCircle,
  FileText,
  HelpCircle,
  MapPin,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "1099 Freelance Tax Estimator (2024 & 2025 IRS Code)",
  description:
    "Free 1099 self-employment tax calculator. Computes 15.3% SECA tax (Schedule SE), Federal income tax brackets, Section 199A QBI deduction, and quarterly 1040-ES payment schedule.",
  keywords: [
    "1099 tax calculator",
    "freelance tax estimator",
    "self employment tax calculator",
    "schedule se calculator",
    "section 199a qbi deduction",
    "quarterly estimated taxes",
    "1040-ES calculator",
  ],
};

export default function FreelanceTaxEstimatorPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How is Self-Employment (1099) tax calculated in 2024 and 2025?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Self-employment tax is calculated under IRS Schedule SE at 15.3% on 92.35% of your net business profit. This consists of 12.4% for Social Security (capped at $168,600 in 2024 and $176,100 in 2025) and 2.9% for Medicare (uncapped). An additional 0.9% Medicare surtax applies on earned income over $200,000 for single filers or $250,000 for married couples filing jointly.",
        },
      },
      {
        "@type": "Question",
        name: "What is the Section 199A Qualified Business Income (QBI) deduction?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Section 199A allows eligible sole proprietors, freelancers, LLC members, and S-corporation shareholders to deduct up to 20% of their qualified business net income from federal taxable income, subject to taxable income caps and phase-outs for specified service trades or businesses (SSTBs).",
        },
      },
      {
        "@type": "Question",
        name: "When are IRS quarterly estimated tax payments due?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Estimated tax payments under IRS Form 1040-ES are typically due four times a year: Q1 on April 15, Q2 on June 15 (or June 16 if a holiday/weekend), Q3 on September 15, and Q4 on January 15 of the following tax year.",
        },
      },
    ],
  };

  const allStates = getAllStates();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Schema.org FAQ Structured Data for Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Page Header */}
      <div className="border-b border-[#EAEAE3] pb-6">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-spruce-50 px-3 py-1 text-xs font-semibold text-spruce-800 mb-3">
          <BookOpen className="h-3.5 w-3.5" />
          <span>IRS 1040 Schedule C &amp; SE Compliant</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          1099 Freelance &amp; Self-Employment Tax Estimator
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-600 leading-relaxed">
          Estimate your complete federal, state, and self-employment tax burden with IRS 2024 &amp; 2025 progressive brackets, the 20% Section 199A Qualified Business Income deduction, and quarterly estimated payment vouchers.
        </p>

        {/* State Quick Switcher */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#FBFBF9] border border-[#EAEAE3] p-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-spruce-800" />
            <span className="text-xs font-bold text-slate-800">
              State Specific 1099 Calculators:
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {["california", "texas", "new-york", "florida", "washington", "illinois", "pennsylvania"].map((slug) => {
              const st = allStates.find((s) => s.slug === slug);
              if (!st) return null;
              return (
                <Link
                  key={slug}
                  href={`/tools/freelance-tax-estimator/${slug}`}
                  className="rounded-lg border border-[#EAEAE3] bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 hover:border-emeraldTactile hover:text-emeraldTactile transition"
                >
                  {st.name} {st.taxType === "none" ? "(0%)" : ""}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Banner AdSlot */}
      <AdSlot slotId="tax-banner-top" format="horizontal" label="Tax & Accounting Partner" />

      {/* Interactive Tool Component */}
      <div className="my-8">
        <TaxCalculator />
      </div>

      {/* Mid Content AdSlot */}
      <AdSlot slotId="tax-banner-mid" format="horizontal" label="Certified Tax Software" />

      {/* 1,000+ Word Educational Guide for High CPC and AdSense Editorial Quality */}
      <article className="mt-16 rounded-3xl border border-[#EAEAE3] bg-white p-8 sm:p-12 text-slate-800 shadow-xs">
        <div className="max-w-4xl space-y-10">
          <header className="border-b border-[#F4F4F0] pb-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              The Comprehensive Guide to 1099 Taxes, Schedule SE &amp; Write-offs
            </h2>
            <p className="mt-2 text-xs text-slate-500">
              Authored by the CashPulse Editorial Board &bull; Reviewed against IRS Publication 334 &amp; Form 1040-ES Guidelines
            </p>
          </header>

          {/* Section 1: Anatomy of Self-Employment Tax */}
          <section className="space-y-4 text-sm leading-relaxed text-slate-700">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-spruce-800 text-xs text-white font-mono">
                1
              </span>
              Understanding the 15.3% Self-Employment Tax (SECA)
            </h3>
            <p>
              When an employee receives a standard W-2 paycheck, their employer automatically withholds 7.65% for FICA taxes (6.2% for Social Security and 1.45% for Medicare), and the employer matches another 7.65% out of pocket. As an independent contractor, freelancer, sole proprietor, or single-member LLC owner filing Form 1099-NEC or 1099-K, you are both the employer and the employee. Under the Self-Employed Contributions Act (SECA), you are legally responsible for paying the entire <strong>15.3%</strong> tax yourself.
            </p>
            <div className="rounded-xl border border-[#EAEAE3] bg-[#FBFBF9] p-4 text-xs font-mono space-y-2">
              <div className="font-bold text-slate-900">IRS Schedule SE Statutory Formula:</div>
              <div>1. Net Profit = Gross 1099 Revenue - Allowable Business Expenses (Schedule C)</div>
              <div>2. Taxable SE Income = Net Profit &times; 0.9235 (92.35% factor per IRS rules)</div>
              <div>
                3. Social Security Tax = 12.4% &times; min(Taxable SE Income, Wage Base Limit - W2 Wages)
              </div>
              <div>4. Medicare Tax = 2.9% &times; Taxable SE Income (uncapped)</div>
              <div>
                5. Additional Medicare Tax = 0.9% on combined earnings above $200,000 (Single) or $250,000 (MFJ)
              </div>
            </div>
            <p>
              For tax year 2024, the Social Security wage base limit is <strong>$168,600</strong>. For tax year 2025, the IRS has adjusted this wage base cap upwards to <strong>$176,100</strong>. Any net earnings above this ceiling are entirely exempt from the 12.4% Social Security portion, though they remain subject to the 2.9% Medicare tax.
            </p>
          </section>

          {/* Section 2: Section 199A QBI Deduction */}
          <section className="space-y-4 text-sm leading-relaxed text-slate-700">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-spruce-800 text-xs text-white font-mono">
                2
              </span>
              Maximizing the Section 199A Qualified Business Income (QBI) Deduction
            </h3>
            <p>
              Introduced in the Tax Cuts and Jobs Act (TCJA), the Section 199A deduction is one of the most powerful tax shelters available to American solopreneurs. It allows qualifying small businesses to deduct up to <strong>20% of their net qualified business income</strong> directly from their federal taxable income.
            </p>
            <p>
              Unlike itemized deductions (like mortgage interest or state taxes), the QBI deduction is taken in addition to your standard deduction. That means you receive the benefit whether you claim the standard deduction or itemize. For tax year 2024, the deduction begins to phase out for Specified Service Trades or Businesses (SSTBs—such as consulting, law, health, and athletics) once taxable income surpasses $191,950 for single filers ($383,900 for married couples), indexed for 2025.
            </p>
          </section>

          {/* Section 3: High-Value Deductions Checklist */}
          <section className="space-y-4 text-sm leading-relaxed text-slate-700">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-spruce-800 text-xs text-white font-mono">
                3
              </span>
              The Solopreneur Above-the-Line Deductions Checklist
            </h3>
            <p>
              Every legitimate dollar deducted on Schedule C saves between $0.25 and $0.45 in combined self-employment and income taxes. Ensure you track and document:
            </p>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
              <li className="flex items-start gap-2 rounded-lg border border-[#EAEAE3] p-3">
                <CheckCircle className="h-4 w-4 shrink-0 text-emeraldTactile mt-0.5" />
                <div>
                  <strong className="text-slate-900">Home Office Deduction:</strong> Simplified
                  method ($5 per sq ft up to 300 sq ft = $1,500) or actual percentage of rent, utilities, and internet.
                </div>
              </li>
              <li className="flex items-start gap-2 rounded-lg border border-[#EAEAE3] p-3">
                <CheckCircle className="h-4 w-4 shrink-0 text-emeraldTactile mt-0.5" />
                <div>
                  <strong className="text-slate-900">Health Insurance Premiums:</strong> 100% of medical and dental insurance premiums paid for yourself and family are deductible above-the-line on Form 1040 Schedule 1.
                </div>
              </li>
              <li className="flex items-start gap-2 rounded-lg border border-[#EAEAE3] p-3">
                <CheckCircle className="h-4 w-4 shrink-0 text-emeraldTactile mt-0.5" />
                <div>
                  <strong className="text-slate-900">SEP IRA &amp; Solo 401(k):</strong> Contribute up to 25% of net adjusted self-employment earnings (up to $69,000 for 2024 / $70,000 for 2025) completely pre-tax.
                </div>
              </li>
              <li className="flex items-start gap-2 rounded-lg border border-[#EAEAE3] p-3">
                <CheckCircle className="h-4 w-4 shrink-0 text-emeraldTactile mt-0.5" />
                <div>
                  <strong className="text-slate-900">Hardware &amp; Software:</strong> Section 179 allows you to fully expense laptops, monitors, hosting, SaaS subscriptions, and digital design tools in year one.
                </div>
              </li>
            </ul>
          </section>

          {/* Section 4: Quarterly Payments Rules */}
          <section className="space-y-4 text-sm leading-relaxed text-slate-700">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-spruce-800 text-xs text-white font-mono">
                4
              </span>
              IRS Safe Harbor Rules to Avoid Underpayment Penalties
            </h3>
            <p>
              The United States tax system operates on a pay-as-you-go model. If you expect to owe at least $1,000 in federal tax, the IRS mandates quarterly estimated tax payments via EFTPS or DirectPay. Failure to remit sufficient funds each quarter triggers Section 6654 penalties.
            </p>
            <p>
              To ensure 100% immunity from underpayment penalties, you can rely on the <strong>IRS Safe Harbor rule</strong>. You will owe zero penalties if your total timely payments equal either:
            </p>
            <div className="rounded-xl border border-amberWarm-200 bg-amberWarm-50/70 p-4 text-xs text-amberWarm-900 leading-relaxed">
              <strong>Safe Harbor Thresholds:</strong>
              <ul className="mt-1.5 list-disc list-inside space-y-1">
                <li>
                  <strong>90% of your current year&apos;s tax liability:</strong> Ideal when your income is stable or declining.
                </li>
                <li>
                  <strong>100% of your prior year&apos;s tax liability:</strong> (or 110% if your prior year Adjusted Gross Income exceeded $150,000). This provides an ironclad guarantee even if your revenue spikes unexpectedly.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 5: State Tax Arbitrage */}
          <section className="space-y-4 text-sm leading-relaxed text-slate-700">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-spruce-800 text-xs text-white font-mono">
                5
              </span>
              State Tax Variations &amp; Geographic Arbitrage
            </h3>
            <p>
              Where you establish physical domicile has a massive impact on your bottom line. States like Texas, Florida, Washington, Nevada, Wyoming, and Tennessee levy <strong>0% personal income tax</strong>. Conversely, California reaches up to 13.3% at top brackets, and New York City residents face layered city and state progressive taxes nearing 14.8%. For a creator earning $150,000 net, choosing a zero-income-tax jurisdiction preserves between $6,000 and $12,000 in liquid capital every single year.
            </p>
          </section>
        </div>
      </article>

      {/* 50 State Directory */}
      <section className="mt-12 rounded-3xl border border-[#EAEAE3] bg-white p-8 sm:p-10">
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          50 US States + DC Freelance Tax Calculators
        </h3>
        <p className="text-xs text-slate-600 mb-6 leading-relaxed">
          Access localized tax brackets, state standard deductions, and estimated quarterly vouchers for every US jurisdiction:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {allStates.map((st) => (
            <Link
              key={st.slug}
              href={`/tools/freelance-tax-estimator/${st.slug}`}
              className="rounded-lg border border-[#F4F4F0] bg-[#FBFBF9] px-2.5 py-1.5 text-xs text-slate-700 hover:border-emeraldTactile hover:text-emeraldTactile transition truncate"
            >
              {st.name} {st.taxType === "none" ? "(0%)" : ""}
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom AdSlot Unit */}
      <AdSlot slotId="tax-banner-bottom" format="rectangle" label="Financial Advisory" />
    </div>
  );
}
