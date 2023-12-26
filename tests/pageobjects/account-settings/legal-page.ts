import { Browser, ElementHandle } from 'puppeteer';
import { CommonHelper } from '../../helpers/common.helper';
import { step } from '../../helpers/allure.helper';

const config = require('../../../config/config.data.json').env.PROFILESETTINGS;
const data = require('../../../test-data/page-data.json').AccountSettings;

export class LegalPage extends CommonHelper {
  @step('Wait for open Legal page')
    static async getInstance(browser: Browser): Promise<LegalPage> {
        return new LegalPage(await this.getPageFromClient(browser, config.URL));
    }

  private get gameStoreTermsAndConditions(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="terms-conditions-title-content"]');
  }

  private get copyrightAndTrademarks(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="copyright-title-content"]');
  }

  private get privacyPolicy(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="privacy-policy-title-content"]');
  }

  private get contentPolicy(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="content-policy-title-content"]');
  }

  private get gameStoreTermsOfUse(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="game-store-terms-title-content"]');
  }

  private get marketplaceTermsAndConditions(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="marketplace-terms-conditions-title-content"]');
  }

  @step('Get the "Game Store Terms and Conditions" info')
  async getGameStoreTermsAndConditions(): Promise<string | undefined> {
      return CommonHelper.getTextContent(await this.gameStoreTermsAndConditions);
  }

  @step('Get the "copyright and Trademarks" info')
  async getCopyrightAndTrademarks(): Promise<string | undefined> {
      return CommonHelper.getTextContent(await this.copyrightAndTrademarks);
  }

  @step('Get the "Privacy Policy" info')
  async getPrivacyPolicy(): Promise<string | undefined> {
      return CommonHelper.getTextContent(await this.privacyPolicy);
  }

  @step('Get the "Content Policy" info')
  async getContentPolicy(): Promise<string | undefined> {
      return CommonHelper.getTextContent(await this.contentPolicy);
  }

  @step('Get the "Game Store Terms of Use" info')
  async getGameStoreTermsOfUse(): Promise<string | undefined> {
      return CommonHelper.getTextContent(await this.gameStoreTermsOfUse);
  }

  @step('Get the "Marketplace Terms and Conditions" info')
  async getMarketplaceTermsAndConditions(): Promise<string | undefined> {
      return CommonHelper.getTextContent(await this.marketplaceTermsAndConditions);
  }

  @step('Check page data')
  async checkData(): Promise<void> {
      await this.page.waitForTimeout(5000); // wait for page load
      expect(await this.getGameStoreTermsAndConditions()).toContain(data.GameStoreTermsAndConditions);
      expect(await this.getCopyrightAndTrademarks()).toContain(data.copyrightAndTrademarks);
      expect(await this.getPrivacyPolicy()).toContain(data.privacyPolicy);
      expect(await this.getContentPolicy()).toContain(data.contentPolicy);
      expect(await this.getGameStoreTermsOfUse()).toContain(data.gameStoreTermsOfUse);
      expect(await this.getMarketplaceTermsAndConditions()).toContain(data.marketplaceTermsAndConditions);
  }
}
