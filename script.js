/* ============================================================
   MASAKA VIEWS MORTGAGE PRE-SCREEN — LOGIC
   ============================================================
   Reads data from MORTGAGE_CONFIG (config.js), wires up the
   form, and recalculates the estimate live on every change.
   ============================================================ */

(function () {
  "use strict";

  const cfg = MORTGAGE_CONFIG;

  // ---- Element references ----
  const el = {
    typology: document.getElementById("typology"),
    finishing: document.getElementById("finishing"),
    housePriceUsd: document.getElementById("house-price-usd"),
    housePriceRwf: document.getElementById("house-price-rwf"),
    exchangeRateNote: document.getElementById("exchange-rate-note"),

    deposit: document.getElementById("deposit"),
    mortgageAmount: document.getElementById("mortgage-amount"),

    income: document.getElementById("income"),
    includeSpouse: document.getElementById("include-spouse"),
    spouseIncomeWrap: document.getElementById("spouse-income-wrap"),
    spouseIncome: document.getElementById("spouse-income"),
    expenses: document.getElementById("expenses"),
    otherLoansRadios: document.getElementsByName("has-other-loans"),
    otherLoansWrap: document.getElementById("other-loans-wrap"),
    otherLoansRepayment: document.getElementById("other-loans-repayment"),

    bank: document.getElementById("bank"),
    bankTermsNote: document.getElementById("bank-terms-note"),
    loanYears: document.getElementById("loan-years"),

    resultMonthlyPayment: document.getElementById("result-monthly-payment"),
    approvalBanner: document.getElementById("approval-banner"),
    approvalText: document.getElementById("approval-text"),
    coverageWarning: document.getElementById("coverage-warning"),

    detailHouseTotal: document.getElementById("detail-house-total"),
    detailDeposit: document.getElementById("detail-deposit"),
    detailMortgage: document.getElementById("detail-mortgage"),
    detailBank: document.getElementById("detail-bank"),
    detailRate: document.getElementById("detail-rate"),
    detailYears: document.getElementById("detail-years"),
    detailTotalIncome: document.getElementById("detail-total-income"),
    detailOutgoings: document.getElementById("detail-outgoings"),
    detailAvailableIncome: document.getElementById("detail-available-income"),
    detailRatio: document.getElementById("detail-ratio")
  };

  // ---- Formatting helpers ----
  const rwfFormatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
  const usdFormatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

  function formatRwf(amount) {
    return "RWF " + rwfFormatter.format(Math.round(amount));
  }

  function formatUsd(amount) {
    return "USD " + usdFormatter.format(Math.round(amount));
  }

  function formatPercent(fraction) {
    return (fraction * 100).toFixed(1) + "%";
  }

  // ---- Populate static dropdowns ----
  function populateSelect(selectEl, items, labelFn) {
    selectEl.innerHTML = "";
    items.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.id;
      option.textContent = labelFn(item);
      selectEl.appendChild(option);
    });
  }

  populateSelect(el.typology, cfg.houseTypologies, (t) => t.name);
  populateSelect(el.finishing, cfg.finishingPackages, (f) => f.name);
  populateSelect(el.bank, cfg.banks, (b) => b.name);

  el.exchangeRateNote.textContent =
    "Converted at an approximate rate of 1 USD = " +
    rwfFormatter.format(cfg.exchangeRate.usdToRwf) +
    " RWF (as of " + cfg.exchangeRate.asOf + "). This rate fluctuates and is for estimation only.";

  // ---- Core calculations ----

  function getSelectedTypology() {
    return cfg.houseTypologies.find((t) => t.id === el.typology.value);
  }

  function getSelectedFinishing() {
    return cfg.finishingPackages.find((f) => f.id === el.finishing.value);
  }

  function getSelectedBank() {
    return cfg.banks.find((b) => b.id === el.bank.value);
  }

  function getHouseTotalUsd() {
    const typology = getSelectedTypology();
    const finishing = getSelectedFinishing();
    if (!typology || !finishing) return 0;
    const addOn = finishing.addOnKey ? typology[finishing.addOnKey] : 0;
    return typology.essentialPriceUSD + addOn;
  }

  function getHouseTotalRwf() {
    return getHouseTotalUsd() * cfg.exchangeRate.usdToRwf;
  }

  // Standard reducing-balance amortization monthly payment.
  function calculateMonthlyPayment(principal, annualRatePercent, years) {
    if (principal <= 0 || years <= 0) return 0;
    const monthlyRate = annualRatePercent / 100 / 12;
    const numPayments = years * 12;
    if (monthlyRate === 0) return principal / numPayments;
    const factor = Math.pow(1 + monthlyRate, numPayments);
    return principal * (monthlyRate * factor) / (factor - 1);
  }

  function readNumber(inputEl) {
    const value = parseFloat(inputEl.value);
    return isNaN(value) || value < 0 ? 0 : value;
  }

  function getHasOtherLoans() {
    for (const radio of el.otherLoansRadios) {
      if (radio.checked) return radio.value === "yes";
    }
    return false;
  }

  // Keep the loan-term field capped to the selected bank's max, and
  // default it to that max whenever the bank changes.
  function syncLoanYearsToBank() {
    const bank = getSelectedBank();
    if (!bank) return;
    el.loanYears.max = bank.loanPeriodMaxYears;
    const current = parseInt(el.loanYears.value, 10);
    if (!current || current <= 0 || current > bank.loanPeriodMaxYears) {
      el.loanYears.value = bank.loanPeriodMaxYears;
    }
    el.bankTermsNote.textContent =
      "Max term " + bank.loanPeriodMaxYears + " years \u2022 Max loan coverage " +
      bank.maxLoanCoveragePercent + "% of house value \u2022 Interest rate " +
      bank.interestRatePercent + "% per year.";
  }

  function recalculate() {
    const bank = getSelectedBank();
    if (!bank) return;

    const houseTotalUsd = getHouseTotalUsd();
    const houseTotalRwf = getHouseTotalUsd() * cfg.exchangeRate.usdToRwf;

    el.housePriceUsd.textContent = formatUsd(houseTotalUsd);
    el.housePriceRwf.textContent = "\u2248 " + formatRwf(houseTotalRwf);

    const deposit = readNumber(el.deposit);
    const mortgageAmount = Math.max(houseTotalRwf - deposit, 0);
    el.mortgageAmount.textContent = formatRwf(mortgageAmount);

    let years = parseInt(el.loanYears.value, 10);
    if (!years || years <= 0) years = bank.loanPeriodMaxYears;
    if (years > bank.loanPeriodMaxYears) years = bank.loanPeriodMaxYears;

    const monthlyPayment = calculateMonthlyPayment(mortgageAmount, bank.interestRatePercent, years);

    // Coverage check: can this bank actually lend this much against the house?
    const maxLoanForBank = houseTotalRwf * (bank.maxLoanCoveragePercent / 100);
    if (mortgageAmount > maxLoanForBank) {
      const extraDepositNeeded = mortgageAmount - maxLoanForBank;
      el.coverageWarning.textContent =
        bank.name + " covers at most " + bank.maxLoanCoveragePercent + "% of the house value (" +
        formatRwf(maxLoanForBank) + "). Based on your deposit, you would need to increase your " +
        "deposit by about " + formatRwf(extraDepositNeeded) + ", or choose a different bank.";
      el.coverageWarning.classList.remove("hidden");
    } else {
      el.coverageWarning.classList.add("hidden");
    }

    // Income / affordability
    const income = readNumber(el.income);
    const spouseIncome = el.includeSpouse.checked ? readNumber(el.spouseIncome) : 0;
    const totalIncome = income + spouseIncome;

    const expenses = readNumber(el.expenses);
    const otherLoansRepayment = getHasOtherLoans() ? readNumber(el.otherLoansRepayment) : 0;
    const outgoings = expenses + otherLoansRepayment;

    const availableIncome = Math.max(totalIncome - outgoings, 0);
    const ratio = availableIncome > 0 ? monthlyPayment / availableIncome : (monthlyPayment > 0 ? Infinity : 0);

    // ---- Render results ----
    el.resultMonthlyPayment.textContent = formatRwf(monthlyPayment);

    el.detailHouseTotal.textContent = formatRwf(houseTotalRwf) + " (" + formatUsd(houseTotalUsd) + ")";
    el.detailDeposit.textContent = formatRwf(deposit);
    el.detailMortgage.textContent = formatRwf(mortgageAmount);
    el.detailBank.textContent = bank.name;
    el.detailRate.textContent = bank.interestRatePercent + "%";
    el.detailYears.textContent = years + " years";
    el.detailTotalIncome.textContent = formatRwf(totalIncome);
    el.detailOutgoings.textContent = formatRwf(outgoings);
    el.detailAvailableIncome.textContent = formatRwf(availableIncome);
    el.detailRatio.textContent = isFinite(ratio) ? formatPercent(ratio) : "n/a";

    const maxRatio = cfg.maxRepaymentToAvailableIncomeRatio;
    el.approvalBanner.classList.remove("approved", "rejected");

    if (totalIncome <= 0) {
      el.approvalText.textContent = "Enter your monthly income to see whether you are likely to be approved.";
    } else if (ratio <= maxRatio) {
      el.approvalBanner.classList.add("approved");
      el.approvalText.textContent =
        "Likely to qualify: the estimated repayment is " + formatPercent(ratio) +
        " of your available monthly income (bank limit is " + formatPercent(maxRatio) + ").";
    } else {
      el.approvalBanner.classList.add("rejected");
      el.approvalText.textContent =
        "Unlikely to qualify as-is: the estimated repayment is " + formatPercent(ratio) +
        " of your available monthly income, above the bank's " + formatPercent(maxRatio) +
        " limit. Try a larger deposit, a longer term, a different bank, or a smaller house/finishing.";
    }
  }

  // ---- Event wiring ----
  function onBankChange() {
    syncLoanYearsToBank();
    recalculate();
  }

  el.includeSpouse.addEventListener("change", () => {
    el.spouseIncomeWrap.classList.toggle("hidden", !el.includeSpouse.checked);
    recalculate();
  });

  for (const radio of el.otherLoansRadios) {
    radio.addEventListener("change", () => {
      const hasOtherLoans = getHasOtherLoans();
      el.otherLoansWrap.classList.toggle("hidden", !hasOtherLoans);
      recalculate();
    });
  }

  el.bank.addEventListener("change", onBankChange);
  el.typology.addEventListener("change", recalculate);
  el.finishing.addEventListener("change", recalculate);
  el.deposit.addEventListener("input", recalculate);
  el.income.addEventListener("input", recalculate);
  el.spouseIncome.addEventListener("input", recalculate);
  el.expenses.addEventListener("input", recalculate);
  el.otherLoansRepayment.addEventListener("input", recalculate);
  el.loanYears.addEventListener("input", recalculate);

  // Prevent the form's Enter-key default submit (no server to submit to).
  document.getElementById("calculator-form").addEventListener("submit", (e) => e.preventDefault());

  // ---- Initial state ----
  syncLoanYearsToBank();
  recalculate();
})();
