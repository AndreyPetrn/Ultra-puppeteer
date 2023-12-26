import { Browser, ElementHandle } from 'puppeteer';
import { CommonHelper } from '../../../helpers/common.helper';
import { step } from '../../../helpers/allure.helper';
import { YourGamesPage } from './your-games/your-games-page';
import { CompanyMembersPage } from './company-members-page';
import { GroupAndPrivilegesPage } from './group-and-privileges-page';
const config = require('../../../../config/config.data.json').env.GDC;

export class GDCPage extends CommonHelper {
  @step('Wait for open GDC page')
    static async getInstance(browser: Browser): Promise<GDCPage> {
        return new GDCPage(await this.getPageFromClient(browser, config.URL));
    }

  private get yourGamesBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="games-menu"]');
  }

  private get companyMembersBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="members-menu"]');
  }

  private get groupAndPrivilegesBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="groups-menu"]');
  }

  private yourCompanyBtn(company: string): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, `[data-id="company-name-${company}"]`);
  }

  @step('Open the "Your Company" page')
  async goToYourCompany(userData: any): Promise<void> {
      await this.page.waitForTimeout(2000); // wait for load all companies
      await CommonHelper.scrollAndClick(await this.yourCompanyBtn(userData.companyName));
  }

  @step('Open the "Your Games" page')
  async goToYourGamesPage(): Promise<YourGamesPage> {
      await (await this.yourGamesBtn)!.click();
      return new YourGamesPage(this.page);
  }

  @step('Open the "Company Members" page')
  async goToCompanyMembers(): Promise<CompanyMembersPage> {
      await (await this.companyMembersBtn)!.click();
      return new CompanyMembersPage(this.page);
  }

  @step('Open the "User Group & Privileges" page')
  async goToGroupAndPrivileges(): Promise<GroupAndPrivilegesPage> {
      await (await this.groupAndPrivilegesBtn)!.click();
      return new GroupAndPrivilegesPage(this.page);
  }
}
