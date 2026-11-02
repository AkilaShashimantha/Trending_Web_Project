import {
  FilingStatus,
  QuarterlyPayment,
  TaxBracketBreakdown,
  TaxCalculationResult,
  TaxInputs,
  TaxYear,
} from "../../models/tax.model";

interface FederalBracketConfig {
  rate: number;
  min: number;
  max: number | null;
}

// 2024 Federal Brackets
const FEDERAL_BRACKETS_2024: Record<FilingStatus, FederalBracketConfig[]> = {
  single: [
    { rate: 0.10, min: 0, max: 11600 },
    { rate: 0.12, min: 11600, max: 47150 },
    { rate: 0.22, min: 47150, max: 100525 },
    { rate: 0.24, min: 100525, max: 191950 },
    { rate: 0.32, min: 191950, max: 243725 },
    { rate: 0.35, min: 243725, max: 609350 },
    { rate: 0.37, min: 609350, max: null },
  ],
  married_joint: [
    { rate: 0.10, min: 0, max: 23200 },
    { rate: 0.12, min: 23200, max: 94300 },
    { rate: 0.22, min: 94300, max: 201050 },
    { rate: 0.24, min: 201050, max: 383900 },
    { rate: 0.32, min: 383900, max: 487450 },
    { rate: 0.35, min: 487450, max: 731200 },
    { rate: 0.37, min: 731200, max: null },
  ],
  married_separate: [
    { rate: 0.10, min: 0, max: 11600 },
    { rate: 0.12, min: 11600, max: 47150 },
    { rate: 0.22, min: 47150, max: 100525 },
    { rate: 0.24, min: 100525, max: 191950 },
    { rate: 0.32, min: 191950, max: 243725 },
    { rate: 0.35, min: 243725, max: 365600 },
    { rate: 0.37, min: 365600, max: null },
  ],
  head_of_household: [
    { rate: 0.10, min: 0, max: 16550 },
    { rate: 0.12, min: 16550, max: 63100 },
    { rate: 0.22, min: 63100, max: 100500 },
    { rate: 0.24, min: 100500, max: 191950 },
    { rate: 0.32, min: 191950, max: 243700 },
    { rate: 0.35, min: 243700, max: 609350 },
    { rate: 0.37, min: 609350, max: null },
  ],
};

// 2025 Federal Brackets (IRS Inflation adjustments)
const FEDERAL_BRACKETS_2025: Record<FilingStatus, FederalBracketConfig[]> = {
  single: [
    { rate: 0.10, min: 0, max: 11925 },
    { rate: 0.12, min: 11925, max: 48475 },
    { rate: 0.22, min: 48475, max: 103350 },
    { rate: 0.24, min: 103350, max: 197300 },
    { rate: 0.32, min: 197300, max: 250525 },
    { rate: 0.35, min: 250525, max: 626350 },
    { rate: 0.37, min: 626350, max: null },
  ],
  married_joint: [
    { rate: 0.10, min: 0, max: 23850 },
    { rate: 0.12, min: 23850, max: 96950 },
    { rate: 0.22, min: 96950, max: 206700 },
    { rate: 0.24, min: 206700, max: 394600 },
    { rate: 0.32, min: 394600, max: 501050 },
    { rate: 0.35, min: 501050, max: 751600 },
    { rate: 0.37, min: 751600, max: null },
  ],
  married_separate: [
    { rate: 0.10, min: 0, max: 11925 },
    { rate: 0.12, min: 11925, max: 48475 },
    { rate: 0.22, min: 48475, max: 103350 },
    { rate: 0.24, min: 103350, max: 197300 },
    { rate: 0.32, min: 197300, max: 250525 },
    { rate: 0.35, min: 250525, max: 375800 },
    { rate: 0.37, min: 375800, max: null },
  ],
  head_of_household: [
    { rate: 0.10, min: 0, max: 17000 },
    { rate: 0.12, min: 17000, max: 64850 },
    { rate: 0.22, min: 64850, max: 103350 },
    { rate: 0.24, min: 103350, max: 197300 },
    { rate: 0.32, min: 197300, max: 250500 },
    { rate: 0.35, min: 250500, max: 626350 },
    { rate: 0.37, min: 626350, max: null },
  ],
};

const STANDARD_DEDUCTIONS: Record<TaxYear, Record<FilingStatus, number>> = {
  "2024": {
    single: 14600,
    married_joint: 29200,
    married_separate: 14600,
    head_of_household: 21900,
  },
  "2025": {
    single: 15000,
    married_joint: 30000,
    married_separate: 15000,
    head_of_household: 22500,
  },
};

const SOCIAL_SECURITY_WAGE_BASE: Record<TaxYear, number> = {
  "2024": 168600,
  "2025": 176100,
};

const ADDITIONAL_MEDICARE_THRESHOLDS: Record<FilingStatus, number> = {
  single: 200000,
  married_joint: 250000,
  married_separate: 125000,
  head_of_household: 200000,
};

export interface StateTaxDefinition {
  name: string;
  type: "none" | "flat" | "graduated";
  rate?: number; // for flat
  effectiveEstimate: (taxableIncome: number) => number;
}

export const US_STATE_TAX_DATA: Record<string, StateTaxDefinition> = {
  TX: { name: "Texas", type: "none", effectiveEstimate: () => 0 },
  FL: { name: "Florida", type: "none", effectiveEstimate: () => 0 },
  WA: { name: "Washington", type: "none", effectiveEstimate: () => 0 },
  NV: { name: "Nevada", type: "none", effectiveEstimate: () => 0 },
  WY: { name: "Wyoming", type: "none", effectiveEstimate: () => 0 },
  SD: { name: "South Dakota", type: "none", effectiveEstimate: () => 0 },
  TN: { name: "Tennessee", type: "none", effectiveEstimate: () => 0 },
  IL: {
    name: "Illinois",
    type: "flat",
    rate: 0.0495,
    effectiveEstimate: (inc) => Math.max(0, inc) * 0.0495,
  },
  PA: {
    name: "Pennsylvania",
    type: "flat",
    rate: 0.0307,
    effectiveEstimate: (inc) => Math.max(0, inc) * 0.0307,
  },
  CO: {
    name: "Colorado",
    type: "flat",
    rate: 0.044,
    effectiveEstimate: (inc) => Math.max(0, inc) * 0.044,
  },
  MA: {
    name: "Massachusetts",
    type: "flat",
    rate: 0.05,
    effectiveEstimate: (inc) => Math.max(0, inc) * 0.05,
  },
  NC: {
    name: "North Carolina",
    type: "flat",
    rate: 0.045,
    effectiveEstimate: (inc) => Math.max(0, inc) * 0.045,
  },
  CA: {
    name: "California",
    type: "graduated",
    effectiveEstimate: (inc) => {
      if (inc <= 0) return 0;
      // Representative California progressive tax calculation
      const brackets = [
        { max: 10412, rate: 0.01 },
        { max: 24684, rate: 0.02 },
        { max: 38959, rate: 0.04 },
        { max: 54081, rate: 0.06 },
        { max: 68350, rate: 0.08 },
        { max: 349137, rate: 0.093 },
        { max: 418961, rate: 0.103 },
        { max: 698271, rate: 0.113 },
        { max: Infinity, rate: 0.123 },
      ];
      let tax = 0;
      let prevMax = 0;
      for (const b of brackets) {
        if (inc > prevMax) {
          const taxableSlice = Math.min(inc, b.max) - prevMax;
          tax += taxableSlice * b.rate;
          prevMax = b.max;
        } else {
          break;
        }
      }
      return tax;
    },
  },
  NY: {
    name: "New York",
    type: "graduated",
    effectiveEstimate: (inc) => {
      if (inc <= 0) return 0;
      const brackets = [
        { max: 8500, rate: 0.04 },
        { max: 11700, rate: 0.045 },
        { max: 13900, rate: 0.0525 },
        { max: 80650, rate: 0.055 },
        { max: 215400, rate: 0.06 },
        { max: 1077550, rate: 0.0685 },
        { max: Infinity, rate: 0.0965 },
      ];
      let tax = 0;
      let prevMax = 0;
      for (const b of brackets) {
        if (inc > prevMax) {
          const taxableSlice = Math.min(inc, b.max) - prevMax;
          tax += taxableSlice * b.rate;
          prevMax = b.max;
        } else {
          break;
        }
      }
      return tax;
    },
  },
};

/**
 * Pure zero-dependency 1099 Self-Employment and Federal/State Tax calculation engine.
 */
export function calculateFreelanceTaxes(inputs: TaxInputs): TaxCalculationResult {
  const {
    taxYear,
    filingStatus,
    gross1099Income,
    w2Income,
    businessExpenses,
    homeOfficeDeduction,
    healthInsurancePremiums,
    sepIraContribution,
    otherDeductions,
    stateCode,
    customStateTaxRate,
  } = inputs;

  // 1. Net business profit (Schedule C)
  const totalDirectExpenses = businessExpenses + homeOfficeDeduction;
  const netBusinessProfit = Math.max(0, gross1099Income - totalDirectExpenses);

  // 2. Self-Employment Tax (Schedule SE)
  // IRS Line 4a: 92.35% is subject to SE tax
  const rawSeEarnings = netBusinessProfit * 0.9235;
  // IRS Line 4b: If net earnings from self-employment are less than $400, no SE tax is owed
  const seTaxableEarnings = rawSeEarnings >= 400 ? rawSeEarnings : 0;

  // Social security wage base cap applies after W2 income
  const wageBase = SOCIAL_SECURITY_WAGE_BASE[taxYear];
  const remainingSocialSecurityCap = Math.max(0, wageBase - w2Income);
  const socialSecurityTaxableSE = Math.min(seTaxableEarnings, remainingSocialSecurityCap);
  const socialSecurityTax = socialSecurityTaxableSE * 0.124;

  // Medicare is 2.9% uncapped
  const medicareTax = seTaxableEarnings * 0.029;

  // Additional Medicare tax 0.9% for high earners (IRS Form 8959 Part II)
  const addMedicareThreshold = ADDITIONAL_MEDICARE_THRESHOLDS[filingStatus];
  const remainingThresholdForSE = Math.max(0, addMedicareThreshold - w2Income);
  const seSubjectToAddMedicare = Math.max(0, seTaxableEarnings - remainingThresholdForSE);
  const additionalMedicareTax = seSubjectToAddMedicare * 0.009;

  const totalSelfEmploymentTax = socialSecurityTax + medicareTax + additionalMedicareTax;

  // 3. Deductible Part of SE Tax (50% deduction above the line per IRS Form 1040 Schedule 1)
  const deductibleSeTax = (socialSecurityTax + medicareTax) * 0.5;

  // 4. Adjusted Gross Income (AGI)
  const aboveLineDeductions =
    deductibleSeTax + healthInsurancePremiums + sepIraContribution + otherDeductions;
  const totalGrossIncome = w2Income + netBusinessProfit;
  const adjustedGrossIncome = Math.max(0, totalGrossIncome - aboveLineDeductions);

  // 5. Standard Deduction
  const standardDeduction = STANDARD_DEDUCTIONS[taxYear][filingStatus];

  // 6. Section 199A Qualified Business Income (QBI) Deduction (IRS Form 8995)
  // Under Treas. Reg. § 1.199A-3, QBI is net profit reduced by trade or business deductions
  // (deductible SE tax, self-employed health insurance, SEP/retirement plans)
  const taxableBeforeQBI = Math.max(0, adjustedGrossIncome - standardDeduction);
  const qbiIncomeBase = Math.max(
    0,
    netBusinessProfit - deductibleSeTax - healthInsurancePremiums - sepIraContribution
  );
  const rawQbi = qbiIncomeBase * 0.20;
  const qbiCap = taxableBeforeQBI * 0.20;
  const qbiDeduction = Math.min(rawQbi, qbiCap);

  // 7. Final Federal Taxable Income
  const taxableIncome = Math.max(0, taxableBeforeQBI - qbiDeduction);

  // 8. Federal Income Tax Brackets calculation
  const brackets =
    taxYear === "2025"
      ? FEDERAL_BRACKETS_2025[filingStatus]
      : FEDERAL_BRACKETS_2024[filingStatus];

  const computeFederalTaxForIncome = (income: number): { totalTax: number; breakdown: TaxBracketBreakdown[] } => {
    let tax = 0;
    const breakdown: TaxBracketBreakdown[] = [];
    for (const b of brackets) {
      if (income > b.min) {
        const topOfBracket = b.max !== null ? Math.min(income, b.max) : income;
        const taxableSlice = Math.max(0, topOfBracket - b.min);
        const taxForBracket = taxableSlice * b.rate;
        tax += taxForBracket;

        breakdown.push({
          bracketRate: b.rate,
          min: b.min,
          max: b.max,
          taxableInBracket: roundCurrency(taxableSlice),
          taxForBracket: roundCurrency(taxForBracket),
        });
      } else {
        breakdown.push({
          bracketRate: b.rate,
          min: b.min,
          max: b.max,
          taxableInBracket: 0,
          taxForBracket: 0,
        });
      }
    }
    return { totalTax: tax, breakdown };
  };

  const computeStateTaxForIncome = (income: number): number => {
    if (customStateTaxRate !== undefined && customStateTaxRate >= 0) {
      return income * (customStateTaxRate / 100);
    } else if (US_STATE_TAX_DATA[stateCode]) {
      return US_STATE_TAX_DATA[stateCode].effectiveEstimate(income);
    } else {
      return income * 0.045;
    }
  };

  const { totalTax: federalIncomeTax, breakdown: federalBrackets } =
    computeFederalTaxForIncome(taxableIncome);

  const stateTaxAmount = computeStateTaxForIncome(taxableIncome);
  const stateName =
    customStateTaxRate !== undefined && customStateTaxRate >= 0
      ? `Custom (${customStateTaxRate}%)`
      : US_STATE_TAX_DATA[stateCode]?.name || stateCode || "National Average (4.5%)";

  // 9. Baseline W-2 Calculation (if user has dual W-2 income)
  let w2TaxWithheldEstimate = 0;
  let marginalFederalTaxOn1099 = federalIncomeTax;
  let marginalStateTaxOn1099 = stateTaxAmount;

  if (w2Income > 0) {
    const w2TaxableIncome = Math.max(0, w2Income - standardDeduction);
    const w2FedTax = computeFederalTaxForIncome(w2TaxableIncome).totalTax;
    const w2StateTax = computeStateTaxForIncome(w2TaxableIncome);
    const w2SS = Math.min(w2Income, wageBase) * 0.062;
    const w2Med = w2Income * 0.0145;
    const w2AddlMed = Math.max(0, w2Income - addMedicareThreshold) * 0.009;
    w2TaxWithheldEstimate = roundCurrency(w2FedTax + w2StateTax + w2SS + w2Med + w2AddlMed);

    // The incremental federal and state taxes caused specifically by the 1099 freelance earnings
    marginalFederalTaxOn1099 = Math.max(0, federalIncomeTax - w2FedTax);
    marginalStateTaxOn1099 = Math.max(0, stateTaxAmount - w2StateTax);
  }

  // 10. Freelance 1099 Tax Obligation & Grand Totals
  // For a 1099 Freelance Tax Estimator, estimated tax owed is the liability of the 1099 business
  const totalFreelanceTax =
    totalSelfEmploymentTax + marginalFederalTaxOn1099 + marginalStateTaxOn1099;
  const combinedTotalTax = roundCurrency(w2TaxWithheldEstimate + totalFreelanceTax);

  const effectiveFederalIncomeRate =
    taxableIncome > 0 ? (federalIncomeTax / taxableIncome) * 100 : 0;
  const effectiveStateRate =
    taxableIncome > 0 ? (stateTaxAmount / taxableIncome) * 100 : 0;
  const overallEffectiveRate =
    gross1099Income > 0 ? (totalFreelanceTax / gross1099Income) * 100 : 0;

  // Freelance Net Take-Home (revenue minus business expenses minus freelance taxes)
  const freelanceTakeHome = Math.max(0, netBusinessProfit - totalFreelanceTax);
  const takeHomePay = gross1099Income > 0 ? freelanceTakeHome : 0;
  const monthlyNetIncome = takeHomePay / 12;

  // Combined Household Take-Home
  const w2NetEstimated = Math.max(0, w2Income - w2TaxWithheldEstimate);
  const combinedTakeHome = roundCurrency(w2NetEstimated + freelanceTakeHome);

  // 11. Quarterly Payment Schedule (Form 1040-ES)
  // Form 1040-ES vouchers are paid exclusively to cover unpaid self-employment and marginal freelance tax
  const perQuarterTax = roundCurrency(totalFreelanceTax / 4);
  const quarterlyPayments: QuarterlyPayment[] = [
    {
      quarter: "Q1",
      periodLabel: "Jan 1 – Mar 31",
      dueDate: `April 15, ${taxYear}`,
      amount: perQuarterTax,
    },
    {
      quarter: "Q2",
      periodLabel: "Apr 1 – May 31",
      dueDate: `June 16, ${taxYear}`,
      amount: perQuarterTax,
    },
    {
      quarter: "Q3",
      periodLabel: "Jun 1 – Aug 31",
      dueDate: `September 15, ${taxYear}`,
      amount: perQuarterTax,
    },
    {
      quarter: "Q4",
      periodLabel: "Sep 1 – Dec 31",
      dueDate: `January 15, ${Number(taxYear) + 1}`,
      amount: perQuarterTax,
    },
  ];

  return {
    taxYear,
    filingStatus,
    grossRevenue: roundCurrency(gross1099Income),
    totalExpenses: roundCurrency(totalDirectExpenses),
    netBusinessProfit: roundCurrency(netBusinessProfit),
    seTaxableEarnings: roundCurrency(seTaxableEarnings),
    socialSecurityTax: roundCurrency(socialSecurityTax),
    medicareTax: roundCurrency(medicareTax),
    additionalMedicareTax: roundCurrency(additionalMedicareTax),
    totalSelfEmploymentTax: roundCurrency(totalSelfEmploymentTax),
    deductibleSeTax: roundCurrency(deductibleSeTax),
    adjustedGrossIncome: roundCurrency(adjustedGrossIncome),
    standardDeduction: roundCurrency(standardDeduction),
    qbiDeduction: roundCurrency(qbiDeduction),
    taxableIncome: roundCurrency(taxableIncome),
    federalIncomeTax: roundCurrency(federalIncomeTax),
    effectiveFederalIncomeRate: roundPercentage(effectiveFederalIncomeRate),
    federalBrackets,
    stateCode,
    stateName,
    stateTaxAmount: roundCurrency(stateTaxAmount),
    effectiveStateRate: roundPercentage(effectiveStateRate),
    totalEstimatedTax: roundCurrency(totalFreelanceTax),
    overallEffectiveRate: roundPercentage(overallEffectiveRate),
    takeHomePay: roundCurrency(takeHomePay),
    monthlyNetIncome: roundCurrency(monthlyNetIncome),
    isDualIncome: w2Income > 0,
    w2Income: roundCurrency(w2Income),
    w2TaxWithheldEstimate: roundCurrency(w2TaxWithheldEstimate),
    combinedTotalIncome: roundCurrency(totalGrossIncome),
    combinedTotalTax: roundCurrency(combinedTotalTax),
    combinedTakeHome: roundCurrency(combinedTakeHome),
    marginalFederalTaxOn1099: roundCurrency(marginalFederalTaxOn1099),
    marginalStateTaxOn1099: roundCurrency(marginalStateTaxOn1099),
    quarterlyPayments,
  };
}

function roundCurrency(val: number): number {
  return Math.round((val + Number.EPSILON) * 100) / 100;
}

function roundPercentage(val: number): number {
  return Math.round((val + Number.EPSILON) * 10) / 10;
}
