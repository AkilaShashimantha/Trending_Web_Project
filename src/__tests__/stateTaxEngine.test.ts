import { describe, expect, it } from "vitest";
import {
  calculateStateTax,
  getAllStates,
  getStateTaxData,
  getValidStateCodes,
} from "../lib/engines/stateTaxEngine";
import { STATE_TAX_RECORDS } from "../lib/data/stateTaxData";
import {
  clearStatePreference,
  getStatePreference,
  isValidStateCode,
  saveStatePreference,
} from "../lib/utils/cookieUtils";

describe("stateTaxEngine - 50 US States + DC Tax Calculation & Data", () => {
  it("contains exactly 51 US state jurisdictions with complete data models", () => {
    const allStates = getAllStates();
    expect(allStates.length).toBe(51);
    expect(STATE_TAX_RECORDS.length).toBe(51);

    const validCodes = getValidStateCodes();
    expect(validCodes.length).toBe(51);

    for (const st of allStates) {
      expect(st.slug).toBeTruthy();
      expect(st.code).toMatch(/^[A-Z]{2}$/);
      expect(st.name).toBeTruthy();
      expect(["none", "flat", "progressive"]).toContain(st.taxType);
      expect(st.agencyName).toBeTruthy();
      expect(st.agencyUrl).toMatch(/^https?:\/\//);
      expect(st.estimatedTaxForm).toBeTruthy();
      expect(st.filingDeadline).toBeTruthy();
      expect(st.standardDeduction).toBeDefined();
      expect(st.standardDeduction.single).toBeGreaterThanOrEqual(0);
      expect(st.standardDeduction.married_joint).toBeGreaterThanOrEqual(0);
      expect(st.editorialGuide).toBeDefined();
      expect(st.editorialGuide.seoTitle).toContain(st.name);
      expect(st.editorialGuide.faqs.length).toBeGreaterThanOrEqual(4);
    }
  });

  it("resolves state data by both 2-letter code and slug accurately", () => {
    const caByCode = getStateTaxData("CA");
    const caBySlug = getStateTaxData("california");
    expect(caByCode).toBeDefined();
    expect(caBySlug).toBeDefined();
    expect(caByCode?.name).toBe("California");
    expect(caBySlug?.name).toBe("California");
    expect(caByCode).toBe(caBySlug);

    const nyByCode = getStateTaxData("ny");
    const nyBySlug = getStateTaxData("new-york");
    expect(nyByCode?.name).toBe("New York");
    expect(nyBySlug?.name).toBe("New York");

    const dcBySlug = getStateTaxData("district-of-columbia");
    expect(dcBySlug?.code).toBe("DC");
  });

  describe("Zero-Income-Tax States (AK, FL, NV, NH, SD, TN, TX, WA, WY)", () => {
    const zeroTaxStates = ["AK", "FL", "NV", "NH", "SD", "TN", "TX", "WA", "WY"];

    zeroTaxStates.forEach((code) => {
      it(`calculates 0% state tax for ${code} even with high 1099 profit`, () => {
        const result = calculateStateTax({
          stateCode: code,
          taxableIncome: 250000,
          filingStatus: "single",
        });
        expect(result.taxType).toBe("none");
        expect(result.stateTaxAmount).toBe(0);
        expect(result.effectiveStateRate).toBe(0);
        expect(result.marginalRate).toBe(0);
        expect(result.bracketsBreakdown).toHaveLength(0);
      });
    });
  });

  describe("Flat-Tax States", () => {
    it("calculates Pennsylvania (3.07% flat with $0 standard deduction)", () => {
      const paResult = calculateStateTax({
        stateCode: "PA",
        taxableIncome: 100000,
        filingStatus: "single",
      });
      expect(paResult.taxType).toBe("flat");
      expect(paResult.stateStandardDeduction).toBe(0);
      expect(paResult.stateTaxableIncome).toBe(100000);
      // 100,000 * 0.0307 = 3,070
      expect(paResult.stateTaxAmount).toBe(3070);
      expect(paResult.marginalRate).toBe(3.07);
    });

    it("calculates Illinois (4.95% flat with $2,775 personal exemption)", () => {
      const ilResult = calculateStateTax({
        stateCode: "IL",
        taxableIncome: 50000,
        filingStatus: "single",
      });
      expect(ilResult.taxType).toBe("flat");
      expect(ilResult.stateStandardDeduction).toBe(2775);
      expect(ilResult.stateTaxableIncome).toBe(47225);
      // 47,225 * 0.0495 = 2,337.6375 -> rounded to 2337.64
      expect(ilResult.stateTaxAmount).toBe(2337.64);
      expect(ilResult.marginalRate).toBe(4.95);
    });

    it("calculates Colorado (4.40% flat with federal standard deduction conformity)", () => {
      const coResult = calculateStateTax({
        stateCode: "CO",
        taxableIncome: 50000,
        filingStatus: "single",
      });
      expect(coResult.taxType).toBe("flat");
      expect(coResult.stateStandardDeduction).toBe(14600);
      expect(coResult.stateTaxableIncome).toBe(35400);
      // 35,400 * 0.044 = 1,557.60
      expect(coResult.stateTaxAmount).toBe(1557.60);
      expect(coResult.marginalRate).toBe(4.4);
    });

    it("calculates Arizona (2.50% flat rate)", () => {
      const azResult = calculateStateTax({
        stateCode: "AZ",
        taxableIncome: 70000,
        filingStatus: "single",
      });
      expect(azResult.taxType).toBe("flat");
      expect(azResult.stateStandardDeduction).toBe(14600);
      expect(azResult.stateTaxableIncome).toBe(55400);
      // 55,400 * 0.025 = 1,385.00
      expect(azResult.stateTaxAmount).toBe(1385.00);
      expect(azResult.marginalRate).toBe(2.5);
    });
  });

  describe("Progressive-Bracket States", () => {
    it("calculates California graduated brackets and mental health surtax on $1.5M+", () => {
      // 1. Moderate earner: $50,000 taxable income single
      const caModerate = calculateStateTax({
        stateCode: "CA",
        taxableIncome: 50000,
        filingStatus: "single",
      });
      expect(caModerate.taxType).toBe("progressive");
      expect(caModerate.stateStandardDeduction).toBe(5540);
      expect(caModerate.stateTaxableIncome).toBe(44460);
      expect(caModerate.stateTaxAmount).toBeGreaterThan(1000);
      expect(caModerate.stateTaxAmount).toBeLessThan(3000);
      expect(caModerate.bracketsBreakdown.length).toBeGreaterThan(0);

      // 2. High earner: $1,500,000 triggers top 13.3% bracket (12.3% + 1% over $1M)
      const caHigh = calculateStateTax({
        stateCode: "CA",
        taxableIncome: 1500000,
        filingStatus: "single",
      });
      expect(caHigh.marginalRate).toBe(13.3);
      expect(caHigh.stateTaxAmount).toBeGreaterThan(150000);
    });

    it("calculates New York state tax and respects standard deduction", () => {
      const nyResult = calculateStateTax({
        stateCode: "NY",
        taxableIncome: 90000,
        filingStatus: "single",
      });
      expect(nyResult.taxType).toBe("progressive");
      expect(nyResult.stateStandardDeduction).toBe(8000);
      expect(nyResult.stateTaxableIncome).toBe(82000);
      expect(nyResult.stateTaxAmount).toBeGreaterThan(3000);
      expect(nyResult.stateTaxAmount).toBeLessThan(6000);
    });

    it("handles married filing jointly widening of brackets (e.g. California & New York)", () => {
      const singleRes = calculateStateTax({
        stateCode: "CA",
        taxableIncome: 80000,
        filingStatus: "single",
      });

      const mfjRes = calculateStateTax({
        stateCode: "CA",
        taxableIncome: 80000,
        filingStatus: "married_joint",
      });

      // MFJ has higher standard deduction ($11,080 vs $5,540) and wider brackets, so tax must be lower
      expect(mfjRes.stateTaxAmount).toBeLessThan(singleRes.stateTaxAmount);
      expect(mfjRes.stateStandardDeduction).toBe(11080);
    });
  });

  describe("Edge Cases & Defensive Hardening", () => {
    it("handles negative and zero taxable income safely without negative taxes", () => {
      const negResult = calculateStateTax({
        stateCode: "CA",
        taxableIncome: -15000,
        filingStatus: "single",
      });
      expect(negResult.stateTaxableIncome).toBe(0);
      expect(negResult.stateTaxAmount).toBe(0);
      expect(negResult.effectiveStateRate).toBe(0);

      const zeroResult = calculateStateTax({
        stateCode: "NY",
        taxableIncome: 0,
        filingStatus: "single",
      });
      expect(zeroResult.stateTaxAmount).toBe(0);
    });

    it("returns zero state tax when income is below state standard deduction", () => {
      // CA standard deduction is $5,540
      const belowStd = calculateStateTax({
        stateCode: "CA",
        taxableIncome: 4000,
        filingStatus: "single",
      });
      expect(belowStd.stateTaxableIncome).toBe(0);
      expect(belowStd.stateTaxAmount).toBe(0);
    });

    it("handles unknown or invalid state code with graceful national average fallback", () => {
      const fallback = calculateStateTax({
        stateCode: "ZZ",
        taxableIncome: 100000,
        filingStatus: "single",
      });
      expect(fallback.stateTaxAmount).toBe(4500); // 4.5% fallback
      expect(fallback.marginalRate).toBe(4.5);
    });

    it("handles non-string inputs to getStateTaxData gracefully without throwing", () => {
      expect(getStateTaxData(null)).toBeUndefined();
      expect(getStateTaxData(undefined)).toBeUndefined();
      expect(getStateTaxData(123 as any)).toBeUndefined();
      expect(getStateTaxData({} as any)).toBeUndefined();
      expect(getStateTaxData(true as any)).toBeUndefined();
    });

    it("honors custom rate overrides accurately and clamps above 100", () => {
      const custom = calculateStateTax({
        stateCode: "CA",
        taxableIncome: 100000,
        customRate: 7.25,
      });
      expect(custom.stateTaxAmount).toBe(7250);
      expect(custom.marginalRate).toBe(7.25);

      const clamped = calculateStateTax({
        stateCode: "CA",
        taxableIncome: 100000,
        customRate: 150,
      });
      expect(clamped.stateTaxAmount).toBe(100000);
      expect(clamped.marginalRate).toBe(100);
    });
  });

  describe("Editorial Guide Rich Content Verification", () => {
    it("guarantees 800+ words of localized editorial guide for every US state + DC", () => {
      const allStates = getAllStates();
      for (const st of allStates) {
        const guide = st.editorialGuide;
        const textParts = [
          guide.overview,
          guide.rateBreakdown,
          guide.freelanceSpecificRules,
          guide.standardDeductionGuide,
          guide.estimatedTaxesGuide,
          guide.localTaxDetails,
          ...guide.faqs.map((f) => `${f.question} ${f.answer}`),
        ];
        const combined = textParts.join(" ");
        const wordCount = combined.trim().split(/\s+/).filter(Boolean).length;
        expect(
          wordCount,
          `Editorial guide for ${st.name} (${st.code}) must have >= 800 words, got ${wordCount}`
        ).toBeGreaterThanOrEqual(800);
      }
    });

    it("enriches all 51 jurisdictions with distinct entity, S-Corp, PTET, and threshold metadata", () => {
      const allStates = getAllStates();
      const nuanceSet = new Set<string>();

      for (const st of allStates) {
        expect(st.llcAnnualFee.trim().length).toBeGreaterThan(10);
        expect(st.sCorpTreatment.trim().length).toBeGreaterThan(15);
        expect(st.pteTaxNotes.trim().length).toBeGreaterThan(15);
        expect(st.stateSpecificNuances.trim().length).toBeGreaterThan(20);
        expect(st.estimatedTaxThreshold.trim().length).toBeGreaterThan(15);
        nuanceSet.add(st.stateSpecificNuances);
      }

      // Every jurisdiction has genuinely unique nuances rather than boilerplate duplication
      expect(nuanceSet.size).toBe(51);
    });

    it("marks exactly the top 10 flagship states with deeply custom non-templated guides", () => {
      const expectedFlagshipSlugs = [
        "california",
        "texas",
        "new-york",
        "florida",
        "washington",
        "illinois",
        "pennsylvania",
        "massachusetts",
        "new-jersey",
        "colorado",
      ];

      const allStates = getAllStates();
      const flaggedSlugs = allStates
        .filter((s) => s.hasCustomGuide === true)
        .map((s) => s.slug);

      expect(flaggedSlugs).toHaveLength(10);
      expect(flaggedSlugs.sort()).toEqual([...expectedFlagshipSlugs].sort());

      const ca = getStateTaxData("california")!.editorialGuide;
      expect(ca.freelanceSpecificRules).toContain("$800");
      expect(ca.rateBreakdown).toContain("SDI");

      const tx = getStateTaxData("texas")!.editorialGuide;
      expect(tx.rateBreakdown).toContain("$2,470,000");
      expect(tx.freelanceSpecificRules).toContain("Public Information Report");

      const ny = getStateTaxData("new-york")!.editorialGuide;
      expect(ny.freelanceSpecificRules).toContain("MCTMT");
      expect(ny.freelanceSpecificRules).toContain("UBT");

      const fl = getStateTaxData("florida")!.editorialGuide;
      expect(fl.freelanceSpecificRules).toContain("$138.75");

      const wa = getStateTaxData("washington")!.editorialGuide;
      expect(wa.rateBreakdown).toContain("B&O");
      expect(wa.rateBreakdown).toContain("7.0%");

      const il = getStateTaxData("illinois")!.editorialGuide;
      expect(il.rateBreakdown).toContain("1.5%");
      expect(il.rateBreakdown).toContain("PPRT");

      const pa = getStateTaxData("pennsylvania")!.editorialGuide;
      expect(pa.freelanceSpecificRules).toContain("Act 32");
      expect(pa.localTaxDetails).toContain("BIRT");

      const ma = getStateTaxData("massachusetts")!.editorialGuide;
      expect(ma.freelanceSpecificRules).toContain("Directive 08-3");
      expect(ma.rateBreakdown).toContain("Fair Share");

      const nj = getStateTaxData("new-jersey")!.editorialGuide;
      expect(nj.freelanceSpecificRules).toContain("NJ BAIT");
      expect(nj.freelanceSpecificRules).toContain("Solo 401(k)");

      const co = getStateTaxData("colorado")!.editorialGuide;
      expect(co.freelanceSpecificRules).toContain("SALT Parity Act");
      expect(co.freelanceSpecificRules).toContain("FAMLI");
      expect(co.localTaxDetails).toContain("Occupational Privilege Tax");
    });

    it("never prints flat-rate jurisdiction copy for progressive or zero-tax states and has clean branding/dates", () => {
      const allStates = getAllStates();
      for (const st of allStates) {
        const guide = st.editorialGuide;
        const combined = [
          guide.seoTitle,
          guide.metaDescription,
          guide.h1Title,
          guide.overview,
          guide.rateBreakdown,
          guide.freelanceSpecificRules,
          guide.standardDeductionGuide,
          guide.estimatedTaxesGuide,
          guide.localTaxDetails,
          ...guide.faqs.map((f) => `${f.question} ${f.answer}`),
        ].join(" ");

        if (st.taxType !== "flat") {
          expect(
            combined.toLowerCase(),
            `${st.name} (${st.taxType}) must not mention flat-rate jurisdiction boilerplate`
          ).not.toMatch(/flat-rate jurisdictions?/);
        }

        expect(combined).not.toContain("CashPulse");
        expect(combined).not.toContain("&amp;");
        expect(guide.h1Title).toContain("2024–2026");
      }

      const nh = getStateTaxData("new-hampshire")!;
      expect(nh.localTaxNotes).toContain("January 1, 2025");
      expect(nh.localTaxNotes).not.toContain("2027");
    });
  });

  describe("Freelance Tax Engine Integration (AGI State Base)", () => {
    it("calculates Pennsylvania flat tax on AGI without double-deducting federal standard deduction or QBI", async () => {
      const { calculateFreelanceTaxes } = await import("../lib/engines/taxEngine");
      const result = calculateFreelanceTaxes({
        taxYear: "2025",
        filingStatus: "single",
        gross1099Income: 100000,
        w2Income: 0,
        businessExpenses: 0,
        homeOfficeDeduction: 0,
        healthInsurancePremiums: 0,
        sepIraContribution: 0,
        otherDeductions: 0,
        stateCode: "PA",
      });

      // Net business profit = $100,000
      // Deductible SE tax = $7,064.78 -> AGI = $92,935.22
      // PA has 3.07% flat tax with $0 standard deduction.
      // Expected PA tax = roundCurrency(92,935.22 * 0.0307) = $2,853.11
      // If it erroneously used federal taxable income ($62,348.18), PA tax would be $1,914.09.
      expect(result.stateTaxAmount).toBe(2853.11);
      expect(result.effectiveStateRate).toBeCloseTo(3.07, 1);
    });

    it("calculates California progressive tax on AGI minus CA standard deduction", async () => {
      const { calculateFreelanceTaxes } = await import("../lib/engines/taxEngine");
      const result = calculateFreelanceTaxes({
        taxYear: "2025",
        filingStatus: "single",
        gross1099Income: 100000,
        w2Income: 0,
        businessExpenses: 0,
        homeOfficeDeduction: 0,
        healthInsurancePremiums: 0,
        sepIraContribution: 0,
        otherDeductions: 0,
        stateCode: "CA",
      });

      // AGI is $92,935.22. CA standard deduction is $5,540.
      // CA Taxable Income = $92,935.22 - $5,540 = $87,395.22.
      // CA tax on $87,395.22 is > $4,000.
      // If double-deducted with federal standard deduction and QBI, CA taxable income would be $56,808.18 (tax < $2,500).
      expect(result.stateTaxAmount).toBeGreaterThan(4000);
      expect(result.stateTaxAmount).toBeLessThan(6000);
    });
  });

  describe("Cookie Utilities & Security Defense", () => {
    it("validates state codes strictly against whitelist and rejects injections", () => {
      expect(isValidStateCode("CA")).toBe(true);
      expect(isValidStateCode("TX")).toBe(true);
      expect(isValidStateCode("DC")).toBe(true);
      expect(isValidStateCode("ca")).toBe(true);

      // Rejection of invalid codes and malicious payloads
      expect(isValidStateCode("ZZ")).toBe(false);
      expect(isValidStateCode("<script>alert(1)</script>")).toBe(false);
      expect(isValidStateCode("CA; Secure; HttpOnly")).toBe(false);
      expect(isValidStateCode("CALIFORNIA")).toBe(false);
      expect(isValidStateCode(123)).toBe(false);
      expect(isValidStateCode(null)).toBe(false);
      expect(isValidStateCode(undefined)).toBe(false);
    });

    it("saves and retrieves valid state preference cookies in DOM environments", () => {
      if (typeof document === "undefined") return;

      const saved = saveStatePreference("NY");
      expect(saved).toBe(true);
      expect(getStatePreference()).toBe("NY");

      // Malicious attempt to inject personal details or script must be rejected
      const maliciousAttempt = saveStatePreference("grossIncome=95000&ssn=000-00-0000");
      expect(maliciousAttempt).toBe(false);

      clearStatePreference();
      expect(getStatePreference()).toBeNull();
    });
  });
});
