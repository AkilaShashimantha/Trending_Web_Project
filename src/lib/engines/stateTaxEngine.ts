import { FilingStatus, TaxBracketBreakdown } from "../../models/tax.model";
import {
  STATE_DATA_BY_CODE,
  STATE_DATA_BY_SLUG,
  STATE_TAX_RECORDS,
  StateTaxBracket,
  StateTaxData,
  StateTaxType,
} from "../data/stateTaxData";

export interface StateTaxCalculationResult {
  stateCode: string;
  stateName: string;
  taxType: StateTaxType;
  grossIncome: number;
  stateStandardDeduction: number;
  stateTaxableIncome: number;
  stateTaxAmount: number;
  effectiveStateRate: number; // percentage (e.g. 5.2 for 5.2%)
  marginalRate: number; // percentage (e.g. 9.3 for 9.3%)
  bracketsBreakdown: TaxBracketBreakdown[];
  agencyName: string;
  agencyUrl: string;
  estimatedTaxForm: string;
  filingDeadline: string;
  localTaxNotes: string;
  hasLocalTax: boolean;
}

export interface CalculateStateTaxOptions {
  stateCode: string; // e.g. "CA", "TX", or slug "california"
  taxableIncome: number; // Base income (typically Federal AGI or Taxable Income)
  filingStatus?: FilingStatus;
  customRate?: number; // Optional user override (0 to 100%)
  netProfit?: number; // For effective rate calculation
}

/**
 * Normalizes input code/slug to find the corresponding StateTaxData
 */
export function getStateTaxData(codeOrSlug: string): StateTaxData | undefined {
  if (!codeOrSlug) return undefined;
  const upper = codeOrSlug.trim().toUpperCase();
  if (STATE_DATA_BY_CODE[upper]) {
    return STATE_DATA_BY_CODE[upper];
  }
  const slug = codeOrSlug.trim().toLowerCase().replace(/_/g, "-");
  if (STATE_DATA_BY_SLUG[slug]) {
    return STATE_DATA_BY_SLUG[slug];
  }
  return undefined;
}

export function getAllStates(): StateTaxData[] {
  return STATE_TAX_RECORDS;
}

export function getValidStateCodes(): string[] {
  return STATE_TAX_RECORDS.map((s) => s.code);
}

function roundCurrency(val: number): number {
  return Math.round(val * 100) / 100;
}

/**
 * Calculates exact state income tax liability for any of the 50 US States + DC.
 * Pure, zero-dependency, handles negative income, zero-tax, flat, and progressive brackets.
 */
export function calculateStateTax(
  options: CalculateStateTaxOptions
): StateTaxCalculationResult {
  const {
    stateCode,
    taxableIncome: rawTaxableIncome,
    filingStatus = "single",
    customRate,
    netProfit,
  } = options;

  const stateData = getStateTaxData(stateCode);

  // Safe non-negative base income
  const baseIncome = Math.max(0, rawTaxableIncome || 0);

  // 1. Custom rate override check
  if (customRate !== undefined && customRate >= 0) {
    const taxAmount = roundCurrency(baseIncome * (customRate / 100));
    const effectiveRate =
      baseIncome > 0 ? roundCurrency((taxAmount / baseIncome) * 100) : 0;
    return {
      stateCode: stateData?.code || stateCode.toUpperCase(),
      stateName: stateData?.name || `Custom Rate (${customRate}%)`,
      taxType: "flat",
      grossIncome: baseIncome,
      stateStandardDeduction: 0,
      stateTaxableIncome: baseIncome,
      stateTaxAmount: taxAmount,
      effectiveStateRate: effectiveRate,
      marginalRate: customRate,
      bracketsBreakdown: [
        {
          bracketRate: customRate / 100,
          min: 0,
          max: null,
          taxableInBracket: baseIncome,
          taxForBracket: taxAmount,
        },
      ],
      agencyName: stateData?.agencyName || "State Department of Revenue",
      agencyUrl: stateData?.agencyUrl || "https://www.tax.gov",
      estimatedTaxForm: stateData?.estimatedTaxForm || "State Estimated Tax Voucher",
      filingDeadline: stateData?.filingDeadline || "April 15, June 15, September 15, January 15",
      localTaxNotes: stateData?.localTaxNotes || "No local tax data available.",
      hasLocalTax: stateData?.hasLocalTax || false,
    };
  }

  // 2. Fallback for unknown state code
  if (!stateData) {
    const fallbackRate = 0.045; // 4.5% national average fallback
    const taxAmount = roundCurrency(baseIncome * fallbackRate);
    const effectiveRate = baseIncome > 0 ? 4.5 : 0;
    return {
      stateCode: stateCode.toUpperCase(),
      stateName: `Other State (${stateCode.toUpperCase()})`,
      taxType: "flat",
      grossIncome: baseIncome,
      stateStandardDeduction: 0,
      stateTaxableIncome: baseIncome,
      stateTaxAmount: taxAmount,
      effectiveStateRate: effectiveRate,
      marginalRate: 4.5,
      bracketsBreakdown: [
        {
          bracketRate: fallbackRate,
          min: 0,
          max: null,
          taxableInBracket: baseIncome,
          taxForBracket: taxAmount,
        },
      ],
      agencyName: "State Department of Revenue",
      agencyUrl: "https://www.tax.gov",
      estimatedTaxForm: "State Estimated Tax Voucher",
      filingDeadline: "April 15, June 15, September 15, January 15",
      localTaxNotes: "Check with your local city and county clerk for municipal obligations.",
      hasLocalTax: false,
    };
  }

  // 3. Zero-income-tax state
  if (stateData.taxType === "none") {
    return {
      stateCode: stateData.code,
      stateName: stateData.name,
      taxType: "none",
      grossIncome: baseIncome,
      stateStandardDeduction: 0,
      stateTaxableIncome: 0,
      stateTaxAmount: 0,
      effectiveStateRate: 0,
      marginalRate: 0,
      bracketsBreakdown: [],
      agencyName: stateData.agencyName,
      agencyUrl: stateData.agencyUrl,
      estimatedTaxForm: stateData.estimatedTaxForm,
      filingDeadline: stateData.filingDeadline,
      localTaxNotes: stateData.localTaxNotes,
      hasLocalTax: stateData.hasLocalTax,
    };
  }

  // 4. Flat tax state
  const stdDeduction = stateData.standardDeduction[filingStatus] || 0;
  const stateTaxableIncome = Math.max(0, baseIncome - stdDeduction);

  if (stateData.taxType === "flat") {
    const rate = stateData.flatRate || 0;
    const taxAmount = roundCurrency(stateTaxableIncome * rate);
    const denominator = netProfit && netProfit > 0 ? netProfit : baseIncome;
    const effectiveRate =
      denominator > 0 ? roundCurrency((taxAmount / denominator) * 100) : 0;

    return {
      stateCode: stateData.code,
      stateName: stateData.name,
      taxType: "flat",
      grossIncome: baseIncome,
      stateStandardDeduction: stdDeduction,
      stateTaxableIncome,
      stateTaxAmount: taxAmount,
      effectiveStateRate: effectiveRate,
      marginalRate: roundCurrency(rate * 100),
      bracketsBreakdown: [
        {
          bracketRate: rate,
          min: 0,
          max: null,
          taxableInBracket: stateTaxableIncome,
          taxForBracket: taxAmount,
        },
      ],
      agencyName: stateData.agencyName,
      agencyUrl: stateData.agencyUrl,
      estimatedTaxForm: stateData.estimatedTaxForm,
      filingDeadline: stateData.filingDeadline,
      localTaxNotes: stateData.localTaxNotes,
      hasLocalTax: stateData.hasLocalTax,
    };
  }

  // 5. Progressive bracket state
  const bracketsForStatus: StateTaxBracket[] =
    stateData.brackets?.[filingStatus] ||
    stateData.brackets?.single ||
    [];

  let accumulatedTax = 0;
  let topMarginalRate = 0;
  const breakdown: TaxBracketBreakdown[] = [];

  for (const b of bracketsForStatus) {
    if (stateTaxableIncome > b.min) {
      const topOfBracket = b.max !== null ? Math.min(stateTaxableIncome, b.max) : stateTaxableIncome;
      const taxableSlice = Math.max(0, topOfBracket - b.min);
      const taxForBracket = taxableSlice * b.rate;
      accumulatedTax += taxForBracket;
      if (taxableSlice > 0) {
        topMarginalRate = b.rate * 100;
      }

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

  const finalTaxAmount = roundCurrency(accumulatedTax);
  const denominator = netProfit && netProfit > 0 ? netProfit : baseIncome;
  const effectiveRate =
    denominator > 0 ? roundCurrency((finalTaxAmount / denominator) * 100) : 0;

  return {
    stateCode: stateData.code,
    stateName: stateData.name,
    taxType: "progressive",
    grossIncome: baseIncome,
    stateStandardDeduction: stdDeduction,
    stateTaxableIncome,
    stateTaxAmount: finalTaxAmount,
    effectiveStateRate: effectiveRate,
    marginalRate: roundCurrency(topMarginalRate),
    bracketsBreakdown: breakdown,
    agencyName: stateData.agencyName,
    agencyUrl: stateData.agencyUrl,
    estimatedTaxForm: stateData.estimatedTaxForm,
    filingDeadline: stateData.filingDeadline,
    localTaxNotes: stateData.localTaxNotes,
    hasLocalTax: stateData.hasLocalTax,
  };
}
