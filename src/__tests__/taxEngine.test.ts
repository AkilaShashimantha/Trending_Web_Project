import { describe, expect, it } from "vitest";
import {
  calculateFreelanceTaxes,
  QBI_THRESHOLDS,
  QUARTERLY_DUE_DATES,
  SOCIAL_SECURITY_WAGE_BASE,
  STANDARD_DEDUCTIONS,
} from "../lib/engines/taxEngine";
import { TaxInputs, TaxInputsSchema } from "../models/tax.model";

describe("taxEngine - 1099 Freelance Tax Estimator", () => {
  const baseInputs: TaxInputs = {
    taxYear: "2025",
    filingStatus: "single",
    gross1099Income: 100000,
    w2Income: 0,
    businessExpenses: 10000,
    homeOfficeDeduction: 1500,
    healthInsurancePremiums: 3600,
    sepIraContribution: 5000,
    otherDeductions: 0,
    stateCode: "TX", // 0% state tax for isolation
  };

  it("calculates net business profit correctly", () => {
    const result = calculateFreelanceTaxes(baseInputs);
    // Net profit = 100,000 - (10,000 + 1,500) = 88,500
    expect(result.netBusinessProfit).toBe(88500);
    expect(result.totalExpenses).toBe(11500);
  });

  it("handles zero income gracefully without negative taxes", () => {
    const result = calculateFreelanceTaxes({
      ...baseInputs,
      gross1099Income: 0,
      businessExpenses: 5000,
    });
    expect(result.grossRevenue).toBe(0);
    expect(result.netBusinessProfit).toBe(0);
    expect(result.totalSelfEmploymentTax).toBe(0);
    expect(result.federalIncomeTax).toBe(0);
    expect(result.totalEstimatedTax).toBe(0);
    expect(result.takeHomePay).toBe(0);
  });

  it("calculates 2024 vs 2025 Social Security wage base limits accurately", () => {
    const highEarner2024: TaxInputs = {
      ...baseInputs,
      taxYear: "2024",
      gross1099Income: 300000,
      businessExpenses: 0,
      homeOfficeDeduction: 0,
    };
    const res2024 = calculateFreelanceTaxes(highEarner2024);
    // 2024 wage base is $168,600. Max SS = 168600 * 0.124 = 20,906.40
    expect(res2024.socialSecurityTax).toBe(20906.40);

    const highEarner2025: TaxInputs = {
      ...baseInputs,
      taxYear: "2025",
      gross1099Income: 300000,
      businessExpenses: 0,
      homeOfficeDeduction: 0,
    };
    const res2025 = calculateFreelanceTaxes(highEarner2025);
    // 2025 wage base is $176,100. Max SS = 176100 * 0.124 = 21,836.40
    expect(res2025.socialSecurityTax).toBe(21836.40);
  });

  it("reduces Social Security tax when W-2 income already absorbed part of wage cap", () => {
    const dualIncome: TaxInputs = {
      ...baseInputs,
      taxYear: "2025",
      gross1099Income: 100000,
      w2Income: 120000, // W-2 absorbs $120,000 of the $176,100 cap
      businessExpenses: 0,
      homeOfficeDeduction: 0,
    };
    const result = calculateFreelanceTaxes(dualIncome);
    // Remaining cap = 176,100 - 120,000 = 56,100
    // SE taxable earnings = 100,000 * 0.9235 = 92,350
    // Taxable SE SS should cap at 56,100 * 0.124 = 6956.40
    expect(result.socialSecurityTax).toBe(6956.40);
  });

  it("applies Section 199A 20% Qualified Business Income deduction", () => {
    const result = calculateFreelanceTaxes(baseInputs);
    // Net profit is $88,500. 20% QBI = $17,700
    expect(result.qbiDeduction).toBeGreaterThan(0);
    expect(result.qbiDeduction).toBeLessThanOrEqual(result.netBusinessProfit * 0.20);
  });

  it("calculates 0% tax for non-income tax states and applies custom rate when specified", () => {
    const texasResult = calculateFreelanceTaxes({ ...baseInputs, stateCode: "TX" });
    expect(texasResult.stateTaxAmount).toBe(0);

    const floridaResult = calculateFreelanceTaxes({ ...baseInputs, stateCode: "FL" });
    expect(floridaResult.stateTaxAmount).toBe(0);

    const customResult = calculateFreelanceTaxes({
      ...baseInputs,
      customStateTaxRate: 5.0,
    });
    expect(customResult.stateTaxAmount).toBe(
      Math.round(customResult.taxableIncome * 0.05 * 100) / 100
    );
  });

  it("enforces IRS Schedule SE $400 statutory threshold on net earnings", () => {
    // $410 profit * 0.9235 = $378.635 < $400 -> zero SE tax
    const underThreshold = calculateFreelanceTaxes({
      ...baseInputs,
      gross1099Income: 410,
      businessExpenses: 0,
      homeOfficeDeduction: 0,
    });
    expect(underThreshold.seTaxableEarnings).toBe(0);
    expect(underThreshold.totalSelfEmploymentTax).toBe(0);

    // $450 profit * 0.9235 = $415.575 >= $400 -> SE tax applies
    const overThreshold = calculateFreelanceTaxes({
      ...baseInputs,
      gross1099Income: 450,
      businessExpenses: 0,
      homeOfficeDeduction: 0,
    });
    expect(overThreshold.seTaxableEarnings).toBeGreaterThanOrEqual(400);
    expect(overThreshold.totalSelfEmploymentTax).toBeGreaterThan(0);
  });

  it("correctly handles large W-2 ($180k) + 1099 ($50k) dual-income scenario", () => {
    const dualLarge = calculateFreelanceTaxes({
      ...baseInputs,
      taxYear: "2025",
      filingStatus: "single",
      gross1099Income: 50000,
      w2Income: 180000,
      businessExpenses: 0,
      homeOfficeDeduction: 0,
      healthInsurancePremiums: 0,
      sepIraContribution: 0,
      stateCode: "TX",
    });

    // W-2 of $180k exceeds the $176,100 Social Security cap -> SS on 1099 must be 0
    expect(dualLarge.socialSecurityTax).toBe(0);
    // Medicare (2.9%) must still apply on all 1099 earnings
    expect(dualLarge.medicareTax).toBeCloseTo(50000 * 0.9235 * 0.029, 1);
    // Additional Medicare tax (0.9%) applies since total income > $200k threshold
    expect(dualLarge.additionalMedicareTax).toBeGreaterThan(0);
    // Freelance take-home pay must be positive and substantial (not wiped out by W-2 taxes)
    expect(dualLarge.takeHomePay).toBeGreaterThan(25000);
    expect(dualLarge.combinedTakeHome).toBeGreaterThan(100000);
    // Quarterly payments are for the freelance obligation only
    expect(dualLarge.quarterlyPayments[0].amount).toBeLessThan(6000);
  });

  it("defaults TaxInputsSchema to 2026 tax year", () => {
    const parsed = TaxInputsSchema.parse({});
    expect(parsed.taxYear).toBe("2026");
  });

  it("calculates 2026 Social Security wage base ($184,500) accurately for solo and dual-income earners", () => {
    const highEarner2026 = calculateFreelanceTaxes({
      ...baseInputs,
      taxYear: "2026",
      gross1099Income: 300000,
      businessExpenses: 0,
      homeOfficeDeduction: 0,
    });
    expect(SOCIAL_SECURITY_WAGE_BASE["2026"]).toBe(184500);
    // 2026 wage base is $184,500. Max SS = 184500 * 0.124 = 22,878.00
    expect(highEarner2026.socialSecurityTax).toBe(22878);

    const dual2026 = calculateFreelanceTaxes({
      ...baseInputs,
      taxYear: "2026",
      gross1099Income: 100000,
      w2Income: 150000, // W-2 absorbs $150,000 of the $184,500 cap
      businessExpenses: 0,
      homeOfficeDeduction: 0,
    });
    // Remaining cap = 184,500 - 150,000 = 34,500 -> 34,500 * 0.124 = 4,278.00
    expect(dual2026.socialSecurityTax).toBe(4278);
  });

  it("applies 2026 Rev. Proc. 2025-32 / OBBBA standard deductions across all 4 filing statuses", () => {
    expect(STANDARD_DEDUCTIONS["2026"]).toEqual({
      single: 16100,
      married_joint: 32200,
      married_separate: 16100,
      head_of_household: 24150,
    });

    const single = calculateFreelanceTaxes({ ...baseInputs, taxYear: "2026", filingStatus: "single" });
    const mfj = calculateFreelanceTaxes({ ...baseInputs, taxYear: "2026", filingStatus: "married_joint" });
    const mfs = calculateFreelanceTaxes({ ...baseInputs, taxYear: "2026", filingStatus: "married_separate" });
    const hoh = calculateFreelanceTaxes({ ...baseInputs, taxYear: "2026", filingStatus: "head_of_household" });

    expect(single.standardDeduction).toBe(16100);
    expect(mfj.standardDeduction).toBe(32200);
    expect(mfs.standardDeduction).toBe(16100);
    expect(hoh.standardDeduction).toBe(24150);
  });

  it("calculates 2026 federal income tax brackets accurately across all 4 filing statuses", () => {
    const clean2026: TaxInputs = {
      taxYear: "2026",
      filingStatus: "single",
      gross1099Income: 100000,
      w2Income: 0,
      businessExpenses: 0,
      homeOfficeDeduction: 0,
      healthInsurancePremiums: 0,
      sepIraContribution: 0,
      otherDeductions: 0,
      stateCode: "TX",
    };

    const res2026 = calculateFreelanceTaxes(clean2026);
    const res2025 = calculateFreelanceTaxes({ ...clean2026, taxYear: "2025" });

    // 2026 Single: taxableIncome = 100000 - 7064.775 - 16100 - 15367.045 = 61468.18
    // 10% on 12,400 ($1,240) + 12% on 38,000 ($4,560) + 22% on 11,068.18 ($2,435.00) = $8,235.00
    expect(res2026.taxableIncome).toBe(61468.18);
    expect(res2026.federalIncomeTax).toBe(8235);
    expect(res2026.federalIncomeTax).toBeLessThan(res2025.federalIncomeTax);

    // Verify 2026 bracket ceilings for all 4 filing statuses
    expect(res2026.federalBrackets.map((b) => b.max)).toEqual([
      12400, 50400, 105700, 201775, 256225, 640600, null,
    ]);

    const mfj2026 = calculateFreelanceTaxes({ ...clean2026, filingStatus: "married_joint" });
    expect(mfj2026.federalBrackets.map((b) => b.max)).toEqual([
      24800, 100800, 211400, 403550, 512450, 768700, null,
    ]);

    const mfs2026 = calculateFreelanceTaxes({ ...clean2026, filingStatus: "married_separate" });
    expect(mfs2026.federalBrackets.map((b) => b.max)).toEqual([
      12400, 50400, 105700, 201775, 256225, 384350, null,
    ]);

    const hoh2026 = calculateFreelanceTaxes({ ...clean2026, filingStatus: "head_of_household" });
    expect(hoh2026.federalBrackets.map((b) => b.max)).toEqual([
      17700, 67450, 105700, 201750, 256200, 640600, null,
    ]);
  });

  it("applies 2026 Section 199A QBI thresholds and widened OBBBA phase-out ranges", () => {
    expect(QBI_THRESHOLDS["2026"]).toEqual({
      single: { threshold: 201750, phaseOutRange: 75000 },
      married_joint: { threshold: 403500, phaseOutRange: 150000 },
      married_separate: { threshold: 201775, phaseOutRange: 75000 },
      head_of_household: { threshold: 201750, phaseOutRange: 75000 },
    });

    const base2026: TaxInputs = {
      taxYear: "2026",
      filingStatus: "single",
      gross1099Income: 35000,
      w2Income: 170000,
      businessExpenses: 0,
      homeOfficeDeduction: 0,
      healthInsurancePremiums: 0,
      sepIraContribution: 0,
      otherDeductions: 0,
      stateCode: "TX",
    };

    // Below $201,750 threshold -> full 20% QBI applies
    const belowThreshold = calculateFreelanceTaxes(base2026);
    expect(belowThreshold.qbiDeduction).toBeGreaterThan(6000);

    // Mid phase-in range ($201,750–$276,750) -> partially phased down
    const inPhaseOut = calculateFreelanceTaxes({ ...base2026, w2Income: 225000 });
    expect(inPhaseOut.qbiDeduction).toBeGreaterThan(0);
    expect(inPhaseOut.qbiDeduction).toBeLessThan(belowThreshold.qbiDeduction);

    // Above $276,750 ceiling -> phased out to zero for solo contractor
    const aboveCeiling = calculateFreelanceTaxes({ ...base2026, w2Income: 300000 });
    expect(aboveCeiling.qbiDeduction).toBe(0);
  });

  it("generates accurate 2026 Form 1040-ES quarterly due dates", () => {
    const res2026 = calculateFreelanceTaxes({ ...baseInputs, taxYear: "2026" });
    expect(res2026.quarterlyPayments.map((q) => q.dueDate)).toEqual(QUARTERLY_DUE_DATES["2026"]);
    expect(res2026.quarterlyPayments.map((q) => q.dueDate)).toEqual([
      "April 15, 2026",
      "June 15, 2026",
      "September 15, 2026",
      "January 15, 2027",
    ]);
  });
});
