import {
  HysaCalculationResult,
  HysaInputs,
  YearlyHysaMilestone,
} from "../../models/hysa.model";

/**
 * Pure mathematical engine simulating High-Yield Savings Account (HYSA) compound wealth growth,
 * ordinary income tax drag on annual 1099-INT interest, and real purchasing power decay from inflation.
 */
export function calculateHysaGrowth(inputs: HysaInputs): HysaCalculationResult {
  const {
    initialDeposit,
    monthlyContribution,
    annualPercentageYield,
    inflationRate,
    taxBracketPercent,
    horizonYears,
  } = inputs;

  const apyDecimal = annualPercentageYield / 100;
  const inflationDecimal = inflationRate / 100;
  const taxDecimal = taxBracketPercent / 100;

  // Monthly equivalent compounding rate: (1 + APY)^(1/12) - 1
  const monthlyRate = Math.pow(1 + apyDecimal, 1 / 12) - 1;

  let currentGrossBalance = initialDeposit;
  let currentTaxAdjustedBalance = initialDeposit;
  let cumulativeContributed = initialDeposit;
  let cumulativeInterestPreTax = 0;
  let cumulativeTaxPaid = 0;

  const milestones: YearlyHysaMilestone[] = [];

  for (let year = 1; year <= horizonYears; year++) {
    let yearInterestGross = 0;
    let yearInterestTaxAdjusted = 0;

    for (let month = 1; month <= 12; month++) {
      // Interest earned on gross balance
      const monthInterest = currentGrossBalance * monthlyRate;
      yearInterestGross += monthInterest;
      currentGrossBalance += monthInterest + monthlyContribution;

      // Tax adjusted balance track
      const taxAdjustedMonthInterest = currentTaxAdjustedBalance * monthlyRate;
      yearInterestTaxAdjusted += taxAdjustedMonthInterest;
      currentTaxAdjustedBalance += taxAdjustedMonthInterest + monthlyContribution;

      cumulativeContributed += monthlyContribution;
    }

    cumulativeInterestPreTax += yearInterestGross;

    // Annual tax drag on the interest actually earned in the account that year (IRS 1099-INT)
    const yearTaxDrag = yearInterestTaxAdjusted * taxDecimal;
    cumulativeTaxPaid += yearTaxDrag;

    // Deduct tax drag from the tax-adjusted balance at year-end
    currentTaxAdjustedBalance -= yearTaxDrag;

    // Real purchasing power calculation (inflation discount factor: (1 + i)^year)
    const inflationDiscountFactor = Math.pow(1 + inflationDecimal, year);
    const realPurchasingPower = currentTaxAdjustedBalance / inflationDiscountFactor;
    const purchasingPowerLoss = Math.max(
      0,
      currentTaxAdjustedBalance - realPurchasingPower
    );

    milestones.push({
      year,
      totalPrincipalContributed: roundCurrency(cumulativeContributed),
      nominalGrossBalance: roundCurrency(currentGrossBalance),
      nominalTaxAdjustedBalance: roundCurrency(currentTaxAdjustedBalance),
      realPurchasingPowerBalance: roundCurrency(realPurchasingPower),
      interestEarnedThatYearPreTax: roundCurrency(yearInterestGross),
      cumulativeInterestEarnedPreTax: roundCurrency(cumulativeInterestPreTax),
      taxDragCumulative: roundCurrency(cumulativeTaxPaid),
      purchasingPowerLossFromInflation: roundCurrency(purchasingPowerLoss),
    });
  }

  const finalMilestone = milestones[milestones.length - 1];
  const finalNominalGross = finalMilestone ? finalMilestone.nominalGrossBalance : initialDeposit;
  const finalTaxAdjusted = finalMilestone
    ? finalMilestone.nominalTaxAdjustedBalance
    : initialDeposit;
  const finalRealPower = finalMilestone
    ? finalMilestone.realPurchasingPowerBalance
    : initialDeposit;

  const totalContributed = cumulativeContributed;
  const realGainOrLoss = roundCurrency(finalRealPower - totalContributed);
  const beatsInflation = realGainOrLoss >= 0;

  const netRealReturnPercent =
    totalContributed > 0 ? roundPercentage((realGainOrLoss / totalContributed) * 100) : 0;

  const purchasingPowerSummary = beatsInflation
    ? `Your net yield (${annualPercentageYield}% APY minus ${taxBracketPercent}% tax = ${(
        apyDecimal *
        (1 - taxDecimal) *
        100
      ).toFixed(2)}% net) beats your ${inflationRate}% inflation assumption by ${(
        apyDecimal * (1 - taxDecimal) * 100 -
        inflationRate
      ).toFixed(2)}% annually, creating +$${realGainOrLoss.toLocaleString("en-US", {
        minimumFractionDigits: 2,
      })} in real purchasing power over ${horizonYears} years.`
    : `After ${taxBracketPercent}% ordinary income tax, your effective yield of ${(
        apyDecimal *
        (1 - taxDecimal) *
        100
      ).toFixed(2)}% lags behind ${inflationRate}% annual inflation by ${(
        inflationRate -
        apyDecimal * (1 - taxDecimal) * 100
      ).toFixed(2)}%. Despite earning $${roundCurrency(
        cumulativeInterestPreTax
      ).toLocaleString("en-US", {
        minimumFractionDigits: 2,
      })} in interest, inflation erodes -$${Math.abs(realGainOrLoss).toLocaleString(
        "en-US",
        { minimumFractionDigits: 2 }
      )} of your real baseline buying power.`;

  return {
    inputs,
    finalNominalGrossBalance: roundCurrency(finalNominalGross),
    finalTaxAdjustedBalance: roundCurrency(finalTaxAdjusted),
    finalRealPurchasingPower: roundCurrency(finalRealPower),
    totalPrincipalContributed: roundCurrency(totalContributed),
    totalInterestEarnedGross: roundCurrency(cumulativeInterestPreTax),
    totalTaxDrag: roundCurrency(cumulativeTaxPaid),
    totalInflationErosion: roundCurrency(finalMilestone?.purchasingPowerLossFromInflation || 0),
    netRealReturnPercent,
    milestones,
    verdict: {
      beatsInflation,
      realGainOrLoss,
      purchasingPowerSummary,
    },
  };
}

function roundCurrency(val: number): number {
  return Math.round((val + Number.EPSILON) * 100) / 100;
}

function roundPercentage(val: number): number {
  return Math.round((val + Number.EPSILON) * 10) / 10;
}
