import { Browser, ElementHandle } from 'puppeteer';

import { CommonHelper } from '../../helpers/common.helper';
import { step } from '../../helpers/allure.helper';

const configData = require('../../../config/config.data.json');
const config = configData.env.MARKETPLACE;
const data = require('../../../test-data/page-data.json').Marketplace;

export class MarketplacePage extends CommonHelper {
  @step('Wait for open Marketplace page')
    static async getInstance(browser: Browser): Promise<MarketplacePage> {
        return new MarketplacePage(await this.getPageFromClient(browser, config.URL));
    }

  private get launchpadHeader(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="uniq-launchpad-title-content"]');
  }

  private get applyNowBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="uniq-launchpad-apply-link"]');
  }

  private get marketplaceHeader(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="uniq-marketplace-title-content"]');
  }

  private get launchpadCarousel(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="launchpad-carousel-content"]');
  }

  private get sellUniqButton(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="navbar-link-/sell"]');
  }

  private get sellUniqButtonActive(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="navbar-link-/sell"][class*="active"]');
  }

  private get purchaseUniqButtonActive(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="navbar-link-/"][class*="active"]');
  }

  private get uniqList(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="uniq-marketplace-list-content"]');
  }

  private get uniqFactoryCard(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="card-carousel-list-item-content"]');
  }

  private get purchasedUniqCard(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="uniq-list-item-container"] > div');
  }

  private get uniqFactoryList(): Promise<ElementHandle[]> {
      return CommonHelper.waitForSelectors$$(this.page,'[data-id="card-carousel-list-item-holders"]');
  }

  private get launchpadRightArrow(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="card-carousel-right-button"]');
  }

  private get uniqCardList(): Promise<ElementHandle[]> {
      return CommonHelper.waitForSelectors$$(this.page,'[data-id="expansion-panel-container"]');
  }

  private get uniqCardGrid(): Promise<ElementHandle[]> {
      return CommonHelper.waitForSelectors$$(this.page,'[data-id="card-container"]');
  }

  private get legalLink(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="legal-link"]');
  }

  private get walletBalanceInfo(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id*="wallet-balance-"]');
  }

  private eyeButton(state: string): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, `[data-id="wallet-balance--${state}"]`);
  }

  private get uniqFactoryCardButtons(): Promise<ElementHandle[]> {
      return CommonHelper.waitForSelectors$$(this.page,'[data-id="card-carousel-list-item-holders"]');
  }

  private get uniqLaunchpadInfo(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="card-carousel-title-content"]');
  }

  private uniqHeader(title: string): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,`[sectiontitle="Uniq ${title}"] .fw-bold`);
  }

  private allUniqBtn(title: string): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,`[data-id="marketplace-${title}-link"]`);
  }

  private get launchpadListInfo(): Promise<ElementHandle[]> {
      return CommonHelper.waitForSelectors$$(this.page,'[data-id="uniq-list-item-container"]');
  }

  private get listForSaleInfo(): Promise<ElementHandle[]> {
      return CommonHelper.waitForSelectors$$(this.page,'[data=id="card-list-item-container"]');
  }

  private get overviewBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="token-preview-overview-tab"]');
  }

  private get galleryBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="token-preview-preview-tab"]');
  }

  private get propertiesBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="token-preview-properties-tab"]');
  }

  private get imageInGallery(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="media-carousel-image-container"]');
  }

  private get tradabilityBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="token-tradability-tab"]');
  }

  private get transferabilityBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="token-transferability-tab"]');
  }

  private get transferabilityHeader(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="transferability-title"]');
  }

  private get infoIcon(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="availability-tooltip-info-content"]');
  }

  private get popUpInfo(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[class="d-inline-block bg-white-alpha-7 icon-info"][aria-describedby]');
  }

  private get availabilityBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="token-quantity-tab"]');
  }

  private get tradabilityInfo(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="tradability-title"]');
  }

  private get switchToLaunchpadTabBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="accordion-launchpad-container"]');
  }

  private get uniq2ndHandFactoryCards(): Promise<ElementHandle[]> {
      return CommonHelper.waitForSelectors$$(this.page,'[data-id="id-card-header-container"]');
  }

  private get uniqFactoryCardBottomTitle(): Promise<ElementHandle[] | null> {
      return CommonHelper.waitForSelectors$$(this.page,'[data-id="card-title-content"]');
  }

  private get uniqFactorySubNameInfo(): Promise<ElementHandle[] | null> {
      return CommonHelper.waitForSelectors$$(this.page,'[data-id="card-subtitle-content"]');
  }

  private get productPageLink(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="external-link-content"]');
  }

  private get closeUniqCard(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="id-card-close-button"]');
  }

  private uniqMp4PlayButton(uniqFactory: ElementHandle): Promise<ElementHandle | null> {
      return uniqFactory
          .waitForSelector('[data-id="play-icon-content"]',{ timeout: 50000, visible: true })
          .then(() => this.page.$('[data-id="play-icon-content"]'));
  }

  private uniqMp4PauseButton(uniqFactory: ElementHandle): Promise<ElementHandle | null> {
      return uniqFactory
          .waitForSelector('[data-id="pause-icon-content"]',{ timeout: 50000, visible: true })
          .then(() => this.page.$('[data-id="pause-icon-content"]'));
  }

  private videoPlayer(uniqFactory: ElementHandle): Promise<ElementHandle | null> {
      return uniqFactory
          .waitForSelector('[data-id="media-video-player-content"]',{ timeout: 50000, visible: true })
          .then(() => this.page.$('[data-id="media-video-player-content"]'));
  }

  private uniqCard(options: any): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="uniq-card-transition-content"]', options);
  }

  private cardTitleContent(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="card-title-content"]');
  }

  protected get ultraPlayPauseIcon(): string {
      return '[data-id="play-icon-content"]';
  }

  protected get uniqPrice(): string {
      return '[data-id="uniq-price-content"]';
  }

  protected get uniqTitle(): string {
      return '[data-id="card-title-content"]';
  }

  protected get uniqBuyBtn(): string {
      return '[data-id="uniq-overview-price-button"]';
  }

  protected get secondHandUniqTitle(): string {
      return '[data-id="uniq-preview-content"]';
  }

  protected get secondHandUniqBuyButton(): string {
      return '[data-id="uniq-price-content"]';
  }

  @step('Get the "Wallet balance" value')
  async getWalletBalance(): Promise<string | undefined> {
      return CommonHelper.getTextContent(await this.walletBalanceInfo);
  }

  @step('Get the "Uniq Section" title')
  async getUniqSectionTitle(title: string): Promise<string | undefined> {
      return await CommonHelper.getTextContent(await this.uniqHeader(title));
  }

  @step('Get the "Uniq Launchpad" value')
  async uniqLaunchpadText(): Promise<string | undefined> {
      return await CommonHelper.getTextContent(await this.uniqLaunchpadInfo);
  }

  @step('Get the "Tradability" data')
  async tradabilityText(): Promise<string | undefined> {
      return await CommonHelper.getTextContent(await this.tradabilityInfo);
  }

  @step('Get the "Uniq factory" name')
  async getUniqFactoryName(factoryIndex: number): Promise<string | undefined> {
      return CommonHelper.getTextContent((await this.uniqFactoryCardBottomTitle)![factoryIndex]);
  }

  @step('Get the "Uniq factory" sub name')
  async getUniqFactorySubName(factoryIndex: number): Promise<string | undefined> {
      return CommonHelper.getTextContent((await this.uniqFactorySubNameInfo)![factoryIndex]);
  }

  @step('Get count of 2nd hand uniqs on the page')
  async getCountOfUniqs(): Promise<number> {
      return (await this.uniqCardList).length;
  }

  @step('Get count of Uniq Factories on the page')
  async getCountOfUniqFactories(): Promise<number> {
      return (await this.uniqFactoryList).length;
  }

  @step('Get count of launchpad list on the page')
  async getCountOfLaunchpadList(): Promise<number> {
      return (await this.launchpadListInfo).length;
  }

  @step('Get count of list for sale on the page')
  async getCountOfListForSale(): Promise<number> {
      return (await this.listForSaleInfo).length;
  }

  @step('Wait for Marketplace page to be displayed')
  async waitForHeaderDisplayed(): Promise<ElementHandle | null> {
      return this.launchpadHeader;
  }

  @step('Wait for Marketplace page to be displayed')
  async waitForApplyNowBtn(): Promise<ElementHandle | null> {
      return this.applyNowBtn;
  }

  @step('Wait for 2nd hand Uniqs marketplace to be displayed')
  async waitForUniqsMarketplaceDisplayed(): Promise<ElementHandle | null> {
      return this.marketplaceHeader;
  }

  @step('Wait for Launchpad carousel to be displayed')
  async waitForLaunchpadDisplayed(): Promise<ElementHandle | null> {
      return this.launchpadCarousel;
  }

  @step('Wait for 2nd hand Uniqs list to be displayed')
  async waitForUniqListDisplayed(): Promise<ElementHandle | null> {
      return this.uniqList;
  }

  @step('Wait for Sell Uniq Button to be displayed')
  async waitForSellUniqButton(): Promise<ElementHandle | null> {
      return this.sellUniqButton;
  }

  @step('Wait for Sell Uniq Button to be active')
  async waitForSellUniqButtonActive(): Promise<ElementHandle | null> {
      return this.sellUniqButtonActive;
  }

  @step('Wait for Purchase Uniq Button to be active')
  async waitForPurchaseUniqButtonActive(): Promise<ElementHandle | null> {
      return this.purchaseUniqButtonActive;
  }

  @step('Wait for Legal link to be displayed')
  async waitForLegalDisplayed(): Promise<ElementHandle | null> {
      return this.legalLink;
  }

  @step('Wait wallet balance to be displayed')
  async waitForWalletDisplayed(): Promise<ElementHandle | null> {
      return this.walletBalanceInfo;
  }

  @step('Wait for page load')
  async waitForPageLoad(): Promise<void> {
      await this.cardTitleContent;
      await this.page.waitForTimeout(3000); // wait for load page
  }

  @step('Wait for image in gallery')
  async waitForImageInGallery(): Promise<void> {
      await this.imageInGallery;
  }

  @step('Go to the "Sell Uniq" page')
  async goToSellUniq(): Promise<void> {
      await CommonHelper.focusAndClick(await this.sellUniqButton);
  }

  @step('Navigate carousel right')
  async navigateCarouselRight(): Promise<void> {
      await CommonHelper.hoverAndClick(await this.launchpadRightArrow);
  }

  @step('Selecting random Uniq Factory from the launchpad')
  async getRandom2ndHandUniqFactory(): Promise<any> {
      const secondHandCards = await this.uniq2ndHandFactoryCards;
      const randomUniqFactory = secondHandCards[Math.floor(Math.random() * secondHandCards.length)];
      let price = await randomUniqFactory.$eval(this.secondHandUniqBuyButton, (el) => el.innerHTML);
      price = price?.replace(/ /g, '').replace('<!----><!----><!---->','').trim();
      return {
          price: price,
          title: await randomUniqFactory.$eval(this.secondHandUniqTitle, (el) => el.textContent),
          buyButton: await randomUniqFactory.$(this.secondHandUniqBuyButton)
      };
  }

  @step('Update the eye element of the wallet')
  async updateEyeElement(): Promise<void> {
      await (await this.eyeButton('null'))!.click();
      await (await this.eyeButton('true'))!.click();
  }

  @step('Click on the "Eye" button')
  async clickEyeButton(hide: boolean): Promise<void> {
      let button;
      hide ? button = await this.eyeButton('false'): button = await this.eyeButton('true');
      await button!.click();
      await this.page.waitForTimeout(1000); // wait for the applied changes
  }

  @step('Click on the "Play video" button')
  async clickPlayButton(uniqFactory: ElementHandle): Promise<void> {
      await uniqFactory!.hover();
      await (await this.uniqMp4PlayButton(uniqFactory))!.hover(); // don't use the universal hoverAndClick method here
      await (await this.uniqMp4PlayButton(uniqFactory))!.click();
      await this.uniqMp4PauseButton(uniqFactory);
  }

  @step('Click on the "Pause video" button')
  async clickPauseButton(uniqFactory: ElementHandle): Promise<void> {
      await uniqFactory!.hover();
      await (await this.uniqMp4PauseButton(uniqFactory))!.hover(); // don't use the universal hoverAndClick method here
      await (await this.uniqMp4PauseButton(uniqFactory))!.click();
      await this.uniqMp4PlayButton(uniqFactory);
  }

  @step('Check the video inside the uniq')
  async checkVideoInsideUniqCard(uniqFactory: ElementHandle): Promise<void> {
      await this.uniqCard({visible: true});
      await CommonHelper.hoverAndClick(await this.overviewBtn);
      await this.videoPlayer(uniqFactory);
  }

  @step('Close uniq card')
  async clickCloseUniqCard(): Promise<void> {
      await CommonHelper.hoverAndClick(await this.closeUniqCard);
      await this.uniqCard({hidden: true});
  }

  @step('Click on the "Buy" button of 1st-hand Uniq')
  async buyUniqFactory(container: any): Promise<void> {
      await CommonHelper.focusAndClick(await container.buyButton);
  }

  @step('Selecting random Uniq Factory from the launchpad')
  async getRandomUniqFactory(): Promise<any> {
      const uniqFactories = await this.uniqFactoryCardButtons;
      const randomUniqFactory = uniqFactories[Math.floor(Math.random() * uniqFactories.length)];
      let price = (await randomUniqFactory.$eval(this.uniqPrice, (el) => el.innerHTML));
      price = price?.replace(/ /g, '').replace('<!----><!---->','').trim();
      return {
          price: price,
          title: await randomUniqFactory.$eval(this.uniqTitle, (el) => el.textContent),
          buyButton: await randomUniqFactory.$(this.uniqBuyBtn)
      };
  }

  @step('Selecting Uniq Factory with video from Carousel')
  async getMp4UniqFactory(): Promise<ElementHandle> {
      let mp4Factory: ElementHandle | null = null;
      let iterations = 0;
      while (!mp4Factory && iterations < 5) {
          await this.page.waitForNetworkIdle();
          for (const factory of await this.uniqFactoryList) {
              if (await factory.$(this.ultraPlayPauseIcon)) {
                  await factory.click({ button: 'left' });
                  mp4Factory = factory;
                  break;
              }
          }
          if (!mp4Factory) {
              await this.navigateCarouselRight();
          }
          iterations++;
      }
      if (!mp4Factory) {
          throw new Error('No MP4 video found in carousel');
      }
      return mp4Factory;
  }

  @step('Wait for purchase Uniq page elements to be displayed')
  async purchaseUniqPageToBeDisplayed(): Promise<void> {
      await this.waitForHeaderDisplayed();
      await this.waitForApplyNowBtn();
      await this.waitForLaunchpadDisplayed();
      await this.waitForUniqsMarketplaceDisplayed();
      await this.waitForUniqListDisplayed();
      await this.waitForSellUniqButton();
      await this.waitForPurchaseUniqButtonActive();
      await this.waitForLegalDisplayed();
      await this.waitForWalletDisplayed();
  }

  @step('Get nth uniq from grid')
  async getUniqFromGrid(index: number): Promise<ElementHandle> {
      return (await this.uniqCardGrid)[index];
  }

  @step('Click on the "Explore the Launchpad" button')
  async openUniqLaunchpad(): Promise<void> {
      await expect(await this.getUniqSectionTitle('Launchpad')).toContain(data.uniqLaunchpad);
      await CommonHelper.scrollAndClick(await this.allUniqBtn('launchpad'));
  }

  @step('Click on the "Explore the Marketplace" button')
  async openUniqForSale(): Promise<void> {
      await expect(await this.getUniqSectionTitle('Marketplace')).toContain(data.uniqMarketplace);
      await CommonHelper.scrollAndClick(await this.allUniqBtn('marketplace'));
  }

  @step('Switch to Launchpad tab')
  async switchToLaunchpad(): Promise<void> {
      await CommonHelper.hoverAndClick(await this.switchToLaunchpadTabBtn);
      await page.waitForTimeout(1000); // wait for the tab to load
  }

  @step('Click on the "Legal" link')
  async clickLegal(): Promise<void> {
      await CommonHelper.focusAndClick(await this.legalLink);
  }

  @step('Expand Uniq factory card')
  async expandUniqFactoryCard(): Promise<void> {
      await (await this.uniqFactoryCard)!.click({ button: 'left' });
  }

  @step('Expand purchased Uniq card')
  async expandPurchasedUniqCard(): Promise<void> {
      await (await this.purchasedUniqCard)!.click({ button: 'left' });
  }

  @step('Select the "Uniq overview" tab')
  async selectUniqOverviewTab(): Promise<void> {
      await CommonHelper.scrollAndClick(await this.overviewBtn);
  }

  @step('Select the "Uniq gallery" tab')
  async selectUniqGalleryTab(): Promise<void> {
      await CommonHelper.hoverAndClick(await this.galleryBtn);
  }

  @step('Select the "Uniq properties" tab')
  async selectUniqPropertiesTab(): Promise<void> {
      await CommonHelper.focusAndClick(await this.propertiesBtn);
  }

  @step('Show the "Availability info')
  async showAvailability(): Promise<void> {
      await CommonHelper.hoverAndClick(await this.availabilityBtn);
  }

  @step('Show the "Tradability" info')
  async showTradability(): Promise<void> {
      await CommonHelper.hoverAndClick(await this.tradabilityBtn);
  }

  @step('Show the "Transferability" info')
  async showTransferability(): Promise<void> {
      await CommonHelper.focusAndClick(await this.transferabilityBtn);
  }

  @step('Check that the transferability header is displayed')
  async checkTransferability(): Promise<void> {
      await expect(data.transferability).toContain(await CommonHelper.getTextContent(await this.transferabilityHeader));
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

  @step('Open the "Uniq product" page')
  async openUniqProductPage(): Promise<void> {
      await CommonHelper.hoverAndClick(await this.productPageLink);
  }

  @step('Reload page')
  async reloadPage() {
      await this.page.reload();
  }
}
