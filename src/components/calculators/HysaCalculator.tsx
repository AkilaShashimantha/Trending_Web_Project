"use client";

import React, { useState } from "react";
import { useHysaController } from "../../controllers/useHysaController";
import { formatCurrency, formatPercent } from "../../lib/utils";
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  Copy,
  DollarSign,
  HelpCircle,
  Percent,
  ShieldCheck,
  Table,
  TrendingUp,
} from "lucide-react";

export function HysaCalculator() {
  const {
    inputs,
    results,
    updateInput,
    applyPreset,
    presets,
    copyShareableLink,
    copiedShareUrl,
  } = useHysaController();

  const [showTableFull, setShowTableFull] = useState(false);

  return (
    <div className="mx-auto max-w-7xl">
      {/* Preset Pills */}
      <div className="mb-8">
        <div className="mb-2.5 flex items-center justify-between">
          <span className="text-xs font-semibold tracking-wider uppercase text-spruce-800">
            Real-World Wealth Targets
          </span>
          <span className="text-[11px] text-slate-500">1-click calibrate savings benchmarks</span>
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
            <h2 className="text-lg font-bold text-slate-900">Savings &amp; Macro Parameters</h2>
            <p className="text-xs text-slate-500">
              Model compound yield against real-world inflation and 1099-INT tax drag
            </p>

            <div className="mt-6 space-y-6">
              {/* Initial Deposit */}
              <div>
                <div className="flex items-center justify-between text-xs">
                  <label className="font-semibold text-slate-800">Initial Deposit (Starting Balance)</label>
                  <span className="font-mono text-sm font-bold text-spruce-800">
                    {formatCurrency(inputs.initialDeposit)}
                  </span>
                </div>
                <div className="relative mt-2">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    $
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    value={inputs.initialDeposit || ""}
                    onChange={(e) =>
                      updateInput("initialDeposit", Math.max(0, Number(e.target.value)))
                    }
                    className="w-full rounded-lg border border-[#E2E8F0] bg-[#FBFBF9] py-2 pl-7 pr-3 font-mono text-sm font-semibold text-slate-900 focus:border-emeraldTactile focus:bg-white focus:outline-none"
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max="150000"
                  step="1000"
                  value={inputs.initialDeposit}
                  onChange={(e) => updateInput("initialDeposit", Number(e.target.value))}
                  className="mt-3 w-full accent-emeraldTactile"
                />
              </div>

              {/* Monthly Contribution */}
              <div>
                <div className="flex items-center justify-between text-xs">
                  <label className="font-semibold text-slate-800">Monthly Deposit / Top-up</label>
                  <span className="font-mono text-sm font-bold text-spruce-800">
                    {formatCurrency(inputs.monthlyContribution)} / month
                  </span>
                </div>
                <div className="relative mt-2">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    $
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="50"
                    value={inputs.monthlyContribution || ""}
                    onChange={(e) =>
                      updateInput("monthlyContribution", Math.max(0, Number(e.target.value)))
                    }
                    className="w-full rounded-lg border border-[#E2E8F0] bg-[#FBFBF9] py-2 pl-7 pr-3 font-mono text-sm font-semibold text-slate-900 focus:border-emeraldTactile focus:bg-white focus:outline-none"
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max="5000"
                  step="50"
                  value={inputs.monthlyContribution}
                  onChange={(e) => updateInput("monthlyContribution", Number(e.target.value))}
                  className="mt-3 w-full accent-emeraldTactile"
                />
              </div>

              {/* APY Slider */}
              <div className="rounded-xl border border-[#F4F4F0] bg-[#FBFBF9] p-4">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <label className="font-semibold text-slate-800">HYSA Annual Percentage Yield (APY)</label>
                    <p className="text-[11px] text-slate-500">Top market yields currently range 4.25% - 5.25%</p>
                  </div>
                  <span className="font-mono text-base font-extrabold text-emeraldTactile">
                    {inputs.annualPercentageYield.toFixed(2)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="8.0"
                  step="0.05"
                  value={inputs.annualPercentageYield}
                  onChange={(e) =>
                    updateInput("annualPercentageYield", Number(e.target.value))
                  }
                  className="mt-3 w-full accent-emeraldTactile"
                />
              </div>

              {/* Inflation Rate & Tax Bracket */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <label className="font-semibold text-slate-800">Expected Inflation</label>
                    <span className="font-mono font-bold text-amberWarm-700">
                      {inputs.inflationRate.toFixed(1)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="7.0"
                    step="0.1"
                    value={inputs.inflationRate}
                    onChange={(e) => updateInput("inflationRate", Number(e.target.value))}
                    className="mt-2 w-full accent-amberWarm-600"
                  />
                  <span className="text-[10px] text-slate-400">CPI annual baseline assumption</span>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs">
                    <label className="font-semibold text-slate-800">Tax Bracket (1099-INT)</label>
                    <span className="font-mono font-bold text-slate-800">
                      {inputs.taxBracketPercent}%
                    </span>
                  </div>
                  <select
                    value={inputs.taxBracketPercent}
                    onChange={(e) =>
                      updateInput("taxBracketPercent", Number(e.target.value))
                    }
                    className="mt-1.5 w-full rounded-lg border border-[#E2E8F0] bg-[#FBFBF9] px-3 py-1.5 text-xs font-semibold text-slate-900 focus:border-emeraldTactile focus:bg-white focus:outline-none"
                  >
                    <option value={10}>10% Marginal Bracket</option>
                    <option value={12}>12% Marginal Bracket</option>
                    <option value={22}>22% Marginal Bracket</option>
                    <option value={24}>24% Marginal Bracket (Standard)</option>
                    <option value={32}>32% Marginal Bracket</option>
                    <option value={35}>35% Marginal Bracket</option>
                    <option value={37}>37% Marginal Bracket</option>
                  </select>
                  <span className="text-[10px] text-slate-400">HYSA interest taxed as ordinary income</span>
                </div>
              </div>

              {/* Time Horizon */}
              <div>
                <div className="flex items-center justify-between text-xs">
                  <label className="font-semibold text-slate-800">Time Horizon</label>
                  <span className="font-mono font-bold text-spruce-800 text-sm">
                    {inputs.horizonYears} {inputs.horizonYears === 1 ? "Year" : "Years"}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={inputs.horizonYears}
                  onChange={(e) => updateInput("horizonYears", Number(e.target.value))}
                  className="mt-2 w-full accent-emeraldTactile"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>1 yr</span>
                  <span>5 yrs</span>
                  <span>10 yrs</span>
                  <span>20 yrs</span>
                  <span>30 yrs</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Output: Results & Calculations (40% on desktop = 5 cols) */}
        <div className="space-y-6 lg:col-span-5">
          {/* Real Purchasing Power Verdict Card */}
          <div
            className={`rounded-2xl border-2 p-6 shadow-md transition-all ${
              results.verdict.beatsInflation
                ? "border-emeraldTactile-500/80 bg-gradient-to-br from-emeraldTactile-50 via-white to-parchment-100"
                : "border-amberWarm-500/80 bg-gradient-to-br from-amberWarm-50 via-white to-parchment-100"
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                  results.verdict.beatsInflation
                    ? "bg-emeraldTactile-100 text-emeraldTactile-800"
                    : "bg-amberWarm-100 text-amberWarm-800"
                }`}
              >
                {results.verdict.beatsInflation ? (
                  <ShieldCheck className="h-3.5 w-3.5" />
                ) : (
                  <AlertTriangle className="h-3.5 w-3.5" />
                )}
                <span>
                  {results.verdict.beatsInflation
                    ? "Purchasing Power Beat"
                    : "Inflation Erosion Warning"}
                </span>
              </span>
              <span className="font-mono text-xs font-bold text-slate-600">
                {results.netRealReturnPercent >= 0 ? "+" : ""}
                {results.netRealReturnPercent}% Real Return
              </span>
            </div>

            <div className="mt-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Real Purchasing Power (Inflation-Adjusted)
              </span>
              <div className="mt-1 font-mono text-3xl font-extrabold tracking-tight text-spruce-900 sm:text-4xl">
                {formatCurrency(results.finalRealPurchasingPower)}
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-600">
                {results.verdict.purchasingPowerSummary}
              </p>
            </div>
          </div>

          {/* Nominal Balance Comparison Card */}
          <div className="rounded-2xl border border-spruce-700 bg-spruce-800 p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold tracking-wider uppercase text-emeraldTactile-300">
                Nominal Account Value (End of Year {inputs.horizonYears})
              </span>
              <span className="rounded-full bg-spruce-700 px-2.5 py-0.5 font-mono text-xs text-emerald-200">
                Pre-Tax Nominal
              </span>
            </div>

            <div className="mt-3">
              <span className="font-mono text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                {formatCurrency(results.finalNominalGrossBalance)}
              </span>
              <div className="mt-2 grid grid-cols-2 gap-3 border-t border-spruce-700/60 pt-3 text-xs font-mono">
                <div>
                  <span className="block text-slate-400">Total Deposits:</span>
                  <span className="font-semibold text-slate-100">
                    {formatCurrency(results.totalPrincipalContributed)}
                  </span>
                </div>
                <div>
                  <span className="block text-slate-400">Gross Interest Earned:</span>
                  <span className="font-semibold text-emerald-300">
                    +{formatCurrency(results.totalInterestEarnedGross)}
                  </span>
                </div>
                <div>
                  <span className="block text-slate-400">IRS Tax Drag ({inputs.taxBracketPercent}%):</span>
                  <span className="font-semibold text-rose-300">
                    -{formatCurrency(results.totalTaxDrag)}
                  </span>
                </div>
                <div>
                  <span className="block text-slate-400">Inflation Erosion Loss:</span>
                  <span className="font-semibold text-amberWarm-400">
                    -{formatCurrency(results.totalInflationErosion)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Year-by-Year Milestone Table Preview */}
          <div className="rounded-2xl border border-[#EAEAE3] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Table className="h-4 w-4 text-spruce-800" />
                <h3 className="text-xs font-bold tracking-wider uppercase text-slate-700">
                  Yearly Growth Trajectory
                </h3>
              </div>
              <button
                onClick={() => setShowTableFull(!showTableFull)}
                className="text-[11px] font-semibold text-emeraldTactile underline"
              >
                {showTableFull ? "Show Less" : "View All Years"}
              </button>
            </div>

            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-left text-[11px]">
                <thead>
                  <tr className="border-b border-[#F4F4F0] text-slate-400 font-mono">
                    <th className="py-1.5">Yr</th>
                    <th className="py-1.5 text-right">Contributed</th>
                    <th className="py-1.5 text-right">Nominal</th>
                    <th className="py-1.5 text-right">Real Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F4F4F0] font-mono">
                  {results.milestones
                    .slice(0, showTableFull ? results.milestones.length : 5)
                    .map((m) => (
                      <tr key={m.year} className="hover:bg-[#FBFBF9]">
                        <td className="py-1.5 font-bold text-slate-700">Y{m.year}</td>
                        <td className="py-1.5 text-right text-slate-500">
                          {formatCurrency(m.totalPrincipalContributed)}
                        </td>
                        <td className="py-1.5 text-right font-semibold text-slate-900">
                          {formatCurrency(m.nominalGrossBalance)}
                        </td>
                        <td
                          className={`py-1.5 text-right font-bold ${
                            m.realPurchasingPowerBalance >= m.totalPrincipalContributed
                              ? "text-emeraldTactile-700"
                              : "text-amberWarm-700"
                          }`}
                        >
                          {formatCurrency(m.realPurchasingPowerBalance)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
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
