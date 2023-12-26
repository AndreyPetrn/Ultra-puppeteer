import { Browser, ElementHandle } from 'puppeteer';

import { CommonHelper } from '../../helpers/common.helper';
import { EmailHelper } from '../../helpers/api-helpers/email.helper';
import { step } from '../../helpers/allure.helper';

const config = require('../../../config/config.data.json').env;
const data = require('../../../test-data/page-data.json').Library;
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');

export class LibraryPage extends CommonHelper {
  @step('Wait for open Library page')
    static async getInstanceLibrary(browser: Browser): Promise<LibraryPage> {
        return new LibraryPage(await this.getPageFromClient(browser, config.LIBRARY.URL));
    }

  private get searchGame(): Promise<ElementHandle<SVGElement | HTMLElement> | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="navbar-search-input"]');
  }

  private get legal(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="legal-link"]');
  }

  private get openLibrary(): Promise<ElementHandle<SVGElement | HTMLElement>|null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="navbar-link-/your-library"]');
  }

  private get checkLibraryHeader(): Promise<ElementHandle<SVGElement | HTMLElement>|null> {
      return CommonHelper.waitForSelector(this.page, '.bd-highlight span');
  }

  private get libraryCount(): Promise<ElementHandle[]> {
      return CommonHelper.waitForSelectors$$(this.page, 'div.game-list-item');
  }

  private get purchasedGameNames(): Promise<ElementHandle[]> {
      return CommonHelper.waitForSelectors$$(this.page, this.libraryGameName);
  }

  private get ultraLibraryGamesList(): Promise<ElementHandle[]> {
      return CommonHelper.waitForSelectors$$(this.page, '.game-list-item ultra-library-games-list-item');
  }

  private get legacyGameTooltip(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, 'div.tooltip-inner');
  }

  private get latestPurchaseSection(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, 'ultra-library-games-header');
  }

  private get gameDetailsBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '.dropdown-menu.show button');
  }

  private get uninstallBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '.dropdown-menu.show .uninstall');
  }

  private get uninstallModalHeader(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '.modal-header h5');
  }

  private get uninstallModalBody(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '.modal-body > div');
  }

  private get confirmUninstallGameBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '.modal-footer .btn-danger');
  }

  private get installBtnInModal(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, 'ultra-default-modal .btn-primary');
  }

  private get downloadGamesPath(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, 'input[type="text"]');
  }

  private get goToStoreBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="navbar-link-/store"]');
  }

  protected get tokenizedGameIcon(): string {
      return '.library-list--is-tokenized .icon-holder i';
  }

  protected get libraryGameName(): string {
      return '[data-id="library-game-name"]';
  }

  protected get gameCompanyName(): string {
      return '[data-id="library-game-publisher"]';
  }

  protected get legacyGameIcon(): string {
      return '[class*="position-relative library-list--installable"] .icon-holder i';
  }

  protected get installGameBtn(): string {
      return '.button-styled--transparent[data-id="game-action-button"]';
  }

  protected get loadingGameBtn(): string {
      return '.disabled[data-id="game-action-button"]';
  }

  protected get playGameBtn(): string {
      return '.button-styled--fill[data-id="game-action-button"]';
  }

  protected get threeDotsBtn(): string {
      return 'ultra-library-games-list-item-dropdown i';
  }

  protected get gameImage(): string {
      return 'ultra-lazy-image img';
  }

  protected get blackAndWhiteGameImage(): string {
      return '[data-id="library-header-image"] .grayscale';
  }

  protected get colorGameImage(): string {
      return '[data-id="library-header-image"] [class="lazy-image__wrapper limit-blur"]';
  }

  protected get latestPurchaseGameName(): string {
      return '[data-id="library-header-game-title"]';
  }

  protected get latestPurchaseCompanyName(): string {
      return '[data-id="library-header-publisher-name"]';
  }

  protected get progressPercentage(): string {
      return '[data-id="library-games-download-progress-percentage"]';
  }

  protected get progressBar(): string {
      return '[data-id="library-games-progress-bar-wrapper"]';
  }

  protected get downloadProgress(): string {
      return '[data-id="library-games-download-progress-processes"]';
  }

  protected get nameDownloadedEntity(): string {
      return '[data-id="library-games-download-progress-title"]';
  }

  protected get downloadLabel(): string {
      return 'ultra-library-games-list-item-game-status span';
  }

  protected get downloadSpeed(): string {
      return '[data-id="library-games-download-progress-speed"]';
  }

  @step('Get the "Library" title')
  async getLibraryHeaderTxt(): Promise<string | undefined> {
      return await CommonHelper.getTextContent(await this.checkLibraryHeader);
  }

  @step('Get the "Purchased Game" info')
  async getLibraryPurchasedGameTxt(gameNumber: number): Promise<string | undefined> {
      return await CommonHelper.getTextContent((await this.purchasedGameNames)[gameNumber]);
  }

  @step('Wait for Store page displayed')
  async waitForDisplayed(): Promise<void> {
      await this.searchGame;
  }

  @step('Click store btn')
  async clickStoreBtn() {
      await CommonHelper.scrollAndClick(await this.goToStoreBtn);
  }

  @step('Click on the "Legal" link')
  async clickLegal(): Promise<void> {
      await this.waitForDisplayed();
      await CommonHelper.scrollAndClick(await this.legal);
  }

  @step('Open library page')
  async openLibraryPage(): Promise<void> {
      await CommonHelper.scrollAndClick(await this.openLibrary);
      await (await this.openLibrary)!.press('Enter');
  }

  @step('Get the library count info')
  async getLibraryCount(): Promise<number> {
      return (await this.libraryCount).length;
  }

  @step('Get library game names')
  async getLibraryGameNames(): Promise<Array<string | null | undefined>> {
      return Promise.all((await this.purchasedGameNames).map(
          gameName => gameName.evaluate(el => el.textContent?.trim())));
  }

  @step('check email after purchase game')
  async checkEmailAfterPurchaseGame(user:any) {
      const info = await EmailHelper.getEmailInfo(user);
      return {
          nickName: info.split('Hello,=C2=A0')[1].split('\r')[0],
          getGameName: info.split('top" bgcolor=3D"" role=3D"module-content">')[4].split('</td')[0],
          fullName: info.split('text-align: center">')[1].split('</div>')[0],
          getAddress: info.split('text-align: center">')[2].split('</div>')[0],
          getCity: info.split('text-align: center">')[3].split('</div>')[0],
          getZipCode: info.split('text-align: center">')[4].split('</div>')[0],
          getCountry: info.split('text-align: center">')[5].split('</div>')[0]
      };
  }

  @step('Get the purchased game data')
  async getPurchasedGameData(itemNumber: number): Promise<any> {
      const gameContainer = await (await this.ultraLibraryGamesList)[itemNumber];
      return {
          gameName: await gameContainer.$eval(this.libraryGameName, (el) => el.textContent),
          companyName: await gameContainer.$eval(this.gameCompanyName, (el) => el.textContent),
          gameImage: await (await gameContainer.$(this.gameImage))!.evaluate(el => el.getAttribute('src')),
          threeDots: await gameContainer.$(this.threeDotsBtn)
      };
  }

  @step('Check the purchased game type')
  async checkPurchasedGameType(icon: string, itemNumber: number): Promise<any> {
      const gameContainer = await (await this.ultraLibraryGamesList)[itemNumber];
      switch (icon) {
          case 'gamepad':
              await gameContainer.$(this.tokenizedGameIcon);
              break;
          case 'crossed circle':
              await (await gameContainer.$(this.legacyGameIcon))!.hover();
              await expect(
                  await CommonHelper.getTextContent(await this.legacyGameTooltip)).toBe(data.legacyGameTooltip
              );
              break;
          default:
              throw new Error(`Cannot find icon! - ${icon}`);
      }
  }

  @step('Get the "Latest purchase" game data')
  async getLatestPurchaseGameData(): Promise<any> {
      const latestPurchase = await this.latestPurchaseSection;
      return {
          gameName: await latestPurchase!.$eval(this.latestPurchaseGameName, (el) => el.textContent),
          companyName: await latestPurchase!.$eval(this.latestPurchaseCompanyName, (el) => el.textContent),
      };
  }

  @step('Open game details page')
  async openGameDetails(threeDots: any): Promise<void> {
      await CommonHelper.focusAndClick(await threeDots);
      await (await this.gameDetailsBtn)!.click();
  }

  @step('Click on the "Install" game button')
  async clickInstallBtn(container: any): Promise<void> {
      await CommonHelper.scrollAndClick(await container);
  }

  @step('Click on the "Install" game button in modal')
  async clickInstallBtnInModal(): Promise<void> {
      await (await this.installBtnInModal)!.click();
  }

  @step('Get the download games path value')
  async getDownloadGamesPath(): Promise<string> {
      await (await this.downloadGamesPath)!.click({ clickCount: 3 });
      return this.page.evaluate(() => { return window.getSelection()!.toString(); });
  }

  @step('Check game downloading')
  async checkGameDownloading(itemNumber: number): Promise<any> {
      const gameContainer = await (await this.ultraLibraryGamesList)[itemNumber];
      return {
          downloadSpeed: await gameContainer!.waitForSelector(this.downloadSpeed, { timeout: 50000, visible: true }),
          progressPercentage: await gameContainer.$eval(this.progressPercentage, (el) => el.textContent),
          downloadProgress: await gameContainer.$eval(this.downloadProgress, (el) => el.textContent),
          nameDownloadedEntity: await gameContainer.$eval(this.nameDownloadedEntity, (el) => el.textContent),
          downloadLabel: await gameContainer.$eval(this.downloadLabel, (el) => el.textContent),
          progressBar: await gameContainer.$(this.progressBar)
      };
  }

  @step('Wait for download the game')
  async waitForDownloadGame(itemNumber: number): Promise<void> {
      const gameContainer = await (await this.ultraLibraryGamesList)[itemNumber];
      while (await gameContainer.$(this.progressBar)) {
          await this.page.waitForTimeout(5000);
      }
      await gameContainer.$(this.playGameBtn);
  }

  @step('Check the game action button')
  async gameActionButton(section: string, state: string, itemNumber?: number): Promise<any> {
      let container;
      switch (section) {
          case 'latest purchase':
              container = await this.latestPurchaseSection;
              break;
          case 'game list':
              container = itemNumber !== undefined ? (await this.ultraLibraryGamesList)[itemNumber] : undefined;
              break;
          default:
              throw new Error(`Cannot find section! - ${section}`);
      }
      switch (state) {
          case 'install':
              return container!.waitForSelector(this.installGameBtn, { timeout: 50000, visible: true });
          case 'loading':
              await container!.$(this.loadingGameBtn);
              break;
          case 'play':
              return container!.waitForSelector(this.playGameBtn, { timeout: 50000, visible: true });
          default:
              throw new Error(`Cannot find state! - ${state}`);
      }
      return null;
  }

  @step('Click on the Uninstall game button')
  async clickUninstallGame(threeDots: any): Promise<void> {
      await CommonHelper.focusAndClick(await threeDots);
      await (await this.uninstallBtn)!.click();
  }

  @step('Confirm uninstall game')
  async confirmUninstallGame(gameName: string): Promise<void> {
      await expect(await CommonHelper.getTextContent(await this.uninstallModalHeader))
          .toContain(data.uninstallModalHeader + gameName);
      await expect(await CommonHelper.getTextContent(await this.uninstallModalBody))
          .toContain(data.uninstallModalBody + gameName);
      await expect(await CommonHelper.getTextContent(await this.uninstallModalBody))
          .toContain(data.uninstallModalBodyQuestion);
      await (await this.confirmUninstallGameBtn)!.click();
  }

  @step('Check the Latest Purchase game image')
  async checkLatestPurchaseGameImage(state: string) {
      let image;
      switch (state) {
          case 'color':
              image = this.colorGameImage;
              break;
          case 'black and white':
              image = this.blackAndWhiteGameImage;
              break;
          default:
              throw new Error(`Cannot find state! - ${state}`);
      }
      await CommonHelper.waitForSelector(this.page, image);
  }

  @step('Check the game file')
  async checkGameFile(folderPath: string): Promise<number> {
      return fs.readdirSync(folderPath).length;
  }

  @step('Clean the Ultra Games folder')
  async cleanUltraGameFolder(path: string): Promise<void> {
      try {
          const folderContents = await (fs.promises).readdir(path);
          if (folderContents.length !== 0) {
              for (const file of folderContents) {
                  const filePath = `${path}\\${file}`;
                  try {
                      await exec(`rmdir /s /q "${filePath}"`);
                  } catch (error) {
                      console.error(`Error when deleting files in a folder: ${filePath}`);
                  }
              }
          }
      } catch (error) {
          console.error('An error occurred:', error);
      }
  }
}
