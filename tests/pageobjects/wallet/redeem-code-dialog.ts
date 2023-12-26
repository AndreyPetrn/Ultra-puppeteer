import { Browser, ElementHandle } from 'puppeteer';
import { step } from '../../helpers/allure.helper';
import { CommonHelper } from '../../helpers/common.helper';
import { MyInventory } from './my-inventory';
import { WalletPage } from './wallet-page';
const config = require('../../../config/config.data.json').env.WALLET;

export class RedeemCodeDialog extends CommonHelper {
  @step('Wait for open Redeem Code dialog')
    static async getInstance(browser: Browser): Promise<RedeemCodeDialog> {
        return new RedeemCodeDialog(await this.getPageFromClient(browser, config.URL));
    }

  private get redeemCodeInput(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="redeem-code-field"]');
  }

  private get redeemCodeButton(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="submit-redeem-code-button"]');
  }

  private get seeInInventoryButton(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="goto-inventory-button"]');
  }

  private get statusHeader(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="status-header-content"]');
  }

  private get uniqName(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, 'form [data-id="uniq-factory-name-content"]');
  }

  private get closeRedeemCodeDialogButton(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="close-redeem-code-modal-button"]');
  }

  private get secondaryActionButton(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="secondary-action-button"]');
  }

    @step('Type redeem code')
  async typeCode(code: string): Promise<void> {
      return (await this.redeemCodeInput)!.type(code);
  }

    @step('Submit redeem code')
    async submitCode(): Promise<void> {
        return (await this.redeemCodeButton)!.click();
    }

    @step('Click on the "See In Inventory" button')
    async goToMyInventory(): Promise<MyInventory> {
        await (await this.seeInInventoryButton)!.click();
        return new MyInventory(this.page);
    }

    @step('Get status header text')
    async getStatusHeaderText(): Promise<string | undefined> {
        return CommonHelper.getTextContent(await this.statusHeader);
    }

    @step('Get status header text')
    async waitForStatusHeaderText(text: string): Promise<void> {
        await CommonHelper.waitForText(this.page, await this.statusHeader, text);
    }

    @step('Get Uniq name')
    async getUniqName(): Promise<string | undefined> {
        return CommonHelper.getTextContent(await this.uniqName);
    }

    @step('Click on close redeem code dialog')
    async clickCloseRedeemCodeDialog(): Promise<void> {
        await (await this.closeRedeemCodeDialogButton)!.click();
    }

    @step('Wait for the secondary action button')
    async waitSecondaryActionButton(): Promise<ElementHandle | null> {
        return this.secondaryActionButton;
    }

    @step('Click on secondary action button')
    async clickSecondaryActionButton(): Promise<void> {
        await (await this.secondaryActionButton)!.click();
    }

    @step('Submit redeem code')
    async typeAndSubmitCode(code: string): Promise<void> {
        await this.typeCode(code);
        await this.submitCode();
    }

    @step('Get last redeem code status header')
    async getLastStatusHeader(): Promise<string | undefined> {
        await this.waitSecondaryActionButton();
        await WalletPage.waitForTimeout(1000); // Fix the next line that is getting the loading message
        return this.getStatusHeaderText();
    }

    @step('Redeem code multiple times until the status is different than specific one')
    async redeemUntilStatusDifferentThan(errorHeader: string, code: string): Promise<string | undefined> {
        let completed = false;
        let statusHeaderText;
        while(completed === false) {
            // Wait for the error view
            statusHeaderText = await this.getLastStatusHeader();
            // Validate error message
            if (statusHeaderText === errorHeader) {
                // Go back and redeem the code again
                await this.clickSecondaryActionButton();
                await this.typeAndSubmitCode(code);
            } else {
                completed = true;
            }
        }
        return statusHeaderText;
    }
}
