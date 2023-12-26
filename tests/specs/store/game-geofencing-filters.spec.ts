import { CommonHelper } from '../../helpers/common.helper';
import { StorePage } from '../../pageobjects';
import { UserDataHelper } from '../../helpers/data-helpers/user.data.helper';
import { login } from '../../helpers/login';
import { storeDataHelper } from '../../helpers/data-helpers/store.data.helper';
import { GameDetailsPage } from '../../pageobjects/store/game-details-page';

const browser = CommonHelper.browser();
const user = UserDataHelper.getUser('const');
const gameInfo = storeDataHelper.getPaymentData();

xdescribe('Store: ', () => { //todo - disabled due to https://ultraio.atlassian.net/browse/GP-20472

    afterAll(async () => {
        await CommonHelper.closeBrowser(await browser);
    });

    it('Game should be available when user matches the geofencing', async () => {
        reporter
            .addLabel('AS_ID', '339')
            .addLabel('Dimension', 'Ultra Games')
            .feature('Game store main page');

        await login(await browser, await user);
        const storePage = await StorePage.getInstance(await browser);

        // Open game details
        await storePage.searchGameByName(gameInfo);
        await storePage.clickSearchedGame();

        const gameDetailsPage = await GameDetailsPage.getInstance(await browser);
        await gameDetailsPage.ages18Continue();

        // Open geofencing window
        await gameDetailsPage.openGeofencingWindow();

        // Get message text and country name - check the uniq is available in the user's country
        const text = await gameDetailsPage.geofencingMessageText();
        const country = text!.split('.')[1].trim();
        await expect(text!.split('.')[0].trim()).toBe('You can purchase and trade this Uniq in your country');

        // Open European region
        await gameDetailsPage.selectEuropeanRegion();

        // Get the number of countries for available/not available filters
        const availableNum = await gameDetailsPage.geofencingAvailableFilterNum();
        const notAvailableNum = await gameDetailsPage.geofencingNotAvailableFilterNum();

        // Count the number of countries for available/not available filters - check the number of filtered countries
        const availableFilter = await gameDetailsPage.geofencingAvailableCountryCount();
        const notAvailableFilter = await gameDetailsPage.geofencingNotAvailableCountryCount();
        await expect(availableNum).toBe(availableFilter.toString());
        await expect(notAvailableNum).toBe(notAvailableFilter.toString());

        // Search the user country in geofencing - check the user country appears in the list
        await gameDetailsPage.searchCountryGeofencing(country);
        await expect(country).toBe(await gameDetailsPage.geofencingCountryName());
    });
});
