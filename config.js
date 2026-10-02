/*
 * ============================================================
 *  MASAKA VIEWS MORTGAGE PRE-SCREEN — DATA CONFIGURATION
 * ============================================================
 *  Edit the values below to update pricing, the exchange rate,
 *  or bank partnership terms. No other file needs to change.
 * ============================================================
 */

const MORTGAGE_CONFIG = {

  // Exchange rate used to convert the USD house total to RWF.
  // Update "usdToRwf" whenever the rate changes, and update
  // "asOf" so visitors can see how current the rate is.
  exchangeRate: {
    usdToRwf: 1474,
    asOf: "2025-01-01"
  },

  // House typologies available at Masaka Views.
  // "essentialPriceUSD" is the starting price for the bare "Essential" house.
  // "standardAddOnUSD" / "luxeAddOnUSD" are added on top if that finishing is chosen.
  houseTypologies: [
    {
      id: "2bed-townhouse",
      name: "2-Bedroom / 1.5 bath Townhouse",
      essentialPriceUSD: 70300,
      standardAddOnUSD: 8800,
      luxeAddOnUSD: 14400
    },
    {
      id: "3bed-townhouse",
      name: "3-Bedroom / 2.5 bath Townhouse",
      essentialPriceUSD: 84550,
      standardAddOnUSD: 11950,
      luxeAddOnUSD: 18850
    },
    {
      id: "3bed-single-family",
      name: "3-Bedroom / 3 bath Single-Family Home",
      essentialPriceUSD: 129600,
      standardAddOnUSD: 11200,
      luxeAddOnUSD: 22200
    },
    {
      id: "4bed-single-family",
      name: "4-Bedroom / 3 bath Single-Family Home",
      essentialPriceUSD: 145800,
      standardAddOnUSD: 15000,
      luxeAddOnUSD: 24700
    }
  ],

  // Finishing package options. "addOnKey" matches the add-on field names above
  // (null means no add-on — the Essential house).
  finishingPackages: [
    { id: "essential", name: "None — I want the Essential house", addOnKey: null },
    { id: "standard",  name: "Standard",                           addOnKey: "standardAddOnUSD" },
    { id: "luxe",      name: "Luxe",                                addOnKey: "luxeAddOnUSD" }
  ],

  // Partner banks and the mortgage terms each one offers.
  // - loanPeriodMaxYears: longest loan term the bank offers
  // - maxLoanCoveragePercent: max % of the house value the bank will lend
  //   (can exceed 100% where a bank finances certain fees/costs as well)
  // - interestRatePercent: annual interest rate (%)
  banks: [
    { id: "bk",      name: "Bank of Kigali", loanPeriodMaxYears: 20, maxLoanCoveragePercent: 100, interestRatePercent: 15 },
    { id: "bpr",     name: "BPR Bank",       loanPeriodMaxYears: 25, maxLoanCoveragePercent: 80,  interestRatePercent: 15 },
    { id: "ecobank", name: "Ecobank",        loanPeriodMaxYears: 20, maxLoanCoveragePercent: 90,  interestRatePercent: 13 },
    { id: "equity",  name: "Equity Bank",    loanPeriodMaxYears: 20, maxLoanCoveragePercent: 100, interestRatePercent: 16 },
    { id: "ncba",    name: "NCBA",           loanPeriodMaxYears: 20, maxLoanCoveragePercent: 105, interestRatePercent: 15 }
  ],

  // A bank will not approve the applicant if the estimated monthly home
  // loan repayment is more than this fraction of their available monthly
  // income (income minus expenses minus other loan repayments).
  maxRepaymentToAvailableIncomeRatio: 0.5
};
