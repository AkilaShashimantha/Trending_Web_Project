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
  title: "1099 Freelance Tax Estimator (2024–2026 IRS Code)",
  description:
    "Free 1099 self-employment tax calculator updated for 2026 IRS Rev. Proc. 2025-32 and OBBBA rules. Computes 15.3% SECA tax (Schedule SE), Federal income tax brackets, Section 199A QBI deduction, and quarterly 1040-ES payment schedule.",
  keywords: [
    "1099 tax calculator",
    "2026 freelance tax estimator",
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
        name: "How is Self-Employment (1099) tax calculated in 2024, 2025, and 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Self-employment tax is calculated under IRS Schedule SE at 15.3% on 92.35% of your net business profit. This consists of 12.4% for Social Security (capped at $168,600 in 2024, $176,100 in 2025, and $184,500 in 2026) and 2.9% for Medicare (uncapped). An additional 0.9% Medicare surtax applies on earned income over $200,000 for single filers or $250,000 for married couples filing jointly.",
        },
      },
      {
        "@type": "Question",
        name: "What is the Section 199A Qualified Business Income (QBI) deduction?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Made permanent by the One Big Beautiful Bill Act (OBBBA), Section 199A allows eligible sole proprietors, freelancers, LLC members, and S-corporation shareholders to deduct up to 20% of their qualified business net income from federal taxable income. For 2026 (Rev. Proc. 2025-32), full eligibility applies up to $201,750 (Single) or $403,500 (MFJ), with widened phase-out ranges up to $276,750 and $553,500.",
        },
      },
      {
        "@type": "Question",
        name: "When are IRS quarterly estimated tax payments due?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Estimated tax payments under IRS Form 1040-ES are due four times a year: for tax year 2026, Q1 is due April 15, 2026, Q2 on June 15, 2026, Q3 on September 15, 2026, and Q4 on January 15, 2027 (shifting to the next business day if a date falls on a weekend or legal holiday).",
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
          Estimate your complete federal, state, and self-employment tax burden with IRS 2024–2026 progressive brackets (including Rev. Proc. 2025-32 and OBBBA updates), the 20% Section 199A Qualified Business Income deduction, and quarterly estimated payment vouchers.
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
              Authored by the TaxEstimator Online Editorial Board &bull; Reviewed against IRS Rev. Proc. 2025-32, Publication 334 &amp; Form 1040-ES Guidelines
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
              For tax year 2024, the Social Security wage base limit is <strong>$168,600</strong>, rising to <strong>$176,100</strong> for 2025, and <strong>$184,500</strong> for tax year 2026 per the Social Security Administration (capping the 12.4% Social Security portion at $22,878 for 1099 earners). Any net earnings above this ceiling are entirely exempt from the 12.4% Social Security portion, though they remain subject to the 2.9% Medicare tax.
            </p>
          </section>

          {/* Section 2: Section 199A QBI Deduction & 2024-2026 Thresholds */}
          <section className="space-y-4 text-sm leading-relaxed text-slate-700">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-spruce-800 text-xs text-white font-mono">
                2
              </span>
              Section 199A QBI Deduction, 2026 Standard Deductions &amp; Federal Brackets
            </h3>
            <p>
              Originally enacted under the Tax Cuts and Jobs Act and made permanent under the One Big Beautiful Bill Act (OBBBA), the Section 199A deduction allows qualifying solopreneurs to deduct up to <strong>20% of their net qualified business income</strong> directly from federal taxable income.
            </p>
            <p>
              Unlike itemized deductions (like mortgage interest or state taxes), the QBI deduction is taken in addition to your standard deduction. For tax year 2026 (IRS Rev. Proc. 2025-32), the basic standard deduction rises to <strong>$16,100</strong> for Single and Married Filing Separately filers, <strong>$32,200</strong> for Married Filing Jointly, and <strong>$24,150</strong> for Head of Household. Full QBI eligibility extends up to <strong>$201,750</strong> for Single/Head of Household ($201,775 MFS) and <strong>$403,500</strong> for Married Filing Jointly, with widened phase-out spans of $75,000 and $150,000 respectively (up from $197,300/$394,600 in 2025 and $191,950/$383,900 in 2024).
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-[#EAEAE3]">
                <thead className="bg-[#F4F4F0] text-slate-700 font-semibold font-mono">
                  <tr>
                    <th className="p-3 border-b">IRS Parameter</th>
                    <th className="p-3 border-b">2024</th>
                    <th className="p-3 border-b">2025</th>
                    <th className="p-3 border-b">2026 (Rev. Proc. 2025-32)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAEAE3] font-mono">
                  <tr>
                    <td className="p-3 font-sans font-semibold text-slate-900">Standard Deduction (Single / MFS)</td>
                    <td className="p-3">$14,600</td>
                    <td className="p-3">$15,000</td>
                    <td className="p-3 font-bold text-spruce-800">$16,100</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-sans font-semibold text-slate-900">Standard Deduction (Married Joint)</td>
                    <td className="p-3">$29,200</td>
                    <td className="p-3">$30,000</td>
                    <td className="p-3 font-bold text-spruce-800">$32,200</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-sans font-semibold text-slate-900">Standard Deduction (Head of Household)</td>
                    <td className="p-3">$21,900</td>
                    <td className="p-3">$22,500</td>
                    <td className="p-3 font-bold text-spruce-800">$24,150</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-sans font-semibold text-slate-900">Social Security Wage Base</td>
                    <td className="p-3">$168,600</td>
                    <td className="p-3">$176,100</td>
                    <td className="p-3 font-bold text-spruce-800">$184,500</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-sans font-semibold text-slate-900">QBI Threshold (Single / MFJ)</td>
                    <td className="p-3">$191,950 / $383,900</td>
                    <td className="p-3">$197,300 / $394,600</td>
                    <td className="p-3 font-bold text-spruce-800">$201,750 / $403,500</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-sans font-semibold text-slate-900">22% Single Bracket Range</td>
                    <td className="p-3">$47,150–$100,525</td>
                    <td className="p-3">$48,475–$103,350</td>
                    <td className="p-3 font-bold text-spruce-800">$50,400–$105,700</td>
                  </tr>
                </tbody>
              </table>
            </div>
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
                  <strong className="text-slate-900">SEP IRA &amp; Solo 401(k):</strong> Contribute up to 25% of net adjusted self-employment earnings (up to $69,000 for 2024, $70,000 for 2025, and $72,000 for 2026 under IRS Notice 2025-67) completely pre-tax.
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
