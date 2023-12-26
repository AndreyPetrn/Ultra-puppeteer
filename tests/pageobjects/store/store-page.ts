import { Browser, ElementHandle } from 'puppeteer';

import { CommonHelper } from '../../helpers/common.helper';
import { GameHelper } from '../../helpers/api-helpers/game.api.helper';
import { step } from '../../helpers/allure.helper';

const config = require('../../../config/config.data.json').env;
const data = require('../../../test-data/page-data.json').Store;
type genreSelector = ['action' | 'rpg' | 'flight' | 'adventure' | 'fighting' | 'fps' | 'indie' | 'puzzle' | 'racing' | 'simulation' | 'strategy' | 'sports'];
type tagSelector = ['2022' | 'topcars' | 'race'];

export class StorePage extends CommonHelper {
  @step('Wait for open Store page')
    static async getInstance(browser: Browser): Promise<StorePage> {
        return new StorePage(await this.getPageFromClient(browser, config.STORE.URL));
    }

  private get recommendedGamesSlides(): Promise<ElementHandle[]> {
      return CommonHelper.waitForSelectors$$(this.page,'ultra-recommended-games-slideshow ultra-game-item-slideshow:not(.swiper-slide-duplicate ultra-game-item-slideshow)', {timeout: 70000});
  }

  private get searchGame(): Promise<ElementHandle<SVGElement | HTMLElement> | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="navbar-search-input"]');
  }

  private get searchBrowseGames(): Promise<ElementHandle<SVGElement | HTMLElement> | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="browse-game-search-form"]');
  }

  private get foundGame(): Promise<ElementHandle|null> {
      return CommonHelper.waitForSelector(this.page, this.game);
  }

  private get purchaseGame(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="game-detail-price"]');
  }

  private get goToYourLibraryBtn(): Promise<ElementHandle<SVGElement | HTMLElement> | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="navbar-link-/your-library"]');
  }

  private get viewOffers(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '.game-detail-container__button .ng-star-inserted');
  }

  private get dlcOption(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[class="icon icon-dlc-sm ng-star-inserted"]');
  }

  private get firstGame(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '.games-list .preview-container');
  }

  private get firstGameTitle(): Promise<ElementHandle|null> {
      return CommonHelper.waitForSelector(this.page, '.data.game-detail h6');
  }

  private get gameDetails(): Promise<ElementHandle[]> {
      return CommonHelper.waitForSelectors$$(this.page, '.details-block .details-block__characteristic-value');
  }

  private get filterSearchTags(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="filters-tags-search-form"]');
  }

  private filterTags(value: any): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,`[data-id="filter-tags-${value}"]`);
  }

  private filterGroupTxt(value: string): Promise<ElementHandle[]> {
      return CommonHelper.waitForSelectors$$(this.page,`[label="${value}"] [data-id*="checkbox-filter-"]`);
  }

  private get legal(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="legal-link"]');
  }

  private filterGenres(value: any): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,`[data-id="filter-genres-${value}"]`);
  }

  private get gamesList(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '.games-list .align-items-center');
  }

  private get openPageItem(): Promise<ElementHandle[]> {
      return CommonHelper.waitForSelectors$$(this.page, '[class="page-link ng-star-inserted"]');
  }

  private get wishListGameTitle(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '.theme-wishlist .game-name');
  }

  private get addedToWishList(): Promise<ElementHandle[] | null> {
      return CommonHelper.waitForSelectors$$(this.page, this.wishListGamesContainer + this.addedToWishListBtn);
  }

  private get gamesCount(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="pagination-total-count"]');
  }

  private get backArrowFullScreenSearch(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="game-search-back-link"]');
  }

  private get noResultsMessage(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="games-list-no-result"]');
  }

  private get searchedGameName(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="game-item-title"]');
  }

  private get topOfListOfFoundGames(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '.search__dropdown .ps-at-top');
  }

  private get bottomOfListOfFoundGames(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '.search__dropdown .ps-at-bottom');
  }

  private get waitLoadSearchResults(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="games-list-loading-skeleton"]');
  }

  private get gamePriceInBrowseSection(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'.games-list ultra-games-list-item [data-id="games-price"]'); // need inject more context to remove .games-list
  }

  private get gameAccessInBrowseSection(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="game-item-details-btn"]');
  }

  private get walletBalance(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id*="wallet-balance-"]');
  }

  private eyeButton(state: string): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, `[data-id="wallet-balance--${state}"]`);
  }

  private get activeSlideTitle(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '.swiper-slide-active ultra-game-item-slideshow .game__title');
  }

  get activeSlidePriceBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '.swiper-slide-active ultra-game-item-slideshow .price');
  }

  private get activeSlideDarkBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '.swiper-slide-active ultra-game-item-slideshow .btn-dark');
  }

  private activeSlideArrowBtn(arrow: string): Promise<ElementHandle | null> {
      return CommonHelper.waitForXPath(this.page, `//div[@class="ultra-slider theme-carousel"]/div/button[contains(@class, "ultra-slider-button-${arrow}")]`);
  }

  private get changeSlideUsingBottomSelector(): Promise<ElementHandle[]> {
      return CommonHelper.waitForSelectors$$(this.page, '.swiper-pagination-bullet');
  }

  private get dropdownContainer(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="orderByButton"]');
  }

  private get sortedBy(): Promise<ElementHandle[]> {
      return CommonHelper.waitForSelectors$$(this.page, '.dropdown-menu.show button');
  }

  private get suggestedGames(): Promise<ElementHandle[]> {
      return CommonHelper.waitForSelectors$$(this.page, this.suggestedGamesConainer);
  }

  private get gameInfoContainer(): Promise<ElementHandle[]> {
      return CommonHelper.waitForSelectors$$(this.page, 'ultra-pagination-layout [class*="me');
  }

  private get defaultPagination(): Promise<ElementHandle[]> {
      return CommonHelper.waitForSelectors$$(this.page, 'ultra-pagination-layout:nth-child(1) .page-link');
  }

  private get searchedGamesCount(): Promise<ElementHandle[]> {
      return CommonHelper.waitForSelectors$$(this.page, '.dropdown-item.game');
  }

  private get activeGamePage(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, 'ultra-pagination-layout:nth-child(1) .page-item.active');
  }

  private arrowButton(label: string): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, `ultra-pagination-layout:nth-child(1) [aria-label="${label}"]`);
  }

  private get gameDetailsButton(): Promise<ElementHandle[]> {
      return CommonHelper.waitForSelectors$$(this.page, '.swiper-slide-active ultra-game-item-slideshow .btn-slide-show-min-width');
  }

  private get wishlistCarouselTitle(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="wishlist-carousel-title"]');
  }

  private get fullScreenSearchInput(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page,'[data-id="game-search-form-input"]');
  }

  private get emptyWishListMessage(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="wishlist-carousel-empty-text"]');
  }

  protected get gameList(): string {
      return '[data-id="game-item-title"]';
  }

  protected get game(): string {
      return '[data-id="navbar-search-game-name"]';
  }

  protected get clearSearchBtn(): string {
      return '[data-id="navbar-search-close"]';
  }

  protected get suggestedGamesConainer(): string {
      return 'ultra-suggested-games-carousel ultra-game-item-carousel ';
  }

  protected get wishListGamesContainer(): string {
      return 'ultra-your-wishlist-carousel .swiper-slide-active .slide__item ';
  }

  protected get addToWishListBtn(): string {
      return '[data-id="toggle-false"]';
  }

  protected get addedToWishListBtn(): string {
      return '[data-id="toggle-true"]';
  }

  protected get suggestedGameTitle(): string {
      return '.game-container .game-name';
  }

  protected get gameCarouselImg(): string {
      return '.swiper-slide-active ultra-game-item-slideshow img';
  }

  protected get suggestedGameImg(): string {
      return 'ultra-suggested-games-carousel img';
  }

  protected get wishListImg(): string {
      return '.theme-wishlist .swiper-slide-active img';
  }

  protected get gamesListImg(): string {
      return 'ultra-games-list img';
  }

  private get goToStoreBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="navbar-link-/store"]');
  }

  @step('Get the "Game name" from Browse games section')
  async getSearchedGameName(): Promise<string | null | undefined> {
      return await CommonHelper.getTextContent(await this.searchedGameName);
  }

  @step('Check that "No results" message is displayed')
  async getNoResultsMessage(): Promise<string | null | undefined> {
      return await CommonHelper.getTextContent(await this.noResultsMessage);
  }

  @step('Check that price inside the Browse section')
  async getGamePriceInBrowseSection(): Promise<string | null | undefined> {
      return await CommonHelper.getTextContent(await this.gamePriceInBrowseSection);
  }

  @step('Check that price (Early Access) inside the Browse section')
  async getGameAccessInBrowseSection(): Promise<string | null | undefined> {
      return await CommonHelper.getTextContent(await this.gameAccessInBrowseSection);
  }

  @step('Get the "Game name" from games carousel')
  async getActiveSlideTitle(): Promise<string | null | undefined> {
      return await CommonHelper.getTextContent(await this.activeSlideTitle);
  }

  @step('Get the "Game" name in wishlist')
  async getWishlistGame(): Promise<string | null | undefined> {
      return await CommonHelper.getTextContent(await this.wishListGameTitle);
  }

  @step('Get the "Games counter" value')
  async getGameCounterValue(container: string): Promise<string | number | null | undefined> {
      const currentPage = await this.gameInfoContainer;
      switch (container) {
          case 'current page':
              return Number(await currentPage[0]!.evaluate(el => el.textContent?.trim()));
          case 'all pages':
              return Number(await currentPage[2]!.evaluate(el => el.textContent?.trim()));
          default:
              throw new Error(`Cannot find requested container! - ${container}`);
      }
  }

  @step('Get the "Current page" number')
  async getCurrentPageNumber(): Promise<string | number | null | undefined> {
      return (await CommonHelper.getTextContent(await this.activeGamePage))!.split(' (')[0];
  }

  @step('Check that the number of displayed games is correct on the page')
  async checkGamesOnPage(totalCount: number, lessThan: number, skip: number): Promise<void> {
      if( totalCount > lessThan) {
          await expect(await GameHelper.getGameList('RELEVANCE',skip)).toStrictEqual(await this.getGameNameList());
      } else {
          await expect(await this.getNumberOfGamesOnPage()).toBe(await this.getGameCounterValue('current page'));
      }
  }

  @step('Sort the games by (Name, Release date, Relevance)')
  async sortGameBy(container: string): Promise<void> {
      await CommonHelper.scrollToElement(await this.dropdownContainer);
      await CommonHelper.scrollAndClick(await this.dropdownContainer);
      await page.waitForTimeout(1000); // needed for stability
      switch (container) {
          case 'Relevance':
              await (await this.sortedBy)[0]!.click();
              break;
          case 'Release date':
              await (await this.sortedBy)[1]!.click();
              break;
          case 'Name':
              await (await this.sortedBy)[2]!.click();
              break;
          default:
              throw new Error(`Cannot find requested container! - ${container}`);
      }
  }

  @step('Get the "Game name" from Browse games section')
  async getGameNameList(): Promise<any> {
      await this.searchedGameName;
      return this.page.evaluate((data) => {
          const gameListName = document.querySelectorAll(data);
          const gameTitleElements = Array.from(gameListName, el => el.innerText);
          try {
              return gameTitleElements.map((e: string) => e.substring(0, 10));
          } catch (err) {
              return null;
          }
      }, this.gameList);
  }

  @step('Check that the list of games is sorted A-Z')
  async checkListIsSorted(arr: string[]): Promise<any> {
      for (let i = 0; i < arr.length - 1; i++) {
          const val = arr[i];
          const nextVal = arr[i + 1];
          if (val.localeCompare(nextVal) > 0) {
              return false;
          }
      }
      return true;
  }

  @step('Click the "Buy" button for one of the games from the carousel')
  async clickPriceBtnOnActiveSlide(): Promise<void> {
      await CommonHelper.hoverAndClick(await this.activeSlidePriceBtn);
  }

  @step('Click the "Learn More" button for one of the games from the carousel.')
  async clickLearnMoreBtnOnActiveSlide(): Promise<void> {
      await CommonHelper.scrollAndClick(await this.activeSlideDarkBtn);
  }

  @step('Navigate through the carousel using left arrow')
  async clickChangeSlideUsingLeftArrow(): Promise<void> {
      await CommonHelper.scrollAndClick(await this.activeSlideArrowBtn('prev'));
  }

  @step('Wait for the change slide')
  async waitForChangeSlide(): Promise<void> {
      await page.waitForTimeout(2000);
  }

  @step('Navigate through the carousel using right arrow')
  async clickChangeSlideUsingRightArrow(): Promise<void> {
      await CommonHelper.scrollAndClick(await this.activeSlideArrowBtn('next'));
  }

  @step('Navigate through the carousel using the bottom selector')
  async clickChangeSlide(selector: number): Promise<void> {
      await CommonHelper.hoverAndClick((await this.changeSlideUsingBottomSelector)[selector]);
      await (await this.gameDetailsButton)[0]!.hover();
  }

  @step('Get the "Wallet balance" value')
  async getWalletBalance(): Promise<string | undefined> {
      await this.recommendedGamesSlides;
      return await CommonHelper.getTextContent(await this.walletBalance);
  }

  @step('Wait for Store page displayed')
  async waitForDisplayed(): Promise<void> {
      await this.searchBrowseGames;
  }

  @step('Get the number of recommended games')
  async getRecommendedGamesCount(): Promise<number> {
      return (await this.recommendedGamesSlides).length;
  }

  @step('Get the number of games on the page')
  async getNumberOfGamesOnPage(): Promise<number> {
      return (await CommonHelper.waitForSelectors$$(this.page, this.gameList)).length;
  }

  @step('Get the "Page number" value')
  async getNumberOfPages(): Promise<number> {
      return (await this.defaultPagination).length;
  }

  @step('Get the "Searched games" count')
  async getSearchedGamesCount(): Promise<number> {
      return (await this.searchedGamesCount).length;
  }

  @step('Go to games Page')
  async goToGamesPage(number: number): Promise<void> {
      await CommonHelper.scrollAndClick((await this.defaultPagination)[number]);
      await this.searchedGameName; // wait for load page
  }

  @step('Go to the last page by clicking on last digit from the navigation panel')
  async goToLastGamesPage(): Promise<number> {
      const number = await this.getNumberOfPages();
      const lastPage = number - 2;
      await CommonHelper.hoverAndClick((await this.defaultPagination)[lastPage]);
      return lastPage;
  }

  @step('Go to the next page by clicking link ">" (arrow button)')
  async clickArrowBtn(label: string): Promise<void> {
      await CommonHelper.hoverAndClick(await this.arrowButton(label));
  }

  @step('Remove the game from the wish list if needed')
  async deleteIfGamesInWishList() {
      await CommonHelper.scrollToElement(await this.wishlistCarouselTitle);
      if (await this.page.$(this.wishListGamesContainer + this.addedToWishListBtn) !== null) {
          for (const wishlistElement of (await this.addedToWishList)!) {
              await CommonHelper.scrollAndClick(wishlistElement); //removes all games from the wishlist
          }
      }
      await this.emptyWishListMessage;
  }

  @step('Search game by name')
  async searchGameByName(gameInfo: any): Promise<void> {
      const searchInput = await this.searchGame;
      await searchInput!.click({ clickCount: 3 });
      const gameName = gameInfo.gameName? gameInfo.gameName : gameInfo;
      await searchInput!.type(gameName, { delay: 100 }); // added delay to wait for results to load
  }

  @step('Search a game using search input from Browse games section')
  async searchBrowseGamesSection(gameInfo: any): Promise<void> {
      await CommonHelper.scrollToElement(await this.searchBrowseGames);
      await CommonHelper.scrollAndClick(await this.searchBrowseGames);
      await CommonHelper.slowType(await this.searchBrowseGames, gameInfo.gameName, 100);
      await this.waitLoadSearchResults;
      await this.page.waitForTimeout(2000); // wait for load results
  }

  @step('Clear the search input')
  async clearSearchInput(): Promise<void> {
      await (await this.searchBrowseGames)!.click({clickCount: 3});
      await (await this.searchBrowseGames)!.press('Backspace');
      await this.waitLoadSearchResults;
      await this.searchedGameName; // wait for load results
  }

  @step('Pick game from list')
  async clickSearchedGame(): Promise<void> {
      await CommonHelper.focusAndClick(await this.foundGame);
  }

  @step('Click on one of the search results')
  async clickSearchedBrowseGame(): Promise<void> {
      await CommonHelper.hoverAndClick(await this.searchedGameName);
  }

  @step('Check game search results')
  async checkGameSearchResults(gameInfo?: any): Promise<void> {
      await this.searchedGameName; // wait for load results
      //if gameInfo present - compare names, if missing - check that there are no results
      if(gameInfo) {
          expect(await CommonHelper.getTextContent(await this.foundGame)).toBe(gameInfo.gameName);
      } else {
          await this.page.waitForSelector(this.game, {hidden: true});
      }
  }

  @step('Scroll the found games list')
  async scrollGameResults(gamesCount: number): Promise<void> {
      await this.topOfListOfFoundGames;
      await (await CommonHelper.waitForSelectors$$(this.page, this.game))[gamesCount]!.hover();
      await this.bottomOfListOfFoundGames;
  }

  @step('Clear search')
  async clearSearch(): Promise<void> {
      await CommonHelper.hoverAndClick(await CommonHelper.waitForSelector(this.page, this.clearSearchBtn));
      await this.page.waitForSelector(this.clearSearchBtn, {visible: false});
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

  @step('Search and go full screen')
  async goFullScreenSearch(gameInfo: any): Promise<void> {
      await CommonHelper.slowType(await this.searchGame, gameInfo.gameName? gameInfo.gameName: gameInfo, 100);
      await (await this.searchGame)!.press('Enter');
      await this.fullScreenSearchInput;
  }

  @step('Search a game using full screen search')
  async searchGameFullScreen(gameInfo: any): Promise<void> {
      await CommonHelper.slowType(await this.fullScreenSearchInput, gameInfo.gameName, 100);
      await this.page.waitForTimeout(2000); // waiting for the search results to appear
  }

  @step('Check search results from Browse games')
  async checkBrowseGamesSearchResults(gameInfo: any): Promise<void> {
      expect(await CommonHelper.getTextContent(await this.firstGameTitle))
          .toContain(gameInfo.gameName? gameInfo.gameName: gameInfo);
  }

  @step('Go back from full screen search')
  async closeFullScreenSearch(): Promise<void> {
      await CommonHelper.scrollAndClick(await this.backArrowFullScreenSearch);
  }

  @step('Click Legal link')
  async clickLegal(): Promise<void> {
      await this.waitForDisplayed();
      await CommonHelper.scrollAndClick(await this.legal);
  }

  @step('Get the "Game price" value')
  async getGamePrice(): Promise<string> {
      return (await CommonHelper.getTextContent(await this.purchaseGame))!.split('$', 2)[1];
  }

  @step('Reload page')
  async reloadPage() {
      await CommonHelper.reloadPage(this.page);
  }

  @step('Get the "Wishlist message" value')
  async getWishListText(): Promise<string | undefined> {
      return CommonHelper.getTextContent(await this.emptyWishListMessage);
  }

  @step('Check wishlist is empty')
  async checkWishlistEmpty() {
      await expect(await this.getWishListText()).toContain(data.wishList);
  }

  @step('Click on purchase game button')
  async clickOnPurchaseGameButton(): Promise<void> {
      await CommonHelper.hoverAndClick(await this.purchaseGame);
  }

  @step('Click on view offers button')
  async clickViewOffers(): Promise<void> {
      await CommonHelper.hoverAndClick(await this.viewOffers);
  }

  @step('Click on DLC option')
  async clickOnDlcOption(): Promise<void> {
      await CommonHelper.hoverAndClick(await this.dlcOption);
  }

  @step('Click on your library button from main game store page')
  async clickGoToYourLibraryButton(): Promise<void> {
      await CommonHelper.hoverAndClick(await this.goToYourLibraryBtn);
  }

  @step('Click on purchase game button')
  async clickOnPurchaseGame(): Promise<any> {
      await CommonHelper.hoverAndClick((await this.openPageItem)[2]);
      await CommonHelper.hoverAndClick(await this.gamesList);
  }

  @step('Get the "Game details" value')
  async getGameDetails(block: number): Promise<string | undefined> {
      return await CommonHelper.getTextContent((await this.gameDetails)[block]);
  }

  @step('Filter genre')
  async filterGenre(genre: genreSelector): Promise<void> {
      await CommonHelper.scrollAndClick(await this.filterGenres(genre));
      await this.page.waitForTimeout(3000); // wait for load games
  }

  @step('Open the first game details page')
  async openFirstGame(): Promise<void> {
      await CommonHelper.scrollToElement(await this.firstGame);
      await this.page.waitForTimeout(2000); // wait for load games
      await CommonHelper.hoverAndClick(await this.firstGame);
  }

  @step('Check filter by genre')
  async checkFilterByGenre(genres: genreSelector[]): Promise<void> {
      for (let i = 0; i < genres.length; i++) {
          await this.filterGenre(genres[i]);
      }
      await this.openFirstGame();
  }

  @step('Filter tag')
  async filterTag(tag: tagSelector): Promise<void> {
      await CommonHelper.scrollToElement(await this.filterSearchTags); //reduce flakiness
      await CommonHelper.scrollAndClick(await this.filterSearchTags);
      await CommonHelper.setValue(await this.filterSearchTags, tag);
      await CommonHelper.scrollAndClick(await this.filterTags(tag));
      await this.page.waitForTimeout(3000); // wait for load games
  }

  @step('Check filter by tag')
  async checkFilterByTag(tag: tagSelector): Promise<void> {
      await this.filterTag(tag);
      await this.openFirstGame();
  }

  @step('Filter by playing mode')
  async filterPlayingMode(mode: string): Promise<void> {
      const title = await this.filterGroupTxt('Playing modes');
      let playingMode;
      switch (mode) {
          case 'co-op':
              playingMode = 0;
              break;
          case 'cross-platform':
              playingMode = 1;
              break;
          case 'multi-player':
              playingMode = 2;
              break;
          case 'online co-op':
              playingMode = 3;
              break;
          case 'online multiplayer':
              playingMode = 4;
              break;
          case 'single player':
              playingMode = 5;
              break;
          default:
              throw new Error(`Cannot find requested mode! - ${mode}`);
      }
      await CommonHelper.scrollAndClick(title[playingMode]);
      await this.page.waitForTimeout(3000); // wait for load games
  }

  @step('Check filter game by playing mode')
  async checkFilterByMode(modes: string[]): Promise<void> {
      for (let i = 0; i < modes.length; i++) {
          await this.filterPlayingMode(modes[i]);
      }
      await this.openFirstGame();
  }

  @step('Get feature order number')
  private async getFeatureNum(feature: string): Promise<number> {
      switch (feature) {
          case 'Achievements':
              return 0;
          case 'Beta':
              return 1;
          case 'Cloud Save':
              return 2;
          case 'Controller Support':
              return 3;
          case 'Early-Access':
              return 4;
          case 'Ingame Items':
              return 5;
          case 'Leaderboard':
              return 6;
          case 'Resalable':
              return 7;
          case 'Secure Anti-Cheat':
              return 8;
          case 'Transferable':
              return 9;
          case 'Vr Support':
              return 10;
          case 'Workshop Mods':
              return 11;
          default:
              throw new Error(`Cannot find requested feature! - ${feature}`);
      }
  }

  @step('Filter game by feature')
  async filterFeature(feature: string): Promise<void> {
      await CommonHelper.scrollAndClick((await this.filterGroupTxt('Features'))[await this.getFeatureNum(feature)]);
      await this.page.waitForTimeout(3000); // wait for load games
  }

  @step('Check filter game by feature')
  async checkFilterByFeature(features: string[]): Promise<void> {
      for (let i = 0; i < features.length; i++) {
          await this.filterFeature(features[i]);
      }
      await this.openFirstGame();
  }

  @step('Check filter game by genre and playing modes')
  async checkFilterByGenreAndPlayingMode(genre: genreSelector, playingMode: string): Promise<void> {
      await this.filterGenre(genre);
      await this.filterPlayingMode(playingMode);
      await this.openFirstGame();
  }

  @step('Check filter game by tag and features')
  async checkFilterByTagAndFeature(tag: tagSelector, feature: string): Promise<void> {
      await this.filterTag(tag);
      await this.filterFeature(feature);
      await this.openFirstGame();
  }

  @step('Check filter game by all filters')
  async checkFilterByAll(genre: genreSelector, tag: tagSelector, mode: string, feature: string): Promise<void> {
      await this.filterGenre(genre);
      await this.filterTag(tag);
      await this.filterPlayingMode(mode);
      await this.filterFeature(feature);
      await CommonHelper.scrollToElement(await this.firstGame);
      await this.openFirstGame();
  }

  @step('Get the "Games count" value')
  async getGamesCount(): Promise<string | undefined> {
      return await CommonHelper.getTextContent(await this.gamesCount);
  }

  @step('Get the number of suggested games')
  async getSuggestedGamesCount(): Promise<number> {
      return (await this.suggestedGames).length;
  }

  @step('Add random suggested game to wishlist')
  async addSuggestedToWishlist(): Promise<string | null> {
      const suggestedGames = await this.suggestedGames;
      const suggestedGame = suggestedGames[Math.floor(Math.random()*suggestedGames.length)];
      const addedToWishListSuggested = await suggestedGame.$(this.addedToWishListBtn);
      await CommonHelper.scrollToElement(suggestedGames[0]);
      await this.page.waitForTimeout(3000);
      if (addedToWishListSuggested !== null) {
          await CommonHelper.scrollAndClick(addedToWishListSuggested);
      }
      await CommonHelper.scrollAndClick(await suggestedGame.$(this.addToWishListBtn));
      await this.addedToWishList;

      return suggestedGame.$eval(this.suggestedGameTitle, (el) => el.textContent);
  }

  @step('Open random suggested game')
  async openSuggestedGame(): Promise<string | null> {
      const suggestedGames = await this.suggestedGames;
      const suggestedGame = suggestedGames[Math.floor(Math.random()*suggestedGames.length)];
      const gameName: ElementHandle<HTMLElement> | null = await suggestedGame.$(this.suggestedGameTitle); // otherwise doesn't want to click it
      const gameNameText = await gameName!.evaluate((el) => el.textContent);
      await gameName!.evaluate((el) => (el).click());
      return gameNameText;
  }

  @step('Add first suggested game to wishlist')
  async addFirstSuggestedToWishlist(): Promise<void> {
      const addToWishListSuggestedBtn = await CommonHelper
          .waitForSelector(this.page, this.suggestedGamesConainer + this.addToWishListBtn);
      await CommonHelper.scrollAndClick(addToWishListSuggestedBtn);
      await this.addedToWishList;
  }

  @step('Get the link to the game image')
  async getlinkToGameImage(game: string): Promise<string | null> {
      let selector;
      switch (game) {
          case 'game carousel':
              selector = this.gameCarouselImg;
              break;
          case 'suggested game':
              selector = this.suggestedGameImg;
              break;
          case 'wish list':
              selector = this.wishListImg;
              break;
          case 'games list':
              selector = this.gamesListImg;
              break;
          default:
              throw new Error(`Cannot find game image! - ${game}`);
      }
      const element = await CommonHelper.waitForSelector(this.page, selector);
      const url = await (element)!.evaluate(el => el.getAttribute('src'));
      return String(url).substring(String(url).length - 50);
  }

  @step('Open the details of the first game from the list')
  async openFistGameFromList(): Promise<void> {
      await CommonHelper.hoverAndClick(await this.firstGame);
  }

  @step('Click store btn')
  async clickStoreBtn() {
      await CommonHelper.scrollAndClick(await this.goToStoreBtn);
  }
}
