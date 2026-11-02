"use client";

import React from "react";
import { useFeeController } from "../../controllers/useFeeController";
import { formatCurrency, formatPercent } from "../../lib/utils";
import { PaymentProvider, TransactionType } from "../../models/fee.model";
import {
  ArrowRightLeft,
  Check,
  CheckCircle2,
  Copy,
  DollarSign,
  HelpCircle,
  Percent,
  PiggyBank,
  Shield,
  TrendingDown,
} from "lucide-react";

export function FeeCalculator() {
  const {
    inputs,
    results,
    updateInput,
    applyPreset,
    presets,
    copyShareableLink,
    copiedShareUrl,
  } = useFeeController();

  const providerNames: Record<PaymentProvider, string> = {
    stripe: "Stripe",
    paypal: "PayPal",
    wise: "Wise",
    square: "Square",
  };

  const transactionLabels: Record<TransactionType, { title: string; desc: string }> = {
    domestic_standard: {
      title: "Domestic Standard (Cards)",
      desc: "Standard domestic client cards and checkout",
    },
    international: {
      title: "Cross-Border / International",
      desc: "Client card issued outside your local country (+1.5% fee)",
    },
    currency_conversion: {
      title: "Foreign Currency Conversion (FX)",
      desc: "Billed in non-native currency with exchange spread",
    },
    micropayments: {
      title: "Micropayments (Under $10)",
      desc: "Lower fixed fee with adjusted percentage",
    },
    in_person: {
      title: "In-Person Point of Sale",
      desc: "Terminal, card tap, chip, or physical mobile swipe",
    },
  };

  return (
    <div className="mx-auto max-w-7xl">
      {/* Preset Pills */}
      <div className="mb-8">
        <div className="mb-2.5 flex items-center justify-between">
          <span className="text-xs font-semibold tracking-wider uppercase text-spruce-800">
            Common Payment Invoicing Scenarios
          </span>
          <span className="text-[11px] text-slate-500">Instant client invoice calibration</span>
        </div>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {presets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => applyPreset(preset.values)}
              className="group flex flex-col rounded-xl border border-[#EAEAE3] bg-white p-3 text-left transition hover:border-emeraldTactile hover:shadow-sm"
            >
              <span className="text-xs font-bold text-slate-900 group-hover:text-emeraldTactile">
                {preset.label}
              </span>
              <span className="mt-1 text-[11px] text-slate-500 line-clamp-1">
                {preset.description}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main 60/40 Split */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Form: Inputs (60% on desktop = 7 cols) */}
        <div className="space-y-6 lg:col-span-7">
          <div className="rounded-2xl border border-[#EAEAE3] bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Invoice &amp; Transaction Details</h2>
            <p className="text-xs text-slate-500">
              Calculate exact processor cuts and reverse invoice amounts
            </p>

            <div className="mt-6 space-y-6">
              {/* Desired / Nominal Invoice Amount */}
              <div>
                <div className="flex items-center justify-between text-xs">
                  <label className="font-semibold text-slate-800">Invoice Amount</label>
                  <span className="font-mono text-sm font-bold text-spruce-800">
                    {formatCurrency(inputs.invoiceAmount, { decimals: 2 })}
                  </span>
                </div>
                <div className="relative mt-2">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    $
                  </span>
                  <input
                    type="number"
                    min="0.01"
                    step="50"
                    value={inputs.invoiceAmount || ""}
                    onChange={(e) =>
                      updateInput("invoiceAmount", Math.max(0.01, Number(e.target.value)))
                    }
                    className="w-full rounded-lg border border-[#E2E8F0] bg-[#FBFBF9] py-2 pl-7 pr-3 font-mono text-sm font-semibold text-slate-900 focus:border-emeraldTactile focus:bg-white focus:outline-none"
                  />
                </div>
                <input
                  type="range"
                  min="50"
                  max="20000"
                  step="50"
                  value={inputs.invoiceAmount}
                  onChange={(e) => updateInput("invoiceAmount", Number(e.target.value))}
                  className="mt-3 w-full accent-emeraldTactile"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>$50</span>
                  <span>$2,500</span>
                  <span>$10,000</span>
                  <span>$20,000</span>
                </div>
              </div>

              {/* Provider Selection Tabs */}
              <div>
                <label className="text-xs font-semibold text-slate-800">Payment Processor</label>
                <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {(["stripe", "paypal", "wise", "square"] as PaymentProvider[]).map((prov) => (
                    <button
                      key={prov}
                      onClick={() => updateInput("provider", prov)}
                      className={`flex flex-col items-center justify-center rounded-xl border py-2.5 px-3 transition ${
                        inputs.provider === prov
                          ? "border-spruce-800 bg-spruce-800 text-white shadow-sm"
                          : "border-[#E2E8F0] bg-[#FBFBF9] text-slate-700 hover:bg-white"
                      }`}
                    >
                      <span className="text-xs font-bold">{providerNames[prov]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Transaction Type Radio Selector */}
              <div>
                <label className="text-xs font-semibold text-slate-800">
                  Transaction Classification
                </label>
                <div className="mt-2 space-y-2">
                  {(
                    [
                      "domestic_standard",
                      "international",
                      "currency_conversion",
                      "micropayments",
                      "in_person",
                    ] as TransactionType[]
                  ).map((type) => {
                    const info = transactionLabels[type];
                    const isSelected = inputs.transactionType === type;
                    return (
                      <label
                        key={type}
                        onClick={() => updateInput("transactionType", type)}
                        className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition ${
                          isSelected
                            ? "border-emeraldTactile bg-emeraldTactile-50/50"
                            : "border-[#EAEAE3] bg-white hover:bg-[#FBFBF9]"
                        }`}
                      >
                        <input
                          type="radio"
                          name="transactionType"
                          checked={isSelected}
                          onChange={() => updateInput("transactionType", type)}
                          className="mt-0.5 accent-emeraldTactile"
                        />
                        <div className="flex-1">
                          <div className="text-xs font-bold text-slate-900">{info.title}</div>
                          <div className="text-[11px] text-slate-500">{info.desc}</div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Chargeback Buffer & Monthly Volume */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 border-t border-[#F4F4F0] pt-4">
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <label className="font-semibold text-slate-800">Chargeback Buffer</label>
                    <span className="font-mono text-emeraldTactile font-bold">
                      {inputs.chargebackBufferPercent}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="3"
                    step="0.25"
                    value={inputs.chargebackBufferPercent}
                    onChange={(e) =>
                      updateInput("chargebackBufferPercent", Number(e.target.value))
                    }
                    className="mt-2 w-full accent-emeraldTactile"
                  />
                  <span className="text-[10px] text-slate-400">
                    Recommended 0.5% reserve for dispute insurance
                  </span>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-800">
                    Monthly Processing Volume
                  </label>
                  <div className="relative mt-1">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                      $
                    </span>
                    <input
                      type="number"
                      min="0"
                      step="1000"
                      value={inputs.monthlyVolume || ""}
                      onChange={(e) =>
                        updateInput("monthlyVolume", Math.max(0, Number(e.target.value)))
                      }
                      className="w-full rounded-lg border border-[#E2E8F0] bg-[#FBFBF9] py-1.5 pl-7 pr-3 font-mono text-xs text-slate-900 focus:border-emeraldTactile focus:bg-white focus:outline-none"
                    />
                  </div>
                  <span className="text-[10px] text-slate-400">
                    Calculates annual fees lost to processors
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Output: Results & Calculations (40% on desktop = 5 cols) */}
        <div className="space-y-6 lg:col-span-5">
          {/* Reverse Invoice Master Card */}
          <div className="rounded-2xl border-2 border-amberWarm-500/80 bg-gradient-to-br from-amberWarm-50 via-white to-parchment-100 p-6 shadow-md">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 rounded-full bg-amberWarm-100 px-2.5 py-0.5 text-xs font-bold text-amberWarm-800">
                <ArrowRightLeft className="h-3.5 w-3.5" />
                <span>Reverse Fee Optimizer</span>
              </span>
              <span className="text-[11px] font-mono text-slate-500">Pass-Through Protection</span>
            </div>

            <div className="mt-3">
              <p className="text-xs text-slate-600 font-medium">
                To receive exactly <strong className="text-slate-900">{formatCurrency(inputs.invoiceAmount, { decimals: 2 })}</strong> net in your bank, invoice your client:
              </p>
              <div className="mt-2 font-mono text-3xl font-extrabold tracking-tight text-spruce-900 sm:text-4xl">
                {formatCurrency(results.selectedResult.reverseInvoiceAmount, { decimals: 2 })}
              </div>
              <div className="mt-2 text-[11px] leading-relaxed text-slate-500">
                {results.reverseAmountFormulaExplanation}
              </div>
            </div>
          </div>

          {/* Current Payout Card */}
          <div className="rounded-2xl border border-spruce-700 bg-spruce-800 p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold tracking-wider uppercase text-emeraldTactile-300">
                Net Payout (If Invoicing Face Value)
              </span>
              <span className="rounded-full bg-spruce-700 px-2 py-0.5 font-mono text-xs text-emerald-200">
                {results.selectedResult.effectiveRatePercent}% Effective Rate
              </span>
            </div>

            <div className="mt-3">
              <span className="font-mono text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                {formatCurrency(results.selectedResult.netPayout, { decimals: 2 })}
              </span>
              <div className="mt-1 flex items-center gap-2 text-xs text-slate-300 font-mono">
                <span>Processor Fee: -{formatCurrency(results.selectedResult.totalFee, { decimals: 2 })}</span>
                <span>&bull;</span>
                <span>
                  Rate: {(results.selectedResult.percentageRate * 100).toFixed(2)}% + $
                  {results.selectedResult.fixedFee.toFixed(2)}
                </span>
              </div>
            </div>

            {inputs.chargebackBufferPercent > 0 && (
              <div className="mt-4 border-t border-spruce-700/60 pt-3 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Chargeback Buffer ({inputs.chargebackBufferPercent}%):</span>
                  <span className="font-mono text-amberWarm-400">
                    -{formatCurrency(results.chargebackReserveAmount, { decimals: 2 })}
                  </span>
                </div>
                <div className="mt-1 flex justify-between font-bold text-white">
                  <span>Net After Reserve:</span>
                  <span className="font-mono text-emeraldTactile-300">
                    {formatCurrency(results.netAfterReserve, { decimals: 2 })}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Multi-Provider Comparative Matrix */}
          <div className="rounded-2xl border border-[#EAEAE3] bg-white p-5 shadow-sm">
            <h3 className="text-xs font-bold tracking-wider uppercase text-slate-700">
              Cross-Platform Fee Comparison
            </h3>

            <div className="mt-4 space-y-2.5">
              {results.comparisons.map((c) => {
                const isSelected = c.provider === inputs.provider;
                return (
                  <div
                    key={c.provider}
                    className={`flex items-center justify-between rounded-xl border p-3 transition ${
                      isSelected
                        ? "border-emeraldTactile bg-emeraldTactile-50/40"
                        : "border-[#EAEAE3] bg-[#FBFBF9]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{c.providerName}</span>
                        {isSelected && (
                          <span className="rounded bg-emeraldTactile-600 px-1.5 py-0.2 text-[9px] font-bold text-white uppercase">
                            Selected
                          </span>
                        )}
                      </div>
                      <div className="mt-0.5 text-[11px] text-slate-500 font-mono">
                        {(c.percentageRate * 100).toFixed(2)}% + ${c.fixedFee.toFixed(2)} &bull; {c.effectiveRatePercent}% effective
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-mono text-xs font-bold text-slate-900">
                        Fee: {formatCurrency(c.totalFee, { decimals: 2 })}
                      </div>
                      <div className="font-mono text-[11px] text-emeraldTactile-700">
                        Payout: {formatCurrency(c.netPayout, { decimals: 2 })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Annual Volume Loss Projection */}
            <div className="mt-4 rounded-xl bg-[#F4F4F0] p-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">
                  Annual fee loss on {formatCurrency(inputs.monthlyVolume)}/mo:
                </span>
                <span className="font-mono font-bold text-rose-700">
                  -{formatCurrency(results.selectedResult.annualLossAtVolume, { decimals: 0 })}/year
                </span>
              </div>
            </div>
          </div>

          {/* Share Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={copyShareableLink}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-[#DCDCD2] bg-white py-2.5 text-xs font-semibold text-slate-800 transition hover:bg-[#F4F4F0]"
            >
              {copiedShareUrl ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emeraldTactile" />
                  <span className="text-emeraldTactile">Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-slate-500" />
                  <span>Share Calculation Link</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
