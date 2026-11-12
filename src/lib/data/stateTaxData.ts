import { FilingStatus } from "../../models/tax.model";

export type StateTaxType = "none" | "flat" | "progressive";

export interface StateTaxBracket {
  min: number;
  max: number | null;
  rate: number;
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
  hasCustomGuide?: boolean;
  llcAnnualFee: string;
  sCorpTreatment: string;
  pteTaxNotes: string;
  stateSpecificNuances: string;
  estimatedTaxThreshold: string;
  editorialGuide: StateEditorialGuide;
}

const FLAGSHIP_EDITORIAL_GUIDES: Record<string, StateEditorialGuide> = {
  california: {
    seoTitle: "California 1099 Freelance Tax Calculator (2024–2026) - FTB Brackets, $800 LLC & SDI",
    metaDescription:
      "Calculate 2024–2026 California 1099 freelance taxes, 1%–13.3% FTB progressive brackets, uncapped 1.3% CA SDI, $800 LLC franchise tax, AB 150/SB 132 PTET, and 30/40/0/30 Form 540-ES vouchers.",
    h1Title: "California 1099 Freelance & Self-Employment Tax Guide (2024–2026)",
    overview:
      "Operating as an independent contractor, sole proprietor, or single-member LLC in California exposes your freelance profit to the highest top marginal personal income tax structure in the United States, combined with federal self-employment obligations under IRS Schedule SE. Administered by the California Franchise Tax Board (FTB), California taxes worldwide income of state residents across nine progressive brackets plus a 1.0% Mental Health Services Act surtax above $1,000,000, pushing the top rate to 13.3%.\n\nAt the federal level for 2024–2026, your net Schedule C business profit triggers the 15.3% SECA tax on 92.35% of net earnings (12.4% Social Security capped at $168,600 in 2024, $176,100 in 2025, and $184,500 in 2026, plus uncapped 2.9% Medicare and the 0.9% Additional Medicare surtax above $200,000 single / $250,000 joint). While the federal One Big Beautiful Bill Act (OBBBA) made the 20% Section 199A QBI deduction permanent and expanded the federal SALT itemized cap to $40,000 in 2025 and $40,400 in 2026, California does not conform to federal QBI or several accelerated depreciation rules—meaning your California taxable base is frequently higher than your federal taxable income.",
    rateBreakdown:
      "California applies a steeply graduated progressive rate table rather than a uniform rate. For single filers and married couples filing separately, marginal rates begin at 1.0% on the first $10,412 of taxable income, step through 2.0%, 4.0%, 6.0%, 8.0%, and hit 9.3% once taxable income exceeds $68,350 ($136,700 for married filing jointly). Upper brackets rise to 10.3% above $349,137, 11.3% above $418,961, and 12.3% above $698,271. Proposition 63 adds a 1.0% surcharge on taxable income over $1,000,000 regardless of filing status, creating a 13.3% ceiling.\n\nIf you run an S-Corporation in California to reduce federal SECA tax, factor in California's 1.5% entity-level S-Corp net income tax (Form 100S) alongside the $800 annual minimum franchise tax—as well as California State Disability Insurance (SDI). Following Senate Bill 951, California removed the SDI taxable wage ceiling entirely starting in 2024: the SDI payroll rate sits at 1.1% for 2024, 1.2% for 2025, and 1.3% for 2026 on all W-2 officer wages with zero cap.",
    freelanceSpecificRules:
      "California imposes strict entity fees and federal non-conformity traps that every 1099 earner must model before forming an LLC or electing S-Corp status:\n\n• Mandatory $800 Annual LLC Franchise Tax & Gross Receipts Fee: Every active or registered California LLC owes the $800 minimum franchise tax annually via Form 3522 (due the 15th day of the 4th month; the prior pandemic-era first-year exemption expired after 2023, and SB 122's $400 first-year reduction does not begin until 2027). LLCs generating $250,000+ in California gross receipts also pay an extra annual LLC fee (Form 3536): $900 ($250k–$499k), $2,500 ($500k–$999k), $6,000 ($1M–$4.99M), or $11,790 ($5M+).\n• Non-Conformity to QBI, Bonus Depreciation & HSAs: California ignores the federal 20% Section 199A QBI deduction, ignores federal bonus depreciation, caps Section 179 equipment expensing at $25,000 (phasing out above $200,000), and taxes HSA contributions and earnings at the state level. However, California does conform to federal SEP-IRA and Solo 401(k) contribution limits ($69,000 in 2024, $70,000 in 2025, and $72,000 in 2026 with $24,500 employee elective deferrals).\n• Pass-Through Entity Elective Tax (PTET): Under AB 150 and SB 132 (extended through 2030), S-Corporations and partnerships can elect to pay a 9.3% entity-level tax so owners claim a matching CA credit and a full federal business deduction—valuable even under OBBBA's $40,400 SALT cap if your income triggers the $505,000 MAGI phase-down. Starting in 2026 under SB 132, missing the June 15 prepayment reduces the owner credit rather than disqualifying the entire election.",
    standardDeductionGuide:
      "California's Franchise Tax Board standard deduction is dramatically smaller than the federal deduction. While the federal standard deduction stands at $14,600 (2024), $15,000 (2025), and $16,100 (2026) for single filers ($29,200 / $30,000 / $32,200 joint), California allows $5,540 in 2024, $5,706 in 2025, and $5,900 in 2026 for single and MFS filers ($11,080 / $11,412 / $11,800 for MFJ and Head of Household), supplemented by modest personal exemption credits rather than large deductions. Because California starts with Federal AGI and adds back non-conforming deductions, even middle-income solo contractors cross into California's 8.0% and 9.3% brackets quickly.",
    estimatedTaxesGuide:
      "California rejects the federal 25%-per-quarter rule. Under Form 540-ES, if you expect to owe at least $500 in California tax ($250 if married filing separately), you must submit front-loaded quarterly installments: 30% on April 15 (Q1), 40% on June 15 (Q2), 0% in September (Q3), and 30% on January 15 (Q4). Notice that 70% of your annual California estimated tax is due by June 15. California safe harbor protects you from underpayment penalties if timely payments equal 90% of current-year tax or 100% of prior-year tax (110% if prior-year CA AGI exceeded $150,000 single / $75,000 MFS); high earners with CA AGI of $1,000,000+ ($500,000 MFS) must use the 90% current-year test.",
    localTaxDetails:
      "California cities cannot levy personal income taxes on wages, so you will not owe a municipal income tax return as an individual. However, freelancers operating in major metro areas face city gross-receipts business taxes. San Francisco levies a Gross Receipts Tax (plus the Homelessness Gross Receipts Tax above city thresholds) and requires annual business registration renewals even for remote consultants with SF nexus. Los Angeles requires an annual City Business Tax Registration Certificate; sole proprietors and creative artists under municipal exemption thresholds ($100,000 small business / $300,000 creative artist exemptions) pay $0 ONLY if they renew before the late-February annual deadline.",
    faqs: [
      {
        question: "Does a single-member California LLC owe $800 even with zero profit?",
        answer:
          "Yes. Any LLC formed or registered with the California Secretary of State owes the $800 annual minimum franchise tax (Form 3522) regardless of net income or loss. The pandemic-era first-year exemption expired for LLCs formed after 2023, and SB 122's $400 first-year tax reduction does not take effect until tax years beginning in 2027.",
      },
      {
        question: "Why does California require 30% in Q1, 40% in Q2, and 0% in Q3?",
        answer:
          "California's FTB Form 540-ES accelerates cash collection into the first half of the fiscal year (30% by April 15 and 40% by June 15, skipping September entirely, then 30% by January 15). Always budget 70% of your annual California state tax reserve before mid-June.",
      },
      {
        question: "How does California's uncapped 1.3% SDI tax affect S-Corp freelancers?",
        answer:
          "Under SB 951, California removed the wage cap on State Disability Insurance starting in 2024 (1.1% in 2024, 1.2% in 2025, 1.3% in 2026). While sole proprietors generally do not pay SDI unless opting into elective coverage, S-Corp owner-employees must withhold SDI on 100% of their W-2 officer salary alongside California's 1.5% S-Corp net income tax.",
      },
      {
        question: "Can I deduct Section 199A QBI or HSA contributions on my California return?",
        answer:
          "No. California does not conform to federal Section 199A (0% state QBI deduction) or federal Health Savings Account (HSA) tax breaks. You must add back HSA deductions and any HSA investment gains on Schedule CA (540), though SEP-IRA and Solo 401(k) contributions are fully deductible.",
      },
      {
        question: "When does California's PTET election make sense in 2025 and 2026?",
        answer:
          "Even though OBBBA raised the federal individual SALT cap to $40,000 (2025) and $40,400 (2026), that higher cap phases down starting at $505,000 MAGI. S-Corps and partnerships with multi-owner or high-income profiles can still elect CA's 9.3% PTET (extended through 2030 under SB 132) to deduct state taxes federally without cap limits.",
      },
    ],
  },

  texas: {
    seoTitle: "Texas 1099 Freelance Tax Calculator (2024–2026) - 0% Income Tax & Franchise Rules",
    metaDescription:
      "Calculate 2024–2026 Texas 1099 freelance taxes: 0% state income tax, federal SECA & 2026 IRS brackets, $2.47M/$2.65M Texas Franchise Tax exemption, PIR filing, and property tax tradeoffs.",
    h1Title: "Texas 1099 Freelance & Self-Employment Tax Guide (2024–2026)",
    overview:
      "Texas is one of the strongest tax shelters in the nation for high-earning independent contractors, software engineers, and digital consultants because Article VIII, Section 24-a of the Texas Constitution explicitly prohibits a state personal income tax. Whether you earn $55,000 as a freelance designer or $450,000 through a single-member LLC, you owe $0 in Texas personal income tax and file no state individual tax return.\n\nEliminating state income tax does not eliminate your tax planning burden, however. Texas freelancers still pay the full 15.3% federal Self-Employment Tax (12.4% Social Security up to $168,600 in 2024, $176,100 in 2025, and $184,500 in 2026, plus uncapped 2.9% Medicare and 0.9% Additional Medicare over $200k/$250k) alongside progressive federal income brackets (10%–37%). Furthermore, Texas offsets its 0% income tax through substantial local residential property taxes, a 6.25%–8.25% sales tax, county Business Personal Property Tax (BPPT) renditions, and annual Comptroller Public Information Report compliance for LLCs.",
    rateBreakdown:
      "Texas enforces a strict 0% personal income tax across earned 1099 revenue, W-2 wages, dividends, and long-term capital gains. Because there is zero state individual income tax, your marginal state tax rate on every incremental dollar of Schedule C net profit is 0.00%, saving roughly 4% to 13% annually compared to peers in Illinois, Colorado, New York, or California.\n\nFor formalized entities (LLCs and S-Corporations), the only state-level revenue tax is the Texas Franchise (Margin) Tax. Following Texas Senate Bill 3, the no-tax-due revenue ceiling expanded to $2,470,000 in annualized total revenue for the 2024 and 2025 report years and adjusts for inflation to $2,650,000 for 2026. Entities crossing that ceiling pay 0.75% on taxable margin for service businesses (0.375% for retail/wholesale, or 0.331% under the E-Z computation up to $20 million revenue).",
    freelanceSpecificRules:
      "Even in a 0% income tax jurisdiction, Texas imposes distinct entity governance and federal optimization rules:\n\n• $0 Annual LLC Renewal Fee — But Mandatory May 15 PIR: Unlike California ($800) or Massachusetts ($500), Texas charges $0 in annual LLC franchise fees to the Secretary of State. Under SB 3, businesses below the $2.47M (2024–2025) / $2.65M (2026) revenue threshold no longer file Form 05-163 ('No Tax Due Report'). However, every Texas LLC and S-Corp MUST still file an annual Public Information Report (PIR) or Ownership Information Report (OIR) with the Texas Comptroller by May 15. Skipping the PIR triggers a $50 late penalty and administrative forfeiture of your entity shield.\n• Pure Federal S-Corp Math: Texas ignores federal S-Corp status at the state level (treating LLCs and S-Corps identically under Franchise Tax) and has no Pass-Through Entity Tax (PTET) because there is no state income tax to work around. Consequently, electing S-Corp status in Texas is strictly a federal 15.3% SECA arbitrage strategy—typically worthwhile once net profit consistently exceeds $85,000–$100,000.\n• Retirement & OBBBA Federal Shelters: Since state tax equals $0, every pre-tax dollar routed into a Solo 401(k) or SEP-IRA (up to $69,000 in 2024, $70,000 in 2025, and $72,000 in 2026, with $24,500 employee 401(k) deferral) plus your permanent 20% Section 199A QBI deduction saves purely federal taxes.",
    standardDeductionGuide:
      "Texas has no state standard deduction or state personal exemptions because there is no personal income tax return. Your entire deduction strategy centers on federal Schedule C write-offs (home office, business equipment under Section 179, software, business travel), above-the-line deductions (50% of SE tax, self-employed health insurance, HSA, Solo 401(k)/SEP-IRA), the federal standard deduction ($14,600 in 2024, $15,000 in 2025, and $16,100 in 2026 for single filers; double for married joint), and the permanent 20% Section 199A QBI deduction.",
    estimatedTaxesGuide:
      "Texas requires zero quarterly state income tax vouchers—there is no Texas equivalent to Form 1040-ES. All quarterly budgeting goes directly to the IRS (Form 1040-ES via EFTPS or IRS Direct Pay) on April 15, June 15, September 15, and January 15. Maintain IRS Safe Harbor compliance by paying 90% of current-year federal tax or 100% of prior-year total federal tax (110% if prior-year AGI topped $150,000). Keep May 15 marked on your calendar for the Texas Comptroller Public Information Report (PIR) and April 1 for county property renditions if your business owns tangible equipment.",
    localTaxDetails:
      "Texas municipalities and counties are prohibited from levying personal earned income taxes, so Austin, Dallas, Houston, and San Antonio impose 0% city income tax. Instead, Texas freelancers face two major indirect local costs: (1) High Property Taxes—local school districts, counties, and cities frequently produce combined property tax rates of 1.6% to 2.3% on residential real estate, directly affecting homeowners and home-office rent equivalents (remember OBBBA's expanded $40,000/$40,400 federal SALT cap helps itemizers deduct high Texas property taxes); and (2) Business Personal Property Tax (BPPT)—if your business owns laptops, servers, cameras, or office furniture used to produce income, Texas counties require an annual Business Personal Property Rendition by April 1, subject to local de minimis/statutory property exemptions. Also verify Texas sales tax rules (6.25% state + up to 2% local) if you provide taxable data processing (80% taxable base) or digital SaaS rather than pure consulting.",
    faqs: [
      {
        question: "Do Texas 1099 freelancers file any state income tax return?",
        answer:
          "No. Texas has a constitutional ban on personal income taxes. As a sole proprietor or single-member LLC earning 1099 income, you file only your federal Form 1040 (with Schedule C and Schedule SE) and pay $0 in Texas individual income tax.",
      },
      {
        question: "Did Texas SB 3 eliminate the May 15 filing requirement for small LLCs?",
        answer:
          "Only partially. SB 3 raised the Franchise Tax no-tax-due threshold to $2.47 million (2024–2025) and $2.65 million (2026) and eliminated Form 05-163 ('No Tax Due Report') for entities below that mark. However, Texas LLCs and S-Corps MUST still file their annual Public Information Report (PIR) by May 15 to avoid a $50 penalty and charter forfeiture.",
      },
      {
        question: "Should a Texas freelancer still elect S-Corp status without state income tax?",
        answer:
          "Yes, if net profit exceeds roughly $85,000–$100,000. While an S-Corp saves 0% in Texas state taxes, it can still save thousands in federal 15.3% self-employment tax by splitting profit between a reasonable W-2 salary and owner distributions.",
      },
      {
        question: "Do I have to pay Texas Business Personal Property Tax on my laptop?",
        answer:
          "Texas counties tax tangible personal property used to produce business income and require an annual rendition filing by April 1 with your County Appraisal District (CAD), though Texas Tax Code exemptions shelter very small asset bases ($2,500 de minimis statutory threshold and recent legislative relief thresholds). Check your local county appraisal rules.",
      },
      {
        question: "Are Texas consulting and software services subject to sales tax?",
        answer:
          "Pure professional consulting and custom advisory services are generally exempt from Texas sales tax. However, 'data processing services' (including web hosting, cloud data entry, and certain SaaS/IT processing) are taxable in Texas on 80% of the billed charge at up to 8.25% combined state/local rates.",
      },
    ],
  },

  "new-york": {
    seoTitle: "New York & NYC 1099 Freelance Tax Calculator (2024–2026) - PIT, UBT & MCTMT",
    metaDescription:
      "Calculate 2024–2026 New York State & NYC 1099 freelance taxes: NYS 4%–10.9% brackets, NYC 3.078%–3.876% city PIT, 4% NYC UBT, MCTMT thresholds, NY PTET, and IT-2105 vouchers.",
    h1Title: "New York & NYC 1099 Freelance Tax Guide (2024–2026)",
    overview:
      "Freelancing in New York—especially within the five boroughs of New York City or surrounding Metro Commuter counties—requires navigating one of the most multi-layered tax codes in America. On top of federal 15.3% SECA self-employment tax and federal income brackets (10%–37%), New York imposes state progressive income tax (Form IT-201), potential New York City or Yonkers resident income taxes, the NYC Unincorporated Business Tax (UBT) on sole proprietors and partnerships, and the Metropolitan Commuter Transportation Mobility Tax (MCTMT) on self-employment earnings in downstate counties.\n\nFor 2024–2026, New York extended its top millionaire brackets (9.65% to 10.9%) through 2032 while adjusting MCTMT thresholds in its 2025–2026 budget. Understanding how NYS PTET, NYC PTET, and federal OBBBA rules ($40,000/$40,400 SALT cap and permanent Section 199A QBI) interact can easily save high-earning New York solopreneurs thousands of dollars annually.",
    rateBreakdown:
      "New York State enforces nine progressive brackets starting at 4.0% on the first $8,500 of taxable income ($17,150 MFJ), moving quickly to 5.5% ($13,900–$80,650 single), 6.0% ($80,650–$215,400), and 6.85% ($215,400–$1,077,550). High earners cross into 9.65% above $1,077,550, 10.3% above $5,000,000, and 10.9% above $25,000,000—plus New York applies a 'tax benefit recapture' supplemental tax that claws back lower bracket benefits as AGI rises.\n\nIf you reside in New York City, add four municipal PIT brackets ranging from 3.078% to 3.876% (top rate starting at $50,000 single / $90,000 MFJ), pushing combined state-and-city marginal income tax rates past 10.7% even for mid-six-figure freelancers and up to 14.776% at the top.",
    freelanceSpecificRules:
      "New York's business entity and local tax traps routinely surprise relocating contractors and growing solo LLCs:\n\n• NYC Unincorporated Business Tax (UBT — 4.0%): Sole proprietors, single-member LLCs, and partnerships doing business in NYC face a 4.0% entity-level tax on net NYC business income (Form NYC-202). Filing is triggered once gross NYC business income exceeds $95,000, though NYC credits eliminate actual tax until net income exceeds roughly $100,000 (phasing out to $142,000). NYC residents also claim a personal PIT credit for a portion of UBT paid (23% historically; phased down to 15% for NYC taxable income above $1.0M–$1.25M under 2026 Local Law 133).\n• Crucial NYC S-Corp Non-Conformity: Electing federal S-Corp status avoids the 4% NYC UBT, BUT New York City does NOT recognize federal S-Corp pass-through status! NYC taxes S-Corporations directly as C-Corporations under the NYC Business Corporation Tax (BCT) at rates up to 8.85% on net income (with small business tiers or fixed-dollar minimums). Never elect S-Corp status in NYC without modeling BCT vs. UBT.\n• MCTMT (Metropolitan Commuter Transportation Mobility Tax): Self-employed individuals with net earnings sourced to the MCTD (NYC plus Dutchess, Nassau, Orange, Putnam, Rockland, Suffolk, and Westchester) owe MCTMT—0.60% in Zone 1 (NYC boroughs) and 0.34% in Zone 2 (suburban counties) above statutory thresholds ($50,000 net earnings in 2024, adjusted upward in the 2025–2026 budget toward $150,000 for 2026 self-employed filers).\n• NY LLC Publication & Biennial Fee: NY charges only $9 every two years for a Biennial Statement, but newly formed NY LLCs face a costly newspaper publication rule (6 weeks in two county newspapers within 120 days, often $800–$1,200+ in NYC) plus a $50 Certificate of Publication.\n• NYS & NYC PTET: Partnerships and NYS S-Corps can elect NY State PTET (6.85%–10.9%) and NYC PTET (3.876%) to convert personal SALT into an uncapped federal business deduction.",
    standardDeductionGuide:
      "Unlike states pegged to federal deductions, New York's standard deduction is frozen at $8,000 for single filers, $16,050 for married couples filing jointly, and $11,200 for heads of household—substantially below the 2024–2026 federal standard deduction ($14,600 / $15,000 / $16,100 single). New York also allows itemizing on Form IT-196 even if you take the federal standard deduction, which matters for high mortgage-interest or charitable donors. Above-the-line federal deductions for 50% of SE tax, self-employed health insurance, and Solo 401(k)/SEP-IRA contributions ($69k/$70k/$72k) flow into NY AGI and reduce state, NYC, and MCTMT liability.",
    estimatedTaxesGuide:
      "New York requires quarterly estimated payments on Form IT-2105 (online via NY.gov Business/Individual portal) whenever you expect to owe $300 or more in combined NYS, NYC, and Yonkers tax after withholding. Standard deadlines match the federal schedule: April 15, June 15, September 15, and January 15. Remember that Form IT-2105 includes your projected NYC local tax and MCTMT obligations—failing to include NYC or MCTMT in quarterly vouchers creates underpayment interest penalties. Safe harbor applies at 90% of current-year tax or 100% of prior-year tax (110% if NY AGI exceeded $150,000).",
    localTaxDetails:
      "New York has the heaviest local tax footprint of any US state for urban freelancers. NYC levies both a progressive resident personal income tax (3.078%–3.876%) and the 4% NYC Unincorporated Business Tax (UBT) on unincorporated businesses working inside the five boroughs (multi-state remote freelancers allocate income using NYC single-sales/market-based sourcing rules). Yonkers imposes a resident income tax surcharge equal to 16.75% of net NYS tax (and 0.5% on wages/net SE earnings of non-residents working in Yonkers). Outside the MCTD downstate counties (upstate cities like Buffalo, Rochester, Syracuse, and Albany), freelancers owe zero city income tax, zero UBT, and zero MCTMT.",
    faqs: [
      {
        question: "When do NYC freelancers owe the 4% Unincorporated Business Tax (UBT)?",
        answer:
          "Sole proprietors, single-member LLCs, and freelancers working in NYC must file Form NYC-202 if gross NYC business income exceeds $95,000. However, NYC's UBT credit wipes out actual tax liability until net business income surpasses roughly $100,000, phasing out between $100,000 and $142,000.",
      },
      {
        question: "Why is electing S-Corp status tricky inside New York City?",
        answer:
          "While S-Corps save federal SECA tax and are exempt from NYC UBT, New York City ignores federal S-Corp status and taxes S-Corporations under the NYC Business Corporation Tax (BCT) at rates up to 8.85% on allocated net income, making S-Corp election far less attractive inside NYC than upstate.",
      },
      {
        question: "How does the MCTMT work for self-employed New Yorkers in 2025–2026?",
        answer:
          "Self-employed contractors in NYC (Zone 1: 0.60%) and seven downstate suburban counties (Zone 2: 0.34%) pay MCTMT on net self-employment earnings sourced to the region once crossing statutory thresholds ($50,000 in 2024; adjusted up to $150,000 for self-employed filers in 2026 under NY's 2025–2026 budget).",
      },
      {
        question: "Does New York charge a large annual LLC fee like California?",
        answer:
          "No—NY charges just $9 every two years for the LLC Biennial Statement. However, New York's upfront LLC formation requires publishing formation notices in two county newspapers for six weeks (costing $150 upstate up to $1,200+ in Manhattan) plus a $50 Certificate of Publication.",
      },
      {
        question: "Should New York S-Corps or partnerships still elect PTET in 2026?",
        answer:
          "Yes, if your combined NYS/NYC income and property taxes exceed OBBBA's $40,400 federal SALT cap or your MAGI crosses the $505,000 phase-down. Electing NYS and NYC PTET turns state and city income taxes into an uncapped federal business deduction.",
      },
    ],
  },

  florida: {
    seoTitle: "Florida 1099 Freelance Tax Calculator (2024–2026) - 0% Income Tax & Sunbiz Rules",
    metaDescription:
      "Calculate 2024–2026 Florida 1099 freelance taxes: 0% state income tax, federal SECA & IRS brackets, $138.75 Sunbiz LLC fee ($400 late penalty), S-Corp rules, and local Business Tax Receipts.",
    h1Title: "Florida 1099 Freelance & Self-Employment Tax Guide (2024–2026)",
    overview:
      "Florida consistently ranks among the top destinations for remote consultants, SaaS founders, creators, and 1099 contractors thanks to Article VII, Section 5 of the Florida Constitution, which prohibits any state personal income tax on individuals. Every dollar of 1099-NEC revenue, Schedule C profit, capital gains, and retirement withdrawals escapes state income taxation completely.\n\nBecause state income tax equals 0%, Florida solopreneurs focus 100% of their income-tax planning on federal liability: the 15.3% Self-Employment Tax (capped on the 12.4% Social Security portion at $168,600 in 2024, $176,100 in 2025, and $184,500 in 2026) plus federal marginal rates (10%–37%). Still, Florida is not fee-free: contractors must budget for Sunbiz's strict $138.75 annual LLC report (with an unforgiving $400 late penalty after May 1), local city/county Business Tax Receipts (BTR), and county Tangible Personal Property (TPP) filings.",
    rateBreakdown:
      "Florida imposes a flat 0% personal income tax on individuals, sole proprietors, and single-member LLCs. There is no progressive state bracket table, no state capital gains tax, and no state payroll withholding for individual income.\n\nWhere Florida does levy an income tax is at the corporate C-Corp level: C-Corporations pay a 5.5% Florida Corporate Income Tax (Form F-1120) on net income exceeding a $50,000 corporate exemption. Crucially, Florida exempts federal S-Corporations from the 5.5% corporate tax on ordinary pass-through business profit—meaning a Florida LLC electing S-Corp status preserves 0% state income taxation while harvesting federal 15.3% SECA savings.",
    freelanceSpecificRules:
      "Maintaining clean compliance in Florida requires tracking entity deadlines and local licensing that carry harsh penalties when overlooked:\n\n• $138.75 Annual LLC Report & $400 Automatic Late Fee: Every Florida LLC must file its Annual Report via Sunbiz (dos.fl.gov) between January 1 and May 1 at a cost of $138.75. Florida enforces a strict, non-waivable $400 late fee ($538.75 total) starting May 2, followed by administrative dissolution in late September if left unpaid.\n• S-Corp vs. C-Corp Distinction: Florida recognizes federal S-Corp elections (IRS Form 2553) automatically and charges 0% state income tax on S-Corp net earnings (filing Form F-1120 only for the initial year or if owing federal built-in gains tax). Because Florida has no personal income tax, no Pass-Through Entity Tax (PTET) exists or is needed.\n• Homestead Protection & Domicile Audit Defense: Freelancers relocating from high-tax states (NY, NJ, CA, IL, MA) should file a Florida Declaration of Domicile, register to vote, obtain a FL driver's license, update bank/client 1099 addresses, and spend >183 days outside their former state to avoid dual-residency audits.\n• Pre-Tax Federal Write-Offs: Since Florida saves you 0% on state deductions, maximize federal Solo 401(k)/SEP-IRA contributions (up to $69,000 in 2024, $70,000 in 2025, $72,000 in 2026) and your permanent 20% Section 199A QBI deduction to slash your effective federal rate.",
    standardDeductionGuide:
      "Florida levies no personal income tax and therefore has no state standard deduction or state tax return. All deductible business expenses—software subscriptions, equipment, dedicated home office square footage, health insurance premiums, and retirement deferrals—apply exclusively on your federal Form 1040 (Schedule C and Schedule 1), paired with the federal standard deduction ($14,600 in 2024, $15,000 in 2025, and $16,100 in 2026 for single filers; $29,200 / $30,000 / $32,200 married filing jointly).",
    estimatedTaxesGuide:
      "Florida sole proprietors, 1099 contractors, and S-Corp owners owe zero quarterly state income tax estimates. Direct all quarterly estimated tax payments to the IRS via Form 1040-ES (due April 15, June 15, September 15, and January 15) using EFTPS or IRS Direct Pay. Keep your annual May 1 Sunbiz LLC Annual Report deadline locked in your calendar alongside your IRS quarterly dates so you never trigger the $400 Sunbiz late penalty.",
    localTaxDetails:
      "No Florida city or county imposes a local personal income tax. However, Florida counties and municipalities impose two notable business obligations: (1) Local Business Tax Receipt (BTR)—most cities and counties (e.g., Miami-Dade, Broward, Orange, Hillsborough) require an annual Business Tax Receipt (typically $25 to $150/year) even for home-based freelancers; and (2) Tangible Personal Property (TPP) Tax—business equipment (computers, desks, studio gear) must be reported to your County Property Appraiser on Form DR-405 by April 1, though Florida provides a $25,000 TPP exemption (filing Form DR-405 in year one locks in the exemption automatically for subsequent years below $25,000). Florida's state sales tax is 6.0% plus 0.5%–1.5% county surtax, generally exempting pure B2B consulting and software engineering services.",
    faqs: [
      {
        question: "Do Florida S-Corporations pay the 5.5% Florida corporate income tax?",
        answer:
          "No. While Florida taxes C-Corporations at 5.5% above a $50,000 exemption, Florida honors federal S-Corporation pass-through treatment and levies 0% state tax on ordinary S-Corp profits—making S-Corp election purely a federal SECA tax-saving strategy.",
      },
      {
        question: "What happens if I miss Florida's May 1 LLC Annual Report deadline?",
        answer:
          "Florida charges $138.75 if filed by May 1 via Sunbiz. Missing May 1 immediately adds a mandatory, non-waivable $400 late fee ($538.75 total), and failing to file by the third Friday of September leads to administrative dissolution.",
      },
      {
        question: "Do Florida home-based 1099 freelancers need a Business Tax Receipt?",
        answer:
          "Usually yes. Most Florida counties and cities require home-based independent contractors to maintain an annual Local Business Tax Receipt (often $25–$150/year), even when operating under your own name without employees.",
      },
      {
        question: "How does Florida's $25,000 Tangible Personal Property (TPP) exemption work?",
        answer:
          "If you own business laptops, cameras, or furniture in Florida, you must file Form DR-405 with your County Property Appraiser by April 1 in your initial year. Because the first $25,000 of assessed value is exempt, filing once typically waives annual TPP tax and future filings unless your equipment exceeds $25,000.",
      },
      {
        question: "Does Florida tax capital gains from selling my business or crypto?",
        answer:
          "No. Florida has no state personal income tax and no state capital gains tax. Only federal short-term or long-term capital gains taxes (and potential NIIT 3.8%) apply when you sell business assets, equities, or digital assets as a Florida resident.",
      },
    ],
  },

  washington: {
    seoTitle: "Washington 1099 Freelance Tax Calculator (2024–2026) - B&O Gross Receipts & Cap Gains",
    metaDescription:
      "Calculate 2024–2026 Washington 1099 taxes: 0% personal income tax vs. 1.5%–2.1% B&O gross receipts tax, Seattle city B&O, 7%/9.9% capital gains tax ($278k/$290k threshold), and 0.58% WA Cares.",
    h1Title: "Washington 1099 Freelance & Self-Employment Tax Guide (2024–2026)",
    overview:
      "Washington State presents a classic tax paradox for independent contractors: it levies 0% state personal income tax on earned 1099 freelance revenue and W-2 wages, yet imposes a Business and Occupation (B&O) tax on gross business revenue—meaning you can owe state tax even in a break-even or low-margin year—alongside an excise tax on high long-term capital gains and uncapped payroll charges for S-Corp W-2 salaries.\n\nAdministered by the Washington State Department of Revenue (DOR), the B&O tax catches many newly relocated remote workers off guard because it has zero deductions for subcontractors, software, advertising, or home office expenses. On the federal side for 2024–2026, Washington freelancers owe the standard 15.3% SECA tax (Social Security capped at $168,600 in 2024, $176,100 in 2025, and $184,500 in 2026) plus federal income brackets (10%–37%), cushioned by OBBBA's permanent 20% Section 199A QBI deduction.",
    rateBreakdown:
      "Washington imposes 0% personal income tax on 1099 Schedule C profit, W-2 wages, dividends, and interest. However, businesses performing freelance consulting, design, engineering, writing, or technical services pay the Washington State B&O tax under the 'Service and Other Activities' classification on gross receipts:\n\n• Under $1,000,000 prior-year gross income: 1.50% B&O rate\n• $1,000,000 to $4,999,999 prior-year gross income: 1.75% B&O rate\n• $5,000,000+ prior-year gross income (2025–2026 update): 2.10% B&O rate\n\nThankfully, Washington's Small Business B&O Tax Credit fully offsets B&O tax for modest service earners (roughly up to ~$125,000+ in annual service gross receipts, phasing out smoothly), though registration and filing with WA DOR are still required once gross receipts cross state nexus thresholds ($12,000–$125,000 depending on registration rules). Additionally, Washington taxes long-term capital gains exceeding an inflation-indexed deduction ($278,000 in 2025; $290,000 in 2026) at 7.0% up to $1 million above the deduction and 9.9% above $1 million (real estate and retirement accounts are exempt).",
    freelanceSpecificRules:
      "Structuring a solo practice in Washington demands close attention to gross-receipts triggers and S-Corp payroll taxes:\n\n• B&O Gross Receipts Trap: Unlike California or New York income tax, WA B&O taxes top-line gross receipts rather than net profit. If you bill a client $180,000 and pass through $70,000 to subcontractors or ad spend, you are taxed on $180,000 unless qualifying strictly as an agency pass-through advance under WA DOR rules.\n• S-Corp Payroll & WA Cares 0.58% + PFML: Washington has no personal income tax and no PTET, so S-Corp elections save purely federal 15.3% SECA tax. However, paying yourself an S-Corp W-2 salary exposes those wages to two state payroll programs: WA Paid Family & Medical Leave (PFML) and the WA Cares Fund long-term care tax (0.58% on uncapped W-2 wages, unless holding a valid exemption). Sole proprietors are automatically exempt from WA Cares unless opting in!\n• Washington LLC Annual Fee: Domestic and foreign LLCs pay a $60 Annual Report fee to the Washington Secretary of State (plus minor Business License renewal fees through DOR), a fraction of California's $800 franchise tax.\n• Sales Tax on Digital & Tech Services: Watch Washington's evolving retail sales tax definitions—custom software, SaaS/digital automated services (DAS), and certain IT implementation work can trigger retail B&O (0.471%) plus retail sales tax collection obligations unless falling under excluded professional consulting services.",
    standardDeductionGuide:
      "Because Washington levies no state personal income tax on earned income, there is no state standard deduction on 1099 business profits. Your income-tax deductions (Schedule C expenses, 50% SE tax, health insurance, Solo 401(k)/SEP-IRA up to $72,000 in 2026, federal standard deduction of $14,600 / $15,000 / $16,100 single, and 20% Section 199A QBI) reduce your federal Form 1040 only—they do NOT reduce Washington's B&O gross receipts tax. For Washington's Capital Gains Excise Tax, the state provides an annual standard deduction ($278,000 for 2025; $290,000 for 2026) on qualifying long-term capital gains.",
    estimatedTaxesGuide:
      "Washington freelancers do not file quarterly state personal income tax estimates. Instead, you file Washington Combined Excise Tax Returns (B&O and applicable sales tax) through My DOR on a monthly, quarterly, or annual cadence assigned by the Department of Revenue based on your gross revenue volume (annual filers report by April 15; quarterly filers report by the end of the month following each quarter: April 30, July 31, October 31, and January 31). Federal income and SECA taxes remain payable quarterly via IRS Form 1040-ES. Capital gains excise tax, if triggered above $290,000 (2026), is due annually by April 15.",
    localTaxDetails:
      "While Washington forbids city-level personal net income taxes, more than 40 Washington cities—including Seattle, Bellevue, Tacoma, Everett, and Bellingham—impose independent municipal B&O taxes on gross receipts earned inside city limits. For instance, Seattle requires a City Business License and levies a municipal Service B&O tax (approx. 0.427%) once gross receipts attributable to Seattle exceed the city's annual exemption threshold ($100,000+, though check annual Seattle indexing). Remote freelancers working from home inside Seattle or Bellevue must file both state DOR B&O returns and municipal city B&O returns (via FileLocal).",
    faqs: [
      {
        question: "If Washington has 0% income tax, why did I receive a WA tax notice?",
        answer:
          "Washington levies a Business and Occupation (B&O) tax on gross receipts (1.5%–2.1% for services) rather than net income. Once you register a business or LLC, you must file WA DOR Excise Tax returns even if your Small Business B&O Credit reduces your balance due to $0.",
      },
      {
        question: "Do business expenses reduce Washington's B&O tax?",
        answer:
          "No. Washington's B&O tax is strictly a gross receipts tax—you cannot deduct software, subcontractors, rent, or payroll expenses before calculating the 1.5% (or 1.75%/2.1%) service B&O rate, though small earners receive the Small Business B&O Credit.",
      },
      {
        question: "Does Washington's 7% / 9.9% capital gains tax apply to freelancers?",
        answer:
          "Only if your net long-term capital gains from stocks, bonds, or business equity sales exceed the annual standard deduction ($278,000 in 2025; $290,000 in 2026). Gains up to $1 million above that threshold are taxed at 7%, and excess gains over $1 million face 9.9%. Real estate and 401(k)/IRA accounts are exempt.",
      },
      {
        question: "Do sole proprietors pay the 0.58% WA Cares payroll tax?",
        answer:
          "No. Sole proprietors and single-member LLC owners without W-2 wages are exempt from the 0.58% WA Cares tax unless they voluntarily opt in. However, if you elect S-Corp status and pay yourself a W-2 salary, your W-2 officer wages are subject to WA Cares (0.58%) and WA PFML unless you hold an approved exemption.",
      },
      {
        question: "Do Seattle freelancers owe city B&O tax on top of state B&O tax?",
        answer:
          "Yes, if your Seattle-sourced gross receipts cross Seattle's annual threshold ($100,000+). Seattle and 40+ other WA cities administer separate local B&O gross-receipts filings through FileLocal.",
      },
    ],
  },
};


Object.assign(FLAGSHIP_EDITORIAL_GUIDES, {
  illinois: {
    seoTitle: "Illinois 1099 Freelance Tax Calculator (2024–2026) - 4.95% Flat & PPRT Rules",
    metaDescription:
      "Calculate 2024–2026 Illinois 1099 freelance taxes: constitutional 4.95% flat tax, indexed $2,775–$2,925 exemption, 1.5% S-Corp PPRT replacement tax, 4.95% PTE election, and IL-1040-ES.",
    h1Title: "Illinois 1099 Freelance & Self-Employment Tax Guide (2024–2026)",
    overview:
      "Independent contractors and solo LLC owners in Illinois operate under one of the Midwest's clearest yet most misunderstood income tax regimes. Article IX, Section 3 of the Illinois Constitution mandates a single flat personal income tax rate of 4.95% across all net income tiers, collected by the Illinois Department of Revenue (IDOR) via Form IL-1040. Unlike progressive states where hitting $150,000 or $500,000 pushes you into higher brackets, an Illinois consultant pays the exact same 4.95% statutory personal rate at $45,000 and $450,000.\n\nHowever, Illinois solopreneurs still shoulder the full 15.3% federal Self-Employment Tax on 92.35% of Schedule C net earnings (12.4% Social Security capped at $168,600 in 2024, $176,100 in 2025, and $184,500 in 2026, plus uncapped 2.9% Medicare and 0.9% Additional Medicare surtax above $200,000 single / $250,000 joint). Furthermore, because Illinois computes Form IL-1040 starting from Federal Adjusted Gross Income (AGI) rather than Federal Taxable Income, federal deductions taken below the AGI line—most notably the federal standard deduction and the permanent 20% Section 199A QBI deduction—do NOT lower your Illinois state tax bill.",
    rateBreakdown:
      "In flat-rate jurisdictions like Illinois, your statutory state personal rate stays fixed at 4.95% across ordinary 1099 business profit, W-2 wages, dividends, and capital gains. You receive an inflation-indexed personal exemption allowance ($2,775 single / $5,550 married joint in the 2024 baseline table, indexed to $2,850/$5,700 for 2025 and $2,925/$5,850 for 2026) instead of a federal-style standard deduction, with a complete phase-out if Federal AGI exceeds $250,000 single or $500,000 married filing jointly.\n\nWhere Illinois gets complex is entity structure: S-Corporations and partnerships file Form IL-1120-ST or IL-1065 and pay an extra 1.5% Personal Property Replacement Tax (PPRT) at the entity level on top of the owner's 4.95% individual tax. That brings combined effective Illinois business income taxation on pass-through S-Corp distributions close to 6.45% before credits, meaning Illinois solo LLC owners must weigh S-Corp federal SECA savings carefully against the 1.5% entity-level PPRT cost.",
    freelanceSpecificRules:
      "Planning a high-margin freelance business in Chicago, Evanston, Naperville, or downstate Illinois requires navigating three distinct state traps:\n\n• 1.5% Personal Property Replacement Tax (PPRT) on S-Corps: While an S-Corp election eliminates 15.3% federal SECA tax on owner distributions, Illinois penalizes S-Corps and partnerships with the 1.5% PPRT (which sole proprietors and single-member Schedule C LLCs completely avoid!). Usually an Illinois freelancer still comes out ahead with an S-Corp once net profit surpasses roughly $85,000–$100,000 because saving 15.3% federal SECA dwarfs paying 1.5% PPRT, but always deduct PPRT as an entity business expense federally.\n• Elective 4.95% Pass-Through Entity (PTE) Tax: Illinois S-Corps and partnerships can elect to pay the 4.95% PTET directly on Form IL-1120-ST / IL-1065, claiming a refundable 4.95% credit on owners' IL-1040 returns. Even with OBBBA expanding the federal SALT itemized deduction cap to $40,000 (2025) and $40,400 (2026), Illinois PTE remains valuable if your MAGI triggers OBBBA's $505,000 SALT phase-down or if you claim the standard deduction federally.\n• $75 Annual LLC Report & Decoupled Depreciation: Illinois previously rolled its LLC annual report fee down to $75/year (due prior to the anniversary month via the IL Secretary of State). Remember also that Illinois decouples from federal bonus depreciation via Schedule IL-4562, though retirement contributions to Solo 401(k)s and SEP-IRAs (up to $69,000 in 2024, $70,000 in 2025, and $72,000 in 2026) reduce both Federal AGI and Illinois 4.95% base income dollar-for-dollar.",
    standardDeductionGuide:
      "Illinois provides a personal exemption allowance rather than a federal standard deduction: $2,775 per person in 2024 ($5,550 MFJ), adjusting to $2,850 in 2025 ($5,700 MFJ) and $2,925 in 2026 ($5,850 MFJ)—tiny compared to federal standard deductions ($14,600 / $15,000 / $16,100 single). Even worse for solo service providers, because IL-1040 begins with Federal AGI, neither your federal standard deduction nor your 20% Section 199A QBI deduction carries onto your Illinois return. Every above-the-line deduction—Schedule C expenses, half of SE tax, self-employed health insurance, HSA, and Solo 401(k) deferrals—therefore earns double duty by cutting both federal and 4.95% Illinois taxable income.",
    estimatedTaxesGuide:
      "Illinois requires quarterly estimated payments on Form IL-1040-ES (via MyTax Illinois) whenever your expected Illinois tax liability—after withholding and credits—exceeds $1,000 for the tax year. Quarterly installments fall on April 15, June 15, September 15, and January 15. To qualify for penalty-free safe harbor under IDOR rules, pay at least 90% of current-year Illinois tax or 100% of prior-year Illinois tax (assuming a full 12-month prior return was filed; unlike the IRS, Illinois generally uses a 100% prior-year safe harbor without a 110% high-earner bump, though confirm current IL-2210 worksheet instructions if electing PTE credits).",
    localTaxDetails:
      "The Illinois Constitution prohibits home-rule and non-home-rule municipalities from imposing local personal income taxes, so freelancers in Chicago, Aurora, Rockford, or Springfield owe 0% city income tax on 1099 profit. Nonetheless, Chicago-based operators face specialized municipal excise rules: businesses operating inside Chicago must hold a City of Chicago Business License, and digital/cloud software firms should review Chicago's Personal Property Lease Transaction Tax (applicable to non-possessory cloud/SaaS leases) and Chicago home-rule sales tax rates.",
    faqs: [
      {
        question: "Does Illinois tax my Section 199A QBI deduction?",
        answer:
          "Yes, effectively. Illinois Form IL-1040 starts from Federal Adjusted Gross Income (AGI), which comes before the federal standard deduction and Section 199A QBI deduction. As a result, Illinois taxes 100% of your Schedule C profit at 4.95% with no 20% QBI reduction.",
      },
      {
        question: "Why do Illinois S-Corporations pay an extra 1.5% PPRT tax?",
        answer:
          "Illinois levies a 1.5% Personal Property Replacement Tax (PPRT) on net income of S-Corporations and partnerships via Form IL-1120-ST / IL-1065. Sole proprietors and single-member Schedule C LLCs are exempt from PPRT, so factor that 1.5% entity tax against your 15.3% federal SECA savings before electing S-Corp status.",
      },
      {
        question: "When must I submit Illinois Form IL-1040-ES quarterly payments?",
        answer:
          "You must pay quarterly Illinois estimated taxes on April 15, June 15, September 15, and January 15 if you expect your net Illinois tax due after withholding and PTE credits to exceed $1,000.",
      },
      {
        question: "Can Illinois LLCs deduct Solo 401(k) and SEP-IRA contributions from IL tax?",
        answer:
          "Yes. Because retirement plan deductions for self-employed taxpayers reduce Federal Adjusted Gross Income (Form 1040 Schedule 1), those contributions automatically flow through to reduce your 4.95% Illinois taxable base as well.",
      },
      {
        question: "How much is the annual fee for an Illinois LLC?",
        answer:
          "Illinois lowered its LLC Annual Report fee to $75 per year (due prior to the first day of your anniversary month through the Illinois Secretary of State).",
      },
    ],
  },

  pennsylvania: {
    seoTitle: "Pennsylvania 1099 Tax Calculator (2024–2026) - 3.07% Flat & Local EIT Rules",
    metaDescription:
      "Calculate 2024–2026 Pennsylvania 1099 freelance taxes: 3.07% PA flat rate with $0 standard deduction, retirement/HSA disallowance traps, Act 32 local EIT, Philly BIRT, $7 report & PA-40ES.",
    h1Title: "Pennsylvania 1099 Freelance & Self-Employment Tax Guide (2024–2026)",
    overview:
      "Pennsylvania combines one of the nation's lowest flat state income tax rates (3.07%) with some of the strictest deduction disallowances and most pervasive municipal income taxes in the United States. While your Pennsylvania Department of Revenue bill (Form PA-40) looks modest at 3.07%, freelancers in Pittsburgh, Philadelphia, Harrisburg, and suburban townships routinely discover that Pennsylvania taxes gross Schedule C profit without federal above-the-line deductions—and adds a mandatory Act 32 Local Earned Income Tax (EIT) on top.\n\nOn the federal return for 2024–2026, Pennsylvania contractors owe 15.3% SECA tax on 92.35% of net profit (Social Security capped at $168,600 in 2024, $176,100 in 2025, and $184,500 in 2026) alongside federal brackets cushioned by OBBBA's permanent 20% QBI deduction. However, because Pennsylvania runs its own parallel gross-class tax code (PA Tax Reform Code of 1971) rather than tying to Federal AGI, copying federal tax assumptions onto your PA-40 return causes costly errors.",
    rateBreakdown:
      "In flat-rate jurisdictions like Pennsylvania, every dollar of net Schedule C profit is taxed at a flat 3.07% with zero state standard deduction and zero personal exemptions. Unlike 40+ other states, Pennsylvania separates income into eight rigid statutory classes—meaning a net business loss on Schedule C CANNOT offset W-2 wages or capital gains on your PA-40 return, and net operating losses from prior years cannot carry forward on PA Schedule C.\n\nBeyond the 3.07% state tier, Act 32 obligates residents and workers in virtually every Pennsylvania municipality outside Philadelphia to pay Local Earned Income Tax (commonly 1.0% to 2.0%, and higher in select distressed municipalities). Inside Philadelphia, combined municipal burden climbs much higher via the Philadelphia Net Profits Tax (3.74% resident / 3.43% non-resident starting July 2025, adjusting to 3.735% / 3.425% in July 2026) plus Philadelphia's Business Income and Receipts Tax (BIRT).",
    freelanceSpecificRules:
      "Pennsylvania enforces several notorious 1099 traps that catch newly self-employed residents by surprise:\n\n• Retirement Plan, HSA & 50% SE Tax Disallowance: On PA-40 Schedule C, self-employed sole proprietors get ZERO deduction for 50% of federal Self-Employment tax, ZERO deduction for SEP-IRA or Solo 401(k) elective deferrals (PA treats employee elective 401(k)/IRA deferrals as taxable PA compensation), ZERO deduction for self-employed health insurance premiums (Schedule 1), ZERO HSA contribution deduction, and ZERO Section 199A QBI deduction! Tax-savvy PA solo S-Corps note that legitimate non-discriminatory employer medical plans and employer pension contributions have narrower corporate rules under PA PIT Bulletin 2005-03—consult a PA CPA before relying on corporate benefit exclusions.\n• No Enacted PA PTET & Act 32 S-Corp Leverage: Pennsylvania has NOT enacted a state Pass-Through Entity Tax (PTET) workaround to federal SALT caps (though legislation remains under debate). However, an S-Corp election in Pennsylvania delivers double duty outside Philadelphia: aside from slashing federal 15.3% SECA tax on distributions, reasonable S-Corp K-1 distributions are exempt from Pennsylvania's 1%–2% Act 32 Local Earned Income Tax (while W-2 salary remains subject to local EIT).\n• Mandatory $7 Annual Report (Act 122): Starting in 2025, Act 122 replaced Pennsylvania's old 10-year decennial filing with a mandatory $7 Annual Report with the PA Department of State (LLCs must file annually by September 30; administrative dissolution enforcement phases in beginning 2027).",
    standardDeductionGuide:
      "Pennsylvania enforces a $0 state standard deduction and $0 personal exemption for single, married joint, and head-of-household filers alike (Tax Forgiveness Schedule SP assists only low-income households below strict poverty ceilings). Do not assume your $14,600 (2024), $15,000 (2025), or $16,100 (2026) federal standard deduction shields your first dollar of PA income—3.07% state tax and Act 32 local EIT attach from dollar one of Schedule C profit after direct ordinary business expenses (advertising, software, office rent, actual home-office utilities, contractors, and business depreciation).",
    estimatedTaxesGuide:
      "Pennsylvania Form PA-40ES quarterly estimates are required whenever your PA taxable income NOT subject to employer withholding exceeds $8,000 in a year (roughly $246+ in unwithheld PA tax), due April 15, June 15, September 15, and January 15 via myPATH. Crucially, you must ALSO remit separate quarterly local EIT estimated payments to your Act 32 municipal tax collector (e.g., Keystone Collections Group, Berkheimer, or Jordan Tax Service—or Philadelphia Revenue for NPT/BIRT) whenever local net profits exceed $12,000/year or local rules specify.",
    localTaxDetails:
      "Local taxation is where Pennsylvania freelance planning happens. Outside Philadelphia, Act 32 splits municipal + school district Earned Income Tax (1.0% in most suburbs; 3.0% total inside the City of Pittsburgh—1% city + 2% school district for residents). Inside Philadelphia, sole proprietors and LLCs navigate BOTH the Philadelphia Net Profits Tax (3.74% resident / 3.43% non-resident for 2025–2026, ticking down to 3.735% / 3.425% in July 2026) AND the dual-base Philadelphia BIRT (1.415 mills gross receipts + 5.71%–5.81% net income, with a partial BIRT credit against NPT; remember Philadelphia courts ended the prior $100k BIRT exemption for 2025+ years, so verify current City of Philadelphia Revenue rules).",
    faqs: [
      {
        question: "Can I deduct my SEP-IRA, Solo 401(k), or HSA on my Pennsylvania return?",
        answer:
          "No for sole proprietors. Pennsylvania does not follow Federal AGI and taxes employee 401(k)/IRA deferrals, sole-proprietor SEP-IRA contributions, HSA deductions, self-employed health insurance, and 50% SE tax deductions on Schedule C.",
      },
      {
        question: "Do Pennsylvania freelancers still owe local taxes on top of 3.07% state tax?",
        answer:
          "Yes. Under Act 32, virtually every PA municipality levies a 1% to 3% Local Earned Income Tax (EIT) on Schedule C net profit and W-2 wages, paid separately through Keystone, Berkheimer, Jordan Tax Service, or the City of Philadelphia.",
      },
      {
        question: "Does Pennsylvania have a PTET SALT cap workaround?",
        answer:
          "No. As of 2024–2026, Pennsylvania has not enacted an elective Pass-Through Entity Tax (PTET). However, OBBBA's expanded $40,000 (2025) and $40,400 (2026) federal individual SALT cap helps itemizers deduct high local property and EIT taxes.",
      },
      {
        question: "Can S-Corp distributions reduce Pennsylvania local EIT tax?",
        answer:
          "Outside Philadelphia, properly documented S-Corporation K-1 distributions are generally exempt from Act 32 municipal Earned Income Tax, whereas reasonable W-2 officer salary and sole-proprietor Schedule C profits remain fully taxable locally.",
      },
      {
        question: "What is Pennsylvania's new annual LLC report requirement?",
        answer:
          "Under Act 122 (effective 2025), every Pennsylvania LLC must file an Annual Report with the Department of State by September 30 for a $7 fee, replacing the old 10-year decennial report.",
      },
    ],
  },

  massachusetts: {
    seoTitle: "Massachusetts 1099 Tax Calculator (2024–2026) - 5% Flat & 4% Surtax",
    metaDescription:
      "Calculate 2024–2026 Massachusetts 1099 freelance taxes: 5% flat income tax + 4% Fair Share surtax ($1.08M/$1.10M+), $500 LLC fee, S-Corp $456 excise & sting tax, Directive 08-3 retirement trap.",
    h1Title: "Massachusetts 1099 Freelance & Self-Employment Tax Guide (2024–2026)",
    overview:
      "Massachusetts is an economic hub for biotech consultants, software contractors, and management advisors, but its tax code treats self-employed 1099 filers quite differently from regular W-2 employees or federal Form 1040 rules. Administered by the Massachusetts Department of Revenue (DOR) via Form 1, ordinary earned income is taxed at a flat 5.00% base rate—plus a constitutional 4.00% Fair Share ('Millionaires') Surtax on taxable income crossing inflation-adjusted $1 million+ ceilings, producing a 9.00% top marginal rate.\n\nPair that with high corporate entity costs ($500 annual LLC fee and an automatic $456 minimum S-Corp corporate excise), an 8.5% short-term capital gains tier, mandatory health coverage enforcement on Schedule HC, and Massachusetts's unique disallowance of sole-proprietor SEP-IRA/Solo 401(k) deductions under DOR Directive 08-3, and proactive modeling becomes mandatory for every Boston, Cambridge, and Worcester freelancer.",
    rateBreakdown:
      "In flat-rate jurisdictions like Massachusetts, ordinary Schedule C freelance profits, W-2 wages, interest, and long-term capital gains are taxed at 5.00% after personal exemptions ($4,400 single, $8,800 married filing jointly, $6,800 head of household).\n\nThree rate wrinkles alter effective math in Massachusetts:\n• 4.00% Fair Share Surtax (9.00% Combined Marginal Rate): Voters approved a permanent 4% surtax on Massachusetts taxable income above $1,000,000, indexed annually to $1,053,750 (2024), $1,083,150 (2025), and $1,107,750 (2026).\n• 8.5% Short-Term Capital Gains Tax: Assets held one year or less (active trading or short-term equity exits) are taxed at 8.5% rather than 5.0%.\n• S-Corp Sting Tax: S-Corps with $6,000,000 to $8,999,999 in total receipts owe an extra 2.0% entity-level corporate excise tax on net income, jumping to 3.0% above $9,000,000.",
    freelanceSpecificRules:
      "Before launching or incorporating a 1099 practice in Massachusetts, watch four signature rules:\n\n• DOR Directive 08-3 Retirement Trap (Sole Proprietors vs. S-Corps): Under Massachusetts DOR Directive 08-3, self-employed sole proprietors, partners, and single-member LLCs CANNOT deduct owner contributions to their own SEP-IRA, SIMPLE IRA, or Solo 401(k) on Form 1 / Schedule C! While those contributions still slash your federal taxes (up to $69k/$70k/$72k in 2024–2026), Massachusetts adds back self-employed retirement deductions—creating a compelling reason high-saving MA freelancers incorporate as an S-Corp where W-2 employee/employer plan mechanics differ under corporate treatment.\n• $500 Annual LLC Report & $456 S-Corp Minimum Excise: Massachusetts imposes a steep $500 annual report fee ($520 via online portal) on every LLC with the Secretary of the Commonwealth. Furthermore, incorporating an S-Corp subjects you to Form 355S and a mandatory $456 minimum corporate excise tax every year (plus $2.60 per $1,000 of Massachusetts tangible property or net worth) even if profit is small.\n• Chapter 63D PTET with 90% Credit Recovery: Massachusetts allows S-Corps and partnerships to elect a 5.0% Pass-Through Entity Tax (PTET), granting owners a 90% refundable credit (meaning 10% of the state PTET paid is forfeited). Check whether OBBBA's $40,000/$40,400 federal individual SALT cap already covers your state taxes before giving up 10% under Chapter 63D.\n• MA PFML & Schedule HC Mandate: Massachusetts requires individual health insurance coverage (enforced via tax penalty on Form 1 Schedule HC) and administers Paid Family & Medical Leave (PFML), though sole proprietors do not owe PFML unless voluntarily opting in.",
    standardDeductionGuide:
      "Massachusetts offers fixed personal exemptions—$4,400 single, $8,800 married filing jointly, $6,800 head of household, and $4,400 MFS—rather than a large federal standard deduction ($14,600 / $15,000 / $16,100 single). Massachusetts also permits modest targeted deductions (rent deduction up to $4,000, commuter benefits, and 50% of excess Schedule C deductions only where conforming), while completely decoupling from federal Section 199A QBI (0% MA QBI deduction) and sole-proprietor retirement deductions under Directive 08-3.",
    estimatedTaxesGuide:
      "Massachusetts requires quarterly estimated payments on Form 1-ES (filed electronically through MassTaxConnect) whenever you expect to owe more than $400 in Massachusetts income tax not covered by withholding. Installments are due April 15, June 15, September 15, and January 15. Safe harbor protects against Form M-2210 underpayment penalties if quarterly payments reach 80% of current-year MA tax or 100% of prior-year MA tax (assuming a full-year prior Massachusetts return showing tax liability; note Massachusetts uses an 80% current-year test rather than the IRS 90% bar).",
    localTaxDetails:
      "Massachusetts prohibits cities and towns from levying municipal personal income taxes or local gross receipts taxes on 1099 consulting work, so Boston, Cambridge, Somerville, and Springfield impose 0% local income tax. Business owners do face local municipal Business Certificate (DBA) registration fees ($25–$65 every four years in most towns) plus municipal personal property assessments if operating commercial offices.",
    faqs: [
      {
        question: "Can Massachusetts sole proprietors deduct Solo 401(k) or SEP-IRA contributions?",
        answer:
          "No. Under Massachusetts DOR Directive 08-3, self-employed sole proprietors and single-member LLCs cannot deduct contributions made for themselves to a SEP-IRA, SIMPLE IRA, or Solo 401(k) on Form 1. You still save federal income tax, just not the 5% MA state tax.",
      },
      {
        question: "How does the Massachusetts 4% Fair Share surtax affect freelancers in 2025–2026?",
        answer:
          "Any Massachusetts taxable income exceeding $1,053,750 (2024), $1,083,150 (2025), or $1,107,750 (2026) incurs an additional 4% constitutional surtax on top of the 5% base rate (9% marginal rate total).",
      },
      {
        question: "How much is the annual Massachusetts LLC fee?",
        answer:
          "Massachusetts charges $500 per year ($520 online) for every LLC's Annual Report, plus a mandatory $456 minimum corporate excise tax if your LLC elects S-Corp taxation on Form 355S.",
      },
      {
        question: "Is the 5% Massachusetts PTET election worth it after OBBBA?",
        answer:
          "Because Massachusetts only refunds 90% of PTET paid to owners, electing PTET forfeits 10% of the state tax as an extra cost. It usually helps only high earners whose state/property taxes exceed OBBBA's $40,000/$40,400 SALT cap or who phase down above $505,000 MAGI.",
      },
      {
        question: "When are Form 1-ES quarterly estimated payments required in Massachusetts?",
        answer:
          "Whenever your unwithheld Massachusetts tax liability will exceed $400. Deadlines are April 15, June 15, September 15, and January 15, with safe harbor at 80% of current-year tax or 100% of prior-year tax.",
      },
    ],
  },

  "new-jersey": {
    seoTitle: "New Jersey 1099 Tax Calculator (2024–2026) - Brackets, NJ BAIT & Solo 401(k)",
    metaDescription:
      "Calculate 2024–2026 New Jersey 1099 freelance taxes: 1.4%–10.75% NJ brackets, $1,000 personal exemption, Solo 401(k) vs. SEP-IRA trap, NJ BAIT PTET, $500–$2k S-Corp CBT, NJ-1040-ES.",
    h1Title: "New Jersey 1099 Freelance & Self-Employment Tax Guide (2024–2026)",
    overview:
      "Freelancers living in Hoboken, Jersey City, Princeton, or Cherry Hill—especially cross-river consultants billing Manhattan clients—must carefully model New Jersey Gross Income Tax alongside federal 15.3% SECA obligations. Administered by the New Jersey Division of Taxation on Form NJ-1040, New Jersey relies on a steep seven-bracket (eight for married joint) progressive schedule rising from 1.4% all the way to 10.75%, paired with tiny fixed personal exemptions ($1,000 single / $2,000 joint) and zero standard deduction.\n\nEven more critical for financial planning: New Jersey does not conform to Federal AGI. Instead, New Jersey divides income into rigid gross-income baskets—creating famous planning traps around SEP-IRA disallowances, HSA taxation, cross-category loss restrictions, S-Corp CBT minimum fees, and NJ's generous 100%-credit Business Alternative Income Tax (BAIT).",
    rateBreakdown:
      "New Jersey taxes single Schedule C earners starting at 1.40% up to $20,000, stepping to 1.75% ($20,000–$35,000), 3.50% ($35,000–$40,000), 5.525% ($40,000–$75,000), 6.37% ($75,000–$500,000), 8.97% ($500,000–$1,000,000), and 10.75% above $1,000,000. Married joint filers receive wider middle brackets including a 2.45% slice ($50,000–$70,000) and hit 6.37% above $150,000.\n\nNotice how quickly freelance net profit reaches 5.525%–6.37% in New Jersey ($40,000 taxable single!), making legal retirement deferrals, S-Corp timing, and BAIT elections disproportionately valuable here compared to states with large standard deductions.",
    freelanceSpecificRules:
      "Avoiding New Jersey's non-conformity pitfalls can easily save a mid-career consultant thousands of dollars:\n\n• Solo 401(k) vs. SEP-IRA Disallowance Trap: New Jersey's Gross Income Tax historically disallows self-employed SEP-IRA, SIMPLE IRA, and Keogh employer profit-sharing deductions on Schedule NJ-BUS-1—taxing sole proprietors on their profit BEFORE SEP-IRA contributions! Crucially, under N.J.S.A. 54A:6-21, New Jersey DOES exempt 401(k) employee elective deferrals (including Solo 401(k) employee deferrals up to the 402(g) limit: $23,000 in 2024, $23,500 in 2025, and $24,500 in 2026) when properly reported! Switching from a SEP-IRA to a Solo 401(k) lets NJ freelancers capture both federal and up to 10.75% state tax savings on elective deferrals.\n• HSA Non-Conformity & No QBI: Like California, New Jersey does NOT conform to federal Health Savings Accounts (no state deduction for HSA contributions) and grants 0% Section 199A QBI deduction. Furthermore, NJ prohibits netting a business loss against W-2 wages, dividends, or capital gains.\n• S-Corp CBT Minimum Tax & Automatic Federal Alignment: Following P.L. 2022 c.133, NJ automatically recognizes federal S-Corp elections without an extra state CBT-2553 filing (unless opting out). S-Corps pay a tiered CBT minimum tax on Form CBT-100S ranging from $500 (NJ receipts under $100k) to $750 ($100k–$249k), $1,000 ($250k–$499k), $1,500 ($500k–$999k), and $2,000 ($1M+).\n• NJ BAIT (100% Refundable PTET Credit): New Jersey S-Corps and partnerships can elect the NJ Business Alternative Income Tax (Form PTE-100) at progressive rates (5.675%–10.9%) and grant resident owners a 100% refundable income tax credit—eliminating state leakage above OBBBA's $40k/$40.4k SALT cap or $505k phaseout. LLCs also pay a $75 Annual Report to NJ DORES.",
    standardDeductionGuide:
      "New Jersey provides NO standard deduction at all ($0). Instead, NJ-1040 subtracts a $1,000 personal exemption ($2,000 married joint, $1,500 per dependent), alongside capped property tax deductions (up to $15,000 residential property tax or 18% of rent paid). Because NJ starts far below federal standard deductions ($14,600 / $15,000 / $16,100 single), virtually every dollar of Schedule C net business profit above $1,000 faces NJ tax immediately—unless reduced by eligible business expenses, health insurance premiums (Schedule NJ-BUS-1/NJ-1040 medical rules), or Solo 401(k) 402(g) elective deferrals.",
    estimatedTaxesGuide:
      "Whenever you expect your New Jersey tax due after withholding and BAIT/out-of-state credits to exceed $400, New Jersey requires quarterly estimated payments on Form NJ-1040-ES due April 15, June 15, September 15, and January 15. Beware NJ's stricter safe harbor rule: under Form NJ-2210, you avoid penalties if paying at least 80% of current-year NJ tax OR 100% of prior-year NJ tax (for high earners with NJ gross income >$150k, check prior-year 110% rules and exact cross-border NY/PA resident credit timing).",
    localTaxDetails:
      "New Jersey municipalities cannot levy personal income taxes on 1099 freelancers, and Newark's 1% payroll tax falls solely on covered employers with Newark W-2 payrolls. However, cross-border contractors commuting or sourcing work to New York City or Philadelphia must file non-resident NY/PA returns and claim a New Jersey Resident Credit for Taxes Paid to Other Jurisdictions (Schedule NJ-COJ)—remember NJ caps that credit at what New Jersey would have taxed the same cross-border income, and does NOT credit NYC UBT!",
    faqs: [
      {
        question: "Why should New Jersey freelancers choose a Solo 401(k) over a SEP-IRA?",
        answer:
          "New Jersey Gross Income Tax generally disallows sole-proprietor SEP-IRA deductions on NJ-1040 Schedule NJ-BUS-1, whereas employee elective deferrals into a 401(k) / Solo 401(k) (up to $23,000–$24,500) are statutorily excludable under N.J.S.A. 54A:6-21.",
      },
      {
        question: "What is the minimum tax on a New Jersey S-Corporation?",
        answer:
          "NJ S-Corporations pay an annual CBT minimum tax on Form CBT-100S based on NJ gross receipts: $500 (<$100k receipts), $750 ($100k–$249k), $1,000 ($250k–$499k), $1,500 ($500k–$999k), up to $2,000 ($1M+).",
      },
      {
        question: "How does New Jersey BAIT (PTET) benefit solo LLC owners?",
        answer:
          "If your business is taxed as an S-Corp or partnership, electing NJ BAIT lets the company pay 5.675%–10.9% NJ tax as a deductible federal business expense and awards owners a 100% refundable NJ personal tax credit.",
      },
      {
        question: "Are HSA contributions deductible in New Jersey?",
        answer:
          "No. New Jersey is one of the few states (alongside California) that neither allows a state income tax deduction for Health Savings Account (HSA) contributions nor exempts HSA earnings.",
      },
      {
        question: "Does working for a New York client trigger NY non-resident tax for an NJ freelancer?",
        answer:
          "Typically no if you perform 100% of your 1099 services remotely from your NJ home office under NY market/physical sourcing rules for Schedule C contractors—though W-2 telecommuters face NY's strict convenience-of-employer rule. Always verify sourcing if traveling on-site to NYC.",
      },
    ],
  },

  colorado: {
    seoTitle: "Colorado 1099 Tax Calculator (2024–2026) - 4.40% Flat, QBI & OPT Tax",
    metaDescription:
      "Calculate 2024–2026 Colorado 1099 freelance taxes: 4.40% statutory flat rate (4.25% 2024 TABOR), federal deduction & QBI conformity, SALT Parity Act PTET, CO FAMLI 0.88%, $25 LLC report, and Denver OPT.",
    h1Title: "Colorado 1099 Freelance & Self-Employment Tax Guide (2024–2026)",
    overview:
      "Colorado ranks among the most freelancer-friendly states with an income tax because Form DR 0104 anchors directly to Federal Taxable Income (Form 1040 Line 15)—not Federal AGI. That single structural choice delivers enormous tax relief to Denver, Boulder, Colorado Springs, and Fort Collins independent contractors: both your federal standard deduction and your permanent 20% Section 199A QBI deduction automatically flow straight through to lower your Colorado state tax.\n\nPair that pass-through conformity with a flat 4.40% statutory state tax rate (4.25% uniquely for tax year 2024 under temporary SB 24-228 TABOR surplus relief, reverting to 4.40% for 2025–2026), an ultra-low $25 annual LLC periodic report, and an elective 4.40% SALT Parity Act PTET, and Colorado delivers one of the cleanest high-growth tax baselines for remote workers.",
    rateBreakdown:
      "In flat-rate jurisdictions like Colorado, a uniform flat rate applies across all ordinary 1099 income, W-2 wages, and capital gains above Federal Taxable Income: 4.25% in 2024 (one-year TABOR rate reduction via SB 24-228) and 4.40% for 2025 and 2026.\n\nBecause Colorado calculates state tax after federal standard/itemized deductions and QBI (below HB25B-1001 add-back thresholds), a single consultant earning $100,000 net profit pays Colorado tax on roughly $60,000–$65,000 rather than $93,000, yielding an effective Colorado rate closer to 2.7%–2.9% of net profit—substantially lower than states like Illinois (4.95% on AGI) or Massachusetts (5.0% minus tiny exemptions).",
    freelanceSpecificRules:
      "Colorado's streamlined tax code still carries four high-impact planning nuances for 2024–2026:\n\n• HB25B-1001 QBI & Itemized Add-Back at $500k/$1M: Under Colorado law—made permanent by HB25B-1001 starting 2026 after OBBBA preserved QBI federally—freelancers with Federal AGI BELOW $500,000 (single/HoH) or $1,000,000 (married filing jointly) keep 100% of their federal 20% Section 199A QBI deduction on their Colorado return. Taxpayers crossing $500k/$1M AGI must add back their QBI deduction (and excess itemized/standard deductions above statutory caps) on Form DR 0104AD.\n• Colorado SALT Parity Act (4.40% PTET): S-Corporations and partnerships can elect Colorado's SALT Parity Act PTET (Form DR 1705 / DR 0106EP) to pay 4.40% tax at the entity level, providing a 100% refundable state credit to owners and an uncapped federal business deduction—highly valuable if MAGI crosses OBBBA's $505,000 SALT cap phase-down.\n• CO FAMLI (0.88% Rate in 2026): Colorado's Paid Family & Medical Leave Insurance (FAMLI) rate stands at 0.88% in 2026 up to the $184,500 Social Security wage cap (0.44% employee share + 0.44% employer share; employers with fewer than 10 employees nationwide are exempt from the 0.44% employer portion!). Self-employed 1099 sole proprietors pay $0 FAMLI unless voluntarily opting into coverage (0.44% on net SE income for a 3-year minimum commitment).\n• $25 Periodic Report Fee: Effective July 1, 2024, the Colorado Secretary of State raised its online LLC Periodic Report fee from $10 to $25/year (with a $50 late penalty if overdue).",
    standardDeductionGuide:
      "Colorado directly incorporates your federal standard deduction—$14,600 single ($29,200 MFJ, $21,900 HoH) for 2024, $15,000 ($30,000 / $22,500) for 2025, and $16,100 ($32,200 / $24,150) for 2026—plus your Section 199A QBI deduction (up to $500k/$1M AGI) and Solo 401(k)/SEP-IRA/HSA write-offs ($69k/$70k/$72k max retirement). One quirk: if you itemize federally, Colorado requires adding back state income taxes deducted on Schedule A and caps excess itemized deductions for high-income brackets.",
    estimatedTaxesGuide:
      "Colorado requires quarterly estimated payments on Form DR 0104EP (or online via Revenue Online) whenever your expected Colorado net tax liability minus credits/withholding exceeds $1,000. Installments are due April 15, June 15, September 15, and January 15. Safe harbor shields you from penalty if payments reach the lesser of 70% of current-year Colorado tax or 100% of prior-year Colorado tax—note Colorado's 70% current-year safe harbor is notably more forgiving than the IRS's 90% threshold!",
    localTaxDetails:
      "Colorado forbids percentage-based municipal income taxes, so no Front Range or mountain city taxes a slice of your 1099 margin. Instead, five Front Range cities—Denver, Aurora, Glendale, Greenwood Village, and Sheridan—levy a flat monthly Occupational Privilege Tax (OPT, or 'head tax'). In Denver, self-employed business owners physically working inside city limits owe the $4.00/month business OPT ($48/year) and any S-Corp paying >$500/month in Denver W-2 wages withholds $5.75/month employee + $4.00/month employer OPT via Denver eBiz Tax Center.",
    faqs: [
      {
        question: "Why does my Colorado tax bill feel lower than Illinois or Massachusetts?",
        answer:
          "Colorado starts from Federal Taxable Income (after your federal standard deduction and 20% Section 199A QBI deduction), whereas Illinois and Massachusetts start before QBI and allow much smaller personal exemptions.",
      },
      {
        question: "Is Colorado's tax rate 4.25% or 4.40% for 2024–2026?",
        answer:
          "Colorado's statutory flat rate is 4.40% for 2025 and 2026. Under temporary TABOR surplus legislation (SB 24-228), tax year 2024 only received a temporary reduction to 4.25%.",
      },
      {
        question: "Do solo freelancers owe Colorado's 0.88% FAMLI payroll tax?",
        answer:
          "Sole proprietors and single-member LLC owners are exempt unless they voluntarily opt in for a 3-year minimum term (0.44% of net SE income). S-Corp W-2 salaries up to $184,500 (2026) are subject to the 0.44% employee withholding (companies <10 employees are exempt from the 0.44% employer match).",
      },
      {
        question: "When must I pay Denver's Occupational Privilege Tax (OPT)?",
        answer:
          "If you physically perform work or run an office inside Denver, Aurora, Glendale, Greenwood Village, or Sheridan and earn over city thresholds ($500/mo in Denver), you register and remit the flat monthly head tax ($4.00/mo business owner or $9.75/mo combined S-Corp W-2).",
      },
      {
        question: "How does Colorado's HB25B-1001 affect high-earning 1099 consultants?",
        answer:
          "Made permanent starting in 2026, HB25B-1001 requires adding back federal Section 199A QBI deductions on your Colorado return if your Federal AGI exceeds $500,000 (single/HoH) or $1,000,000 (married filing jointly).",
      },
    ],
  },
});

function buildStateEditorialGuide(state: StateTaxData): StateEditorialGuide {
  const {
    name,
    code,
    taxType,
    flatRate,
    brackets,
    standardDeduction,
    agencyName,
    estimatedTaxForm,
    filingDeadline,
    localTaxNotes,
    hasLocalTax,
    llcAnnualFee,
    sCorpTreatment,
    pteTaxNotes,
    stateSpecificNuances,
    estimatedTaxThreshold,
  } = state;

  const flatPct = flatRate !== undefined ? (flatRate * 100).toFixed(2) : "0.00";
  const singleBrackets = brackets?.single ?? [];
  const minBracketPct =
    singleBrackets.length > 0 ? (singleBrackets[0].rate * 100).toFixed(2) : "0.00";
  const maxBracketPct =
    singleBrackets.length > 0
      ? (singleBrackets[singleBrackets.length - 1].rate * 100).toFixed(2)
      : "0.00";
  const topBracketFloor =
    singleBrackets.length > 0
      ? `$${singleBrackets[singleBrackets.length - 1].min.toLocaleString()}`
      : "$0";

  let taxSummaryTitle = "";
  let overviewPara1 = "";
  let rateText = "";
  let stateTaxRuleBullets = "";
  let deductionText = "";
  let estimatedText = "";

  if (taxType === "none") {
    taxSummaryTitle = "0% State Personal Income Tax";
    overviewPara1 = `Self-employed consultants, solo LLC owners, and 1099-NEC independent contractors based in ${name} (${code}) enjoy a 0% state personal income tax on net Schedule C freelance earnings, W-2 officer salaries, and investment gains. While residents pay zero state individual income tax to ${agencyName}, business owners must still account for federal Self-Employment tax, federal marginal brackets, and state-level entity or gross-receipts obligations.`;
    rateText = `${name} enforces a 0.00% personal income tax across every net income tier, saving solo earners roughly 3% to 11% annually compared to progressive-tax neighbors. However, zero individual income tax does not eliminate state compliance completely: ${stateSpecificNuances} For S-Corporation structuring, ${sCorpTreatment} Because there is no personal income tax, Pass-Through Entity Tax (PTET) status in ${name} is straightforward: ${pteTaxNotes}`;
    stateTaxRuleBullets = `• Federal SECA Tax Still Applies Full Force: Even with 0% ${name} individual income tax, your Schedule C net profit incurs 15.3% federal Self-Employment Tax on 92.35% of earnings (12.4% Social Security capped at $168,600 in 2024, $176,100 in 2025, and $184,500 in 2026, plus uncapped 2.9% Medicare and 0.9% Additional Medicare surtax over $200,000 single / $250,000 joint).\n• ${name} Entity & S-Corp Mechanics: ${llcAnnualFee}. ${sCorpTreatment}\n• Pass-Through Tax & State Business Nuances: ${pteTaxNotes} ${stateSpecificNuances}`;
    deductionText = `Because ${name} imposes no personal income tax on 1099 freelance earnings, there is no state individual standard deduction ($0 state baseline) or state personal tax return. Instead, every allowable Schedule C business write-off (equipment expensing under Section 179, home office, software, business mileage), above-the-line adjustments (50% SE tax, health insurance premiums, HSA, Solo 401(k)/SEP-IRA contributions up to $69,000 in 2024, $70,000 in 2025, and $72,000 in 2026), the federal standard deduction ($14,600 / $15,000 / $16,100 single; $29,200 / $30,000 / $32,200 married joint), and the permanent 20% Section 199A QBI deduction under OBBBA directly reduce your federal Form 1040 bill.`;
    estimatedText = `${name} assesses $0 in quarterly state personal income tax estimates (${estimatedTaxForm}). ${estimatedTaxThreshold} Focus your quarterly tax reserve entirely on IRS Form 1040-ES vouchers due April 15, June 15, September 15, and January 15 (paying via EFTPS or IRS Direct Pay to maintain 90% current-year or 100%/110% prior-year federal safe harbor), while keeping ${llcAnnualFee} renewal dates on your compliance calendar.`;
  } else if (taxType === "flat") {
    taxSummaryTitle = `${flatPct}% Flat Income Tax`;
    overviewPara1 = `Independent contractors, single-member LLCs, and gig workers operating in ${name} (${code}) pay a predictable ${flatPct}% flat state personal income tax administered by ${agencyName}, alongside federal Form 1040 and Schedule SE obligations. While a uniform rate simplifies marginal planning across 2024–2026, state deduction limits, entity fees, and local taxes can materially change your real effective tax burden in ${name}.`;
    rateText = `In flat-rate jurisdictions like ${name}, a constant ${flatPct}% statutory tax applies to state taxable income regardless of whether your 1099 freelance profit is $45,000 or $450,000. ${stateSpecificNuances} For formalized entities evaluating pass-through elections: ${sCorpTreatment} Regarding federal SALT cap planning: ${pteTaxNotes}`;
    stateTaxRuleBullets = `• Deductions That Cut Both Federal & ${name} Taxes: Every qualifying Schedule C expense (laptops, accounting, SaaS tools, dedicated home office, mileage) reduces both 15.3% federal SECA tax and your ${flatPct}% ${name} state base.\n• ${name} LLC Fees & S-Corp Structure: ${llcAnnualFee}. ${sCorpTreatment}\n• Pass-Through Entity Tax (PTET) & State Rules: ${pteTaxNotes} ${stateSpecificNuances}`;
    deductionText = `Under ${name}'s current baseline structure, single filers deduct $${standardDeduction.single.toLocaleString()}, married joint filers deduct $${standardDeduction.married_joint.toLocaleString()}, and heads of household deduct $${standardDeduction.head_of_household.toLocaleString()} before applying the ${flatPct}% flat rate (compared with federal 2024–2026 single standard deductions of $14,600 / $15,000 / $16,100 and joint deductions of $29,200 / $30,000 / $32,200). Pair state deductions with Solo 401(k)/SEP-IRA deferrals ($69,000 in 2024; $70,000 in 2025; $72,000 in 2026) and verify whether ${name} conforms to federal Section 199A QBI rules (${stateSpecificNuances}).`;
    estimatedText = `To stay clear of underpayment penalties with ${agencyName}, monitor ${name} quarterly filings on ${estimatedTaxForm}. ${estimatedTaxThreshold} Scheduled due dates run ${filingDeadline}. Safe harbor protection generally requires timely payments covering at least 90% of current-year ${name} liability or 100% (110% for high-AGI households under applicable rules) of your prior full-year state tax alongside federal Form 1040-ES vouchers.`;
  } else {
    taxSummaryTitle = `${minBracketPct}%–${maxBracketPct}% Progressive Brackets`;
    overviewPara1 = `Freelancers, independent consultants, and sole proprietors in ${name} (${code}) pay graduated state personal income taxes administered by ${agencyName}, alongside federal Form 1040 and 15.3% Schedule SE self-employment obligations. Across 2024–2026, knowing exactly which progressive bracket your next dollar of 1099 profit enters—and which entity fees or pass-through elections apply in ${name}—lets you time equipment purchases and retirement deferrals strategically.`;
    rateText = `In graduated-bracket jurisdictions like ${name}, marginal tax rates rise across ${singleBrackets.length} progressive income tiers, beginning at ${minBracketPct}% and scaling up to a top marginal rate of ${maxBracketPct}% once single taxable income exceeds ${topBracketFloor}. ${stateSpecificNuances} Married couples filing jointly benefit from wider statutory thresholds (${singleBrackets.length} tiers calibrated by filing status). For pass-through owners evaluating an S-Corp or SALT cap election: ${sCorpTreatment} ${pteTaxNotes}`;
    stateTaxRuleBullets = `• Bracket-Shaving Deductions in ${name}: Because every pre-tax Schedule C business expense and eligible retirement contribution comes directly off your top ${maxBracketPct}% marginal ${name} tier plus federal tax + 15.3% SECA, high earners capture stacked marginal savings.\n• ${name} LLC Compliance & S-Corp Nuances: ${llcAnnualFee}. ${sCorpTreatment}\n• Pass-Through Entity Tax (PTET) & Local Nuances: ${pteTaxNotes} ${stateSpecificNuances}`;
    deductionText = `For state income computation, ${name} applies a baseline standard deduction or personal exemption allowance of $${standardDeduction.single.toLocaleString()} (Single), $${standardDeduction.married_joint.toLocaleString()} (Married Filing Jointly), and $${standardDeduction.head_of_household.toLocaleString()} (Head of Household)—compared to federal standard deductions of $14,600 (2024), $15,000 (2025), and $16,100 (2026) single ($29,200 / $30,000 / $32,200 joint). Note how state rules treat federal adjustments: ${stateSpecificNuances} Maximizing Solo 401(k)/SEP-IRA limits ($69,000 in 2024, $70,000 in 2025, $72,000 in 2026) helps keep 1099 income out of ${name}'s upper brackets.`;
    estimatedText = `Because 1099 clients do not withhold ${name} income tax, submit quarterly estimates to ${agencyName} using ${estimatedTaxForm}. ${estimatedTaxThreshold} Quarterly filing windows follow ${filingDeadline}. Safe harbor rules typically protect against penalties when timely state vouchers cover 90% of current-year tax or 100% of prior-year state liability (110% above applicable high-income thresholds), complementing quarterly IRS Form 1040-ES payments.`;
  }

  return {
    seoTitle: `${name} 1099 Freelance Tax Calculator (2024–2026) - ${taxSummaryTitle}`,
    metaDescription: `Calculate 2024–2026 ${name} (${code}) 1099 freelance taxes, ${taxSummaryTitle.toLowerCase()}, Schedule SE 15.3% self-employment tax, ${
      taxType === "none" ? "federal QBI & entity fees" : `${estimatedTaxForm} deadlines`
    }, and LLC/S-Corp rules.`,
    h1Title: `${name} 1099 Freelance & Self-Employment Tax Guide (2024–2026)`,
    overview: `${overviewPara1}\n\nAt the federal level across 2024–2026, net self-employment income above $400 triggers IRS Schedule SE: 15.3% on 92.35% of net profit (12.4% Social Security up to $168,600 in 2024, $176,100 in 2025, and $184,500 in 2026, plus uncapped 2.9% Medicare and 0.9% Additional Medicare surtax above $200,000 single / $250,000 joint). Under the One Big Beautiful Bill Act (OBBBA), the 20% Section 199A QBI deduction is now permanent (single phase-out starting at $191,950 in 2024, $197,300 in 2025, and $201,750 in 2026) and the federal individual SALT cap stands at $40,000 (2025) and $40,400 (2026) before phasing down above $505,000 MAGI.`,
    rateBreakdown: rateText,
    freelanceSpecificRules: `To optimize net after-tax take-home pay in ${name}, combine disciplined federal Schedule C bookkeeping with state-specific entity compliance:\n\n${stateTaxRuleBullets}`,
    standardDeductionGuide: deductionText,
    estimatedTaxesGuide: estimatedText,
    localTaxDetails: hasLocalTax
      ? `Municipal, county, or special local business levies directly affect ${name} independent contractors. Specifically in ${name}: ${localTaxNotes} Verify local registration thresholds early—home-based remote contractors often overlook city business licenses, gross-receipts filings, or municipal occupational taxes that are billed independently of ${agencyName} returns.`
      : `Good news on municipal complexity: ${localTaxNotes} Without separate city personal income tax returns to manage, ${name} freelancers focus compliance on ${agencyName}, federal IRS Form 1040-ES, annual entity renewals (${llcAnnualFee}), and any applicable state sales tax permits.`,
    faqs: [
      {
        question: `What is the ${name} state income tax rate for 1099 freelancers in 2024–2026?`,
        answer:
          taxType === "none"
            ? `${name} imposes 0% state personal income tax on earned 1099 freelance profit. Contractors pay only federal 15.3% Schedule SE and federal income taxes, plus any state business compliance rules (${stateSpecificNuances}).`
            : taxType === "flat"
            ? `${name} levies a ${flatPct}% flat income tax in our engine baseline on state taxable income (${stateSpecificNuances}). Subtract eligible Schedule C expenses and the $${standardDeduction.single.toLocaleString()} single state allowance before applying the rate.`
            : `${name} taxes net income across ${singleBrackets.length} graduated brackets ranging from ${minBracketPct}% to ${maxBracketPct}% (single top tier above ${topBracketFloor}), applied after $${standardDeduction.single.toLocaleString()} single standard deductions (${stateSpecificNuances}).`,
      },
      {
        question: `How much are recurring LLC annual fees in ${name}?`,
        answer: `In ${name}, recurring Secretary of State or revenue entity fees follow this schedule: ${llcAnnualFee}. Maintain separate business banking and timely annual reports to preserve liability protection.`,
      },
      {
        question: `Does ${name} offer a PTET SALT cap workaround or special S-Corp treatment?`,
        answer: `${sCorpTreatment} For pass-through entity tax: ${pteTaxNotes}`,
      },
      {
        question: `When are quarterly estimated taxes due in ${name}?`,
        answer:
          taxType === "none"
            ? `${name} requires $0 in state personal income tax quarterly vouchers (${estimatedTaxForm}). Instead, submit federal Form 1040-ES quarterly payments to the IRS on April 15, June 15, September 15, and January 15.`
            : `${estimatedTaxThreshold} Submit quarterly vouchers via ${estimatedTaxForm} to ${agencyName} on ${filingDeadline}, alongside IRS Form 1040-ES federal payments.`,
      },
      {
        question: `Are there local city or county freelance taxes in ${name}?`,
        answer: localTaxNotes,
      },
    ],
  };
}

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
    llcAnnualFee: "$0 Business Privilege Tax if liability is $100 or less (exempt for tax years after 2023; $100+ minimum if larger assets); no annual Secretary of State LLC report fee",
    sCorpTreatment: "Alabama honors federal S-Corp elections (Form 20S) with no state entity income tax on pass-through profit; small S-Corps with $100 or less BPT are exempt from BPT returns starting 2024+",
    pteTaxNotes: "Elective Pass-Through Entity Tax (Form PTE-C) taxed at Alabama's top 5.0% individual rate, granting owners a refundable credit against Form 40",
    stateSpecificNuances: "Uniquely allows individuals to deduct regular federal income taxes actually paid (excluding Self-Employment SECA tax) on Alabama Form 40; temporary overtime pay exemptions expired mid-2025",
    estimatedTaxThreshold: "Required when expected Alabama tax due after withholding exceeds $500 (Form 40ES; $1,000 underpayment threshold rules apply on joint/withheld credits)",
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
    llcAnnualFee: "$100 Biennial Report due every two years (by Jan 2 of filing cycle) plus $50 Alaska Business License renewal",
    sCorpTreatment: "Alaska imposes 0% personal income tax and exempts S-Corporations from its 0%–9.4% corporate net income tax (C-Corps only)",
    pteTaxNotes: "No Pass-Through Entity Tax (PTET) exists because Alaska levies 0% individual state income tax",
    stateSpecificNuances: "Residents receive the annual Alaska Permanent Fund Dividend (PFD), which is exempt from state tax (0%) but remains fully taxable on your federal Form 1040",
    estimatedTaxThreshold: "No state personal income tax estimates apply; comply strictly with federal IRS Form 1040-ES quarterly schedule",
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
    llcAnnualFee: "$0 annual LLC report fee to the Arizona Corporation Commission (one-time formation and publication outside Maricopa/Pima only)",
    sCorpTreatment: "Arizona recognizes federal S-Corp status (Form 120S) with a $50 minimum corporate fee and passes ordinary business income through to Form 140 at 2.50%",
    pteTaxNotes: "Elective 2.98% Small Business / PTE Tax (Form 120S / Form 165) helps pass-through owners bypass federal SALT caps; refundable/non-refundable carryover rules apply",
    stateSpecificNuances: "Conforms closely to federal standard deductions (indexing toward $15,000/$16,100 in 2025–2026) and allows electing the Small Business Income (SBI) schedule (Form 140-SBI) or standard 2.5% rate; watch AZ Transaction Privilege Tax (TPT) if selling goods",
    estimatedTaxThreshold: "Required when Arizona tax due (or prior-year AZ tax) exceeds $1,000 ($75,000 single / $150,000 joint gross income criteria also apply on Form 140ES)",
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
    llcAnnualFee: "$150 annual LLC Franchise Tax due May 1 to the Arkansas Secretary of State",
    sCorpTreatment: "Arkansas recognizes federal S-Corp status (Form AR1100S); entity owes $150 minimum franchise tax annually",
    pteTaxNotes: "Arkansas Elective Pass-Through Entity Tax (PET Tax, Form AR1100PET) taxes S-Corp/partnership income at the top individual marginal rate (3.9% for recent tax years) with owner exclusion",
    stateSpecificNuances: "Arkansas cut its top marginal rate to 3.9% across Act 1 of 2024 (indexing standard deduction modestly toward $2,410/$2,470 in 2025–2026) and exempts 50% of net capital gains from state tax",
    estimatedTaxThreshold: "Required when expected Arkansas tax liability exceeds $1,000 after withholding and credits",
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
    hasCustomGuide: true,
    standardDeduction: { single: 5540, married_joint: 11080, married_separate: 5540, head_of_household: 11080 },
    agencyName: "California Franchise Tax Board (FTB)",
    agencyUrl: "https://www.ftb.ca.gov",
    estimatedTaxForm: "Form 540-ES",
    filingDeadline: "April 15 (30%), June 15 (40%), September 15 (0%), January 15 (30%)",
    hasLocalTax: false,
    localTaxNotes: "California cities do not levy personal income taxes, but San Francisco imposes an annual Gross Receipts Tax and Los Angeles requires an annual City Business Tax registration.",
    llcAnnualFee: "$800 mandatory annual minimum franchise tax (Form 3522; 1st-year exemption expired after 2023) plus Form 3536 Gross Receipts Fee ($900 to $11,790 at $250k+ receipts) and $20 Statement of Information every 2 years",
    sCorpTreatment: "California S-Corporations owe 1.5% entity-level tax on net income (Form 100S, $800 minimum) plus uncapped CA SDI payroll withholding (1.1% 2024 / 1.2% 2025 / 1.3% 2026) on W-2 officer salaries",
    pteTaxNotes: "Elective 9.3% PTET (AB 150 / SB 132 extended through 2030; Form 3804) awards a personal FTB credit and uncapped federal deduction; 2026 softens missed June 15 prepayment penalty",
    stateSpecificNuances: "FTB non-conformity disallows Section 199A QBI (0%), bonus depreciation, and HSA deductions; caps Sec. 179 at $25k; indexes CA standard deduction ($5,540 in 2024 -> $5,706 in 2025 -> $5,900 in 2026 single); mental health surtax adds 1% above $1M",
    estimatedTaxThreshold: "Required when expecting to owe $500+ in CA tax ($250 MFS) on front-loaded 30% / 40% / 0% / 30% schedule; high earners ($1M+ AGI) lose prior-year safe harbor",
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
    hasCustomGuide: true,
    flatRate: 0.044,
    standardDeduction: { single: 14600, married_joint: 29200, married_separate: 14600, head_of_household: 21900 },
    agencyName: "Colorado Department of Revenue",
    agencyUrl: "https://tax.colorado.gov",
    estimatedTaxForm: "Form DR 0104EP",
    filingDeadline: "April 15, June 15, September 15, January 15",
    hasLocalTax: true,
    localTaxNotes: "Denver, Aurora, Glendale, Greenwood Village, and Sheridan levy a flat monthly Occupational Privilege Tax (OPT)—Denver charges $4.00/mo business owner OPT plus $5.75/mo on W-2 employees.",
    llcAnnualFee: "$25 annual LLC Periodic Report to Colorado Secretary of State (raised from $10 on July 1, 2024; $50 late penalty if overdue)",
    sCorpTreatment: "Colorado recognizes federal S-Corp status (Form DR 0106) with no entity tax unless electing PTET; W-2 officer wages up to $184,500 (2026) incur CO FAMLI (0.44% employee share; <10-employee companies exempt from 0.44% employer match)",
    pteTaxNotes: "Colorado SALT Parity Act (Form DR 1705 / DR 0106EP) lets S-Corps and partnerships elect 4.40% entity tax for a 100% refundable owner credit",
    stateSpecificNuances: "Starts from Federal Taxable Income—passing through Federal standard deduction and 20% Section 199A QBI automatically below HB25B-1001 add-back thresholds ($500k single / $1M MFJ AGI); note temporary 4.25% rate applied in 2024 only before reverting to 4.40% in 2025–2026",
    estimatedTaxThreshold: "Required on Form DR 0104EP when net Colorado tax owed exceeds $1,000; forgiving 70% current-year or 100% prior-year safe harbor",
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
    llcAnnualFee: "$80 annual LLC report due by March 31 to the Connecticut Secretary of the State",
    sCorpTreatment: "Connecticut recognizes S-Corp status; pass-through entities file Form CT-1065/CT-1120SI and may elect optional PTET (mandatory PE tax became elective starting 2024)",
    pteTaxNotes: "Elective 6.99% Pass-Through Entity Tax (became optional starting 2024 after previously being mandatory) awards an 87.5% tax credit to partners/shareholders",
    stateSpecificNuances: "Phases out personal exemptions completely above upper AGI levels and applies 2% property tax credits plus lower-bracket benefit recapture on high-income residents; cut 3%/5% lower tiers to 2%/4.5% starting 2024",
    estimatedTaxThreshold: "Required on Form CT-1040ES when expected unwithheld Connecticut income tax reaches $1,000 or more",
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
    localTaxNotes: "The City of Wilmington levies a 1.25% earned income wage and net profits tax on residents and non-residents working inside city borders.",
    llcAnnualFee: "$400 flat Annual Alternative Entity Franchise Tax due June 1 (recent rate raised from $300 to $400) regardless of revenue",
    sCorpTreatment: "Delaware honors federal S-Corp status (Form 1100S) with no state corporate net income tax on resident pass-through earnings, though Delaware Gross Receipts Tax applies to DE business receipts",
    pteTaxNotes: "No PTET enacted: Delaware has NOT adopted a Pass-Through Entity Tax SALT cap workaround for 2024–2026",
    stateSpecificNuances: "Uniquely sets Q1 estimated due date on April 30 (not April 15), imposes a state Gross Receipts Tax across service trades above monthly exclusions, and charges 0% statewide sales tax",
    estimatedTaxThreshold: "Required on Form PIT-EST / Form 200-ES when expected unwithheld Delaware income tax exceeds $800–$1,000 ($800 statutory penalty line under Delaware Division of Revenue rules)",
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
    localTaxNotes: "DC levies an 8.25% Unincorporated Business Franchise Tax (Form D-30) when gross receipts exceed $12,000, subject to exemptions for active professional/personal-service businesses and owner salary allowances.",
    llcAnnualFee: "$300 Biennial Report due April 1 every two years (Form BRA-25) plus $250+ Basic Business License",
    sCorpTreatment: "Crucial DC quirk: DC does NOT recognize federal S-Corp status! S-Corporations are taxed as DC C-Corporations on Form D-20 at 8.25% ($250–$1,000 minimum) after deducting reasonable officer salaries",
    pteTaxNotes: "No PTET enacted yet: DC has not adopted an operational Pass-Through Entity Tax workaround (legislative proposals remain pending)",
    stateSpecificNuances: "DC personal service exemptions (>80% gross income from personal services or licensed professionals) shield many solo 1099 contractors from D-30 UBT, pushing profit onto individual Form D-40; standard deduction tracks federal $14,600–$16,100",
    estimatedTaxThreshold: "Required on Form D-40ES whenever expected District tax owed after withholding exceeds $100",
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
    hasCustomGuide: true,
    standardDeduction: { single: 0, married_joint: 0, married_separate: 0, head_of_household: 0 },
    agencyName: "Florida Department of Revenue",
    agencyUrl: "https://floridarevenue.com",
    estimatedTaxForm: "N/A (No State Income Tax)",
    filingDeadline: "N/A",
    hasLocalTax: false,
    localTaxNotes: "The Florida Constitution bans personal income taxes at state and municipal levels, though counties/cities require annual Business Tax Receipts ($25–$150) and Form DR-405 TPP filings ($25k exemption).",
    llcAnnualFee: "$138.75 mandatory Annual Report due May 1 via Sunbiz (non-waivable $400 late fee starting May 2)",
    sCorpTreatment: "Florida honors federal S-Corp status (0% state tax on ordinary profits, unlike 5.5% C-Corp tax above $50k), making S-Corp solely a federal 15.3% SECA arbitrage",
    pteTaxNotes: "No PTET exists because Florida levies 0% individual state income tax",
    stateSpecificNuances: "Relocating founders must establish Florida domicile (Declaration of Domicile, FL license, >183-day tracking); April 1 county TPP Form DR-405 exempts first $25,000 of business assets",
    estimatedTaxThreshold: "Zero quarterly state personal income tax vouchers; pay IRS Form 1040-ES quarterly and submit Sunbiz LLC report by May 1",
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
    localTaxNotes: "Georgia counties and municipalities do not levy local personal income taxes, though cities/counties charge local annual Occupational Tax Certificates.",
    llcAnnualFee: "$50 annual registration fee due by April 1 to the Georgia Secretary of State",
    sCorpTreatment: "Georgia recognizes federal S-Corp status (Form 600S); net worth tax applies only above $100,000 corporate net worth thresholds",
    pteTaxNotes: "Elective Pass-Through Entity Tax (HB 149 / Form 600S / Form 700) allows S-Corps and partnerships to pay tax at Georgia's flat individual rate so owners exclude taxed income",
    stateSpecificNuances: "Converted from progressive brackets to a flat rate starting in 2024 (5.49% baseline in engine; stepped down by HB 1015/legislation to 5.39% in 2024 retroactive / 5.19% in 2025 / 5.09% in 2026!) alongside a $12,000 single / $24,000 MFJ standard deduction",
    estimatedTaxThreshold: "Required on Form 500-ES whenever expected Georgia income tax after withholding exceeds $500",
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
    localTaxNotes: "Hawaii levies a statewide General Excise Tax (GET) of 4.0% (4.5% in Honolulu, Kauai, Hawaii County, and Maui with county surcharge) on gross business revenues across nearly all 1099 consulting and trade services.",
    llcAnnualFee: "$15 annual report to Hawaii DCCA (online filing $12.50–$15) plus GET license ($20 one-time)",
    sCorpTreatment: "Hawaii honors federal S-Corp elections (Form N-35) with pass-through to 12 brackets up to 11.0%; S-Corps must still collect/pay 4%–4.5% General Excise Tax on gross receipts",
    pteTaxNotes: "Elective Pass-Through Entity Tax (Act 50; Form N-362E) taxes pass-through entities at 11.0% (with rate alignment discussions) and passes a credit to owners",
    stateSpecificNuances: "Watch Hawaii's General Excise Tax (GET)—unlike mainland sales tax, GET applies directly to B2B 1099 freelance consulting gross revenue (may visibly pass on up to 4.712% in Oahu); Hawaii also uses the 20th of April/June/Sep/Jan for deadlines and phases in larger deductions from 2024–2031 under Act 46",
    estimatedTaxThreshold: "Required via Form N-200V / N-11ES under Hawaii safe harbor rules (lesser of 60% current-year tax or 100% prior-year tax when net unwithheld liability applies)",
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
    llcAnnualFee: "$0 Annual Report fee (information report due annually on anniversary month via SOSBiz)",
    sCorpTreatment: "Idaho recognizes federal S-Corp status (Form 41S) with a $20 minimum entity tax and passes profit to Form 40",
    pteTaxNotes: "Elective ABE Tax (Affected Business Entity Tax under Form 41S/65) applies Idaho's corporate/flat rate to help S-Corp and partnership owners bypass federal SALT caps",
    stateSpecificNuances: "Idaho pairs a flat income tax (5.695% in 2024 baseline; trimmed to ~5.3% in 2025 under HB 40) with full federal standard deduction conformity ($14,600 / $15,000 / $16,100) above the $2,500/$5,000 zero-rate exemption slice",
    estimatedTaxThreshold: "Note: Idaho generally only mandates quarterly individual Form 51 estimated payments if you were required to make federal quarterly payments or expect tax due over $500 (safe harbor rules allow single annual payment or Form 51 installments)",
    editorialGuide: {} as StateEditorialGuide,
  },

  // 14. Illinois
  {
    slug: "illinois",
    code: "IL",
    name: "Illinois",
    taxType: "flat",
    hasCustomGuide: true,
    flatRate: 0.0495,
    standardDeduction: { single: 2775, married_joint: 5550, married_separate: 2775, head_of_household: 2775 },
    agencyName: "Illinois Department of Revenue",
    agencyUrl: "https://tax.illinois.gov",
    estimatedTaxForm: "Form IL-1040-ES",
    filingDeadline: "April 15, June 15, September 15, January 15",
    hasLocalTax: false,
    localTaxNotes: "Illinois has a constitutional flat tax mandate and forbids municipal personal income taxes, though Chicago charges business license and cloud lease transaction taxes.",
    llcAnnualFee: "$75 Annual Report fee due prior to anniversary month to the Illinois Secretary of State",
    sCorpTreatment: "Crucial Illinois S-Corp rule: S-Corporations owe an extra 1.5% entity-level Personal Property Replacement Tax (PPRT) on Form IL-1120-ST alongside owners' 4.95% personal tax",
    pteTaxNotes: "Elective 4.95% PTE Tax (Form IL-1120-ST / IL-1065) provides a refundable 4.95% credit to owners and bypasses federal SALT limits above OBBBA's $505k phaseout",
    stateSpecificNuances: "IL-1040 starts from Federal AGI (not Taxable Income), disallowing the 20% Section 199A QBI deduction and federal bonus depreciation (Form IL-4562); personal exemption ($2,775 in 2024 -> $2,850 in 2025 -> $2,925 in 2026) phases out above $250k/$500k AGI",
    estimatedTaxThreshold: "Required on Form IL-1040-ES when net Illinois tax owed exceeds $1,000 after withholding and PTE credits",
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
    localTaxNotes: "All 92 Indiana counties levy a County Local Income Tax (LIT) between 0.5% and 3.0% (e.g., Marion County 2.02%, Hamilton 1.10%), collected right on Form IT-40.",
    llcAnnualFee: "$30 online ($32.44 portal / $50 paper) Business Entity Report due biennially (every 2 years) via INBiz",
    sCorpTreatment: "Indiana honors federal S-Corp status (Form IT-20S) with zero corporate net income tax; S-Corp profit remains subject to state + county LIT on owners' IT-40",
    pteTaxNotes: "Indiana PTET (Form IT-20S / IT-65) applies the 3.0%–3.05% state rate (plus optional county tax) and passes a 100% refundable credit to partners/shareholders",
    stateSpecificNuances: "State flat rate stepping down on multi-year schedule (3.05% in 2024 baseline -> 3.00% in 2025 -> 2.95% in 2026 -> 2.90% in 2027), paired with small $1,000/$2,000 personal exemptions rather than a federal standard deduction",
    estimatedTaxThreshold: "Required on Form IT-40ES when combined unwithheld state and county income tax liability equals $1,000 or more",
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
    localTaxNotes: "Certain Iowa school districts impose an Educational Surtax (1% to 20% of state tax liability), computed directly on Form IA 1040.",
    llcAnnualFee: "$30 online ($45 paper) Biennial Report due in odd-numbered years (Jan 1 – Apr 1) to the Iowa Secretary of State",
    sCorpTreatment: "Iowa recognizes federal S-Corp status (Form IA 1120S) and taxes pass-through ordinary profit at the flat 3.80% rate on owners' IA 1040",
    pteTaxNotes: "Elective Pass-Through Entity Tax (IA PTET, Form IA 1065 / IA 1120S) applies at top corporate/individual rates with a refundable owner credit",
    stateSpecificNuances: "Iowa accelerated its transition directly to a single 3.80% flat individual tax effective January 1, 2025 (SF 2442), conforms to Federal Taxable Income (passing through QBI & federal std deduction), and shifts quarterly deadlines to April 30 / June 30 / Sep 30 / Jan 31",
    estimatedTaxThreshold: "Required on Form IA 1040ES whenever expected Iowa tax due after credits exceeds $200",
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
    localTaxNotes: "Certain Kansas counties levy an intangible earnings tax on dividends/interest, but no municipal income tax applies to 1099 business profits.",
    llcAnnualFee: "$50 online ($55 paper) Biennial Information Report due every two years (odd or even based on formation year) via Kansas SOS",
    sCorpTreatment: "Kansas honors federal S-Corp status (Form K-120S) with zero corporate tax on ordinary pass-through earnings",
    pteTaxNotes: "Kansas SALT Parity Act PTET (Form K-120S / K-65) taxes S-Corp/partnership income at 5.58% (aligned with top individual bracket updates) with a refundable owner credit",
    stateSpecificNuances: "Kansas SB 1 (2024 Special Session) collapsed its three brackets (3.1%–5.7% in 2024 engine baseline) into two brackets of 5.20% and 5.58% while lifting standard deductions modestly ($3,605/$8,240+ indexing)",
    estimatedTaxThreshold: "Required on Form K-40ES whenever expected Kansas income tax balance due exceeds $500",
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
    localTaxNotes: "Dozens of Kentucky cities and counties enforce local occupational license taxes on net profits and W-2 wages (e.g., Louisville/Jefferson County 2.2%, Lexington-Fayette 2.25%).",
    llcAnnualFee: "$15 Annual Report due June 30 to the Kentucky Secretary of State",
    sCorpTreatment: "Kentucky S-Corporations pay the Limited Liability Entity Tax (LLET: minimum $175/year; note single-member LLCs owe no LLET if disregarded) on Form PTE alongside pass-through income",
    pteTaxNotes: "Elective Kentucky PTET (Form 720S / Form PTE; 4.0% / 3.5% rate matching individual tax) provides a refundable credit on Form 740",
    stateSpecificNuances: "Statutory flat rate stepped down from 4.0% (2024–2025) to 3.5% starting January 1, 2026 under HB 1; note KY married-joint standard deduction equals single ($3,160 in 2024 baseline, $3,270+ indexed) without doubling!",
    estimatedTaxThreshold: "Required on Form 740-ES whenever expected net Kentucky income tax liability exceeds $500",
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
    localTaxNotes: "Louisiana parishes levy local sales taxes, but zero parish or municipal personal earned income taxes apply.",
    llcAnnualFee: "$30 Annual Report due on the formation anniversary date via geauxBIZ",
    sCorpTreatment: "Louisiana historically taxes corporate-taxed entities under corporate/franchise tax (Corporate Franchise Tax scheduled for repeal starting 2026 under HB 3!); eligible S-Corps can elect pass-through exclusion or PTE tax",
    pteTaxNotes: "Elective Pass-Through Entity Tax (Form CIFT-620 with PTE election) taxes net business income at 3.0% (starting 2025 reform) with owner income exclusion",
    stateSpecificNuances: "Major 2025–2026 reform: while our calculator retains 2024 progressive tiers (1.85%–4.25% & $4,500 exemption), Louisiana Special Session Act 11 replaced brackets with a flat 3.0% income tax and $12,500 single / $25,000 joint standard deduction starting January 1, 2025",
    estimatedTaxThreshold: "Required on Form IT-540ES when net unwithheld Louisiana tax exceeds $1,000 ($2,000 married filing jointly)",
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
    llcAnnualFee: "$85 Annual Report due June 1 to the Maine Secretary of State",
    sCorpTreatment: "Maine honors federal S-Corp elections (Form 1120S-ME) with zero corporate tax on ordinary pass-through earnings",
    pteTaxNotes: "Newly enacted Maine PTET takes effect for tax years beginning on or after January 1, 2026 (no Maine PTET existed in 2024–2025)",
    stateSpecificNuances: "Conforms to federal standard deduction ($14,600 / $15,000 / $16,100) before phasing out for upper incomes; Maine Paid Family & Medical Leave payroll deductions began in 2025 (0.5%–1.0% on S-Corp W-2 wages; optional for self-employed)",
    estimatedTaxThreshold: "Required on Form 1040ES-ME when expected Maine income tax liability after credits reaches $1,000 or more",
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
    localTaxNotes: "Every Maryland resident owes a mandatory county income tax (2.25% in Worcester up to 3.20%–3.30% in Montgomery, Howard, and Baltimore City) directly on Form 502—making effective top MD rates ~8.95%+.",
    llcAnnualFee: "$300 Annual Report / Personal Property Return due April 15 to Maryland SDAT (no discount for zero-revenue LLCs)",
    sCorpTreatment: "Maryland recognizes federal S-Corp status (Form 510) with zero corporate tax on resident earnings; owners report both state and county rates on Form 502",
    pteTaxNotes: "Elective Maryland PTE Tax (Form 511) taxes pass-through entities on resident + non-resident income (8.0%–8.95% combined state+county equivalent) with 100% owner credit",
    stateSpecificNuances: "Standard deduction capped at 15% of AGI (min $1,700 / max $2,550–$2,800 single, double MFJ; recent 2025 budget also added upper-income surtaxes above $500k/$1M); watch the $300/year SDAT Personal Property return deadline every April 15",
    estimatedTaxThreshold: "Required on Form 502D / Form PV whenever expected Maryland state plus county tax owed exceeds $500",
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
    hasCustomGuide: true,
    flatRate: 0.05,
    standardDeduction: { single: 4400, married_joint: 8800, married_separate: 4400, head_of_household: 6800 },
    agencyName: "Massachusetts Department of Revenue",
    agencyUrl: "https://www.mass.gov/dor",
    estimatedTaxForm: "Form 1-ES",
    filingDeadline: "April 15, June 15, September 15, January 15",
    hasLocalTax: false,
    localTaxNotes: "Massachusetts forbids municipal personal income taxes. A 4.0% Fair Share Surtax applies above $1,053,750 (2024), $1,083,150 (2025), and $1,107,750 (2026).",
    llcAnnualFee: "$500 Annual Report ($520 online) due on LLC anniversary date to the MA Secretary of the Commonwealth",
    sCorpTreatment: "Massachusetts S-Corps pay a mandatory $456 minimum corporate excise tax on Form 355S, plus a 2% corporate income sting tax at $6M–$9M receipts (3% at $9M+)",
    pteTaxNotes: "Chapter 63D elective 5.0% PTET grants owners a 90% refundable personal credit (10% state haircut)—worth modeling closely against OBBBA's $40k/$40.4k SALT cap",
    stateSpecificNuances: "DOR Directive 08-3 disallows self-employed sole-proprietor SEP-IRA, SIMPLE, and Solo 401(k) deductions on Form 1; short-term capital gains taxed at 8.5%; Schedule HC mandates individual health coverage",
    estimatedTaxThreshold: "Required on Form 1-ES when unwithheld MA income tax exceeds $400 (safe harbor: 80% current-year or 100% prior-year tax)",
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
    localTaxNotes: "24 Michigan cities levy municipal income taxes (Detroit: 2.4% resident / 1.2% non-resident; Grand Rapids 1.5%/0.75%; Lansing, Flint, Ann Arbor exclusions—check exact city rates).",
    llcAnnualFee: "$25 Annual Statement due February 15 to Michigan LARA ($0 if formed after September 30 for first cycle)",
    sCorpTreatment: "Michigan recognizes federal S-Corp status (no MI entity corporate income tax, though Flow-Through Entity Tax is optional; non-resident withholding repealed in favor of FTE)",
    pteTaxNotes: "Michigan Flow-Through Entity (FTE) Tax (Form 5772) imposes 4.25% at the entity level with a 100% refundable MI-1040 credit for owners",
    stateSpecificNuances: "Flat 4.25% rate applies to Federal AGI minus personal exemptions ($5,600 in 2024 -> $5,800 in 2025 -> $5,900+ in 2026 per person); does not pass through Section 199A QBI because MI starts from Federal AGI",
    estimatedTaxThreshold: "Required on Form MI-1040ES whenever expected Michigan income tax liability after credits exceeds $500",
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
    localTaxNotes: "Minnesota prohibits municipal personal income taxes (local sales taxes apply in major metros).",
    llcAnnualFee: "$0 Annual Renewal fee due by December 31 via Minnesota Secretary of State (if filed on time before dissolution)",
    sCorpTreatment: "Minnesota S-Corporations file Form M8 and pay an entity-level Minimum Fee ($0 up to $11,900 depending on MN property/payroll/sales volume above ~$1.2M thresholds)",
    pteTaxNotes: "Minnesota Pass-Through Entity (PTE) Tax (Form M8 / M3) applies at 9.85% with a 100% refundable credit on Form M1",
    stateSpecificNuances: "Imposes a 1.0% Net Investment Income Tax above $1,000,000 investment income starting 2024; MN Paid Leave payroll program starts Jan 1, 2026 (0.88% on S-Corp W-2 wages, optional for 1099 sole proprietors); tracks indexed standard deduction ($14,575–$15,000+)",
    estimatedTaxThreshold: "Required when expected Minnesota income tax balance due after withholding and credits is $500 or more",
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
    llcAnnualFee: "$0 Annual Report fee due April 15 online via Mississippi Secretary of State for domestic LLCs",
    sCorpTreatment: "Mississippi honors federal S-Corp elections (Form 84-105), though corporate franchise tax ($2.50 per $1,000 capital) was phased down toward repeal starting 2028",
    pteTaxNotes: "Elective Mississippi PTET (Form 84-105 / 86-105) taxes entity income at 4.7%–4.0% with an owner tax credit equal to taxes paid",
    stateSpecificNuances: "Exempts the first $10,000 of taxable income (0% band reflected via combined deduction/exemption baseline) and is actively cutting its flat rate from 4.7% (2024 baseline) to 4.4% (2025) and 4.0% (2026) under HB 531 & HB 1",
    estimatedTaxThreshold: "Required on Form 80-106 / 80-105 vouchers whenever expected Mississippi tax owed exceeds $200",
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
    localTaxNotes: "St. Louis and Kansas City both levy a 1.0% local Earnings Tax on residents and on net profits/wages earned inside city limits by non-residents.",
    llcAnnualFee: "$0 annual report fee in Missouri (Missouri LLCs pay no recurring Secretary of State annual filing fee)",
    sCorpTreatment: "Missouri honors federal S-Corp status (Form MO-1120S); Missouri also exempts corporate income tax for S-Corps and eliminates capital gains individual income tax starting 2025 under recent MO law!",
    pteTaxNotes: "Elective SALT Parity Act PTET (Form MO-PTE) applies Missouri's top individual bracket rate (4.7%–4.8%) with an owner tax credit",
    stateSpecificNuances: "Missouri's top individual rate stepped from 4.8% (2024) to 4.7% (2025) toward lower triggers while conforming to federal standard deductions; starting 2025, Missouri also enacted an exclusion for 100% of individual capital gains",
    estimatedTaxThreshold: "Required on Form MO-1040ES whenever expected Missouri income tax owed exceeds $100 (quarterly safe harbor prevents MO-2210 penalties)",
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
    localTaxNotes: "Montana has no local personal earned income taxes and zero general state sales tax.",
    llcAnnualFee: "$20 Annual Report due April 15 to Montana Secretary of State ($0 fee if filed online by deadline during prior waivers, standard statutory fee $20)",
    sCorpTreatment: "Montana honors federal S-Corp elections (Form PTE) with a $50 minimum corporate fee waived for small pass-throughs under Form PTE",
    pteTaxNotes: "Elective Montana Pass-Through Entity Tax (Form PTE) taxes pass-through profit at the top marginal rate (5.9% -> 5.65% 2026) with a refundable owner credit",
    stateSpecificNuances: "Senate Bill 121 (2024+) simplified Montana into two brackets (4.7% and 5.9% in 2024–2025, stepping top tier down to 5.65% starting 2026) tied directly to federal standard deductions; long-term capital gains enjoy lower preferential brackets (3.0%/4.1%)",
    estimatedTaxThreshold: "Required via Form ESW when expected Montana tax due after withholding and credits is $500 or more",
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
    llcAnnualFee: "$10 online ($26–$30 paper) Biennial Report due April 1 of odd-numbered years to Nebraska SOS",
    sCorpTreatment: "Nebraska recognizes federal S-Corp elections (Form 1120-SN) with zero corporate entity tax on ordinary pass-through earnings",
    pteTaxNotes: "Elective Nebraska PTET (LB 754; Form 1120-SN / Form 1065N + PTET-E) applies the top individual rate (5.84% stepping down toward 4.55% in 2026) with a refundable credit",
    stateSpecificNuances: "LB 754 aggressively reduces Nebraska's top individual rate on an annual glide path (5.84% in 2024 -> 5.20% in 2025 -> 4.55% in 2026 -> 3.99% in 2027); standard deductions index above $8,250/$16,500",
    estimatedTaxThreshold: "Required on Form 1040N-ES whenever expected Nebraska tax due minus withholding and credits reaches $500 or more",
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
    localTaxNotes: "Nevada imposes zero individual income tax or local wage tax, though cities (e.g., Las Vegas, Henderson, Reno) require local municipal business licenses.",
    llcAnnualFee: "$350/year combined via SilverFlume ($150 Annual List of Managers/Members + $200 State Business License renewal)",
    sCorpTreatment: "Nevada imposes 0% personal or corporate income tax on S-Corporations; watch the Modified Business Tax (MBT) 1.17% payroll levy only once quarterly W-2 wages exceed $50,000 ($200k/yr)",
    pteTaxNotes: "No PTET exists because Nevada levies 0% individual state income tax",
    stateSpecificNuances: "Nevada's Commerce Tax (0.051%–0.331% gross revenue) applies solely to businesses exceeding $4,000,000 in annual Nevada gross receipts; solo LLCs still owe $350/yr to SOS + city license",
    estimatedTaxThreshold: "Zero state personal income tax estimates; submit federal IRS Form 1040-ES quarterly payments and renew your $350 Nevada Annual List + Business License on anniversary month",
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
    localTaxNotes: "New Hampshire imposes 0% personal tax on earned 1099 freelance wages, and fully repealed its 3% Interest & Dividends tax effective January 1, 2025 (3% applied in 2024 only).",
    llcAnnualFee: "$100 Annual Report due April 1 to the New Hampshire Secretary of State",
    sCorpTreatment: "Beware NH Business Profits Tax (BPT: 7.5% on gross business income >$103,000 indexed and net profit after compensation deductions) and Business Enterprise Tax (BET: 0.55% if gross >$281,000)—applies to LLCs and S-Corps above statutory filing thresholds!",
    pteTaxNotes: "No individual PTET exists because NH levies 0% personal income tax, though entity-level BPT/BET taxes profitable businesses above statutory thresholds",
    stateSpecificNuances: "With the Interest & Dividends tax repealed starting January 1, 2025, NH has zero individual personal income tax, zero state sales tax, and relies on entity-level BPT/BET only when gross business income crosses ~$103,000+ ($281k BET)",
    estimatedTaxThreshold: "Zero personal state income tax vouchers; pay IRS Form 1040-ES quarterly, and check NH Form BT-Summary / BPT estimates only if gross business income exceeds statutory ~$103k thresholds",
    editorialGuide: {} as StateEditorialGuide,
  },

  // 31. New Jersey
  {
    slug: "new-jersey",
    code: "NJ",
    name: "New Jersey",
    taxType: "progressive",
    hasCustomGuide: true,
    standardDeduction: { single: 1000, married_joint: 2000, married_separate: 1000, head_of_household: 1000 },
    agencyName: "New Jersey Division of Taxation",
    agencyUrl: "https://www.nj.gov/treasury/taxation",
    estimatedTaxForm: "Form NJ-1040-ES",
    filingDeadline: "April 15, June 15, September 15, January 15",
    hasLocalTax: false,
    localTaxNotes: "New Jersey municipalities do not levy personal income taxes on 1099 residents; Newark imposes a 1% employer payroll tax on Newark employers only.",
    llcAnnualFee: "$75 Annual Report due at the end of the anniversary month to NJ Division of Revenue & Enterprise Services",
    sCorpTreatment: "Automatic S-Corp alignment since 2023 (P.L. 2022 c.133); NJ S-Corps pay tiered CBT Minimum Tax on Form CBT-100S ($500 under $100k receipts up to $2,000 at $1M+)",
    pteTaxNotes: "NJ Business Alternative Income Tax (NJ BAIT, Form PTE-100) taxes pass-through income at 5.675%–10.9% and returns a 100% refundable NJ-1040 credit to owners",
    stateSpecificNuances: "NJ disallows sole-proprietor SEP-IRA, SIMPLE, and HSA deductions on NJ-1040 Schedule NJ-BUS-1—use a Solo 401(k) elective deferral (N.J.S.A. 54A:6-21) for state deductions! Also disallows QBI and cross-basket loss netting",
    estimatedTaxThreshold: "Required on Form NJ-1040-ES whenever expected NJ balance due exceeds $400 (safe harbor: 80% current-year or 100% prior-year NJ tax)",
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
    localTaxNotes: "New Mexico levies a state and municipal Gross Receipts Tax (GRT, roughly 5.0% to 9.3%+) on virtually all 1099 freelance services sold in-state, though out-of-state client deliveries often qualify for NTTC export deductions.",
    llcAnnualFee: "$0 annual report fee ($0 biennial/annual SOS fee for New Mexico LLCs)",
    sCorpTreatment: "New Mexico honors federal S-Corp elections (Form S-Corp) with a $50 annual corporate franchise tax",
    pteTaxNotes: "Elective Entity-Level Tax (ELT, Form PTE) taxes pass-through profit at the top 5.9% rate so owners exclude distributed income on PIT-1",
    stateSpecificNuances: "New Mexico 2024 HB 252 lowered lower-bracket rates (1.5% lowest, adding 4.3% step starting 2025) alongside full federal standard deduction alignment ($14.6k/$15k/$16.1k); manage NM Gross Receipts Tax (GRT) carefully on client invoices",
    estimatedTaxThreshold: "Required on Form PIT-ES when expected New Mexico income tax due after credits exceeds $1,000",
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
    hasCustomGuide: true,
    standardDeduction: { single: 8000, married_joint: 16050, married_separate: 8000, head_of_household: 11200 },
    agencyName: "New York State Department of Taxation and Finance",
    agencyUrl: "https://www.tax.ny.gov",
    estimatedTaxForm: "Form IT-2105",
    filingDeadline: "April 15, June 15, September 15, January 15",
    hasLocalTax: true,
    localTaxNotes: "NYC levies 3.078%–3.876% city PIT plus 4.0% NYC Unincorporated Business Tax (Form NYC-202 if gross >$95k) and Zone 1 MCTMT (0.60%). Yonkers adds a 16.75% NYS tax surcharge.",
    llcAnnualFee: "$9 Biennial Statement every 2 years (plus 6-week dual newspaper publication upon LLC formation costing $150 upstate to $1,200+ in NYC and $50 Certificate)",
    sCorpTreatment: "Upstate NYS honors S-Corp status (Form CT-3-S), BUT New York City does NOT recognize S-Corp pass-through status and taxes S-Corps under NYC Business Corporation Tax (up to 8.85%)",
    pteTaxNotes: "Both NYS PTET (6.85%–10.9%) and NYC PTET (3.876%) allow eligible S-Corps and partnerships to deduct state/city taxes federally above OBBBA's $40.4k SALT cap / $505k phaseout",
    stateSpecificNuances: "NYS extended 9.65%–10.9% millionaire brackets through 2032; 2025–2026 NY budget lifts self-employed MCTMT threshold toward $150,000 for 2026; NYC Local Law 133 reduces UBT resident credit from 23% toward 15% above $1M–$1.25M",
    estimatedTaxThreshold: "Required on Form IT-2105 whenever combined NYS, NYC, Yonkers, and MCTMT tax due after withholding exceeds $300",
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
    llcAnnualFee: "$200 Annual Report ($203 electronic) due April 15 to the NC Secretary of State",
    sCorpTreatment: "North Carolina honors federal S-Corp status (Form CD-401S); corporate Franchise Tax still applies to S-Corps ($200 minimum based on $1.50 per $1,000 net worth above $200/million tiers)",
    pteTaxNotes: "Elective North Carolina Taxed Partnership / Taxed S-Corporation PTET (Form CD-401S / D-403) taxes entity income at individual flat rate with owner deduction",
    stateSpecificNuances: "Rate steps down cleanly across 2024–2026: 4.50% (2024 engine baseline) -> 4.25% (2025) -> 3.99% (2026)! Standard deductions remain fixed ($12,750 / $25,500) rather than tracking federal OBBBA limits",
    estimatedTaxThreshold: "Required on Form NC-40 whenever expected North Carolina income tax liability exceeds $1,000 after withholding and credits",
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
    llcAnnualFee: "$50 Annual Report due November 15 to North Dakota Secretary of State via FirstStop",
    sCorpTreatment: "North Dakota honors federal S-Corp status (Form 60) with zero corporate entity tax on resident pass-through earnings",
    pteTaxNotes: "No PTET enacted: North Dakota has not enacted an elective Pass-Through Entity Tax SALT cap workaround",
    stateSpecificNuances: "Exempts the first $44,725+ (single) / $74,750+ (MFJ) of taxable income at a 0.0% bracket after federal standard deductions ($14.6k/$15k/$16.1k) and QBI, making ND's effective rate near 0% for lower-to-mid-tier freelancers and capping at 2.50%",
    estimatedTaxThreshold: "Required on Form ND-1ES whenever expected North Dakota tax due after withholding and credits exceeds $1,000",
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
    localTaxNotes: "Over 600 Ohio municipalities levy city/village income taxes (typically 1.5%–2.5%, e.g., Columbus 2.5%, Cleveland 2.5%, Cincinnati 1.8%), administered separately through RITA, CCA, or municipal tax offices—note municipal taxes do NOT recognize Ohio's $250k QBI/Business Income Deduction!",
    llcAnnualFee: "$0 Annual Report fee (Ohio LLCs owe zero recurring Secretary of State annual renewal fees)",
    sCorpTreatment: "Ohio exempts S-Corps from corporate income tax; S-Corp profit enjoys Ohio's 0% Business Income Deduction (up to $250k!) at state level while reasonable W-2 wages and some local cities handle municipal income separately",
    pteTaxNotes: "Ohio Elective Pass-Through Entity Tax (Form IT 4738) taxes entity profit at 3.0% with a refundable IT-1040 credit for owners",
    stateSpecificNuances: "Massive 1099 break: Ohio's Business Income Deduction (BID) makes the first $250,000 ($125,000 MFS) of net business profit 100% state-tax-free (0%!) and caps business income above $250,000 at a flat 3.0% rate! Also Ohio CAT commercial activity tax exclusion expanded to $6,000,000 starting 2025–2026",
    estimatedTaxThreshold: "Required on Form IT 1040ES whenever combined unwithheld Ohio state tax exceeds $500 (also check RITA/CCA municipal quarterly thresholds around $200)",
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
    llcAnnualFee: "$25 Annual Certificate due on formation anniversary via Oklahoma Secretary of State",
    sCorpTreatment: "Oklahoma honors federal S-Corp status (Form 512-S); note Oklahoma repealed its corporate Business Activity Tax / franchise tax (eliminated for tax years 2024+ under HB 1039X!)",
    pteTaxNotes: "Elective Oklahoma PTET (Form 512-S / Form 514) taxes pass-through income at 4.75% with owner exclusion",
    stateSpecificNuances: "Compresses quickly into a 4.75% top rate starting at just $7,200 single ($12,200 MFJ) above $6,350/$12,700 fixed standard deductions; recent OK rate trim enacted toward 4.5% in 2026 under HB 2764",
    estimatedTaxThreshold: "Required on Form OW-8-ES whenever expected Oklahoma income tax liability after withholding exceeds $500",
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
    localTaxNotes: "Portland/Multnomah County & Metro stack up to 4.0% extra local taxes on high earners: Metro Supportive Housing Services (1.0% over $125k/$200k), Multnomah Preschool for All (1.5%–3.0%), City of Portland Business License Tax (2.6%), Multnomah County BIT (2.0%), plus TriMet (0.8137%+) / Lane Transit self-employment taxes.",
    llcAnnualFee: "$100 Annual Report due on formation anniversary to Oregon Secretary of State",
    sCorpTreatment: "Oregon S-Corporations owe a $150 minimum excise tax (Form OR-20-S); note Oregon Corporate Activity Tax (CAT: 0.57% over $1,000,000 receipts + $250) and Portland City/County Business Income Taxes!",
    pteTaxNotes: "Oregon Pass-Through Business Alternative Income Tax (BAIT, Form OR-21) applies 9.0%–9.9% with a 100% refundable credit on Form OR-40",
    stateSpecificNuances: "Uniquely allows deducting up to $7,800–$8,250 of federal income taxes paid on OR-40 (phased out at higher AGI) alongside 0% state sales tax and periodic Oregon 'kicker' surplus tax credits",
    estimatedTaxThreshold: "Required via Form OR-40-V whenever expected Oregon personal income tax due after withholding reaches $1,000 or more (note separate TriMet/Multnomah/Metro thresholds)",
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
    hasCustomGuide: true,
    flatRate: 0.0307,
    standardDeduction: { single: 0, married_joint: 0, married_separate: 0, head_of_household: 0 },
    agencyName: "Pennsylvania Department of Revenue",
    agencyUrl: "https://www.revenue.pa.gov",
    estimatedTaxForm: "Form PA-40ES",
    filingDeadline: "April 15, June 15, September 15, January 15",
    hasLocalTax: true,
    localTaxNotes: "Act 32 enforces municipal + school Earned Income Tax (1.0%–3.0% via Keystone/Berkheimer). Philadelphia assesses Net Profits Tax (3.74%/3.43% Jul 2025; 3.735%/3.425% Jul 2026) plus Philadelphia BIRT.",
    llcAnnualFee: "$7 Annual Report due September 30 for LLCs (Act 122 replaced the old 10-year decennial report starting 2025)",
    sCorpTreatment: "Pennsylvania honors federal S-Corp status (PA-20S/PA-65); outside Philadelphia, reasonable S-Corp K-1 distributions are generally exempt from Act 32 local Earned Income Tax",
    pteTaxNotes: "No PTET enacted: Pennsylvania has not enacted a Pass-Through Entity Tax SALT cap workaround in 2024–2026",
    stateSpecificNuances: "PA-40 Schedule C disallows 50% SE tax deduction, sole-proprietor SEP-IRA/Solo 401(k)/HSA/health insurance deductions, QBI, and cross-class loss offsets against W-2 income",
    estimatedTaxThreshold: "Required on Form PA-40ES when untaxed PA-taxable income exceeds $8,000 (~$246+ tax), plus local collector Act 32 quarterly filings",
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
    llcAnnualFee: "$50 Annual Report due Feb 1 – May 1 to Rhode Island Secretary of State, PLUS $400 annual minimum LLC tax via Form RI-1065!",
    sCorpTreatment: "Beware Rhode Island's $400 minimum corporate/entity tax! Every RI LLC, partnership, and S-Corp owes at least $400 annually on Form RI-1120S or RI-1065 regardless of profit",
    pteTaxNotes: "Elective Rhode Island PTET (Form RI-PTE) applies at 5.99% with an owner income tax credit on Form RI-1040",
    stateSpecificNuances: "Combined LLC cost runs $450/yr ($50 SOS report + $400 Division of Taxation minimum tax); standard deduction indexes slightly above $10,550–$10,900/$21,800+ and enforces an individual health coverage mandate",
    estimatedTaxThreshold: "Required on Form RI-1040ES whenever expected Rhode Island income tax owed exceeds $250",
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
    localTaxNotes: "South Carolina forbids local earned income taxes, though municipalities charge modest annual Municipal Business Licenses based on local gross receipts.",
    llcAnnualFee: "$0 Annual Report fee for disregarded or partnership-taxed LLCs (S-Corps owe $25+ annual corporate license fee)",
    sCorpTreatment: "South Carolina honors federal S-Corp elections (Form SC1120S); SC also offers a massive Active Trade or Business Income 3.0% flat rate cap on qualifying Schedule I-335 pass-through income!",
    pteTaxNotes: "Elective Active Trade or Business Income Tax / PTET (3.0% special rate on Schedule I-335 / Form SC1120S) reduces tax dramatically below the 6.2% top marginal rate while bypassing federal SALT limits",
    stateSpecificNuances: "Starts from Federal Taxable Income (passing through federal standard deduction, though SC limits or modifies certain QBI interactions—offset generously by SC's 3.0% optional active business income rate! Top bracket trimmed from 6.2% toward 6.0% in 2025)",
    estimatedTaxThreshold: "Required on Form SC1040ES whenever expected South Carolina tax due after withholding and credits is $100–$1,000 ($100 statutory voucher line / $1,000 standard relief check)",
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
    localTaxNotes: "South Dakota levies zero individual or corporate income taxes, though state sales tax (4.2% temporarily through 2027) applies broadly to many professional services.",
    llcAnnualFee: "$50 online ($55–$65 paper) Annual Report due before the end of anniversary month via SD Secretary of State",
    sCorpTreatment: "South Dakota levies 0% corporate and personal income tax, making S-Corp election strictly a federal 15.3% SECA tax planning tool",
    pteTaxNotes: "No PTET exists because South Dakota imposes 0% personal or corporate income tax",
    stateSpecificNuances: "Important trap for in-state SD consultants: unlike most states that tax only physical goods, South Dakota imposes its 4.2% state + 1%–2% municipal sales tax broadly across consulting, legal, accounting, and professional services!",
    estimatedTaxThreshold: "Zero state personal income tax vouchers; pay IRS Form 1040-ES quarterly and file SD sales tax returns if billing SD clients",
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
    localTaxNotes: "Tennessee levies zero personal income tax on earned wages, 1099 income, or investments (Hall Tax fully repealed 2021), though businesses above $100,000 receipts owe local Tennessee Business Tax.",
    llcAnnualFee: "$300 minimum Annual Report due on the first day of the 4th month after fiscal year-end (scaling $50/member above 6 members up to $3,000) via TN Secretary of State",
    sCorpTreatment: "MAJOR TN S-Corp & LLC trap: Tennessee does NOT conform to pass-through exemption for Franchise & Excise (F&E) Tax! Single-member LLCs and S-Corps must file Form FAE170—paying 6.5% Excise Tax on net profit OVER the $50,000 standard excise deduction (for tax years ending >= Dec 31, 2024) + $100 min Franchise Tax! Unincorporated sole proprietors (without an LLC!) are exempt from F&E!",
    pteTaxNotes: "No individual PTET exists (0% personal income tax), though Tennessee LLCs and S-Corps pay entity-level 6.5% Excise Tax over the $50,000 exemption",
    stateSpecificNuances: "Never casually form a Tennessee LLC before checking Franchise & Excise Tax: sole proprietors operating under their personal name pay $0 Excise Tax, whereas a Tennessee LLC/S-Corp earning over $50,000 pays 6.5% TN Excise Tax (less owner reasonable salary deduction if S-Corp!) plus $300/yr SOS fee; TN repealed the property measure from Franchise Tax in 2024",
    estimatedTaxThreshold: "Zero individual state income tax vouchers; however, LLCs/S-Corps expecting >$5,000 in TN Franchise & Excise Tax make FAE quarterly payments",
    editorialGuide: {} as StateEditorialGuide,
  },

  // 44. Texas
  {
    slug: "texas",
    code: "TX",
    name: "Texas",
    taxType: "none",
    hasCustomGuide: true,
    standardDeduction: { single: 0, married_joint: 0, married_separate: 0, head_of_household: 0 },
    agencyName: "Texas Comptroller of Public Accounts",
    agencyUrl: "https://comptroller.texas.gov",
    estimatedTaxForm: "N/A (No State Income Tax)",
    filingDeadline: "N/A",
    hasLocalTax: false,
    localTaxNotes: "Article VIII, Section 24-a of the Texas Constitution bans personal income taxes; freelancers face high local property taxes (1.6%–2.3%) and April 1 county Business Personal Property Tax renditions.",
    llcAnnualFee: "$0 annual Comptroller Franchise fee below the $2.47M (2024–2025) / $2.65M (2026) no-tax-due threshold—MUST still file May 15 Public Information Report (PIR) or risk $50 penalty and charter forfeiture",
    sCorpTreatment: "Texas ignores S-Corp election at state level and imposes 0% personal income tax; electing S-Corp status is strictly a federal 15.3% SECA arbitrage strategy",
    pteTaxNotes: "No PTET exists because Texas Constitution prohibits state personal income tax",
    stateSpecificNuances: "SB 3 eliminated the No Tax Due Report (Form 05-163) below $2.47M/$2.65M, but May 15 PIR remains mandatory; watch Texas 6.25%–8.25% sales tax on data processing (80% base) and SaaS",
    estimatedTaxThreshold: "Zero state personal income tax vouchers; pay IRS Form 1040-ES quarterly, submit TX May 15 PIR, and check April 1 county property renditions",
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
    llcAnnualFee: "$18 online Annual Renewal due on anniversary month via Utah Division of Corporations",
    sCorpTreatment: "Utah recognizes federal S-Corp status (Form TC-20S) with zero corporate tax on ordinary resident pass-through earnings",
    pteTaxNotes: "Elective Utah SALT Parity Tax (Form TC-20S / TC-65 Schedule PTE) pays flat state rate at the entity level with a non-refundable/5-year carryforward owner credit",
    stateSpecificNuances: "Utah uses a non-refundable taxpayer tax credit equal to 6% of federal standard/itemized deductions and personal exemptions (modeled via equivalent deduction relief in our baseline), while stepping its flat tax down from 4.65% toward 4.55% (2024 retroactive/2025) and 4.50% (2025–2026)",
    estimatedTaxThreshold: "Note: Utah generally exempts individuals from quarterly estimated payment penalties on Form TC-40 / TC-546 unless tax exceeds withholding/safe-harbor thresholds—confirm Form TC-546 coupon rules for large balance shifts",
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
    localTaxNotes: "Vermont towns do not levy personal income taxes, though employers and S-Corps pay Vermont's 0.44% Child Care Contribution (CCC) payroll tax.",
    llcAnnualFee: "$35 Annual Report due within 3 months of fiscal year-end via Vermont Secretary of State",
    sCorpTreatment: "Vermont S-Corporations owe a $250 minimum corporate entity tax on Form BI-471 and are subject to the 0.44% Child Care Contribution payroll tax on W-2 officer salaries (plus 0.11% CCC tax on net self-employment income for 1099 sole props!)",
    pteTaxNotes: "No PTET enacted: Vermont does not offer an elective Pass-Through Entity Tax workaround",
    stateSpecificNuances: "Unique 0.11% Child Care Contribution (CCC) self-employment tax started July 1, 2024 on Schedule IN-111 for 1099 contractors (0.44% for W-2 payrolls); Vermont excludes Section 199A QBI because it starts from Federal AGI rather than Federal Taxable Income",
    estimatedTaxThreshold: "Required on Form IN-114 whenever expected Vermont tax due after withholding and credits exceeds $500",
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
    localTaxNotes: "Virginia cities and counties levy a gross-receipts BPOL (Business, Professional and Occupational License) tax—typically 0.16% to 0.58% on consulting gross receipts—plus Business Tangible Personal Property tax, though 0% local income tax.",
    llcAnnualFee: "$50 annual LLC Registration Fee due last day of formation anniversary month via VA SCC",
    sCorpTreatment: "Virginia honors federal S-Corp elections (Form 502) with zero state corporate net income tax on resident pass-through profit",
    pteTaxNotes: "Elective Virginia PTET (5.75% on Form 502PTET) passes a 100% refundable state credit to eligible individual owners",
    stateSpecificNuances: "Q1 estimated deadline runs May 1 (not April 15!) and annual VA-760 falls May 1; VA raised standard deduction to $8,500 single / $17,000 MFJ (moving toward $8,750/$17,500 under recent budget updates) and tops out at 5.75% starting at just $17,000 taxable income",
    estimatedTaxThreshold: "Required on Form 760ES whenever expected Virginia income tax liability after credits exceeds $150 (note Q1 falls on May 1)",
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
    hasCustomGuide: true,
    standardDeduction: { single: 0, married_joint: 0, married_separate: 0, head_of_household: 0 },
    agencyName: "Washington State Department of Revenue",
    agencyUrl: "https://dor.wa.gov",
    estimatedTaxForm: "N/A (No State Income Tax on 1099 Earnings)",
    filingDeadline: "N/A",
    hasLocalTax: true,
    localTaxNotes: "0% personal income tax on earned 1099 wages, BUT businesses pay State B&O tax on gross receipts (1.5% under $1M / 1.75% $1M–$4.99M / 2.1% $5M+ for services) plus 40+ city B&O taxes (Seattle ~0.427%).",
    llcAnnualFee: "$60 Annual Report to Washington Secretary of State (plus WA DOR Business License renewal)",
    sCorpTreatment: "No personal income tax, so S-Corp saves strictly federal 15.3% SECA—BUT paying W-2 officer salaries triggers uncapped 0.58% WA Cares Fund + WA PFML (whereas 1099 sole proprietors are exempt from WA Cares unless opting in)",
    pteTaxNotes: "No PTET exists because Washington imposes 0% personal income tax on earned business income",
    stateSpecificNuances: "Small Business B&O Credit shelters modest revenues (~$125k+), though Combined Excise Returns are mandatory; separate 7%/9.9% WA Capital Gains Tax applies above $278k (2025) / $290k (2026) deduction on non-real-estate capital gains",
    estimatedTaxThreshold: "Zero state individual income tax estimates; instead file monthly/quarterly/annual WA DOR Combined Excise Tax (B&O) returns and federal Form 1040-ES",
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
    localTaxNotes: "Charleston, Huntington, Wheeling, Fairmont, and Weirton collect a flat weekly City Service Fee ($2 to $5/week) from individuals physically working inside municipal borders; many WV cities also levy local municipal Business & Occupation (B&O) gross receipts taxes.",
    llcAnnualFee: "$25 Annual Report due July 1 to West Virginia Secretary of State",
    sCorpTreatment: "West Virginia recognizes federal S-Corp elections (Form PTE-100) with zero corporate net income tax on resident pass-through earnings",
    pteTaxNotes: "Elective West Virginia Pass-Through Entity Tax (Form PTE-100) taxes entity profit at the top marginal rate with a refundable personal owner credit",
    stateSpecificNuances: "West Virginia cut income tax brackets twice via HB 2526 and HB 2026: top rate stepped from 5.12% (2024 baseline) down by 4% in 2025 (~4.82% top) and further toward 4.72% in 2026; uses $2,000 per-person exemption rather than federal standard deduction",
    estimatedTaxThreshold: "Required on Form IT-140ES whenever expected West Virginia tax liability after withholding exceeds $600",
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
    llcAnnualFee: "$25 Annual Report due at the end of the anniversary calendar quarter via Wisconsin DFI",
    sCorpTreatment: "Wisconsin honors federal S-Corp status (Form 5S); note Wisconsin imposes an Economic Development Surcharge ($25 minimum up to $9,800) once gross receipts reach $4,000,000+",
    pteTaxNotes: "Elective Wisconsin Pass-Through Entity Tax (Form 5S / Form 3 at 7.9% corporate rate) excludes entity income from owners' Form 1—carefully compare 7.9% entity tax vs. OBBBA's $40k/$40.4k SALT cap if your marginal bracket is 5.3%",
    stateSpecificNuances: "Sliding-scale Wisconsin standard deduction phases out cleanly as Wisconsin AGI rises (reaching $0 above ~$127k single); also remember Wisconsin disallows federal QBI and adjusts depreciation under state-specific conformity",
    estimatedTaxThreshold: "Required on Form 1-ES whenever expected Wisconsin net income tax due after withholding and credits is $500 or more",
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
    localTaxNotes: "Wyoming levies zero individual or corporate income taxes.",
    llcAnnualFee: "$60 minimum Annual Report License Tax (or $0.0002 per dollar of Wyoming-located assets if higher) due first day of anniversary month to Wyoming SOS",
    sCorpTreatment: "Wyoming imposes 0% personal or corporate income tax, so S-Corp elections act solely to trim federal 15.3% SECA payroll taxes",
    pteTaxNotes: "No PTET exists because Wyoming levies 0% individual or corporate income tax",
    stateSpecificNuances: "Popular nationwide LLC domicile offering strong single-member charging-order liability protection, privacy (members not listed publicly on formation), and $60/yr minimum license tax—though non-resident freelancers operating physically elsewhere must still pay tax in their home state!",
    estimatedTaxThreshold: "Zero state personal income tax vouchers; pay IRS Form 1040-ES quarterly and submit your $60+ Wyoming Annual Report on anniversary month",
    editorialGuide: {} as StateEditorialGuide,
  },
];

// Initialize bespoke flagship guides (10 states) and enhanced localized editorial guides (41 states)
STATE_TAX_RECORDS.forEach((s) => {
  s.editorialGuide = FLAGSHIP_EDITORIAL_GUIDES[s.slug] ?? buildStateEditorialGuide(s);
});

export const STATE_DATA_BY_SLUG: Record<string, StateTaxData> = Object.fromEntries(
  STATE_TAX_RECORDS.map((s) => [s.slug, s])
);

export const STATE_DATA_BY_CODE: Record<string, StateTaxData> = Object.fromEntries(
  STATE_TAX_RECORDS.map((s) => [s.code, s])
);
