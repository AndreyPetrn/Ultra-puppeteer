import { ElementHandle, Page } from 'puppeteer';
import { step } from '../../helpers/allure.helper';
import { CommonHelper } from '../../helpers/common.helper';

export class MyInventory {
    private readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    private get ultraInventoryTitle(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="inventory-title-content"]');
    }

    private get closePreviewBtn(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="id-card-close-button"]');
    }

    private get legalBtn(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="legal-link"]');
    }

    private get switchReverse(): Promise<ElementHandle[]> {
        return CommonHelper.waitForSelectors$$(this.page, '[data-id="switch-layout-button"]');
    }

    private get uniqOwner(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="product-owner-content"]');
    }

    private get uniqCardContainerList(): Promise<ElementHandle[]> {
        return CommonHelper.waitForSelectors$$(this.page, '[data-id="uniq-list-item-container"] > div');
    }

    private get uniqCardContainerGrid(): Promise<ElementHandle[]> {
        return CommonHelper.waitForSelectors$$(this.page, '[data-id="uniq-grid-card-container"] .ucard');
    }

    protected getRandomArbitrary(min: number, max: number) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    protected get buttonLoader(): string {
        return '[data-id="button-placeholder"]';
    }

    protected get ownedUniqButton(): string {
        return '[data-id="sell-button"]';
    }

    protected get onSaleUniqButton(): string {
        return '[data-id="withdraw-button"]';
    }

    protected get uniqCardNameList(): string {
        return '[data-id="uniq-factory-name-content"]';
    }

    protected get uniqCardNameGrid(): string {
        return '[data-id="card-title-content"]';
    }

  @step('Wait for My Inventory to be displayed')
    async waitForUltraInventory(): Promise<ElementHandle | null> {
        return this.ultraInventoryTitle;
    }

  @step('Get the "Inventory Title" value')
  async getTitleValue(): Promise<string | undefined> {
      return await CommonHelper.getTextContent(await this.ultraInventoryTitle);
  }

  @step('Get random values')
  async randomValues(min: number, max: number): Promise<number> {
      return this.getRandomArbitrary(min, max);
  }

  @step('Get nth uniq from random values')
  async getContainer(random: number, index: number): Promise<ElementHandle> {
      if (random === 0) {
          return (await this.uniqCardContainerList)[index];
      } else {
          return (await this.uniqCardContainerGrid)[index];
      }
  }

  @step('Get name for selected uniq')
  async getUniqName(random: number, uniq: ElementHandle): Promise<string | undefined> {
      let uniqName;
      if (random === 0) {
          uniqName = this.uniqCardNameList;
      } else {
          uniqName = this.uniqCardNameGrid;
      }
      return await uniq.$eval(uniqName, (el) => el.textContent?.trim());
  }

  @step('Get uniq owner')
  async getUniqOwner(uniq: ElementHandle): Promise<string | undefined> {
      await uniq.click({ button: 'left' });
      return await CommonHelper.getTextContent(await this.uniqOwner);
  }

  @step('Click on the "Close preview" button')
  async closePreview(): Promise<void> {
      await CommonHelper.hoverAndClick(await this.closePreviewBtn);
  }

  @step('Click on the "Legal link" button')
  async clickLegal(): Promise<void> {
      await CommonHelper.scrollAndClick(await this.legalBtn);
  }

  @step('Click on the "Switch Reverse" button')
  async clickSwitchReverseBtn(view: number): Promise<void> {
      await CommonHelper.focusAndClick((await this.switchReverse)[view]);
  }

  @step('Checking of owned uniq status')
  async checkOwnedUniqStatus(uniq: ElementHandle, status: string): Promise<string | undefined> {
      let button;
      switch (status) {
          case 'owned':
              button = this.ownedUniqButton;
              break;
          case 'sale':
              button = this.onSaleUniqButton;
              break;
          default:
              throw new Error('Wrong status. Use "owned", "sale" or "pending".');
      }
      await uniq.waitForSelector(this.buttonLoader, { timeout: 80000, hidden: true });
      return (await uniq.waitForSelector(button, { timeout: 80000 }))?.evaluate(el => el.textContent?.trim());
  }
}
