import { Browser, ElementHandle } from 'puppeteer';
import { CommonHelper } from '../../helpers/common.helper';
import { step } from '../../helpers/allure.helper';

const config = require('../../../config/config.data.json').env;

export class UniversesNavPage extends CommonHelper {
  @step('Wait for open Universes Navigation page')
    static async getInstance(browser: Browser): Promise<UniversesNavPage> {
        return new UniversesNavPage(await this.getPageFromClient(browser, config.APP.NAV));
    }

  @step('Wait for open Store Marketplace page')
  static async getInstanceStore(browser: Browser): Promise<UniversesNavPage> {
      return new UniversesNavPage(await this.getPageFromClient(browser, config.STORE.URL));
  }

  private get appIcons(): Promise<ElementHandle[]> {
      return CommonHelper.waitForSelectors$$(this.page, '[data-id="item-app-link"]');
  }

  private get storeAppIcon(): Promise<ElementHandle> {
      return this.appIcons.then((icon) => icon[0]);
  }

  private get walletAppIcon(): Promise<ElementHandle> {
      return this.appIcons.then((icon) => icon[1]);
  }

  private get marketplaceAppIcon(): Promise<ElementHandle> {
      return this.appIcons.then((icon) => icon[2]);
  }

  private get dimensionIcons(): Promise<ElementHandle[]> {
      return CommonHelper.waitForSelectors$$(this.page, '[data-id="item-dimension-link"]');
  }

  private get marketPlaceDimensionIcon(): Promise<ElementHandle> {
      return this.dimensionIcons.then((icon) => icon[0]);
  }

  private get gameDevCenterDimensionIcon(): Promise<ElementHandle> {
      return this.dimensionIcons.then((icon) => icon[1]);
  }

  private get masterCenterDimensionIcon(): Promise<ElementHandle> {
      return this.dimensionIcons.then((icon) => icon[2]);
  }

  private get gameDevCenterIcon(): Promise<ElementHandle> {
      return this.appIcons.then((icon) => icon[0]);
  }

  private get ultraCloudIcon(): Promise<ElementHandle> {
      return this.appIcons.then((icon) => icon[1]);
  }

  private get helpCenterIcon(): Promise<ElementHandle> {
      return this.appIcons.then((icon) => icon[2]);
  }

  private get masterCenterIcon(): Promise<ElementHandle> {
      return this.appIcons.then((icon) => icon[0]);
  }

  @step('Open the "Store" app')
  async openStoreApp(): Promise<void> {
      await (await this.storeAppIcon).click();
  }

  @step('Open the "Wallet" app')
  async openWalletApp(): Promise<void> {
      await (await this.walletAppIcon).click();
  }

  @step('Open the "Marketplace" app')
  async openMarketplaceApp(): Promise<void> {
      await (await this.marketplaceAppIcon).click();
  }

  @step('Open the "Game Dev Center" App')
  async openGameDevCenterApp(): Promise<void> {
      await (await this.gameDevCenterIcon).click();
  }

  @step('Open the "Ultra Cloud" app')
  async openUltraCloudApp(): Promise<void> {
      await (await this.ultraCloudIcon).click();
  }

  @step('Open the "Help Center" app')
  async openHelpCenterApp(): Promise<void> {
      await (await this.helpCenterIcon).click();
  }

  @step('Open the "Market Place" app')
  async openMarketPlace(): Promise<void> {
      await (await this.marketPlaceDimensionIcon).click();
  }

  @step('Open the "Game Dev Center" dimension')
  async openGameDevCenter(): Promise<void> {
      await (await this.gameDevCenterDimensionIcon).click();
  }

  @step('Open the "Master Center" dimension')
  async openMasterCenter(): Promise<void> {
      await (await this.masterCenterDimensionIcon).click();
  }

  @step('Open the "Master Center" app')
  async openMasterCenterIcon(): Promise<void> {
      await (await this.masterCenterIcon).click();
  }

  @step('Open the "Uniq transaction" page/app')
  async openTransactionUniqPage(uniq: any): Promise<void> {
      const uniqIdUrl = uniq.url + uniq.uniqId;
      await this.page.evaluate((uniqIdUrl: string) => {
          window.location.href = uniqIdUrl;
      }, uniqIdUrl);
  }
}
