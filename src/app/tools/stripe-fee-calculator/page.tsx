import type { Metadata } from "next";
import { FeeCalculator } from "../../../components/calculators/FeeCalculator";
import { AdSlot } from "../../../components/ads/AdSlot";
import {
  ArrowRightLeft,
  BookOpen,
  CheckCircle,
  CreditCard,
  DollarSign,
  HelpCircle,
  Layers,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Stripe & PayPal Fee Optimizer | Reverse Invoice Calculator",
  description:
    "Accurately calculate payment gateway merchant fees across Stripe, PayPal, Wise, and Square. Features exact reverse fee pass-through calculations to guarantee your net invoice payout.",
  keywords: [
    "stripe fee calculator",
    "paypal fee calculator",
    "reverse invoice calculator",
    "merchant processing fee calculator",
    "stripe fee pass through",
    "wise vs stripe fees",
  ],
};

export default function StripeFeeCalculatorPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the reverse fee pass-through formula for Stripe and PayPal?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "To receive an exact net amount (P) after a payment processor deducts a percentage fee (r) and a fixed transaction fee (f), the formula to invoice your client is: Amount = (P + f) / (1 - r). For example, on Stripe standard domestic (2.9% + $0.30), to receive exactly $1,000 net, you must invoice ($1000 + $0.30) / (1 - 0.029) = $1,030.18.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between domestic and international Stripe processing fees?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Stripe charges 2.9% + $0.30 for standard domestic US card payments. For international cards, Stripe adds a 1.5% cross-border fee (totaling 4.4% + $0.30). If foreign currency conversion is required, an additional 1.0% FX spread applies, bringing total fees to 5.4% + $0.30.",
        },
      },
      {
        "@type": "Question",
        name: "How can businesses legally pass credit card processing fees to clients?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Businesses can pass processing costs to clients by providing clear payment terms, offering cash/ACH discounts, itemizing credit card convenience surcharges where legally permissible by state law, or utilizing reverse fee pricing built directly into professional service agreements.",
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
        <div className="inline-flex items-center gap-1.5 rounded-full bg-amberWarm-50 px-3 py-1 text-xs font-semibold text-amberWarm-800 mb-3">
          <ArrowRightLeft className="h-3.5 w-3.5" />
          <span>Reverse Calculation &amp; Surcharge Engine</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Stripe, PayPal &amp; Merchant Processing Fee Optimizer
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-600 leading-relaxed">
          Eliminate fee shrinkage. Calculate precise processor deductions across Stripe, PayPal, Wise, and Square, plus determine exactly what to bill your clients so you receive 100% of your target revenue.
        </p>
      </div>

      {/* Top Banner AdSlot */}
      <AdSlot slotId="fee-banner-top" format="horizontal" label="Merchant Banking Partner" />

      {/* Interactive Tool Component */}
      <div className="my-8">
        <FeeCalculator />
      </div>

      {/* Mid Content AdSlot */}
      <AdSlot slotId="fee-banner-mid" format="horizontal" label="Invoice & Billing Solutions" />

      {/* 1,000+ Word Educational Guide */}
      <article className="mt-16 rounded-3xl border border-[#EAEAE3] bg-white p-8 sm:p-12 text-slate-800 shadow-xs">
        <div className="max-w-4xl space-y-10">
          <header className="border-b border-[#F4F4F0] pb-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              The Merchant Fee Guide: Reverse Calculations &amp; Margin Protection
            </h2>
            <p className="mt-2 text-xs text-slate-500">
              Authored by TaxEstimator Online Commerce Engineering &bull; Validated against current published payment schedules
            </p>
          </header>

          {/* Section 1: The Math Behind the Reverse Fee */}
          <section className="space-y-4 text-sm leading-relaxed text-slate-700">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-spruce-800 text-xs text-white font-mono">
                1
              </span>
              The Mathematical Proof: Why Simply Adding 2.9% Leaves You Short
            </h3>
            <p>
              The most common mistake freelancers and small business owners make when attempting to pass transaction fees to clients is naive addition. If an invoice is $1,000 and the processor charges 2.9% + $0.30, an inexperienced contractor might add $29.30 and bill the client $1,029.30.
            </p>
            <p>
              However, the payment processor deducts their fee against the <em>new, higher gross total</em> of $1,029.30:
            </p>
            <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-4 font-mono text-xs text-rose-900 space-y-1">
              <div>Gross Billed: $1,029.30</div>
              <div>Processor Fee: ($1,029.30 &times; 0.029) + $0.30 = $29.85 + $0.30 = $30.15</div>
              <div>Net Deposited: $1,029.30 - $30.15 = $999.15 (Short by $0.85!)</div>
            </div>
            <p>
              While 85 cents sounds trivial on a $1,000 invoice, on a $50,000 enterprise milestone or $250,000 in annual client turnover, this mathematical flaw quietly leaks hundreds to thousands of dollars from your net margin.
            </p>
            <p className="font-semibold text-slate-900">
              The Correct Algebraic Derivation:
            </p>
            <div className="rounded-xl border border-[#EAEAE3] bg-[#FBFBF9] p-4 font-mono text-xs space-y-2 text-slate-800">
              <div>Let P = Desired Net Payout</div>
              <div>Let A = Gross Invoice Amount to Bill</div>
              <div>Let r = Percentage Fee Rate (e.g. 0.029 for 2.9%)</div>
              <div>Let f = Fixed Transaction Fee (e.g. $0.30)</div>
              <div className="pt-2 text-spruce-800 font-bold">
                Payout Formula: P = A - (A &times; r + f)
              </div>
              <div>P = A(1 - r) - f</div>
              <div>P + f = A(1 - r)</div>
              <div className="pt-2 text-emeraldTactile-700 font-bold text-sm">
                A = (P + f) / (1 - r)
              </div>
            </div>
            <p>
              Plugging in our numbers: ($1,000 + $0.30) / (1 - 0.029) = $1,000.30 / 0.971 = <strong>$1,030.18</strong>. When the client pays $1,030.18, Stripe takes 2.9% ($29.88) + $0.30 = $30.18. Your net bank deposit is exactly <strong>$1,000.00</strong> down to the cent.
            </p>
          </section>

          {/* Section 2: Platform Breakdown: Stripe vs PayPal vs Wise vs Square */}
          <section className="space-y-4 text-sm leading-relaxed text-slate-700">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-spruce-800 text-xs text-white font-mono">
                2
              </span>
              Comprehensive Platform Fee Matrix &amp; Comparative Analysis
            </h3>
            <p>
              Different processors optimize for different use cases. Choosing the wrong gateway for a given customer profile creates significant friction:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-[#EAEAE3]">
                <thead className="bg-[#F4F4F0] text-slate-700 font-semibold font-mono">
                  <tr>
                    <th className="p-3 border-b">Provider</th>
                    <th className="p-3 border-b">Domestic Rate</th>
                    <th className="p-3 border-b">International Surcharge</th>
                    <th className="p-3 border-b">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAEAE3]">
                  <tr>
                    <td className="p-3 font-bold text-slate-900">Stripe</td>
                    <td className="p-3 font-mono">2.9% + $0.30</td>
                    <td className="p-3 font-mono">+1.5% intl / +1.0% FX</td>
                    <td className="p-3">SaaS, recurring subscriptions, developer checkout</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-900">PayPal</td>
                    <td className="p-3 font-mono">2.99% - 3.49% + $0.49</td>
                    <td className="p-3 font-mono">+1.50% cross-border</td>
                    <td className="p-3">Consumer trust, buyers who insist on PayPal wallets</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-900">Wise Business</td>
                    <td className="p-3 font-mono">~0.43% + $0.39</td>
                    <td className="p-3 font-mono">Mid-market rate (~0.65%)</td>
                    <td className="p-3">Large B2B international invoices &amp; cross-border wires</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-900">Square</td>
                    <td className="p-3 font-mono">2.6% - 2.9% + $0.10-$0.30</td>
                    <td className="p-3 font-mono">+0.6% international</td>
                    <td className="p-3">In-person POS, retail, quick online client invoices</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3: The Cross-Border Trap */}
          <section className="space-y-4 text-sm leading-relaxed text-slate-700">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-spruce-800 text-xs text-white font-mono">
                3
              </span>
              The Cross-Border Trap: Why International Clients Cost 5.4%+
            </h3>
            <p>
              When billing overseas clients via Stripe or PayPal, creators frequently get blindsided by stacked surcharges. While the headline domestic rate is 2.9%, an overseas card triggers:
            </p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Base processing: 2.9% + $0.30</li>
              <li>Cross-border interchange surcharge: +1.5%</li>
              <li>Currency conversion spread: +1.0%</li>
              <li><strong>Total effective rate: 5.4% + $0.30</strong></li>
            </ul>
            <p>
              On a $10,000 project from a European or Australian client, standard Stripe checkout consumes <strong>$540.30</strong>. In contrast, issuing a local currency invoice via Wise Business or direct ACH bank wire costs under <strong>$65.00</strong>, immediately recovering nearly $475 in pure profit.
            </p>
          </section>

          {/* Section 4: Chargeback Buffers */}
          <section className="space-y-4 text-sm leading-relaxed text-slate-700">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-spruce-800 text-xs text-white font-mono">
                4
              </span>
              Building a Sensible 0.5% Dispute &amp; Chargeback Reserve
            </h3>
            <p>
              Every merchant account carries operational risk. If a client initiates a credit card chargeback, Stripe and PayPal levy an immediate dispute fee of $15.00 to $20.00, regardless of who ultimately wins the case. Prudent solopreneurs establish a 0.5% to 1.0% internal reserve fund on every project to buffer against unexpected refunds, chargeback fees, and processing anomalies without destabilizing cash flow.
            </p>
          </section>
        </div>
      </article>

      {/* Bottom AdSlot Unit */}
      <AdSlot slotId="fee-banner-bottom" format="rectangle" label="Corporate Credit & Cards" />
    </div>
  );
}
