import { CommonHelper } from '../../helpers/common.helper';
import { GameDetailsPage } from '../../pageobjects/store/game-details-page';
import { GameHelper } from '../../helpers/api-helpers/game.api.helper';
import { StorePage } from '../../pageobjects';
import { UserDataHelper } from '../../helpers/data-helpers/user.data.helper';
import { login } from '../../helpers/login';

const browser = CommonHelper.browser();
const user = UserDataHelper.getUser('second_user');

describe('Game store main page', () => {

    afterAll(async () => {
        await CommonHelper.closeBrowser(await browser);
    });

    it('Check game store images', async () => {
        reporter
            .addLabel('AS_ID', '259')
            .addLabel('Dimension', 'Ultra Games')
            .feature('Game store main page');

        await login(await browser, await user);

        const storePage = await StorePage.getInstance(await browser);
        await storePage.waitForDisplayed();
        await storePage.deleteIfGamesInWishList();

        // Add game from carousel to wishlist
        await storePage.clickLearnMoreBtnOnActiveSlide();
        const gameDetailsPage = await GameDetailsPage.getInstance(await browser);
        await gameDetailsPage.ages18Continue();
        await gameDetailsPage.clickAddToWishList();
        await gameDetailsPage.clickStoreBtn();

        // Check that game images from the carousel are loaded
        const recommendedGamesCount = await storePage.getRecommendedGamesCount();
        await expect(recommendedGamesCount).toBeGreaterThanOrEqual(1);
        await expect(await GameHelper.getLinkToGameImageFromWishList()).toBe(await storePage.getlinkToGameImage('game carousel'));
        await storePage.deleteIfGamesInWishList();
        await storePage.checkWishlistEmpty();

        // Check that suggested game images are loaded
        const suggestedGamesCount = await storePage.getSuggestedGamesCount();
        await expect(suggestedGamesCount).toBeGreaterThanOrEqual(1);

        // Add game from suggested to wishlist
        await storePage.reloadPage();
        await storePage.addFirstSuggestedToWishlist();
        await expect(await GameHelper.getLinkToGameImageFromWishList()).toBe(await storePage.getlinkToGameImage('suggested game'));

        // Check that game images from the wish list are loaded
        await expect(await GameHelper.getLinkToGameImageFromWishList()).toBe(await storePage.getlinkToGameImage('wish list'));

        // Check that game list images are loaded
        await expect(await GameHelper.getLinkToGameImageFromList()).toBe(await storePage.getlinkToGameImage('games list'));
    });
});
