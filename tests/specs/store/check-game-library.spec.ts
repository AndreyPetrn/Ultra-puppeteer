import { CommonHelper } from '../../helpers/common.helper';
import { StorePage } from '../../pageobjects';
import { TransactionPage } from '../../pageobjects/transaction-app/transaction-page';
import { LibraryPage } from '../../pageobjects/store/library-page';
import { storeDataHelper } from '../../helpers/data-helpers/store.data.helper';
import { CommonApiHelper } from '../../helpers/api-helpers/common.api.helper';
import { GameDetailsPage } from '../../pageobjects/store/game-details-page';
import { connectToDatabase, disconnectFromDatabase,
    getLibraryGameType, getGameUniqData } from '../../infrastructure/mongodb/mongo-connection';
import { DbHelper } from '../../helpers/data-helpers/db.data.helper';
import { UniversesNavPage } from '../../pageobjects/universes-nav/universes-nav-page';
import { GameHelper } from '../../helpers/api-helpers/game.api.helper';
import { MarketplacePage } from '../../pageobjects/marketplace/marketplace-page';
import { InventoryPage } from '../../pageobjects/marketplace/inventory-page';

const data = require('../../../test-data/page-data.json').Library;
const config = require('../../../config/config.data.json').env;

const browser = CommonHelper.browser();
const freeGameData = storeDataHelper.getFreeGameData();
const tokenizedGame = storeDataHelper.getTokenizedGame();
const secondTokenizedGame = storeDataHelper.getSecondTokenizedGame();
const transferUniqData = {
    address: config.TRANSFER.ADDRESS,
    memo: config.TRANSFER.MEMO
};
let user: any, client: any, db: any, blockchainId: string, uniqFactoryOnChainId: number, gameOnChainId: string;

describe('Games library', () => {

    afterAll(async () => {
        await CommonHelper.closeBrowser(await browser);
    });

    it('Displaying of a non-tokenized (legacy) game after purchase', async () => {
        reporter
            .addLabel('AS_ID', '635')
            .addLabel('Dimension', 'Ultra Games')
            .feature('Games library');

        // Create new account
        user = await CommonApiHelper.completeUserCreation(await browser, 'WOC user');

        // Search game on Store
        const storePage = await StorePage.getInstance(await browser);
        await storePage.waitForDisplayed();
        await storePage.searchGameByName(freeGameData);
        await storePage.clickSearchedGame();

        // Open non-tokenized (legacy) game
        let gameDetailsPage = await GameDetailsPage.getInstance(await browser);
        await gameDetailsPage.ages18Continue();
        await gameDetailsPage.clickGetFreeBtn();

        // Get token information on Transaction App
        const transactionPage = await TransactionPage.getInstance(await browser);
        await transactionPage.confirmTransaction();

        // Go to library and check that the game was added
        await transactionPage.clickGoToLibraryButton();

        // Check the purchased game is present in the list
        const libraryPage = await LibraryPage.getInstanceLibrary(await browser);
        await libraryPage.checkPurchasedGameType('crossed circle', 0);
        const purchasedGame = await libraryPage.getPurchasedGameData(0);
        expect(purchasedGame.gameName).toContain(freeGameData.gameName);
        expect(purchasedGame.companyName).toContain(freeGameData.companyName);
        expect(purchasedGame.gameImage).toContain(freeGameData.gameImage);
        expect(purchasedGame.threeDots).not.toBeNull();
        expect(await libraryPage.gameActionButton('game list', 'install', 0)).not.toBeNull();

        // Check the game is present inside the "LATEST PURCHASE" section
        const latestPurchase = await libraryPage.getLatestPurchaseGameData();
        expect(latestPurchase.gameName).toContain(freeGameData.gameName);
        expect(latestPurchase.companyName).toContain(freeGameData.companyName);
        await libraryPage.checkLatestPurchaseGameImage('black and white');
        expect(await libraryPage.gameActionButton('latest purchase', 'install')).not.toBeNull();

        // Check the game type in DB
        const connectionInfo = await connectToDatabase((await DbHelper.dbName()).gameExplorer); // connect to DB
        client = connectionInfo.client;
        db = connectionInfo.db;

        blockchainId = await GameHelper.getBlockchainId(await user);
        gameOnChainId = await GameHelper.getGameId(await user, freeGameData.tokenName);
        expect(await getLibraryGameType(db, blockchainId, gameOnChainId)).toBe('LEGACY');

        // Check that game has the "Already purchased" status
        await libraryPage.openGameDetails(purchasedGame.threeDots);
        gameDetailsPage = await GameDetailsPage.getInstance(await browser);
        await gameDetailsPage.checkAlreadyPurchasedGame(freeGameData.gameName);
    });

    it('Displaying of a tokenized game after purchase', async () => {
        reporter
            .addLabel('AS_ID', '1160')
            .addLabel('Dimension', 'Ultra Games')
            .feature('Games library');

        // Open store page
        let gameDetailsPage = await GameDetailsPage.getInstance(await browser);
        await gameDetailsPage.clickStoreBtn();

        // Search game on Store
        const storePage = await StorePage.getInstance(await browser);
        await storePage.waitForDisplayed();
        await storePage.searchGameByName(tokenizedGame);
        await storePage.clickSearchedGame();

        // Open tokenized game
        gameDetailsPage = await GameDetailsPage.getInstance(await browser);
        await gameDetailsPage.ages18Continue();
        await gameDetailsPage.clickGetFreeBtn();

        // Get token information on Transaction App
        const transactionPage = await TransactionPage.getInstance(await browser);
        await transactionPage.confirmTransaction();

        // Go to library and check that the game was added
        await transactionPage.clickGoToLibraryButton();

        // Check the purchased game is present in the list
        const libraryPage = await LibraryPage.getInstanceLibrary(await browser);
        await libraryPage.checkPurchasedGameType('gamepad', 0);
        const lastPurchasedGame = await libraryPage.getPurchasedGameData(0);
        expect(lastPurchasedGame.gameName).toContain(tokenizedGame.gameName);
        expect(lastPurchasedGame.companyName).toContain(tokenizedGame.companyName);
        expect(lastPurchasedGame.gameImage).toContain(tokenizedGame.gameImage);
        expect(lastPurchasedGame.threeDots).not.toBeNull();
        expect(await libraryPage.gameActionButton('game list', 'install', 0)).not.toBeNull();

        // Check the game is present inside the "LATEST PURCHASE" section
        const latestPurchase = await libraryPage.getLatestPurchaseGameData();
        expect(latestPurchase.gameName).toContain(tokenizedGame.gameName);
        expect(latestPurchase.companyName).toContain(tokenizedGame.companyName);
        expect(latestPurchase.grayscaleImage).not.toBeNull();
        expect(await libraryPage.gameActionButton('latest purchase', 'install')).not.toBeNull();

        // Check the game type in DB
        gameOnChainId = await GameHelper.getGameId(await user, tokenizedGame.tokenName);
        expect(await getLibraryGameType(db, blockchainId, gameOnChainId)).toBe('TOKENIZED');
        uniqFactoryOnChainId = await GameHelper.getUniqId(await user, tokenizedGame.uniqName);
        expect(await getGameUniqData(db, blockchainId, uniqFactoryOnChainId)).not.toBeNull();
    });

    it('Get the list of owned games', async () => {
        reporter
            .addLabel('AS_ID', '646')
            .addLabel('Dimension', 'Ultra Games')
            .feature('Games library');

        // Check that all games are displayed
        let libraryPage = await LibraryPage.getInstanceLibrary(await browser);
        const gameCount = await libraryPage.getLibraryCount();
        expect(gameCount).toBe(2);
        expect(await libraryPage.getLibraryHeaderTxt()).toBe(`My Games (${gameCount})`);
        expect(await GameHelper.getPurchasedGamesCount(await user)).toBe(gameCount);
        await libraryPage.clickStoreBtn();

        // Search game on Store
        const storePage = await StorePage.getInstance(await browser);
        await storePage.waitForDisplayed();
        await storePage.searchGameByName(secondTokenizedGame);
        await storePage.clickSearchedGame();

        // Open tokenized game
        const gameDetailsPage = await GameDetailsPage.getInstance(await browser);
        await gameDetailsPage.ages18Continue();
        await gameDetailsPage.clickGetFreeBtn();

        // Get token information on Transaction App
        const transactionPage = await TransactionPage.getInstance(await browser);
        await transactionPage.confirmTransaction();

        // Go to library and check that the game was added
        await transactionPage.clickGoToLibraryButton();
        libraryPage = await LibraryPage.getInstanceLibrary(await browser);
        const lastPurchasedGame = await libraryPage.getPurchasedGameData(0);
        expect(lastPurchasedGame.gameName).toContain(secondTokenizedGame.gameName);

        const newGameCount = await libraryPage.getLibraryCount();
        expect(newGameCount).toBe(3);
        expect(await libraryPage.getLibraryHeaderTxt()).toBe(`My Games (${gameCount + 1})`);
        expect(await GameHelper.getPurchasedGamesCount(await user)).toBe(newGameCount);
        gameOnChainId = await GameHelper.getGameId(await user, secondTokenizedGame.tokenName);
        uniqFactoryOnChainId = await GameHelper.getUniqId(await user, secondTokenizedGame.uniqName);
    });

    xit('Games download', async () => { // todo - https://ultraio.atlassian.net/browse/GP-20915
        reporter
            .addLabel('AS_ID', '637')
            .addLabel('Dimension', 'Ultra Games')
            .feature('Games library');

        // Download the game and select the install folder path.
        const libraryPage = await LibraryPage.getInstanceLibrary(await browser);
        await libraryPage.cleanUltraGameFolder(data.defaultGameFolder);
        await libraryPage.clickInstallBtn(await libraryPage.gameActionButton('latest purchase', 'install'));
        await libraryPage.getDownloadGamesPath();
        expect(await libraryPage.getDownloadGamesPath()).toBe(data.defaultGameFolder);
        await libraryPage.clickInstallBtnInModal();

        // Check game downloading
        await libraryPage.gameActionButton('game list', 'loading', 0);
        await libraryPage.gameActionButton('latest purchase', 'loading');
        const gameDownloading = await libraryPage.checkGameDownloading(0);
        expect(gameDownloading.progressPercentage).toContain(data.percentage);
        expect(gameDownloading.downloadProgress).toContain(data.downloadProgress);
        expect(gameDownloading.nameDownloadedEntity).toContain(secondTokenizedGame.tokenName);
        expect(gameDownloading.downloadLabel).toContain(data.downloadingLabel);
        expect(gameDownloading.progressBar).not.toBeNull();
        expect(gameDownloading.downloadSpeed).not.toBeNull();

        // Check the download is finished
        await libraryPage.waitForDownloadGame(0);
        await libraryPage.checkLatestPurchaseGameImage('color');
        expect(await libraryPage.gameActionButton('game list', 'play', 0)).not.toBeNull();
        expect(await libraryPage.gameActionButton('latest purchase', 'play')).not.toBeNull();
        expect(await libraryPage.checkGameFile(data.defaultGameFolder)).toBe(1);

        // Download several games at once.
        await libraryPage.clickInstallBtn(await libraryPage.gameActionButton('game list', 'install', 1));
        await libraryPage.clickInstallBtnInModal();
        await libraryPage.clickInstallBtn(await libraryPage.gameActionButton('game list', 'install', 2));
        await libraryPage.clickInstallBtnInModal();

        // Check the download works in parallel for several games at once.
        const firstGameDownloading = await libraryPage.checkGameDownloading(1);
        const secondGameDownloading = await libraryPage.checkGameDownloading(2);
        expect(firstGameDownloading.progressPercentage).toContain(data.percentage);
        expect(secondGameDownloading.progressPercentage).toContain(data.percentage);
        expect(firstGameDownloading.downloadProgress).toContain(data.downloadProgress);
        expect(secondGameDownloading.downloadProgress).toContain(data.downloadProgress);
        expect(firstGameDownloading.nameDownloadedEntity).toContain(tokenizedGame.tokenName);
        expect(secondGameDownloading.nameDownloadedEntity).toContain(freeGameData.tokenName);
        expect(firstGameDownloading.downloadLabel).toContain(data.downloadingLabel);
        expect(secondGameDownloading.downloadLabel).toContain(data.downloadingLabel);
        expect(firstGameDownloading.progressBar).not.toBeNull();
        expect(secondGameDownloading.progressBar).not.toBeNull();
        expect(firstGameDownloading.downloadSpeed).not.toBeNull();
        expect(secondGameDownloading.downloadSpeed).not.toBeNull();

        // Check the download is finished
        await libraryPage.waitForDownloadGame(1);
        await libraryPage.waitForDownloadGame(2);
        expect(await libraryPage.gameActionButton('game list', 'play', 1)).not.toBeNull();
        expect(await libraryPage.gameActionButton('game list', 'play', 2)).not.toBeNull();
        expect(await libraryPage.checkGameFile(data.defaultGameFolder)).toBe(3);
    });

    xit('Games uninstall', async () => { // todo - https://ultraio.atlassian.net/browse/GP-20915
        reporter
            .addLabel('AS_ID', '640')
            .addLabel('Dimension', 'Ultra Games')
            .feature('Games library');

        // Check that the first game installed
        const libraryPage = await LibraryPage.getInstanceLibrary(await browser);
        const gamesInstalled = await libraryPage.checkGameFile(data.defaultGameFolder);
        expect(await libraryPage.gameActionButton('game list', 'play', 0)).not.toBeNull();

        // Uninstall Game
        const installedGame = await libraryPage.getPurchasedGameData(0);
        await libraryPage.clickUninstallGame(installedGame.threeDots);
        await libraryPage.confirmUninstallGame(secondTokenizedGame.gameName);

        // Check that the game uninstalled
        await libraryPage.checkLatestPurchaseGameImage('black and white');
        expect(await libraryPage.gameActionButton('game list', 'install', 0)).not.toBeNull();
        expect(await libraryPage.gameActionButton('latest purchase', 'install')).not.toBeNull();
        expect(await libraryPage.checkGameFile(data.defaultGameFolder)).toBe(gamesInstalled - 1);
    });

    it('Displaying of a sold/transferred tokenized game', async () => {
        reporter
            .addLabel('AS_ID', '1161')
            .addLabel('Dimension', 'Ultra Games')
            .feature('Games library');

        // Go to marketplace
        const universesNavPage = await UniversesNavPage.getInstance(await browser);
        await universesNavPage.openMarketplaceApp();

        // Check page and open Sell Uniq
        const marketplacePage = await MarketplacePage.getInstance(await browser);
        await marketplacePage.goToSellUniq();
        let inventoryPage = await InventoryPage.getInstance(await browser);
        await inventoryPage.sellUniqPageToBeDisplayed();

        // Get first product and check data
        let uniq = await inventoryPage.getContainer(0, 0);
        await expect(await inventoryPage.checkOwnedUniqStatus(uniq, 'owned')).toEqual('Sell');
        let uniqData = await inventoryPage.getGameUniqData(uniq);
        expect(uniqData.uniqName).toContain(secondTokenizedGame.uniqName);
        expect(uniqData.uniqType).toContain(secondTokenizedGame.tokenType);
        expect(uniqData.gamepadIcon).not.toBeNull();
        await inventoryPage.clickUniqButton(uniq);

        // Transfer a uniq factory with minimum resale price=0 to "another" account
        await inventoryPage.clickTransferTabButton(transferUniqData);
        let transactionPage = await TransactionPage.getInstance(await browser);
        await transactionPage.waitForCompleteTransaction();

        // Get first product and check data
        inventoryPage = await InventoryPage.getInstance(await browser);
        uniq = await inventoryPage.getContainer(0, 0);
        await expect(await inventoryPage.checkOwnedUniqStatus(uniq, 'owned')).toEqual('Sell');
        uniqData = await inventoryPage.getGameUniqData(uniq);
        expect(uniqData.uniqName).toContain(tokenizedGame.uniqName);
        expect(uniqData.uniqType).toContain(tokenizedGame.tokenType);
        expect(uniqData.gamepadIcon).not.toBeNull();
        await inventoryPage.clickUniqButton(uniq);

        // Set resell price
        await inventoryPage.setResellPrice('1');

        // Make the transaction
        transactionPage = await TransactionPage.getInstance(await browser);
        await transactionPage.waitForDisplayed();
        await transactionPage.confirmTransaction(false);
        await transactionPage.waitForTransactionSuccess();
        await transactionPage.closeTransactionApp();

        inventoryPage = await InventoryPage.getInstance(await browser);
        await inventoryPage.sellUniqPageToBeDisplayed();

        // Check product status in the inventory
        uniq = await inventoryPage.getContainer(0, 0);
        await inventoryPage.checkOwnedUniqStatus(uniq, 'sale');

        // Open store page
        const universeNav = await UniversesNavPage.getInstance(await browser);
        await universeNav.openStoreApp();

        // Check that all games are displayed
        const libraryPage = await LibraryPage.getInstanceLibrary(await browser);
        await CommonHelper.reloadPage(page);
        const gameCountAfterTransfer = await libraryPage.getLibraryCount();
        expect(gameCountAfterTransfer).toBe(2);
        expect(await GameHelper.getPurchasedGamesCount(await user)).toBe(gameCountAfterTransfer);

        // Check that the game was removed from the DB
        expect(await getLibraryGameType(db, blockchainId, gameOnChainId, 1)).toBeNull();
        expect(await getGameUniqData(db, blockchainId, uniqFactoryOnChainId)).toBeNull();
        await disconnectFromDatabase(client);
    });
});
