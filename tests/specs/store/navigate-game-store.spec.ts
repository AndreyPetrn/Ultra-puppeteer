// @ts-ignore
import * as faker from 'faker';

import { AccountPage } from '../../pageobjects/account-settings/account-page';
import { CommonApiHelper } from '../../helpers/api-helpers/common.api.helper';
import { CommonHelper } from '../../helpers/common.helper';
import { GameDetailsPage } from '../../pageobjects/store/game-details-page';
import { GameHelper } from '../../helpers/api-helpers/game.api.helper';
import { StorePage } from '../../pageobjects';
import { UserDataHelper } from '../../helpers/data-helpers/user.data.helper';
import { login } from '../../helpers/login';
import { storeDataHelper } from '../../helpers/data-helpers/store.data.helper';

const browser = CommonHelper.browser();
const user = UserDataHelper.getUser('const');
const data = require('../../../test-data/page-data.json').Store;
const gameInfo = storeDataHelper.getDefaultGame();
const freeGame = storeDataHelper.getFreeGameData();

describe('Game store main page', () => {

    afterAll(async () => {
        await CommonHelper.closeBrowser(await browser);
    });

    it('Browse the games using filters', async () => {
        reporter
            .addLabel('AS_ID', '245')
            .addLabel('Dimension', 'Ultra Games')
            .feature('Game store main page');

        await login(await browser, await user);

        // Get total games count
        const storePage = await StorePage.getInstance(await browser);
        const gamesCount = await storePage.getGamesCount();

        // Filter games by single genre and check what is displayed in details
        await storePage.checkFilterByGenre([data.action]);
        const gameDetailsPage = await GameDetailsPage.getInstance(await browser);
        await gameDetailsPage.checkFilterByGenre([data.action]);
        await gameDetailsPage.clickStoreBtn();

        // Filter games by two genres and check what is displayed in details
        await storePage.checkFilterByGenre([data.rpg, data.adventure]);
        await gameDetailsPage.checkFilterByGenre([data.rpg, data.adventure]);
        await gameDetailsPage.clickStoreBtn();

        // Filter games by genre and then remove the applied filter - check the games count is correct
        await storePage.filterGenre(data.action);
        await storePage.filterGenre(data.action); // removes the applied filter
        await expect(await storePage.getGamesCount()).toEqual(gamesCount);

        // Filter games by tag and check what is displayed in details.
        await storePage.checkFilterByTag(data.tag2022);
        await expect(await gameDetailsPage.getGameTags()).toContain(data.tag2022);
        await gameDetailsPage.clickStoreBtn();

        // Filter games by tag and then remove the applied filter - check the games count is correct
        await storePage.filterTag(data.tag2022);
        await storePage.filterTag(data.tag2022); // removes the applied filter
        await expect(await storePage.getGamesCount()).toEqual(gamesCount);

        // Filter game by playing mode and check what is displayed in details.
        await storePage.checkFilterByMode([data.coop]);
        await gameDetailsPage.checkFilterByMode([data.coop]);
        await gameDetailsPage.clickStoreBtn();

        // Filter game by two playing modes and check what is displayed in details.
        await storePage.checkFilterByMode([data.multiPlayer, data.singlePlayer]);
        await gameDetailsPage.checkFilterByMode([data.multiPlayer, data.singlePlayer]);
        await gameDetailsPage.clickStoreBtn();

        // Filter games by playing mode and then remove the applied filter - check the games count is correct
        await storePage.filterPlayingMode(data.coop);
        await storePage.filterPlayingMode(data.coop); // removes the applied filter
        await expect(await storePage.getGamesCount()).toEqual(gamesCount);

        // Filter game by single feature and check what is displayed in details
        await storePage.checkFilterByFeature([data.beta]);
        await gameDetailsPage.checkFilterByFeature([data.beta]);
        await gameDetailsPage.clickStoreBtn();

        // Filter game by two features and check what is displayed in details
        await storePage.checkFilterByFeature([data.leaderboard, data.vrSupport]);
        await gameDetailsPage.checkFilterByFeature([data.leaderboard, data.vrSupport]);
        await gameDetailsPage.clickStoreBtn();

        // Filter games by feature and then remove the applied filter - check the games count is correct
        await storePage.filterFeature(data.beta);
        await storePage.filterFeature(data.beta); // removes the applied filter
        await expect(await storePage.getGamesCount()).toEqual(gamesCount);

    // todo - GP-16093 - User is able to freeze page clicking on the filter at the page loading
    // // Filter game by genre and playing modes.Check what is displayed in details
    // await storePage.checkFilterByGenreAndPlayingMode(data.flight, data.singlePlayer);
    // await expect(await gameDetailsPage.getGameGenres()).toContain(data.flight);
    // await expect(await gameDetailsPage.getGamePlayingModes()).toContain(data.singlePlayer);
    // await gameDetailsPage.clickStoreBtn();
    //
    // // Filter game by tag and features.Check what is displayed in details
    // await storePage.reloadPage();
    // await storePage.waitForDisplayed();
    // await storePage.checkFilterByTagAndFeature(data.topCars, data.leaderboard);
    // await expect(await gameDetailsPage.getGameTags()).toContain(data.topCars);
    // await gameDetailsPage.checkFeatureIcon(data.leaderboard);
    // await gameDetailsPage.clickStoreBtn();
    //
    // // Filter game by all filters and check what is displayed in details
    // await storePage.checkFilterByAll(data.adventure, data.topCars, data.multiPlayer, data.leaderboard);
    // await expect(await gameDetailsPage.getGameGenres()).toContain(data.adventure);
    // await expect(await gameDetailsPage.getGameTags()).toContain(data.topCars);
    // await expect(await gameDetailsPage.getGamePlayingModes()).toContain(data.multiPlayer);
    // await gameDetailsPage.checkFeatureIcon(data.leaderboard);
    });

    it('Navigate through the games carousel', async () => {
        reporter
            .addLabel('AS_ID', '252')
            .addLabel('Dimension', 'Ultra Games')
            .feature('Game store main page');

        // See 2 recommended games
        const storePage = await StorePage.getInstance(await browser);
        await storePage.clickStoreBtn();
        await storePage.waitForDisplayed();
        await expect(await storePage.getRecommendedGamesCount()).toBeGreaterThanOrEqual(2);

        // Check that content is changed by clicking the arrows, selector from the bottom of the carousel is changed correspondingly
        let gameName = await storePage.getActiveSlideTitle();
        await storePage.clickChangeSlideUsingRightArrow();
        await storePage.waitForChangeSlide();
        let gameNameAfterChange = await storePage.getActiveSlideTitle();
        await expect(gameName).not.toBe(gameNameAfterChange);

        // Navigate through the carousel using the bottom selector
        gameName = await storePage.getActiveSlideTitle();
        await storePage.clickChangeSlide(0);
        await storePage.waitForChangeSlide();
        gameNameAfterChange = await storePage.getActiveSlideTitle();
        await expect(gameName).not.toBe(gameNameAfterChange);

        // Open game details page using the "Learn More" button
        gameName = await storePage.getActiveSlideTitle();
        await storePage.clickLearnMoreBtnOnActiveSlide();

        const gameDetailsPage = await GameDetailsPage.getInstance(await browser);
        let checkGameDetails = await gameDetailsPage.getGameNameTxt();
        await expect(gameName).toBe(checkGameDetails);

        // Return back to the main Games Store page
        await gameDetailsPage.clickStoreBtn();

        // Open game details page using the "Buy" button
        await storePage.activeSlidePriceBtn;
        gameName = await storePage.getActiveSlideTitle();
        await storePage.clickPriceBtnOnActiveSlide();
        checkGameDetails = await gameDetailsPage.getGameNameTxt();
        await expect(gameName).toBe(checkGameDetails);

        // Return back to the main Games Store page
        await gameDetailsPage.clickStoreBtn();

        // Navigate through the gallery preview using arrows
        gameName = await storePage.getActiveSlideTitle();
        await storePage.clickChangeSlideUsingRightArrow();
        await storePage.waitForChangeSlide();
        gameNameAfterChange = await storePage.getActiveSlideTitle();
        await expect(gameName).not.toBe(gameNameAfterChange);
        await gameDetailsPage.clickStoreBtn();
    });

    it('Navigate through the game results pages', async () => {
        reporter
            .addLabel('AS_ID', '256')
            .addLabel('Dimension', 'Ultra Games')
            .feature('Game store main page');

        // Compare game counter with DB data
        const storePage = await StorePage.getInstance(await browser);
        await storePage.clickStoreBtn();
        await storePage.waitForDisplayed();
        const gamesOfTotalGQL = await GameHelper.getGameTotal();
        await expect(gamesOfTotalGQL.totalCount).toBe(await storePage.getGameCounterValue('all pages'));

        // Compare counter and number of games on page
        await expect(await storePage.getNumberOfGamesOnPage()).toBe(await storePage.getGameCounterValue('current page'));

        // Open the second page using "2" button
        await expect(await storePage.getNumberOfPages()).toBeGreaterThanOrEqual(4);
        await storePage.goToGamesPage(2);
        await expect(await storePage.getCurrentPageNumber()).toContain('2');
        await storePage.checkGamesOnPage(gamesOfTotalGQL.totalCount, 29, 15);

        // Open the next page using arrow button
        await expect(await storePage.getNumberOfPages()).toBeGreaterThanOrEqual(5);
        await storePage.clickArrowBtn('Next');
        await expect(await storePage.getCurrentPageNumber()).toContain('3');
        await storePage.checkGamesOnPage(gamesOfTotalGQL.totalCount, 44, 30);

        // Open the last page using navigation panel
        await storePage.goToLastGamesPage();
        const lastPage = await storePage.getCurrentPageNumber();
        await expect(await storePage.getNumberOfGamesOnPage()).toBe(await storePage.getGameCounterValue('current page'));

        // Open the previous page using arrow button
        await storePage.clickArrowBtn('Previous');
        const previousPage = Number(lastPage) - 1;
        await expect(await storePage.getCurrentPageNumber()).toContain(String(previousPage));
        const gameNumberToSkip = ( previousPage - 1 ) * 15;
        await expect(await GameHelper.getGameList('RELEVANCE', gameNumberToSkip)).toStrictEqual(await storePage.getGameNameList());

        // Open the first page using "1" button
        await storePage.goToGamesPage(1);
        await expect(await storePage.getCurrentPageNumber()).toContain('1');
        await expect(await GameHelper.getGameList('RELEVANCE',0)).toStrictEqual(await storePage.getGameNameList());
    });

    it('Sort the games', async () => {
        reporter
            .addLabel('AS_ID', '254')
            .addLabel('Dimension', 'Ultra Games')
            .feature('Game store main page');

        // Sort the games by name
        const storePage = await StorePage.getInstance(await browser);
        await storePage.clickStoreBtn();
        await storePage.waitForDisplayed();
        await storePage.sortGameBy('Name');
        const gameListName = await storePage.getGameNameList();
        await expect(await storePage.checkListIsSorted(gameListName)).toBe(true);
        await expect(await GameHelper.getGameList('NAME',0)).toStrictEqual(gameListName);

        // Sort the games by release date
        await storePage.sortGameBy('Release date');
        const gameListReleaseDate = await storePage.getGameNameList();
        await expect(await CommonApiHelper.checkSortGamesByReleaseDate()).toBe(true);
        await expect(await GameHelper.getGameList('RELEASE_DATE',0)).toStrictEqual(gameListReleaseDate);

        // Sort the games by relevance
        await storePage.sortGameBy('Relevance');
        const gameListRelevance = await storePage.getGameNameList();
        await expect(await GameHelper.getGameList('RELEVANCE',0)).toStrictEqual(gameListRelevance);
    });

    it('Navigate through the suggested games', async () => {
        reporter
            .addLabel('AS_ID', '253')
            .addLabel('Dimension', 'Ultra Games')
            .feature('Game store main page');

        // Open Games Store
        const storePage = await StorePage.getInstance(await browser);
        await storePage.clickStoreBtn();
        await storePage.waitForDisplayed();

        // Check that the list of suggested games is present
        await expect(await storePage.getSuggestedGamesCount()).not.toBeNull();

        // Click on one of the games from the suggested list
        const gameTitle = await storePage.openSuggestedGame();

        // Check that game details page for the respective game is displayed
        const gameDetailsPage = await GameDetailsPage.getInstance(await browser);
        await gameDetailsPage.checkGameTitle(gameTitle?.trim());
        await gameDetailsPage.clickStoreBtn();
        await storePage.waitForDisplayed();
    });

    it('Search games using the top search bar', async () => {
        reporter
            .addLabel('AS_ID', '251')
            .addLabel('Dimension', 'Ultra Games')
            .feature('Game store main page');

        // Search a game and check the results
        const storePage = await StorePage.getInstance(await browser);
        await storePage.clickStoreBtn();
        await storePage.waitForDisplayed();
        await storePage.searchGameByName(gameInfo);
        await storePage.checkGameSearchResults(gameInfo);
        await storePage.clickSearchedGame();
        const gameDetailsPage = await GameDetailsPage.getInstance(await browser);
        await gameDetailsPage.checkGameTitle(gameInfo);
        await gameDetailsPage.clickStoreBtn();

        // Search a game and clear the input
        await storePage.searchGameByName(gameInfo);
        await storePage.checkGameSearchResults(gameInfo);
        await storePage.clearSearch();

        // Use the name that returns many games
        await storePage.searchGameByName('Auto');
        await storePage.checkGameSearchResults();
        const gamesCount = await storePage.getSearchedGamesCount();
        await storePage.scrollGameResults(gamesCount - 1);
        await storePage.clearSearch();

        // Add a space character " " at the end of the game name
        await storePage.searchGameByName('Auto   ');
        await storePage.checkGameSearchResults();
        await expect(await storePage.getSearchedGamesCount()).toBe(gamesCount);
        await storePage.clearSearch();

        // Search for a non-existing game
        await storePage.searchGameByName('aaabbbccc');
        await storePage.checkGameSearchResults();
        await storePage.clearSearch();

        // Go to full screen search page
        await storePage.goFullScreenSearch(gameInfo);
        await storePage.checkBrowseGamesSearchResults(gameInfo);

        // Search inside the full screen page
        await storePage.searchGameFullScreen(freeGame);
        await storePage.checkBrowseGamesSearchResults(freeGame);

        // Return back to games store main page
        await storePage.closeFullScreenSearch();
        await storePage.waitForDisplayed();
    });

    it('Browse the games using the bottom search', async () => {
        reporter
            .addLabel('AS_ID', '255')
            .addLabel('Dimension', 'Ultra Games')
            .feature('Game store main page');

        const gameData = storeDataHelper.getFreeGameData();
        const randomGameName = `Random_game_${faker.random.alphaNumeric(5)}`;

        // Search a game using top search bar
        const storePage = await StorePage.getInstance(await browser);
        await storePage.clickStoreBtn();
        await storePage.waitForDisplayed();
        await storePage.searchBrowseGamesSection(gameData);
        await expect(await storePage.getSearchedGameName()).toContain(gameData.gameName);

        // Click on one of the search results
        await storePage.openFirstGame();

        // Check that the game details page for the corresponding game is displayed.
        const gameDetailsPage = await GameDetailsPage.getInstance(await browser);
        expect(await gameDetailsPage.getItemSubName()).toBe(gameData.tokenName);
        expect(await gameDetailsPage.getItemName()).toContain(gameData.gameName);
        expect(await gameDetailsPage.getItemCreatorName()).toBe(gameData.companyName);
        expect(await gameDetailsPage.getItemType()).toBe(gameData.tokenType);

        // Go back to games store
        await gameDetailsPage.clickStoreBtn();
        await storePage.waitForDisplayed();

        // Search a game and then clear the input
        await storePage.searchBrowseGamesSection(gameData);
        await expect(await storePage.getSearchedGameName()).toContain(gameData.gameName);
        await storePage.clearSearchInput();

        // Search for non-existing game
        await storePage.searchBrowseGamesSection({gameName: randomGameName});
        await expect(await storePage.getNoResultsMessage()).toContain(`No result for ''${randomGameName}''`);

        // Clear the input and check that the games is displayed
        await storePage.clearSearchInput();
    });

    it('Add/delete game from the wishlist', async () => {
        reporter
            .addLabel('AS_ID', '244')
            .addLabel('Dimension', 'Ultra Games')
            .feature('Game store main page');

        // Add the game to the wishlist
        let storePage = await StorePage.getInstance(await browser);
        await storePage.clickStoreBtn();
        await storePage.waitForDisplayed();
        await storePage.deleteIfGamesInWishList();
        await storePage.searchGameByName(gameInfo);
        await storePage.clickSearchedGame();

        const gameDetailsPage = await GameDetailsPage.getInstance(await browser);
        await gameDetailsPage.ages18Continue();
        await gameDetailsPage.checkGameTitle(gameInfo);
        await gameDetailsPage.clickAddToWishList();

        // Check that the game is added to the wishlist on the main page
        await gameDetailsPage.clickStoreBtn();
        await storePage.waitForDisplayed();
        await expect(await storePage.getWishlistGame()).toEqual(gameInfo.gameName);

        // Open the game again and remove it from the wishlist
        await storePage.searchGameByName(gameInfo);
        await storePage.clickSearchedGame();
        await gameDetailsPage.ages18Continue();
        await gameDetailsPage.clickRemoveWishList();

        // Check that the game is removed from the wishlist on the main page
        await gameDetailsPage.clickStoreBtn();
        await storePage.waitForDisplayed();
        await storePage.checkWishlistEmpty();

        // Open the game and add it to the wishlist
        await storePage.searchGameByName(gameInfo);
        await storePage.clickSearchedGame();
        await gameDetailsPage.ages18Continue();
        await gameDetailsPage.clickAddToWishList();

        // Return to the wishlist on the main page and remove the game from there
        await gameDetailsPage.clickStoreBtn();
        await storePage.waitForDisplayed();
        await storePage.deleteIfGamesInWishList();

        // Check that the game is removed from the wishlist on the main page
        await storePage.checkWishlistEmpty();

        // Check that the game is removed from the game details page wishlist
        await storePage.searchGameByName(gameInfo);
        await storePage.clickSearchedGame();
        await gameDetailsPage.ages18Continue();
        await gameDetailsPage.checkGameNotInWishlist();

        // Return to the main Games Store page
        await gameDetailsPage.clickStoreBtn();
        await storePage.waitForDisplayed();

        // Add a game from the list of suggested games to wishlist
        const gameName = await storePage.addSuggestedToWishlist();

        //Log out - Log in
        await storePage.clickLegal();
        const accPage = await AccountPage.getInstance(await browser);
        await accPage.clickLogOut();
        await login(await browser, await user);
        await page.waitForTimeout(10000); // wait for the user to login

        // Check that the game is still present in the wishlist
        storePage = await StorePage.getInstance(await browser);
        // await storePage.waitForDisplayed();
        await expect(await storePage.getWishlistGame()).toEqual(gameName?.trim());
        await storePage.deleteIfGamesInWishList();
    });
});
