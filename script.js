/* ============================================================
   MASAKA VIEWS MORTGAGE PRE-SCREEN — LOGIC
   ============================================================
   Reads data from MORTGAGE_CONFIG (config.js) and text from
   I18N (i18n.js), wires up the form, and recalculates the
   estimate live on every change, in the selected language.
   ============================================================ */

(function () {
  "use strict";

  const cfg = MORTGAGE_CONFIG;
  let currentLang = "en";

  // ---- Element references ----
  const el = {
    introScreen: document.getElementById("intro-screen"),
    mainApp: document.getElementById("main-app"),
    introLangEn: document.getElementById("intro-lang-en"),
    introLangRw: document.getElementById("intro-lang-rw"),
    introContinue: document.getElementById("intro-continue"),

    langEn: document.getElementById("lang-en"),
    langRw: document.getElementById("lang-rw"),

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
    detailRatio: document.getElementById("detail-ratio"),

    netlifyForm: document.getElementById("netlify-estimate-form")
  };

  // IDs of static text elements that map 1:1 to an I18N key.
  const STATIC_TEXT_MAP = {
    "intro-title": "introTitle",
    "intro-definition-heading": "introDefinitionHeading",
    "intro-paragraph-1": "introParagraph1",
    "intro-paragraph-2": "introParagraph2",
    "intro-paragraph-3": "introParagraph3",
    "intro-closing": "introClosing",
    "intro-continue": "continueButton",

    "main-title": "mainTitle",
    "main-subtitle": "mainSubtitle",
    "cta-sales-map": "ctaSalesMap",
    "cta-whatsapp-text": "ctaWhatsapp",
    "section-house-title": "sectionHouseTitle",
    "label-typology": "labelTypology",
    "label-finishing": "labelFinishing",
    "label-house-price-usd": "labelHousePriceUsd",
    "label-house-price-rwf": "labelHousePriceRwf",
    "section-deposit-title": "sectionDepositTitle",
    "label-deposit": "labelDeposit",
    "label-mortgage-amount": "labelMortgageAmount",
    "section-income-title": "sectionIncomeTitle",
    "label-income": "labelIncome",
    "label-include-spouse": "labelIncludeSpouse",
    "label-spouse-income": "labelSpouseIncome",
    "label-expenses": "labelExpenses",
    "label-other-loans-legend": "labelOtherLoansLegend",
    "label-other-loans-no": "labelOtherLoansNo",
    "label-other-loans-yes": "labelOtherLoansYes",
    "label-other-loans-repayment": "labelOtherLoansRepayment",
    "section-bank-title": "sectionBankTitle",
    "label-bank": "labelBank",
    "label-loan-years": "labelLoanYears",
    "results-title": "resultsTitle",
    "result-label": "resultLabel",
    "detail-label-house-total": "detailLabelHouseTotal",
    "detail-label-deposit": "detailLabelDeposit",
    "detail-label-mortgage": "detailLabelMortgage",
    "detail-label-bank": "detailLabelBank",
    "detail-label-rate": "detailLabelRate",
    "detail-label-years": "detailLabelYears",
    "detail-label-total-income": "detailLabelTotalIncome",
    "detail-label-outgoings": "detailLabelOutgoings",
    "detail-label-available-income": "detailLabelAvailableIncome",
    "detail-label-ratio": "detailLabelRatio",
    "disclaimer-text": "disclaimer"
  };

  // ---- Formatting helpers ----
  // Comma-separated, no decimals, for both displayed results and live input typing.
  const numberFormatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

  function formatNumber(amount) {
    return numberFormatter.format(Math.round(amount));
  }

  function formatRwf(amount) {
    return "RWF " + formatNumber(amount);
  }

  function formatUsd(amount) {
    return "USD " + formatNumber(amount);
  }

  function formatPercent(fraction) {
    return (fraction * 100).toFixed(1) + "%";
  }

  function formatMonthYear(isoDateString, lang) {
    const date = new Date(isoDateString + "T00:00:00Z");
    const monthName = I18N[lang].monthNames[date.getUTCMonth()];
    return monthName + " " + date.getUTCFullYear();
  }

  function t(key) {
    return I18N[currentLang][key];
  }

  // ---- Thousand-separator-aware number inputs ----
  // These inputs are type="text" so commas can be shown while typing.
  // The underlying numeric value is always whatever digits remain after
  // stripping non-digit characters.
  function parseFormattedNumber(value) {
    const digitsOnly = (value || "").replace(/[^\d]/g, "");
    if (digitsOnly === "") return 0;
    const parsed = parseInt(digitsOnly, 10);
    return isNaN(parsed) ? 0 : parsed;
  }

  function attachThousandsFormatting(inputEl) {
    inputEl.addEventListener("input", () => {
      const digitsOnly = inputEl.value.replace(/[^\d]/g, "");
      inputEl.value = digitsOnly === "" ? "" : formatNumber(parseInt(digitsOnly, 10));
      recalculate();
    });
  }

  [el.deposit, el.income, el.spouseIncome, el.expenses, el.otherLoansRepayment].forEach(attachThousandsFormatting);

  function readNumber(inputEl) {
    return parseFormattedNumber(inputEl.value);
  }

  // ---- Populate dropdowns ----
  function typologyLabel(typology) {
    return t("typologyNames")[typology.id] || typology.name;
  }

  function finishingLabel(finishing) {
    return t("finishingNames")[finishing.id] || finishing.name;
  }

  function populateSelect(selectEl, items, labelFn) {
    selectEl.innerHTML = "";
    items.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.id;
      option.textContent = labelFn(item);
      selectEl.appendChild(option);
    });
  }

  function refreshSelectLabels(selectEl, items, labelFn) {
    const previousValue = selectEl.value;
    Array.from(selectEl.options).forEach((option, index) => {
      option.textContent = labelFn(items[index]);
    });
    selectEl.value = previousValue;
  }

  populateSelect(el.typology, cfg.houseTypologies, typologyLabel);
  populateSelect(el.finishing, cfg.finishingPackages, finishingLabel);
  populateSelect(el.bank, cfg.banks, (b) => b.name); // bank names are proper nouns, same in both languages

  // ---- Core calculations ----

  // Snapshot of the most recently computed estimate, used for the silent
  // background submission to Netlify Forms (see trySendEstimate below).
  let lastComputed = null;
  let lastSentSignature = null;

  function getSelectedTypology() {
    return cfg.houseTypologies.find((item) => item.id === el.typology.value);
  }

  function getSelectedFinishing() {
    return cfg.finishingPackages.find((item) => item.id === el.finishing.value);
  }

  function getSelectedBank() {
    return cfg.banks.find((item) => item.id === el.bank.value);
  }

  function getHouseTotalUsd() {
    const typology = getSelectedTypology();
    const finishing = getSelectedFinishing();
    if (!typology || !finishing) return 0;
    const addOn = finishing.addOnKey ? typology[finishing.addOnKey] : 0;
    return typology.essentialPriceUSD + addOn;
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
    el.bankTermsNote.textContent = t("bankTermsNote")(bank);
  }

  function applyStaticTranslations() {
    Object.keys(STATIC_TEXT_MAP).forEach((id) => {
      const node = document.getElementById(id);
      if (node) node.textContent = t(STATIC_TEXT_MAP[id]);
    });
    document.title = t("mainTitle");
    el.exchangeRateNote.textContent = t("exchangeRateNote")(
      formatNumber(cfg.exchangeRate.usdToRwf),
      formatMonthYear(cfg.exchangeRate.asOf, currentLang)
    );
  }

  function recalculate() {
    const bank = getSelectedBank();
    if (!bank) return;

    const houseTotalUsd = getHouseTotalUsd();
    const houseTotalRwf = houseTotalUsd * cfg.exchangeRate.usdToRwf;

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
      el.coverageWarning.textContent = t("coverageWarning")(
        bank.name, bank.maxLoanCoveragePercent, formatRwf(maxLoanForBank), formatRwf(extraDepositNeeded)
      );
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
    el.detailYears.textContent = years + t("yearsSuffix");
    el.detailTotalIncome.textContent = formatRwf(totalIncome);
    el.detailOutgoings.textContent = formatRwf(outgoings);
    el.detailAvailableIncome.textContent = formatRwf(availableIncome);
    el.detailRatio.textContent = isFinite(ratio) ? formatPercent(ratio) : t("naText");

    const maxRatio = cfg.maxRepaymentToAvailableIncomeRatio;
    el.approvalBanner.classList.remove("approved", "rejected");

    let approvalStatus = "incomplete";
    if (totalIncome <= 0) {
      el.approvalText.textContent = t("approvalNeedIncome");
    } else if (ratio <= maxRatio) {
      el.approvalBanner.classList.add("approved");
      el.approvalText.textContent = t("approvedMessage")(formatPercent(ratio), formatPercent(maxRatio));
      approvalStatus = "approved";
    } else {
      el.approvalBanner.classList.add("rejected");
      el.approvalText.textContent = t("rejectedMessage")(formatPercent(ratio), formatPercent(maxRatio));
      approvalStatus = "rejected";
    }

    // Snapshot for the silent background submission (see trySendEstimate).
    lastComputed = {
      typology: el.typology.value,
      finishing: el.finishing.value,
      housePriceUsd: Math.round(houseTotalUsd),
      housePriceRwf: Math.round(houseTotalRwf),
      deposit: Math.round(deposit),
      mortgageAmount: Math.round(mortgageAmount),
      monthlyIncome: Math.round(income),
      spouseIncome: Math.round(spouseIncome),
      expenses: Math.round(expenses),
      otherLoansRepayment: Math.round(otherLoansRepayment),
      bank: bank.name,
      loanYears: years,
      estimatedMonthlyPayment: Math.round(monthlyPayment),
      repaymentToIncomeRatio: isFinite(ratio) ? (ratio * 100).toFixed(1) + "%" : "n/a",
      approvalStatus
    };
  }

  // ---- Language switching ----
  function setLanguage(lang) {
    currentLang = lang;
    el.langEn.classList.toggle("active", lang === "en");
    el.langRw.classList.toggle("active", lang === "rw");
    el.introLangEn.classList.toggle("active", lang === "en");
    el.introLangRw.classList.toggle("active", lang === "rw");
    refreshSelectLabels(el.typology, cfg.houseTypologies, typologyLabel);
    refreshSelectLabels(el.finishing, cfg.finishingPackages, finishingLabel);
    applyStaticTranslations();
    syncLoanYearsToBank();
    recalculate();
  }

  el.langEn.addEventListener("click", () => setLanguage("en"));
  el.langRw.addEventListener("click", () => setLanguage("rw"));
  el.introLangEn.addEventListener("click", () => setLanguage("en"));
  el.introLangRw.addEventListener("click", () => setLanguage("rw"));

  // ---- Intro / consent screen ----
  el.introContinue.addEventListener("click", () => {
    el.introScreen.classList.add("hidden");
    el.mainApp.classList.remove("hidden");
  });

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
  el.loanYears.addEventListener("input", recalculate);

  // Prevent the form's Enter-key default submit (no server to submit to).
  document.getElementById("calculator-form").addEventListener("submit", (e) => e.preventDefault());

  // ---- Anonymous background submission (Netlify Forms) ----
  // No visible submit button: once the visitor has entered meaningful
  // data (an income and a selected bank), their anonymised estimate is
  // logged silently when they leave or switch away from the tab. No
  // name, ID, or other identifying details are ever collected.
  function hasMeaningfulData() {
    return !!lastComputed && lastComputed.monthlyIncome > 0 && !!lastComputed.bank;
  }

  function buildEstimateFormBody() {
    const params = new URLSearchParams();
    params.append("form-name", "mortgage-estimates");
    params.append("language", currentLang);
    Object.keys(lastComputed).forEach((key) => {
      params.append(key, String(lastComputed[key]));
    });
    params.append("timestamp", new Date().toISOString());
    return params.toString();
  }

  function trySendEstimate() {
    if (!hasMeaningfulData()) return;

    // Dedupe on the computed values only (not the timestamp/language),
    // so repeated tab switches with unchanged inputs don't re-submit.
    const signature = currentLang + "|" + JSON.stringify(lastComputed);
    if (signature === lastSentSignature) return;
    lastSentSignature = signature;

    const body = buildEstimateFormBody();
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/x-www-form-urlencoded" });
      navigator.sendBeacon("/", blob);
    } else {
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
        keepalive: true
      }).catch(() => {});
    }
  }

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") trySendEstimate();
  });
  window.addEventListener("pagehide", trySendEstimate);

  // ---- Initial state ----
  applyStaticTranslations();
  syncLoanYearsToBank();
  recalculate();
})();
