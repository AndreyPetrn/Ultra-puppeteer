import { ElementHandle, Page } from 'puppeteer';
import { step } from '../../../helpers/allure.helper';
import { CommonHelper } from '../../../helpers/common.helper';

const data = require('../../../../test-data/page-data.json').GDC.CompanyMembers;

export class CompanyMembersPage {
    private readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    private get userVerificationInfo(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="developer-status"]');
    }

    private get checkCompanyMembersHeader(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="info-preview-title"]');
    }

    private get checkCompanyMembersInfo(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="info-preview-description"]');
    }

    private get companyMembersUserEmail(): Promise<ElementHandle[]> {
        return CommonHelper.waitForSelectors$$(this.page, '[data-id="user-data-email"]');
    }

    private get emailAddressInput(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="add-user-input"]');
    }

    private get addUsersBtn(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="add-users-btn"]');
    }

    private get userAddStatusTxt(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="result-message"]');
    }

    private get dropdownBtn(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="user-options-dropdown"]');
    }

    private get removeUserBtn(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="remove-user-btn"]');
    }

    private get addNewUserBtn(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="add-user-btn"]');
    }

    private get companyUsers(): Promise<ElementHandle[]> {
        return CommonHelper.waitForSelectors$$(this.page, '[data-id="user-row"]');
    }

    private get waitForLoadCompanyMembersPage(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="company-view-container"]');
    }

  @step('Get the "Company Members" title')
    async getCompanyMembersHeader(): Promise<string | undefined> {
        return CommonHelper.getTextContent(await this.checkCompanyMembersHeader);
    }

  @step('Get the "User Verification" value')
  async getUserVerificationInfo(): Promise<string | undefined> {
      return CommonHelper.getTextContent(await this.userVerificationInfo);
  }

  @step('Get the "Company Members" info')
  async getCompanyMembersInfo(): Promise<string | undefined> {
      return CommonHelper.getTextContent(await this.checkCompanyMembersInfo);
  }

  @step('Get the "User Email" value')
  async getUserEmail(user: number): Promise<string | undefined> {
      return CommonHelper.getTextContent((await this.companyMembersUserEmail)[user]);
  }

  @step('Get the "User Add Status" value')
  async getUserAddStatus(): Promise<string | undefined> {
      return CommonHelper.getTextContent(await this.userAddStatusTxt);
  }

  @step('Get "App Items" number')
  async getAppItems(): Promise<number> {
      return (await this.companyUsers).length;
  }

  @step('Check "Company Members" page')
  async checkCompanyMembersPage(userData: any): Promise<void> {
      await expect(await this.getUserVerificationInfo()).toContain(data.verificationInfo);
      await expect(await this.getCompanyMembersHeader()).toContain(data.gdcHeader);
      await expect(await this.getCompanyMembersInfo()).toContain(userData.companyName);
      await this.addNewUserBtn;
  }

  @step('Add a new user to the company')
  async addNewUsersToCompany(userData: any): Promise<void> {
      await this.waitForLoadCompanyMembersPage;
      await (await this.addNewUserBtn)!.click();
      await CommonHelper.setValue(await this.emailAddressInput, userData.email);
      await (await this.addUsersBtn)!.click();
      await expect(await this.getUserAddStatus()).toContain(data.userAddStatus);
      await (await this.addUsersBtn)!.click();
  }

  @step('Check new user')
  async checkNewUser(userData: any): Promise<void> {
      await page.waitForTimeout(3000);// wait for a member to be added to the company
      const expectedValue = (await this.getUserEmail(0) === userData.email) ?
          await this.getUserEmail(0) : await this.getUserEmail(1);
      await expect(expectedValue).toContain(userData.email);
  }

  @step('Remove members from the company')
  async removeMemberFromCompany(userData: any): Promise<void> {
      await this.waitForLoadCompanyMembersPage;
      if(await this.getAppItems() === 2) {
          await this.getUserEmail(0) === userData.email ? await this.removeUser(0) : await this.removeUser(1);
      }
  }

  @step('Waiting for removal user')
  async removeUser(user: number): Promise<void> {
      await (await this.companyMembersUserEmail)[user]!.click();
      await (await this.dropdownBtn)!.click();
      await (await this.removeUserBtn)!.click();
  }
}
