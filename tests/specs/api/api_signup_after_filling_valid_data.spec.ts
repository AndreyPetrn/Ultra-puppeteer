import { CommonApiHelper } from '../../helpers/api-helpers/common.api.helper';
import { CommonHelper } from '../../helpers/common.helper';
import { WalletPage } from '../../pageobjects/wallet/wallet-page';
import { UniversesNavPage } from '../../pageobjects/universes-nav/universes-nav-page';

const browser = CommonHelper.browser();

describe('Sign Up', () => {

    afterAll(async () => {
        await CommonHelper.closeBrowser(await browser);
    });

    it('[API] User should be able to signup after filling valid data', async () => {
        reporter
            .addLabel('AS_ID', '37')
            .addLabel('Dimension', 'Authorization')
            .feature('Sign Up');

        await CommonApiHelper.completeUserCreation(await browser, 'WOC user');
        const universeNav = await UniversesNavPage.getInstance(await browser);
        await universeNav.openWalletApp();
        const walletPage = await WalletPage.getInstance(await browser);
        const myWallet = await walletPage.goToMyWallet();
        await page.waitForTimeout(10000); // wait for the appear new user in the blockchain
        const walletId = await myWallet.getWalletId();
        await CommonApiHelper.sendUOS(walletId);
    });
});
