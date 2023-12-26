import { Browser, ElementHandle } from 'puppeteer';
import { CommonHelper } from '../../helpers/common.helper';
import { step } from '../../helpers/allure.helper';

const configData = require('../../../config/config.data.json');
const config = configData.env.MARKETPLACE;

export class InventoryPage extends CommonHelper {
  @step('Wait for open Inventory page')
    static async getInstance(browser: Browser): Promise<InventoryPage> {
        return new InventoryPage(await this.getPageFromClient(browser, `${config.URL }sell`));
    }

  private get purchaseUniqButton(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="navbar-link-/"]');
  }

  private get inventoryHeader(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="marketplace-sell-uniqs-title-container"]');
  }

  private get legalLink(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="legal-link"]');
  }

  private get walletBalanceInfo(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="wallet-balance-value"]');
  }

  private get switchReverseBtn(): Promise<ElementHandle[]> {
      return CommonHelper.waitForSelectors$$(this.page,'[data-id="switch-layout-button"]');
  }

  private get uniqCardListBtn(): Promise<ElementHandle[]> {
      return CommonHelper.waitForSelectors$$(this.page,'[data-id="expansion-panel-container"]');
  }

  private get uniqCardGridBtn(): Promise<ElementHandle[]> {
      return CommonHelper.waitForSelectors$$(this.page,'[data-id="card-container"]');
  }

  private get sellPriceForm(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="tab-marketplace-container"]');
  }

  private get resellPriceInput(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="min-resell-price-field"]');
  }

  private get setForSaleButton(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="set-for-sale-button"]');
  }

  private get contentFees(): Promise<ElementHandle[]> {
      return CommonHelper.waitForSelectors$$(this.page,'[data-id="fee-amount-content"]');
  }

  private get totalResellAmountInfo(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="card-sell-total-amount-content"]');
  }

  private get transferTabBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="card-transfer-tab-content"]');
  }

  private get transferNotificationError(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'.notification-error');
  }

  private get closePreviewBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="id-card-close-button"]');
  }

  private get withdrawFromMarketplaceButton(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="widthdraw-button"]');
  }

  private get recipientFieldInfo(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="card-recipient-field"]');
  }

  private get memoTextArea(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="ultra-textarea-field"]');
  }

  private get transferUniqBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="card-transfer-uniq-button"]');
  }

  private get purchasedUniqCardBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="uniq-list-item-container"] > div');
  }

  private get propertiesBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="token-preview-properties-tab"]');
  }

  private get transferabilityBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="token-transferability-tab"]');
  }

  private get infoIcon(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[class="d-inline-block bg-white-alpha-7 icon-info"]');
  }

  private get popUpInfo(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[class="d-inline-block bg-white-alpha-7 icon-info"][aria-describedby]');
  }

  getRandomArbitrary(min: number, max: number) {
      return Math.floor(Math.random() * (max - min) + min);
  }

  async randomValues(min: number, max: number): Promise<number> {
      return this.getRandomArbitrary(min, max);
  }

  protected get sellOrWithdrawBtn(): string {
      return '.align-items-center button';
  }

  protected get uniqCardNameList(): string {
      return 'div[class*= "factory-name"]';
  }

  protected get uniqCardNameGrid(): string {
      return '.ng-trigger .content-ellipsis.text-capitalize';
  }

  protected get ownedUniqButton(): string {
      return '[data-id="sell-button"]';
  }

  protected get onSaleUniqButton(): string {
      return '[data-id="withdraw-button"]';
  }

  protected get uniqName(): string {
      return '[data-id="uniq-factory-name-content"]';
  }

  protected get uniqType(): string {
      return '.align-items-center > div.text-capitalize';
  }

  protected get gamepadIcon(): string {
      return '.preview-type-marker .icon-gamepad-sm';
  }

  @step('Wait for Purchase Uniq Button to be displayed')
  async waitForPurchaseUniqButton(): Promise<ElementHandle | null> {
      return this.purchaseUniqButton;
  }

  @step('Wait for Uniqs inventory to be displayed')
  async waitForUniqsInventoryDisplayed(): Promise<ElementHandle | null> {
      return this.inventoryHeader;
  }

  @step('Wait for Legal link to be displayed')
  async waitForLegalDisplayed(): Promise<ElementHandle | null> {
      return this.legalLink;
  }

  @step('Wait wallet balance to be displayed')
  async waitForWalletDisplayed(): Promise<ElementHandle | null> {
      return this.walletBalanceInfo;
  }

  @step('Waiting for sell Uniq page elements to be displayed')
  async sellUniqPageToBeDisplayed(): Promise<void> {
      await this.waitForPurchaseUniqButton();
      await this.waitForUniqsInventoryDisplayed();
      await this.waitForLegalDisplayed();
      await this.waitForWalletDisplayed();
  }

  @step('Click on the "grid/list" btn')
  async informationDisplay(view: number): Promise<void> {
      await CommonHelper.focusAndClick((await this.switchReverseBtn)[view]);
      await this.page.waitForTimeout(3000); // wait for the info to load
  }

  @step('Get nth uniq from random values')
  async getContainer(random: number, index: number): Promise<ElementHandle> {
      if (random === 0) {
          return (await this.uniqCardListBtn)[index];
      } else {
          return (await this.uniqCardGridBtn)[index];
      }
  }

  @step('Get the game Uniq data')
  async getGameUniqData(uniq: ElementHandle): Promise<any> {
      return {
          uniqName: await uniq.$eval(this.uniqName, (el) => el.textContent),
          uniqType: await uniq.$eval(this.uniqType, (el) => el.textContent),
          gamepadIcon: await uniq.$(this.gamepadIcon)
      };
  }

  @step('Check owned Uniq status')
  async checkOwnedUniqStatus(uniq: ElementHandle, status: string): Promise<string | undefined> {
      let button;
      switch (status) {
          case 'owned':
              button = await uniq.waitForSelector(this.ownedUniqButton, { timeout: 80000 });
              break;
          case 'sale':
              button = await uniq.waitForSelector(this.onSaleUniqButton, { timeout: 80000 });
              break;
          default:
              throw new Error('Wrong status. Use "owned", "sale" or "pending".');
      }
      return await CommonHelper.getTextContent(button);
  }

  @step('Click on the "Sell/Withdraw" button for Uniq In the inventory')
  async clickUniqButton(uniq: ElementHandle): Promise<void> {
      await (await uniq.$(this.sellOrWithdrawBtn))?.click();
      await this.sellPriceForm;
  }

  @step('Set resell price for uniq')
  async setResellPrice(price: any): Promise<any> {
      await CommonHelper.setValue(await this.resellPriceInput, price.toString());
      const fees = await this.getFees();
      await (await this.setForSaleButton)!.click();
      return fees;
  }

  @step('Extracting the fees')
  async getFees(): Promise<any> {
      return {
          platformFee: await (await this.contentFees)[0].evaluate((el) => el.textContent),
          creatorsShare: await (await this.contentFees)[1].evaluate((el) => el.textContent),
          totalAmount: await (await this.totalResellAmountInfo)!.evaluate((el) => el.textContent),
      };
  }

  @step('Click on the "Transfer Tab" button on inventory and fill out form')
  async checkNotificationTransferError(): Promise<string | undefined> {
      await CommonHelper.hoverAndClick(await this.transferTabBtn);
      return CommonHelper.getTextContent(await this.transferNotificationError);
  }

  @step('Click on the "Sell/Withdraw" button for Uniq In the inventory')
  async openUniqPreview(uniq: ElementHandle, price: number): Promise<void> {
      await CommonHelper.setValue(await this.resellPriceInput, price.toString());
      await (await this.closePreviewBtn)!.click();
  }

  @step('Click on the "Close preview" button')
  async closePreview(): Promise<void> {
      await CommonHelper.hoverAndClick(await this.closePreviewBtn);
  }

  @step('Click on the "Withdraw from inventory" button')
  async withdrawFromInventory(uniq: ElementHandle): Promise<any> {
      await this.clickUniqButton(uniq);
      await CommonHelper.hoverAndClick(await this.withdrawFromMarketplaceButton);
  }

  @step('Click on the "Transfer Tab" button on inventory and fill out form')
  async clickTransferTabButton(uniq: any): Promise<void> {
      await CommonHelper.hoverAndClick(await this.transferTabBtn);
      await CommonHelper.slowType(await this.recipientFieldInfo, uniq.address, 10);
      await CommonHelper.slowType(await this.memoTextArea, uniq.memo, 10);
      await CommonHelper.scrollAndClick(await this.transferUniqBtn);
  }

  @step('Go To "Purchase Uniq" page')
  async goToPurchaseUniq(): Promise<void> {
      await CommonHelper.hoverAndClick(await this.purchaseUniqButton);
  }

  @step('Click on the "Withdraw from marketplace" button')
  async withdrawFromMarketplace(uniq: ElementHandle): Promise<any> {
      await this.clickUniqButton(uniq);
      const fees = await this.getFees();
      await (await this.withdrawFromMarketplaceButton)!.click();
      return fees;
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

  @step('Expand purchased Uniq card')
  async expandPurchasedUniqCard(): Promise<void> {
      await (await this.purchasedUniqCardBtn)!.click({ button: 'left' });
  }

  @step('Select the "Uniq properties" tab')
  async selectUniqPropertiesTab(): Promise<void> {
      await CommonHelper.focusAndClick(await this.propertiesBtn);
  }

  @step('Show the "Transferability" tab')
  async showTransferability(): Promise<void> {
      await CommonHelper.focusAndClick(await this.transferabilityBtn);
  }

  @step('Check the "Info" icon')
  async checkInfoIcon(): Promise<void> {
      await (await this.infoIcon)!.hover();
      await (await this.popUpInfo)!.focus();
  }

  @step('Check the "Transferability" data')
  async checkTransferabilityData(): Promise<void> {
      await this.selectUniqPropertiesTab();
      await this.showTransferability();
      await this.checkInfoIcon();
  }
}
