import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  Clock,
  DollarSign,
  Lock,
  Newspaper,
  Percent,
  PiggyBank,
  Shield,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { AdSlot } from "../components/ads/AdSlot";
import { getRecentNewsArticles } from "../lib/data/newsArticles";

export default function HomePage() {
  const tools = [
    {
      title: "1099 Freelance Tax Estimator",
      badge: "IRS 2024 & 2025 Code",
      badgeColor: "bg-emeraldTactile-50 text-emeraldTactile-800 border-emeraldTactile-200",
      description:
        "Accurately estimate your 15.3% Self-Employment Tax (Schedule SE), Federal progressive brackets, Section 199A QBI deduction, and 1040-ES quarterly vouchers.",
      href: "/tools/freelance-tax-estimator",
      icon: Calculator,
      stats: "Saves $2,400+ avg in deductions",
      action: "Estimate 1099 Taxes",
    },
    {
      title: "Stripe & PayPal Fee Optimizer",
      badge: "Reverse Pass-Through Calc",
      badgeColor: "bg-amberWarm-50 text-amberWarm-800 border-amberWarm-200",
      description:
        "Never absorb client processing fees again. Calculate exact processor cuts across Stripe, PayPal, Wise, and Square, plus the exact amount to invoice to net your target.",
      href: "/tools/stripe-fee-calculator",
      icon: DollarSign,
      stats: "Prevents 2.9% - 5.4% fee erosion",
      action: "Optimize Invoice Fees",
    },
    {
      title: "HYSA Compound Wealth vs Inflation",
      badge: "Tax Drag & Real Yield",
      badgeColor: "bg-spruce-50 text-spruce-800 border-spruce-200",
      description:
        "Simulate high-yield savings growth against ordinary income tax drag (Form 1099-INT) and CPI inflation erosion. Discover if your emergency fund actually beats inflation.",
      href: "/tools/hysa-compound-calculator",
      icon: TrendingUp,
      stats: "Evaluates real purchasing power",
      action: "Simulate Real Yield",
    },
  ];

  const latestNews = getRecentNewsArticles(3);

  const siteJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://taxestimator.online/#website",
        name: "TaxEstimator Online",
        alternateName: ["TaxEstimator", "TaxEstimator.online"],
        url: "https://taxestimator.online/",
        description:
          "Precision 1099 freelance tax estimator, Stripe/PayPal processing fee calculator, and HYSA inflation calculator for US freelancers and solopreneurs.",
        publisher: {
          "@id": "https://taxestimator.online/#organization",
        },
      },
      {
        "@type": "Organization",
        "@id": "https://taxestimator.online/#organization",
        name: "TaxEstimator Online",
        url: "https://taxestimator.online/",
        logo: {
          "@type": "ImageObject",
          url: "https://taxestimator.online/icon-512.png",
        },
      },
    ],
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Google Site Name & Organization Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
      />
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl border border-[#EAEAE3] bg-gradient-to-b from-[#F4F4F0] to-[#FBFBF9] p-8 sm:p-12 lg:p-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-emeraldTactile-200 bg-emeraldTactile-50 px-3 py-1 text-xs font-semibold text-emeraldTactile-800 mb-6">
          <Sparkles className="h-3.5 w-3.5 text-emeraldTactile-600" />
          <span>Independent Solopreneur &amp; Creator Finance Suite</span>
        </div>

        <h1 className="mx-auto max-w-4xl text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          Stop Leaving Money on the Table.{" "}
          <span className="text-spruce-800 underline decoration-emeraldTactile decoration-wavy decoration-2">
            Model Every Cent.
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base text-slate-600 sm:text-lg leading-relaxed">
          The high-precision financial suite designed for freelancers, agency owners, and digital creators. Pure mathematical calculation engines for taxes, payment gateway cuts, and compound purchasing power.
        </p>

        {/* Quick CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/tools/freelance-tax-estimator"
            className="flex items-center gap-2 rounded-xl bg-spruce-800 px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-spruce-700 hover:shadow-lg"
          >
            <Calculator className="h-4 w-4" />
            <span>Launch Tax Estimator</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/tools/stripe-fee-calculator"
            className="flex items-center gap-2 rounded-xl border border-[#DCDCD2] bg-white px-6 py-3.5 text-sm font-bold text-slate-800 transition hover:bg-[#F4F4F0]"
          >
            <DollarSign className="h-4 w-4 text-emeraldTactile" />
            <span>Invoice Fee Optimizer</span>
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 border-t border-[#EAEAE3] pt-6 text-xs text-slate-500 font-mono">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emeraldTactile" />
            <span>2024 &amp; 2025 IRS Brackets</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emeraldTactile" />
            <span>Section 199A QBI 20% Deduction</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emeraldTactile" />
            <span>Zero Server Tracking / Client-Side Math</span>
          </div>
        </div>
      </div>

      {/* Top AdSlot Unit (AdSense Compliant, Zero CLS) */}
      <AdSlot slotId="home-banner-top" format="horizontal" label="Featured Sponsor" />

      {/* 3 Core Tools Grid */}
      <div className="mt-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Specialized Solopreneur Financial Engines
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Engineered to eliminate costly guesswork across taxes, client invoices, and emergency reserves.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.title}
                className="flex flex-col justify-between rounded-2xl border border-[#EAEAE3] bg-white p-7 shadow-xs transition hover:border-emeraldTactile hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-spruce-800 text-emeraldTactile-400">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${tool.badgeColor}`}
                    >
                      {tool.badge}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-slate-900">{tool.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">{tool.description}</p>
                </div>

                <div className="mt-6 border-t border-[#F4F4F0] pt-4">
                  <div className="text-[11px] font-mono text-emeraldTactile-700 font-semibold mb-3">
                    {tool.stats}
                  </div>
                  <Link
                    href={tool.href}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-spruce-800 py-2.5 text-xs font-bold text-white transition hover:bg-spruce-700"
                  >
                    <span>{tool.action}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Latest Tax & Financial News Preview Section */}
      <section className="mt-16" aria-labelledby="latest-news-heading">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emeraldTactile-200 bg-emeraldTactile-50 px-3 py-0.5 text-xs font-semibold text-emeraldTactile-800 mb-2">
              <span className="h-2 w-2 rounded-full bg-emeraldTactile-600 animate-pulse" />
              <span>Editorial Intelligence</span>
            </div>
            <h2 id="latest-news-heading" className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Latest Tax Policy &amp; Financial News
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Primary-source breakdowns of IRS regulatory shifts, merchant processing fee schedules, and real HYSA purchasing power.
            </p>
          </div>
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emeraldTactile-700 hover:text-emeraldTactile-800 shrink-0"
          >
            <span>Explore News Desk</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {latestNews.map((article) => (
            <article
              key={article.slug}
              className="flex flex-col justify-between rounded-2xl border border-[#EAEAE3] bg-white p-6 shadow-xs transition hover:border-emeraldTactile-500 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="rounded-full bg-emeraldTactile-50 px-2.5 py-0.5 text-[11px] font-medium text-emeraldTactile-800 border border-emeraldTactile-200">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <Clock className="h-3 w-3" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-spruce-800">
                  <Link href={`/news/${article.slug}`} className="hover:text-spruce-800 transition-colors">
                    {article.title}
                  </Link>
                </h3>

                <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {article.summary}
                </p>
              </div>

              <div className="mt-6 border-t border-[#F4F4F0] pt-4 flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono text-slate-500">
                  {new Date(article.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <Link
                  href={`/news/${article.slug}`}
                  className="inline-flex items-center gap-1 font-semibold text-emeraldTactile-700 hover:text-emeraldTactile-800"
                >
                  <span>Read Breakdown</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Educational Pillar: Why Freelancers Lose $10k+ Annually */}
      <div className="mt-16 rounded-3xl border border-[#EAEAE3] bg-white p-8 sm:p-12 shadow-xs">
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-spruce-800">
            Solopreneur Wealth Blueprint
          </span>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            The Three Hidden Wealth Leaks Freelancers Face
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Traditional wage earners have taxes withheld and processing fees absorbed by payroll departments. Independent solopreneurs bear 100% of the operational overhead.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-[#F4F4F0] bg-[#FBFBF9] p-5">
            <div className="font-mono text-xl font-bold text-amberWarm-700">01</div>
            <h4 className="mt-2 text-sm font-bold text-slate-900">
              The 15.3% Self-Employment Surprise
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              Unlike W-2 employees where the employer pays half of FICA, 1099 contractors pay both the employee and employer shares (12.4% Social Security + 2.9% Medicare). Failing to set aside 25%–35% quarterly leads to severe IRS underpayment penalties.
            </p>
          </div>

          <div className="rounded-xl border border-[#F4F4F0] bg-[#FBFBF9] p-5">
            <div className="font-mono text-xl font-bold text-amberWarm-700">02</div>
            <h4 className="mt-2 text-sm font-bold text-slate-900">
              Absorbing Credit Card Gateway Cuts
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              A 2.9% + $0.30 fee on a $5,000 project takes $145.30 straight from your pocket. On $100,000 in annual client invoicing, you surrender nearly $3,000 in fees. Using reverse fee pass-through pricing recovers this instantly.
            </p>
          </div>

          <div className="rounded-xl border border-[#F4F4F0] bg-[#FBFBF9] p-5">
            <div className="font-mono text-xl font-bold text-amberWarm-700">03</div>
            <h4 className="mt-2 text-sm font-bold text-slate-900">
              The Cash-Drag Illusion &amp; 1099-INT Tax
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              Parking emergency reserves in a 0.01% checking account guarantees purchasing power destruction under 3% inflation. Even in a 5% HYSA, taxes on interest (Form 1099-INT) reduce your effective real return. You must model real net-of-tax yield.
            </p>
          </div>
        </div>
      </div>

      {/* Mid-Content AdSlot Unit */}
      <AdSlot slotId="home-banner-mid" format="horizontal" label="Educational Sponsor" />

      {/* FAQ Section with Schema-Compliant Markup */}
      <div className="mt-16 rounded-3xl border border-[#EAEAE3] bg-white p-8 sm:p-12">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Frequently Asked Questions About Solopreneur Finance
        </h2>
        <div className="mt-6 divide-y divide-[#F4F4F0] text-xs">
          <div className="py-4">
            <h3 className="font-bold text-slate-900 text-sm">
              How does the 20% Section 199A Qualified Business Income (QBI) deduction work?
            </h3>
            <p className="mt-2 text-slate-600 leading-relaxed">
              Enacted under the Tax Cuts and Jobs Act, Section 199A allows eligible sole proprietors, single-member LLCs, and S-Corps to deduct up to 20% of their net qualified business income from their federal taxable income. For 2024, the full deduction applies up to $191,950 for single filers ($383,900 for married filing jointly), indexed for inflation in 2025.
            </p>
          </div>

          <div className="py-4">
            <h3 className="font-bold text-slate-900 text-sm">
              What is the exact mathematical formula to pass Stripe/PayPal fees to clients?
            </h3>
            <p className="mt-2 text-slate-600 leading-relaxed">
              If a processor charges percentage rate <code className="font-mono">r</code> (e.g. 0.029) plus fixed fee <code className="font-mono">f</code> (e.g. $0.30), the gross invoice amount <code className="font-mono">A</code> required to receive net amount <code className="font-mono">P</code> is:
              <br />
              <strong className="font-mono text-slate-800">A = (P + f) / (1 - r)</strong>
              <br />
              For example, to net exactly $1,000 on Stripe domestic: ($1,000 + $0.30) / (1 - 0.029) = $1,030.18.
            </p>
          </div>

          <div className="py-4">
            <h3 className="font-bold text-slate-900 text-sm">
              Are high-yield savings account (HYSA) gains taxed as capital gains or ordinary income?
            </h3>
            <p className="mt-2 text-slate-600 leading-relaxed">
              Interest earned on high-yield savings accounts is classified by the IRS as ordinary income, NOT long-term capital gains. Your bank issues Form 1099-INT at year-end, and the interest is taxed at your highest marginal federal and state tax rates (up to 37% federal plus state tax).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
