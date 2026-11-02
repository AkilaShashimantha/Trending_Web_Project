import { z } from "zod";

export const CompoundFrequencySchema = z.enum(["daily", "monthly", "annually"]);
export type CompoundFrequency = z.infer<typeof CompoundFrequencySchema>;

export const HysaInputsSchema = z.object({
  initialDeposit: z.number().min(0).default(20000),
  monthlyContribution: z.number().min(0).default(800),
  annualPercentageYield: z.number().min(0.01).max(25).default(4.75),
  inflationRate: z.number().min(0).max(20).default(2.8),
  taxBracketPercent: z.number().min(0).max(50).default(24),
  horizonYears: z.number().int().min(1).max(40).default(10),
  compoundFrequency: CompoundFrequencySchema.default("monthly"),
});

export type HysaInputs = z.infer<typeof HysaInputsSchema>;

export interface YearlyHysaMilestone {
  year: number;
  totalPrincipalContributed: number;
  nominalGrossBalance: number;
  nominalTaxAdjustedBalance: number;
  realPurchasingPowerBalance: number;
  interestEarnedThatYearPreTax: number;
  cumulativeInterestEarnedPreTax: number;
  taxDragCumulative: number;
  purchasingPowerLossFromInflation: number;
}

export interface HysaCalculationResult {
  inputs: HysaInputs;
  finalNominalGrossBalance: number;
  finalTaxAdjustedBalance: number;
  finalRealPurchasingPower: number;
  totalPrincipalContributed: number;
  totalInterestEarnedGross: number;
  totalTaxDrag: number;
  totalInflationErosion: number;
  netRealReturnPercent: number;
  milestones: YearlyHysaMilestone[];
  verdict: {
    beatsInflation: boolean;
    realGainOrLoss: number;
    purchasingPowerSummary: string;
  };
}
