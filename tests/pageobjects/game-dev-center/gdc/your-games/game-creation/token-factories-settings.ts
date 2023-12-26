import { ElementHandle, Page } from 'puppeteer';
import { CommonHelper } from '../../../../../helpers/common.helper';
import { step } from '../../../../../helpers/allure.helper';
import { TokenFactoriesCreating } from './token-factories-creating-page';

export class TokenFactories {
    private readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    private get storeTokenFactoriesBtn(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="store-token-factories-submenu"]');
    }

    private get createTokenBtn(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="create-token-factory-btn"]');
    }

    private get nextBtn(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="create-token-factory-next-step-btn"]');
    }

    private get tokenNameInput(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="token-factory-name"]');
    }

    private get typeBtn(): Promise<ElementHandle<HTMLElement>[]> {
        return CommonHelper.waitForSelectors$$(this.page, '.row-principal ultra-dlc-type-item');
    }

    private get moreOptionsBtn(): Promise<ElementHandle<HTMLElement>[]> {
        return CommonHelper.waitForSelectors$$(this.page, 'button[id="gameTokenStatus"]');
    }

    private get editDiscountBtn(): Promise<ElementHandle[]> {
        return CommonHelper.waitForSelectors$$(this.page, '[ultraautotestattribute="edit-discount-menu-item"]');
    }

    private get createDiscountBtn(): Promise<ElementHandle[]> {
        return CommonHelper.waitForSelectors$$(this.page, '[ultraautotestattribute="create-discount-menu-item"]',{ visible: true });
    }

    private get discountDatePicker(): Promise<ElementHandle[]> {
        return CommonHelper.waitForSelectors$$(this.page, '[ultraautotestattribute="date-picker-field"]');
    }

    private get discountDayPicker(): Promise<ElementHandle[]> {
        return CommonHelper.waitForSelectors$$(this.page,'div.btn-light.ng-star-inserted:not(.text-muted)');
    }

    private get discountHourPicker(): Promise<ElementHandle[]> {
        return CommonHelper.waitForSelectors$$(this.page,'[ultraautotestattribute="dropdown-toggle-button"]');
    }

    private get discountTimePicker(): Promise<ElementHandle[]> {
        return CommonHelper.waitForSelectors$$(this.page,'div.dropdown-item');
    }

    private get deleteBtn(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[ultraautotestattribute="delete-discount-menu-item"]');
    }

    private get upcomingDiscountLabel(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[ultraautotestattribute="upcomig-discount-percentage-content"]');
    }

    private get deleteDiscountBtn(): Promise<ElementHandle[]> {
        return CommonHelper.waitForSelectors$$(this.page, 'ultra-confirmation button');
    }
    private get discountField(): Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[ultraautotestattribute="discount-field"]');
    }
    private get liveDiscountPercentageLabel():Promise<ElementHandle<HTMLElement> | null> {
        return CommonHelper.waitForSelector(this.page, '[ultrainfinitescroll] > div:first-of-type [ultraautotestattribute="discount-percentage-content"]');
    }

  @step('Open the "Store Token Factories" tab')
    async openStoreTokenFactoriesTab(): Promise<void> {
        await CommonHelper.scrollAndClick(await this.storeTokenFactoriesBtn);
    }

  @step('Create a new store token factory')
  async tokenFactories(gameInfo: any): Promise<TokenFactoriesCreating> {
      await CommonHelper.hoverAndClick(await this.createTokenBtn);
      await CommonHelper.setValue(await this.tokenNameInput, gameInfo.tokenName);
      await CommonHelper.hoverAndClick(await this.nextBtn);
      await (await this.typeBtn)[await CommonHelper.getRandomArbitrary(0, 2)]!.click();
      await CommonHelper.hoverAndClick(await this.nextBtn);
      return new TokenFactoriesCreating(this.page);
  }

  @step('Open the "More Options" dropdown menu of a specific token factory')
  async openMoreOptionsBtn(option: any): Promise<void> {
      await CommonHelper.focusAndClick((await this.moreOptionsBtn)[option]!);
  }

  @step('Click on the "Edit" Discount button')
  async clickEditDiscount(): Promise<void> {
      await CommonHelper.focusAndClick((await this.editDiscountBtn)[0]);
  }

  @step('Fill in the amount of the discount in %')
  async fillDiscountValue(discountPercentage:string): Promise<void> {
      await CommonHelper.setValue(await this.discountField,discountPercentage);
  }

  @step('Set a start and End date for the liscount')
  async discountPeriod(date:any,day:any): Promise<void> {
      await CommonHelper.focusAndClick((await this.discountDatePicker)[date]);
      await CommonHelper.focusAndClick((await this.discountDayPicker)[day]);
  }

  @step('Set a Time Frame for the discount')
  async discountTimePeriod(hour:any,time:any): Promise<void> {
      await CommonHelper.focusAndClick((await this.discountHourPicker)[hour]);
      await CommonHelper.focusAndClick((await await this.discountTimePicker)[time]);
  }

  @step('donfirm the update of the discount data')
  async confirmUpdateofDiscount(): Promise<void> {
      await CommonHelper.focusAndClick(await this.nextBtn);
  }

  @step('Edit discount for the token factory')
  async editDiscount(discountPercentage:string): Promise<any> {
      // Clicking the edit button for the discount.
      await this.clickEditDiscount();

      // Setting discount percentage and date to token factory game.
      await this.fillDiscountValue(discountPercentage);
      await this.discountPeriod(0,0);
      await this.discountPeriod(1,2);
      await this.confirmUpdateofDiscount();
  }

  @step('Get the upcoming "DiscountBasic Percentage label" value')
  async getUpcomingDiscountLabel(): Promise<any> {
      return await CommonHelper.getTextContent(await this.upcomingDiscountLabel);
  }

  @step('Delete discount for the token factory')
  async deleteDiscount(): Promise<void> {
      await CommonHelper.focusAndClick(await this.deleteBtn);
      await CommonHelper.focusAndClick((await this.deleteDiscountBtn)[1]);
  }

  @step('Create a token factory discount')
  async createDiscount(discountPercentage:string): Promise<any> {
      await CommonHelper.focusAndClick((await this.createDiscountBtn)[0]);
      await this.fillDiscountValue(discountPercentage);

      // Setting discount date and time to discount.
      await this.discountPeriod(0,0);
      await this.discountPeriod(1,3);
      await this.discountTimePeriod(0,1);
      await this.discountTimePeriod(1,25);

      await this.confirmUpdateofDiscount();
  }

  @step('Get the live "DiscountBasic Percentage label" value')
  async getLiveDiscountPercentageLabel(): Promise<any> {
      return await CommonHelper.getTextContent(await this.liveDiscountPercentageLabel);
  }
}
