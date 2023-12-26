import { ElementHandle, Page } from 'puppeteer';
import { step } from '../../../../helpers/allure.helper';
import { CommonHelper } from '../../../../helpers/common.helper';

const data = require('../../../../../test-data/page-data.json').GDC.YourGame;

export class YourGamesPage {
    private readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    private get userVerificationInfo(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="developer-status"]');
    }

    private get checkGameDevCenterHomeHeader(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="info-preview-title"]');
    }

    private get checkGameDevCenterHomeInfo(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="info-preview-description"]');
    }

    private get createNewGameBtn(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="create-new-game-btn"]');
    }

    private get gameNameInput(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="create-game-name"]');
    }

    private get createGameBtn(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="create-game-btn"]');
    }

    private get containOpenBtn(): Promise<ElementHandle[]> {
        return CommonHelper.waitForSelectors$$(this.page, '[data-id="game-row"]');
    }

    protected get openGameBtn(): string {
        return '[data-id="open-game-btn"]';
    }

    protected get gameTitle(): string {
        return '[data-id="game-title"]';
    }

  @step('Get the "Game Dev Center" header')
    async getGameDevCenterHeader(): Promise<string | undefined> {
        return CommonHelper.getTextContent(await this.checkGameDevCenterHomeHeader);
    }

  @step('Get the "User Verification" title')
  async getUserVerificationInfo(): Promise<string | undefined> {
      return CommonHelper.getTextContent(await this.userVerificationInfo);
  }

  @step('Get the "Game Dev Center home" info')
  async getGameDevCenterInfo(): Promise<string | undefined> {
      return CommonHelper.getTextContent(await this.checkGameDevCenterHomeInfo);
  }

  @step('Check the "Game Dev Center" is displayed')
  async checkGameDevCenter(): Promise<void> {
      await expect(await this.getUserVerificationInfo()).toContain(data.verificationInfo);
      await expect(await this.getGameDevCenterHeader()).toContain(data.header);
      await expect(await this.getGameDevCenterInfo()).toContain(data.info);
      await this.createNewGameBtn;
  }

  @step('Click the "Create New Game" button')
  async createNewGame(): Promise<void> {
      await (await this.createNewGameBtn)!.click();
  }

  @step('Click the "open game" button')
  async openGame(gameName: string): Promise<void> {
      for (const block of await this.containOpenBtn) {
          const gameTitle = await block.$(this.gameTitle);
          if (gameTitle) {
              const title = await CommonHelper.getTextContent(gameTitle);
              if (title!.includes(gameName)) {
                  await CommonHelper.scrollToElement(await block);
                  await CommonHelper.focusAndClick(await block);
                  const openGameBtn = await block.$(this.openGameBtn);
                  if (openGameBtn) {
                      await CommonHelper.scrollAndClick(await openGameBtn);
                  }
              }
          }
      }
  }

  @step('Fill the game name')
  async fillGameName(gameInfo: any): Promise<void> {
      await CommonHelper.setValue(await this.gameNameInput, gameInfo.gameName);
      await (await this.createGameBtn)!.click();
  }
}
