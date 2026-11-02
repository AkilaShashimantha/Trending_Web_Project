import { describe, expect, it } from "vitest";
import { calculatePaymentFees } from "../lib/engines/feeEngine";
import { FeeInputs } from "../models/fee.model";

describe("feeEngine - Payment Gateway Fee Optimizer", () => {
  const baseInputs: FeeInputs = {
    invoiceAmount: 1000,
    provider: "stripe",
    transactionType: "domestic_standard",
    chargebackBufferPercent: 0,
    monthlyVolume: 10000,
  };

  it("calculates Stripe domestic standard fee accurately (2.9% + $0.30)", () => {
    const result = calculatePaymentFees(baseInputs);
    // 1000 * 0.029 = 29.00 + 0.30 = 29.30
    expect(result.selectedResult.totalFee).toBe(29.30);
    expect(result.selectedResult.netPayout).toBe(970.70);
    expect(result.selectedResult.effectiveRatePercent).toBe(2.93);
  });

  it("computes exact reverse invoice amount so net payout equals desired invoice", () => {
    const result = calculatePaymentFees(baseInputs);
    const reverseAmount = result.selectedResult.reverseInvoiceAmount;
    // Reverse = (1000 + 0.30) / (1 - 0.029) = 1000.30 / 0.971 = 1030.175... -> 1030.18
    expect(reverseAmount).toBe(1030.18);

    // Verify that billing this reverse amount produces virtually exact $1,000 net
    const billedResult = calculatePaymentFees({
      ...baseInputs,
      invoiceAmount: reverseAmount,
    });
    expect(Math.round(billedResult.selectedResult.netPayout)).toBe(1000);
  });

  it("adds international card surcharge (1.5%) correctly for Stripe", () => {
    const intlResult = calculatePaymentFees({
      ...baseInputs,
      transactionType: "international",
    });
    // Rate is 4.4% + 0.30: 1000 * 0.044 = 44.00 + 0.30 = 44.30
    expect(intlResult.selectedResult.totalFee).toBe(44.30);
    expect(intlResult.selectedResult.netPayout).toBe(955.70);
  });

  it("provides cross-comparison for all 4 providers (Stripe, PayPal, Wise, Square)", () => {
    const result = calculatePaymentFees(baseInputs);
    expect(result.comparisons).toHaveLength(4);
    const wise = result.comparisons.find((c) => c.provider === "wise");
    const paypal = result.comparisons.find((c) => c.provider === "paypal");
    expect(wise).toBeDefined();
    expect(paypal).toBeDefined();

    // Wise domestic ACH fee is significantly lower than PayPal
    expect(wise!.totalFee).toBeLessThan(paypal!.totalFee);
  });

  it("applies chargeback reserve deduction when configured", () => {
    const withBuffer = calculatePaymentFees({
      ...baseInputs,
      chargebackBufferPercent: 1.0, // 1% buffer on $1000 = $10.00
    });
    expect(withBuffer.chargebackReserveAmount).toBe(10.00);
    expect(withBuffer.netAfterReserve).toBe(970.70 - 10.00);
  });

  it("handles boundary tiny transactions (e.g. $1 micropayment)", () => {
    const microResult = calculatePaymentFees({
      ...baseInputs,
      invoiceAmount: 1.00,
      transactionType: "micropayments",
    });
    expect(microResult.selectedResult.totalFee).toBeGreaterThan(0);
    expect(microResult.selectedResult.netPayout).toBeGreaterThanOrEqual(0);
  });

  it("handles zero invoice amount safely without Infinity or NaN", () => {
    const zeroResult = calculatePaymentFees({
      ...baseInputs,
      invoiceAmount: 0,
      monthlyVolume: 10000,
    });
    expect(zeroResult.selectedResult.totalFee).toBe(0);
    expect(zeroResult.selectedResult.netPayout).toBe(0);
    expect(zeroResult.selectedResult.effectiveRatePercent).toBe(0);
    expect(zeroResult.selectedResult.reverseInvoiceAmount).toBe(0);
    expect(zeroResult.selectedResult.annualLossAtVolume).toBe(0);
    expect(Number.isFinite(zeroResult.selectedResult.effectiveRatePercent)).toBe(true);
  });
});
