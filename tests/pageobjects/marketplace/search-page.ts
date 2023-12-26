import { Browser, ElementHandle } from 'puppeteer';
import { CommonHelper } from '../../helpers/common.helper';
import { step } from '../../helpers/allure.helper';
import { sort } from 'fast-sort';
import * as assert from 'assert';

const configData = require('../../../config/config.data.json');
const config = configData.env.MARKETPLACE;
const configTransaction = configData.env.TRANSACTION;
const data = require('../../../test-data/page-data.json').Marketplace;

export class SearchPage extends CommonHelper {
  @step('Wait for open Search page')
    static async getInstance(browser: Browser): Promise<SearchPage> {
        return new SearchPage(await this.getPageFromClient(browser, `${config.URL }search`));
    }

  private get searchForUniqsInput(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="search-uniq-field"]');
  }

  private get searchPriceInput(): Promise<ElementHandle[]> {
      return CommonHelper.waitForSelectors$$(this.page,'cdk-accordion-item [id*="ultra-input-"]');
  }

  private get applySearchPriceBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="search-price-filter-button"]');
  }

  private get switchReverseBtn(): Promise<ElementHandle[]> {
      return CommonHelper.waitForSelectors$$(this.page,'[data-id="switch-layout-button"]');
  }

  private get uniqCardList(): Promise<ElementHandle[]> {
      return CommonHelper.waitForSelectors$$(this.page,'[data-id="expansion-panel-container"]');
  }

  private get uniqCardGrid(): Promise<ElementHandle[]> {
      return CommonHelper.waitForSelectors$$(this.page,'[data-id="card-container"]');
  }

  private get uniqOwnerTxt(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="product-owner-content"]');
  }

  private get allUniqs(): Promise<ElementHandle[]> {
      return CommonHelper.waitForSelectors$$(this.page,'[data-id="card-container"]');
  }

  private get forSaleUniqs(): Promise<ElementHandle[]> {
      return CommonHelper.waitForSelectors$$(this.page,'[data-id="uniq-overview-price-button"]');
  }

  private get hideSoldOutBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="filter-body-container"]');
  }

  private get nextUniqListBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[aria-label="Next"]');
  }

  private get sortDropdown(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="dropdown-toggle-button"]');
  }

  private get priceDropdown(): Promise<ElementHandle[]> {
      return CommonHelper.waitForSelectors$$(this.page,'.dropdown-item.dropdown-select__item');
  }

  private get uniqPriceLaunchpadIcon() {
      return CommonHelper.waitForXPath$$(this.page,'//*[contains(text(),"$")]');
  }

  private get uniqPriceMarketplaceIcon() {
      return CommonHelper.waitForXPath$$(this.page,'//*[contains(text(),"ᕫ")]');
  }

  private get switchToMarketplaceTab(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="marketplace-search-scope-container"]');
  }

  private get launchpadUniqFactoriesContainer(): Promise<ElementHandle[]> {
      return CommonHelper.waitForSelectors$$(this.page,'[data-id="card-list-item-container"]');
  }

  private get tradabilityBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="token-tradability-tab"]');
  }

  private get availabilityBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="token-quantity-tab"]');
  }

  private get uniqFactoryCardButtons(): Promise<ElementHandle[]> {
      return CommonHelper.waitForSelectors$$(this.page,'[data-id="card-list-item-container"]');
  }

  private get uniqsHeader(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="search-list-sorting-title-content"]');
  }

  private get overviewBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="token-preview-overview-tab"]');
  }

  private get galleryBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="token-preview-preview-tab"]');
  }

  private get imageInGallery(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="media-carousel-image-container"]');
  }

  private get transferabilityBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="token-transferability-tab"]');
  }

  private get transferabilityHeader(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="card-action-container"]');
  }

  private get tradabilityTab(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="card-action-container"]');
  }

  private get availabilityTab(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="card-quantity-content"]');
  }

  private get closePreviewBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="id-card-close-button"]');
  }

  private get closeUltraSearchPageBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="search-close-button"]');
  }

  private get sellUniqButton(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="navbar-link-/sell"]');
  }

  private get uniqFactoryCardContainer(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="card-list-item-container"]');
  }

  private get infoIcon(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[class="d-inline-block bg-white-alpha-7 icon-info"]');
  }

  private get popUpInfo(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[class="d-inline-block bg-white-alpha-7 icon-info"][aria-describedby]');
  }

  private get productPageLink(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="external-link-content"]');
  }

  private get propertiesBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="token-preview-properties-tab"]');
  }

  private get dataBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="data-tab"]');
  }

  private get dataHeaders(): Promise<ElementHandle[]> {
      return CommonHelper.waitForSelectors$$(this.page,'.data-content .overline-medium');
  }

  private get downloadButton(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="card-data-download-icon-content"]');
  }

  private get openButton(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="card-data-open-icon-content"]');
  }

  private get notFoundMessage(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="search-not-found-message-content"]');
  }

  private get uniqID(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[class*="text-uppercase"] + span');
  }

  private get uniqPageLink(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="product-availability-serial-number-link"]');
  }

  getRandomArbitrary(min: number, max: number) {
      return Math.floor(Math.random() * (max - min) + min);
  }

  async randomValues(min: number, max: number): Promise<number> {
      return this.getRandomArbitrary(min, max);
  }

  private get uniqFoundNumber(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="search-list-sorting-quantity"]');
  }

  protected get uniqCardNameList(): string {
      return '[data-id="uniq-factory-name-content"]';
  }

  protected get uniqCardNameGrid(): string {
      return '[data-id="card-title-content"]';
  }

  protected get containsSoldOut(): string {
      return '[data-id="uniq-sold-out-button"]';
  }

  protected get paginationNext(): string {
      return 'a[aria-label="Next"]';
  }

  protected get availableUniqQuantity(): string {
      return '[data-id="available-uniq-quantity-content"]';
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

  @step('Get the "Uniq header" value')
  async uniqsHeaderText(): Promise<string | undefined> {
      return CommonHelper.getTextContent(await this.uniqsHeader);
  }

  @step('Get the "Uniq owner" value')
  async getUniqOwner(): Promise<string | undefined> {
      return CommonHelper.getTextContent(await this.uniqOwnerTxt);
  }

  @step('Get the number of Uniq found')
  async numberOfUnique(): Promise<string | undefined> {
      return CommonHelper.getTextContent(await this.uniqFoundNumber);
  }

  @step('Get the "Search results" message')
  async uniqNotFound(): Promise<string | undefined> {
      return CommonHelper.getTextContent(await this.notFoundMessage);
  }

  @step('Get the ID for selected uniq')
  async getUniqId(): Promise<string | undefined> {
      return CommonHelper.getTextContent(await this.uniqID);
  }

  @step('Search for Uniqs')
  async searchUniq(name: string): Promise<void> {
      await CommonHelper.setValue(await this.searchForUniqsInput, JSON.stringify(name));
      await page.waitForTimeout(1000); // wait for search results to load
  }

  @step('Click on the "grid/list" button')
  async informationDisplay(view: number): Promise<void> {
      await CommonHelper.focusAndClick((await this.switchReverseBtn)[view]);
      await this.page.waitForTimeout(3000); // wait for the info to load
  }

  @step('Get nth uniq from random values')
  async getContainer(random: number, index: number): Promise<ElementHandle> {
      if (random === 0) {
          return (await this.uniqCardList)[index];
      } else {
          return (await this.uniqCardGrid)[index];
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

  @step('Open the product preview')
  async openProductPreview(uniq: ElementHandle): Promise<void> {
      await CommonHelper.scrollToElement(uniq);
      await page.waitForTimeout(1000); // wait for the data to be displayed
      await uniq.click({ button: 'left' });
  }

  @step('Get the count of all Uniqs')
  async countAllUniqs(): Promise<number> {
      return (await this.allUniqs).length;
  }

  @step('Get the count of Uniqs for sale')
  async countForSaleUniqs(): Promise<number> {
      return (await this.forSaleUniqs).length;
  }

  @step('Hide sold out Uniqs')
  async hideSoldOutUniq(): Promise<void> {
      await CommonHelper.hoverAndClick(await this.hideSoldOutBtn);
      await page.waitForTimeout(1000); // wait for search results to load
  }

  @step('Navigate to next page')
  async nextPageUniqs(): Promise<void> {
      await CommonHelper.hoverAndClick(await this.nextUniqListBtn);
  }

  @step('Check hiding sold out Uniqs')
  async checkHidingUniqs(): Promise<void> {
      const countAllUniqs = await this.countAllUniqs();
      const countForSaleUniqs = await this.countForSaleUniqs();
      if (countAllUniqs < 24) {
          await this.hideSoldOutUniq();
          const after = await this.countAllUniqs();
          expect(after).toBe(countForSaleUniqs);
      } else if (countAllUniqs === countForSaleUniqs) {
          await this.nextPageUniqs();
          const before = await this.countForSaleUniqs();
          await this.hideSoldOutUniq();
          const after = await this.countForSaleUniqs();
          expect(before).toBeGreaterThanOrEqual(after);
      } else {
          const before = await this.countForSaleUniqs();
          await this.hideSoldOutUniq();
          const after = await this.countForSaleUniqs();
          expect(before).toBeGreaterThanOrEqual(after);
      }
  }

  @step('Sort uniq by higher price')
  async sortUniqFromExpensive(): Promise<void> {
      await CommonHelper.scrollAndClick(await this.sortDropdown);
      await (await this.priceDropdown)[1].click();
      await page.waitForTimeout(1000); // wait for search results to load
  }

  @step('Get array uniqs price')
  async getArrayUniqPrice(page: string): Promise<any> {
      switch (page) {
          case 'Launchpad': {
              const arrayLaunchpad = [];
              for (let i = 0; i < (await this.countForSaleUniqs()); i++) {
                  const price = await this.uniqPriceLaunchpadIcon;
                  const num: string | null = await price[i]!.evaluate((el) => el.textContent);
                  arrayLaunchpad.push(parseFloat(num!.split('$').join('')));
              }
              return arrayLaunchpad;
          }
          case 'Marketplace': {
              const arrayMarketplace = [];
              for (let i = 0; i < (await this.countForSaleUniqs()); i++) {
                  const price = await this.uniqPriceMarketplaceIcon;
                  const num: string | null = await price[i]!.evaluate((el) => el.textContent);
                  const sortNum: string | null = num!.split('ᕫ').join('');
                  arrayMarketplace.push(parseFloat(sortNum!.split(',').join('')));
              }
              return arrayMarketplace;
          }
          default:
              break;
      }
      return true;
  }

  @step('Check sort uniq by higher price')
  async checkSortUniqFromExpensive(page: string): Promise<void> {
      switch (page) {
          case 'Launchpad': {
              const afterSortLaunchpad = await this.getArrayUniqPrice('Launchpad');
              // @ts-ignore
              expect(afterSortLaunchpad).toEqual(sort(afterSortLaunchpad).desc());
              break;
          }
          case 'Marketplace': {
              const afterSortMarketplace = await this.getArrayUniqPrice('Marketplace');
              // @ts-ignore
              expect(afterSortMarketplace).toEqual(sort(afterSortMarketplace).desc());
              break;
          }
          default:
              break;
      }
  }

  @step('Sort uniq by lower price')
  async sortUniqFromCheaper(): Promise<void> {
      await CommonHelper.scrollAndClick(await this.sortDropdown);
      await (await this.priceDropdown)[2].click();
      await page.waitForTimeout(1000); // wait for search results to load
  }

  @step('Check sort uniq by lower price')
  async checkSortUniqFromCheaper(page: string): Promise<void> {
      switch (page) {
          case 'Launchpad': {
              const afterSortLaunchpad = await this.getArrayUniqPrice('Launchpad');
              // @ts-ignore
              expect(afterSortLaunchpad).toEqual(sort(afterSortLaunchpad).asc());
              break;
          }
          case 'Marketplace': {
              const afterSortMarketplace = await this.getArrayUniqPrice('Marketplace');
              // @ts-ignore
              expect(afterSortMarketplace).toEqual(sort(afterSortMarketplace).asc());
              break;
          }
          default:
              break;
      }
  }

  @step('Set price to search for Uniqs')
  async setPrice(priceFrom: any, priceTo: any): Promise<void> {
      await CommonHelper.slowType((await this.searchPriceInput)[0], JSON.stringify(priceFrom),10);
      await CommonHelper.slowType((await this.searchPriceInput)[1], JSON.stringify(priceTo),10);
      await CommonHelper.hoverAndClick(await this.applySearchPriceBtn);
      await page.waitForTimeout(3000); // wait for search results to load
  }

  @step('Check sort Uniqs by price')
  async checkSortByPrice(priceFrom: number, priceTo: number, page: string) {
      switch (page) {
          case 'Launchpad': {
              const afterSortLaunchpad = await this.getArrayUniqPrice('Launchpad');
              for (let i = 0; i < (await this.countForSaleUniqs()); i++) {
                  // @ts-ignore
                  expect(afterSortLaunchpad[i] >= priceFrom && afterSortLaunchpad[i] <= priceTo).toBeTruthy();
              }
              break;
          }
          case 'Marketplace': {
              const afterSortMarketplace = await this.getArrayUniqPrice('Marketplace');
              for (let i = 0; i < (await this.countForSaleUniqs()); i++) {
                  // @ts-ignore
                  expect(afterSortMarketplace[i] >= priceFrom && afterSortMarketplace[i] <= priceTo).toBeTruthy();
              }
              break;
          }
          default:
              break;
      }
  }

  @step('Switch to Marketplace tab')
  async switchToMarketplace(): Promise<void> {
      await CommonHelper.scrollAndClick(await this.switchToMarketplaceTab);
      await page.waitForTimeout(1000); // wait for the tab to load
  }

  @step('Selecting sold out Uniq Factory from the launchpad')
  async getSoldOutUniqFactory(): Promise<ElementHandle> {
      let uniqFactory: ElementHandle | null = null;
      while (!uniqFactory) {
          await this.page.waitForNetworkIdle();
          const elems = await this.launchpadUniqFactoriesContainer;
          for (const uniq of elems) {
              const containsSoldOut = await uniq.$(this.containsSoldOut);
              if (containsSoldOut) {
                  uniqFactory = uniq;
                  break;
              }
          }
          if (!uniqFactory) {
              const paginationNext = await this.page.$(this.paginationNext);
              paginationNext?.click();
              await this.page.waitForNetworkIdle();
          }
      }
      return uniqFactory;
  }

  @step('Open Uniq card and check zero availability')
  async getUniqAvailability(): Promise<number> {
      await CommonHelper.hoverAndClick(await this.propertiesBtn);
      await CommonHelper.hoverAndClick(await this.tradabilityBtn);
      await CommonHelper.hoverAndClick(await this.availabilityBtn);
      return parseInt((await this.page.$eval(this.availableUniqQuantity, (el) => el.textContent))!);
  }

  @step('Open Uniq factory page')
  async goToUniqFactoryPurchase(uniqId: string) {
      return this.page.goto(`${configTransaction.URL}/uniq?uniq_factory_id=${uniqId}`);
  }

  @step('Selecting random Uniq Factory from the launchpad')
  async getRandomUniqFactory(): Promise<any> {
      await CommonHelper.waitForSelector(this.page, this.uniqPrice);
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

  @step('Click on the "Buy" button of 1st-hand Uniq')
  async buyUniqFactory(container: any): Promise<void> {
      await CommonHelper.focusAndClick(await container.buyButton);
  }

  @step('Should check details uniq')
  async checkDetailsUniqLaunchpad(): Promise<void> {
      await CommonHelper.hoverAndClick(await this.overviewBtn);
      await this.page.waitForTimeout(2000); // wait for tab to loaded
      await CommonHelper.hoverAndClick(await this.galleryBtn);
      await expect(await this.imageInGallery).toBeTruthy();
      await CommonHelper.hoverAndClick(await this.propertiesBtn);
      await this.page.waitForTimeout(2000); // wait for tab to loaded
      await CommonHelper.hoverAndClick(await this.transferabilityBtn);
      await expect(await this.transferabilityHeader).toBeTruthy();
      await CommonHelper.hoverAndClick(await this.tradabilityBtn);
      await expect(await this.tradabilityTab).toBeTruthy();
      await CommonHelper.hoverAndClick(await this.availabilityBtn);
      await expect(await this.availabilityTab).toBeTruthy();
  }

  @step('Click on the "Close preview" button')
  async closePreview(): Promise<void> {
      await CommonHelper.hoverAndClick(await this.closePreviewBtn);
  }

  @step('Click on the "Close ultra search page" button')
  async closeUltraSearchPage(): Promise<void> {
      await CommonHelper.hoverAndClick(await this.closeUltraSearchPageBtn);
  }

  @step('Go to Sell Uniq page')
  async goToSellUniq(): Promise<void> {
      await CommonHelper.focusAndClick(await this.sellUniqButton);
  }

  @step('Expand Uniq factory card')
  async expandUniqFactoryCard(): Promise<void> {
      await (await this.uniqFactoryCardContainer)!.click({ button: 'left' });
  }

  @step('Select Uniq properties tab')
  async selectUniqPropertiesTab(): Promise<void> {
      await CommonHelper.focusAndClick(await this.propertiesBtn);
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

  @step('Select Uniq overview tab')
  async selectUniqOverviewTab(): Promise<void> {
      await CommonHelper.scrollAndClick(await this.overviewBtn);
  }

  @step('Open uniq product page')
  async openUniqProductPage(): Promise<void> {
      await CommonHelper.hoverAndClick(await this.productPageLink);
  }

  @step('Show data')
  async showData(): Promise<void> {
      await (await this.dataBtn)!.click();
  }

  @step('Check data displayed')
  async checkData(firstHeader: string, secondHeader: string): Promise<void> {
      const [onChainHeader, offChainHeader] = await this.dataHeaders.then(elements => {
          return Promise.all([
              elements[0].evaluate(el => el.textContent?.trim()),
              elements[1].evaluate(el => el.textContent?.trim()),
          ]);
      });
      await expect(onChainHeader).toEqual(firstHeader);
      await expect(offChainHeader).toEqual(secondHeader);
  }

  @step('Click on the "Download data" button and check response')
  async checkFileDownload(fileExtension: string): Promise<void> {
      const downloadHandler = (response: any) => {
          const request = response.request();
          if (request.url().endsWith(fileExtension) && response.status() === 200) {
              console.log('Download passed');
          } else {
              assert.fail('Download failed: unexpected response');
          }
      };
      await this.page.on('response', downloadHandler);
      await (await this.downloadButton)!.click();
      await new Promise(resolve => setTimeout(resolve, 5000));
      await this.page.removeListener('response', downloadHandler);
  }

  @step('Click on the "Open data" button')
  async clickOpenButton(): Promise<void> {
      await CommonHelper.hoverAndClick(await this.openButton);
      // todo need to add check that page is loaded
  }

  @step('Check that the product was not found')
  async productNotFound(random: number, uniqName: any, uniqId: any): Promise<void> {
      await this.numberOfUnique();
      if ((await this.numberOfUnique()) === '0') {
          await expect(await this.uniqNotFound()).toEqual(data.UniqNotFound);
      } else {
          const purchasedUniq = await this.getContainer(random, 0);
          const getUniqName = await this.getUniqName(random, purchasedUniq);
          await expect(getUniqName).toEqual(uniqName);
          await this.openProductPreview(purchasedUniq);
          const getUniqID = await this.getUniqId();
          await expect(getUniqID).not.toEqual(uniqId);
      }
  }

  @step('Open the "Uniq" page')
  async openUniqPage(): Promise<void> {
      await CommonHelper.hoverAndClick(await this.uniqPageLink);
  }

  @step('Reload page')
  async reloadPage() {
      await CommonHelper.reloadPage(this.page);
  }
}
