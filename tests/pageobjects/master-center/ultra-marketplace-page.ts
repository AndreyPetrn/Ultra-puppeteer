import { ElementHandle, Page } from 'puppeteer';
import { connectToDatabase, disconnectFromDatabase, getLaunchpadCollection } from '../../infrastructure/mongodb/mongo-connection';

import { CommonHelper } from '../../helpers/common.helper';
import { DbHelper } from '../../helpers/data-helpers/db.data.helper';
import { step } from '../../helpers/allure.helper';

export class UltraMarketplace {
    private readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    private get ultraMarketPlacePage(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="uniq-factory-subname-content"]');
    }

    private get carouselTitleInput(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page,'[data-id="carousel-title-field"]');
    }

    private get tagInput(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="tag-input-container"]');
    }

    private get searchTagBtn(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="search-uniq-button"]');
    }

    private get factoryName(): Promise<ElementHandle[] | null> {
        return CommonHelper.waitForSelectors$$(this.page, '[data-id="uniq-factory-name-content"]');
    }

    private get factorySubname(): Promise<ElementHandle[] | null> {
        return CommonHelper.waitForSelectors$$(this.page, '[data-id="uniq-factory-subname-content"]');
    }

    private get openPreview(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="carousel-preview-button"]');
    }

    private get previewHeader(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="card-carousel-title-content"]');
    }

    private get closePreview(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="launchpad-preview-close-button"]');
    }

    private get discardChanges(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="discard-changes"]');
    }

    private get titleTxt(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="info-preview-title-content"]');
    }

    private get saveChanges(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="save-changes"]');
    }

    private get deleteUniq(): Promise<ElementHandle[]> {
        return CommonHelper.waitForSelectors$$(this.page, '[data-id="remove-uniq-button"]');
    }

    private get slotsCount(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page,'[data-id="slots-count-content"]');
    }

    private get slotsMin(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page,'[data-id="slots-min-content"]');
    }

    private get slotsMax(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page,'[data-id="slots-max-content"]');
    }

    private get uniqs(): Promise<ElementHandle[]> {
        return CommonHelper.waitForSelectors$$(this.page, '[data-id="uniq-preview-container"]');
    }

    private get invalidMessage(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="slots-min-container"].invalid');
    }

    private get carouselCards(): Promise<ElementHandle[]> {
        return CommonHelper.waitForSelectors$$(this.page, '[data-id="carousel-card-container"] [data-id="card-container"]');
    }

    protected get saveChangesBtn(): string {
        return '[data-id="save-changes"]';
    }

    @step('Get number of Uniqs in the carousel')
    async getUniqsCount(): Promise<number> {
        return (await this.uniqs).length;
    }

    @step('Get the "Active Uniqs" number')
    async getActiveUniqs(): Promise<number> {
        await this.page.waitForTimeout(2000); // for upload Uniqs
        return this.getUniqsCount();
    }

    @step('Get carousel cards count')
    async getCarouselCardCount(): Promise<number> {
        return (await this.carouselCards).length;
    }

    @step('Get the "Apps txt header" value')
    async getTitleText(): Promise<string | undefined> {
        return CommonHelper.getTextContent(await this.titleTxt);
    }

    @step('Get the "Factory name" value')
    async getFactoryNameText(factoryIndex: number): Promise<string | undefined> {
        return CommonHelper.getTextContent((await this.factoryName)![factoryIndex]);
    }

    @step('Get the "Factory subname" text')
    async getFactorySubnameText(factoryIndex: number): Promise<string | undefined> {
        return CommonHelper.getTextContent((await this.factorySubname)![factoryIndex]);
    }

    @step('Get the "Preview header" value')
    async getPreviewHeaderText(): Promise<any> {
        return CommonHelper.getTextContent(await this.previewHeader);
    }

    @step('Get slots count')
    async getSlotsCount(): Promise<number> {
        return parseFloat((await CommonHelper.getTextContent(await this.slotsCount))!);
    }

    @step('Get slots min value')
    async getSlotsMin(): Promise<any> {
        return CommonHelper.getTextContent(await this.slotsMin);
    }

    @step('Get slots max value')
    async getSlotsMax(): Promise<any> {
        return CommonHelper.getTextContent(await this.slotsMax);
    }

    @step('Get the "Invalid message" value')
    async getInvalidMessageText(): Promise<any> {
        return CommonHelper.getTextContent(await this.invalidMessage);
    }

    @step('Wait for load Ultra Market Place page')
    async waitForPageLoad(): Promise<void> {
        await this.ultraMarketPlacePage;
    }

    @step('Fill carousel title input')
    async fillCarouselTitle(data: any): Promise<any> {
        await CommonHelper.scrollAndClick(await this.carouselTitleInput);
        await CommonHelper.setValue(await this.carouselTitleInput, await data);
    }

    @step('Add new uniqs')
    async addNewUniqs(uniqList: string[]): Promise<void> {
        for (const id of uniqList) {
            const input = await this.tagInput;
            await (input)!.click();
            await CommonHelper.setValue(input, id);
            await input!.press('Enter');
            await page.waitForTimeout(1000); // wait for load data
            await CommonHelper.scrollAndClick(await this.searchTagBtn);
            await page.waitForTimeout(2000); // wait for load data
        }
    }

    @step('Click on the "Open preview" button')
    async clickOpenPreviewButton(): Promise<void> {
        await (await this.openPreview)!.focus();
        await CommonHelper.hoverAndClick(await this.openPreview);
        await page.waitForTimeout(2000); // wait for load data
    }

    @step('Click on the "Close preview" button')
    async clickClosePreviewButton(): Promise<void> {
        await CommonHelper.hoverAndClick(await this.closePreview);
    }

    @step('Click on the "Discard changes" button')
    async clickDiscardChanges(): Promise<void> {
        await CommonHelper.hoverAndClick(await this.discardChanges);
    }

    @step('Click on the "Save changes" button')
    async clickSaveChanges(): Promise<void> {
        await page.waitForTimeout(2000); // wait for save button
        const saveChanges = await this.page.$(this.saveChangesBtn);
        if (saveChanges !== null) {
            await (await this.saveChanges)!.click();
        }
    }

    @step('Delete first uniqs')
    async deleteFirstUniq(): Promise<any> {
        await CommonHelper.scrollAndClick((await this.deleteUniq)[0]);
    }

    @step('Delete all uniqs')
    async deleteAllUniqs(): Promise<void> {
        while (!(0 === (await this.getSlotsCount()))) {
            await CommonHelper.scrollAndClick((await this.deleteUniq)[0]);
        }
    }

    @step('Drag and drop Uniq')
    async dragAndDropUniq(index: number, targetIndex: number): Promise<void> {
        // drag and drops Uniq from specified index to target index position in the list
        const uniqs = await this.uniqs;
        if ((index | targetIndex) < 0 || (index | targetIndex) >= uniqs.length) {
            throw new Error('One of the indexes is out of the list bounds!');
        } else if (index === targetIndex) {
            throw new Error('You are trying to move the Uniq to the same position where it stands!');
        } else {
            await CommonHelper.scrollToElement(uniqs[index]);
            await this.page.waitForTimeout(500); // wait to scroll properly before getting the position
            const sourceBox = await uniqs[index].boundingBox();
            await this.page.mouse.move(
                sourceBox!.x + sourceBox!.width / 2,
                sourceBox!.y + sourceBox!.height / 2
            );
            await this.page.mouse.down();
            const targetBox = await uniqs[targetIndex].boundingBox();
            await this.page.mouse.move(
                targetBox!.x + targetBox!.width / 2,
                targetBox!.y + targetBox!.height / 2,
                {steps: 20} // more steps makes the movement smoother
            );
            await this.page.waitForTimeout(50); // makes the movement more stable
            await this.page.mouse.up();
        };
    }

    @step('Get current state of Uniqs added to carousel from DB')
    async getCarouselUniqsDb(): Promise<string[]> {
        const { client, db } = await connectToDatabase((await DbHelper.dbName()).tokenExplorer);
        const initialUniqs = await getLaunchpadCollection(db);
        await disconnectFromDatabase(client);
        return initialUniqs;
    }
}
