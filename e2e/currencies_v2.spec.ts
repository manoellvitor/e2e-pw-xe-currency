import { CurrencyPage } from "./support/pages/currencies";
import fs from "fs";
// import { parse } from "csv-parse/sync";
import path from "path";
import { test } from "@playwright/test";

let currencyPage: CurrencyPage;

test.beforeEach(({ page }) => {
  currencyPage = new CurrencyPage(page);
});

test.describe("Currencies Convertions", async () => {
  // for (const currency of conversions) {
  //   test(`a: ${currency.from}`, async () => {
  //     // Scenario: Verify Currency conversion
  //     // Given the user is on the currency converter page
  //     // When the user selects the source currency and the target currency
  //     // And the user performs the currency conversion
  //     // Then the result on the proceeding page should be accurate
  //     await currencyPage.go();
  //     await currencyPage.acceptCookies();
  //     await currencyPage.fillAmount(currency.amount);
  //     await currencyPage.fillFromCurrency(currency.from);
  //     await currencyPage.fillToCurrency(currency.to);
  //     await currencyPage.currencyConvert();
  //     await currencyPage.validateConversionAmount(currency.toName);
  //   });
  // }
});
