import type { Metadata } from "next";
import Link from "next/link";
import {
  Award,
  BookOpen,
  CheckCircle2,
  Code,
  Cpu,
  ExternalLink,
  FileText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About TaxEstimator Online | Methodology & Editorial Standards",
  description:
    "Learn about TaxEstimator Online: our mission, mathematical modeling principles, editorial and verification standards, author review workflow, and primary-source IRS, Federal Reserve, and state tax citations.",
  alternates: {
    canonical: "https://taxestimator.online/about",
  },
};

const authoritativeSources = [
  {
    name: "IRS Revenue Procedures & Annual Inflation Adjustments",
    detail: "Rev. Proc. 2024-40 (TY 2025) & Rev. Proc. 2025-32 / OBBBA Updates (TY 2026)",
    url: "https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2025",
    agency: "Internal Revenue Service (irs.gov)",
  },
  {
    name: "IRS Self-Employed Individuals Tax Center",
    detail: "Federal self-employment tax, Schedule C, and quarterly filing guidance",
    url: "https://www.irs.gov/businesses/small-businesses-self-employed/self-employed-individuals-tax-center",
    agency: "Internal Revenue Service (irs.gov)",
  },
  {
    name: "IRS Publication 334 — Tax Guide for Small Business",
    detail: "Schedule C net profit rules, deductible expenses, and sole proprietor reporting",
    url: "https://www.irs.gov/publications/p334",
    agency: "Internal Revenue Service (irs.gov)",
  },
  {
    name: "IRS Schedule SE (Form 1040) — Self-Employment Tax",
    detail: "92.35% net-earnings factor, 15.3% OASDI + Medicare split, and 50% SE deduction",
    url: "https://www.irs.gov/forms-pubs/about-schedule-se-form-1040",
    agency: "Internal Revenue Service (irs.gov)",
  },
  {
    name: "IRS Form 1040-ES — Estimated Tax for Individuals",
    detail: "Quarterly estimated tax safe-harbor rules and statutory payment deadlines",
    url: "https://www.irs.gov/forms-pubs/about-form-1040-es",
    agency: "Internal Revenue Service (irs.gov)",
  },
  {
    name: "Social Security Administration — Contribution & Benefit Base",
    detail: "Annual OASDI taxable wage base ceilings across 2024, 2025, and 2026",
    url: "https://www.ssa.gov/oact/cola/cbb.html",
    agency: "Social Security Administration (ssa.gov)",
  },
  {
    name: "Federal Reserve FOMC Policy Statements & Calendars",
    detail: "Federal Funds target range decisions affecting HYSA, T-Bill, and money market yields",
    url: "https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm",
    agency: "Board of Governors of the Federal Reserve System",
  },
  {
    name: "Bureau of Labor Statistics — Consumer Price Index (CPI-U)",
    detail: "Official inflation benchmarks used in real purchasing-power modeling",
    url: "https://www.bls.gov/cpi/",
    agency: "U.S. Bureau of Labor Statistics (bls.gov)",
  },
  {
    name: "State Tax Agencies & Revenue Departments Directory",
    detail: "State income tax rate tables, LLC franchise fees, and local municipal surcharges",
    url: "https://www.taxadmin.org/state-tax-agencies",
    agency: "Federation of Tax Administrators (taxadmin.org)",
  },
  {
    name: "Stripe Official Pricing & Merchant Fee Schedule",
    detail: "Standard domestic card processing (2.9% + $0.30) and international surcharges",
    url: "https://stripe.com/pricing",
    agency: "Stripe, Inc. (stripe.com)",
  },
  {
    name: "PayPal Merchant & Commercial Transaction Fees",
    detail: "Standard checkout, invoicing, and cross-border commercial processing rates",
    url: "https://www.paypal.com/us/webapps/mpp/merchant-fees",
    agency: "PayPal Holdings, Inc. (paypal.com)",
  },
];

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
          TaxEstimator Online was founded with a singular conviction: independent contractors, freelancers, and solopreneurs deserve the same financial rigor that corporate treasury departments rely on—without paywalls, tracking cookies on your income, or misleading guesswork.
        </p>
      </div>

      <div className="mt-8 space-y-12 text-sm leading-relaxed text-slate-700">
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Why We Built TaxEstimator Online</h2>
          <p>
            When entering the freelance economy, creative and technical professionals are suddenly thrust into complex taxation rules: Self-Employment Tax (Schedule SE), quarterly Form 1040-ES vouchers, Qualified Business Income (Section 199A) thresholds, payment gateway merchant cuts, and inflationary purchasing-power decay.
          </p>
          <p>
            Too many online calculators are cluttered with intrusive popups, outdated tax brackets, or black-box estimates you cannot audit. TaxEstimator Online replaces guesswork with a transparent, tabular-precision workspace where every formula is grounded in statutory publications and every calculation runs locally inside your browser.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Core Engineering Principles</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-[#EAEAE3] bg-white p-5">
              <Code className="h-5 w-5 text-emeraldTactile mb-2" />
              <h3 className="font-bold text-slate-900">Pure Mathematical Engines</h3>
              <p className="mt-1 text-xs text-slate-600">
                All tax, fee, and compound yield logic resides in deterministic TypeScript modules verified by automated unit tests against official statutory formulas.
              </p>
            </div>

            <div className="rounded-xl border border-[#EAEAE3] bg-white p-5">
              <ShieldCheck className="h-5 w-5 text-emeraldTactile mb-2" />
              <h3 className="font-bold text-slate-900">Client-Side Privacy</h3>
              <p className="mt-1 text-xs text-slate-600">
                Your income, deductions, and savings figures never leave your device. Calculations execute in browser memory with zero server-side financial logging.
              </p>
            </div>

            <div className="rounded-xl border border-[#EAEAE3] bg-white p-5">
              <Cpu className="h-5 w-5 text-emeraldTactile mb-2" />
              <h3 className="font-bold text-slate-900">Zero Dark UX Tropes</h3>
              <p className="mt-1 text-xs text-slate-600">
                Warm parchment surfaces, high-contrast spruce headers, and tabular numerals built for serious financial review rather than hype.
              </p>
            </div>

            <div className="rounded-xl border border-[#EAEAE3] bg-white p-5">
              <Award className="h-5 w-5 text-emeraldTactile mb-2" />
              <h3 className="font-bold text-slate-900">Primary-Source Transparency</h3>
              <p className="mt-1 text-xs text-slate-600">
                Every calculator model and editorial report cites primary IRS Revenue Procedures, SSA wage caps, Federal Reserve bulletins, and state tax codes.
              </p>
            </div>
          </div>
        </section>

        {/* Editorial & Verification Standards */}
        <section
          id="editorial-standards"
          className="scroll-mt-24 space-y-5 rounded-2xl border border-[#EAEAE3] bg-white p-6 sm:p-8 shadow-xs"
        >
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emeraldTactile-700">
            <FileText className="h-4 w-4" />
            <span>Editorial Charter &amp; Accuracy Policy</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Editorial &amp; Verification Standards
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Every guide, state tax breakdown, and quantitative engine published on{" "}
            <span className="font-semibold text-slate-800">TaxEstimator Online</span> follows a strict, non-commercial editorial standard designed to prioritize accuracy, independence, and reproducibility.
          </p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 pt-2">
            <div className="rounded-xl border border-[#EAEAE3] bg-[#FBFBF9] p-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-spruce-800">
                1. IRS &amp; Statutory Audits
              </h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Federal brackets, standard deductions, Section 199A QBI phase-outs, and Schedule SE mechanics are verified directly against annual{" "}
                <strong className="text-slate-800">IRS Revenue Procedures</strong>, IRS Forms &amp; Instructions, and SSA wage-base notices before entering production code.
              </p>
            </div>

            <div className="rounded-xl border border-[#EAEAE3] bg-[#FBFBF9] p-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-spruce-800">
                2. Federal Reserve &amp; Macro Data
              </h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Rate-environment analyses, HYSA vs. Treasury yield comparisons, and inflation assumptions are cross-checked against{" "}
                <strong className="text-slate-800">Federal Reserve FOMC policy statements</strong> and official{" "}
                <strong className="text-slate-800">BLS CPI-U</strong> releases.
              </p>
            </div>

            <div className="rounded-xl border border-[#EAEAE3] bg-[#FBFBF9] p-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-spruce-800">
                3. State Agency Cross-Checks
              </h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                State-level guides verify progressive/flat income brackets, LLC franchise taxes, and municipal surcharges (such as NYC UBT/MCTMT or PA EIT) against official{" "}
                <strong className="text-slate-800">state Department of Revenue</strong> publications.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-emeraldTactile-100 bg-emeraldTactile-50/60 p-4 text-xs text-slate-700 leading-relaxed">
            <strong className="text-slate-900">Editorial Independence Guarantee:</strong>{" "}
            Advertising and monetization never influence our mathematical formulas, tax guidance, or editorial conclusions. TaxEstimator Online does not accept paid placements disguised as financial reporting, and calculator assumptions are never altered for commercial partners.
          </div>
        </section>

        {/* Author & Verification Methodology */}
        <section
          id="verification-methodology"
          className="scroll-mt-24 space-y-5 rounded-2xl border border-[#EAEAE3] bg-[#FBFBF9] p-6 sm:p-8"
        >
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-spruce-800">
            <BookOpen className="h-4 w-4 text-emeraldTactile-600" />
            <span>Review Workflow</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Author &amp; Verification Methodology
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Our articles and calculator updates are produced by the TaxEstimator Online Quantitative Tax &amp; Commerce Research Desk—combining financial software engineers with regulatory policy researchers—through a four-step verification pipeline:
          </p>

          <ol className="space-y-3 text-xs text-slate-700">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emeraldTactile-600" />
              <div>
                <strong className="text-slate-900">Primary-Source Extraction:</strong>{" "}
                Every statutory threshold, tax bracket, deduction limit, and merchant fee rate is sourced from an official primary document (IRS.gov, SSA.gov, FederalReserve.gov, state tax agency portals, or published processor terms) prior to drafting.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emeraldTactile-600" />
              <div>
                <strong className="text-slate-900">Reproducible Worked Personas:</strong>{" "}
                Numerical examples in our News Desk reports are computed with the exact same deterministic TypeScript calculation engines powering our interactive calculators so readers can audit every dollar.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emeraldTactile-600" />
              <div>
                <strong className="text-slate-900">Automated Regression Verification:</strong>{" "}
                Before deployment, bracket tables, self-employment tax splits, and state rules must pass automated Vitest regression suites verifying edge cases across tax years 2024, 2025, and 2026.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emeraldTactile-600" />
              <div>
                <strong className="text-slate-900">Dated Revisions &amp; Reader Corrections:</strong>{" "}
                When statutory guidance changes mid-year (for instance, legislative rate updates or IRS inflation revisions), affected guides display updated modification dates. Readers who spot any discrepancy can flag it directly via{" "}
                <Link href="/contact" className="font-semibold text-emeraldTactile-700 underline underline-offset-2">
                  our Contact Page
                </Link>{" "}
                or at <code className="font-mono text-spruce-800">editorial@taxestimator.online</code>.
              </div>
            </li>
          </ol>

          <p className="text-xs text-slate-500 pt-1">
            Note: TaxEstimator Online publishes educational models and quantitative journalism only; we are not a CPA firm or legal practice. Please review our{" "}
            <Link href="/disclaimer" className="font-semibold text-spruce-800 underline underline-offset-2">
              Financial &amp; Tax Disclaimer
            </Link>{" "}
            for full scope details.
          </p>
        </section>

        {/* Authoritative Sources & Clickable Citations */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Authoritative Sources &amp; Citations</h2>
          <p className="text-xs text-slate-600">
            Below are the primary federal, state, and payment-network references audited by our calculation engines and editorial desk:
          </p>
          <div className="divide-y divide-[#EAEAE3] overflow-hidden rounded-2xl border border-[#EAEAE3] bg-white">
            {authoritativeSources.map((source) => (
              <div
                key={source.url}
                className="flex flex-col gap-1.5 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900">{source.name}</div>
                  <div className="text-[11px] text-slate-600">{source.detail}</div>
                  <div className="text-[10px] font-mono text-slate-400 mt-0.5">{source.agency}</div>
                </div>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-[#DCDCD2] bg-[#FBFBF9] px-3 py-1.5 text-xs font-semibold text-emeraldTactile-700 transition hover:bg-emeraldTactile-50 hover:text-emeraldTactile-700"
                >
                  <span>Verify Source</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
