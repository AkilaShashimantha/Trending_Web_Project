"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { calculateHysaGrowth } from "../lib/engines/hysaEngine";
import {
  CompoundFrequency,
  HysaCalculationResult,
  HysaInputs,
} from "../models/hysa.model";

export const HYSA_PRESETS: {
  label: string;
  description: string;
  values: Partial<HysaInputs>;
}[] = [
  {
    label: "Emergency Fund Fortress ($25k + $500/mo)",
    description: "6 months living expenses parked in top-tier 4.75% HYSA",
    values: {
      initialDeposit: 25000,
      monthlyContribution: 500,
      annualPercentageYield: 4.75,
      inflationRate: 2.8,
      taxBracketPercent: 24,
      horizonYears: 5,
    },
  },
  {
    label: "Home Down Payment Accelerator ($60k + $1,500/mo)",
    description: "Multi-year saving for real estate purchase without stock market volatility",
    values: {
      initialDeposit: 60000,
      monthlyContribution: 1500,
      annualPercentageYield: 5.0,
      inflationRate: 2.5,
      taxBracketPercent: 24,
      horizonYears: 4,
    },
  },
  {
    label: "FIRE Cash Buffer ($100k + $1,000/mo)",
    description: "10-year treasury/HYSA liquidity runway for early retirement",
    values: {
      initialDeposit: 100000,
      monthlyContribution: 1000,
      annualPercentageYield: 4.5,
      inflationRate: 3.0,
      taxBracketPercent: 32,
      horizonYears: 10,
    },
  },
  {
    label: "Starter Creator Stash ($5k + $300/mo)",
    description: "Building the first $20k safety net from freelance revenue",
    values: {
      initialDeposit: 5000,
      monthlyContribution: 300,
      annualPercentageYield: 4.85,
      inflationRate: 2.8,
      taxBracketPercent: 22,
      horizonYears: 3,
    },
  },
];

const DEFAULT_HYSA_INPUTS: HysaInputs = {
  initialDeposit: 20000,
  monthlyContribution: 800,
  annualPercentageYield: 4.75,
  inflationRate: 2.8,
  taxBracketPercent: 24,
  horizonYears: 10,
  compoundFrequency: "monthly",
};

export function useHysaController(initialOverrides?: Partial<HysaInputs>) {
  const [inputs, setInputs] = useState<HysaInputs>({
    ...DEFAULT_HYSA_INPUTS,
    ...initialOverrides,
  });

  const [copiedShareUrl, setCopiedShareUrl] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.location.search) return;
    try {
      const params = new URLSearchParams(window.location.search);
      const updates: Partial<HysaInputs> = {};
      if (params.has("deposit")) updates.initialDeposit = Math.max(0, Number(params.get("deposit")) || 0);
      if (params.has("monthly")) updates.monthlyContribution = Math.max(0, Number(params.get("monthly")) || 0);
      if (params.has("apy")) updates.annualPercentageYield = Math.max(0, Number(params.get("apy")) || 0);
      if (params.has("inf")) updates.inflationRate = Math.max(0, Number(params.get("inf")) || 0);
      if (params.has("tax")) updates.taxBracketPercent = Math.max(0, Number(params.get("tax")) || 0);
      if (params.has("years")) updates.horizonYears = Math.max(1, Number(params.get("years")) || 1);

      if (Object.keys(updates).length > 0) {
        setInputs((prev) => ({ ...prev, ...updates }));
      }
    } catch {
      // Ignore query parse error
    }
  }, []);

  const updateInput = useCallback(
    <K extends keyof HysaInputs>(key: K, value: HysaInputs[K]) => {
      setInputs((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  const applyPreset = useCallback((preset: Partial<HysaInputs>) => {
    setInputs((prev) => ({
      ...prev,
      ...preset,
    }));
  }, []);

  const results: HysaCalculationResult = useMemo(() => {
    return calculateHysaGrowth(inputs);
  }, [inputs]);

  const copyShareableLink = useCallback(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams();
    params.set("deposit", inputs.initialDeposit.toString());
    params.set("monthly", inputs.monthlyContribution.toString());
    params.set("apy", inputs.annualPercentageYield.toString());
    params.set("inf", inputs.inflationRate.toString());
    params.set("tax", inputs.taxBracketPercent.toString());
    params.set("years", inputs.horizonYears.toString());

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
    presets: HYSA_PRESETS,
    copyShareableLink,
    copiedShareUrl,
  };
}
