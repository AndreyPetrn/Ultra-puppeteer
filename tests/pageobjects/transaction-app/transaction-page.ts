import { Browser, ElementHandle } from 'puppeteer';
import { CommonHelper } from '../../helpers/common.helper';
import { step } from '../../helpers/allure.helper';

const config = require('../../../config/config.data.json').env;
const number = config.CARD.NUMBER;
const date = config.CARD.DATE;
const cardName = config.CARD.NAME;
const code = config.CARD.CODE;
const password = config.CARD.PASS;
export class TransactionPage extends CommonHelper {
  @step('Wait for open Transaction page')
    static async getInstance(browser: Browser): Promise<TransactionPage> {
        return new TransactionPage(await this.getPageFromClient(browser, config.TRANSACTION.URL));
    }

  private get transactionError(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, 'ultra-transaction-status[status="error"]');
  }

  private get shoppingCart(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="shopping-cart-stepper-container"]');
  }

  private get methodUOS(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="ultra-wallet-radio-label"]');
  }

  private get methodPSP(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="credit-card-radio-label"]');
  }

  private get continueBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="continue-button"]');
  }

  private get fillAddress(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="address-1-field"]');
  }

  private get fillZipCode(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="zip-code-field"]');
  }

  private get fillCity(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="city-field"]');
  }

  private get agreeCheckbox(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="agree-terms-checkbox"] label');
  }

  private get confirmBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="confirm-button"]');
  }

  private get cardNumberIframe(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-cse="encryptedCardNumber"] iframe');
  }

  private get expirationDateIframe(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-cse="encryptedExpiryDate"] iframe');
  }

  private get nameOfCard(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="name-on-card-field"]');
  }

  private get cvvIframe(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-cse="encryptedSecurityCode"] iframe');
  }

  private get passwordIframe(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, 'iframe[name="threeDSIframe"]');
  }

  private get totalCheckoutPriceFiat(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="total-fiat-content"]');
  }

  private get totalSentUOSAmount(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="transfer-quantity-uos-content"]');
  }

  private get itemName(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="item-name"]');
  }

  private get transactionSuccess(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="shopping-cart-stepper-container"] .success');
  }

  private get closeTransactionButton(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="close-button"]');
  }

  private get ultraLoading(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="credit-card-form-placeholder"]');
  }

  private get ultraLoadingHidden(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="credit-card-form-placeholder"]');
  }

  private get goToLibraryBtn(): Promise<ElementHandle<SVGElement | HTMLElement> | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="go-to-library-button"]');
  }

  private get goToInventoryBtn(): Promise<ElementHandle<SVGElement | HTMLElement> | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="go-to-inventory-button"]');
  }

  private get uosBalance(): Promise<ElementHandle<SVGElement | HTMLElement> | null> {
      return CommonHelper.waitForSelector(this.page, 'ultra-wallet-balance .uos-balance');
  }

  private uosLoader(options: any): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[class="spinner"]', options);
  }

  protected get transactionStatusTitle(): string {
      return '[data-id="transaction-status-title-content"]';
  }

  protected get cardNumberInput(): string {
      return '[id="encryptedCardNumber"]';
  }

  protected get expirationDateInput(): string {
      return '[id="encryptedExpiryDate"]';
  }

  protected get securityCodeInput(): string {
      return '[id="encryptedSecurityCode"]';
  }

  protected get card3DSPassword(): string {
      return 'input[type=password]';
  }

  protected get continue3DSBtn(): string {
      return '[type="submit"]';
  }

  @step('Wait for transaction error view and get the title')
  async getTransactionErrorTitle() {
      await this.transactionError;
      return await this.page.$eval(this.transactionStatusTitle, (el) => el.textContent);
  }

  @step('Get item name from confirmation page')
  async getItemName(): Promise<string | number | null | undefined> {
      return await CommonHelper.getTextContent(await this.itemName);
  }

  @step('Getting total checkout Fiat price')
  async getTotalFiatPrice(): Promise<string | undefined > {
      return await CommonHelper.getTextContent(await this.totalCheckoutPriceFiat);
  }

  @step('Getting total UOS amount to be sent')
  async getTotalUOSAmount(): Promise<string | undefined> {
      return await CommonHelper.getTextContent(await this.totalSentUOSAmount);
  }

  @step('Get transaction error')
  async getTransactionError(): Promise<string | number | null | undefined> {
      return await CommonHelper.getTextContent(await this.transactionError);
  }

  @step('Wait for Transaction App to be displayed')
  async waitForDisplayed(): Promise<ElementHandle | null> {
      return this.shoppingCart;
  }

  @step('Fill field in frame')
  async fillFieldInFrame(element: ElementHandle | null | undefined, value: string): Promise<void> {
      await element!.click();
      await element!.type(value);
      await browser.defaultBrowserContext();
  }

  @step('Fill card number')
  async fillCardNumber(): Promise<void> {
      const frame = await (await this.cardNumberIframe)!.contentFrame();
      const cardNumberInput = await frame?.waitForSelector(this.cardNumberInput, { timeout: 50000, visible: true });
      await this.fillFieldInFrame(await cardNumberInput, number);
  }

  @step('Fill expiration card date')
  async fillExpirationDate(): Promise<void> {
      const frame = await (await this.expirationDateIframe)!.contentFrame();
      const expirationDateInput = await frame?.waitForSelector(
          this.expirationDateInput, { timeout: 50000, visible: true }
      );
      await this.fillFieldInFrame(await expirationDateInput, date);
  }

  @step('Fill CVV card code')
  async fillCvvCode(): Promise<void> {
      const frame = await (await this.cvvIframe)!.contentFrame();
      const securityCodeInput = await frame?.waitForSelector(this.securityCodeInput, { timeout: 50000, visible: true });
      await this.fillFieldInFrame(await securityCodeInput, code);
  }

  @step('Confirming transaction')
  async confirmTransaction(buying: boolean = true): Promise<void> {
      if (buying) {
          await (await this.agreeCheckbox)!.click();
      }
      await CommonHelper.hoverAndClick(await this.confirmBtn);
  }

  @step('Fill in card details')
  async fillInCardDetails(): Promise<void> {
      await this.ultraLoading;
      await this.ultraLoadingHidden;
      await this.fillCardNumber();
      await this.fillExpirationDate();
      await this.fillCvvCode();
      await CommonHelper.setValue(await this.nameOfCard, cardName);
      await CommonHelper.hoverAndPressEnter(await this.continueBtn);
  }

  @step('Choose payment method')
  async choosePayment(type: string): Promise<void> {
      let selectMethod;
      await this.uosBalance;
      await this.uosLoader({ hidden: true });
      switch (type) {
          case 'uos':
              selectMethod = await this.methodUOS;
              break;
          case 'psp':
              selectMethod = await this.methodPSP;
              break;
          default:
              throw new Error('Wrong payment specified. Use "uos" or "psp".');
      }
      await CommonHelper.hoverAndClick(selectMethod);
      await CommonHelper.hoverAndPressEnter(await this.continueBtn);
  }

  @step('Fill in billing address')
  async fillBillingAddress(billingAddress: any): Promise<void> {
      await CommonHelper.setValue(await this.fillAddress, billingAddress.address);
      await CommonHelper.setValue(await this.fillZipCode, billingAddress.zipCode);
      await CommonHelper.setValue(await this.fillCity, billingAddress.city);
      await CommonHelper.hoverAndPressEnter(await this.continueBtn);
  }

  @step('Wait for transaction success screen')
  async waitForTransactionSuccess(): Promise<void> {
      await this.transactionSuccess;
  }

  @step('Close transaction app after successful transaction')
  async closeTransactionApp(): Promise<void> {
      await this.page.waitForTimeout(3000); // wait for load page
      await (await this.closeTransactionButton)!.click();
  }

  @step('Check transaction between')
  async checkTransactionBetween(): Promise<void> {
      await (await this.agreeCheckbox)!.click();
      await CommonHelper.hoverAndClick(await this.confirmBtn);
  }

  async scrollInFrame(frame: ElementHandle<HTMLElement> | null, elementSelector: string): Promise<void> {
      if (!frame || !(await frame.$(elementSelector))) {
          console.error('Frame or element inside the frame is null. Unable to scroll to element.');
          return;
      }
      await CommonHelper.scrollToElement(await frame.$(elementSelector));
  }

  @step('Fill 3d secure password')
  async fill3SecurePassword(): Promise<void> {
      await this.scrollInFrame(await this.passwordIframe, this.card3DSPassword);
      const frame = await (await this.passwordIframe)!.contentFrame();
      const card3DSPassword = await frame?.waitForSelector(this.card3DSPassword, { timeout: 50000, visible: true });
      await this.fillFieldInFrame(await card3DSPassword, password);
      await frame?.click(this.continue3DSBtn);
  }

  @step('Click on library button')
  async clickGoToLibraryButton(): Promise<void> {
      await this.page.waitForTimeout(2000); // for load page
      await (await this.goToLibraryBtn)!.click();
  }

  @step('Click on go to inventory button')
  async goToInventory(): Promise<void> {
      await (await this.goToInventoryBtn)!.click();
  }

  @step('Wait for transaction to complete')
  async waitForCompleteTransaction(): Promise<void> {
      await this.waitForDisplayed();
      await this.confirmTransaction(false);
      await this.waitForTransactionSuccess();
      await this.closeTransactionApp();
  }
}
