import { Browser, ElementHandle } from 'puppeteer';
import { CommonHelper } from '../../../../../helpers/common.helper';
import { step } from '../../../../../helpers/allure.helper';
import { FileManagement } from './file-management-settings';
import { StorePage } from './store-page-settings';
import { TokenFactories } from './token-factories-settings';
const config = require('../../../../../../config/config.data.json').env.CREATEGAME;

export class CreateGamePage extends CommonHelper {
  @step('Wait for open Store page')
    static async getInstance(browser: Browser): Promise<CreateGamePage> {
        return new CreateGamePage(await this.getPageFromClient(browser, config.URL));
    }

  get overviewPage(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="game-info-overview-title"]');
  }

  private get storePageMenuBtn(): Promise<ElementHandle<HTMLElement> | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="store-page-menu"]');
  }

  private get fileManagementBtn(): Promise<ElementHandle<HTMLElement> | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="file-management-submenu"]');
  }

  private get tokenFactoriesMenuBtn(): Promise<ElementHandle<HTMLElement> | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="store-token-factories-submenu"]');
  }

  private publishChanges(box: string): Promise<ElementHandle<HTMLElement> | null> {
      return CommonHelper.waitForSelector(this.page, `[id="publish-${box}"] + label`);
  }

  private get publishChangesBtn(): Promise<ElementHandle<HTMLElement> | null> {
      return CommonHelper.waitForSelector(this.page, `[data-id="game-info-overview-publish-change-btn"]`);
  }

  private get publishGameBtn(): Promise<ElementHandle<HTMLElement> | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="publish"]');
  }

  checkStatus(status: string): Promise<ElementHandle<HTMLElement> | null> {
      return CommonHelper.waitForSelector(this.page,`[data-id="game-publish-status"].${status}`);
  }

  private get gameTitle(): Promise<ElementHandle<HTMLElement> | null> {
      return CommonHelper.waitForSelector(this.page, `[data-id="game-info-sidenav-title"]`);
  }

  protected get gameTitleTooltip(): string {
      return '.tooltip-inner';
  }

  private get tokenFactoryGameInfoId(): Promise<ElementHandle[]> {
      return CommonHelper.waitForSelectors$$(this.page, 'ultra-game-info-sidenav-preview div.game__info div');
  }

  @step('Get the "Game" title')
  async getGameTitle(): Promise<string|null> {
      await (await this.gameTitle)!.hover();
      if (await this.page.$(this.gameTitleTooltip)) {
          return (await CommonHelper.waitForSelector(this.page, this.gameTitleTooltip))!.evaluate(el => el.textContent);
      } else {
          return (await this.gameTitle)!.evaluate(el => el.textContent);
      }
  }

  @step('Open the "Store page" menu')
  async storePageMenu(): Promise<StorePage> {
      await CommonHelper.scrollAndClick(await this.storePageMenuBtn);
      return new StorePage(this.page);
  }

  @step('Open the "File Management" menu')
  async fileManagementMenu(): Promise<FileManagement> {
      await CommonHelper.scrollAndClick(await this.fileManagementBtn);
      return new FileManagement(this.page);
  }

  @step('Open the "Token Factories" menu')
  async tokenFactoriesMenu(): Promise<TokenFactories> {
      await CommonHelper.scrollAndClick(await this.tokenFactoriesMenuBtn);
      return new TokenFactories(this.page);
  }

  @step('Publish changes')
  async publish(box: string): Promise<void> {
      await CommonHelper.hoverAndClick(await this.publishChangesBtn);
      await CommonHelper.hoverAndClick(await this.publishChanges(box));
      await CommonHelper.hoverAndClick(await this.publishGameBtn);
      await this.checkStatus('published');
  }

  @step('Reloading the page to update the data')
  async reloadPage(): Promise<void> {
      await CommonHelper.reloadPage(this.page);
  }

  @step('Get the game info id label')
  async getGameInfoId(): Promise<any> {
      const gameInfoLabel = await this.tokenFactoryGameInfoId;
      return await CommonHelper.getTextContent(await gameInfoLabel[0]);
  }
}
