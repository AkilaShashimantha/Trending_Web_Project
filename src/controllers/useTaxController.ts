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

  return {
    inputs,
    results,
    updateInput,
    applyPreset,
    presets: TAX_PRESETS,
    copyShareableLink,
    copiedShareUrl,
  };
}
