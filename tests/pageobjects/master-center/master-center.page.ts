import { Browser, ElementHandle, HTTPResponse } from 'puppeteer';

import { CommonHelper } from '../../helpers/common.helper';
import { UltraGames } from './ultra-games-page';
import { UltraMarketplace } from './ultra-marketplace-page';
import { UltraOs } from './ultra-os-page';
import { step } from '../../helpers/allure.helper';

const config = require('../../../config/config.data.json').env.MASTERCENTER;

export class MasterCenterPage extends CommonHelper {
  @step('Wait for open Master Center page')
    static async getInstance(browser: Browser): Promise<MasterCenterPage> {
        return new MasterCenterPage(await this.getPageFromClient(browser, config.URL));
    }

  private get masterAppItems(): Promise<ElementHandle[]> {
      return CommonHelper.waitForSelectors$$(this.page, '[data-id="app-item-container"]');
  }

  private get ultraRow(): Promise<ElementHandle[]> {
      return CommonHelper.waitForSelectors$$(this.page, 'ultra-table ultra-row');
  }

  @step('Wait for navigation completed')
  waitForNavigation(): Promise<HTTPResponse | null> {
      return this.page.waitForNavigation({waitUntil: 'networkidle2'});
  }

  @step('Get the "Count of apps" number')
  async getAppItems(): Promise<number> {
      return (await this.masterAppItems).length;
  }

  @step('Click on the "Ultra OS" button')
  async openUltraOSLink(): Promise<void> {
      await CommonHelper.scrollAndClick((await this.masterAppItems)[0]);
      await this.ultraRow;
  }

  @step('Click on the "Ultra Games" button')
  async openUltraGamesLink(): Promise<UltraGames> {
      await CommonHelper.scrollAndClick((await this.masterAppItems)[3]);
      await this.ultraRow;
      return new UltraGames(this.page);
  }

  @step('Get the "Ultra OS" page')
  async getUltraOSPage(): Promise<UltraOs> {
      return new UltraOs(this.page);
  }

  @step('Click on the "Ultra Marketplace" button')
  async openUltraMarketPlaceLink(): Promise<UltraMarketplace> {
      await CommonHelper.scrollAndClick((await this.masterAppItems)[5]);
      await this.page.waitForTimeout(2000); // for load page
      return new UltraMarketplace(this.page);
  }

  @step('Get the "Array of text" value')
  async getAppItemsText(arrayText: number): Promise<string | undefined> {
      return CommonHelper.getTextContent((await this.masterAppItems)[arrayText]);
  }
}
