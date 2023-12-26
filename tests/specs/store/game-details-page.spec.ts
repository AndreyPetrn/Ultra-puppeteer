import { CommonHelper } from '../../helpers/common.helper';
import { StorePage } from '../../pageobjects';
import { UserDataHelper } from '../../helpers/data-helpers/user.data.helper';
import { login } from '../../helpers/login';
import { GameHelper } from '../../helpers/api-helpers/game.api.helper';
import { GameDetailsPage } from '../../pageobjects/store/game-details-page';
import { storeDataHelper } from '../../helpers/data-helpers/store.data.helper';

const browser = CommonHelper.browser();
const user = UserDataHelper.getUser('second_user');
const gameInfo = storeDataHelper.getDefaultGame();

describe('Game details page', () => {

    afterAll(async () => {
        await CommonHelper.closeBrowser(await browser);
    });

    it('Check game details page', async () => {
        reporter
            .addLabel('AS_ID', '630')
            .addLabel('Dimension', 'Ultra Games')
            .feature('Game details page');

        await login(await browser, await user);

        // Search a game using top search bar
        const storePage = await StorePage.getInstance(await browser);
        await storePage.clickStoreBtn();
        await storePage.waitForDisplayed();
        await storePage.searchBrowseGamesSection(gameInfo);
        await expect(await storePage.getSearchedGameName()).toContain(gameInfo.gameName);
        const gameID = await GameHelper.getFirstGameIdFromList(gameInfo.gameName);
        const gameData = await GameHelper.getAllGameDataFromList(gameID);

        // Open the game's details page
        await storePage.openFirstGame();

        // Check breadcrumbs
        const gameDetailsPage = await GameDetailsPage.getInstance(await browser);
        await expect(await gameDetailsPage.getBreadcrumbs()).toContain('Game Store');
        await expect(await gameDetailsPage.getBreadcrumbs()).toContain(gameInfo.gameName);
        await expect(await gameDetailsPage.getBreadcrumbs()).toContain(gameData.title);

        // Check the game header
        await expect(await gameDetailsPage.gameNameText()).toContain(gameData.title);
        await expect(gameData.descriptionShort).toContain(await gameDetailsPage.getShortDescription());
        await gameDetailsPage.checkGallery(gameData.largeHeroImage, gameData.boxArtImage, gameData.videoId);

        // Check the "Buying options"
        await gameDetailsPage.ages18Continue();
        await gameDetailsPage.checkBuyingOptions();
        await gameDetailsPage.checkTokenizedGame(gameID);
        await gameDetailsPage.checkLegacyGame(gameID);
        await gameDetailsPage.checkDlcToken(gameID);

        // Check the "Game details"
        await gameDetailsPage.checkReleaseDate(gameData);
        await expect(await gameDetailsPage.getGameGenres()).toStrictEqual(gameData.genres);
        await expect(await gameDetailsPage.getGameTags()).toStrictEqual(gameData.tags);
        await expect(await gameDetailsPage.getGameDeveloper()).toStrictEqual(gameData.developer);
        await expect(await gameDetailsPage.getGameEditor()).toStrictEqual(gameData.editor);
        await expect(await gameDetailsPage.getGamePlayingModes()).toStrictEqual(gameData.playingModes);

        // Check the "About game"
        await expect(gameData.descriptionShort).toContain(await gameDetailsPage.getShortGameDescription());
        await expect(gameData.description).toContain(await gameDetailsPage.getGameDescription());
        await gameDetailsPage.checkExternalLinks(gameData);
        await expect(await gameDetailsPage.getGameLanguages()).toBeGreaterThanOrEqual(1);
        await expect(await gameDetailsPage.getGameFeatures()).toStrictEqual(gameData.features);

        // Check the "System requirements"
        await gameDetailsPage.checkRequirements('minimum', gameData.minimumRequirements);
        await gameDetailsPage.checkRequirements('recommended', gameData.recommendedRequirements);

        // Check the "Related Games"
        const firstGenre = await gameDetailsPage.getFirstGenre();
        await expect(await GameHelper.getRecommendedGameList(firstGenre))
            .toStrictEqual(await gameDetailsPage.getRecommendedGameNameList());

        // Navigate to a related game
        const firstRecommendedGame = await gameDetailsPage.getFirstRecommendedGame();
        await gameDetailsPage.openFistRecommendedGame();

        // Check the breadcrumbs
        await expect(await gameDetailsPage.getBreadcrumbs()).toContain('Game Store');
        await expect(await gameDetailsPage.getBreadcrumbs()).toContain(firstRecommendedGame);

        // Open the "Store" page
        await gameDetailsPage.clickStoreBtn();
        await expect(await storePage.getRecommendedGamesCount()).toBeGreaterThanOrEqual(1);
    });
});
