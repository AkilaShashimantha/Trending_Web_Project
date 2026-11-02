import { describe, expect, it } from "vitest";
import { calculateHysaGrowth } from "../lib/engines/hysaEngine";
import { HysaInputs } from "../models/hysa.model";

describe("hysaEngine - HYSA Compound Wealth vs Inflation Engine", () => {
  const baseInputs: HysaInputs = {
    initialDeposit: 10000,
    monthlyContribution: 500,
    annualPercentageYield: 5.0, // 5% APY
    inflationRate: 3.0, // 3% inflation
    taxBracketPercent: 24, // 24% tax on interest
    horizonYears: 5,
    compoundFrequency: "monthly",
  };

  it("calculates total principal contributed correctly", () => {
    const result = calculateHysaGrowth(baseInputs);
    // Initial $10k + ($500 * 12 * 5) = $10,000 + $30,000 = $40,000
    expect(result.totalPrincipalContributed).toBe(40000);
  });

  it("produces nominal balance higher than contributed principal due to interest", () => {
    const result = calculateHysaGrowth(baseInputs);
    expect(result.finalNominalGrossBalance).toBeGreaterThan(result.totalPrincipalContributed);
    expect(result.totalInterestEarnedGross).toBeGreaterThan(0);
  });

  it("applies ordinary income tax drag reducing after-tax balance", () => {
    const result = calculateHysaGrowth(baseInputs);
    expect(result.totalTaxDrag).toBeGreaterThan(0);
    expect(result.finalTaxAdjustedBalance).toBeLessThan(result.finalNominalGrossBalance);
  });

  it("correctly models inflation loss on real purchasing power", () => {
    const result = calculateHysaGrowth(baseInputs);
    expect(result.totalInflationErosion).toBeGreaterThan(0);
    expect(result.finalRealPurchasingPower).toBeLessThan(result.finalTaxAdjustedBalance);
  });

  it("flags negative purchasing power verdict when inflation significantly exceeds net yield", () => {
    const losingInputs: HysaInputs = {
      ...baseInputs,
      annualPercentageYield: 1.5, // low yield 1.5%
      inflationRate: 6.0, // high inflation 6.0%
      taxBracketPercent: 32,
      horizonYears: 10,
    };
    const result = calculateHysaGrowth(losingInputs);
    expect(result.verdict.beatsInflation).toBe(false);
    expect(result.verdict.realGainOrLoss).toBeLessThan(0);
  });

  it("flags positive purchasing power verdict when yield beats inflation plus tax", () => {
    const winningInputs: HysaInputs = {
      ...baseInputs,
      annualPercentageYield: 6.0,
      inflationRate: 1.5,
      taxBracketPercent: 12,
      horizonYears: 10,
    };
    const result = calculateHysaGrowth(winningInputs);
    expect(result.verdict.beatsInflation).toBe(true);
    expect(result.verdict.realGainOrLoss).toBeGreaterThan(0);
  });

  it("outputs exactly the requested number of yearly milestones", () => {
    const result = calculateHysaGrowth({ ...baseInputs, horizonYears: 8 });
    expect(result.milestones).toHaveLength(8);
    expect(result.milestones[0].year).toBe(1);
    expect(result.milestones[7].year).toBe(8);
  });

  it("computes non-compounded phantom tax: tax-adjusted balance compounds accurately", () => {
    const lumpSumInputs: HysaInputs = {
      initialDeposit: 10000,
      monthlyContribution: 0,
      annualPercentageYield: 5.0,
      inflationRate: 0,
      taxBracketPercent: 20,
      horizonYears: 2,
      compoundFrequency: "monthly",
    };
    const result = calculateHysaGrowth(lumpSumInputs);
    const m1 = result.milestones[0];
    const m2 = result.milestones[1];
    expect(m1.nominalTaxAdjustedBalance).toBeLessThan(m1.nominalGrossBalance);
    expect(m2.nominalTaxAdjustedBalance).toBeLessThan(m2.nominalGrossBalance);
    expect(result.finalRealPurchasingPower).toBe(result.finalTaxAdjustedBalance);
  });
});
