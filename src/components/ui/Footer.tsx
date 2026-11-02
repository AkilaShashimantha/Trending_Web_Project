import Link from "next/link";
import { Shield, Sparkles, HeartHandshake, ExternalLink } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#EAEAE3] bg-spruce-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emeraldTactile-600 font-mono font-bold text-white">
                CP
              </div>
              <span className="text-xl font-bold tracking-tight text-white">CashPulse</span>
            </div>
            <p className="mt-3 max-w-md text-xs leading-relaxed text-slate-300">
              CashPulse is a high-precision financial simulation suite engineered for modern solopreneurs, digital nomads, and independent creators. Built with pure zero-dependency mathematical calculation engines reflecting current IRS guidelines and platform fee schedules.
            </p>
            <div className="mt-4 flex items-center gap-2 text-[11px] text-emeraldTactile-300">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Independent, Privacy-Centric, Tabular-Precision Models</span>
            </div>
          </div>

          {/* Core Tools */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider uppercase text-slate-100">
              Financial Engines
            </h3>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link
                  href="/tools/freelance-tax-estimator"
                  className="hover:text-emeraldTactile-300 transition-colors"
                >
                  1099 Freelance Tax Estimator
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/stripe-fee-calculator"
                  className="hover:text-emeraldTactile-300 transition-colors"
                >
                  Stripe & PayPal Fee Optimizer
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/hysa-compound-calculator"
                  className="hover:text-emeraldTactile-300 transition-colors"
                >
                  HYSA Wealth vs Inflation Shield
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider uppercase text-slate-100">
              Legal & Disclosures
            </h3>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link href="/privacy" className="hover:text-emeraldTactile-300 transition-colors">
                  Privacy Policy & DART Cookie Notice
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-emeraldTactile-300 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-emeraldTactile-300 transition-colors">
                  Financial Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emeraldTactile-300 transition-colors">
                  Editorial Methodology & Sources
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emeraldTactile-300 transition-colors">
                  Contact & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Compliance & Ad Notice */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider uppercase text-slate-100">
              Trust & Transparency
            </h3>
            <p className="mt-3 text-[11px] leading-relaxed text-slate-400">
              Google AdSense and verified third-party advertising partners may place and read cookies on your browser, or use web beacons to serve personalized advertisements based on previous web visits. You can manage your ad personalization settings at{" "}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emeraldTactile-300 underline inline-flex items-center gap-0.5"
              >
                Google Ad Center <ExternalLink className="h-2.5 w-2.5" />
              </a>
              .
            </p>
          </div>
        </div>

        {/* Disclaimer Bar */}
        <div className="mt-10 rounded-lg border border-spruce-700/60 bg-spruce-950/60 p-4 text-[11px] leading-relaxed text-slate-400">
          <div className="flex items-start gap-2">
            <Shield className="mt-0.5 h-4 w-4 shrink-0 text-amberWarm-500" />
            <div>
              <span className="font-semibold text-slate-200">Legal Disclaimer: </span>
              CashPulse is strictly an informational and educational simulation tool. Calculations are mathematical estimations based on public IRS schedules, published payment gateway fee structures, and compound interest formulas. CashPulse does not provide certified public accountant (CPA) advice, registered financial planning, legal counsel, or tax representation. Always verify with a licensed CPA or tax attorney for your specific tax filings.
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-spruce-800 pt-6 sm:flex-row text-xs text-slate-400">
          <p>&copy; {currentYear} CashPulse FinTech Suite. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Zero Dark UI Tropes</span>
            <span>&bull;</span>
            <span>Tabular Precision</span>
            <span>&bull;</span>
            <span>Vercel Optimized</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
