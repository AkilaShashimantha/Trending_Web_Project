import { z } from "zod";

export const PaymentProviderSchema = z.enum(["stripe", "paypal", "wise", "square"]);
export type PaymentProvider = z.infer<typeof PaymentProviderSchema>;

export const TransactionTypeSchema = z.enum([
  "domestic_standard",
  "international",
  "currency_conversion",
  "micropayments",
  "in_person",
]);
export type TransactionType = z.infer<typeof TransactionTypeSchema>;

export const FeeInputsSchema = z.object({
  invoiceAmount: z.number().min(0.01, "Amount must be at least $0.01").default(2500),
  provider: PaymentProviderSchema.default("stripe"),
  transactionType: TransactionTypeSchema.default("domestic_standard"),
  chargebackBufferPercent: z.number().min(0).max(10).default(0.5),
  monthlyVolume: z.number().min(0).default(15000),
});

export type FeeInputs = z.infer<typeof FeeInputsSchema>;

export interface SingleProviderFeeResult {
  provider: PaymentProvider;
  providerName: string;
  percentageRate: number;
  fixedFee: number;
  totalFee: number;
  netPayout: number;
  effectiveRatePercent: number;
  reverseInvoiceAmount: number; // what to charge client to get net exact invoiceAmount
  annualLossAtVolume: number;
  recommendedUse: string;
}

export interface FeeCalculationResult {
  inputs: FeeInputs;
  selectedResult: SingleProviderFeeResult;
  chargebackReserveAmount: number;
  netAfterReserve: number;
  comparisons: SingleProviderFeeResult[];
  savingsVersusWorst: number;
  reverseAmountFormulaExplanation: string;
}
