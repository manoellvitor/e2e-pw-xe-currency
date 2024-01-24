import { Locator, Page, expect } from "@playwright/test";

export class CurrencyPage {
  readonly page: Page;
  readonly fromInput: Locator;
  readonly toInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fromInput = page.locator(
      `xpath=//*[@id="midmarketFromCurrency"]/div[2]/div/input`
    );
    this.toInput = page.locator(
      `xpath=//*[@id="midmarketToCurrency"]/div[2]/div/input`
    );
  }

  // Actions
  async go() {
    await this.page.goto("/");
  }

  async acceptCookies() {
    const target = this.page.getByRole("button", { name: "Accept" });
    await target.click();
  }

  async fillAmount(amount: string) {
    const amountInput = this.page.locator("#amount");
    await amountInput.fill(amount);
  }

  async fillFromCurrency(from: string) {
    await this.fromInput.fill(from);
    await this.page.keyboard.press("Enter");
  }

  async fillToCurrency(to: string) {
    await this.toInput.fill(to);
    await this.page.keyboard.press("Enter");
  }

  async currencyConvert() {
    await this.page
      .getByRole("button", { name: "Convert", exact: true })
      .click();
  }

  // Validations
  async validateAmount(message?: string) {
    const errorMessage = this.page.getByText(message ?? "");
    await expect(errorMessage).toBeVisible();
  }

  async validateDisabledButton(buttonName: string) {
    const target = this.page.getByRole("button", {
      name: buttonName,
      exact: true,
    });
    await expect(target).toBeDisabled();
  }

  async validateConversionAmount(currencyToName: string) {
    const regex = /^([\d,]+\.?\d+)\s(.+)$/;
    const target = this.page.locator(`xpath=//p[text()=" ${currencyToName}"]`);
    // Added this one to be sure it will loads the page correctly with the conversion values!
    await expect(target).toBeVisible();
    const values = await this.page
      .locator(`xpath=//p[text()=" ${currencyToName}"]`)
      .allInnerTexts();

    await expect(String(values)).toMatch(regex);
  }
}
