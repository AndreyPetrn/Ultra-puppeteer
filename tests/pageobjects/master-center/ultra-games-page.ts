import { ElementHandle, Page } from 'puppeteer';

import { CommonHelper } from '../../helpers/common.helper';
import { step } from '../../helpers/allure.helper';

export class UltraGames {
    private readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    private get backButton(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="side-nav-back-button"]');
    }

    private get titleTxt(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="info-preview-title-content"]');
    }

    private get searchGameInput(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="search-game-field"]');
    }

    private get gamePageStatusDropdown(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="dropdown-toggle-button"]');
    }

    private get allDropdownItem(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="all-menu-item"]');
    }

    private get publishedDropdownItem(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="published-menu-item"]');
    }

    private get enabledDropdownItem(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="enabled-menu-item"]');
    }

    private get disabledDropdownItem(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="disabled-menu-item"]');
    }

    private get changeStatusBtn(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="toggle-game-status-button"]');
    }

    private get purposeOfRemoval(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="removal-reason-field"]');
    }

    private get disableBtn(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="confirm-disable-button"]');
    }

    private get enableBtn(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="confirm-enable-button"]');
    }

    private get ultraRow(): Promise<ElementHandle[]> {
        return CommonHelper.waitForSelectors$$(this.page, 'ultra-table ultra-row');
    }

    checkGameStatus(status: string): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, `ultra-game-publish-status .${status}`);
    }

    private get storePageInfo(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="info-preview-description-content"]');
    }

    private get gamesCounter(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="games-counter"]');
    }

    @step('Get the "Ultra row" value')
    async getUltraRow(): Promise<number> {
        return (await this.ultraRow).length;
    }

    @step('Get the "Apps txt header" value')
    async getTitleText(): Promise<string | undefined> {
        return CommonHelper.getTextContent(await this.titleTxt);
    }

    @step('Get the "Store page" value')
    async getStorePageInfo(): Promise<any> {
        return CommonHelper.getTextContent(await this.storePageInfo);
    }

    @step('Click on the "Ultra OS link" button')
    async clickBackButton(): Promise<void> {
        await (await this.backButton)!.click();
    }

    @step('Filter games by status')
    async filterByStatus(status: string): Promise<void>{
        (await this.gamePageStatusDropdown)!.click();
        switch (status){
            case 'published':
                await (await this.publishedDropdownItem)!.click();
                break;
            case 'enabled':
                await (await this.enabledDropdownItem)!.click();
                break;
            case 'disabled':
                await (await this.disabledDropdownItem)!.click();
                break;
            case 'all':
                await (await this.allDropdownItem)!.click();
                break;
            default:
                throw new Error ('Unknown status given!');
        }
    }

    @step('Search game by name')
    async searchGame(name: any): Promise<void> {
        const input = await this.searchGameInput;
        await CommonHelper.setValue(input, name);
        await input!.press('Enter');
        await this.page.waitForTimeout(5000); // wait until the search is over
    }

    @step('Open game info')
    async openGameInfo(): Promise<void> {
        await CommonHelper.hoverAndClick((await this.ultraRow)[0]);
    }

    @step('Click on the "Disable game" button')
    async disableGame(value: string): Promise<void> {
        await (await this.changeStatusBtn)!.click();
        await CommonHelper.setValue(await this.purposeOfRemoval, value);
        await (await this.disableBtn)!.click();
    }

    @step('Click on the "Enable game" button')
    async enableGame(): Promise<void> {
        await (await this.changeStatusBtn)!.click();
        await (await this.enableBtn)!.click();
    }

    @step('Get games count')
    async getGamesCount(): Promise<string> {
        await this.page.waitForNetworkIdle(); // wait until games count query will be finalized since it has delay
        return await CommonHelper.getTextBetween((await CommonHelper.getTextContent(await this.gamesCounter))!, '(', ')');
    }
}
