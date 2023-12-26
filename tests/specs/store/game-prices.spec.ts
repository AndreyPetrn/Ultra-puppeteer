import { LoginPage, StorePage } from '../../pageobjects';
import { AccountPage } from '../../pageobjects/account-settings/account-page';
import { CommonHelper } from '../../helpers/common.helper';
import { UserDataHelper } from '../../helpers/data-helpers/user.data.helper';
import { login } from '../../helpers/login';
import { storeDataHelper } from '../../helpers/data-helpers/store.data.helper';

const browser = CommonHelper.browser();
const user = UserDataHelper.getUser('marketplace');
const europeanUser = UserDataHelper.getUser('european');

describe('Game store main page', () => {

    afterAll(async () => {
        await CommonHelper.closeBrowser(await browser);
    });

    it('Check the game prices', async () => {
        reporter
            .addLabel('AS_ID', '257')
            .addLabel('Dimension', 'Ultra Games')
            .feature('Game store main page');

        const game = storeDataHelper.getDLCGameData();
        const gameWithEmptyRepository = storeDataHelper.getGameWithEmptyRepository();
        const freeGame = storeDataHelper.getFreeGameData();
        await login(await browser, await user);
        let storePage = await StorePage.getInstance(await browser);

        // Search for a game that has a price inside the Browse section
        await storePage.searchBrowseGamesSection(game);
        await expect(await storePage.getSearchedGameName()).toContain(game.gameName);
        await expect(await storePage.getGamePriceInBrowseSection()).toContain(game.priceDollar);
        await storePage.clearSearchInput();

        // Search for a game that doesn't have a price (Early Access) inside the Browse section
        await storePage.searchBrowseGamesSection(gameWithEmptyRepository);
        await expect(await storePage.getSearchedGameName()).toContain(gameWithEmptyRepository.gameName);
        await expect(await storePage.getGameAccessInBrowseSection()).toContain(gameWithEmptyRepository.price);
        await storePage.clearSearchInput();

        // Search for a free game inside the Browse section
        await storePage.searchBrowseGamesSection(freeGame);
        await expect(await storePage.getSearchedGameName()).toContain(freeGame.gameName);
        await expect(await storePage.getGamePriceInBrowseSection()).toContain(freeGame.price);
        await storePage.clearSearchInput();

        // Log out and log in using another account from other region (that has another currency)
        await storePage.clickLegal();
        const accPage = await AccountPage.getInstance(await browser);
        await accPage.clickLogOut();
        const loginPage = await LoginPage.getInstance(await browser);
        await loginPage.logInUsingAnotherAccount(await europeanUser);
        await page.waitForTimeout(10000); // wait for the user to login

        // Search for a game that has a price inside the Browse section
        storePage = await StorePage.getInstance(await browser);
        await storePage.searchBrowseGamesSection(game);
        await expect(await storePage.getSearchedGameName()).toContain(game.gameName);
        await expect(await storePage.getGamePriceInBrowseSection()).toContain(game.priceEuro);
    });
});
