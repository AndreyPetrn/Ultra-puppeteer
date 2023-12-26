import { ElementHandle, Page } from 'puppeteer';
import { CommonHelper } from '../../../../../helpers/common.helper';
import { step } from '../../../../../helpers/allure.helper';

export class TokenFactoriesCreating {
    private readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    get waitForTokenPage(): Promise<ElementHandle<HTMLElement>[]> {
        return CommonHelper.waitForSelectors$$(this.page, 'ultra-tokens-factories-layout');
    }

    private get mainInfoBtn(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="token-main-information-menu"]');
    }

    private settingsStatus(status: string): Promise<ElementHandle<HTMLElement>[]> {
        return CommonHelper.waitForSelectors$$(this.page, `[data-value="${status}"]`);
    }

    private get tokenDescriptionInput(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[csscountclass="token-count"] > div > textarea');
    }

    private tokenImg(size: string): Promise<ElementHandle<HTMLElement> | null> {
        return this.page.waitForSelector(`[sizetext*="${size}"] input`, { timeout: 50000 });
    }

    private get dropdownSelectLanguageBtn(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="select-language"] .icon');
    }

    private get waitForShowDropdownMenu(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '.dropdown-menu.show');
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

    private get titleOfSectionTxt(): Promise<ElementHandle<HTMLElement>[]> {
        return CommonHelper.waitForSelectors$$(this.page, 'ultra-field-title h5');
    }

    private get saveChangesBtn(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="save-changes"]');
    }

    private get saveButtonIsHidden(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="save-changes-dialog"]');
    }

    private get typeAndContentBtn(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="type-content-menu"]');
    }

    private get gameBuildFormBtn(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, 'ultra-expansion-panel-header i');
    }

    private get gameBuildsBtn(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, 'ultra-form-item .branch');
    }

    private get geofencingBtn(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="geofencing-menu"]');
    }

    private get pricingAndRevenueSharesBtn(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="pricing-revenue-shares-menu"]');
    }

    private get revenueMessageTxt(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, 'ultra-revenue-message span');
    }

    private countryCheckbox(id: string): Promise<ElementHandle<HTMLElement> | null> {
        return this.page.waitForSelector(`[id="ultra-checkbox-${id}"] + label .check`, { timeout: 50000 });
    }

    private get searchCountryInput(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[icon="search"] input');
    }

    private waitForGeofencingRules(country: string): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page,`[class*="iti__${country}"]`);
    }

    private get pricingBtn(): Promise<ElementHandle<HTMLElement>[]> {
        return CommonHelper.waitForSelectors$$(this.page, '[data-id="revenue-type"]');
    }

    private get priceInput(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="editable-input"]');
    }

    private get remainingRevenueInput(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="revenue-remaining-input"]');
    }

    private get promoterPlusBtn(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="revenue-promoter-button"]');
    }

    private get tradabilityAndResellabilityBtn(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="tradability-resellability-menu"]');
    }

    private get tradableBtn(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="tradability-enabled"]');
    }

    private get minimumResellBtn(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="fixed-minimum-resell-price"]');
    }

    private get minimumResellInput(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="fixed-minimum-resell-price-value"]');
    }

    private get mediaBtn(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="media-menu"]');
    }

    private get uploadImageSection(): Promise<ElementHandle<HTMLElement> | null> {
        return this.page.waitForSelector('[data-id="upload-form-file-input"]', { timeout: 50000 });
    }

    private get ultraLoading(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, 'ultra-loading');
    }

    private get mediaSlots(): Promise<ElementHandle<HTMLElement>[]> {
        return CommonHelper.waitForSelectors$$(this.page, '[data-id="media-slot-active"]');
    }

    private get backHomeBtn(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, 'ultra-side-nav .btn-redirect');
    }

    private get previewTokenFactoryBtn(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="preview-token-factory"]');
    }

    private get checkPreviewToken(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '.preview.position-relative');
    }

    private get exitTokenPreviewBtn(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="exit-token-preview"]');
    }

    protected get disabledAddLanguageBtn(): string {
        return '[data-id="add-new-language"][disabled]';
    }

    protected imagesPath(image: string): string {
        return `test-data/images/${image}`;
    }

    protected get tradableMessage(): string {
        return '[message="You cannot set a free game as tradable"]';
    }

  @step('Get the "Revenue" message')
    async getRevenueMessage(): Promise<string | undefined> {
        return CommonHelper.getTextContent(await this.revenueMessageTxt);
    }

  @step('Check the number of valid checkmark')
  async checkValidCheckmark(toBe: number): Promise<void> {
      await expect((await this.settingsStatus('checkmark-valid')).length).toBe(toBe);
  }

  @step('Check the number of invalid checkmark')
  async checkInvalidCheckmark(toBe: number): Promise<void> {
      await expect((await this.settingsStatus('checkmark-invalid')).length).toBe(toBe);
  }

  @step('Open the "Main Info" tab')
  async openMainInfoTab(): Promise<void> {
      await CommonHelper.scrollAndClick(await this.mainInfoBtn);
  }

  @step('Add the token description')
  async tokenDescription(gameInfo: any): Promise<void> {
      const uploadImage = [gameInfo.firstDescription, gameInfo.secondDescription];
      await CommonHelper.setValue(await this.tokenDescriptionInput, await CommonHelper.getRandom(uploadImage));
  }

  @step('Add token "Factories Images"')
  async tokenFactoriesImages(): Promise<void> {
      const uploadImage = ['game1.jpg', 'game2.jpg', 'game3.jpg', 'game4.jpg'];
      await (await this.tokenImg('120'))!
          .uploadFile(this.imagesPath(await CommonHelper.getRandom(uploadImage)));
  }

  @step('Add the token main image')
  async tokenMainImages(): Promise<void> {
      const uploadImage = ['big_img.jpg', 'big_img1.jpg'];
      await (await this.tokenImg('1920'))!
          .uploadFile(this.imagesPath(await CommonHelper.getRandom(uploadImage)));
  }

  @step('Add language')
  async addLanguage(): Promise<void> {
      await CommonHelper.scrollToElement(await this.dropdownSelectLanguageBtn);
      await CommonHelper.hoverAndClick(await this.dropdownSelectLanguageBtn);
      await this.waitForShowDropdownMenu;

      await CommonHelper.scrollAndClick((await this.languageBtn)[await CommonHelper.getRandomArbitrary(0, 28)]);
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

  @step('Get the "Section" title')
  async getTitleOfSection(section: number): Promise<string | undefined> {
      await CommonHelper.scrollToElement((await this.titleOfSectionTxt)[section]);
      return CommonHelper.getTextContent((await this.titleOfSectionTxt)[section]);
  }

  @step('Click the "Save" button')
  async saveChanges(): Promise<void> {
      await (await this.saveChangesBtn)!.click();
      await this.saveButtonIsHidden;
  }

  @step('Open the "Type and Content" tab')
  async openTypeAndContent(): Promise<void> {
      await CommonHelper.scrollAndClick(await this.typeAndContentBtn);
  }

  @step('Select what the users getting your Token will access to')
  async availableContent(): Promise<void> {
      await CommonHelper.hoverAndClick(await this.gameBuildFormBtn);
      await CommonHelper.hoverAndClick(await this.gameBuildsBtn);
  }

  @step('Open the "Geofencing" tab')
  async openGeofencing(): Promise<void> {
      await CommonHelper.scrollAndClick(await this.geofencingBtn);
  }

  @step('Select geofencing rules')
  async geofencingRules(gameInfo: any): Promise<void> {
      const uploadImage = [gameInfo.firstCountry, gameInfo.thirdCountry];
      const randomCountry = await CommonHelper.getRandom(uploadImage);

      await CommonHelper.setValue(await this.searchCountryInput, randomCountry);
      if(randomCountry === gameInfo.thirdCountry) {
          await this.waitForGeofencingRules('bs');
          await this.page.waitForTimeout(5000);
          await CommonHelper.scrollAndClick(await this.countryCheckbox('244'));
      } else if(randomCountry === gameInfo.firstCountry) {
          await this.waitForGeofencingRules('us');
          await this.page.waitForTimeout(5000);
          await CommonHelper.scrollAndClick(await this.countryCheckbox('246'));
      }
  }

  @step('Open pricing and RevenueShares tab')
  async openPricingAndRevenueShares(): Promise<void> {
      await CommonHelper.scrollAndClick(await this.pricingAndRevenueSharesBtn);
  }

  @step('Add pricing and revenue shares info')
  async pricingAndRevenueShares(gameInfo: any): Promise<void> {
      const random = ['Premium', 'Free'];
      if(await CommonHelper.getRandom(random) === 'Premium') {
          await CommonHelper.scrollAndClick((await this.pricingBtn)[0]);
          const USD = await CommonHelper.getRandomArbitrary(1, 41);

          await CommonHelper.scrollToElement(await this.priceInput);
          await CommonHelper.setValue(await this.priceInput, `${USD}`);

          await CommonHelper.scrollToElement(await this.remainingRevenueInput);
          await CommonHelper.setValue(await this.remainingRevenueInput, `${USD}`);

          await CommonHelper.scrollAndClick(await this.promoterPlusBtn);
          await expect(await this.getRevenueMessage()).toBe(gameInfo.revenueMessage);
      } else {
          await CommonHelper.scrollAndClick((await this.pricingBtn)[1]);
      }
  }

  @step('Open the "Tradability and Resellability" tabs')
  async openTradabilityAndResellability(): Promise<void> {
      await CommonHelper.scrollAndClick(await this.tradabilityAndResellabilityBtn);
  }

  @step('Add the tradability and resellability')
  async tradabilityAndResellability(): Promise<void> {
      const random = ['Tradable', 'Not Tradable'];
      if (await this.page.$(this.tradableMessage) === null) {
          if (await CommonHelper.getRandom(random) === 'Tradable') {
              await (await this.tradableBtn)!.click();
              await CommonHelper.hoverAndClick(await this.minimumResellBtn);
              const minimumResellInput = await this.minimumResellInput;
              const randomValue = String(await CommonHelper.getRandomArbitrary(1, 41));
              await CommonHelper.setValue(minimumResellInput, randomValue);
              await this.saveChanges();
              await this.checkValidCheckmark(1);
          }
      }
  }

  @step('Open the "Media" tab')
  async openMedia(): Promise<void> {
      await CommonHelper.scrollAndClick(await this.mediaBtn);
  }

  @step('Upload image')
  async uploadImage(slot: number): Promise<void> {
      const uploadImage = ['game1.jpg', 'game2.jpg', 'game3.jpg', 'game4.jpg'];
      await CommonHelper.scrollToElement(await this.uploadImageSection);
      await (await this.uploadImageSection)!.uploadFile(this.imagesPath(await CommonHelper.getRandom(uploadImage)));
      await this.ultraLoading;
      await expect((await this.mediaSlots).length).toBe(slot);
  }

  @step('Check token preview')
  async tokenPreview(): Promise<void> {
      await CommonHelper.scrollAndClick(await this.previewTokenFactoryBtn);
      await this.checkPreviewToken;
      await CommonHelper.scrollAndClick(await this.exitTokenPreviewBtn);
  }

  @step('Click the "Go back" button')
  async clickGoBack(): Promise<void> {
      await CommonHelper.scrollAndClick(await this.backHomeBtn);
  }
}
