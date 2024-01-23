import { CurrencyModel } from "./fixtures/currency.model";
import { CurrencyPage } from "./support/pages/currencies";
import data from "./fixtures/currencies.json";
import { test } from "@playwright/test";

let currencyPage: CurrencyPage;

test.beforeEach(({ page }) => {
  currencyPage = new CurrencyPage(page);
});

test.describe("Currencies Convertions", async () => {
  test("Do not accept a conversion with zero amount", async () => {
    // Scenario: Do not accept a conversion with zero amount
    // Given the user is on the currency converter page
    // When the user enters the amount to convert as <= 0
    // Then an error message should be displayed indicating that zero amount is not allowed
    // And the convert button should be disabled
    const currency = data.negativeAmount as CurrencyModel;

    await currencyPage.go();
    await currencyPage.acceptCookies();
    await currencyPage.fillAmount(currency.amount);
    await currencyPage.validateAmount("Please enter an amount greater than 0");
    await currencyPage.validateDisabledButton("Convert");
  });

  test("Do not accept invalid amounts", async () => {
    // Scenario: Do not accept invalid amounts
    // Given the user is on the currency converter page
    // When the user enters the amount that is not a valid number i.e (-,.#[a-bA-B])
    // Then an error message should be displayed indicating that is not a valid amount
    // And the convert button should be disabled
    const currency = data.invalidAmount as CurrencyModel;

    await currencyPage.go();
    await currencyPage.acceptCookies();
    await currencyPage.fillAmount(currency.amount);
    await currencyPage.validateAmount("Please enter a valid amount");
    await currencyPage.validateDisabledButton("Convert");
  });
  test("Verify Euro to Pounds conversion", async () => {
    // Scenario: Verify Euro to Pounds conversion
    // Given the user is on the currency converter page
    // When the user selects Euro as the source currency and Pounds as the target currency
    // And the user performs the currency conversion
    // Then the result on the proceeding page should be accurate
    const currency = data.EURtoGBP as CurrencyModel;

    await currencyPage.go();
    await currencyPage.acceptCookies();
    await currencyPage.fillAmount(currency.amount);
    await currencyPage.fillFromCurrency(currency.from);
    await currencyPage.fillToCurrency(currency.to);
    await currencyPage.currencyConvert();
    await currencyPage.validateConversionAmount(currency.toName);
  });

  test("Verify USD to JPY conversion", async () => {
    // Scenario: Verify USD to JPY conversion
    // Given the user is on the currency converter page
    // When the user selects US Dollar as the source currency and Japanese Yen as the target currency
    // And the user performs the currency conversion
    // Then the result on the proceeding page should be accurate
    const currency = data.USDtoJPY as CurrencyModel;

    await currencyPage.go();
    await currencyPage.acceptCookies();
    await currencyPage.fillAmount(currency.amount);
    await currencyPage.fillFromCurrency(currency.from);
    await currencyPage.fillToCurrency(currency.to);
    await currencyPage.currencyConvert();
    await currencyPage.validateConversionAmount(currency.toName);
  });
});
