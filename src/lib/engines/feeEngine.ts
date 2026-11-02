import {
  FeeCalculationResult,
  FeeInputs,
  PaymentProvider,
  SingleProviderFeeResult,
  TransactionType,
} from "../../models/fee.model";

interface ProviderRateConfig {
  percentageRate: number; // e.g. 0.029
  fixedFee: number; // e.g. 0.30
  providerName: string;
  recommendedUse: string;
}

const PROVIDER_RATES: Record<
  PaymentProvider,
  Record<TransactionType, ProviderRateConfig>
> = {
  stripe: {
    domestic_standard: {
      percentageRate: 0.029,
      fixedFee: 0.30,
      providerName: "Stripe",
      recommendedUse: "Best for SaaS, developer integrations, digital subscriptions",
    },
    international: {
      percentageRate: 0.044, // +1.5% international fee
      fixedFee: 0.30,
      providerName: "Stripe",
      recommendedUse: "Global credit & debit cards with 1.5% cross-border surcharge",
    },
    currency_conversion: {
      percentageRate: 0.054, // +1.5% intl + 1.0% FX
      fixedFee: 0.30,
      providerName: "Stripe",
      recommendedUse: "Cross-border with automated currency settlement exchange",
    },
    micropayments: {
      percentageRate: 0.050,
      fixedFee: 0.10,
      providerName: "Stripe",
      recommendedUse: "Optimized for transactions under $10 (reduced fixed fee)",
    },
    in_person: {
      percentageRate: 0.027,
      fixedFee: 0.05,
      providerName: "Stripe Terminal",
      recommendedUse: "Point-of-sale card readers and physical kiosks",
    },
  },
  paypal: {
    domestic_standard: {
      percentageRate: 0.0299,
      fixedFee: 0.49,
      providerName: "PayPal (Checkout)",
      recommendedUse: "Standard PayPal checkout button & buyer protection",
    },
    international: {
      percentageRate: 0.0449, // +1.50% cross border
      fixedFee: 0.49,
      providerName: "PayPal",
      recommendedUse: "Cross-border PayPal accounts and overseas buyers",
    },
    currency_conversion: {
      percentageRate: 0.0549, // +1.50% + 1.0% conversion
      fixedFee: 0.49,
      providerName: "PayPal",
      recommendedUse: "PayPal conversion spread across different regional currencies",
    },
    micropayments: {
      percentageRate: 0.0499,
      fixedFee: 0.09,
      providerName: "PayPal Micropayments",
      recommendedUse: "Best for small digital downloads under $12",
    },
    in_person: {
      percentageRate: 0.0229,
      fixedFee: 0.09,
      providerName: "PayPal Zettle",
      recommendedUse: "Mobile card reader and in-person QR payments",
    },
  },
  wise: {
    domestic_standard: {
      percentageRate: 0.0043,
      fixedFee: 0.39,
      providerName: "Wise Business",
      recommendedUse: "Direct ACH / local bank rails with ultra-low fees",
    },
    international: {
      percentageRate: 0.0065,
      fixedFee: 0.50,
      providerName: "Wise Business",
      recommendedUse: "Lowest-cost cross-border B2B invoicing using mid-market exchange rate",
    },
    currency_conversion: {
      percentageRate: 0.0085,
      fixedFee: 0.50,
      providerName: "Wise Business",
      recommendedUse: "Real mid-market FX rates with zero hidden markups",
    },
    micropayments: {
      percentageRate: 0.0120,
      fixedFee: 0.30,
      providerName: "Wise Business",
      recommendedUse: "Direct bank debit for micro-transfers",
    },
    in_person: {
      percentageRate: 0.0043,
      fixedFee: 0.39,
      providerName: "Wise Business",
      recommendedUse: "Local direct deposit & electronic invoice payments",
    },
  },
  square: {
    domestic_standard: {
      percentageRate: 0.029,
      fixedFee: 0.30,
      providerName: "Square (Invoicing / Online)",
      recommendedUse: "Invoices, web store, and eCommerce APIs",
    },
    international: {
      percentageRate: 0.035,
      fixedFee: 0.30,
      providerName: "Square",
      recommendedUse: "International cards billed through Square checkout",
    },
    currency_conversion: {
      percentageRate: 0.045,
      fixedFee: 0.30,
      providerName: "Square",
      recommendedUse: "Multi-currency invoicing with standard conversion spread",
    },
    micropayments: {
      percentageRate: 0.035,
      fixedFee: 0.15,
      providerName: "Square",
      recommendedUse: "Quick transactions at counters or small ticket items",
    },
    in_person: {
      percentageRate: 0.026,
      fixedFee: 0.10,
      providerName: "Square (POS)",
      recommendedUse: "Physical card tap, chip, or swipe on Square hardware",
    },
  },
};

/**
 * Calculates payment processing fees, net take-home, reverse invoice requirement,
 * and multi-provider cross-comparisons.
 */
export function calculatePaymentFees(inputs: FeeInputs): FeeCalculationResult {
  const { invoiceAmount, provider, transactionType, chargebackBufferPercent, monthlyVolume } =
    inputs;

  const allProviders: PaymentProvider[] = ["stripe", "paypal", "wise", "square"];

  const comparisons: SingleProviderFeeResult[] = allProviders.map((p) => {
    const config = PROVIDER_RATES[p][transactionType];
    const isZero = invoiceAmount <= 0;
    const percentageCost = invoiceAmount * config.percentageRate;
    const totalFee = isZero ? 0 : roundCurrency(percentageCost + config.fixedFee);
    const netPayout = isZero ? 0 : roundCurrency(Math.max(0, invoiceAmount - totalFee));
    const effectiveRatePercent =
      invoiceAmount > 0 ? roundPercentage((totalFee / invoiceAmount) * 100) : 0;

    // Reverse calculation: Amount = (DesiredPayout + fixedFee) / (1 - rate)
    const reverseInvoiceAmount = isZero
      ? 0
      : roundCurrency((invoiceAmount + config.fixedFee) / (1 - config.percentageRate));

    // Annual loss projection based on monthly volume
    const annualTransactions =
      invoiceAmount > 0 && monthlyVolume > 0 ? (monthlyVolume / invoiceAmount) * 12 : 0;
    const annualLossAtVolume = roundCurrency(annualTransactions * totalFee);

    return {
      provider: p,
      providerName: config.providerName,
      percentageRate: config.percentageRate,
      fixedFee: config.fixedFee,
      totalFee,
      netPayout,
      effectiveRatePercent,
      reverseInvoiceAmount,
      annualLossAtVolume,
      recommendedUse: config.recommendedUse,
    };
  });

  const selectedResult = comparisons.find((c) => c.provider === provider)!;

  // Chargeback buffer calculation
  const chargebackReserveAmount = roundCurrency(
    invoiceAmount * (chargebackBufferPercent / 100)
  );
  const netAfterReserve = roundCurrency(
    Math.max(0, selectedResult.netPayout - chargebackReserveAmount)
  );

  // Compare versus worst fee among comparisons
  const maxFee = Math.max(...comparisons.map((c) => c.totalFee));
  const savingsVersusWorst = roundCurrency(Math.max(0, maxFee - selectedResult.totalFee));

  const reverseAmountFormulaExplanation = `To receive exactly $${invoiceAmount.toLocaleString(
    "en-US",
    { minimumFractionDigits: 2 }
  )} after ${selectedResult.providerName}'s ${(selectedResult.percentageRate * 100).toFixed(
    2
  )}% + $${selectedResult.fixedFee.toFixed(2)} fee, invoice your client for $${selectedResult.reverseInvoiceAmount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
  })}. Formula: (Desired Net + Fixed Fee) ÷ (1 - Percentage Rate).`;

  return {
    inputs,
    selectedResult,
    chargebackReserveAmount,
    netAfterReserve,
    comparisons,
    savingsVersusWorst,
    reverseAmountFormulaExplanation,
  };
}

function roundCurrency(val: number): number {
  return Math.round((val + Number.EPSILON) * 100) / 100;
}

function roundPercentage(val: number): number {
  return Math.round((val + Number.EPSILON) * 100) / 100;
}
