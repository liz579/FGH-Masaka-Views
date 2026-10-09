/* ============================================================
   MASAKA VIEWS MORTGAGE PRE-SCREEN — TRANSLATIONS (EN / RW)
   ============================================================
   All user-facing text lives here. Edit the "rw" values to
   refine the Kinyarwanda wording without touching any logic.
   ============================================================ */

const I18N = {

  en: {
    monthNames: ["January","February","March","April","May","June","July","August","September","October","November","December"],

    introTitle: "Before You Begin",
    introDefinitionHeading: "Clear definition of a Mortgage / Home Loan",
    introParagraph1: "A home loan (mortgage) is a loan you take out from a bank to buy a house. The bank pays the purchase price to the seller (in this case, the developer), and you then repay that amount to the bank in monthly installments, plus interest charged by the bank for providing the loan.",
    introParagraph2: "This calculator will ask you some questions about your income and expenses. Your answers are stored anonymously so we can better understand buyer interest and improve this tool — we do not collect your name, ID number, or any other identifying details.",
    introParagraph3: "We are not a financial institution. This calculator is a simple, rough estimation tool only, and has no bearing whatsoever on any actual mortgage application with a bank. It is intended purely to give you a general idea of what to expect.",
    introClosing: "Please select your preferred language, and click Continue if you are happy to proceed.",
    continueButton: "Continue",

    mainTitle: "Masaka Views Mortgage Pre-Screen",
    mainSubtitle: "Get an instant, non-binding estimate of your monthly mortgage repayment and likelihood of bank approval.",

    ctaSalesMap: "Go to Masaka Views Live Sales Map",
    ctaWhatsapp: "Message us on WhatsApp",

    sectionHouseTitle: "1. House",
    labelTypology: "House typology",
    labelFinishing: "Finishing package",
    labelHousePriceUsd: "House price (USD)",
    labelHousePriceRwf: "Approximate house price (RWF)",

    sectionDepositTitle: "2. Deposit",
    labelDeposit: "How much will you pay as a deposit? (RWF)",
    labelMortgageAmount: "Mortgage amount needed (RWF)",

    sectionIncomeTitle: "3. Household income & expenses",
    labelIncome: "Your monthly income (RWF)",
    labelIncludeSpouse: "Include my spouse's income",
    labelSpouseIncome: "Spouse's monthly income (RWF)",
    labelExpenses: "Approximate monthly expenses (RWF)",
    labelOtherLoansLegend: "Do you have any other loans?",
    labelOtherLoansNo: "No",
    labelOtherLoansYes: "Yes",
    labelOtherLoansRepayment: "Total monthly repayment for other loans (RWF)",

    sectionBankTitle: "4. Bank & loan term",
    labelBank: "Which bank would you like to apply with?",
    labelLoanYears: "Repayment period (years)",

    resultsTitle: "Your estimate",
    resultLabel: "Estimated monthly repayment",
    approvalIdle: "Fill in the form to see your pre-screen result.",
    approvalNeedIncome: "Enter your monthly income to see whether you are likely to be approved.",

    detailLabelHouseTotal: "House total (incl. finishing)",
    detailLabelDeposit: "Deposit",
    detailLabelMortgage: "Mortgage amount",
    detailLabelBank: "Bank",
    detailLabelRate: "Interest rate (annual)",
    detailLabelYears: "Repayment period",
    detailLabelTotalIncome: "Total combined monthly income",
    detailLabelOutgoings: "Monthly expenses + other loans",
    detailLabelAvailableIncome: "Available monthly income",
    detailLabelRatio: "Repayment / available income",

    disclaimer: "This tool provides a rough, non-binding estimate only, for initial pre-screening purposes. " +
      "Exchange rates fluctuate and the figures above are approximate. Actual mortgage approval, interest rate, " +
      "and terms remain at each bank's sole discretion following their own full assessment and documentation " +
      "process. You can change any selection above and the estimate will update automatically.",

    yearsSuffix: " years",
    naText: "n/a",

    typologyNames: {
      "2bed-townhouse": "2-Bedroom / 1.5 bath Townhouse",
      "3bed-townhouse": "3-Bedroom / 2.5 bath Townhouse",
      "3bed-single-family": "3-Bedroom / 3 bath Single-Family Home",
      "4bed-single-family": "4-Bedroom / 3 bath Single-Family Home"
    },
    finishingNames: {
      "essential": "None — I want the Essential house",
      "standard": "Standard",
      "luxe": "Luxe"
    },

    exchangeRateNote: function (rateFormatted, dateFormatted) {
      return "Converted at an approximate rate of 1 USD = " + rateFormatted +
        " RWF (as of " + dateFormatted + "). This rate fluctuates and is for estimation only.";
    },
    bankTermsNote: function (bank) {
      return "Max term " + bank.loanPeriodMaxYears + " years \u2022 Max loan coverage " +
        bank.maxLoanCoveragePercent + "% of house value \u2022 Interest rate " +
        bank.interestRatePercent + "% per year.";
    },
    coverageWarning: function (bankName, coveragePercent, maxLoanFormatted, extraFormatted) {
      return bankName + " covers at most " + coveragePercent + "% of the house value (" +
        maxLoanFormatted + "). Based on your deposit, you would need to increase your deposit by " +
        "about " + extraFormatted + ", or choose a different bank.";
    },
    approvedMessage: function (ratioFormatted, maxRatioFormatted) {
      return "Likely to qualify: the estimated repayment is " + ratioFormatted +
        " of your available monthly income (bank limit is " + maxRatioFormatted + ").";
    },
    rejectedMessage: function (ratioFormatted, maxRatioFormatted) {
      return "Unlikely to qualify as-is: the estimated repayment is " + ratioFormatted +
        " of your available monthly income, above the bank's " + maxRatioFormatted +
        " limit. Try a larger deposit, a longer term, a different bank, or a smaller house/finishing.";
    }
  },

  rw: {
    monthNames: ["Mutarama","Gashyantare","Werurwe","Mata","Gicurasi","Kamena","Nyakanga","Kanama","Nzeri","Ukwakira","Ugushyingo","Ukuboza"],

    introTitle: "Mbere yo Gutangira",
    introDefinitionHeading: "Ubusobanuro ku Nguzanyo y'Inzu (Mortgage)",
    introParagraph1: "Inguzanyo y'inzu (mortgage) ni inguzanyo ufata muri banki kugira ngo ugure inzu. Banki yishyura ugurisha inzu (Muri uru rwego uwayubatse), nawe ukajya wishyura banki buri kwezi, hakiyongeraho inyungu banki iba yarashyize kunguzanyo yatanzwe.",
    introParagraph2: "Iyi mubazi (calculator) ikubaza ibibazo bijyanye n'umushahara wawe n'amafaranga usohora. Ibisubizo byawe tubibika ku buryo budasobanura uwabitanze, kugira ngo dushobore kunoza iki gikoresho no kumenya neza ibyifuzo by'abaguzi — ntidusaba amazina yawe, indangamuntu, cyangwa andi makuru agaragaza uwo uri we.",
    introParagraph3: "Ntabwo turi urwego rw'imari (banki). Iyi mubazi n'uburyo bworoshye bwo gutanga ikigereranyo gusa, kandi nta ngaruka nimwe igira ku busabe nyabwo uzatanga muri banki. Intego yayo n'ugufasha kumenya gusa icyo wakwitega mugihe waba wifuza gusaba inguzanyo yo kugura inzu.",
    introClosing: "Hitamo ururimi wifuza, hanyuma ukande 'Komeza' niba wemeye ibisobanuro.",
    continueButton: "Komeza",

    mainTitle: "Isuzuma ry'Inguzanyo y'Inzu – Masaka Views",
    mainSubtitle: "Menya ako kanya igereranyo cy'amafaranga uzishyura buri kwezi ku nguzanyo y'inzu, n'amahirwe yo kwemererwa na banki (iki ni igereranyo gusa, si itangazo rifatika).",

    ctaSalesMap: "Reba Ikarita y'Amazu Agurishwa na Masaka Views",
    ctaWhatsapp: "Twandikire kuri WhatsApp",

    sectionHouseTitle: "1. Inzu",
    labelTypology: "Ubwoko bw'inzu",
    labelFinishing: "Uburyo bwo gusoza inzu",
    labelHousePriceUsd: "Igiciro cy'inzu (Amadolari y'Amerika)",
    labelHousePriceRwf: "Igiciro cy'inzu ugereranyije (Amafaranga y'u Rwanda)",

    sectionDepositTitle: "2. Ubwishyu bwa mbere",
    labelDeposit: "Uzishyura angahe bwa mbere? (RWF)",
    labelMortgageAmount: "Inguzanyo ukeneye (RWF)",

    sectionIncomeTitle: "3. Amafaranga umuryango w'injiza n'asohoka",
    labelIncome: "Umushahara wawe wa buri kwezi (RWF)",
    labelIncludeSpouse: "Shyiramo umushahara w'uwo mwashakanye",
    labelSpouseIncome: "Umushahara w'uwo mwashakanye (niba ari ngombwa)",
    labelExpenses: "Amafaranga asohoka buri kwezi (Ikigereranyo) (RWF)",
    labelOtherLoansLegend: "Waba ufite izindi nguzanyo?",
    labelOtherLoansNo: "Oya",
    labelOtherLoansYes: "Yego",
    labelOtherLoansRepayment: "Igiteranyo cy'amafaranga wishyura buri kwezi ku zindi nguzanyo (RWF)",

    sectionBankTitle: "4. Banki n'igihe cy'inguzanyo",
    labelBank: "Ni iyihe banki wifuza gusabamo inguzanyo?",
    labelLoanYears: "Igihe cyo kwishyura inguzanyo (imyaka)",

    resultsTitle: "Ikigereranyo cy'inguzanyo wemerewe",
    resultLabel: "Ugereranyije buri kwezi uzajya wishyura",
    approvalIdle: "Uzuza iyi fishi kugira ngo urebe igisubizo cy'isuzuma ryawe.",
    approvalNeedIncome: "Andika umushahara wawe wa buri kwezi kugira ngo urebe inguzanyo wemerewe.",

    detailLabelHouseTotal: "Igiciro cy'inzu irangiye",
    detailLabelDeposit: "Ayo uzishyura bwa mbere",
    detailLabelMortgage: "Amafaranga y'inguzanyo",
    detailLabelBank: "Banki",
    detailLabelRate: "Inyungu ku mwaka",
    detailLabelYears: "Igihe cyo kwishyura",
    detailLabelTotalIncome: "Igiteranyo cy'umushahara wa buri kwezi",
    detailLabelOutgoings: "Amafaranga asohoka + izindi nguzanyo (buri kwezi)",
    detailLabelAvailableIncome: "Amafaranga asigara buri kwezi",
    detailLabelRatio: "Ayo uzajya wishyura",

    disclaimer: "Iki gikoresho gitanga ikigereranyo gusa, ntago kigaragaza ukuri. Kigamije isuzuma rya mbere. " +
      "Ivunjisha rirahindagurika kandi imibare yerekanwe haruguru ni ikigereranyo.\n\n" +
      "Kwemererwa inguzanyo, inyungu, n'amabwiriza nyayo bigenwa na banki ubwayo nyuma yo gusuzuma dosiye yawe " +
      "yose. Ushobora guhindura amakuru watanze hejuru igihe icyo aricyo cyose, kandi ikigereranyo gihinduka ako kanya.",

    yearsSuffix: " imyaka",
    naText: "ntibiboneka",

    typologyNames: {
      "2bed-townhouse": "Inzu y'ibyumba 2 n'ubwiherero 1.5 (Townhouse)",
      "3bed-townhouse": "Inzu y'ibyumba 3 n'ubwiherero 2.5 (Townhouse)",
      "3bed-single-family": "Inzu y'ibyumba 3 n'ubwiherero 3 (Inzu iri ukwayo)",
      "4bed-single-family": "Inzu y'ibyumba 4 n'ubwiherero 3 (Inzu iri ukwayo)"
    },
    finishingNames: {
      "essential": "Nta na kimwe, nshaka inzu y'ibanze (Essential)",
      "standard": "Inzu isanzwe (Standard)",
      "luxe": "Inzu ihebuje (Luxe)"
    },

    exchangeRateNote: function (rateFormatted, dateFormatted) {
      var contractedDate = dateFormatted.replace(/^U/, "");
      contractedDate = contractedDate.charAt(0).toUpperCase() + contractedDate.slice(1);
      return "Iyi mibare ishingiye ku gipimo cy'ikigereranyo cya 1 USD \u2248 " + rateFormatted +
        " RWF, cyo mu " + contractedDate + ". Kubera ko igipimo cy'ivunjisha gishobora guhinduka, iki giciro ni ikigereranyo gusa.";
    },
    bankTermsNote: function (bank) {
      return "Igihe ntarengwa cyo kwishyura n'imyaka " + bank.loanPeriodMaxYears + " \u2022 Inguzanyo ntarengwa ni " +
        bank.maxLoanCoveragePercent + "% by'agaciro k'inzu \u2022 inyungu ya " +
        bank.interestRatePercent + "% ku mwaka.";
    },
    coverageWarning: function (bankName, coveragePercent, maxLoanFormatted, extraFormatted) {
      return bankName + " itanga nibura " + coveragePercent + "% by'agaciro k'inzu (" +
        maxLoanFormatted + "). Bitewe n'ubwishyu bwawe bwa mbere, wagombye kongera ubwishyu bwa mbere " +
        "ahwanye na " + extraFormatted + ", cyangwa ukahitamo indi banki.";
    },
    approvedMessage: function (ratioFormatted, maxRatioFormatted) {
      return "Birashoboka ko wemererwa: amafaranga ugereranyo uzishyura ni " + ratioFormatted +
        " by'amafaranga asigaye ufite buri kwezi (urugero rwa banki ni " + maxRatioFormatted + ").";
    },
    rejectedMessage: function (ratioFormatted, maxRatioFormatted) {
      return "Ntibisa n'uko wemererwa uko bimeze ubu: amafaranga ugereranyo uzishyura ni " + ratioFormatted +
        " by'amafaranga asigaye ufite buri kwezi, birenze urugero rwa banki rwa " + maxRatioFormatted +
        ". Gerageza gutanga ubwishyu bwa mbere bunini, igihe kirekire, indi banki, cyangwa inzu/uburyo " +
        "bwo kurangiza buhendutse.";
    }
  }
};
