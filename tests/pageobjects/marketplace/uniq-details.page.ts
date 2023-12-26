import { Browser, ElementHandle } from 'puppeteer';
import { CommonHelper } from '../../helpers/common.helper';
import { step } from '../../helpers/allure.helper';

const configData = require('../../../config/config.data.json');
const config = configData.env.MARKETPLACE;

export class UniqDetailsPage extends CommonHelper {
  @step('Wait for open Uniq Details page')
    static async getInstance(browser: Browser): Promise<UniqDetailsPage> {
        return new UniqDetailsPage(await this.getPageFromClient(browser, `${config.URL }product`));
    }

  private get overviewBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="token-preview-overview-tab"]');
  }

  private get cardOverviewTitle(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="card-overview-title-content"]');
  }

  private get cardOverviewSubTitle(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="card-overview-subtitle-content"]');
  }

  private get cardOverviewDescription(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="card-overview-description-content"]');
  }

  private get cardOverviewItem(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="card-overview-image-content"]');
  }

  private get galleryBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="token-preview-preview-tab"]');
  }

  private get imageInGallery(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="media-carousel-image-container"]');
  }

  private get propertiesBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="token-preview-properties-tab"]');
  }

  private get availabilityBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="token-quantity-tab"]');
  }

  private get tradabilityBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="token-tradability-tab"]');
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

  private get sellUniqButton(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="navbar-link-/sell"]');
  }

  @step('Wait for image in gallery')
  async waitForImageInGallery(): Promise<void> {
      await this.imageInGallery;
  }

  @step('Get the "Card overview" title')
  async getCardOverviewTitle(): Promise<string | undefined> {
      return CommonHelper.getTextContent(await this.cardOverviewTitle);
  }

  @step('Get the "Card overview" subtitle')
  async getCardOverviewSubTitle(): Promise<string | undefined> {
      return CommonHelper.getTextContent(await this.cardOverviewSubTitle);
  }

  @step('Get the "Card overview" description')
  async getCardOverviewDescription(): Promise<string | undefined> {
      return CommonHelper.getTextContent(await this.cardOverviewDescription);
  }

  @step('Get the card overview item URL')
  async getCardOverviewItemUrl(): Promise<string | null> {
      return (await this.cardOverviewItem)!.evaluate(el => el.getAttribute('src'));
  }

  @step('Select Uniq overview tab')
  async selectUniqOverviewTab(): Promise<void> {
      await CommonHelper.scrollAndClick(await this.overviewBtn);
  }

  @step('Select Uniq gallery tab')
  async selectUniqGalleryTab(): Promise<void> {
      await CommonHelper.hoverAndClick(await this.galleryBtn);
  }

  @step('Select Uniq properties tab')
  async selectUniqPropertiesTab(): Promise<void> {
      await CommonHelper.focusAndClick(await this.propertiesBtn);
  }

  @step('Show availability')
  async showAvailability(): Promise<void> {
      await CommonHelper.hoverAndClick(await this.availabilityBtn);
  }

  @step('Show tradability')
  async showTradability(): Promise<void> {
      await CommonHelper.hoverAndClick(await this.tradabilityBtn);
  }

  @step('Show Transferability')
  async showTransferability(): Promise<void> {
      await CommonHelper.focusAndClick(await this.transferabilityBtn);
  }

  @step('Check info icon')
  async checkInfoIcon(): Promise<void> {
      await (await this.infoIcon)!.hover();
      await (await this.popUpInfo)!.focus();
  }

  @step('Check Transferability data')
  async checkTransferabilityData(): Promise<void> {
      await this.selectUniqPropertiesTab();
      await this.showTransferability();
      await this.checkInfoIcon();
  }

  @step('Go To Sell Uniq')
  async goToSellUniq(): Promise<void> {
      await CommonHelper.focusAndClick(await this.sellUniqButton);
  }

  @step('Close page')
  async closeTab(): Promise<void> {
      await this.page.close();
  }
}
