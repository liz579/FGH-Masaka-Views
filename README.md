# FGH Mortgage Pre-Screen

A self-contained mortgage pre-screening calculator for Masaka Views, built with
plain HTML, CSS, and JavaScript — no build step, so it can be dropped straight
into the website (copy the files, or embed `index.html` in an `<iframe>`).

## Files

- `index.html` — page structure / form
- `styles.css` — styling
- `config.js` — **all editable business data**: house typologies and prices,
  finishing package add-ons, the USD→RWF exchange rate, and each partner
  bank's loan term/coverage/interest rate
- `script.js` — calculation logic (reads `config.js`, wires up the form,
  recalculates live on every change)

## How it works

A visitor picks a house typology and finishing package to see the total price
in USD and an approximate RWF equivalent. They enter a deposit (RWF), monthly
household income (optionally including a spouse), expenses, and any other
loan repayments, then choose a partner bank and repayment term. The tool
instantly estimates the monthly mortgage repayment (standard amortization)
and flags whether the applicant is likely to qualify, using the rule that a
bank will not approve a repayment above 50% of available monthly income
(income minus expenses minus other loan repayments). It also warns if the
requested mortgage exceeds the selected bank's maximum loan coverage of the
house value.

All results are clearly labeled as non-binding estimates, since exchange
rates and bank terms can change and a bank's own assessment is final.

## Updating data

To change prices, the exchange rate, or bank terms, edit `config.js` only —
no other file needs to change.

