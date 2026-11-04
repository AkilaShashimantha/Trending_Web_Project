"use client";

import React, { useState } from "react";
import { useTaxController } from "../../controllers/useTaxController";
import { formatCurrency, formatPercent } from "../../lib/utils";
import { FilingStatus, TaxInputs, TaxYear } from "../../models/tax.model";
import { US_STATE_TAX_DATA } from "../../lib/engines/taxEngine";
import {
  Calendar,
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  DollarSign,
  Download,
  HelpCircle,
  Info,
  PieChart,
  Printer,
  RotateCcw,
  Save,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

interface TaxCalculatorProps {
  initialStateCode?: string;
  defaultValues?: Partial<TaxInputs>;
}

export function TaxCalculator({ initialStateCode, defaultValues }: TaxCalculatorProps = {}) {
  const initialOverrides = React.useMemo(() => {
    return {
      ...(initialStateCode ? { stateCode: initialStateCode } : {}),
      ...defaultValues,
    };
  }, [initialStateCode, defaultValues]);

  const {
    inputs,
    results,
    updateInput,
    applyPreset,
    presets,
    copyShareableLink,
    copiedShareUrl,
    hasSavedScenario,
    savedNotification,
    saveToLocalStorage,
    loadFromLocalStorage,
    clearLocalStorage,
    exportAsJson,
    exportAsCsv,
  } = useTaxController(initialOverrides);

  const [showAdvancedDeductions, setShowAdvancedDeductions] = useState(true);
  const [showBracketDetails, setShowBracketDetails] = useState(false);

  const sortedStates = React.useMemo(() => {
    return Object.entries(US_STATE_TAX_DATA).sort((a, b) =>
      a[1].name.localeCompare(b[1].name)
    );
  }, []);

  return (
    <div className="mx-auto max-w-7xl">
      {/* Preset Pills */}
      <div className="mb-8">
        <div className="mb-2.5 flex items-center justify-between">
          <span className="text-xs font-semibold tracking-wider uppercase text-spruce-800">
            Quick Career Benchmarks
          </span>
          <span className="text-[11px] text-slate-500">1-click calibrate typical scenarios</span>
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
            <div className="flex items-center justify-between border-b border-[#F4F4F0] pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Income & Tax Profile</h2>
                <p className="text-xs text-slate-500">
                  Calibrated for IRS Form 1040 Schedule C & SE
                </p>
              </div>

              {/* Tax Year Toggle */}
              <div className="flex rounded-lg bg-[#F4F4F0] p-1">
                {(["2025", "2024"] as TaxYear[]).map((yr) => (
                  <button
                    key={yr}
                    onClick={() => updateInput("taxYear", yr)}
                    className={`rounded-md px-3 py-1 text-xs font-bold transition ${
                      inputs.taxYear === yr
                        ? "bg-spruce-800 text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {yr} Tax Year
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 space-y-5">
              {/* Gross 1099 Revenue */}
              <div>
                <div className="flex items-center justify-between text-xs">
                  <label className="font-semibold text-slate-800">
                    Gross 1099 Freelance / Client Revenue
                  </label>
                  <span className="font-mono font-bold text-spruce-800 text-sm">
                    {formatCurrency(inputs.gross1099Income)}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <div className="relative flex-1">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                      $
                    </span>
                    <input
                      type="number"
                      min="0"
                      step="1000"
                      value={inputs.gross1099Income || ""}
                      onChange={(e) =>
                        updateInput("gross1099Income", Math.max(0, Number(e.target.value)))
                      }
                      className="w-full rounded-lg border border-[#E2E8F0] bg-[#FBFBF9] py-2 pl-7 pr-3 font-mono text-sm font-semibold text-slate-900 focus:border-emeraldTactile focus:bg-white focus:outline-none focus:ring-1 focus:ring-emeraldTactile"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="350000"
                  step="2500"
                  value={inputs.gross1099Income}
                  onChange={(e) => updateInput("gross1099Income", Number(e.target.value))}
                  className="mt-3 w-full accent-emeraldTactile"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>$0</span>
                  <span>$100k</span>
                  <span>$200k</span>
                  <span>$350k+</span>
                </div>
              </div>

              {/* Filing Status & State Select */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold text-slate-800">Filing Status</label>
                  <select
                    value={inputs.filingStatus}
                    onChange={(e) =>
                      updateInput("filingStatus", e.target.value as FilingStatus)
                    }
                    className="mt-1.5 w-full rounded-lg border border-[#E2E8F0] bg-[#FBFBF9] px-3 py-2 text-xs font-medium text-slate-900 focus:border-emeraldTactile focus:bg-white focus:outline-none"
                  >
                    <option value="single">Single</option>
                    <option value="married_joint">Married Filing Jointly</option>
                    <option value="head_of_household">Head of Household</option>
                    <option value="married_separate">Married Filing Separately</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-800">Tax State</label>
                  <select
                    value={inputs.stateCode}
                    onChange={(e) => updateInput("stateCode", e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-[#E2E8F0] bg-[#FBFBF9] px-3 py-2 text-xs font-medium text-slate-900 focus:border-emeraldTactile focus:bg-white focus:outline-none"
                  >
                    {sortedStates.map(([code, data]) => (
                      <option key={code} value={code}>
                        {data.name} (
                        {data.type === "none"
                          ? "0% Tax"
                          : data.type === "flat" && data.rate
                          ? `${(data.rate * 100).toFixed(2)}% Flat`
                          : "Graduated"}
                        )
                      </option>
                    ))}
                    <option value="OTHER">Other State (4.5% Nat&apos;l Avg)</option>
                  </select>
                </div>
              </div>

              {/* W2 Supplemental Income */}
              <div>
                <label className="flex items-center justify-between text-xs font-medium text-slate-700">
                  <span>Supplemental W-2 Salary (if dual-employed)</span>
                  <span className="font-mono text-[11px] text-slate-500">
                    {formatCurrency(inputs.w2Income)}
                  </span>
                </label>
                <div className="relative mt-1">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    $
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    value={inputs.w2Income || ""}
                    onChange={(e) =>
                      updateInput("w2Income", Math.max(0, Number(e.target.value)))
                    }
                    placeholder="0"
                    className="w-full rounded-lg border border-[#E2E8F0] bg-[#FBFBF9] py-1.5 pl-7 pr-3 font-mono text-xs text-slate-900 focus:border-emeraldTactile focus:bg-white focus:outline-none"
                  />
                </div>
                <p className="mt-1 text-[10px] text-slate-400">
                  W-2 wages offset your Social Security $176,100 cap, lowering your self-employment tax!
                </p>
              </div>
            </div>
          </div>

          {/* Deductions & Business Write-offs */}
          <div className="rounded-2xl border border-[#EAEAE3] bg-white p-6 shadow-sm">
            <button
              onClick={() => setShowAdvancedDeductions(!showAdvancedDeductions)}
              className="flex w-full items-center justify-between text-left"
            >
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Business Deductions &amp; Write-offs (Schedule C &amp; 1)
                </h3>
                <p className="text-[11px] text-slate-500">
                  Directly reduces net self-employment earnings and AGI
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-emeraldTactile-50 px-2 py-0.5 font-mono text-xs font-bold text-emeraldTactile-700">
                  -{formatCurrency(results.totalExpenses)}
                </span>
                {showAdvancedDeductions ? (
                  <ChevronUp className="h-4 w-4 text-slate-500" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-slate-500" />
                )}
              </div>
            </button>

            {showAdvancedDeductions && (
              <div className="mt-5 space-y-4 border-t border-[#F4F4F0] pt-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-medium text-slate-700">
                      General Business Expenses
                    </label>
                    <div className="relative mt-1">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                        $
                      </span>
                      <input
                        type="number"
                        min="0"
                        value={inputs.businessExpenses || ""}
                        onChange={(e) =>
                          updateInput("businessExpenses", Math.max(0, Number(e.target.value)))
                        }
                        className="w-full rounded-lg border border-[#E2E8F0] bg-[#FBFBF9] py-1.5 pl-7 pr-3 font-mono text-xs text-slate-900 focus:border-emeraldTactile focus:bg-white focus:outline-none"
                      />
                    </div>
                    <span className="text-[10px] text-slate-400">Software, hardware, internet, travel</span>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-700">
                      Home Office Deduction
                    </label>
                    <div className="relative mt-1">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                        $
                      </span>
                      <input
                        type="number"
                        min="0"
                        value={inputs.homeOfficeDeduction || ""}
                        onChange={(e) =>
                          updateInput("homeOfficeDeduction", Math.max(0, Number(e.target.value)))
                        }
                        className="w-full rounded-lg border border-[#E2E8F0] bg-[#FBFBF9] py-1.5 pl-7 pr-3 font-mono text-xs text-slate-900 focus:border-emeraldTactile focus:bg-white focus:outline-none"
                      />
                    </div>
                    <span className="text-[10px] text-slate-400">Dedicated workspace deduction</span>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-700">
                      Self-Employed Health Insurance
                    </label>
                    <div className="relative mt-1">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                        $
                      </span>
                      <input
                        type="number"
                        min="0"
                        value={inputs.healthInsurancePremiums || ""}
                        onChange={(e) =>
                          updateInput(
                            "healthInsurancePremiums",
                            Math.max(0, Number(e.target.value))
                          )
                        }
                        className="w-full rounded-lg border border-[#E2E8F0] bg-[#FBFBF9] py-1.5 pl-7 pr-3 font-mono text-xs text-slate-900 focus:border-emeraldTactile focus:bg-white focus:outline-none"
                      />
                    </div>
                    <span className="text-[10px] text-slate-400">100% above-the-line deduction</span>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-700">
                      SEP IRA / Solo 401(k) Contribution
                    </label>
                    <div className="relative mt-1">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                        $
                      </span>
                      <input
                        type="number"
                        min="0"
                        value={inputs.sepIraContribution || ""}
                        onChange={(e) =>
                          updateInput("sepIraContribution", Math.max(0, Number(e.target.value)))
                        }
                        className="w-full rounded-lg border border-[#E2E8F0] bg-[#FBFBF9] py-1.5 pl-7 pr-3 font-mono text-xs text-slate-900 focus:border-emeraldTactile focus:bg-white focus:outline-none"
                      />
                    </div>
                    <span className="text-[10px] text-slate-400">Pre-tax retirement deduction</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Output: Results & Visuals (40% on desktop = 5 cols) */}
        <div className="space-y-6 lg:col-span-5">
          {/* Hero Take Home Card */}
          <div className="rounded-2xl border border-spruce-700 bg-spruce-800 p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold tracking-wider uppercase text-emeraldTactile-300">
                {results.isDualIncome ? "1099 Freelance Take-Home" : "Net Annual Take-Home"}
              </span>
              <span className="rounded-full bg-spruce-700/80 px-2.5 py-0.5 font-mono text-xs text-emerald-200">
                {results.overallEffectiveRate}% Freelance Tax Rate
              </span>
            </div>

            <div className="mt-3">
              <span className="font-mono text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
                {formatCurrency(results.takeHomePay)}
              </span>
              <div className="mt-1 flex items-center gap-2 text-xs text-slate-300 font-mono">
                <span>≈ {formatCurrency(results.monthlyNetIncome)} / month</span>
                <span>&bull;</span>
                <span>{formatCurrency(results.takeHomePay / 52)} / week</span>
              </div>
            </div>

            {results.isDualIncome && (
              <div className="mt-3 rounded-lg bg-spruce-700/40 p-2.5 border border-spruce-600/50 text-[11px] text-emerald-200">
                <div className="flex justify-between font-mono">
                  <span>W-2 Net (est):</span>
                  <strong>{formatCurrency(results.w2Income - results.w2TaxWithheldEstimate)}</strong>
                </div>
                <div className="flex justify-between font-mono mt-1 border-t border-spruce-600/40 pt-1 text-white">
                  <span>Combined Household Take-Home:</span>
                  <strong className="text-emeraldTactile-300">{formatCurrency(results.combinedTakeHome)}</strong>
                </div>
              </div>
            )}

            {/* Total Estimated Tax Box */}
            <div className="mt-5 rounded-xl bg-spruce-900/80 p-3.5 border border-spruce-700/60">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300">
                  {results.isDualIncome ? "Estimated 1099 Freelance Tax:" : "Total Estimated Annual Tax:"}
                </span>
                <span className="font-mono font-bold text-amberWarm-400">
                  {formatCurrency(results.totalEstimatedTax)}
                </span>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-2 border-t border-spruce-700/50 pt-2 text-[11px] font-mono">
                <div>
                  <span className="block text-slate-400">Self-Emp:</span>
                  <span className="font-semibold text-slate-200">
                    {formatCurrency(results.totalSelfEmploymentTax)}
                  </span>
                </div>
                <div>
                  <span className="block text-slate-400">
                    {results.isDualIncome ? "Marginal Fed:" : "Federal:"}
                  </span>
                  <span className="font-semibold text-slate-200">
                    {formatCurrency(results.isDualIncome ? results.marginalFederalTaxOn1099 : results.federalIncomeTax)}
                  </span>
                </div>
                <div>
                  <span className="block text-slate-400">
                    {results.isDualIncome ? "Marginal State:" : "State:"}
                  </span>
                  <span className="font-semibold text-slate-200">
                    {formatCurrency(results.isDualIncome ? results.marginalStateTaxOn1099 : results.stateTaxAmount)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 199A QBI Tax Savings Pill */}
          <div className="flex items-center justify-between rounded-xl border border-emeraldTactile-100 bg-emeraldTactile-50/70 p-3.5">
            <div className="flex items-center gap-2.5">
              <Sparkles className="h-4 w-4 text-emeraldTactile-600" />
              <div>
                <div className="text-xs font-bold text-emeraldTactile-900">
                  Section 199A QBI Deduction
                </div>
                <div className="text-[11px] text-emeraldTactile-700">
                  20% Qualified Business Income write-off
                </div>
              </div>
            </div>
            <div className="font-mono text-xs font-bold text-emeraldTactile-800">
              -{formatCurrency(results.qbiDeduction)} deduction
            </div>
          </div>

          {/* Detailed Tax Breakdown Accordion */}
          <div className="rounded-2xl border border-[#EAEAE3] bg-white p-5 shadow-sm">
            <h3 className="text-xs font-bold tracking-wider uppercase text-slate-700">
              Comprehensive Tax Breakdown
            </h3>

            <div className="mt-3 divide-y divide-[#F4F4F0] text-xs">
              <div className="flex justify-between py-2">
                <span className="text-slate-600">Net Business Profit (Schedule C)</span>
                <span className="font-mono font-semibold text-slate-900">
                  {formatCurrency(results.netBusinessProfit)}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-600">
                  Self-Employment Tax (SECA 15.3%)
                  <span className="block text-[10px] text-slate-400">
                    SS: {formatCurrency(results.socialSecurityTax)} | Med:{" "}
                    {formatCurrency(results.medicareTax + results.additionalMedicareTax)}
                  </span>
                </span>
                <span className="font-mono font-semibold text-slate-900">
                  {formatCurrency(results.totalSelfEmploymentTax)}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-600">Standard Deduction ({results.taxYear})</span>
                <span className="font-mono text-emeraldTactile-700">
                  -{formatCurrency(results.standardDeduction)}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-600">Federal Taxable Income</span>
                <span className="font-mono font-semibold text-slate-900">
                  {formatCurrency(results.taxableIncome)}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-600">
                  Federal Income Tax (Effective {results.effectiveFederalIncomeRate}%)
                </span>
                <span className="font-mono font-semibold text-slate-900">
                  {formatCurrency(results.federalIncomeTax)}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-600">
                  {results.stateName} Income Tax
                </span>
                <span className="font-mono font-semibold text-slate-900">
                  {formatCurrency(results.stateTaxAmount)}
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowBracketDetails(!showBracketDetails)}
              className="mt-3 text-[11px] font-semibold text-emeraldTactile underline flex items-center gap-1"
            >
              {showBracketDetails ? "Hide Bracket Tiers" : "Show Marginal Bracket Breakdown"}
            </button>

            {showBracketDetails && (
              <div className="mt-3 space-y-1.5 rounded-lg bg-[#FBFBF9] p-2.5 border border-[#EAEAE3] text-[11px] font-mono">
                {results.federalBrackets
                  .filter((b) => b.taxableInBracket > 0)
                  .map((b, i) => (
                    <div key={i} className="flex justify-between text-slate-600">
                      <span>{(b.bracketRate * 100).toFixed(0)}% Bracket:</span>
                      <span>
                        {formatCurrency(b.taxableInBracket)} @ {(b.bracketRate * 100).toFixed(0)}% ={" "}
                        <strong className="text-slate-900">{formatCurrency(b.taxForBracket)}</strong>
                      </span>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Quarterly Estimated Tax Schedule */}
          <div className="rounded-2xl border border-[#EAEAE3] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-spruce-800" />
                  <h3 className="text-xs font-bold tracking-wider uppercase text-slate-700">
                    Estimated Quarterly Schedule (IRS 1040-ES)
                  </h3>
                </div>
                {results.isDualIncome && (
                  <p className="mt-0.5 text-[10px] text-slate-500">
                    Calibrated specifically for 1099 freelance liability (W-2 payroll withholdings handled by employer)
                  </p>
                )}
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              {results.quarterlyPayments.map((q) => (
                <div
                  key={q.quarter}
                  className="rounded-lg border border-[#EAEAE3] bg-[#FBFBF9] p-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-spruce-800">{q.quarter}</span>
                    <span className="text-[10px] text-slate-500">{q.periodLabel}</span>
                  </div>
                  <div className="mt-1 font-mono text-sm font-bold text-slate-900">
                    {formatCurrency(q.amount)}
                  </div>
                  <div className="text-[10px] text-amberWarm-700 font-medium">Due: {q.dueDate}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Local-First Client Storage & Export (100% Device Private) */}
          <div className="rounded-2xl border border-emeraldTactile-200 bg-emeraldTactile-50/50 p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emeraldTactile-700" />
                <h3 className="text-xs font-bold tracking-wider uppercase text-emeraldTactile-900">
                  Local-First Device Privacy
                </h3>
              </div>
              <span className="inline-flex items-center rounded-full bg-emeraldTactile-100 px-2 py-0.5 text-[10px] font-semibold text-emeraldTactile-800">
                Zero Cloud Storage
              </span>
            </div>
            <p className="mt-1 text-[11px] leading-relaxed text-slate-600">
              Tax figures stay 100% on this browser. Save your scenario locally or export directly without server transmission.
            </p>

            {savedNotification && (
              <div className="mt-2.5 rounded-lg bg-emeraldTactile-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs">
                {savedNotification}
              </div>
            )}

            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={saveToLocalStorage}
                className="flex items-center gap-1.5 rounded-lg bg-spruce-800 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-spruce-700"
              >
                <Save className="h-3.5 w-3.5" />
                <span>Save to Device</span>
              </button>

              {hasSavedScenario && (
                <>
                  <button
                    onClick={loadFromLocalStorage}
                    className="flex items-center gap-1.5 rounded-lg border border-[#DCDCD2] bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 transition hover:bg-[#F4F4F0]"
                  >
                    <span>Restore Saved</span>
                  </button>
                  <button
                    onClick={clearLocalStorage}
                    className="flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                    title="Clear saved data"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Reset</span>
                  </button>
                </>
              )}

              <div className="flex items-center gap-1 ml-auto">
                <button
                  onClick={exportAsCsv}
                  className="flex items-center gap-1 rounded-lg border border-[#DCDCD2] bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-[#F4F4F0]"
                  title="Export Schedule SE & Tax Breakdown as CSV"
                >
                  <Download className="h-3 w-3 text-slate-500" />
                  <span>CSV</span>
                </button>
                <button
                  onClick={exportAsJson}
                  className="flex items-center gap-1 rounded-lg border border-[#DCDCD2] bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-[#F4F4F0]"
                  title="Export Full Calculation JSON"
                >
                  <Download className="h-3 w-3 text-slate-500" />
                  <span>JSON</span>
                </button>
              </div>
            </div>
          </div>

          {/* Share & Print Actions */}
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

            <button
              onClick={() => window.print()}
              className="flex items-center justify-center gap-2 rounded-xl border border-[#DCDCD2] bg-white px-4 py-2.5 text-xs font-semibold text-slate-800 transition hover:bg-[#F4F4F0]"
              title="Print Tax Summary"
            >
              <Printer className="h-3.5 w-3.5 text-slate-500" />
              <span>Print</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
