import { ElementHandle, Page } from 'puppeteer';
import { CommonHelper } from '../../../../../helpers/common.helper';
import { step } from '../../../../../helpers/allure.helper';

export class StorePage {
    private readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    private get mainInformationBtn(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="main-information-submenu"]');
    }

    private settingsStatus(status: string): Promise<ElementHandle<HTMLElement>[]> {
        return CommonHelper.waitForSelectors$$(this.page, `[data-value="${status}"]`);
    }

    private get titleOfSection(): Promise<ElementHandle<HTMLElement>[]> {
        return CommonHelper.waitForSelectors$$(this.page, '[data-id="store-details-field-title-title"]');
    }

    private releaseInput(release: string): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, `[label="${release}"] [data-id="store-details-release-date-input"] `);
    }

    private get dropdownDateBtn(): Promise<ElementHandle<HTMLElement>[]> {
        return CommonHelper.waitForSelectors$$(this.page, '[data-id="dropdown-toggle-button"]');
    }

    private get waitForShowDropdownMenu(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '.dropdown-menu.show');
    }

    private get fileSizeBtn(): Promise<ElementHandle<HTMLElement>[]> {
        return CommonHelper.waitForSelectors$$(this.page, '[class="dropdown-menu show"] .dropdown-item');
    }

    private creatorsNameInput(value: string): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, `[label="${value} Name"] input`);
    }

    private genreBtn(value: string): Promise<ElementHandle<HTMLElement>[]> {
        return CommonHelper.waitForSelectors$$(this.page, `[groupname="genres_${value}"] .radio__label`);
    }

    private get tagsInput(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '.tags-container.position-relative');
    }

    private get deleteTagBtn(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, this.deleteTagButton);
    }

    private get saveChangesBtn(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="save-changes"]');
    }

    private get saveButtonIsHidden(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="save-changes-dialog"]');
    }

    private get aboutBtn(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="about-submenu"]');
    }

    private get tagLineInput(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="store-details-about-textarea-description-short"]');
    }

    private get descriptionInput(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="store-details-about-textarea-description"]');
    }

    private get youtubeUrlInput(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="upload-video-link-input"]');
    }

    private get addLinkBtn(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="upload-video-link-btn"]');
    }

    private get checkYouTubeURL(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="video-link-item-content"]');
    }

    private get uploadImageSection(): Promise<ElementHandle<HTMLElement> | null> {
        return this.page.waitForSelector('input[type=file]', { timeout: 50000 });
    }

    private get ultraLoading(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, 'ultra-loading');
    }

    private get mediaSlots(): Promise<ElementHandle<HTMLElement>[]> {
        return CommonHelper.waitForSelectors$$(this.page, '.slot.bg-primary');
    }

    private get detailsBtn(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="details-submenu"]');
    }

    private get playModelsBtn(): Promise<ElementHandle<HTMLElement>[]> {
        return CommonHelper.waitForSelectors$$(this.page, '[title="Play modes"]+ultra-category-list [data-id]');
    }

    private get addAgeRatingBtn(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="add-new-age-rating"]');
    }

    private get selectRatingDropdown(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="select-rating"]');
    }

    private localisationBtn(button: string): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, `[data-id="${button}"]`);
    }

    private get ratingCategoryBtn(): Promise<ElementHandle<HTMLElement>[]> {
        return CommonHelper.waitForSelectors$$(this.page, '[class="category-image ng-star-inserted"]');
    }

    private get ratingDescriptionInput(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="esrb-content"]');
    }

    private get addRatingBtn(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="add-rating"]');
    }

    private get ratingContentBtn(): Promise<ElementHandle<HTMLElement>[]> {
        return CommonHelper.waitForSelectors$$(this.page, '.category-item.rarefied-text');
    }

    get checkRating(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, 'ultra-age-ratings .category-item');
    }

    private get featuresBtn(): Promise<ElementHandle<HTMLElement>[]> {
        return CommonHelper.waitForSelectors$$(this.page, '[title="Features"]+ultra-category-list ultra-checkbox');
    }

    private get minOsInput(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="min-win-conf-os"]');
    }

    private get maxOsInput(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="recommend-win-conf-os"]');
    }

    private get minProcessorInput(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="min-win-conf-processor"]');
    }

    private get maxProcessorInput(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="recommend-win-conf-processor"]');
    }

    private get minRamInput(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="min-win-conf-ram"]');
    }

    private get maxRamInput(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="recommend-win-conf-ram"]');
    }

    private get minGraphCardInput(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="min-win-conf-graph-card"]');
    }

    private get maxGraphCardInput(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="recommend-win-conf-graph-card"]');
    }

    private get minHddRamInput(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="min-win-conf-hdd-ram"]');
    }

    private get maxHddRamInput(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="recommend-win-conf-hdd-ram"]');
    }

    private get minDirectxInput(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="min-win-conf-directx"]');
    }

    private get maxDirectxInput(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="recommend-win-conf-directx"]');
    }

    private get minResolutionInput(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="min-win-conf-min-resolution"]');
    }

    private get maxResolutionInput(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="recommend-win-conf-min-resolution"]');
    }

    private get dropdownMinMaxRam(): Promise<ElementHandle<HTMLElement>[]> {
        return CommonHelper.waitForSelectors$$(this.page, '.tab-body .dropdown-toggle');
    }

    private get dropdownSelectLanguage(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="select-language"] .icon');
    }

    private get languageBtn(): Promise<ElementHandle<HTMLElement>[]> {
        return CommonHelper.waitForSelectors$$(this.page, '[dataid="select-language"] .dropdown-item');
    }

    private get addLanguageBtn(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="add-new-language"]');
    }

    private get checkboxLanguages(): Promise<ElementHandle<HTMLElement>[]> {
        return CommonHelper.waitForSelectors$$(this.page, 'ultra-language-item .checkbox__label');
    }

    private get linkNameInput(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="link-name"]');
    }

    private get linkUrlInput(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="link-url"]');
    }

    private get addExternalLinkBtn(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[dataid="link-url"] + button');
    }

    private get deleteLinkBtn(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, this.deleteLinkButton);
    }

    private get deleteVideoBtn(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, this.deleteVideoButton);
    }

    private get platformAssetsBtn(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="platform-assets-submenu"]');
    }

    private platformAssetsImage(size: string): Promise<ElementHandle<HTMLElement> | null> {
        return this.page.waitForSelector(`[additionalclass="poster--${size}"] label + div input`, { timeout: 50000 });
    }

    private waitForLoadedImage(size: string, image: string): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, `[additionalclass="poster--${size}"] label + div [style*="${image}"]`);
    }

    get storeProgressBar(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="store-page-menu"] [style="transform: rotate(360deg);"]');
    }

    private get editGameNameInput(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[label="Game Name"] input');
    }

    private get deleteAgeRatingsBtn(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="delete-age-rating"]');
    }

    private get deleteLanguageBtn(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="delete-language-item"]');
    }

    protected get disabledSecondaryGenres(): string {
        return '.disabled [groupname="genres_secondary"]';
    }

    protected get deleteTagButton(): string {
        return '[data-id="tag-item-delete"]';
    }

    protected imagesPath(image: string): string {
        return `test-data/images/${image}`;
    }

    protected get disabledAddLanguageBtn(): string {
        return `[data-id="add-new-language"][disabled]`;
    }

    protected get deleteLinkButton(): string {
        return '[data-id="delete-link-item"]';
    }

    protected get deleteMediaBtn(): string {
        return 'ultra-media-list .hover';
    }

    protected get deleteVideoButton(): string {
        return 'ultra-upload-video-links .hover';
    }

    protected get ageRatingsSection(): string {
        return 'ultra-age-ratings .category-item';
    }

    protected get languageSection(): string {
        return '[data-id="language-code-de-item"]';
    }

  @step('Open the "Main Information" tab')
    async openMainInformationTab(): Promise<void> {
        await CommonHelper.scrollAndClick(await this.mainInformationBtn);
    }

  @step('Check the number of valid checkmark')
  async checkValidCheckmark(toBe: number): Promise<void> {
      await expect((await this.settingsStatus('checkmark-invalid')).length).toBe(toBe);
  }

  @step('Check the number of invalid checkmark')
  async checkInvalidCheckmark(toBe: number): Promise<void> {
      await expect((await this.settingsStatus('checkmark-valid')).length).toBe(toBe);
  }

  @step('Get the "Section" title')
  async getTitleOfSection(section: number): Promise<string | undefined> {
      await CommonHelper.scrollToElement((await this.titleOfSection)[section]);
      return CommonHelper.getTextContent((await this.titleOfSection)[section]);
  }

  @step('Select release date')
  async addReleaseDate(): Promise<void> {
      const selectRelease = ['Specific Date', 'Coming Soon'];
      const random = await CommonHelper.getRandom(selectRelease);
      const input = await this.releaseInput(random);
      if(random === 'Specific Date') {
          await CommonHelper.hoverAndClick(input);
          await this.releaseDate(0, await CommonHelper.getRandomArbitrary(2, 7));
          await this.releaseDate(1, await CommonHelper.getRandomArbitrary(1, 13));
          await this.releaseDate(2, await CommonHelper.getRandomArbitrary(0, 28));
      } else {
          await CommonHelper.hoverAndClick(input);
      }
  }

  @step('Select release day')
  async releaseDate(dropdown: number, date: number): Promise<any> {
      await this.page.waitForTimeout(2000); // for stability
      await CommonHelper.focusAndClick((await this.dropdownDateBtn)[dropdown]);
      await this.waitForShowDropdownMenu;
      await CommonHelper.scrollAndClick((await this.fileSizeBtn)[date]);
  }

  @step('Fill the "Developer and publisher" info')
  async addDeveloperAndPublisherInfo(gameInfo: any): Promise<void> {
      await CommonHelper.setValue(await this.creatorsNameInput('Developer'), gameInfo.randomName);
      await CommonHelper.setValue(await this.creatorsNameInput('Publisher'), gameInfo.randomName);
  }

  @step('Select genres')
  async addGenres(): Promise<void> {
      await CommonHelper.scrollAndClick((await this.genreBtn('primary'))[await CommonHelper.getRandomArbitrary(0, 6)]);
      await this.page.waitForSelector(this.disabledSecondaryGenres, { timeout: 10000, hidden: true });
      await CommonHelper.scrollAndClick((await this.genreBtn('secondary'))[await CommonHelper.getRandomArbitrary(6, 12)]);
  }

  @step('Fill the "Tags" info')
  async addTag(gameInfo: any): Promise<void> {
      const selectTag = [gameInfo.firstTag, gameInfo.secondTag, gameInfo.thirdTag, gameInfo.fourthTag];
      await CommonHelper.setValue(await this.tagsInput, await CommonHelper.getRandom(selectTag));
      await (await this.tagsInput)!.press('Enter');
      await this.deleteTagBtn;
  }

  @step('Click the "Save" button')
  async saveChanges(): Promise<void> {
      await CommonHelper.hoverAndClick(await this.saveChangesBtn);
      await this.saveButtonIsHidden;
  }

  @step('Open the "About" tab')
  async openAboutTab(): Promise<void> {
      await CommonHelper.scrollAndClick(await this.aboutBtn);
  }

  @step('Fill the "About game" info')
  async addAboutInformation(gameInfo: any): Promise<void> {
      await this.fillTagLine(gameInfo);
      await this.fillDescription(gameInfo);
  }

  @step('Fill tag line data')
  async fillTagLine(gameInfo: any): Promise<void> {
      const selectTagline = [gameInfo.firstTagline, gameInfo.secondTagline];
      await CommonHelper.scrollToElement(await this.tagLineInput);
      await this.page.waitForTimeout(1000); // for stability
      await CommonHelper.setValue(await this.tagLineInput, await CommonHelper.getRandom(selectTagline));
  }

  @step('Fill description data')
  async fillDescription(gameInfo: any): Promise<void> {
      const selectDescription = [gameInfo.firstDescription, gameInfo.secondDescription];
      await CommonHelper.scrollToElement(await this.descriptionInput);
      await this.page.waitForTimeout(1000); // for stability
      await (await this.descriptionInput)!.click({ clickCount: 3 });
      await CommonHelper.setValue(await this.descriptionInput, await CommonHelper.getRandom(selectDescription));
  }

  @step('Add video link')
  async addVideoLink(gameInfo: any): Promise<void> {
      const selectTag = [gameInfo.firstYoutubeURL, gameInfo.secondYoutubeURL, gameInfo.thirdYoutubeURL];
      await CommonHelper.scrollToElement(await this.youtubeUrlInput);
      await CommonHelper.setValue(await this.youtubeUrlInput, await CommonHelper.getRandom(selectTag));
      await CommonHelper.scrollAndClick(await this.addLinkBtn);
      await this.checkYouTubeURL;
  }

  @step('Upload image')
  async uploadImage(slot: number): Promise<void> {
      const uploadImage = ['game1.jpg', 'game2.jpg', 'game3.jpg', 'game4.jpg'];
      await CommonHelper.scrollToElement(await this.uploadImageSection);
      await (await this.uploadImageSection)!.uploadFile(this.imagesPath(await CommonHelper.getRandom(uploadImage)));
      await this.ultraLoading;
      await (await this.mediaSlots)[slot];
  }

  @step('Open the "Details" tab')
  async openDetailsTab(): Promise<void> {
      await CommonHelper.scrollAndClick(await this.detailsBtn);
  }

  @step('Select play models')
  async addPlayModel(): Promise<void> {
      await this.page.waitForTimeout(3000); // for stability
      await CommonHelper.scrollAndClick((await this.playModelsBtn)[await CommonHelper.getRandomArbitrary(0, 3)]);
      await CommonHelper.scrollAndClick((await this.playModelsBtn)[await CommonHelper.getRandomArbitrary(3, 6)]);
  }

  @step('Add the Age Rating')
  async addRating(gameInfo: any): Promise<void> {
      await page.waitForTimeout(1000); // wait for stability
      await CommonHelper.scrollAndClick(await this.addAgeRatingBtn);
      await page.waitForTimeout(1000); // wait for stability
      await (await this.selectRatingDropdown)!.click();
      const random = await CommonHelper.getRandom(['cero', 'esrb', 'pegi']);
      await (await this.localisationBtn(random))!.click();
      if(random === 'esrb') {
          await (await this.ratingCategoryBtn)[await CommonHelper.getRandomArbitrary(0, 6)]!.click();
          await CommonHelper.setValue(await this.ratingDescriptionInput, gameInfo.ratingDescription);
      } else if(random === 'pegi') {
          await (await this.ratingCategoryBtn)[await CommonHelper.getRandomArbitrary(0, 5)]!.click();
          await CommonHelper.scrollAndClick((await this.ratingContentBtn)[await CommonHelper.getRandomArbitrary(0, 7)]);
      } else if(random === 'cero') {
          await (await this.ratingCategoryBtn)[await CommonHelper.getRandomArbitrary(0, 5)]!.click();
          await CommonHelper.scrollAndClick((await this.ratingContentBtn)[await CommonHelper.getRandomArbitrary(0, 9)]);
      }
      await (await this.addRatingBtn)!.click();
  }

  @step('Select features')
  async addFeature(): Promise<void> {
      await CommonHelper.scrollAndClick((await this.featuresBtn)[await CommonHelper.getRandomArbitrary(0, 5)]);
      await CommonHelper.scrollAndClick((await this.featuresBtn)[await CommonHelper.getRandomArbitrary(0, 5)]);
  }

  @step('Fill system requirements info')
  async addSystemRequirements(gameInfo: any): Promise<void> {
      await CommonHelper.scrollToElement(await this.minOsInput);
      await (await this.minOsInput)!.click({ clickCount: 3 });
      await CommonHelper.setValue(await this.minOsInput, gameInfo.minOsInput);
      await CommonHelper.setValue(await this.maxOsInput, gameInfo.maxOsInput);

      await CommonHelper.setValue(await this.minProcessorInput, gameInfo.minProcessorInput);
      await CommonHelper.setValue(await this.maxProcessorInput, gameInfo.maxProcessorInput);

      await CommonHelper.setValue(await this.minRamInput, gameInfo.minRamInput);
      await this.dropdownMinOrMax(0, 1);
      await CommonHelper.setValue(await this.maxRamInput, gameInfo.minRamInput);
      await this.dropdownMinOrMax(2, 2);

      await CommonHelper.setValue(await this.minGraphCardInput, gameInfo.minGraphCardInput);
      await CommonHelper.setValue(await this.maxGraphCardInput, gameInfo.maxGraphCardInput);

      await CommonHelper.setValue(await this.minHddRamInput, gameInfo.maxRamInput);
      await this.dropdownMinOrMax(1, 3);
      await CommonHelper.setValue(await this.maxHddRamInput, gameInfo.maxRamInput);
      await this.dropdownMinOrMax(3, 4);

      await CommonHelper.setValue(await this.minDirectxInput, gameInfo.directxInput);
      await CommonHelper.setValue(await this.maxDirectxInput, gameInfo.directxInput);

      await CommonHelper.setValue(await this.minResolutionInput, gameInfo.resolutionInput);
      await CommonHelper.setValue(await this.maxResolutionInput, gameInfo.resolutionInput);
  }

  @step('Select dropdown data')
  async dropdownMinOrMax(ram: number, size: number): Promise<void> {
      await CommonHelper.scrollAndClick((await this.dropdownMinMaxRam)[ram]);
      await CommonHelper.scrollAndClick((await this.fileSizeBtn)[size]);
  }

  @step('Add language')
  async addLanguage(): Promise<void> {
      await CommonHelper.scrollToElement(await this.dropdownSelectLanguage);
      await this.page.waitForTimeout(1000); // for stability
      await CommonHelper.hoverAndClick(await this.dropdownSelectLanguage);
      await this.waitForShowDropdownMenu;

      await CommonHelper.scrollAndClick((await this.languageBtn)[await CommonHelper.getRandomArbitrary(1, 28)]);
      await CommonHelper.hoverAndClick(await this.addLanguageBtn);
      await this.page.waitForSelector(this.disabledAddLanguageBtn, { timeout: 10000, visible: true });
      await this.checkboxOptionLanguage(0); //audio
      await this.checkboxOptionLanguage(1); //subtitles
      await this.checkboxOptionLanguage(2); //interface
  }

  @step('Select the language option')
  async checkboxOptionLanguage(option: number): Promise<void> {
      await CommonHelper.scrollAndClick((await this.checkboxLanguages)[option]);
  }

  @step('Add external link')
  async addExternalLink(gameInfo: any): Promise<void> {
      await CommonHelper.scrollAndClick(await this.linkNameInput);
      await CommonHelper.setValue(await this.linkNameInput, gameInfo.awardName);
      await CommonHelper.scrollAndClick(await this.linkUrlInput);
      await CommonHelper.setValue(await this.linkUrlInput, gameInfo.awardURL);
      await (await this.addExternalLinkBtn)!.click();
      await this.deleteLinkBtn;
  }

  @step('Open the "Platform Assets" tab')
  async openPlatformAssetsTab(): Promise<void> {
      await CommonHelper.scrollAndClick(await this.platformAssetsBtn);
  }

  @step('Upload the "Art box" image')
  async uploadBoxArt(): Promise<void> {
      const uploadImage = ['game1.jpg', 'game2.jpg', 'game3.jpg', 'game4.jpg'];
      const randomImage = await CommonHelper.getRandom(uploadImage);
      await (await this.platformAssetsImage('xl'))!.uploadFile(this.imagesPath(randomImage));
      await this.waitForLoadedImage('xl', randomImage);
  }

  @step('Upload the "Large hero" image')
  async uploadLargeHero(): Promise<void> {
      const uploadImage = ['big_img.jpg', 'big_img1.jpg'];
      const randomImage = await CommonHelper.getRandom(uploadImage);
      await (await this.platformAssetsImage('xxl'))!.uploadFile(this.imagesPath(randomImage));
      await this.waitForLoadedImage('xxl', randomImage);
  }

  @step('Upload the "Primary" image')
  async uploadPrimaryImagesWithTitle(): Promise<void> {
      const uploadImage = ['game1.jpg', 'game2.jpg'];
      const randomImage = await CommonHelper.getRandom(uploadImage);
      await (await this.platformAssetsImage('l'))!.uploadFile(this.imagesPath(randomImage));
      await this.waitForLoadedImage('l', randomImage);
  }

  @step('Upload the "Second primary" image')
  async uploadSecondaryImagesWithTitle(): Promise<void> {
      const uploadImage = ['game3.jpg', 'game4.jpg'];
      const randomImage = await CommonHelper.getRandom(uploadImage);
      await (await this.platformAssetsImage('s'))!.uploadFile(this.imagesPath(randomImage));
      await this.waitForLoadedImage('s', randomImage);
  }

  @step('Upload the "Icon" image')
  async uploadIcon(): Promise<void> {
      const uploadImage = ['profile_picture.png', 'profile_picture2.png', 'profile_picture3.png', 'profile_picture4.png'];
      const randomImage = await CommonHelper.getRandom(uploadImage);
      await (await this.platformAssetsImage('xs'))!.uploadFile(this.imagesPath(randomImage));
      await this.waitForLoadedImage('xs', randomImage);
      await page.waitForTimeout(2000); // wait for images to download
  }

  @step('Fill the "Game name" value')
  async newGameName(gameInfo: any): Promise<void> {
      await (await this.editGameNameInput)!.click({ clickCount: 3 });
      await CommonHelper.setValue(await this.editGameNameInput, gameInfo.gameName);
  }

  @step('Click the "Delete tag" button')
  async deleteTag(): Promise<void> {
      if (await this.page.$(this.deleteTagButton)) {
          await CommonHelper.scrollAndClick(await this.deleteTagBtn);
      }
  }

  @step('Click the "Delete Link" button')
  async deleteLink(): Promise<void> {
      if (await this.page.$(this.deleteLinkButton)) {
          await CommonHelper.scrollAndClick(await this.deleteLinkBtn);
      }
  }

  @step('Click the "Delete Video" button')
  async deleteVideo(): Promise<void> {
      if (await this.page.$(this.deleteVideoButton)) {
          await CommonHelper.scrollAndClick(await this.deleteVideoBtn);
      }
  }

  @step('Delete media')
  async deleteMedia(): Promise<void> {
      await page.waitForTimeout(1000); // wait for stability
      if (await this.page.$(this.deleteMediaBtn)) {
          await CommonHelper.scrollAndClick(await CommonHelper.waitForSelector(this.page, this.deleteMediaBtn));
      }
  }

  @step('Click the "Delete Age Ratings" button')
  async deleteAgeRatings(): Promise<void> {
      if (await this.page.$(this.ageRatingsSection)) {
          await CommonHelper.scrollToElement(await CommonHelper.waitForSelector(this.page, this.ageRatingsSection));
          await (await CommonHelper.waitForSelector(this.page, this.ageRatingsSection))!.hover();
          await CommonHelper.hoverAndClick(await this.deleteAgeRatingsBtn);
      }
  }

  @step('Click the "Delete Language" button')
  async deleteLanguage(): Promise<void> {
      if (await this.page.$(this.languageSection)) {
          await CommonHelper.scrollToElement(await CommonHelper.waitForSelector(this.page, this.languageSection));
          await (await CommonHelper.waitForSelector(this.page, this.languageSection))!.hover();
          await CommonHelper.hoverAndClick(await this.deleteLanguageBtn);
          await this.page.waitForTimeout(2000); // for stability
      }
  }
}
