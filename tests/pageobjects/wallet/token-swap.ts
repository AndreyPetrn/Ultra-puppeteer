import { Browser, ElementHandle } from 'puppeteer';
import { CommonHelper } from '../../helpers/common.helper';
import { step } from '../../helpers/allure.helper';
const config = require('../../../config/config.data.json').env.TOKENSWAP;
const data = require('../../../test-data/page-data.json').Wallet;

export class TokenSwapPage extends CommonHelper {
  @step('Wait for open Help Center page')
    static async getInstance(browser: Browser): Promise<TokenSwapPage> {
        return new TokenSwapPage(await this.getPageFromClient(browser, config.URL));
    }

  private get tokenSwapTitle(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="token-swap-title-content"]');
  }

  private get swapInfo(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="token-swap-info-content"]');
  }

  private get swapToUltraBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="token-swap-to-ultra-link"]');
  }

  private get swapToEthereum(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="token-swap-to-ethereum-link"]');
  }

  @step('Get the "Token Swap" title')
  async getTokenSwapHeader(): Promise<string | undefined> {
      return await CommonHelper.getTextContent(await this.tokenSwapTitle);
  }

  @step('Get the swap info')
  async getSwapInfo(): Promise<string | undefined> {
      return await CommonHelper.getTextContent(await this.swapInfo);
  }

  @step('Click on the "Swap to Ultra" button')
  async openSwatToUltra(): Promise<void> {
      await (await this.swapToUltraBtn)!.click();
  }

  @step('Click on the "Swap to Ethereum" button')
  async openSwapToEthereum(): Promise<void> {
      await (await this.swapToEthereum)!.click();
  }

  @step('Check Token Swap Header')
  async checkTokenSwapTitle(): Promise<void> {
      await this.tokenSwapTitle;
      await expect(await this.getTokenSwapHeader()).toContain(data.swapHeader);
  }

  @step('Check Token Swap to Ultra Info')
  async checkTokenSwapToUltraInfo(): Promise<void> {
      await expect(await this.getSwapInfo()).toContain(data.ultraInfo);
  }

  @step('Check Token Swap to Ethereum Info')
  async checkTokenSwapToEthereumInfo(): Promise<void> {
      await expect(await this.getSwapInfo()).toContain(data.ethereumInfo);
  }
}
