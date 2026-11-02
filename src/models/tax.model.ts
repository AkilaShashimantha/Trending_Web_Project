import { z } from "zod";

export const FilingStatusSchema = z.enum([
  "single",
  "married_joint",
  "married_separate",
  "head_of_household",
]);

export type FilingStatus = z.infer<typeof FilingStatusSchema>;

export const TaxYearSchema = z.enum(["2024", "2025"]);
export type TaxYear = z.infer<typeof TaxYearSchema>;

export const TaxInputsSchema = z.object({
  taxYear: TaxYearSchema.default("2025"),
  filingStatus: FilingStatusSchema.default("single"),
  gross1099Income: z.number().min(0, "Income must be non-negative").default(95000),
  w2Income: z.number().min(0).default(0),
  businessExpenses: z.number().min(0).default(8500),
  homeOfficeDeduction: z.number().min(0).default(1500),
  healthInsurancePremiums: z.number().min(0).default(3600),
  sepIraContribution: z.number().min(0).default(4000),
  otherDeductions: z.number().min(0).default(0),
  stateCode: z.string().default("CA"),
  customStateTaxRate: z.number().min(0).max(100).optional(),
});

export type TaxInputs = z.infer<typeof TaxInputsSchema>;

export interface QuarterlyPayment {
  quarter: string;
  dueDate: string;
  amount: number;
  periodLabel: string;
}

export interface TaxBracketBreakdown {
  bracketRate: number;
  min: number;
  max: number | null;
  taxableInBracket: number;
  taxForBracket: number;
}

export interface TaxCalculationResult {
  taxYear: TaxYear;
  filingStatus: FilingStatus;
  grossRevenue: number;
  totalExpenses: number;
  netBusinessProfit: number;
  
  // Self-Employment Tax Breakdown (Schedule SE)
  seTaxableEarnings: number; // 92.35%
  socialSecurityTax: number;
  medicareTax: number;
  additionalMedicareTax: number;
  totalSelfEmploymentTax: number;
  deductibleSeTax: number; // 50% deduction for AGI

  // Adjusted Gross Income & Deductions
  adjustedGrossIncome: number;
  standardDeduction: number;
  qbiDeduction: number; // Section 199A (20% of net profit / taxable income limit)
  taxableIncome: number;

  // Federal Income Tax
  federalIncomeTax: number;
  effectiveFederalIncomeRate: number;
  federalBrackets: TaxBracketBreakdown[];

  // State Tax
  stateCode: string;
  stateName: string;
  stateTaxAmount: number;
  effectiveStateRate: number;

  // Grand Totals & Take Home
  totalEstimatedTax: number; // Freelance 1099 tax obligation (SE tax + marginal federal + marginal state)
  overallEffectiveRate: number;
  takeHomePay: number; // Freelance net take-home
  monthlyNetIncome: number;

  // Dual Income & Combined Household Metrics
  isDualIncome: boolean;
  w2Income: number;
  w2TaxWithheldEstimate: number; // Estimated baseline taxes withheld on W-2 wages
  combinedTotalIncome: number; // Total gross income (W2 + net 1099 profit)
  combinedTotalTax: number; // Combined annual tax across W-2 & 1099
  combinedTakeHome: number; // Total household net take-home pay
  marginalFederalTaxOn1099: number; // Additional federal income tax caused by 1099 profit
  marginalStateTaxOn1099: number; // Additional state tax caused by 1099 profit

  // Estimated Quarterly Schedule (Form 1040-ES)
  quarterlyPayments: QuarterlyPayment[];
}
