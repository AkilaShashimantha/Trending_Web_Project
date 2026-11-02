"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { calculateFreelanceTaxes } from "../lib/engines/taxEngine";
import { FilingStatus, TaxCalculationResult, TaxInputs, TaxYear } from "../models/tax.model";

export const TAX_PRESETS: {
  label: string;
  description: string;
  values: Partial<TaxInputs>;
}[] = [
  {
    label: "Creative Freelancer ($75k)",
    description: "Graphic designer, copywriter, or marketing consultant",
    values: {
      gross1099Income: 75000,
      w2Income: 0,
      businessExpenses: 6500,
      homeOfficeDeduction: 1200,
      healthInsurancePremiums: 3600,
      sepIraContribution: 3000,
      stateCode: "CA",
    },
  },
  {
    label: "Senior Software Contractor ($165k)",
    description: "Full-stack engineer, DevOps, or remote contract architect",
    values: {
      gross1099Income: 165000,
      w2Income: 0,
      businessExpenses: 12000,
      homeOfficeDeduction: 1800,
      healthInsurancePremiums: 5200,
      sepIraContribution: 10000,
      stateCode: "TX", // 0% state income tax
    },
  },
  {
    label: "Agency & Studio Founder ($275k)",
    description: "Boutique digital agency, video producer, high earner",
    values: {
      gross1099Income: 275000,
      w2Income: 0,
      businessExpenses: 34000,
      homeOfficeDeduction: 2400,
      healthInsurancePremiums: 7200,
      sepIraContribution: 22000,
      stateCode: "NY",
    },
  },
  {
    label: "Moonlighter / Hybrid ($40k 1099 + $85k W2)",
    description: "Side-hustle contractor with full-time corporate job",
    values: {
      gross1099Income: 40000,
      w2Income: 85000,
      businessExpenses: 4000,
      homeOfficeDeduction: 1000,
      healthInsurancePremiums: 0, // covered by employer
      sepIraContribution: 2000,
      stateCode: "IL",
    },
  },
];

const DEFAULT_TAX_INPUTS: TaxInputs = {
  taxYear: "2025",
  filingStatus: "single",
  gross1099Income: 95000,
  w2Income: 0,
  businessExpenses: 8500,
  homeOfficeDeduction: 1500,
  healthInsurancePremiums: 3600,
  sepIraContribution: 4000,
  otherDeductions: 0,
  stateCode: "CA",
};

export function useTaxController(initialOverrides?: Partial<TaxInputs>) {
  const [inputs, setInputs] = useState<TaxInputs>({
    ...DEFAULT_TAX_INPUTS,
    ...initialOverrides,
  });

  const [copiedShareUrl, setCopiedShareUrl] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.location.search) return;
    try {
      const params = new URLSearchParams(window.location.search);
      const updates: Partial<TaxInputs> = {};
      if (params.has("year")) {
        const y = params.get("year");
        if (y === "2024" || y === "2025") updates.taxYear = y as TaxYear;
      }
      if (params.has("status")) {
        const s = params.get("status") as FilingStatus;
        if (["single", "married_joint", "married_separate", "head_of_household"].includes(s)) {
          updates.filingStatus = s;
        }
      }
      if (params.has("gross")) updates.gross1099Income = Math.max(0, Number(params.get("gross")) || 0);
      if (params.has("w2")) updates.w2Income = Math.max(0, Number(params.get("w2")) || 0);
      if (params.has("exp")) updates.businessExpenses = Math.max(0, Number(params.get("exp")) || 0);
      if (params.has("home")) updates.homeOfficeDeduction = Math.max(0, Number(params.get("home")) || 0);
      if (params.has("health")) updates.healthInsurancePremiums = Math.max(0, Number(params.get("health")) || 0);
      if (params.has("sep")) updates.sepIraContribution = Math.max(0, Number(params.get("sep")) || 0);
      if (params.has("state")) updates.stateCode = params.get("state") || "CA";

      if (Object.keys(updates).length > 0) {
        setInputs((prev) => ({ ...prev, ...updates }));
      }
    } catch {
      // Ignore query parse error
    }
  }, []);

  const updateInput = useCallback(
    <K extends keyof TaxInputs>(key: K, value: TaxInputs[K]) => {
      setInputs((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  const applyPreset = useCallback((preset: Partial<TaxInputs>) => {
    setInputs((prev) => ({
      ...prev,
      ...preset,
    }));
  }, []);

  const results: TaxCalculationResult = useMemo(() => {
    return calculateFreelanceTaxes(inputs);
  }, [inputs]);

  const copyShareableLink = useCallback(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams();
    params.set("year", inputs.taxYear);
    params.set("status", inputs.filingStatus);
    params.set("gross", inputs.gross1099Income.toString());
    params.set("w2", inputs.w2Income.toString());
    params.set("exp", inputs.businessExpenses.toString());
    params.set("home", inputs.homeOfficeDeduction.toString());
    params.set("health", inputs.healthInsurancePremiums.toString());
    params.set("sep", inputs.sepIraContribution.toString());
    params.set("state", inputs.stateCode);

    const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedShareUrl(true);
      setTimeout(() => setCopiedShareUrl(false), 2500);
    });
  }, [inputs]);

  const [hasSavedScenario, setHasSavedScenario] = useState(false);
  const [savedNotification, setSavedNotification] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (localStorage.getItem("cashpulse_tax_scenario_v1")) {
        setHasSavedScenario(true);
      }
    } catch {
      // Ignore localStorage read errors in restricted contexts
    }
  }, []);

  const saveToLocalStorage = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem("cashpulse_tax_scenario_v1", JSON.stringify(inputs));
      setHasSavedScenario(true);
      setSavedNotification("Saved to this device!");
      setTimeout(() => setSavedNotification(null), 3000);
    } catch {
      setSavedNotification("Failed to save to local storage");
      setTimeout(() => setSavedNotification(null), 3000);
    }
  }, [inputs]);

  const loadFromLocalStorage = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      const data = localStorage.getItem("cashpulse_tax_scenario_v1");
      if (data) {
        const parsed = JSON.parse(data);
        setInputs((prev) => ({ ...prev, ...parsed }));
        setSavedNotification("Restored saved scenario!");
        setTimeout(() => setSavedNotification(null), 3000);
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  const clearLocalStorage = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem("cashpulse_tax_scenario_v1");
      setHasSavedScenario(false);
      setInputs(DEFAULT_TAX_INPUTS);
      setSavedNotification("Reset to defaults");
      setTimeout(() => setSavedNotification(null), 3000);
    } catch {
      // Ignore
    }
  }, []);

  const exportAsJson = useCallback(() => {
    if (typeof window === "undefined") return;
    const exportData = {
      app: "CashPulse FinTech Suite - TaxEstimator Online",
      url: "https://taxestimator.online",
      privacyNotice: "100% Client-Side calculation. Zero data transmitted to remote servers.",
      exportTimestamp: new Date().toISOString(),
      inputs,
      results: {
        taxYear: inputs.taxYear,
        filingStatus: inputs.filingStatus,
        gross1099Income: inputs.gross1099Income,
        netScheduleCProfit: results.netBusinessProfit,
        selfEmploymentTaxScheduleSE: results.totalSelfEmploymentTax,
        qbiDeductionSection199A: results.qbiDeduction,
        taxableIncome: results.taxableIncome,
        federalIncomeTax: results.federalIncomeTax,
        stateIncomeTax: results.stateTaxAmount,
        stateName: results.stateName,
        totalTaxLiability: results.totalEstimatedTax,
        effectiveTaxRatePercent: results.overallEffectiveRate,
        quarterlyVouchers1040ES: results.quarterlyPayments,
      },
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `cashpulse-tax-estimate-${inputs.taxYear}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, [inputs, results]);

  const exportAsCsv = useCallback(() => {
    if (typeof window === "undefined") return;
    const rows = [
      ["CashPulse 1099 Freelance Tax Estimate", `Tax Year ${inputs.taxYear}`],
      ["Export Date", new Date().toLocaleDateString()],
      ["Privacy Assurance", "100% Local Processing - Zero Server Tracking"],
      [],
      ["Line Item", "Amount / Value"],
      ["Tax Year", inputs.taxYear],
      ["Filing Status", inputs.filingStatus],
      ["State", `${results.stateName} (${inputs.stateCode})`],
      ["Gross 1099 Revenue", inputs.gross1099Income.toFixed(2)],
      ["W-2 Salary (Dual-Income)", inputs.w2Income.toFixed(2)],
      ["Schedule C Business Expenses", inputs.businessExpenses.toFixed(2)],
      ["Home Office Deduction", inputs.homeOfficeDeduction.toFixed(2)],
      ["Self-Employed Health Insurance", inputs.healthInsurancePremiums.toFixed(2)],
      ["SEP-IRA / Solo 401(k) Contribution", inputs.sepIraContribution.toFixed(2)],
      ["Net Schedule C Profit", results.netBusinessProfit.toFixed(2)],
      ["Self-Employment Tax (Schedule SE 15.3%)", results.totalSelfEmploymentTax.toFixed(2)],
      ["Section 199A QBI 20% Deduction", results.qbiDeduction.toFixed(2)],
      ["Federal Taxable Income", results.taxableIncome.toFixed(2)],
      ["Federal Income Tax", results.federalIncomeTax.toFixed(2)],
      ["State Income Tax", results.stateTaxAmount.toFixed(2)],
      ["TOTAL ESTIMATED ANNUAL TAX BURDEN", results.totalEstimatedTax.toFixed(2)],
      ["Effective Total Tax Rate", `${results.overallEffectiveRate}%`],
      [],
      ["IRS 1040-ES Quarterly Estimated Vouchers", "Amount", "Due Date"],
      ...results.quarterlyPayments.map((q) => [
        `${q.quarter} (${q.periodLabel})`,
        q.amount.toFixed(2),
        q.dueDate,
      ]),
    ];

    const csvContent = rows
      .map((row) =>
        row
          .map((cell) => {
            const str = String(cell ?? "");
            if (str.includes(",") || str.includes('"') || str.includes("\n")) {
              return `"${str.replace(/"/g, '""')}"`;
            }
            return str;
          })
          .join(",")
      )
      .join("\r\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `cashpulse-tax-estimate-${inputs.taxYear}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }, [inputs, results]);

  return {
    inputs,
    results,
    updateInput,
    applyPreset,
    presets: TAX_PRESETS,
    copyShareableLink,
    copiedShareUrl,
    hasSavedScenario,
    savedNotification,
    saveToLocalStorage,
    loadFromLocalStorage,
    clearLocalStorage,
    exportAsJson,
    exportAsCsv,
  };
}
