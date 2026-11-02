import { describe, expect, it } from "vitest";
import { calculateFreelanceTaxes } from "../lib/engines/taxEngine";
import { TaxInputs } from "../models/tax.model";

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
});
