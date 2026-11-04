import { FilingStatus } from "../../models/tax.model";

export type StateTaxType = "none" | "flat" | "progressive";

export interface StateTaxBracket {
  min: number;
  max: number | null;
  rate: number; // decimal (e.g. 0.05 for 5%)
}

export interface StateFaq {
  question: string;
  answer: string;
}

export interface StateEditorialGuide {
  seoTitle: string;
  metaDescription: string;
  h1Title: string;
  overview: string;
  rateBreakdown: string;
  freelanceSpecificRules: string;
  standardDeductionGuide: string;
  estimatedTaxesGuide: string;
  localTaxDetails: string;
  faqs: StateFaq[];
}

export interface StateTaxData {
  slug: string;
  code: string;
  name: string;
  taxType: StateTaxType;
  flatRate?: number;
  brackets?: Record<FilingStatus, StateTaxBracket[]>;
  standardDeduction: Record<FilingStatus, number>;
  agencyName: string;
  agencyUrl: string;
  estimatedTaxForm: string;
  filingDeadline: string;
  localTaxNotes: string;
  hasLocalTax: boolean;
  editorialGuide: StateEditorialGuide;
}

/**
 * Generates an 800+ word localized editorial guide tailored to each state's tax system.
 */
function buildStateEditorialGuide(state: {
  name: string;
  code: string;
  taxType: StateTaxType;
  flatRate?: number;
  agencyName: string;
  agencyUrl: string;
  estimatedTaxForm: string;
  filingDeadline: string;
  standardDeduction: Record<FilingStatus, number>;
  hasLocalTax: boolean;
  localTaxNotes: string;
}): StateEditorialGuide {
  const {
    name,
    code,
    taxType,
    flatRate,
    agencyName,
    estimatedTaxForm,
    filingDeadline,
    standardDeduction,
    hasLocalTax,
    localTaxNotes,
  } = state;

  const rateSummaryText =
    taxType === "none"
      ? `${name} is one of the premier zero-income-tax states in the United States, levying 0% state income tax on freelance 1099 revenue and wage earnings.`
      : taxType === "flat"
      ? `${name} operates a statutory flat income tax system with a single uniform rate of ${(
          (flatRate || 0) * 100
        ).toFixed(2)}% applied to taxable income.`
      : `${name} enforces a progressive graduated personal income tax system where marginal tax brackets escalate as your net business profit rises.`;

  const standardDedText =
    taxType === "none"
      ? `${name} does not enforce a state standard deduction because there is no state personal income tax. Freelancers still claim the full Federal standard deduction ($14,600 for single filers, $29,200 for married couples filing jointly in 2024; $15,000 / $30,000 for 2025) on IRS Form 1040.`
      : standardDeduction.single === 0
      ? `${name} does not offer a traditional state standard deduction against earned income. Instead, taxpayers claim direct business deductions on their state return schedule or utilize personal exemption tax credits.`
      : `For state tax filings, ${name} provides a standard deduction of $${standardDeduction.single.toLocaleString()} for single filers and $${standardDeduction.married_joint.toLocaleString()} for married couples filing jointly ($${standardDeduction.head_of_household.toLocaleString()} for heads of household). This amount is subtracted directly from your state adjusted gross income before calculating state tax liability.`;

  const estimatedVoucherText =
    taxType === "none"
      ? `Because ${name} levies no state personal income tax, 1099 contractors, consultants, and sole proprietors are not required to file state estimated quarterly tax vouchers. You only need to fulfill your federal obligations using IRS Form 1040-ES on EFTPS.`
      : `Solopreneurs and independent contractors earning 1099 revenue in ${name} must make quarterly estimated payments using ${estimatedTaxForm} if their expected annual state tax balance exceeds state statutory thresholds (typically $500 to $1,000). Payments are submitted directly to the ${agencyName} across the four annual payment deadlines: ${filingDeadline}.`;

  const localNuanceText = hasLocalTax
    ? `${name} permits local municipalities and counties to levy local earned income taxes, occupational taxes, or gross receipts taxes. Specifically: ${localTaxNotes} Independent contractors must register with respective city or county tax departments in addition to their state and federal filings.`
    : `${name} generally does not levy municipal, county, or city-level personal income taxes on freelance earnings. Specifically: ${localTaxNotes} Solopreneurs only need to calculate their state obligations and standard federal self-employment taxes.`;

  return {
    seoTitle: `${name} 1099 Freelance Tax Calculator (2025) - Estimated Taxes & Rates`,
    metaDescription: `Accurate 2024 & 2025 ${name} 1099 freelance tax calculator. Computes ${name} state income tax (${
      taxType === "none" ? "0% rate" : taxType === "flat" ? `${((flatRate || 0) * 100).toFixed(2)}% flat` : "progressive brackets"
    }), federal SECA 15.3%, QBI deduction, and ${estimatedTaxForm} quarterly deadlines.`,
    h1Title: `${name} 1099 Freelance &amp; Self-Employment Tax Guide (2024 - 2025)`,
    overview: `Navigating self-employment and independent contractor taxation in ${name} requires balancing federal statutory mandates with state-specific revenue rules. Whether you operate as an independent 1099 software engineer, creative director, healthcare consultant, or trades contractor, understanding how the ${agencyName} treats business income is paramount to preserving cash flow and preventing underpayment penalties. ${rateSummaryText}

For federal purposes, every freelancer operating in ${name} must calculate the 15.3% Self-Employment Contributions Act (SECA) tax on IRS Schedule SE (comprising 12.4% Social Security and 2.9% Medicare) along with federal progressive income taxes on IRS Form 1040. However, your state liability depends heavily on how ${name} defines state adjusted gross income (AGI) and whether deductions conform to the Internal Revenue Code (IRC). By structuring deductions appropriately on Schedule C, solopreneurs in ${name} can minimize their combined tax burden.`,
    rateBreakdown: `State Tax Structure in ${name}:
${rateSummaryText}

When evaluating your take-home pay, remember that state income tax is assessed in addition to federal obligations. In high-bracket progressive states, marginal state rates can absorb a noticeable percentage of top-dollar earnings. In flat-rate jurisdictions like ${name}, each incremental dollar of net profit is taxed at a predictable rate, facilitating straightforward quarterly budgeting. For zero-tax states, freelancers enjoy an immediate 3% to 10% savings on net profit compared to national peers, allowing faster business reinvestment or personal retirement compounding.

Furthermore, state tax laws frequently adjust bracket thresholds for cost-of-living indexation. The 2024 and 2025 tax schedules reflect these statutory updates to protect filers from bracket creep caused by monetary inflation.`,
    freelanceSpecificRules: `Freelancers, LLC members, and sole proprietors in ${name} report gross revenue and ordinary and necessary business expenses on Federal Schedule C. Because ${name} begins its state tax computation using either Federal Adjusted Gross Income (AGI) or Federal Taxable Income, the write-offs you capture federally flow directly into lowering your ${name} tax liability.

Key state-recognized deductions include:
1. Equipment & Software: Under Section 179 and bonus depreciation rules, laptops, servers, cameras, and productivity tools can frequently be expensed in full during year one.
2. Home Office Expenses: Eligible solopreneurs using a dedicated space exclusively for business can leverage either the IRS simplified square footage calculation ($5/sq ft up to $1,500) or actual prorated housing costs.
3. Health Insurance Premiums: Self-employed individuals are permitted an above-the-line deduction on Form 1040 Schedule 1 for 100% of health, vision, and dental insurance premiums paid for themselves and dependents.
4. Retirement Shelters: Contributions to a SEP-IRA (up to 25% of net adjusted earnings, capped at $69,000 for 2024 and $70,000 for 2025) or Solo 401(k) significantly suppress both federal and ${name} state taxable income.`,
    standardDeductionGuide: `Understanding the Standard Deduction in ${name}:
${standardDedText}

In the United States, taxpayers must choose between claiming the standard deduction or itemizing expenses (such as mortgage interest, charitable gifts, and state and local taxes up to the $10,000 SALT cap). For independent contractors, business expenses are deducted above-the-line on Schedule C before computing AGI, meaning you still receive the full standard deduction even after deducting 100% of legitimate business operational costs.

In addition to standard deductions, ${name} offers specific targeted tax credits for small enterprise investments, research activities, or dependent care. Reviewing state tax schedules ensures that no statutory tax credit is overlooked.`,
    estimatedTaxesGuide: `Estimated Tax Payments & State Safe Harbor in ${name}:
${estimatedVoucherText}

Both the Internal Revenue Service and the ${agencyName} operate under a pay-as-you-go tax mechanism. As an independent contractor with no employer withholding taxes from paychecks, you must proactively deposit estimated taxes throughout the year.

To avoid state and federal underpayment penalties, freelancers should rely on statutory safe harbor provisions:
- Current Year Rule: Pay at least 90% of your current tax year liability across the four equal quarterly payments.
- Prior Year Rule: Pay 100% of your previous year's total tax liability (or 110% if your prior-year federal AGI exceeded $150,000 for married filers or $75,000 for single filers).

Using the prior-year 100%/110% safe harbor threshold provides an absolute safe harbor protection against underpayment penalties, regardless of how much your 1099 freelance revenue surges during the current tax year.`,
    localTaxDetails: `Local City, County & Municipal Taxes in ${name}:
${localNuanceText}

Many freelancers overlook municipal obligations when planning annual budgets. Depending on your primary operating location, local tax authorities may require separate annual returns or withholding permits. Additionally, states that do not impose a personal income tax often rely on higher county sales taxes or commercial property assessments. It is essential to check with your county clerk and city finance division to confirm local licensing, zoning compliance, and local tax requirements.`,
    faqs: [
      {
        question: `How does ${name} tax 1099 freelance income in 2024 and 2025?`,
        answer: `${rateSummaryText} Freelance profit is subject to federal self-employment tax (15.3% on 92.35% of net profit), federal income tax, and applicable ${name} state income tax after allowable business write-offs.`,
      },
      {
        question: `When are ${name} estimated quarterly tax payments due?`,
        answer:
          taxType === "none"
            ? `Because ${name} levies no state personal income tax, there are no state quarterly estimated deadlines. However, federal estimated payments via Form 1040-ES are due on April 15, June 15, September 15, and January 15.`
            : `Quarterly estimated payments for ${name} using ${estimatedTaxForm} are generally due on ${filingDeadline}, coinciding with federal IRS Form 1040-ES deadlines.`,
      },
      {
        question: `What is the ${name} standard deduction for single vs married freelancers?`,
        answer: standardDedText,
      },
      {
        question: `Do I need to pay local city or county income tax in ${name}?`,
        answer: localNuanceText,
      },
    ],
  };
}

/**
 * Complete, accurate dataset for all 50 US States + District of Columbia (51 Jurisdictions).
 * Calibrated for 2024 / 2025 tax code.
 */
export const STATE_TAX_RECORDS: StateTaxData[] = [
  // 1. Alabama
  {
    slug: "alabama",
    code: "AL",
    name: "Alabama",
    taxType: "progressive",
    standardDeduction: { single: 3000, married_joint: 8500, married_separate: 4250, head_of_household: 5200 },
    agencyName: "Alabama Department of Revenue",
    agencyUrl: "https://revenue.alabama.gov",
    estimatedTaxForm: "Form 40ES",
    filingDeadline: "April 15, June 15, September 15, January 15",
    hasLocalTax: true,
    localTaxNotes: "Several cities (Birmingham, Gadsden, Auburn, Bessemer) levy a 1% to 2% municipal occupational license tax on wages and earned income.",
    brackets: {
      single: [
        { min: 0, max: 500, rate: 0.02 },
        { min: 500, max: 3000, rate: 0.04 },
        { min: 3000, max: null, rate: 0.05 },
      ],
      married_joint: [
        { min: 0, max: 1000, rate: 0.02 },
        { min: 1000, max: 6000, rate: 0.04 },
        { min: 6000, max: null, rate: 0.05 },
      ],
      married_separate: [
        { min: 0, max: 500, rate: 0.02 },
        { min: 500, max: 3000, rate: 0.04 },
        { min: 3000, max: null, rate: 0.05 },
      ],
      head_of_household: [
        { min: 0, max: 500, rate: 0.02 },
        { min: 500, max: 3000, rate: 0.04 },
        { min: 3000, max: null, rate: 0.05 },
      ],
    },
    editorialGuide: {} as StateEditorialGuide,
  },

  // 2. Alaska
  {
    slug: "alaska",
    code: "AK",
    name: "Alaska",
    taxType: "none",
    standardDeduction: { single: 0, married_joint: 0, married_separate: 0, head_of_household: 0 },
    agencyName: "Alaska Department of Revenue - Tax Division",
    agencyUrl: "https://tax.alaska.gov",
    estimatedTaxForm: "N/A (No State Income Tax)",
    filingDeadline: "N/A",
    hasLocalTax: false,
    localTaxNotes: "Alaska has no state or local personal income tax. Certain boroughs impose local sales taxes (0% to 7.5%).",
    editorialGuide: {} as StateEditorialGuide,
  },

  // 3. Arizona
  {
    slug: "arizona",
    code: "AZ",
    name: "Arizona",
    taxType: "flat",
    flatRate: 0.025,
    standardDeduction: { single: 14600, married_joint: 29200, married_separate: 14600, head_of_household: 21900 },
    agencyName: "Arizona Department of Revenue",
    agencyUrl: "https://azdor.gov",
    estimatedTaxForm: "Form 140ES",
    filingDeadline: "April 15, June 15, September 15, January 15",
    hasLocalTax: false,
    localTaxNotes: "Arizona prohibits city or county personal income taxes.",
    editorialGuide: {} as StateEditorialGuide,
  },

  // 4. Arkansas
  {
    slug: "arkansas",
    code: "AR",
    name: "Arkansas",
    taxType: "progressive",
    standardDeduction: { single: 2340, married_joint: 4680, married_separate: 2340, head_of_household: 2340 },
    agencyName: "Arkansas Department of Finance and Administration",
    agencyUrl: "https://www.dfa.arkansas.gov",
    estimatedTaxForm: "Form AR1000ES",
    filingDeadline: "April 15, June 15, September 15, January 15",
    hasLocalTax: false,
    localTaxNotes: "No local city or county income taxes are levied in Arkansas.",
    brackets: {
      single: [
        { min: 0, max: 4400, rate: 0.02 },
        { min: 4400, max: 8800, rate: 0.03 },
        { min: 8800, max: null, rate: 0.039 },
      ],
      married_joint: [
        { min: 0, max: 8800, rate: 0.02 },
        { min: 8800, max: 17600, rate: 0.03 },
        { min: 17600, max: null, rate: 0.039 },
      ],
      married_separate: [
        { min: 0, max: 4400, rate: 0.02 },
        { min: 4400, max: 8800, rate: 0.03 },
        { min: 8800, max: null, rate: 0.039 },
      ],
      head_of_household: [
        { min: 0, max: 4400, rate: 0.02 },
        { min: 4400, max: 8800, rate: 0.03 },
        { min: 8800, max: null, rate: 0.039 },
      ],
    },
    editorialGuide: {} as StateEditorialGuide,
  },

  // 5. California
  {
    slug: "california",
    code: "CA",
    name: "California",
    taxType: "progressive",
    standardDeduction: { single: 5540, married_joint: 11080, married_separate: 5540, head_of_household: 11080 },
    agencyName: "California Franchise Tax Board (FTB)",
    agencyUrl: "https://www.ftb.ca.gov",
    estimatedTaxForm: "Form 540-ES",
    filingDeadline: "April 15 (30%), June 15 (40%), September 15 (0%), January 15 (30%)",
    hasLocalTax: false,
    localTaxNotes: "California cities do not levy personal income taxes, but San Francisco imposes an annual Gross Receipts Tax on business revenue over statutory thresholds.",
    brackets: {
      single: [
        { min: 0, max: 10412, rate: 0.01 },
        { min: 10412, max: 24684, rate: 0.02 },
        { min: 24684, max: 38959, rate: 0.04 },
        { min: 38959, max: 54081, rate: 0.06 },
        { min: 54081, max: 68350, rate: 0.08 },
        { min: 68350, max: 349137, rate: 0.093 },
        { min: 349137, max: 418961, rate: 0.103 },
        { min: 418961, max: 698271, rate: 0.113 },
        { min: 698271, max: 1000000, rate: 0.123 },
        { min: 1000000, max: null, rate: 0.133 },
      ],
      married_joint: [
        { min: 0, max: 20824, rate: 0.01 },
        { min: 20824, max: 49368, rate: 0.02 },
        { min: 49368, max: 77918, rate: 0.04 },
        { min: 77918, max: 108162, rate: 0.06 },
        { min: 108162, max: 136700, rate: 0.08 },
        { min: 136700, max: 698274, rate: 0.093 },
        { min: 698274, max: 837922, rate: 0.103 },
        { min: 837922, max: 1396542, rate: 0.113 },
        { min: 1396542, max: 2000000, rate: 0.123 },
        { min: 2000000, max: null, rate: 0.133 },
      ],
      married_separate: [
        { min: 0, max: 10412, rate: 0.01 },
        { min: 10412, max: 24684, rate: 0.02 },
        { min: 24684, max: 38959, rate: 0.04 },
        { min: 38959, max: 54081, rate: 0.06 },
        { min: 54081, max: 68350, rate: 0.08 },
        { min: 68350, max: 349137, rate: 0.093 },
        { min: 349137, max: 418961, rate: 0.103 },
        { min: 418961, max: 698271, rate: 0.113 },
        { min: 698271, max: 1000000, rate: 0.123 },
        { min: 1000000, max: null, rate: 0.133 },
      ],
      head_of_household: [
        { min: 0, max: 20839, rate: 0.01 },
        { min: 20839, max: 49369, rate: 0.02 },
        { min: 49369, max: 63638, rate: 0.04 },
        { min: 63638, max: 78759, rate: 0.06 },
        { min: 78759, max: 93028, rate: 0.08 },
        { min: 93028, max: 474824, rate: 0.093 },
        { min: 474824, max: 569788, rate: 0.103 },
        { min: 569788, max: 949649, rate: 0.113 },
        { min: 949649, max: 1000000, rate: 0.123 },
        { min: 1000000, max: null, rate: 0.133 },
      ],
    },
    editorialGuide: {} as StateEditorialGuide,
  },

  // 6. Colorado
  {
    slug: "colorado",
    code: "CO",
    name: "Colorado",
    taxType: "flat",
    flatRate: 0.044,
    standardDeduction: { single: 14600, married_joint: 29200, married_separate: 14600, head_of_household: 21900 },
    agencyName: "Colorado Department of Revenue",
    agencyUrl: "https://tax.colorado.gov",
    estimatedTaxForm: "Form DR 0104EP",
    filingDeadline: "April 15, June 15, September 15, January 15",
    hasLocalTax: true,
    localTaxNotes: "Denver, Aurora, and Sheridan levy an Occupational Privilege Tax (OPT) flat monthly payroll tax (~$5.75/month) on workers and business owners.",
    editorialGuide: {} as StateEditorialGuide,
  },

  // 7. Connecticut
  {
    slug: "connecticut",
    code: "CT",
    name: "Connecticut",
    taxType: "progressive",
    standardDeduction: { single: 15000, married_joint: 24000, married_separate: 12000, head_of_household: 19000 },
    agencyName: "Connecticut Department of Revenue Services",
    agencyUrl: "https://portal.ct.gov/drs",
    estimatedTaxForm: "Form CT-1040ES",
    filingDeadline: "April 15, June 15, September 15, January 15",
    hasLocalTax: false,
    localTaxNotes: "Connecticut has no municipal or county personal income taxes.",
    brackets: {
      single: [
        { min: 0, max: 10000, rate: 0.03 },
        { min: 10000, max: 50000, rate: 0.045 },
        { min: 50000, max: 100000, rate: 0.055 },
        { min: 100000, max: 200000, rate: 0.06 },
        { min: 200000, max: 250000, rate: 0.065 },
        { min: 250000, max: 500000, rate: 0.069 },
        { min: 500000, max: null, rate: 0.0699 },
      ],
      married_joint: [
        { min: 0, max: 20000, rate: 0.03 },
        { min: 20000, max: 100000, rate: 0.045 },
        { min: 100000, max: 200000, rate: 0.055 },
        { min: 200000, max: 400000, rate: 0.06 },
        { min: 400000, max: 500000, rate: 0.065 },
        { min: 500000, max: 1000000, rate: 0.069 },
        { min: 1000000, max: null, rate: 0.0699 },
      ],
      married_separate: [
        { min: 0, max: 10000, rate: 0.03 },
        { min: 10000, max: 50000, rate: 0.045 },
        { min: 50000, max: 100000, rate: 0.055 },
        { min: 100000, max: 200000, rate: 0.06 },
        { min: 200000, max: 250000, rate: 0.065 },
        { min: 250000, max: 500000, rate: 0.069 },
        { min: 500000, max: null, rate: 0.0699 },
      ],
      head_of_household: [
        { min: 0, max: 16000, rate: 0.03 },
        { min: 16000, max: 80000, rate: 0.045 },
        { min: 80000, max: 160000, rate: 0.055 },
        { min: 160000, max: 320000, rate: 0.06 },
        { min: 320000, max: 400000, rate: 0.065 },
        { min: 400000, max: 800000, rate: 0.069 },
        { min: 800000, max: null, rate: 0.0699 },
      ],
    },
    editorialGuide: {} as StateEditorialGuide,
  },

  // 8. Delaware
  {
    slug: "delaware",
    code: "DE",
    name: "Delaware",
    taxType: "progressive",
    standardDeduction: { single: 3250, married_joint: 6500, married_separate: 3250, head_of_household: 3250 },
    agencyName: "Delaware Division of Revenue",
    agencyUrl: "https://revenue.delaware.gov",
    estimatedTaxForm: "Form 200-ES",
    filingDeadline: "April 30, June 15, September 15, January 15",
    hasLocalTax: true,
    localTaxNotes: "The City of Wilmington levies a 1.25% earned income wage tax on residents and individuals working within city limits.",
    brackets: {
      single: [
        { min: 0, max: 2000, rate: 0.0 },
        { min: 2000, max: 5000, rate: 0.022 },
        { min: 5000, max: 10000, rate: 0.039 },
        { min: 10000, max: 20000, rate: 0.048 },
        { min: 20000, max: 25000, rate: 0.052 },
        { min: 25000, max: 60000, rate: 0.0555 },
        { min: 60000, max: null, rate: 0.066 },
      ],
      married_joint: [
        { min: 0, max: 2000, rate: 0.0 },
        { min: 2000, max: 5000, rate: 0.022 },
        { min: 5000, max: 10000, rate: 0.039 },
        { min: 10000, max: 20000, rate: 0.048 },
        { min: 20000, max: 25000, rate: 0.052 },
        { min: 25000, max: 60000, rate: 0.0555 },
        { min: 60000, max: null, rate: 0.066 },
      ],
      married_separate: [
        { min: 0, max: 2000, rate: 0.0 },
        { min: 2000, max: 5000, rate: 0.022 },
        { min: 5000, max: 10000, rate: 0.039 },
        { min: 10000, max: 20000, rate: 0.048 },
        { min: 20000, max: 25000, rate: 0.052 },
        { min: 25000, max: 60000, rate: 0.0555 },
        { min: 60000, max: null, rate: 0.066 },
      ],
      head_of_household: [
        { min: 0, max: 2000, rate: 0.0 },
        { min: 2000, max: 5000, rate: 0.022 },
        { min: 5000, max: 10000, rate: 0.039 },
        { min: 10000, max: 20000, rate: 0.048 },
        { min: 20000, max: 25000, rate: 0.052 },
        { min: 25000, max: 60000, rate: 0.0555 },
        { min: 60000, max: null, rate: 0.066 },
      ],
    },
    editorialGuide: {} as StateEditorialGuide,
  },

  // 9. District of Columbia
  {
    slug: "district-of-columbia",
    code: "DC",
    name: "District of Columbia",
    taxType: "progressive",
    standardDeduction: { single: 14600, married_joint: 29200, married_separate: 14600, head_of_household: 21900 },
    agencyName: "DC Office of Tax and Revenue (OTR)",
    agencyUrl: "https://otr.cfo.dc.gov",
    estimatedTaxForm: "Form D-40ES",
    filingDeadline: "April 15, June 15, September 15, January 15",
    hasLocalTax: true,
    localTaxNotes: "DC levies an Unincorporated Business Franchise Tax (UBT) on business entities with gross income over $12,000, with a $100k net exemption.",
    brackets: {
      single: [
        { min: 0, max: 10000, rate: 0.04 },
        { min: 10000, max: 40000, rate: 0.06 },
        { min: 40000, max: 60000, rate: 0.065 },
        { min: 60000, max: 250000, rate: 0.085 },
        { min: 250000, max: 500000, rate: 0.0925 },
        { min: 500000, max: 1000000, rate: 0.0975 },
        { min: 1000000, max: null, rate: 0.1075 },
      ],
      married_joint: [
        { min: 0, max: 10000, rate: 0.04 },
        { min: 10000, max: 40000, rate: 0.06 },
        { min: 40000, max: 60000, rate: 0.065 },
        { min: 60000, max: 250000, rate: 0.085 },
        { min: 250000, max: 500000, rate: 0.0925 },
        { min: 500000, max: 1000000, rate: 0.0975 },
        { min: 1000000, max: null, rate: 0.1075 },
      ],
      married_separate: [
        { min: 0, max: 5000, rate: 0.04 },
        { min: 5000, max: 20000, rate: 0.06 },
        { min: 20000, max: 30000, rate: 0.065 },
        { min: 30000, max: 125000, rate: 0.085 },
        { min: 125000, max: 250000, rate: 0.0925 },
        { min: 250000, max: 500000, rate: 0.0975 },
        { min: 500000, max: null, rate: 0.1075 },
      ],
      head_of_household: [
        { min: 0, max: 10000, rate: 0.04 },
        { min: 10000, max: 40000, rate: 0.06 },
        { min: 40000, max: 60000, rate: 0.065 },
        { min: 60000, max: 250000, rate: 0.085 },
        { min: 250000, max: 500000, rate: 0.0925 },
        { min: 500000, max: 1000000, rate: 0.0975 },
        { min: 1000000, max: null, rate: 0.1075 },
      ],
    },
    editorialGuide: {} as StateEditorialGuide,
  },

  // 10. Florida
  {
    slug: "florida",
    code: "FL",
    name: "Florida",
    taxType: "none",
    standardDeduction: { single: 0, married_joint: 0, married_separate: 0, head_of_household: 0 },
    agencyName: "Florida Department of Revenue",
    agencyUrl: "https://floridarevenue.com",
    estimatedTaxForm: "N/A (No State Income Tax)",
    filingDeadline: "N/A",
    hasLocalTax: false,
    localTaxNotes: "The Florida Constitution bans personal income taxes at state and municipal levels. Sales tax is 6% plus county discretionary surtaxes (0.5% - 1.5%).",
    editorialGuide: {} as StateEditorialGuide,
  },

  // 11. Georgia
  {
    slug: "georgia",
    code: "GA",
    name: "Georgia",
    taxType: "flat",
    flatRate: 0.0549,
    standardDeduction: { single: 12000, married_joint: 24000, married_separate: 12000, head_of_household: 12000 },
    agencyName: "Georgia Department of Revenue",
    agencyUrl: "https://dor.georgia.gov",
    estimatedTaxForm: "Form 500-ES",
    filingDeadline: "April 15, June 15, September 15, January 15",
    hasLocalTax: false,
    localTaxNotes: "Georgia counties and municipalities do not levy local personal income taxes.",
    editorialGuide: {} as StateEditorialGuide,
  },

  // 12. Hawaii
  {
    slug: "hawaii",
    code: "HI",
    name: "Hawaii",
    taxType: "progressive",
    standardDeduction: { single: 2200, married_joint: 4400, married_separate: 2200, head_of_household: 3212 },
    agencyName: "Hawaii Department of Taxation",
    agencyUrl: "https://tax.hawaii.gov",
    estimatedTaxForm: "Form N-11ES",
    filingDeadline: "April 20, June 20, September 20, January 20",
    hasLocalTax: true,
    localTaxNotes: "Hawaii levies a General Excise Tax (GET) of 4.0% to 4.5% on gross business revenues across all 1099 services.",
    brackets: {
      single: [
        { min: 0, max: 2400, rate: 0.014 },
        { min: 2400, max: 4800, rate: 0.032 },
        { min: 4800, max: 9600, rate: 0.055 },
        { min: 9600, max: 14400, rate: 0.064 },
        { min: 14400, max: 19200, rate: 0.068 },
        { min: 19200, max: 24000, rate: 0.072 },
        { min: 24000, max: 36000, rate: 0.076 },
        { min: 36000, max: 48000, rate: 0.079 },
        { min: 48000, max: 150000, rate: 0.0825 },
        { min: 150000, max: 175000, rate: 0.09 },
        { min: 175000, max: 200000, rate: 0.1 },
        { min: 200000, max: null, rate: 0.11 },
      ],
      married_joint: [
        { min: 0, max: 4800, rate: 0.014 },
        { min: 4800, max: 9600, rate: 0.032 },
        { min: 9600, max: 19200, rate: 0.055 },
        { min: 19200, max: 28800, rate: 0.064 },
        { min: 28800, max: 38400, rate: 0.068 },
        { min: 38400, max: 48000, rate: 0.072 },
        { min: 48000, max: 72000, rate: 0.076 },
        { min: 72000, max: 96000, rate: 0.079 },
        { min: 96000, max: 300000, rate: 0.0825 },
        { min: 300000, max: 350000, rate: 0.09 },
        { min: 350000, max: 400000, rate: 0.1 },
        { min: 400000, max: null, rate: 0.11 },
      ],
      married_separate: [
        { min: 0, max: 2400, rate: 0.014 },
        { min: 2400, max: 4800, rate: 0.032 },
        { min: 4800, max: 9600, rate: 0.055 },
        { min: 9600, max: 14400, rate: 0.064 },
        { min: 14400, max: 19200, rate: 0.068 },
        { min: 19200, max: 24000, rate: 0.072 },
        { min: 24000, max: 36000, rate: 0.076 },
        { min: 36000, max: 48000, rate: 0.079 },
        { min: 48000, max: 150000, rate: 0.0825 },
        { min: 150000, max: 175000, rate: 0.09 },
        { min: 175000, max: 200000, rate: 0.1 },
        { min: 200000, max: null, rate: 0.11 },
      ],
      head_of_household: [
        { min: 0, max: 3600, rate: 0.014 },
        { min: 3600, max: 7200, rate: 0.032 },
        { min: 7200, max: 14400, rate: 0.055 },
        { min: 14400, max: 21600, rate: 0.064 },
        { min: 21600, max: 28800, rate: 0.068 },
        { min: 28800, max: 36000, rate: 0.072 },
        { min: 36000, max: 54000, rate: 0.076 },
        { min: 54000, max: 72000, rate: 0.079 },
        { min: 72000, max: 225000, rate: 0.0825 },
        { min: 225000, max: 262500, rate: 0.09 },
        { min: 262500, max: 300000, rate: 0.1 },
        { min: 300000, max: null, rate: 0.11 },
      ],
    },
    editorialGuide: {} as StateEditorialGuide,
  },

  // 13. Idaho
  {
    slug: "idaho",
    code: "ID",
    name: "Idaho",
    taxType: "flat",
    flatRate: 0.05695,
    standardDeduction: { single: 14600, married_joint: 29200, married_separate: 14600, head_of_household: 21900 },
    agencyName: "Idaho State Tax Commission",
    agencyUrl: "https://tax.idaho.gov",
    estimatedTaxForm: "Form 51",
    filingDeadline: "April 15, June 15, September 15, January 15",
    hasLocalTax: false,
    localTaxNotes: "Idaho does not permit municipal personal earned income taxes.",
    editorialGuide: {} as StateEditorialGuide,
  },

  // 14. Illinois
  {
    slug: "illinois",
    code: "IL",
    name: "Illinois",
    taxType: "flat",
    flatRate: 0.0495,
    standardDeduction: { single: 2775, married_joint: 5550, married_separate: 2775, head_of_household: 2775 },
    agencyName: "Illinois Department of Revenue",
    agencyUrl: "https://tax.illinois.gov",
    estimatedTaxForm: "Form IL-1040-ES",
    filingDeadline: "April 15, June 15, September 15, January 15",
    hasLocalTax: false,
    localTaxNotes: "Illinois has a constitutional flat tax mandate and forbids municipal personal income taxes.",
    editorialGuide: {} as StateEditorialGuide,
  },

  // 15. Indiana
  {
    slug: "indiana",
    code: "IN",
    name: "Indiana",
    taxType: "flat",
    flatRate: 0.0305,
    standardDeduction: { single: 1000, married_joint: 2000, married_separate: 1000, head_of_household: 1000 },
    agencyName: "Indiana Department of Revenue",
    agencyUrl: "https://www.in.gov/dor",
    estimatedTaxForm: "Form IT-40ES",
    filingDeadline: "April 15, June 15, September 15, January 15",
    hasLocalTax: true,
    localTaxNotes: "All 92 Indiana counties levy a Local Income Tax (LIT) between 0.5% and 3.0% (e.g. Marion County 2.02%, Hamilton 1.10%).",
    editorialGuide: {} as StateEditorialGuide,
  },

  // 16. Iowa
  {
    slug: "iowa",
    code: "IA",
    name: "Iowa",
    taxType: "flat",
    flatRate: 0.038,
    standardDeduction: { single: 14600, married_joint: 29200, married_separate: 14600, head_of_household: 21900 },
    agencyName: "Iowa Department of Revenue",
    agencyUrl: "https://tax.iowa.gov",
    estimatedTaxForm: "Form IA 1040ES",
    filingDeadline: "April 30, June 30, September 30, January 31",
    hasLocalTax: true,
    localTaxNotes: "Certain school districts in Iowa impose an income surtax (1% to 20% of state tax liability).",
    editorialGuide: {} as StateEditorialGuide,
  },

  // 17. Kansas
  {
    slug: "kansas",
    code: "KS",
    name: "Kansas",
    taxType: "progressive",
    standardDeduction: { single: 3500, married_joint: 8000, married_separate: 3500, head_of_household: 6000 },
    agencyName: "Kansas Department of Revenue",
    agencyUrl: "https://www.ksrevenue.gov",
    estimatedTaxForm: "Form K-40ES",
    filingDeadline: "April 15, June 15, September 15, January 15",
    hasLocalTax: false,
    localTaxNotes: "Certain Kansas counties levy a local tax on intangible earnings, but no municipal income tax on 1099 wages.",
    brackets: {
      single: [
        { min: 0, max: 15000, rate: 0.031 },
        { min: 15000, max: 30000, rate: 0.0525 },
        { min: 30000, max: null, rate: 0.057 },
      ],
      married_joint: [
        { min: 0, max: 30000, rate: 0.031 },
        { min: 30000, max: 60000, rate: 0.0525 },
        { min: 60000, max: null, rate: 0.057 },
      ],
      married_separate: [
        { min: 0, max: 15000, rate: 0.031 },
        { min: 15000, max: 30000, rate: 0.0525 },
        { min: 30000, max: null, rate: 0.057 },
      ],
      head_of_household: [
        { min: 0, max: 15000, rate: 0.031 },
        { min: 15000, max: 30000, rate: 0.0525 },
        { min: 30000, max: null, rate: 0.057 },
      ],
    },
    editorialGuide: {} as StateEditorialGuide,
  },

  // 18. Kentucky
  {
    slug: "kentucky",
    code: "KY",
    name: "Kentucky",
    taxType: "flat",
    flatRate: 0.04,
    standardDeduction: { single: 3160, married_joint: 3160, married_separate: 3160, head_of_household: 3160 },
    agencyName: "Kentucky Department of Revenue",
    agencyUrl: "https://revenue.ky.gov",
    estimatedTaxForm: "Form 740-ES",
    filingDeadline: "April 15, June 15, September 15, January 15",
    hasLocalTax: true,
    localTaxNotes: "Many Kentucky municipalities enforce an occupational license tax (e.g. Louisville 2.2%, Lexington 2.25%).",
    editorialGuide: {} as StateEditorialGuide,
  },

  // 19. Louisiana
  {
    slug: "louisiana",
    code: "LA",
    name: "Louisiana",
    taxType: "progressive",
    standardDeduction: { single: 4500, married_joint: 9000, married_separate: 4500, head_of_household: 9000 },
    agencyName: "Louisiana Department of Revenue",
    agencyUrl: "https://revenue.louisiana.gov",
    estimatedTaxForm: "Form IT-540ES",
    filingDeadline: "April 15, June 15, September 15, January 15",
    hasLocalTax: false,
    localTaxNotes: "Louisiana parishes levy local sales taxes, but no local earned income taxes.",
    brackets: {
      single: [
        { min: 0, max: 12500, rate: 0.0185 },
        { min: 12500, max: 50000, rate: 0.035 },
        { min: 50000, max: null, rate: 0.0425 },
      ],
      married_joint: [
        { min: 0, max: 25000, rate: 0.0185 },
        { min: 25000, max: 100000, rate: 0.035 },
        { min: 100000, max: null, rate: 0.0425 },
      ],
      married_separate: [
        { min: 0, max: 12500, rate: 0.0185 },
        { min: 12500, max: 50000, rate: 0.035 },
        { min: 50000, max: null, rate: 0.0425 },
      ],
      head_of_household: [
        { min: 0, max: 12500, rate: 0.0185 },
        { min: 12500, max: 50000, rate: 0.035 },
        { min: 50000, max: null, rate: 0.0425 },
      ],
    },
    editorialGuide: {} as StateEditorialGuide,
  },

  // 20. Maine
  {
    slug: "maine",
    code: "ME",
    name: "Maine",
    taxType: "progressive",
    standardDeduction: { single: 14600, married_joint: 29200, married_separate: 14600, head_of_household: 21900 },
    agencyName: "Maine Revenue Services",
    agencyUrl: "https://www.maine.gov/revenue",
    estimatedTaxForm: "Form 1040ES-ME",
    filingDeadline: "April 15, June 15, September 15, January 15",
    hasLocalTax: false,
    localTaxNotes: "Maine municipalities do not levy personal income taxes.",
    brackets: {
      single: [
        { min: 0, max: 26050, rate: 0.058 },
        { min: 26050, max: 61600, rate: 0.0675 },
        { min: 61600, max: null, rate: 0.0715 },
      ],
      married_joint: [
        { min: 0, max: 52150, rate: 0.058 },
        { min: 52150, max: 123250, rate: 0.0675 },
        { min: 123250, max: null, rate: 0.0715 },
      ],
      married_separate: [
        { min: 0, max: 26050, rate: 0.058 },
        { min: 26050, max: 61600, rate: 0.0675 },
        { min: 61600, max: null, rate: 0.0715 },
      ],
      head_of_household: [
        { min: 0, max: 39100, rate: 0.058 },
        { min: 39100, max: 92450, rate: 0.0675 },
        { min: 92450, max: null, rate: 0.0715 },
      ],
    },
    editorialGuide: {} as StateEditorialGuide,
  },

  // 21. Maryland
  {
    slug: "maryland",
    code: "MD",
    name: "Maryland",
    taxType: "progressive",
    standardDeduction: { single: 2550, married_joint: 5150, married_separate: 2550, head_of_household: 5150 },
    agencyName: "Comptroller of Maryland",
    agencyUrl: "https://www.marylandtaxes.gov",
    estimatedTaxForm: "Form PV (502D)",
    filingDeadline: "April 15, June 15, September 15, January 15",
    hasLocalTax: true,
    localTaxNotes: "Every Maryland resident pays a mandatory county income tax (ranging from 2.25% in Worcester to 3.20% in Montgomery and Baltimore City) collected on the state return.",
    brackets: {
      single: [
        { min: 0, max: 1000, rate: 0.02 },
        { min: 1000, max: 2000, rate: 0.03 },
        { min: 2000, max: 3000, rate: 0.04 },
        { min: 3000, max: 100000, rate: 0.0475 },
        { min: 100000, max: 125000, rate: 0.05 },
        { min: 125000, max: 150000, rate: 0.0525 },
        { min: 150000, max: 250000, rate: 0.055 },
        { min: 250000, max: null, rate: 0.0575 },
      ],
      married_joint: [
        { min: 0, max: 1000, rate: 0.02 },
        { min: 1000, max: 2000, rate: 0.03 },
        { min: 2000, max: 3000, rate: 0.04 },
        { min: 3000, max: 150000, rate: 0.0475 },
        { min: 150000, max: 175000, rate: 0.05 },
        { min: 175000, max: 225000, rate: 0.0525 },
        { min: 225000, max: 300000, rate: 0.055 },
        { min: 300000, max: null, rate: 0.0575 },
      ],
      married_separate: [
        { min: 0, max: 1000, rate: 0.02 },
        { min: 1000, max: 2000, rate: 0.03 },
        { min: 2000, max: 3000, rate: 0.04 },
        { min: 3000, max: 100000, rate: 0.0475 },
        { min: 100000, max: 125000, rate: 0.05 },
        { min: 125000, max: 150000, rate: 0.0525 },
        { min: 150000, max: 250000, rate: 0.055 },
        { min: 250000, max: null, rate: 0.0575 },
      ],
      head_of_household: [
        { min: 0, max: 1000, rate: 0.02 },
        { min: 1000, max: 2000, rate: 0.03 },
        { min: 2000, max: 3000, rate: 0.04 },
        { min: 3000, max: 150000, rate: 0.0475 },
        { min: 150000, max: 175000, rate: 0.05 },
        { min: 175000, max: 225000, rate: 0.0525 },
        { min: 225000, max: 300000, rate: 0.055 },
        { min: 300000, max: null, rate: 0.0575 },
      ],
    },
    editorialGuide: {} as StateEditorialGuide,
  },

  // 22. Massachusetts
  {
    slug: "massachusetts",
    code: "MA",
    name: "Massachusetts",
    taxType: "flat",
    flatRate: 0.05,
    standardDeduction: { single: 4400, married_joint: 8800, married_separate: 4400, head_of_household: 6800 },
    agencyName: "Massachusetts Department of Revenue",
    agencyUrl: "https://www.mass.gov/dor",
    estimatedTaxForm: "Form 1-ES",
    filingDeadline: "April 15, June 15, September 15, January 15",
    hasLocalTax: false,
    localTaxNotes: "Massachusetts has no municipal income taxes. A 4.0% surtax applies to taxable income exceeding $1,053,750.",
    editorialGuide: {} as StateEditorialGuide,
  },

  // 23. Michigan
  {
    slug: "michigan",
    code: "MI",
    name: "Michigan",
    taxType: "flat",
    flatRate: 0.0425,
    standardDeduction: { single: 5600, married_joint: 11200, married_separate: 5600, head_of_household: 5600 },
    agencyName: "Michigan Department of Treasury",
    agencyUrl: "https://www.michigan.gov/taxes",
    estimatedTaxForm: "Form MI-1040ES",
    filingDeadline: "April 15, June 15, September 15, January 15",
    hasLocalTax: true,
    localTaxNotes: "24 Michigan cities levy city income taxes (e.g., Detroit: 2.4% resident / 1.2% non-resident; Grand Rapids, Lansing, Flint: 1.0% / 0.5%).",
    editorialGuide: {} as StateEditorialGuide,
  },

  // 24. Minnesota
  {
    slug: "minnesota",
    code: "MN",
    name: "Minnesota",
    taxType: "progressive",
    standardDeduction: { single: 14600, married_joint: 29200, married_separate: 14600, head_of_household: 21900 },
    agencyName: "Minnesota Department of Revenue",
    agencyUrl: "https://www.revenue.state.mn.us",
    estimatedTaxForm: "Form M13",
    filingDeadline: "April 15, June 15, September 15, January 15",
    hasLocalTax: false,
    localTaxNotes: "Minnesota does not levy local personal earned income taxes.",
    brackets: {
      single: [
        { min: 0, max: 31690, rate: 0.0535 },
        { min: 31690, max: 104090, rate: 0.068 },
        { min: 104090, max: 193240, rate: 0.0785 },
        { min: 193240, max: null, rate: 0.0985 },
      ],
      married_joint: [
        { min: 0, max: 46330, rate: 0.0535 },
        { min: 46330, max: 184080, rate: 0.068 },
        { min: 184080, max: 321450, rate: 0.0785 },
        { min: 321450, max: null, rate: 0.0985 },
      ],
      married_separate: [
        { min: 0, max: 23165, rate: 0.0535 },
        { min: 23165, max: 92040, rate: 0.068 },
        { min: 92040, max: 160725, rate: 0.0785 },
        { min: 160725, max: null, rate: 0.0985 },
      ],
      head_of_household: [
        { min: 0, max: 39010, rate: 0.0535 },
        { min: 39010, max: 156760, rate: 0.068 },
        { min: 156760, max: 256880, rate: 0.0785 },
        { min: 256880, max: null, rate: 0.0985 },
      ],
    },
    editorialGuide: {} as StateEditorialGuide,
  },

  // 25. Mississippi
  {
    slug: "mississippi",
    code: "MS",
    name: "Mississippi",
    taxType: "flat",
    flatRate: 0.047,
    standardDeduction: { single: 8300, married_joint: 16600, married_separate: 8300, head_of_household: 11700 },
    agencyName: "Mississippi Department of Revenue",
    agencyUrl: "https://www.dor.ms.gov",
    estimatedTaxForm: "Form 80-105",
    filingDeadline: "April 15, June 15, September 15, January 15",
    hasLocalTax: false,
    localTaxNotes: "Mississippi counties and municipalities do not levy personal income taxes.",
    editorialGuide: {} as StateEditorialGuide,
  },

  // 26. Missouri
  {
    slug: "missouri",
    code: "MO",
    name: "Missouri",
    taxType: "progressive",
    standardDeduction: { single: 14600, married_joint: 29200, married_separate: 14600, head_of_household: 21900 },
    agencyName: "Missouri Department of Revenue",
    agencyUrl: "https://dor.mo.gov",
    estimatedTaxForm: "Form MO-1040ES",
    filingDeadline: "April 15, June 15, September 15, January 15",
    hasLocalTax: true,
    localTaxNotes: "St. Louis and Kansas City both levy a 1.0% earnings tax on residents and non-residents who perform work within city borders.",
    brackets: {
      single: [
        { min: 0, max: 1273, rate: 0.0 },
        { min: 1273, max: 2546, rate: 0.02 },
        { min: 2546, max: 3819, rate: 0.025 },
        { min: 3819, max: 5092, rate: 0.03 },
        { min: 5092, max: 6365, rate: 0.035 },
        { min: 6365, max: 7638, rate: 0.04 },
        { min: 7638, max: 8911, rate: 0.045 },
        { min: 8911, max: null, rate: 0.048 },
      ],
      married_joint: [
        { min: 0, max: 1273, rate: 0.0 },
        { min: 1273, max: 2546, rate: 0.02 },
        { min: 2546, max: 3819, rate: 0.025 },
        { min: 3819, max: 5092, rate: 0.03 },
        { min: 5092, max: 6365, rate: 0.035 },
        { min: 6365, max: 7638, rate: 0.04 },
        { min: 7638, max: 8911, rate: 0.045 },
        { min: 8911, max: null, rate: 0.048 },
      ],
      married_separate: [
        { min: 0, max: 1273, rate: 0.0 },
        { min: 1273, max: 2546, rate: 0.02 },
        { min: 2546, max: 3819, rate: 0.025 },
        { min: 3819, max: 5092, rate: 0.03 },
        { min: 5092, max: 6365, rate: 0.035 },
        { min: 6365, max: 7638, rate: 0.04 },
        { min: 7638, max: 8911, rate: 0.045 },
        { min: 8911, max: null, rate: 0.048 },
      ],
      head_of_household: [
        { min: 0, max: 1273, rate: 0.0 },
        { min: 1273, max: 2546, rate: 0.02 },
        { min: 2546, max: 3819, rate: 0.025 },
        { min: 3819, max: 5092, rate: 0.03 },
        { min: 5092, max: 6365, rate: 0.035 },
        { min: 6365, max: 7638, rate: 0.04 },
        { min: 7638, max: 8911, rate: 0.045 },
        { min: 8911, max: null, rate: 0.048 },
      ],
    },
    editorialGuide: {} as StateEditorialGuide,
  },

  // 27. Montana
  {
    slug: "montana",
    code: "MT",
    name: "Montana",
    taxType: "progressive",
    standardDeduction: { single: 14600, married_joint: 29200, married_separate: 14600, head_of_household: 21900 },
    agencyName: "Montana Department of Revenue",
    agencyUrl: "https://mtrevenue.gov",
    estimatedTaxForm: "Form ESW",
    filingDeadline: "April 15, June 15, September 15, January 15",
    hasLocalTax: false,
    localTaxNotes: "Montana has no local personal earned income taxes and no general state sales tax.",
    brackets: {
      single: [
        { min: 0, max: 20500, rate: 0.047 },
        { min: 20500, max: null, rate: 0.059 },
      ],
      married_joint: [
        { min: 0, max: 41000, rate: 0.047 },
        { min: 41000, max: null, rate: 0.059 },
      ],
      married_separate: [
        { min: 0, max: 20500, rate: 0.047 },
        { min: 20500, max: null, rate: 0.059 },
      ],
      head_of_household: [
        { min: 0, max: 30750, rate: 0.047 },
        { min: 30750, max: null, rate: 0.059 },
      ],
    },
    editorialGuide: {} as StateEditorialGuide,
  },

  // 28. Nebraska
  {
    slug: "nebraska",
    code: "NE",
    name: "Nebraska",
    taxType: "progressive",
    standardDeduction: { single: 8250, married_joint: 16500, married_separate: 8250, head_of_household: 12200 },
    agencyName: "Nebraska Department of Revenue",
    agencyUrl: "https://revenue.nebraska.gov",
    estimatedTaxForm: "Form 1040N-ES",
    filingDeadline: "April 15, June 15, September 15, January 15",
    hasLocalTax: false,
    localTaxNotes: "Nebraska cities do not levy municipal earned income taxes.",
    brackets: {
      single: [
        { min: 0, max: 3700, rate: 0.0246 },
        { min: 3700, max: 22170, rate: 0.0351 },
        { min: 22170, max: 37670, rate: 0.0501 },
        { min: 37670, max: null, rate: 0.0584 },
      ],
      married_joint: [
        { min: 0, max: 7400, rate: 0.0246 },
        { min: 7400, max: 44340, rate: 0.0351 },
        { min: 44340, max: 75340, rate: 0.0501 },
        { min: 75340, max: null, rate: 0.0584 },
      ],
      married_separate: [
        { min: 0, max: 3700, rate: 0.0246 },
        { min: 3700, max: 22170, rate: 0.0351 },
        { min: 22170, max: 37670, rate: 0.0501 },
        { min: 37670, max: null, rate: 0.0584 },
      ],
      head_of_household: [
        { min: 0, max: 6860, rate: 0.0246 },
        { min: 6860, max: 33260, rate: 0.0351 },
        { min: 33260, max: 55430, rate: 0.0501 },
        { min: 55430, max: null, rate: 0.0584 },
      ],
    },
    editorialGuide: {} as StateEditorialGuide,
  },

  // 29. Nevada
  {
    slug: "nevada",
    code: "NV",
    name: "Nevada",
    taxType: "none",
    standardDeduction: { single: 0, married_joint: 0, married_separate: 0, head_of_household: 0 },
    agencyName: "Nevada Department of Taxation",
    agencyUrl: "https://tax.nv.gov",
    estimatedTaxForm: "N/A (No State Income Tax)",
    filingDeadline: "N/A",
    hasLocalTax: false,
    localTaxNotes: "Nevada imposes no individual income tax. A Commerce Tax applies only to businesses with Nevada gross revenues over $4,000,000.",
    editorialGuide: {} as StateEditorialGuide,
  },

  // 30. New Hampshire
  {
    slug: "new-hampshire",
    code: "NH",
    name: "New Hampshire",
    taxType: "none",
    standardDeduction: { single: 0, married_joint: 0, married_separate: 0, head_of_household: 0 },
    agencyName: "New Hampshire Department of Revenue Administration",
    agencyUrl: "https://www.revenue.nh.gov",
    estimatedTaxForm: "N/A (No Tax on 1099 Earned Income)",
    filingDeadline: "N/A",
    hasLocalTax: false,
    localTaxNotes: "New Hampshire imposes 0% tax on earned freelance wages. Interest & Dividends tax is 3% for 2024, 2% for 2025, and fully repeals on January 1, 2027.",
    editorialGuide: {} as StateEditorialGuide,
  },

  // 31. New Jersey
  {
    slug: "new-jersey",
    code: "NJ",
    name: "New Jersey",
    taxType: "progressive",
    standardDeduction: { single: 1000, married_joint: 2000, married_separate: 1000, head_of_household: 1000 },
    agencyName: "New Jersey Division of Taxation",
    agencyUrl: "https://www.nj.gov/treasury/taxation",
    estimatedTaxForm: "Form NJ-1040-ES",
    filingDeadline: "April 15, June 15, September 15, January 15",
    hasLocalTax: false,
    localTaxNotes: "Newark imposes a 1% payroll tax on employers, but New Jersey municipalities do not levy personal income taxes on residents.",
    brackets: {
      single: [
        { min: 0, max: 20000, rate: 0.014 },
        { min: 20000, max: 35000, rate: 0.0175 },
        { min: 35000, max: 40000, rate: 0.035 },
        { min: 40000, max: 75000, rate: 0.05525 },
        { min: 75000, max: 500000, rate: 0.0637 },
        { min: 500000, max: 1000000, rate: 0.0897 },
        { min: 1000000, max: null, rate: 0.1075 },
      ],
      married_joint: [
        { min: 0, max: 20000, rate: 0.014 },
        { min: 20000, max: 50000, rate: 0.0175 },
        { min: 50000, max: 70000, rate: 0.0245 },
        { min: 70000, max: 80000, rate: 0.035 },
        { min: 80000, max: 150000, rate: 0.05525 },
        { min: 150000, max: 500000, rate: 0.0637 },
        { min: 500000, max: 1000000, rate: 0.0897 },
        { min: 1000000, max: null, rate: 0.1075 },
      ],
      married_separate: [
        { min: 0, max: 20000, rate: 0.014 },
        { min: 20000, max: 35000, rate: 0.0175 },
        { min: 35000, max: 40000, rate: 0.035 },
        { min: 40000, max: 75000, rate: 0.05525 },
        { min: 75000, max: 500000, rate: 0.0637 },
        { min: 500000, max: 1000000, rate: 0.0897 },
        { min: 1000000, max: null, rate: 0.1075 },
      ],
      head_of_household: [
        { min: 0, max: 20000, rate: 0.014 },
        { min: 20000, max: 50000, rate: 0.0175 },
        { min: 50000, max: 70000, rate: 0.0245 },
        { min: 70000, max: 80000, rate: 0.035 },
        { min: 80000, max: 150000, rate: 0.05525 },
        { min: 150000, max: 500000, rate: 0.0637 },
        { min: 500000, max: 1000000, rate: 0.0897 },
        { min: 1000000, max: null, rate: 0.1075 },
      ],
    },
    editorialGuide: {} as StateEditorialGuide,
  },

  // 32. New Mexico
  {
    slug: "new-mexico",
    code: "NM",
    name: "New Mexico",
    taxType: "progressive",
    standardDeduction: { single: 14600, married_joint: 29200, married_separate: 14600, head_of_household: 21900 },
    agencyName: "New Mexico Taxation and Revenue Department",
    agencyUrl: "https://www.tax.newmexico.gov",
    estimatedTaxForm: "Form PIT-ES",
    filingDeadline: "April 15, June 15, September 15, January 15",
    hasLocalTax: true,
    localTaxNotes: "New Mexico imposes a state and local Gross Receipts Tax (GRT) (ranging from 5.125% to over 9%) that applies to sales of freelance and independent contractor services.",
    brackets: {
      single: [
        { min: 0, max: 5500, rate: 0.017 },
        { min: 5500, max: 11000, rate: 0.032 },
        { min: 11000, max: 16000, rate: 0.047 },
        { min: 16000, max: 210000, rate: 0.049 },
        { min: 210000, max: null, rate: 0.059 },
      ],
      married_joint: [
        { min: 0, max: 8000, rate: 0.017 },
        { min: 8000, max: 16000, rate: 0.032 },
        { min: 16000, max: 24000, rate: 0.047 },
        { min: 24000, max: 315000, rate: 0.049 },
        { min: 315000, max: null, rate: 0.059 },
      ],
      married_separate: [
        { min: 0, max: 4000, rate: 0.017 },
        { min: 4000, max: 8000, rate: 0.032 },
        { min: 8000, max: 12000, rate: 0.047 },
        { min: 12000, max: 157500, rate: 0.049 },
        { min: 157500, max: null, rate: 0.059 },
      ],
      head_of_household: [
        { min: 0, max: 5500, rate: 0.017 },
        { min: 5500, max: 11000, rate: 0.032 },
        { min: 11000, max: 16000, rate: 0.047 },
        { min: 16000, max: 210000, rate: 0.049 },
        { min: 210000, max: null, rate: 0.059 },
      ],
    },
    editorialGuide: {} as StateEditorialGuide,
  },

  // 33. New York
  {
    slug: "new-york",
    code: "NY",
    name: "New York",
    taxType: "progressive",
    standardDeduction: { single: 8000, married_joint: 16050, married_separate: 8000, head_of_household: 11200 },
    agencyName: "New York State Department of Taxation and Finance",
    agencyUrl: "https://www.tax.ny.gov",
    estimatedTaxForm: "Form IT-2105",
    filingDeadline: "April 15, June 15, September 15, January 15",
    hasLocalTax: true,
    localTaxNotes: "New York City residents must pay NYC personal income tax (3.078% to 3.876%) and potentially NYC Unincorporated Business Tax (UBT 4.0%). Yonkers imposes an income tax surcharge (16.75% of state tax).",
    brackets: {
      single: [
        { min: 0, max: 8500, rate: 0.04 },
        { min: 8500, max: 11700, rate: 0.045 },
        { min: 11700, max: 13900, rate: 0.0525 },
        { min: 13900, max: 80650, rate: 0.055 },
        { min: 80650, max: 215400, rate: 0.06 },
        { min: 215400, max: 1077550, rate: 0.0685 },
        { min: 1077550, max: 5000000, rate: 0.0965 },
        { min: 5000000, max: 25000000, rate: 0.103 },
        { min: 25000000, max: null, rate: 0.109 },
      ],
      married_joint: [
        { min: 0, max: 17150, rate: 0.04 },
        { min: 17150, max: 23600, rate: 0.045 },
        { min: 23600, max: 27900, rate: 0.0525 },
        { min: 27900, max: 161550, rate: 0.055 },
        { min: 161550, max: 323200, rate: 0.06 },
        { min: 323200, max: 2155350, rate: 0.0685 },
        { min: 2155350, max: 5000000, rate: 0.0965 },
        { min: 5000000, max: 25000000, rate: 0.103 },
        { min: 25000000, max: null, rate: 0.109 },
      ],
      married_separate: [
        { min: 0, max: 8500, rate: 0.04 },
        { min: 8500, max: 11700, rate: 0.045 },
        { min: 11700, max: 13900, rate: 0.0525 },
        { min: 13900, max: 80650, rate: 0.055 },
        { min: 80650, max: 215400, rate: 0.06 },
        { min: 215400, max: 1077550, rate: 0.0685 },
        { min: 1077550, max: 5000000, rate: 0.0965 },
        { min: 5000000, max: 25000000, rate: 0.103 },
        { min: 25000000, max: null, rate: 0.109 },
      ],
      head_of_household: [
        { min: 0, max: 12800, rate: 0.04 },
        { min: 12800, max: 17650, rate: 0.045 },
        { min: 17650, max: 20900, rate: 0.0525 },
        { min: 20900, max: 107750, rate: 0.055 },
        { min: 107750, max: 269300, rate: 0.06 },
        { min: 269300, max: 1616450, rate: 0.0685 },
        { min: 1616450, max: 5000000, rate: 0.0965 },
        { min: 5000000, max: 25000000, rate: 0.103 },
        { min: 25000000, max: null, rate: 0.109 },
      ],
    },
    editorialGuide: {} as StateEditorialGuide,
  },

  // 34. North Carolina
  {
    slug: "north-carolina",
    code: "NC",
    name: "North Carolina",
    taxType: "flat",
    flatRate: 0.045,
    standardDeduction: { single: 12750, married_joint: 25500, married_separate: 12750, head_of_household: 19125 },
    agencyName: "North Carolina Department of Revenue (NCDOR)",
    agencyUrl: "https://www.ncdor.gov",
    estimatedTaxForm: "Form NC-40",
    filingDeadline: "April 15, June 15, September 15, January 15",
    hasLocalTax: false,
    localTaxNotes: "North Carolina law prohibits cities and counties from levying local personal income taxes.",
    editorialGuide: {} as StateEditorialGuide,
  },

  // 35. North Dakota
  {
    slug: "north-dakota",
    code: "ND",
    name: "North Dakota",
    taxType: "progressive",
    standardDeduction: { single: 14600, married_joint: 29200, married_separate: 14600, head_of_household: 21900 },
    agencyName: "Office of State Tax Commissioner",
    agencyUrl: "https://www.tax.nd.gov",
    estimatedTaxForm: "Form ND-1ES",
    filingDeadline: "April 15, June 15, September 15, January 15",
    hasLocalTax: false,
    localTaxNotes: "North Dakota does not levy municipal or county personal income taxes.",
    brackets: {
      single: [
        { min: 0, max: 44725, rate: 0.0 },
        { min: 44725, max: 225975, rate: 0.0195 },
        { min: 225975, max: null, rate: 0.025 },
      ],
      married_joint: [
        { min: 0, max: 74750, rate: 0.0 },
        { min: 74750, max: 275100, rate: 0.0195 },
        { min: 275100, max: null, rate: 0.025 },
      ],
      married_separate: [
        { min: 0, max: 37375, rate: 0.0 },
        { min: 37375, max: 137550, rate: 0.0195 },
        { min: 137550, max: null, rate: 0.025 },
      ],
      head_of_household: [
        { min: 0, max: 59950, rate: 0.0 },
        { min: 59950, max: 250550, rate: 0.0195 },
        { min: 250550, max: null, rate: 0.025 },
      ],
    },
    editorialGuide: {} as StateEditorialGuide,
  },

  // 36. Ohio
  {
    slug: "ohio",
    code: "OH",
    name: "Ohio",
    taxType: "progressive",
    standardDeduction: { single: 0, married_joint: 0, married_separate: 0, head_of_household: 0 },
    agencyName: "Ohio Department of Taxation",
    agencyUrl: "https://tax.ohio.gov",
    estimatedTaxForm: "Form IT 1040ES",
    filingDeadline: "April 15, June 15, September 15, January 15",
    hasLocalTax: true,
    localTaxNotes: "Over 600 Ohio municipalities levy local earned income taxes (typically 1.5% to 2.5%, e.g., Columbus 2.5%, Cleveland 2.5%, Cincinnati 1.8%) collected via RITA or CCA.",
    brackets: {
      single: [
        { min: 0, max: 26050, rate: 0.0 },
        { min: 26050, max: 100000, rate: 0.0275 },
        { min: 100000, max: null, rate: 0.035 },
      ],
      married_joint: [
        { min: 0, max: 26050, rate: 0.0 },
        { min: 26050, max: 100000, rate: 0.0275 },
        { min: 100000, max: null, rate: 0.035 },
      ],
      married_separate: [
        { min: 0, max: 26050, rate: 0.0 },
        { min: 26050, max: 100000, rate: 0.0275 },
        { min: 100000, max: null, rate: 0.035 },
      ],
      head_of_household: [
        { min: 0, max: 26050, rate: 0.0 },
        { min: 26050, max: 100000, rate: 0.0275 },
        { min: 100000, max: null, rate: 0.035 },
      ],
    },
    editorialGuide: {} as StateEditorialGuide,
  },

  // 37. Oklahoma
  {
    slug: "oklahoma",
    code: "OK",
    name: "Oklahoma",
    taxType: "progressive",
    standardDeduction: { single: 6350, married_joint: 12700, married_separate: 6350, head_of_household: 9350 },
    agencyName: "Oklahoma Tax Commission",
    agencyUrl: "https://oklahoma.gov/tax",
    estimatedTaxForm: "Form OW-8-ES",
    filingDeadline: "April 15, June 15, September 15, January 15",
    hasLocalTax: false,
    localTaxNotes: "Oklahoma municipalities do not levy personal earned income taxes.",
    brackets: {
      single: [
        { min: 0, max: 1000, rate: 0.0025 },
        { min: 1000, max: 2500, rate: 0.0075 },
        { min: 2500, max: 3750, rate: 0.0175 },
        { min: 3750, max: 4900, rate: 0.0275 },
        { min: 4900, max: 7200, rate: 0.0375 },
        { min: 7200, max: null, rate: 0.0475 },
      ],
      married_joint: [
        { min: 0, max: 2000, rate: 0.0025 },
        { min: 2000, max: 5000, rate: 0.0075 },
        { min: 5000, max: 7500, rate: 0.0175 },
        { min: 7500, max: 9800, rate: 0.0275 },
        { min: 9800, max: 12200, rate: 0.0375 },
        { min: 12200, max: null, rate: 0.0475 },
      ],
      married_separate: [
        { min: 0, max: 1000, rate: 0.0025 },
        { min: 1000, max: 2500, rate: 0.0075 },
        { min: 2500, max: 3750, rate: 0.0175 },
        { min: 3750, max: 4900, rate: 0.0275 },
        { min: 4900, max: 7200, rate: 0.0375 },
        { min: 7200, max: null, rate: 0.0475 },
      ],
      head_of_household: [
        { min: 0, max: 1000, rate: 0.0025 },
        { min: 1000, max: 2500, rate: 0.0075 },
        { min: 2500, max: 3750, rate: 0.0175 },
        { min: 3750, max: 4900, rate: 0.0275 },
        { min: 4900, max: 7200, rate: 0.0375 },
        { min: 7200, max: null, rate: 0.0475 },
      ],
    },
    editorialGuide: {} as StateEditorialGuide,
  },

  // 38. Oregon
  {
    slug: "oregon",
    code: "OR",
    name: "Oregon",
    taxType: "progressive",
    standardDeduction: { single: 2745, married_joint: 5495, married_separate: 2745, head_of_household: 4420 },
    agencyName: "Oregon Department of Revenue",
    agencyUrl: "https://www.oregon.gov/dor",
    estimatedTaxForm: "Form OR-40-V",
    filingDeadline: "April 15, June 15, September 15, January 15",
    hasLocalTax: true,
    localTaxNotes: "Multnomah County and Metro levy regional taxes (Supportive Housing 1%, Preschool for All 1.5% to 3.0%), plus TriMet and Lane County transit payroll taxes.",
    brackets: {
      single: [
        { min: 0, max: 4300, rate: 0.0475 },
        { min: 4300, max: 10750, rate: 0.0675 },
        { min: 10750, max: 125000, rate: 0.0875 },
        { min: 125000, max: null, rate: 0.099 },
      ],
      married_joint: [
        { min: 0, max: 8600, rate: 0.0475 },
        { min: 8600, max: 21500, rate: 0.0675 },
        { min: 21500, max: 250000, rate: 0.0875 },
        { min: 250000, max: null, rate: 0.099 },
      ],
      married_separate: [
        { min: 0, max: 4300, rate: 0.0475 },
        { min: 4300, max: 10750, rate: 0.0675 },
        { min: 10750, max: 125000, rate: 0.0875 },
        { min: 125000, max: null, rate: 0.099 },
      ],
      head_of_household: [
        { min: 0, max: 8600, rate: 0.0475 },
        { min: 8600, max: 21500, rate: 0.0675 },
        { min: 21500, max: 250000, rate: 0.0875 },
        { min: 250000, max: null, rate: 0.099 },
      ],
    },
    editorialGuide: {} as StateEditorialGuide,
  },

  // 39. Pennsylvania
  {
    slug: "pennsylvania",
    code: "PA",
    name: "Pennsylvania",
    taxType: "flat",
    flatRate: 0.0307,
    standardDeduction: { single: 0, married_joint: 0, married_separate: 0, head_of_household: 0 },
    agencyName: "Pennsylvania Department of Revenue",
    agencyUrl: "https://www.revenue.pa.gov",
    estimatedTaxForm: "Form PA-40ES",
    filingDeadline: "April 15, June 15, September 15, January 15",
    hasLocalTax: true,
    localTaxNotes: "Under Act 32, nearly every Pennsylvania municipality levies a Local Earned Income Tax (EIT, 1% to 2%). Philadelphia Wage Tax is 3.75% for residents.",
    editorialGuide: {} as StateEditorialGuide,
  },

  // 40. Rhode Island
  {
    slug: "rhode-island",
    code: "RI",
    name: "Rhode Island",
    taxType: "progressive",
    standardDeduction: { single: 10650, married_joint: 21300, married_separate: 10650, head_of_household: 15950 },
    agencyName: "Rhode Island Division of Taxation",
    agencyUrl: "https://tax.ri.gov",
    estimatedTaxForm: "Form RI-1040ES",
    filingDeadline: "April 15, June 15, September 15, January 15",
    hasLocalTax: false,
    localTaxNotes: "Rhode Island municipalities do not levy personal income taxes.",
    brackets: {
      single: [
        { min: 0, max: 77450, rate: 0.0375 },
        { min: 77450, max: 176050, rate: 0.0475 },
        { min: 176050, max: null, rate: 0.0599 },
      ],
      married_joint: [
        { min: 0, max: 77450, rate: 0.0375 },
        { min: 77450, max: 176050, rate: 0.0475 },
        { min: 176050, max: null, rate: 0.0599 },
      ],
      married_separate: [
        { min: 0, max: 38725, rate: 0.0375 },
        { min: 38725, max: 88025, rate: 0.0475 },
        { min: 88025, max: null, rate: 0.0599 },
      ],
      head_of_household: [
        { min: 0, max: 77450, rate: 0.0375 },
        { min: 77450, max: 176050, rate: 0.0475 },
        { min: 176050, max: null, rate: 0.0599 },
      ],
    },
    editorialGuide: {} as StateEditorialGuide,
  },

  // 41. South Carolina
  {
    slug: "south-carolina",
    code: "SC",
    name: "South Carolina",
    taxType: "progressive",
    standardDeduction: { single: 14600, married_joint: 29200, married_separate: 14600, head_of_household: 21900 },
    agencyName: "South Carolina Department of Revenue (SCDOR)",
    agencyUrl: "https://dor.sc.gov",
    estimatedTaxForm: "Form SC1040ES",
    filingDeadline: "April 15, June 15, September 15, January 15",
    hasLocalTax: false,
    localTaxNotes: "South Carolina does not allow local personal earned income taxes.",
    brackets: {
      single: [
        { min: 0, max: 3460, rate: 0.0 },
        { min: 3460, max: 17330, rate: 0.03 },
        { min: 17330, max: null, rate: 0.062 },
      ],
      married_joint: [
        { min: 0, max: 3460, rate: 0.0 },
        { min: 3460, max: 17330, rate: 0.03 },
        { min: 17330, max: null, rate: 0.062 },
      ],
      married_separate: [
        { min: 0, max: 3460, rate: 0.0 },
        { min: 3460, max: 17330, rate: 0.03 },
        { min: 17330, max: null, rate: 0.062 },
      ],
      head_of_household: [
        { min: 0, max: 3460, rate: 0.0 },
        { min: 3460, max: 17330, rate: 0.03 },
        { min: 17330, max: null, rate: 0.062 },
      ],
    },
    editorialGuide: {} as StateEditorialGuide,
  },

  // 42. South Dakota
  {
    slug: "south-dakota",
    code: "SD",
    name: "South Dakota",
    taxType: "none",
    standardDeduction: { single: 0, married_joint: 0, married_separate: 0, head_of_household: 0 },
    agencyName: "South Dakota Department of Revenue",
    agencyUrl: "https://dor.sd.gov",
    estimatedTaxForm: "N/A (No State Income Tax)",
    filingDeadline: "N/A",
    hasLocalTax: false,
    localTaxNotes: "South Dakota levies no individual or corporate income taxes.",
    editorialGuide: {} as StateEditorialGuide,
  },

  // 43. Tennessee
  {
    slug: "tennessee",
    code: "TN",
    name: "Tennessee",
    taxType: "none",
    standardDeduction: { single: 0, married_joint: 0, married_separate: 0, head_of_household: 0 },
    agencyName: "Tennessee Department of Revenue",
    agencyUrl: "https://www.tn.gov/revenue",
    estimatedTaxForm: "N/A (No State Income Tax)",
    filingDeadline: "N/A",
    hasLocalTax: false,
    localTaxNotes: "Tennessee levies no personal income tax on earned wages or freelance income. The Hall Income Tax on dividends was repealed in 2021.",
    editorialGuide: {} as StateEditorialGuide,
  },

  // 44. Texas
  {
    slug: "texas",
    code: "TX",
    name: "Texas",
    taxType: "none",
    standardDeduction: { single: 0, married_joint: 0, married_separate: 0, head_of_household: 0 },
    agencyName: "Texas Comptroller of Public Accounts",
    agencyUrl: "https://comptroller.texas.gov",
    estimatedTaxForm: "N/A (No State Income Tax)",
    filingDeadline: "N/A",
    hasLocalTax: false,
    localTaxNotes: "The Texas Constitution Article VIII Section 24-a prohibits state personal income tax. Texas Franchise Tax has an exemption threshold over $2.47M revenue.",
    editorialGuide: {} as StateEditorialGuide,
  },

  // 45. Utah
  {
    slug: "utah",
    code: "UT",
    name: "Utah",
    taxType: "flat",
    flatRate: 0.0465,
    standardDeduction: { single: 876, married_joint: 1752, married_separate: 876, head_of_household: 1314 },
    agencyName: "Utah State Tax Commission",
    agencyUrl: "https://tax.utah.gov",
    estimatedTaxForm: "Form TC-546",
    filingDeadline: "April 15, June 15, September 15, January 15",
    hasLocalTax: false,
    localTaxNotes: "Utah does not allow local municipal or county personal income taxes.",
    editorialGuide: {} as StateEditorialGuide,
  },

  // 46. Vermont
  {
    slug: "vermont",
    code: "VT",
    name: "Vermont",
    taxType: "progressive",
    standardDeduction: { single: 7400, married_joint: 14850, married_separate: 7400, head_of_household: 11100 },
    agencyName: "Vermont Department of Taxes",
    agencyUrl: "https://tax.vermont.gov",
    estimatedTaxForm: "Form IN-114",
    filingDeadline: "April 15, June 15, September 15, January 15",
    hasLocalTax: false,
    localTaxNotes: "Vermont towns do not levy personal income taxes.",
    brackets: {
      single: [
        { min: 0, max: 45400, rate: 0.0335 },
        { min: 45400, max: 110050, rate: 0.066 },
        { min: 110050, max: 229550, rate: 0.076 },
        { min: 229550, max: null, rate: 0.0875 },
      ],
      married_joint: [
        { min: 0, max: 75850, rate: 0.0335 },
        { min: 75850, max: 183400, rate: 0.066 },
        { min: 183400, max: 279450, rate: 0.076 },
        { min: 279450, max: null, rate: 0.0875 },
      ],
      married_separate: [
        { min: 0, max: 37925, rate: 0.0335 },
        { min: 37925, max: 91700, rate: 0.066 },
        { min: 91700, max: 139725, rate: 0.076 },
        { min: 139725, max: null, rate: 0.0875 },
      ],
      head_of_household: [
        { min: 0, max: 60800, rate: 0.0335 },
        { min: 60800, max: 157000, rate: 0.066 },
        { min: 157000, max: 254250, rate: 0.076 },
        { min: 254250, max: null, rate: 0.0875 },
      ],
    },
    editorialGuide: {} as StateEditorialGuide,
  },

  // 47. Virginia
  {
    slug: "virginia",
    code: "VA",
    name: "Virginia",
    taxType: "progressive",
    standardDeduction: { single: 8500, married_joint: 17000, married_separate: 8500, head_of_household: 8500 },
    agencyName: "Virginia Department of Taxation",
    agencyUrl: "https://www.tax.virginia.gov",
    estimatedTaxForm: "Form 760ES",
    filingDeadline: "May 1, June 15, September 15, January 15",
    hasLocalTax: true,
    localTaxNotes: "Virginia counties and cities levy a local Business, Professional and Occupational License (BPOL) tax based on gross receipts, but no personal income tax.",
    brackets: {
      single: [
        { min: 0, max: 3000, rate: 0.02 },
        { min: 3000, max: 5000, rate: 0.03 },
        { min: 5000, max: 17000, rate: 0.05 },
        { min: 17000, max: null, rate: 0.0575 },
      ],
      married_joint: [
        { min: 0, max: 3000, rate: 0.02 },
        { min: 3000, max: 5000, rate: 0.03 },
        { min: 5000, max: 17000, rate: 0.05 },
        { min: 17000, max: null, rate: 0.0575 },
      ],
      married_separate: [
        { min: 0, max: 3000, rate: 0.02 },
        { min: 3000, max: 5000, rate: 0.03 },
        { min: 5000, max: 17000, rate: 0.05 },
        { min: 17000, max: null, rate: 0.0575 },
      ],
      head_of_household: [
        { min: 0, max: 3000, rate: 0.02 },
        { min: 3000, max: 5000, rate: 0.03 },
        { min: 5000, max: 17000, rate: 0.05 },
        { min: 17000, max: null, rate: 0.0575 },
      ],
    },
    editorialGuide: {} as StateEditorialGuide,
  },

  // 48. Washington
  {
    slug: "washington",
    code: "WA",
    name: "Washington",
    taxType: "none",
    standardDeduction: { single: 0, married_joint: 0, married_separate: 0, head_of_household: 0 },
    agencyName: "Washington State Department of Revenue",
    agencyUrl: "https://dor.wa.gov",
    estimatedTaxForm: "N/A (No State Income Tax on 1099 Earnings)",
    filingDeadline: "N/A",
    hasLocalTax: true,
    localTaxNotes: "Washington has 0% personal income tax on 1099 wages. However, businesses pay state Business & Occupation (B&O) tax (1.5% to 1.75% of gross revenue) and local city B&O taxes (e.g. Seattle).",
    editorialGuide: {} as StateEditorialGuide,
  },

  // 49. West Virginia
  {
    slug: "west-virginia",
    code: "WV",
    name: "West Virginia",
    taxType: "progressive",
    standardDeduction: { single: 2000, married_joint: 4000, married_separate: 2000, head_of_household: 2000 },
    agencyName: "West Virginia State Tax Department",
    agencyUrl: "https://tax.wv.gov",
    estimatedTaxForm: "Form IT-140ES",
    filingDeadline: "April 15, June 15, September 15, January 15",
    hasLocalTax: true,
    localTaxNotes: "Charleston, Huntington, Wheeling, and Weirton levy a flat weekly City Service Fee ($3 to $5/week) on individuals working in the city.",
    brackets: {
      single: [
        { min: 0, max: 10000, rate: 0.0236 },
        { min: 10000, max: 25000, rate: 0.0315 },
        { min: 25000, max: 40000, rate: 0.0354 },
        { min: 40000, max: 60000, rate: 0.0472 },
        { min: 60000, max: null, rate: 0.0512 },
      ],
      married_joint: [
        { min: 0, max: 10000, rate: 0.0236 },
        { min: 10000, max: 25000, rate: 0.0315 },
        { min: 25000, max: 40000, rate: 0.0354 },
        { min: 40000, max: 60000, rate: 0.0472 },
        { min: 60000, max: null, rate: 0.0512 },
      ],
      married_separate: [
        { min: 0, max: 5000, rate: 0.0236 },
        { min: 5000, max: 12500, rate: 0.0315 },
        { min: 12500, max: 20000, rate: 0.0354 },
        { min: 20000, max: 30000, rate: 0.0472 },
        { min: 30000, max: null, rate: 0.0512 },
      ],
      head_of_household: [
        { min: 0, max: 10000, rate: 0.0236 },
        { min: 10000, max: 25000, rate: 0.0315 },
        { min: 25000, max: 40000, rate: 0.0354 },
        { min: 40000, max: 60000, rate: 0.0472 },
        { min: 60000, max: null, rate: 0.0512 },
      ],
    },
    editorialGuide: {} as StateEditorialGuide,
  },

  // 50. Wisconsin
  {
    slug: "wisconsin",
    code: "WI",
    name: "Wisconsin",
    taxType: "progressive",
    standardDeduction: { single: 13560, married_joint: 25260, married_separate: 12000, head_of_household: 17780 },
    agencyName: "Wisconsin Department of Revenue",
    agencyUrl: "https://www.revenue.wi.gov",
    estimatedTaxForm: "Form 1-ES",
    filingDeadline: "April 15, June 15, September 15, January 15",
    hasLocalTax: false,
    localTaxNotes: "Wisconsin municipalities do not levy personal income taxes.",
    brackets: {
      single: [
        { min: 0, max: 14320, rate: 0.035 },
        { min: 14320, max: 28640, rate: 0.044 },
        { min: 28640, max: 315310, rate: 0.053 },
        { min: 315310, max: null, rate: 0.0765 },
      ],
      married_joint: [
        { min: 0, max: 19090, rate: 0.035 },
        { min: 19090, max: 38190, rate: 0.044 },
        { min: 38190, max: 420420, rate: 0.053 },
        { min: 420420, max: null, rate: 0.0765 },
      ],
      married_separate: [
        { min: 0, max: 9550, rate: 0.035 },
        { min: 9550, max: 19100, rate: 0.044 },
        { min: 19100, max: 210210, rate: 0.053 },
        { min: 210210, max: null, rate: 0.0765 },
      ],
      head_of_household: [
        { min: 0, max: 14320, rate: 0.035 },
        { min: 14320, max: 28640, rate: 0.044 },
        { min: 28640, max: 315310, rate: 0.053 },
        { min: 315310, max: null, rate: 0.0765 },
      ],
    },
    editorialGuide: {} as StateEditorialGuide,
  },

  // 51. Wyoming
  {
    slug: "wyoming",
    code: "WY",
    name: "Wyoming",
    taxType: "none",
    standardDeduction: { single: 0, married_joint: 0, married_separate: 0, head_of_household: 0 },
    agencyName: "Wyoming Department of Revenue",
    agencyUrl: "https://revenue.wyo.gov",
    estimatedTaxForm: "N/A (No State Income Tax)",
    filingDeadline: "N/A",
    hasLocalTax: false,
    localTaxNotes: "Wyoming levies no individual or corporate income taxes.",
    editorialGuide: {} as StateEditorialGuide,
  },
];

// Initialize rich editorial guides for all 51 states
STATE_TAX_RECORDS.forEach((s) => {
  s.editorialGuide = buildStateEditorialGuide(s);
});

export const STATE_DATA_BY_SLUG: Record<string, StateTaxData> = Object.fromEntries(
  STATE_TAX_RECORDS.map((s) => [s.slug, s])
);

export const STATE_DATA_BY_CODE: Record<string, StateTaxData> = Object.fromEntries(
  STATE_TAX_RECORDS.map((s) => [s.code, s])
);
