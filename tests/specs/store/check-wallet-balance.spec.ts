import { CommonHelper } from '../../helpers/common.helper';
import { LoginPage, StorePage } from '../../pageobjects';
import { UserDataHelper } from '../../helpers/data-helpers/user.data.helper';
import { login } from '../../helpers/login';
import { UniversesNavPage } from '../../pageobjects/universes-nav/universes-nav-page';
import { WalletPage } from '../../pageobjects/wallet/wallet-page';
import { AccountPage } from '../../pageobjects/account-settings/account-page';

const browser = CommonHelper.browser();
const user = UserDataHelper.getUser('second_user');

describe('Game store main page', () => {

    afterAll(async () => {
        await CommonHelper.closeBrowser(await browser);
    });

    it('Hide/unhide the wallet balance', async () => {
        reporter
            .addLabel('AS_ID', '246')
            .addLabel('Dimension', 'Ultra Games')
            .feature('Game store main page')
            .addLabel('Tags', 'Regression');

        await login(await browser, await user);

        // Go to wallet app
        const universesNavPage = await UniversesNavPage.getInstance(await browser);
        await universesNavPage.openWalletApp();
        const walletApp = await WalletPage.getInstance(await browser);

        // Get wallet balance on my wallet page
        const myWallet = await walletApp.goToMyWallet();
        const walletBalance = await myWallet.getWalletBalance();

        // Open Games Store
        await universesNavPage.openStoreApp();

        // Hide wallet balance
        const storePage = await StorePage.getInstance(await browser);
        await storePage.updateEyeElement();
        await storePage.clickEyeButton(true);
        let hiddenBalance = await storePage.getWalletBalance();
        await expect(hiddenBalance).toContain('Show wallet balance');

        // Refresh the page and check that the balance is still hidden
        await storePage.reloadPage();
        hiddenBalance = await storePage.getWalletBalance();
        await expect(hiddenBalance).toContain('Show wallet balance');

        // Enable wallet balance display
        await storePage.clickEyeButton(false);

        // Check that the wallet balance is visible and valid
        let storeBalance = await storePage.getWalletBalance();
        await expect(storeBalance).toContain(walletBalance);

        // Hide the wallet balance and log out
        await storePage.clickEyeButton(true);
        hiddenBalance = await storePage.getWalletBalance();
        await expect(hiddenBalance).toContain('Show wallet balance');
        await storePage.clickLegal();
        const accPage = await AccountPage.getInstance(await browser);
        await accPage.clickLogOut();

        // Log in
        const loginPage = await LoginPage.getInstance(await browser);
        await loginPage.logInUsingAnotherAccount(await user);
        await page.waitForTimeout(10000); // wait for the user to login

        // Check that the wallet balance is still hidden
        const storePageNew = await StorePage.getInstance(await browser);
        hiddenBalance = await storePageNew.getWalletBalance();
        await expect(hiddenBalance).toContain('Show wallet balance');

        // Enable the wallet balance
        await storePageNew.clickEyeButton(false);

        // Check that the wallet balance is visible and valid
        storeBalance = await storePageNew.getWalletBalance();
        await expect(storeBalance).toContain(walletBalance);
    });
});
