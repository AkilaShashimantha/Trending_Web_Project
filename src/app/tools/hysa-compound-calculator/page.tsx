import type { Metadata } from "next";
import { HysaCalculator } from "../../../components/calculators/HysaCalculator";
import { AdSlot } from "../../../components/ads/AdSlot";
import {
  AlertTriangle,
  BookOpen,
  DollarSign,
  HelpCircle,
  Percent,
  PiggyBank,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

export const metadata: Metadata = {
  title: "HYSA Compound Wealth vs Inflation Shield Calculator",
  description:
    "Simulate High-Yield Savings Account (HYSA) wealth growth with monthly contributions. Calculates exact 1099-INT ordinary income tax drag and CPI inflation erosion on real purchasing power.",
  keywords: [
    "hysa calculator",
    "high yield savings account calculator",
    "compound interest with inflation",
    "hysa tax calculator",
    "real yield calculator",
    "purchasing power calculator",
  ],
};

export default function HysaCompoundCalculatorPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does inflation affect High-Yield Savings Account (HYSA) returns?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "While an HYSA pays a nominal annual interest rate (e.g. 4.5% to 5.0% APY), inflation continuously degrades purchasing power. If inflation is 3.0% and your tax rate on interest is 24%, your net nominal return is 3.42%, leaving a real inflation-adjusted purchasing power gain of only 0.42% annually.",
        },
      },
      {
        "@type": "Question",
        name: "Is interest earned in an HYSA taxed as capital gains or ordinary income?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "HYSA interest is taxed by the IRS as ordinary income, not capital gains. At tax year-end, your banking institution provides Form 1099-INT. The interest is added to your other earned income and taxed at your top marginal federal tax rate (up to 37%) plus state income tax.",
        },
      },
      {
        "@type": "Question",
        name: "Are High-Yield Savings Accounts FDIC insured?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, reputable High-Yield Savings Accounts offered by chartered financial institutions are insured by the Federal Deposit Insurance Corporation (FDIC) for up to $250,000 per depositor, per insured bank, for each account ownership category.",
        },
      },
    ],
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Schema.org FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Page Header */}
      <div className="border-b border-[#EAEAE3] pb-6">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-emeraldTactile-50 px-3 py-1 text-xs font-semibold text-emeraldTactile-800 mb-3">
          <TrendingUp className="h-3.5 w-3.5" />
          <span>Real Yield &amp; Macro-Inflation Modeling</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          HYSA Compound Wealth vs. Inflation Shield
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-600 leading-relaxed">
          Discover whether your savings account actually grows or secretly loses purchasing power. Model compounding interest with regular monthly deposits, ordinary income tax drag (Form 1099-INT), and cumulative CPI inflation decay.
        </p>
      </div>

      {/* Top Banner AdSlot */}
      <AdSlot slotId="hysa-banner-top" format="horizontal" label="High-Yield Banking Partners" />

      {/* Interactive Tool Component */}
      <div className="my-8">
        <HysaCalculator />
      </div>

      {/* Mid Content AdSlot */}
      <AdSlot slotId="hysa-banner-mid" format="horizontal" label="Treasury & Wealth Advisory" />

      {/* 1,000+ Word Educational Guide */}
      <article className="mt-16 rounded-3xl border border-[#EAEAE3] bg-white p-8 sm:p-12 text-slate-800 shadow-xs">
        <div className="max-w-4xl space-y-10">
          <header className="border-b border-[#F4F4F0] pb-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              The Real Purchasing Power Manual: Compounding, Taxes &amp; Inflation
            </h2>
            <p className="mt-2 text-xs text-slate-500">
              Authored by TaxEstimator Online Wealth Research &bull; Macroeconomic modeling based on Federal Reserve &amp; BLS CPI data
            </p>
          </header>

          {/* Section 1: The Inflation & Tax Pincer */}
          <section className="space-y-4 text-sm leading-relaxed text-slate-700">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-spruce-800 text-xs text-white font-mono">
                1
              </span>
              The Nominal vs. Real Wealth Trap
            </h3>
            <p>
              When a commercial bank advertises an account yield of &quot;5.00% APY&quot;, savers frequently assume their wealth is expanding at a 5% clip. However, wealth cannot be evaluated in nominal dollar units; it must be measured by <strong>purchasing power</strong>—the volume of goods, housing, energy, and services those dollars can buy.
            </p>
            <p>
              Two silent forces erode cash balances: <strong>marginal income tax drag</strong> and <strong>inflation decay</strong>. When both are accounted for, an apparently attractive 5.0% yield can easily compress into a flat or even negative real return.
            </p>
            <div className="rounded-xl border border-[#EAEAE3] bg-[#FBFBF9] p-4 text-xs font-mono space-y-2 text-slate-800">
              <div className="font-bold text-slate-900">The Real Yield Formula:</div>
              <div>1. Gross Yield = Advertised APY (e.g. 4.75%)</div>
              <div>2. After-Tax Net Yield = APY &times; (1 - Marginal Tax Rate)</div>
              <div>
                Example with 24% tax: 4.75% &times; (1 - 0.24) = <strong>3.61%</strong>
              </div>
              <div>3. Real Net Return = After-Tax Yield - Inflation Rate</div>
              <div>
                Example with 3.0% CPI: 3.61% - 3.00% = <strong className="text-emeraldTactile-700">+0.61% Real Gain</strong>
              </div>
            </div>
            <p>
              If your marginal federal tax rate is 32% and inflation sits at 3.5%, a 5.0% HYSA produces 3.4% after taxes, resulting in a <strong>-0.1% real negative yield</strong>. In that scenario, your bank account balance rises on paper, but your purchasing power at the supermarket actually declines.
            </p>
          </section>

          {/* Section 2: Form 1099-INT Tax Rules */}
          <section className="space-y-4 text-sm leading-relaxed text-slate-700">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-spruce-800 text-xs text-white font-mono">
                2
              </span>
              IRS Form 1099-INT: Why Interest Taxes Differ From Capital Gains
            </h3>
            <p>
              Many retail investors mistakenly believe that banking interest receives preferential capital gains tax rates (such as the 0%, 15%, or 20% long-term capital gains rates applied to equities held for more than a year).
            </p>
            <p>
              This is incorrect. Under IRS tax law (covering 2024–2026 brackets under Rev. Proc. 2025-32 and OBBBA), interest earned in bank accounts, certificates of deposit (CDs), and money market accounts is categorized as <strong>unearned ordinary income</strong>. It is taxed at your highest marginal federal bracket (up to 37% above $640,600 Single / $768,700 MFJ in 2026), plus any applicable state and municipal income taxes.
            </p>
            <div className="rounded-xl border border-amberWarm-200 bg-amberWarm-50/70 p-4 text-xs text-amberWarm-900 leading-relaxed">
              <strong>Tax Drag Insight:</strong> Because interest is taxed annually as it accrues, you lose a slice of your compound growth engine each spring when settling with the IRS. TaxEstimator Online models this annual deduction directly so your multi-year balance reflects reality.
            </div>
          </section>

          {/* Section 3: Asset Class Comparison */}
          <section className="space-y-4 text-sm leading-relaxed text-slate-700">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-spruce-800 text-xs text-white font-mono">
                3
              </span>
              Where Should Your Cash Live? HYSA vs. Treasury Bills vs. Money Market
            </h3>
            <p>
              Different liquidity instruments offer unique tax advantages depending on your state of residence:
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 text-xs">
              <div className="rounded-xl border border-[#EAEAE3] p-4">
                <div className="font-bold text-slate-900">High-Yield Savings (HYSA)</div>
                <div className="mt-1 text-[11px] text-emeraldTactile-700 font-semibold font-mono">
                  FDIC Insured up to $250k
                </div>
                <p className="mt-2 text-slate-600">
                  Best for 1-to-6 month emergency reserves and immediate cash liquidity. Full federal and state tax liability.
                </p>
              </div>

              <div className="rounded-xl border border-[#EAEAE3] p-4">
                <div className="font-bold text-slate-900">US Treasury Bills (T-Bills)</div>
                <div className="mt-1 text-[11px] text-emeraldTactile-700 font-semibold font-mono">
                  State-Tax Exempt (100%)
                </div>
                <p className="mt-2 text-slate-600">
                  Backed by full faith and credit of the US government. Crucial for residents in high-tax states like CA or NY, as T-Bill interest is 100% exempt from state income tax.
                </p>
              </div>

              <div className="rounded-xl border border-[#EAEAE3] p-4">
                <div className="font-bold text-slate-900">Money Market Funds (SPAXX/VMFXX)</div>
                <div className="mt-1 text-[11px] text-emeraldTactile-700 font-semibold font-mono">
                  SIPC Protected
                </div>
                <p className="mt-2 text-slate-600">
                  Mutual funds holding short-term debt and repos. Offers competitive yield directly within brokerage accounts for idle trading cash.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Emergency Fund Architecture */}
          <section className="space-y-4 text-sm leading-relaxed text-slate-700">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-spruce-800 text-xs text-white font-mono">
                4
              </span>
              The Solopreneur 3-Tier Liquidity Architecture
            </h3>
            <p>
              Because solopreneurs experience lumpy cash flows (where client payments might fluctuate wildly month to month), traditional employee financial advice (3 months of expenses) is dangerously inadequate. We advise a 3-tier structure:
            </p>
            <ul className="list-disc list-inside space-y-1 text-xs text-slate-600">
              <li>
                <strong>Tier 1: Operating Checking:</strong> 1 to 1.5 months of living and business overhead for automated billing.
              </li>
              <li>
                <strong>Tier 2: HYSA Emergency Fortress:</strong> 6 to 9 months of baseline expenses parked in a top-tier 4.5%+ HYSA.
              </li>
              <li>
                <strong>Tier 3: Rolling T-Bill Ladder:</strong> 6 to 12 months in 4-week, 8-week, and 13-week Treasury Bills for maximum state-tax-exempt yield and capital preservation.
              </li>
            </ul>
          </section>
        </div>
      </article>

      {/* Bottom AdSlot Unit */}
      <AdSlot slotId="hysa-banner-bottom" format="rectangle" label="Wealth Management & Private Banks" />
    </div>
  );
}
