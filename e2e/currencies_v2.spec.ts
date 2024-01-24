import { CurrencyModel } from "./fixtures/currency.model";
import { CurrencyPage } from "./support/pages/currencies";
import { allure } from "allure-playwright";
import fs from "fs";
import { parse } from "csv-parse/sync";
import path from "path";
import { test } from "@playwright/test";

let currencyPage: CurrencyPage;

test.beforeEach(async ({ page }) => {
  currencyPage = new CurrencyPage(page);
  // Allure meta-data configurations
  await allure.epic("Web Application");
  await allure.feature("Essential features");
  await allure.story("Currency Convertion");
});

const conversions: CurrencyModel[] = parse(
  fs.readFileSync(path.join(`${__dirname}/fixtures/input.csv`)),
  {
    columns: true,
    skip_empty_lines: true,
  }
);

test.describe("Currencies Convertions", async () => {
  conversions.map((currency) => {
    // Scenario: Verify Currency conversion
    test(`Verify ${currency.from} to ${currency.to} conversion`, async () => {
      // Given the user is on the currency converter page
      await currencyPage.go();
      await currencyPage.acceptCookies();
      // When the user enters the amount to convert
      await currencyPage.fillAmount(currency.amount);
      if (Number(currency.amount) <= 0 || !Number(currency.amount)) {
        await currencyPage.validateAmount(currency.errorMessage);
        await currencyPage.validateDisabledButton("Convert");
        return;
      }
      // And the user selects the source currency and the target currency
      await currencyPage.fillFromCurrency(currency.from);
      await currencyPage.fillToCurrency(currency.to);
      // And the user performs the currency conversion
      await currencyPage.currencyConvert();
      // Then the result on the proceeding page should be accurate
      await currencyPage.validateConversionAmount(currency.toName);
    });
  });
});
