"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { calculatePaymentFees } from "../lib/engines/feeEngine";
import {
  FeeCalculationResult,
  FeeInputs,
  PaymentProvider,
  TransactionType,
} from "../models/fee.model";

export const FEE_PRESETS: {
  label: string;
  description: string;
  values: Partial<FeeInputs>;
}[] = [
  {
    label: "Freelance Project Milestone ($2,500)",
    description: "Standard domestic client project payment via Stripe",
    values: {
      invoiceAmount: 2500,
      provider: "stripe",
      transactionType: "domestic_standard",
      monthlyVolume: 10000,
    },
  },
  {
    label: "Overseas Client Wire ($8,000)",
    description: "International client with cross-border currency conversion",
    values: {
      invoiceAmount: 8000,
      provider: "wise",
      transactionType: "international",
      monthlyVolume: 24000,
    },
  },
  {
    label: "SaaS Monthly Subscription ($49)",
    description: "High-volume recurring consumer or B2B payments",
    values: {
      invoiceAmount: 49,
      provider: "stripe",
      transactionType: "domestic_standard",
      monthlyVolume: 25000,
    },
  },
  {
    label: "Micro-Consulting Call ($150)",
    description: "1-on-1 advisory booking via PayPal or Square",
    values: {
      invoiceAmount: 150,
      provider: "paypal",
      transactionType: "domestic_standard",
      monthlyVolume: 3000,
    },
  },
];

const DEFAULT_FEE_INPUTS: FeeInputs = {
  invoiceAmount: 2500,
  provider: "stripe",
  transactionType: "domestic_standard",
  chargebackBufferPercent: 0.5,
  monthlyVolume: 15000,
};

export function useFeeController(initialOverrides?: Partial<FeeInputs>) {
  const [inputs, setInputs] = useState<FeeInputs>({
    ...DEFAULT_FEE_INPUTS,
    ...initialOverrides,
  });

  const [copiedShareUrl, setCopiedShareUrl] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.location.search) return;
    try {
      const params = new URLSearchParams(window.location.search);
      const updates: Partial<FeeInputs> = {};
      if (params.has("amount")) updates.invoiceAmount = Math.max(0, Number(params.get("amount")) || 0);
      if (params.has("provider")) {
        const p = params.get("provider") as PaymentProvider;
        if (["stripe", "paypal", "wise", "square"].includes(p)) updates.provider = p;
      }
      if (params.has("type")) {
        const t = params.get("type") as TransactionType;
        if (["domestic_standard", "international", "currency_conversion", "micropayments", "in_person"].includes(t)) {
          updates.transactionType = t;
        }
      }
      if (params.has("buffer")) updates.chargebackBufferPercent = Math.max(0, Number(params.get("buffer")) || 0);
      if (params.has("vol")) updates.monthlyVolume = Math.max(0, Number(params.get("vol")) || 0);

      if (Object.keys(updates).length > 0) {
        setInputs((prev) => ({ ...prev, ...updates }));
      }
    } catch {
      // Ignore query parse error
    }
  }, []);

  const updateInput = useCallback(
    <K extends keyof FeeInputs>(key: K, value: FeeInputs[K]) => {
      setInputs((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  const applyPreset = useCallback((preset: Partial<FeeInputs>) => {
    setInputs((prev) => ({
      ...prev,
      ...preset,
    }));
  }, []);

  const results: FeeCalculationResult = useMemo(() => {
    return calculatePaymentFees(inputs);
  }, [inputs]);

  const copyShareableLink = useCallback(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams();
    params.set("amount", inputs.invoiceAmount.toString());
    params.set("provider", inputs.provider);
    params.set("type", inputs.transactionType);
    params.set("buffer", inputs.chargebackBufferPercent.toString());
    params.set("vol", inputs.monthlyVolume.toString());

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
    presets: FEE_PRESETS,
    copyShareableLink,
    copiedShareUrl,
  };
}
