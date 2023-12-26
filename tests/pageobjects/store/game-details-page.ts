import { Browser, ElementHandle } from 'puppeteer';

import { CommonHelper } from '../../helpers/common.helper';
import { GameHelper } from '../../helpers/api-helpers/game.api.helper';
import { step } from '../../helpers/allure.helper';

const config = require('../../../config/config.data.json').env;
const data = require('../../../test-data/page-data.json').GameDetails;

export class GameDetailsPage extends CommonHelper {
  @step('Wait for open Store page')
    static async getInstance(browser: Browser): Promise<GameDetailsPage> {
        return new GameDetailsPage(await this.getPageFromClient(browser, config.STORE.URL));
    }

  private get checkGameName(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, 'h1[class*="game-detail-container__name"]');
  }

  private get addToWishList(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '.prices__wrapper [data-id="toggle-false"]');
  }

  private get addedToWishList(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '.prices__wrapper [data-id="toggle-true"]');
  }

  private get goToStoreBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="navbar-link-/store"]');
  }

  private get searchGame(): Promise<ElementHandle<SVGElement | HTMLElement> | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="navbar-search-input"]');
  }

  private get legal(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="legal-link"]');
  }

  private get breadcrumbs(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="breadcrumbs"]');
  }

  private get shortDescription(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="game-details-short-description"]');
  }

  private async gameToken(section: string): Promise<ElementHandle | null> {
      return CommonHelper.waitForXPath(this.page, `//ultra-id-card-header[contains(., '${section}')]`);
  }

  private tokenTabs(tab: string): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, `[data-id="token-preview-${tab}-tab"]`);
  }

  private get tokenTitle(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="card-overview-title-content"]');
  }

  private get tokenDescription(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="card-overview-description-content"]');
  }

  private get tokenTypeCode(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="token-type"]');
  }

  private get tokenTypeName(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '.ps-content .token-type span');
  }

  private get shortGameDescription(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="game-details-description-short"]');
  }

  private get tokenLanguageSupport(): Promise<ElementHandle[]> {
      return CommonHelper.waitForSelectors$$(this.page, '[data-id="token-languages-item"]');
  }

  private get tokenGallery(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '.swiper-slide-duplicate-active [data-id="media-carousel-image-container"]');
  }

  private get geofencingTab(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="token-geofencing-tab"]');
  }

  private get tradabilityTab(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="token-tradability-tab"]');
  }

  private get availabilityTab(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="token-quantity-tab"]');
  }

  private get transferabilityTab(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="token-transferability-tab"]');
  }

  private get tokenPrice(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="preview-token-preview-price-not-purchased"]');
  }

  private get closePreview(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="id-card-close-button"]');
  }

  private get ultraTokens(): Promise<ElementHandle[]> {
      return CommonHelper.waitForSelectors$$(this.page, '[data-id="ultra-id-card-header"]');
  }

  private get gameGenres(): Promise<ElementHandle[]> {
      return CommonHelper.waitForSelectors$$(this.page, '[data-id="game-details-categories-item"]');
  }

  private get gameTags(): Promise<ElementHandle[]> {
      return CommonHelper.waitForSelectors$$(this.page,'[data-id="game-details-tags-item"]');
  }

  private get gameDeveloper(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="game-details-developer"]');
  }

  private get gameEditor(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="game-details-editor"]');
  }

  private get gameModes(): Promise<ElementHandle[]> {
      return CommonHelper.waitForSelectors$$(this.page, '[data-id="ultra-game-detail-playingModes-item"]');
  }

  private get gameDescription(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="game-details-description"]');
  }

  private get externalLinkName(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="game-details-external-links-link-name"]');
  }

  private get externalUrl(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="game-details-external-links-link-url"]');
  }

  private get gameLanguages(): Promise<ElementHandle[]> {
      return CommonHelper.waitForSelectors$$(this.page, '[data-id="ultra-game-detail-languages-item"]');
  }

  private get gameFeatures(): Promise<ElementHandle[]> {
      return CommonHelper.waitForSelectors$$(this.page, '[data-id="game-details-features-item"]');
  }

  private requirements(container: string, section: string): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,`[data-id="game-details-requirements-${container}-${section}"]`);
  }

  private get recommendedGameList(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, this.recommendedGames);
  }

  private featureIcons(value: string): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,`[data-id="game-details-features-item--${value}"]`);
  }

  private get detailWindow(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="id-card-header"]');
  }

  private get previewPropertiesTab(): Promise<ElementHandle | null> {
      return this.page.waitForSelector('[data-id="token-preview-properties-tab"]', { timeout: 50000, visible: true });
  }

  private get tokenGeofencingMessage(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="token-geofencing-message"]');
  }

  private get geofencingRegionDropdown(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="geofencing-region-filter"]');
  }

  private get geofencingRegionEuropean(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="geofencing-region-european union"]');
  }

  private get geofencingAvailableFilter(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="token-geofencing-available-filter"]');
  }

  private get geofencingNotAvailableFilter(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="token-geofencing-not-available-filter"]');
  }

  private get geofencingSearchBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="token-geofencing-search-button"]');
  }

  private get geofencingSearchInput(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="token-geofencing-search-input"]');
  }

  private get gameName(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="game-details-title"]');
  }

  private get getFreeBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="preview-token-preview-price-not-purchased-free"]');
  }

  private get itemName(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="ultra-id-card-header-name"]');
  }

  private get itemSubName(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="ultra-id-card-header-factory-name"]');
  }

  private get itemCreatorName(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="ultra-id-card-header-creator"]');
  }

  private get itemType(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="ultra-id-card-header-content-type-name"]');
  }

  private get purchaseDlc(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '.preview-price .ng-star-inserted');
  }

  private get geofencingData(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, 'ultra-id-card-geofencing');
  }

  private get availabilityData(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, 'ultra-id-card-quantity[class');
  }

  private tradabilityAndTransferabilityData(tab: string): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, `ultra-id-card-actions[actionstooltipinfo*="${tab}"]`);
  }

  private get dialogWindow(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, 'ngb-modal-window[role="dialog"]');
  }

  private get previewContentHeader(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '.preview-content .tab-header');
  }

  protected get alreadyPurchasedBtn(): string {
      return '[data-id="preview-token-preview-price-purchased"]';
  }

  protected get ages18(): string {
      return '[data-id="adult-check-continue"] ';
  }

  protected get buyingOptionsBlock(): string {
      return '[data-id="game-details-token-list-title"]';
  }

  protected get gameFactoriesSection(): string {
      return '.icon-gamepad-sm + .text-uppercase';
  }

  protected get dlcFactoriesSection(): string {
      return '.icon-dlc-sm + .text-uppercase';
  }

  protected get releaseDate(): string {
      return '[data-id="game-details-release-date"]';
  }

  protected get externalLinks(): string {
      return '[data-id="game-details-external-links-title"]';
  }

  protected get recommendedGames(): string {
      return '.swiper-slide-active .game-name';
  }

  protected get geofencingCountry(): string {
      return '[data-id="token-geofencing-country"]';
  }

  protected get tokenizedGameIcon(): string {
      return '.swiper-slide-active .game-name';
  }

  protected get legacyGameIcon(): string {
      return '[data-id="token-geofencing-country"]';
  }

  protected get tradabilityIcon(): string {
      return '.icon-tradability-sm';
  }

  protected get transferabilityIcon(): string {
      return '.icon-transferability-sm';
  }

  @step('Get the "Game name" value')
  async gameNameText(): Promise<string | undefined> {
      return await CommonHelper.getTextContent(await this.checkGameName);
  }

  @step('Get the "Breadcrumbs" value')
  async getBreadcrumbs(): Promise<string | number | null | undefined> {
      return await CommonHelper.getTextContent(await this.breadcrumbs);
  }

  @step('Get the "Short description" value')
  async getShortDescription(): Promise<string | number | null | undefined> {
      return await CommonHelper.getTextContent(await this.shortDescription);
  }

  @step('Get the "Buying Options" value')
  async getBuyingOptions(): Promise<string | number | null | undefined> {
      return await CommonHelper.getTextContent(await CommonHelper.waitForSelector(this.page, this.buyingOptionsBlock));
  }

  @step('Get the "Token title" value')
  async getTokenTitle(): Promise<string | number| null | undefined> {
      return await CommonHelper.getTextContent(await this.tokenTitle);
  }

  @step('Get the "Token description" value')
  async getTokenDescription(): Promise<string | number| null | undefined> {
      return await CommonHelper.getTextContent(await this.tokenDescription);
  }

  @step('Get the "Token type сode" value')
  async getTokenTypeCode(): Promise<string | number| null | undefined> {
      return await CommonHelper.getTextContent(await this.tokenTypeCode);
  }

  @step('Get the "Token type name" value')
  async getTokenTypeName(): Promise<string | number| null | undefined> {
      return await CommonHelper.getTextContent(await this.tokenTypeName);
  }

  @step('Get the "Short Game Description" value')
  async getShortGameDescription(): Promise<string | number| null | undefined> {
      return await CommonHelper.getTextContent(await this.shortGameDescription);
  }

  @step('Get the "Token price" value')
  async getTokenPrice(): Promise<string | number | null | undefined> {
      return (await CommonHelper.getTextContent(await this.tokenPrice))!.split('.')[0];
  }

  @step('Get the "Release Date" value')
  async getReleaseDate(): Promise<string | number | null | undefined> {
      return await CommonHelper.getTextContent(await CommonHelper.waitForSelector(this.page, this.releaseDate));
  }

  @step('Get the "Game Description" value')
  async getGameDescription(): Promise<string | number| null | undefined> {
      return await CommonHelper.getTextContent(await this.gameDescription);
  }

  @step('Get the "External Links" value')
  async getExternalLinks(): Promise<string | number| null | undefined> {
      return await CommonHelper.getTextContent(await CommonHelper.waitForSelector(this.page, this.externalLinks));
  }

  @step('Get the "External Link Name" value')
  async getExternalLinkName(): Promise<string | number| null | undefined> {
      return await CommonHelper.getTextContent(await this.externalLinkName);
  }

  @step('Get the "External URL" value')
  async getExternalUrl(): Promise<string | number| null | undefined> {
      return await CommonHelper.getTextContent(await this.externalUrl);
  }

  @step('Get the "Genre" value')
  async getFirstGenre(): Promise<any> {
      return await CommonHelper.getTextContent((await this.gameGenres)[0]);
  }

  @step('Get the "Requirements" value')
  async getRequirements(container: string, section: string): Promise<any> {
      return await CommonHelper.getTextContent(await this.requirements(container, section));
  }

  @step('Get the "Recommended Game" value')
  async getFirstRecommendedGame(): Promise<any> {
      return await CommonHelper.getTextContent(await this.recommendedGameList);
  }

  @step('Open expand game detail window')
  async openTokenPreviewWindow(): Promise<void> {
      await CommonHelper.scrollAndClick(await this.detailWindow);
  }

  @step('Open game detail sub-tab Properties')
  async openTokenPreviewProperties(): Promise<void> {
      await CommonHelper.scrollAndClick(await this.previewPropertiesTab);
  }

  @step('Get the "Token geofencing" message')
  async geofencingMessageText(): Promise<string | undefined> {
      return await CommonHelper.getTextContent(await this.tokenGeofencingMessage);
  }

  @step('Get the token geofencing available filter number')
  async geofencingAvailableFilterNum(): Promise<string | undefined> {
      return await CommonHelper.getTextContent(await this.geofencingAvailableFilter);
  }

  @step('Get the token geofencing not available filter number')
  async geofencingNotAvailableFilterNum(): Promise<string | undefined> {
      return await CommonHelper.getTextContent(await this.geofencingNotAvailableFilter);
  }

  @step('Get the "Token geofencing" country')
  async geofencingCountryName(): Promise<string | undefined> {
      return await CommonHelper.getTextContent(await CommonHelper.waitForSelector(this.page, this.geofencingCountry));
  }

  @step('Get the "Game name" value')
  async getGameNameTxt(): Promise<any> {
      return await CommonHelper.getTextContent(await this.gameName);
  }

  @step('Get the "Item" name')
  async getItemName(): Promise<string | null | undefined> {
      return await CommonHelper.getTextContent(await this.itemName);
  }

  @step('Get the "Item" sub-name')
  async getItemSubName(): Promise<string | null | undefined> {
      return await CommonHelper.getTextContent(await this.itemSubName);
  }

  @step('Get the "Item creator" name')
  async getItemCreatorName(): Promise<string | null | undefined> {
      return await CommonHelper.getTextContent(await this.itemCreatorName);
  }

  @step('Get the "Item" type')
  async getItemType(): Promise<string | null | undefined> {
      return await CommonHelper.getTextContent(await this.itemType);
  }

  @step('Get the number of Language Support')
  async getTokenLanguageSupport(): Promise<number> {
      return (await this.tokenLanguageSupport).length;
  }

  @step('Get the number of game languages')
  async getGameLanguages(): Promise<number> {
      return (await this.gameLanguages).length;
  }

  @step('Confirm age')
  async ages18Continue(): Promise<any> {
      await this.page.waitForTimeout(2000); // wait for page load
      if ((await this.page.$(this.ages18)) !== null) {
          await (await CommonHelper.waitForSelector(this.page, this.ages18))!.click();
      } else {
          await this.gameName;
      }
  }

  @step('Check the "Game title" value')
  async checkGameTitle(gameInfo:any): Promise<void> {
      const gameName = await this.getGameNameTxt();
      gameInfo.gameName? (expect(await gameName).toBe(gameInfo.gameName)): (expect(await gameName).toBe(gameInfo));
  }

  @step('Click add to wishlist')
  async clickAddToWishList() {
      await CommonHelper.hoverAndClick(await this.addToWishList);
      await this.addedToWishList;
  }

  @step('Click store btn')
  async clickStoreBtn() {
      await CommonHelper.scrollAndClick(await this.goToStoreBtn);
  }

  @step('Click remove game from wishlist')
  async clickRemoveWishList() {
      await CommonHelper.hoverAndClick(await this.addedToWishList);
      await this.addToWishList;
  }

  @step('Check game not in wishlist')
  async checkGameNotInWishlist() {
      await this.addToWishList;
  }

  @step('Click Legal link')
  async clickLegal(): Promise<void> {
      await this.waitForDisplayed();
      await CommonHelper.scrollAndClick(await this.legal);
  }

  @step('Wait for Store page displayed')
  async waitForDisplayed(): Promise<void> {
      await this.searchGame;
  }

  @step('Check images and videos in the gallery')
  async checkGallery(largeHero: string, boxArt: string, id: string): Promise<void> {
      await CommonHelper.waitForSelector(this.page, `ultra-game-detail-preview .full-width [src="${largeHero}"]`);
      await CommonHelper.waitForSelector(this.page, `.rounded [src="${boxArt}"]`);
      await CommonHelper.waitForSelector(this.page, `#video-player-${id}`);
  }

  @step('Check the "Game Factory" icon (legacy or tokenized)')
  async checkGameIcon(game: ElementHandle<HTMLElement> | null, state: string) {
      let icon;
      switch (state) {
          case 'legacy':
              icon = this.legacyGameIcon;
              break;
          case 'tokenized':
              icon = this.tokenizedGameIcon;
              break;
          default:
              throw new Error(`Cannot find state! - ${state}`);
      }
      await game!.$(icon);
  }

  @step('Check the "Tradability or Transferability" icon')
  async checkCapabilitiesOfGame(game: ElementHandle<HTMLElement> | null, state: string) {
      let icon;
      switch (state) {
          case 'tradability':
              icon = this.tradabilityIcon;
              break;
          case 'transferability':
              icon = this.transferabilityIcon;
              break;
          default:
              throw new Error(`Cannot find state! - ${state}`);
      }
      await game!.$(icon);
  }

  @step('Check the "Buying options" value')
  async checkBuyingOptions() {
      const buyingOptions = await this.page.$(this.buyingOptionsBlock);
      if (buyingOptions !== null) {
          await CommonHelper.scrollToElement(buyingOptions);
          await expect(await this.getBuyingOptions()).toBe('Buying Options');
      }
  }

  @step('Check the "Legacy" game factory')
  async checkLegacyGame(gameID: any) {
      if (await this.page.$(this.gameFactoriesSection) !== null) {
          const tokenFactoriesID = await GameHelper.getPublishedTokenFactoriesID(gameID, 0);
          const gameData = await GameHelper.getPublishedTokenFactoryById(tokenFactoriesID);
          const legacyGame = await this.gameToken(await gameData.name);

          await this.checkGameIcon(legacyGame, 'legacy');
          await CommonHelper.hoverAndClick(legacyGame);
          await this.dialogWindow;

          await this.checkOverviewTab(gameData);
          await this.checkContentTab(gameData);
          await this.checkPreviewTab(gameData);
          await this.checkPropertiesOfLegacyGame();
          await this.checkPriceSection(gameData);
          await this.clickCloseBtn();
      }
  }

  @step('Check the "Tokenized" game factory')
  async checkTokenizedGame(gameID: any) {
      if (await this.page.$(this.gameFactoriesSection) !== null) {
          const tokenFactoriesID = await GameHelper.getPublishedTokenFactoriesID(gameID, 1);
          const gameData = await GameHelper.getPublishedTokenFactoryById(tokenFactoriesID);
          const tokenizedGame = await this.gameToken(await gameData.name);

          await this.checkGameIcon(tokenizedGame, 'tokenized');
          await this.checkCapabilitiesOfGame(tokenizedGame, 'tradability');
          await this.checkCapabilitiesOfGame(tokenizedGame, 'transferability');
          await CommonHelper.hoverAndClick(tokenizedGame);
          await this.dialogWindow;

          await this.checkOverviewTab(gameData);
          await this.checkContentTab(gameData);
          await this.checkPreviewTab(gameData);
          await this.checkPropertiesOfTokenizedGame();
          await this.checkPriceSection(gameData, 'tokenized');
          await this.clickCloseBtn();
      }
  }

  @step('Close the overlay by clicking "X" (Close) button')
  async clickCloseBtn() {
      await (await this.closePreview)!.click();
  }

  @step('Check the overview tab')
  async checkOverviewTab(data: any): Promise<any> {
      await (await this.tokenTabs('overview'))!.click();
      await expect(await this.getTokenTitle()).toContain(data.name);
      await expect(data.description).toContain(await this.getTokenDescription());
      await expect(await this.getTokenTypeCode()).toContain(data.contentTypeCode);
  }

  @step('Check the content tab')
  async checkContentTab(data: any): Promise<any> {
      await (await this.tokenTabs('content'))!.click();
      await expect(await this.getTokenTypeName()).toContain(data.contentTypeName);
      await expect(await this.getTokenLanguageSupport()).toBeGreaterThanOrEqual(1);
  }

  @step('Check the preview tab')
  async checkPreviewTab(data: any): Promise<any> {
      await (await this.tokenTabs('preview'))!.click();
      const image = await (await this.tokenGallery)!.evaluate(el => el.getAttribute('style'));
      const url = String(image).substring(String(image).length - 50);
      await expect(data.multimedia.substring((data.multimedia).length - 50)).toContain(url.split('");')[0]);
  }

  @step('Check the properties tab of the tokenized game')
  async checkPropertiesOfTokenizedGame(): Promise<any> {
      await (await this.tokenTabs('properties'))!.click();
      await this.openTokenAvailabilityTab();
      await this.availabilityData;
      await this.openTokenTradabilityTab();
      await this.tradabilityAndTransferabilityData('Tradability');
      await this.openTokenTransferabilityTab();
      await this.tradabilityAndTransferabilityData('Transferability');
  }

  @step('Check the properties tab of the legacy game')
  async checkPropertiesOfLegacyGame(): Promise<any> {
      await (await this.tokenTabs('properties'))!.click();
      await this.openTokenGeofencing();
      await this.geofencingData;
  }

  @step('Check the price section of the tokenized/legacy game')
  async checkPriceSection(data: any, game: string = ''): Promise<any> {
      if (game === 'tokenized') {
          await (await this.previewContentHeader)!.$(this.tradabilityIcon);
          await (await this.previewContentHeader)!.$(this.transferabilityIcon);
      }
      await expect(await this.getTokenPrice()).toContain(data.price[0].symbol + data.price[0].amount);
  }

  @step('Open game detail Geofencing')
  async openTokenGeofencing(): Promise<void> {
      await CommonHelper.scrollAndClick(await this.geofencingTab);
  }

  @step('Open the "Tradability" tab')
  async openTokenTradabilityTab(): Promise<void> {
      await CommonHelper.hoverAndClick(await this.tradabilityTab);
  }

  @step('Open the "Availability" tab')
  async openTokenAvailabilityTab(): Promise<void> {
      await CommonHelper.hoverAndClick(await this.availabilityTab);
  }

  @step('Open the "Transferability" tab')
  async openTokenTransferabilityTab(): Promise<void> {
      await CommonHelper.hoverAndClick(await this.transferabilityTab);
  }

  @step('Check the "DLC Token" section')
  async checkDlcToken(gameID: any): Promise<any> {
      let dlcData = [];
      if (await this.page.$(this.dlcFactoriesSection) !== null) {
          dlcData = await this.getDLC(gameID);
          await CommonHelper.hoverAndClick(await this.gameToken(await dlcData.name));
          await this.checkOverviewTab(dlcData);
          await this.clickCloseBtn();
      }
  }

  @step('Get the "DLC Token" data')
  async getDLC(gameID: any): Promise<any> {
      const tokens = await this.ultraTokens;
      for (let i = 0; i < tokens.length; i++) {
          const tokenFactoriesID = await GameHelper.getPublishedTokenFactoriesID(gameID, i);
          const gameData = await GameHelper.getPublishedTokenFactoryById(tokenFactoriesID);
          if (gameData.contentTypeName === 'DLC') {
              return gameData;
          }
      }
      return null;
  }

  @step('Check the "Release date" value')
  async checkReleaseDate(data: any): Promise<any> {
      if (this.releaseDate !== null) {
          await expect(await this.getReleaseDate()).toContain(String(data.releaseDate.year));
      }
  }

  @step('Wait for game genres')
  async getGameGenres(): Promise<(string | undefined)[]> {
      const genres = await this.gameGenres;
      const genresList = [];
      for (let i = 0; i < genres.length; i++) {
          const genre = await CommonHelper.getTextContent((await this.gameGenres)[i]);
          genresList.push(genre);
      }
      return genresList;
  }

  @step('Wait for game tags')
  async getGameTags(): Promise<(string | undefined)[]> {
      const tagsList: (string | undefined)[] = [];
      for await (const element of await this.gameTags) {
          try {
              const tag = await element.evaluate((el) => el.textContent?.trim());
              tagsList.push(tag);
          } catch (error) {
              tagsList.push(undefined);
          }
      }
      return tagsList;
  }

  @step('Wait for game Developer')
  async getGameDeveloper(): Promise<(string | undefined)> {
      return await CommonHelper.getTextContent(await this.gameDeveloper);
  }

  @step('Wait for game Editor')
  async getGameEditor(): Promise<(string | undefined)> {
      return await CommonHelper.getTextContent(await this.gameEditor);
  }

  @step('Wait for playing modes')
  async getGamePlayingModes(): Promise<(string | undefined)[]> {
      const modesList: (string | undefined)[] = [];
      for await (const element of await this.gameModes) {
          try {
              const mode = await element.evaluate((el) => el.textContent?.trim());
              modesList.push(mode);
          } catch (error) {
              modesList.push(undefined);
          }
      }
      return modesList;
  }

  @step('Check the "External Links" section')
  async checkExternalLinks(gameData: any): Promise<void> {
      const externalLinks = await this.page.$(this.externalLinks);
      if (externalLinks !== null) {
          await expect(await this.getExternalLinks()).toBe('External Links');
          await expect(await this.getExternalLinkName()).toContain(gameData.links[0].name);
          await expect(await this.getExternalUrl()).toContain(gameData.links[0].url);
      }
  }

  @step('Wait for game features')
  async getGameFeatures(): Promise<(string | undefined)[]> {
      const gameFeaturesList: (string | undefined)[] = [];
      for await (const element of await this.gameFeatures) {
          try {
              const arr = await element.evaluate((el) => el.textContent?.trim());
              gameFeaturesList.push(arr);
          } catch (error) {
              gameFeaturesList.push(undefined);
          }
      }
      return gameFeaturesList;
  }

  @step('Check the "Requirements" data')
  async checkRequirements(container: string, gameData: any): Promise<void> {
      await expect(await this.getRequirements(container, 'os')).toContain(gameData.os);
      await expect(await this.getRequirements(container, 'processor')).toContain(gameData.processor);
      await expect((await this.getRequirements(container, 'memory')).toLowerCase()).toContain(gameData.memory);
      await expect(await this.getRequirements(container, 'graphics')).toContain(gameData.graphics[0]);
      await expect((await this.getRequirements(container, 'storage')).toLowerCase()).toContain(gameData.storage);
      await expect(await this.getRequirements(container, 'soundCard')).toContain(gameData.soundCard);
      await expect(await this.getRequirements(container, 'minimumResolution')).toContain(gameData.minimumResolution);
  }

  @step('Get the "recommended game" list')
  async getRecommendedGameNameList(): Promise<any> {
      await CommonHelper.scrollToElement(await this.recommendedGameList);
      return this.page.evaluate((data) => {
          const gameListName = document.querySelectorAll(data);
          const gameTitleElements = Array.from(gameListName, el => el.innerText);
          try {
              return gameTitleElements.map((e: string) => e.substring(0, 10));
          } catch (err) {
              return null;
          }
      }, this.recommendedGames);
  }

  @step('Open the first recommended game')
  async openFistRecommendedGame(): Promise<void> {
      await CommonHelper.hoverAndClick(await this.recommendedGameList);
  }

  @step('Check filter by genre')
  async checkFilterByGenre(genres: string[]): Promise<void> {
      for (let i = 0; i < genres.length; i++) {
          await expect(await this.getGameGenres()).toContain(genres[i]);
      }
  }

  @step('Check filter game by playing mode')
  async checkFilterByMode(modes: string[]): Promise<void> {
      for (let i = 0; i < modes.length; i++) {
          await expect(await this.getGamePlayingModes()).toContain(modes[i]);
      }
  }

  @step('Check feature icon inside game details page')
  async checkFeatureIcon(feature: string): Promise<void> {
      switch (feature) {
          case 'Achievements':
              await this.featureIcons('achievements');
              break;
          case 'Beta':
              await this.featureIcons('beta');
              break;
          case 'Cloud Save':
              await this.featureIcons('cloud save');
              break;
          case 'Controller Support':
              await this.featureIcons('controller support');
              break;
          case 'Early-Access':
              await this.featureIcons('early-access');
              break;
          case 'Ingame Items':
              await this.featureIcons('ingame items');
              break;
          case 'Leaderboard':
              await this.featureIcons('leaderboard');
              break;
          case 'Secure Anti-Cheat':
              await this.featureIcons('secure anti-cheat');
              break;
          case 'Vr Support':
              await this.featureIcons('vr support');
              break;
          case 'Workshop Mods':
              await this.featureIcons('workshop mods');
              break;
          case 'Transferable':
              await this.featureIcons('transferable');
              break;
          case 'Resalable':
              await this.featureIcons('resalable');
              break;
          default:
              throw new Error(`Cannot find requested feature icon inside the game details page! - ${feature}`);
      }
  }

  @step('Check filter game by feature')
  async checkFilterByFeature(features: string[]): Promise<void> {
      for (let i = 0; i < features.length; i++) {
          await this.checkFeatureIcon(features[i]);
      }
  }

  @step('Open geofencing window')
  async openGeofencingWindow(): Promise<void> {
      await this.openTokenPreviewWindow();
      await this.openTokenPreviewProperties();
      await this.openTokenGeofencing();
  }

  @step('Select European region')
  async selectEuropeanRegion(): Promise<void> {
      await (await this.geofencingRegionDropdown)!.click();
      await (await this.geofencingRegionEuropean)!.click();
  }

  @step('Count geofencing available countries')
  async geofencingAvailableCountryCount(): Promise<number> {
      await (await this.geofencingAvailableFilter)!.click();
      return (await CommonHelper.waitForSelectors$$(this.page, this.geofencingCountry)).length;
  }

  @step('Count geofencing not available countries')
  async geofencingNotAvailableCountryCount(): Promise<number> {
      await (await this.geofencingNotAvailableFilter)!.click();
      return (await this.page.$$(this.geofencingCountry)).length;
  }

  @step('Search country in geofencing')
  async searchCountryGeofencing(country:string): Promise<void> {
      await (await this.geofencingSearchBtn)!.click();
      await (await this.geofencingSearchInput)!.type(country);
  }

  @step('Click on get free button')
  async clickGetFreeBtn(): Promise<void> {
      await CommonHelper.scrollAndClick(await this.getFreeBtn);
  }

  @step('Click on purchase DLC button')
  async clickOnPurchaseDlcButton(): Promise<void> {
      await CommonHelper.scrollAndClick(await this.purchaseDlc);
  }

  @step('Check the game has "Already Purchased" status')
  async checkAlreadyPurchasedGame(gameName: any) {
      const purchasedGame = await (
        await this.gameToken(gameName))!.$eval(this.alreadyPurchasedBtn, (el) => el.textContent
        );
      await expect(purchasedGame).toBe(data.alreadyPurchased);
  }
}
