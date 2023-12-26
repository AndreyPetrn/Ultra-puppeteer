import { ElementHandle, Page } from 'puppeteer';
import { TransferUos } from './transaction/transfer-uos/transfer-uos';
import { step } from '../../helpers/allure.helper';
import { CommonHelper } from '../../helpers/common.helper';

const data = require('../../../test-data/page-data.json').Wallet;

export class MyWallet {
    private readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    private get getInputErrorMessage(): Promise<Array<ElementHandle>> {
        return this.page.$$('[data-id="field-error-content"]');
    }

    private get sendButton(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="send-uos-button"]');
    }

    private get clientWallet(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="wallet-id-content"]');
    }

    private get walletBalance(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="wallet-balance-content"]');
    }

    private get amountInput(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="send-uos-amount-field"]');
    }

    private get addressInput(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="send-uos-address-field"]');
    }

    private get memoInput(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="send-uos-memo-field"]');
    }

    private get notificationSuccess(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="send-uos-notification-container"].notification-success');
    }

    private get notificationCloseBtn(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="send-uos-notification-container"] [data-id="close-button"]');
    }

    private get sendButtonDisabled(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="send-uos-button"][disabled]');
    }

  @step('Check the "My Wallet" page')
    async checkMyWalletPage(): Promise<void> {
        await this.sendButton;
        await this.clientWallet;
        await this.walletBalance;
    }

  @step('Get the "Wallet Id" value')
  async getWalletId(): Promise<string | undefined> {
      return await CommonHelper.getTextContent(await this.clientWallet);
  }

  @step('Fill amount data')
  async fillAmount(amount: string): Promise<void> {
      await CommonHelper.slowType(await this.amountInput, amount, 100);
  }

  @step('Fill address data')
  async fillAddress(address: string): Promise<void> {
      await CommonHelper.slowType(await this.addressInput, address, 100);
  }

  @step('Fill memo info')
  async fillMemo(memo: string): Promise<void> {
      await (await this.memoInput)!.hover();
      await CommonHelper.setValue(await this.memoInput, memo);
  }

  @step('Click on the "Send" button')
  async clickSend(): Promise<TransferUos> {
      await CommonHelper.hoverAndClick(await this.sendButton);
      return new TransferUos(this.page);
  }

  @step('Get the "Wallet balance" value')
  async getWalletBalance(): Promise<any> {
      return await CommonHelper.getTextContent(await this.walletBalance);
  }

  @step('Wait for notification success to be displayed on the page')
  async waitForSuccessNotification(): Promise<boolean> {
      return await this.notificationSuccess !== null;
  }

  @step('Close transfer notification pop up')
  async clickNotificationCloseBtn(): Promise<void> {
      await CommonHelper.scrollAndClick(await this.notificationCloseBtn);
  }

  @step('Check if Send button is disabled')
  async checkUosBtn(): Promise<boolean> {
      return await this.sendButtonDisabled !== null;
  }

  @step('Check that input fields cannot be empty')
  async checkEmptyInputFields(): Promise<void> {
      await this.page.keyboard.press('Tab');
      const inputErrorFields = await this.getInputErrorMessage;
      await expect((await this.getInputErrorMessage).length).toBe(2);
      for (const inputErrorField of inputErrorFields) {
          const errorMessage = await inputErrorField.evaluate((el) => el.textContent);
          await expect(errorMessage).toBe(data.errorMessage);
      }
  }
}
