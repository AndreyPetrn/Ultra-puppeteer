import { ElementHandle, Page } from 'puppeteer';
import { step } from '../../../helpers/allure.helper';
import { CommonHelper } from '../../../helpers/common.helper';

const data = require('../../../../test-data/page-data.json').GDC.GroupAndPrivileges;

export class GroupAndPrivilegesPage {
    private readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    private get userVerificationInfo(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="developer-status"]');
    }

    private get userGroupsAndPrivilegesHeader(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="company-groups-title"]');
    }

    private get userGroupsAndPrivilegesInfo(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="company-groups-description"]');
    }

    private get companyBtn(): Promise<ElementHandle[]> {
        return CommonHelper.waitForSelectors$$(this.page, '[data-id="expansion-panel-container"]');
    }

    private get companyUsersBtn(): Promise<ElementHandle | any> {
        return CommonHelper.waitForSelector(this.page, '[data-id="company-group-active-true"] [data-id="company-group-users-tab"]');
    }

    private companyGroupRow(group: string): Promise<ElementHandle | any> {
        return CommonHelper.waitForSelector(this.page, `[data-id="company-group-name-${group}"]`);
    }

    private get groupSizeNum(): Promise<ElementHandle[]> {
        return CommonHelper.waitForSelectors$$(this.page, '[data-id="company-group-count"]');
    }

    private get groupName(): Promise<ElementHandle[]> {
        return CommonHelper.waitForSelectors$$(this.page, '[data-id="company-group-name"]');
    }

    private checkUserInGroup(email: string): Promise<ElementHandle | any> {
        return CommonHelper.waitForSelector(this.page, `[data-id="company-group-user-email-${email}"] [data-id="company-group-user-details"]`);
    }

    private get groupIsEmptyText(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, `[data-id="company-group-active-true"] [data-id="company-group-section"]`);
    }

    private get legalBtn(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="legal-link"]');
    }

  @step('Get the "Group is empty" message')
    async getGroupIsEmptyMessage(): Promise<string | undefined> {
        return await CommonHelper.getTextContent(await this.groupIsEmptyText);
    }

  @step('Get the "User Groups & Privileges" header')
  async getUserGroupsAndPrivilegesHeader(): Promise<string | undefined> {
      return CommonHelper.getTextContent(await this.userGroupsAndPrivilegesHeader);
  }

  @step('Get the "User Verification" Info')
  async getUserVerificationInfo(): Promise<string | undefined> {
      return CommonHelper.getTextContent(await this.userVerificationInfo);
  }

  @step('Get the "User Groups & Privileges" info')
  async getUserGroupsAndPrivilegesInfo(): Promise<string | undefined> {
      return CommonHelper.getTextContent(await this.userGroupsAndPrivilegesInfo);
  }

  @step('Get the "Group size" value')
  async getGroupSize(number: number): Promise<string | undefined> {
      return CommonHelper.getTextContent((await this.groupSizeNum)[number]);
  }

  @step('Get the "Group name" value')
  async getGroupName(group: number): Promise<string | undefined> {
      return CommonHelper.getTextContent((await this.groupName)[group]);
  }

  @step('Check game dev center displayed')
  async checkUserGroupsAndPrivilegesPage(): Promise<void> {
      await expect(await this.getUserVerificationInfo()).toContain(data.verificationInfo);
      await expect(await this.getUserGroupsAndPrivilegesHeader()).toContain(data.header);
      await expect(await this.getUserGroupsAndPrivilegesInfo()).toContain(data.info);
  }

  @step('Check "User Groups & Privileges" page')
  async checkUserGroupsAndPrivileges(owner: any): Promise<void | null> {
      const groups = ['company_admin', 'company_owner', 'company_member'];
      for (const el of groups) {
          await CommonHelper.hoverAndClick(await this.companyGroupRow(el));
          await CommonHelper.hoverAndClick(await this.companyUsersBtn);
          if (el !== 'company_admin') {
              await this.checkUserInGroup(owner.email);
          } else {
              await expect(await this.getGroupIsEmptyMessage()).toBe(data.emptyGroupMessage);
          }
      }
  }

  @step('Check that the new member is added to the company')
  async checkNewCompanyMember(userData: any): Promise<void> {
      await (await this.companyGroupRow('company_member'))!.click();
      await (await this.companyUsersBtn)!.click();
      await this.checkUserInGroup(userData.email);
  }

  @step('Check that the new member is deleted from the company')
  async checkUserDeleted(): Promise<void> {
      await (await this.companyBtn)[2]!.click();
      await (await this.companyUsersBtn)!.click();
  }

  @step('Check all groups size')
  async checkGroupSize(admin: string, owner: string, member: string): Promise<void> {
      await this.checkSize('company_admin', admin);
      await this.checkSize('company_owner', owner);
      await this.checkSize('company_member', member);
  }

  @step('Check the "Group size" data')
  async checkSize(groupName: string, userCount: string): Promise<void> {
      const groupCount = 3;
      for (let i = 0; i < groupCount; i++) {
          if (await this.getGroupName(i) === groupName) {
              expect(await this.getGroupSize(i)).toBe(userCount);
          }
      }
  }

  @step('Click on the "Legal link" button')
  async clickLegal(): Promise<void> {
      await CommonHelper.scrollAndClick(await this.legalBtn);
  }
}
