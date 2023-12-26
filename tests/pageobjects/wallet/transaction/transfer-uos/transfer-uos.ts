import { ElementHandle, Page } from 'puppeteer';
import { ITransferUos } from './transfer-uos.interface';
import { step } from '../../../../helpers/allure.helper';
import { MyWallet } from '../../my-wallet';
import { CommonHelper } from '../../../../helpers/common.helper';

export class TransferUos {
    private readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    private get advancedViewSwitch(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="advanced-view-switch"]');
    }

    private get confirmBtn(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, 'button[class*="btn btn-primary"]:not([disabled])');
    }

    protected get transactionDataCodeLines(): string {
        return 'ultra-transaction-data .CodeMirror-line';
    }

  @step('Click on the "Advanced View" button')
    async clickAdvancedView(): Promise<void> {
        await (await this.advancedViewSwitch)!.click();
    }

  @step('Get the "Transaction content" value')
  async getTransactionContent(): Promise<ITransferUos | null> {
      await CommonHelper.waitForSelector(this.page, this.transactionDataCodeLines);
      return this.page.evaluate((dataCodeLines) => {
          const transactionCodeLines = document.querySelectorAll(dataCodeLines);
          const transactionJSON = Array.from(transactionCodeLines)
              .map((ele) => ele.textContent)
              .join('');
          try {
              return JSON.parse(transactionJSON);
          } catch (err) {
              return null;
          }
      }, this.transactionDataCodeLines);
  }

  @step('Click on the "Confirm" button')
  async clickConfirm(): Promise<MyWallet> {
      await this.page.waitForTimeout(2000); // wait for load Confirm button
      await (await this.confirmBtn)!.click();
      return new MyWallet(this.page);
  }
}
