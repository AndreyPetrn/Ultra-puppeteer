import { CommonHelper } from '../../helpers/common.helper';
import { StorePage } from '../../pageobjects';
import { TransactionPage } from '../../pageobjects/transaction-app/transaction-page';
import { LibraryPage } from '../../pageobjects/store/library-page';
import { storeDataHelper } from '../../helpers/data-helpers/store.data.helper';
import { CommonApiHelper } from '../../helpers/api-helpers/common.api.helper';
import { GameDetailsPage } from '../../pageobjects/store/game-details-page';

const browser = CommonHelper.browser();

describe('Game purhase flows', () => {
    afterAll(async () => {
        await CommonHelper.closeBrowser(await browser);
    });

    it('Free games should be added to library without a detailed purchase transaction', async () => {
        reporter
            .addLabel('AS_ID', '60')
            .addLabel('Dimension', 'Ultra Games')
            .feature('Game purhase flows');

        // Create new account
        await CommonApiHelper.completeUserCreation(await browser, 'WOC user');
        const freeGameData = storeDataHelper.getFreeGameData();

        // Search game on Store
        const storePage = await StorePage.getInstance(await browser);
        await storePage.searchGameByName(freeGameData);
        await storePage.clickSearchedGame();

        // Open free game
        const gameDetailsPage = await GameDetailsPage.getInstance(await browser);
        await gameDetailsPage.ages18Continue();
        await gameDetailsPage.clickGetFreeBtn();

        // Get token information on Transaction App
        const transactionPage = await TransactionPage.getInstance(await browser);
        await transactionPage.confirmTransaction();

        // Go to library and check that the game was added
        await transactionPage.clickGoToLibraryButton();
        const libraryPage = await LibraryPage.getInstanceLibrary(await browser);
        const libraryGameNames = await libraryPage.getLibraryGameNames();
        await expect(String(libraryGameNames)).toContain(freeGameData.gameName);
    });
});
