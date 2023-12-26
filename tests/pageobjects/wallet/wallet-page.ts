import { MyWallet } from './my-wallet';
import { CommonHelper } from '../../helpers/common.helper';
import { step } from '../../helpers/allure.helper';
import { Browser, ElementHandle } from 'puppeteer';
import { MyInventory } from './my-inventory';
import { RedeemCodeDialog } from './redeem-code-dialog';
import { TokenSwapPage } from './token-swap';
const config = require('../../../config/config.data.json').env.WALLET;

export class WalletPage extends CommonHelper {
  @step('Wait for open Wallet page')
    static async getInstance(browser: Browser): Promise<WalletPage> {
        return new WalletPage(await this.getPageFromClient(browser, config.URL));
    }

  private get myWalletButton(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="my-wallet-link"]');
  }

  private get myInventoryButton(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="my-inventory-link"]');
  }

  private get tokenSwapButton(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="token-swap-link"]');
  }

  private get redeemCodeButton(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="redeem-code-button"]');
  }

  @step('Redirect to My Wallet')
  async goToMyWallet(): Promise<MyWallet> {
      await (await this.myWalletButton)!.click();
      return new MyWallet(this.page);
  }

  @step('Redirect to My Inventory')
  async goToMyInventory(): Promise<MyInventory> {
      await (await this.myInventoryButton)!.click();
      return new MyInventory(this.page);
  }

  @step('Redirect to Token Swap')
  async goToTokenSwapPage(): Promise<TokenSwapPage> {
      await (await this.tokenSwapButton)!.click();
      return new TokenSwapPage(this.page);
  }

  @step('Open redeem code dialog')
  async openRedeemCodeDialog(): Promise<RedeemCodeDialog> {
      await (await this.redeemCodeButton)!.click();
      return new RedeemCodeDialog(this.page);
  }
}
