import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TaxCalculator } from "../../../../components/calculators/TaxCalculator";
import { AdSlot } from "../../../../components/ads/AdSlot";
import {
  getAllStates,
  getStateTaxData,
} from "../../../../lib/engines/stateTaxEngine";
import {
  Calendar,
  CheckCircle,
  ExternalLink,
  FileText,
  HelpCircle,
  MapPin,
  Percent,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

interface PageProps {
  params: Promise<{
    state: string;
  }>;
}

export function generateStaticParams() {
  const all = getAllStates();
  return all.map((s) => ({
    state: s.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state: stateSlug } = await params;
  const stateData = getStateTaxData(stateSlug);

  if (!stateData) {
    return {
      title: "State 1099 Freelance Tax Calculator",
      description: "Calculate your state freelance and self-employment taxes.",
    };
  }

  const {
    editorialGuide,
    name,
    taxType,
    hasCustomGuide,
  } = stateData;
  const taxSummary =
    taxType === "none"
      ? "0% State Tax"
      : taxType === "flat"
      ? `${((stateData.flatRate || 0) * 100).toFixed(2)}% Flat Tax`
      : "Progressive Brackets";
  const isIndexedFlagship = Boolean(hasCustomGuide);

  return {
    title: editorialGuide.seoTitle,
    description: editorialGuide.metaDescription,
    keywords: [
      `${name} 1099 tax calculator`,
      `${name} freelance tax estimator`,
      `${name} self employment tax`,
      `${name} estimated quarterly taxes`,
      `${name} state income tax brackets`,
      `${stateData.estimatedTaxForm} calculator`,
      `${name} standard deduction freelance`,
    ],
    robots: {
      index: isIndexedFlagship,
      follow: true,
    },
    openGraph: {
      title: `${name} 1099 Freelance Tax Estimator (2024–2026) | TaxEstimator Online`,
      description: `Free ${name} 1099 tax calculator. Compute state income taxes (${taxSummary}), Schedule SE 15.3%, QBI deduction, LLC entity rules, and quarterly vouchers.`,
      url: `https://taxestimator.online/tools/freelance-tax-estimator/${stateData.slug}`,
      siteName: "TaxEstimator Online",
      type: "website",
    },
    alternates: {
      canonical: `https://taxestimator.online/tools/freelance-tax-estimator/${stateData.slug}`,
    },
  };
}

export default async function StateTaxEstimatorPage({ params }: PageProps) {
  const { state: stateSlug } = await params;
  const stateData = getStateTaxData(stateSlug);

  if (!stateData) {
    notFound();
  }

  const allStates = getAllStates();
  const { editorialGuide, name, code, taxType, flatRate, agencyName, agencyUrl, estimatedTaxForm, filingDeadline } = stateData;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: editorialGuide.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://taxestimator.online",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "1099 Freelance Estimator",
        item: "https://taxestimator.online/tools/freelance-tax-estimator",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${name} 1099 Calculator`,
        item: `https://taxestimator.online/tools/freelance-tax-estimator/${stateData.slug}`,
      },
    ],
  };

  const noTaxStates = allStates.filter((s) => s.taxType === "none");
  const flatTaxStates = allStates.filter((s) => s.taxType === "flat");

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Schema.org FAQ & Breadcrumb Structured Data for Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-xs text-slate-500">
        <Link href="/" className="hover:text-emeraldTactile transition">
          Home
        </Link>
        <span className="text-slate-400">/</span>
        <Link href="/tools/freelance-tax-estimator" className="hover:text-emeraldTactile transition">
          1099 Freelance Estimator
        </Link>
        <span className="text-slate-400">/</span>
        <span className="font-semibold text-slate-800">{name}</span>
      </nav>

      {/* Page Hero Header */}
      <div className="border-b border-[#EAEAE3] pb-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-spruce-50 px-3 py-1 text-xs font-semibold text-spruce-800">
            <MapPin className="h-3.5 w-3.5" />
            <span>State Edition: {name} ({code})</span>
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emeraldTactile/10 px-3 py-1 text-xs font-semibold text-emeraldTactile">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>2024–2026 Tax Guide</span>
          </span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          {name} 1099 Freelance Tax Calculator &amp; Rates (2024–2026)
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-600 leading-relaxed">
          Accurate state and federal self-employment tax estimation for independent contractors, solopreneurs, and 1099-NEC earners living or operating in {name}.
        </p>

        {/* State Snapshot Metric Cards */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl border border-[#EAEAE3] bg-white p-3.5 shadow-2xs">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
              <Percent className="h-3.5 w-3.5 text-spruce-800" />
              <span>Tax Model</span>
            </div>
            <div className="mt-1 text-sm font-bold text-slate-900 capitalize">
              {taxType === "none"
                ? "0% No Income Tax"
                : taxType === "flat"
                ? `${((flatRate || 0) * 100).toFixed(2)}% Flat Rate`
                : "Graduated Brackets"}
            </div>
          </div>

          <div className="rounded-xl border border-[#EAEAE3] bg-white p-3.5 shadow-2xs">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
              <FileText className="h-3.5 w-3.5 text-spruce-800" />
              <span>Revenue Agency</span>
            </div>
            <a
              href={agencyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 flex items-center gap-1 text-sm font-bold text-spruce-800 hover:text-emeraldTactile line-clamp-1"
            >
              <span>{agencyName}</span>
              <ExternalLink className="h-3 w-3 shrink-0" />
            </a>
          </div>

          <div className="rounded-xl border border-[#EAEAE3] bg-white p-3.5 shadow-2xs">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
              <FileText className="h-3.5 w-3.5 text-spruce-800" />
              <span>Estimated Form</span>
            </div>
            <div className="mt-1 text-sm font-bold text-slate-900 line-clamp-1">
              {estimatedTaxForm}
            </div>
          </div>

          <div className="rounded-xl border border-[#EAEAE3] bg-white p-3.5 shadow-2xs">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
              <Calendar className="h-3.5 w-3.5 text-spruce-800" />
              <span>Quarterly Deadlines</span>
            </div>
            <div className="mt-1 text-xs font-bold text-slate-900 line-clamp-1">
              {taxType === "none"
                ? "Federal 1040-ES Only"
                : filingDeadline.includes("%")
                ? "30% / 40% / 0% / 30%"
                : filingDeadline.startsWith("April 30")
                ? "Apr 30, Jun, Sep, Jan"
                : filingDeadline.startsWith("April 20")
                ? "20th (Apr/Jun/Sep/Jan)"
                : filingDeadline.startsWith("May 1")
                ? "May 1, Jun, Sep, Jan"
                : "Apr, Jun, Sep, Jan"}
            </div>
          </div>
        </div>

        {/* State Switcher Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#FBFBF9] border border-[#EAEAE3] p-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amberWarm-600" />
            <span className="text-xs font-semibold text-slate-800">
              Switch State Calculator:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-medium text-slate-500">Flagship Guides:</span>
            {[
              "california",
              "texas",
              "new-york",
              "florida",
              "washington",
              "illinois",
              "pennsylvania",
              "massachusetts",
              "new-jersey",
              "colorado",
            ].map((slug) => {
              const st = allStates.find((s) => s.slug === slug);
              if (!st) return null;
              const isActive = st.slug === stateSlug;
              return (
                <Link
                  key={slug}
                  href={`/tools/freelance-tax-estimator/${slug}`}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                    isActive
                      ? "bg-spruce-800 text-white"
                      : "bg-white border border-[#EAEAE3] text-slate-700 hover:border-emeraldTactile"
                  }`}
                >
                  {st.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Banner AdSlot */}
      <AdSlot slotId={`tax-state-banner-top-${code.toLowerCase()}`} format="horizontal" label="Tax & Accounting Software" />

      {/* Pre-calibrated Interactive Tax Calculator for this State */}
      <div className="my-8">
        <TaxCalculator initialStateCode={code} />
      </div>

      {/* Mid Banner AdSlot */}
      <AdSlot slotId={`tax-state-banner-mid-${code.toLowerCase()}`} format="horizontal" label="Freelance Invoicing & Tax Prep" />

      {/* 800+ Word Localized Editorial Guide */}
      <article className="mt-14 rounded-3xl border border-[#EAEAE3] bg-white p-8 sm:p-12 text-slate-800 shadow-xs">
        <div className="max-w-4xl space-y-10">
          <header className="border-b border-[#F4F4F0] pb-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-spruce-800 mb-2">
              <span>Localized Solopreneur Briefing</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {editorialGuide.h1Title}
            </h2>
            <p className="mt-2 text-xs text-slate-500">
              Researched and validated against {agencyName} publications and IRS 2024–2026 revenue bulletins (including OBBBA updates).
            </p>
          </header>

          {/* Section 1: Overview */}
          <section className="space-y-4 text-sm leading-relaxed text-slate-700">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-spruce-800 text-xs text-white font-mono">
                1
              </span>
              Overview of Freelance &amp; 1099 Taxation in {name}
            </h3>
            <p className="whitespace-pre-line">{editorialGuide.overview}</p>
          </section>

          {/* Section 2: Rate Breakdown */}
          <section className="space-y-4 text-sm leading-relaxed text-slate-700">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-spruce-800 text-xs text-white font-mono">
                2
              </span>
              {name} State Income Tax Rate Breakdown &amp; Brackets
            </h3>
            <p className="whitespace-pre-line">{editorialGuide.rateBreakdown}</p>

            {/* Bracket Breakdown Table if Progressive */}
            {taxType === "progressive" && stateData.brackets?.single && (
              <div className="mt-4 overflow-hidden rounded-xl border border-[#EAEAE3]">
                <table className="min-w-full divide-y divide-[#EAEAE3] text-left text-xs">
                  <thead className="bg-[#FBFBF9] font-semibold text-slate-800">
                    <tr>
                      <th className="px-4 py-3">Taxable Income Bracket (Single)</th>
                      <th className="px-4 py-3">Marginal Rate</th>
                      <th className="px-4 py-3">Jurisdiction</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAEAE3] bg-white font-mono">
                    {stateData.brackets.single.map((bracket, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="px-4 py-2.5 text-slate-700">
                          ${bracket.min.toLocaleString()}
                          {bracket.max !== null
                            ? ` – $${bracket.max.toLocaleString()}`
                            : "+"}
                        </td>
                        <td className="px-4 py-2.5 font-bold text-spruce-800">
                          {(bracket.rate * 100).toFixed(2)}%
                        </td>
                        <td className="px-4 py-2.5 text-slate-500 font-sans">
                          State of {name}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* Section 3: Deductions & Schedule C */}
          <section className="space-y-4 text-sm leading-relaxed text-slate-700">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-spruce-800 text-xs text-white font-mono">
                3
              </span>
              Schedule C Deductions, Entity Fees &amp; S-Corp Rules in {name}
            </h3>
            <p className="whitespace-pre-line">{editorialGuide.freelanceSpecificRules}</p>

            {/* Enriched State-Specific Entity & PTET Matrix */}
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-[#EAEAE3] bg-[#FBFBF9] p-4">
                <div className="text-[11px] font-bold uppercase tracking-wider text-spruce-800">
                  LLC Annual Report / Franchise Fee
                </div>
                <p className="mt-1.5 text-xs text-slate-700 leading-relaxed">
                  {stateData.llcAnnualFee}
                </p>
              </div>
              <div className="rounded-xl border border-[#EAEAE3] bg-[#FBFBF9] p-4">
                <div className="text-[11px] font-bold uppercase tracking-wider text-spruce-800">
                  S-Corp State Tax Treatment
                </div>
                <p className="mt-1.5 text-xs text-slate-700 leading-relaxed">
                  {stateData.sCorpTreatment}
                </p>
              </div>
              <div className="rounded-xl border border-[#EAEAE3] bg-[#FBFBF9] p-4">
                <div className="text-[11px] font-bold uppercase tracking-wider text-spruce-800">
                  PTET (SALT Cap Workaround)
                </div>
                <p className="mt-1.5 text-xs text-slate-700 leading-relaxed">
                  {stateData.pteTaxNotes}
                </p>
              </div>
              <div className="rounded-xl border border-[#EAEAE3] bg-[#FBFBF9] p-4">
                <div className="text-[11px] font-bold uppercase tracking-wider text-spruce-800">
                  2024–2026 Conformity &amp; Special Rules
                </div>
                <p className="mt-1.5 text-xs text-slate-700 leading-relaxed">
                  {stateData.stateSpecificNuances}
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Standard Deduction */}
          <section className="space-y-4 text-sm leading-relaxed text-slate-700">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-spruce-800 text-xs text-white font-mono">
                4
              </span>
              {name} State Standard Deduction Comparison
            </h3>
            <p className="whitespace-pre-line">{editorialGuide.standardDeductionGuide}</p>
            {taxType !== "none" && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="rounded-xl border border-[#EAEAE3] bg-[#FBFBF9] p-4 text-center">
                  <div className="text-xs text-slate-500">Single Filer</div>
                  <div className="mt-1 text-lg font-extrabold text-slate-900 font-mono">
                    ${stateData.standardDeduction.single.toLocaleString()}
                  </div>
                </div>
                <div className="rounded-xl border border-[#EAEAE3] bg-[#FBFBF9] p-4 text-center">
                  <div className="text-xs text-slate-500">Married Filing Jointly</div>
                  <div className="mt-1 text-lg font-extrabold text-slate-900 font-mono">
                    ${stateData.standardDeduction.married_joint.toLocaleString()}
                  </div>
                </div>
                <div className="rounded-xl border border-[#EAEAE3] bg-[#FBFBF9] p-4 text-center">
                  <div className="text-xs text-slate-500">Head of Household</div>
                  <div className="mt-1 text-lg font-extrabold text-slate-900 font-mono">
                    ${stateData.standardDeduction.head_of_household.toLocaleString()}
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Section 5: Estimated Tax Deadlines & Safe Harbor */}
          <section className="space-y-4 text-sm leading-relaxed text-slate-700">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-spruce-800 text-xs text-white font-mono">
                5
              </span>
              {taxType === "none"
                ? `Estimated Quarterly Taxes & Federal 1040-ES Rules in ${name}`
                : `Estimated Quarterly Taxes & ${estimatedTaxForm} Deadlines`}
            </h3>
            <p className="whitespace-pre-line">{editorialGuide.estimatedTaxesGuide}</p>
            <div className="rounded-xl border border-amberWarm-200 bg-amberWarm-50/70 p-4 text-xs text-amberWarm-900 space-y-1.5">
              <strong>
                {taxType === "none"
                  ? "Federal Form 1040-ES Statutory Filing Calendar ($0 State Income Vouchers):"
                  : `${name} & Federal Quarterly Schedule (${filingDeadline}):`}
              </strong>
              <div>&bull; State Estimated Trigger: {stateData.estimatedTaxThreshold}</div>
              <div>&bull; Federal Q1 / IRS Form 1040-ES: April 15 (Jan 1 – Mar 31 earnings)</div>
              <div>&bull; Federal Q2 / IRS Form 1040-ES: June 15 (Apr 1 – May 31 earnings)</div>
              <div>&bull; Federal Q3 / IRS Form 1040-ES: September 15 (Jun 1 – Aug 31 earnings)</div>
              <div>&bull; Federal Q4 / IRS Form 1040-ES: January 15 of subsequent calendar year (Sep 1 – Dec 31 earnings)</div>
            </div>
          </section>

          {/* Section 6: Local Taxes */}
          <section className="space-y-4 text-sm leading-relaxed text-slate-700">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-spruce-800 text-xs text-white font-mono">
                6
              </span>
              Local City, County &amp; Municipal Tax Nuances in {name}
            </h3>
            <p className="whitespace-pre-line">{editorialGuide.localTaxDetails}</p>
          </section>

          {/* Section 7: FAQs Accordion / List */}
          <section className="space-y-4 text-sm leading-relaxed text-slate-700 pt-4 border-t border-[#F4F4F0]">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-spruce-800" />
              Frequently Asked Questions for {name} Freelancers
            </h3>
            <div className="space-y-4 mt-4">
              {editorialGuide.faqs.map((faq, idx) => (
                <div key={idx} className="rounded-xl border border-[#EAEAE3] bg-[#FBFBF9] p-5">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 shrink-0 text-emeraldTactile" />
                    <span>{faq.question}</span>
                  </h4>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed pl-6">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 8: Official Agency Links */}
          <section className="rounded-2xl border border-spruce-100 bg-spruce-50/60 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-spruce-900">
                  Filing directly with {agencyName}
                </h4>
                <p className="text-xs text-spruce-700 mt-1">
                  Access official vouchers, online taxpayer portals, and statutory publications directly.
                </p>
              </div>
              <a
                href={agencyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-spruce-800 px-4 py-2 text-xs font-bold text-white transition hover:bg-spruce-900"
              >
                <span>Visit {agencyName}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </section>
        </div>
      </article>

      {/* Cross-State Directory & Geographic Comparison */}
      <section className="mt-16 rounded-3xl border border-[#EAEAE3] bg-white p-8 sm:p-12">
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          Compare Freelance Taxes Across All 50 States
        </h3>
        <p className="text-xs text-slate-600 mb-6">
          Exploring geographic tax arbitrage or moving your remote freelance business? Compare state income tax brackets and estimated payment rules across the country:
        </p>

        <div className="mb-6 space-y-4">
          <div>
            <h4 className="text-xs font-bold text-spruce-800 uppercase tracking-wider mb-2">
              0% State Income Tax States (Highest Take-Home Pay):
            </h4>
            <div className="flex flex-wrap gap-2">
              {noTaxStates.map((st) => (
                <Link
                  key={st.slug}
                  href={`/tools/freelance-tax-estimator/${st.slug}`}
                  className="rounded-lg border border-emeraldTactile/30 bg-emeraldTactile/5 px-3 py-1.5 text-xs font-semibold text-emeraldTactile hover:bg-emeraldTactile/10 transition"
                >
                  {st.name} (0%)
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Flat Tax States:
            </h4>
            <div className="flex flex-wrap gap-2">
              {flatTaxStates.map((st) => (
                <Link
                  key={st.slug}
                  href={`/tools/freelance-tax-estimator/${st.slug}`}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-slate-400 transition"
                >
                  {st.name} ({((st.flatRate || 0) * 100).toFixed(2)}%)
                </Link>
              ))}
            </div>
          </div>
        </div>

        <details className="group mt-4 rounded-xl border border-[#EAEAE3] p-4">
          <summary className="cursor-pointer text-xs font-bold text-slate-900 group-open:text-emeraldTactile">
            View Complete 50-State + DC Directory ({allStates.length} Jurisdictions)
          </summary>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 pt-2">
            {allStates.map((st) => (
              <Link
                key={st.slug}
                href={`/tools/freelance-tax-estimator/${st.slug}`}
                className="text-xs text-slate-600 hover:text-emeraldTactile hover:underline py-1 truncate"
              >
                {st.name}
              </Link>
            ))}
          </div>
        </details>
      </section>

      {/* Bottom AdSlot */}
      <AdSlot slotId={`tax-state-banner-bottom-${code.toLowerCase()}`} format="rectangle" label="Accounting & Banking Services" />
    </div>
  );
}
