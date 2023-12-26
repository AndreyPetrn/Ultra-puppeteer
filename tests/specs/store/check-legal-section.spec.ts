import { CommonHelper } from '../../helpers/common.helper';
import { AccountPage } from '../../pageobjects/account-settings/account-page';
import { StorePage } from '../../pageobjects';
import { UserDataHelper } from '../../helpers/data-helpers/user.data.helper';
import { login } from '../../helpers/login';
import { storeDataHelper } from '../../helpers/data-helpers/store.data.helper';
import { GameDetailsPage } from '../../pageobjects/store/game-details-page';
import { LibraryPage } from '../../pageobjects/store/library-page';

const browser = CommonHelper.browser();
const user = UserDataHelper.getUser('const');
const gameInfo = storeDataHelper.getDefaultGame();

describe('Game store main page', () => {

    afterAll(async () => {
        await CommonHelper.closeBrowser(await browser);
    });

    it('Check the Legal section', async () => {
        reporter
            .addLabel('AS_ID', '258')
            .addLabel('Dimension', 'Ultra Games')
            .feature('Game store main page');

        await login(await browser, await user);

        // Check that the Legal section is present in the footer of the page
        const storePage = await StorePage.getInstance(await browser);

        // Game store main page
        await storePage.waitForDisplayed();
        await storePage.clickLegal();
        const accPage = await AccountPage.getInstance(await browser);
        await accPage.waitForLegal();

        // Game details page
        await storePage.bringToFront();
        await storePage.waitForDisplayed();
        await storePage.searchGameByName(gameInfo);
        await storePage.checkGameSearchResults(gameInfo);
        await storePage.clickSearchedGame();
        const gameDetailsPage = await GameDetailsPage.getInstance(await browser);
        await gameDetailsPage.ages18Continue();
        await gameDetailsPage.checkGameTitle(gameInfo);
        await gameDetailsPage.clickLegal();

        await accPage.waitForLegal();

        // Game library
        await storePage.bringToFront();
        await storePage.clickGoToYourLibraryButton();

        const libraryPage = await LibraryPage.getInstanceLibrary(await browser);
        await libraryPage.clickLegal();
        await accPage.waitForLegal();
    });
});
