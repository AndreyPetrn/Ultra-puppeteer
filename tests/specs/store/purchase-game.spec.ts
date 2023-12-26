import { CommonHelper } from '../../helpers/common.helper';
import { StorePage } from '../../pageobjects';
import { LibraryPage } from '../../pageobjects/store/library-page';
import { storeDataHelper } from '../../helpers/data-helpers/store.data.helper';
import { TransactionPage } from '../../pageobjects/transaction-app/transaction-page';
import { CommonApiHelper } from '../../helpers/api-helpers/common.api.helper';
import { GameDetailsPage } from '../../pageobjects/store/game-details-page';
import { GameHelper } from '../../helpers/api-helpers/game.api.helper';

const browser = CommonHelper.browser();
const gamePSP = storeDataHelper.getDefaultGame();
const gameUOS = storeDataHelper.getDLCGameData();
const paymentData = storeDataHelper.getPaymentData();
const data = require('../../../test-data/page-data.json').Library;
let user: any;

describe('Game purchase flows', () => {

    afterAll(async () => {
        await CommonHelper.closeBrowser(await browser);
    });

    it('Purchase the game using the PSP', async () => {
        reporter
            .addLabel('AS_ID', '333')
            .addLabel('Dimension', 'Ultra Games')
            .feature('Game purhase flows');

        // Create new account
        user = await CommonApiHelper.completeUserCreation(await browser, 'WOC user');

        // Find and open the Game
        const storePage = await StorePage.getInstance(await browser);
        await storePage.waitForDisplayed();
        await storePage.searchGameByName(gamePSP);
        await storePage.clickSearchedGame();

        // Purchase game by PSP
        let gameDetailsPage = await GameDetailsPage.getInstance(await browser);
        await gameDetailsPage.ages18Continue();
        await gameDetailsPage.clickOnPurchaseDlcButton();
        const transactionPage = await TransactionPage.getInstance(await browser);
        await transactionPage.waitForDisplayed();
        await transactionPage.choosePayment('psp');
        await transactionPage.fillBillingAddress(paymentData);
        await transactionPage.fillInCardDetails();
        await transactionPage.checkTransactionBetween();
        await transactionPage.fill3SecurePassword();

        // Open the library and check the purchased games
        await transactionPage.clickGoToLibraryButton();
        const libraryPage = await LibraryPage.getInstanceLibrary(await browser);
        const purchasedGame = await libraryPage.getPurchasedGameData(0);
        expect(purchasedGame.gameName).toContain(gamePSP.gameName);

        // Check email
        const emailData = await libraryPage.checkEmailAfterPurchaseGame(await user);
        await expect(emailData.nickName).toContain((await user.username).toLowerCase());
        await expect(emailData.fullName).toContain(`${await user.firstName} ${await user.lastName}`);
        await expect(emailData.getGameName).toContain(gamePSP.gameName);
        await expect(emailData.getAddress).toContain(paymentData.address);
        await expect(emailData.getCity).toContain(paymentData.city);
        await expect(emailData.getZipCode).toContain(paymentData.zipCode);
        await expect(emailData.getCountry).toContain(data.country);

        // Check that game has the "Already purchased" status
        await libraryPage.openGameDetails(purchasedGame.threeDots);
        gameDetailsPage = await GameDetailsPage.getInstance(await browser);
        await gameDetailsPage.checkAlreadyPurchasedGame(gamePSP.gameName);

        // Go to store page
        await gameDetailsPage.clickStoreBtn();
    });

    it('Purchase the game using the UOS', async () => {
        reporter
            .addLabel('AS_ID', '334')
            .addLabel('Dimension', 'Ultra Games')
            .feature('Game purhase flows');

        // Top up the balance
        const walletId = await GameHelper.getBlockchainId(await user);
        await CommonApiHelper.sendUOS(walletId);

        // Find and open the Game
        const storePage = await StorePage.getInstance(await browser);
        await storePage.waitForDisplayed();
        await storePage.searchGameByName(gameUOS);
        await storePage.clickSearchedGame();

        // Wait for purchase game by UOS
        let gameDetailsPage = await GameDetailsPage.getInstance(await browser);
        await gameDetailsPage.ages18Continue();
        await gameDetailsPage.clickOnPurchaseDlcButton();
        const transactionPage = await TransactionPage.getInstance(await browser);
        await transactionPage.choosePayment('uos');
        await transactionPage.fillBillingAddress(paymentData);
        await transactionPage.checkTransactionBetween();

        // Open the library and check the purchased games
        await transactionPage.clickGoToLibraryButton();
        const libraryPage = await LibraryPage.getInstanceLibrary(await browser);
        const purchasedGame = await libraryPage.getPurchasedGameData(0);
        expect(purchasedGame.gameName).toContain(gameUOS.gameName);

        // Check email
        const emailData = await libraryPage.checkEmailAfterPurchaseGame(await user);
        await expect(emailData.nickName).toContain((await user.username).toLowerCase());
        await expect(emailData.fullName).toContain(`${await user.firstName} ${await user.lastName}`);
        await expect(emailData.getGameName).toContain(gameUOS.gameName);
        await expect(emailData.getAddress).toContain(paymentData.address);
        await expect(emailData.getCity).toContain(paymentData.city);
        await expect(emailData.getZipCode).toContain(paymentData.zipCode);
        await expect(emailData.getCountry).toContain(data.country);

        // Check that game has the "Already purchased" status
        await libraryPage.openGameDetails(purchasedGame.threeDots);
        gameDetailsPage = await GameDetailsPage.getInstance(await browser);
        await gameDetailsPage.checkAlreadyPurchasedGame(gameUOS.gameName);
    });
});
