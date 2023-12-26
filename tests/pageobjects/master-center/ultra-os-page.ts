import { ElementHandle, Page } from 'puppeteer';

import { CommonHelper } from '../../helpers/common.helper';
import { findUserByUsername } from '../../infrastructure/mongodb/mongo-connection';
import { step } from '../../helpers/allure.helper';

export class UltraOs {
    private readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    private get companyManagement(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="company-management-menu-item"]');
    }

    private get ultraRow(): Promise<ElementHandle[]> {
        return CommonHelper.waitForSelectors$$(this.page, 'ultra-table ultra-row');
    }

    private get pageTitle(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="info-preview-title-content"]');
    }

    private get companiesTab(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="companies-tab"]');
    }

    private get activeUsersTab(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="active-users-tab"]');
    }
    private get createCompanyBtn(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="create-company-button"]');
    }

    private get addMemberBtn(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page,'[data-id="add-member-button"]');
    }

    private get ultraDropdown(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="dropdown-toggle-button"]');
    }

    private get manageCompaniesBtn(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="dropdown-manage-companies-button"]');
    }

    private get manageCompanyBtn(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="dropdown-manage-company-button"]');
    }

    private get manageMembersBtn(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="dropdown-manage-members-button"]');
    }

    private get managePage(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, 'ultra-table ultra-header-row');
    }

    private get descriptionTxt(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="info-preview-description-content"]');
    }

    private get removeUserBtn(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="remove-user-button"]');
    }

    private get confirmMemberRemoval(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="confirm-button"]');
    }

    private get backButton(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="side-nav-back-button"]');
    }

    private get userManagement(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, '[data-id="user-management-menu-item"]');
    }

    private get username(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, this.userRowSelector);
    }

    private get footer(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page, 'ultra-footer');
    }

    private get userRowSelector(): string {
        return '[data-id="username-content"]';
    }

    private get companyRowSelector(): string {
        return '[data-id="company-name-content"]';
    }

  @step('Get the "Ultra row" value')
    async getUltraRow(): Promise<number> {
        return (await this.ultraRow).length;
    }

  @step('Get the "Apps txt header" value')
  async getTitleText(): Promise<string | undefined> {
      return CommonHelper.getTextContent(await this.pageTitle);
  }

  @step('Click on the "Company management" button')
  async clickCompanyManagementButton(): Promise<void> {
      await CommonHelper.hoverAndClick(await this.companyManagement);
      await this.ultraRow;
  }

  @step('Get the "Company title" value')
  async getCompanyTitleText(): Promise<string | undefined> {
      return CommonHelper.getTextContent(await this.descriptionTxt);
  }

  async getCountFromTab(tabElement: ElementHandle<HTMLElement>) {
      const tabText = await CommonHelper.getTextContent(tabElement);
      const count = CommonHelper.getTextBetween(tabText!, ' (',')');
      return parseFloat(count);
  }

  @step('Get the "Ultra OS Companies" count')
  async getCompaniesCount(): Promise<number> {
      return this.getCountFromTab((await this.companiesTab)!);
  }

  @step('Get the "Ultra OS active users" count')
  async getActiveUsersCount(): Promise<number> {
      return this.getCountFromTab((await this.activeUsersTab)!);
  }

  @step('Click on the "Create company" button')
  async clickCreateCompanyBtn(): Promise<void> {
      await CommonHelper.hoverAndClick(await this.createCompanyBtn);
  }

  @step('Click on the "Add member" button')
  async clickAddMemberBtn(): Promise<void> {
      await CommonHelper.hoverAndClick(await this.addMemberBtn);
  }

  @step('Open actions menu')
  async openActionsMenu(): Promise<void> {
      await CommonHelper.scrollToElement((await this.ultraRow)[0]);
      await (await this.ultraRow)[0]!.hover();
      await CommonHelper.scrollAndClick(await this.ultraDropdown);
  }

  @step('Click on the "Company management" button')
  async openManageMembers(): Promise<void> {
      await this.openActionsMenu();
      await CommonHelper.scrollAndClick(await this.manageMembersBtn);
  }

  @step('Click on the "Manage companies" button')
  async openManageCompanies(): Promise<void> {
      await this.openActionsMenu();
      await CommonHelper.scrollAndClick(await this.manageCompaniesBtn);
      await this.page.waitForTimeout(1000); // page info take some time to load
  }

  @step('Wait for load manage page')
  async loadManagePage(): Promise<void> {
      await this.managePage;
  }

  @step('Wait for page to have expected title')
  async waitForPageTitle(title: string): Promise<void> {
      await CommonHelper.waitForText(this.page, await this.pageTitle, title);
  }

  @step('Click on the "confirm member removal" button')
  async clickConfirmMemberRemoval(): Promise<void> {
      await (await this.confirmMemberRemoval)!.click();
      await this.page.waitForTimeout(5000); //for update info
  }

  @step('Click on the "Ultra OS link" button')
  async clickBackButton(): Promise<void> {
      await (await this.backButton)!.click();
  }

  @step('Click on the "User management" button')
  async clickUserManagementButton(): Promise<void> {
      await CommonHelper.scrollAndClick(await this.userManagement);
  }

  @step('Check user or company added')
  private async checkAdded(type: string, data: string | undefined): Promise<boolean> {
      let added = false;
      let selector;
      for (const row of (await this.ultraRow)) {
          switch (type) {
              case 'user':
                  selector = this.userRowSelector;
                  break;
              case 'company':
                  selector = this.companyRowSelector;
                  break;
              default:
                  throw new Error('Wrong type given!');
          }
          const rowElement = await row.$eval(selector, (el) => el.textContent!.trim());
          if (rowElement === data) {
              added = true;
              break;
          }
      }
      return added;
  }

  @step('Check user added to the company')
  checkUserAdded(user: any): Promise<boolean> {
      return this.checkAdded('user', user.username);
  }

  @step('Get user companies count')
  async getUserCompaniesCount() {
      return parseInt((await this.getCompanyTitleText())!.split(' ')[4]);
  }

  @step('Get user data of first user in the list')
  async getUserByUsername(usersDB: any): Promise<any> {
      return (await findUserByUsername(usersDB, await CommonHelper.getTextContent(await this.username)));
  }

  @step('Reload page')
  async reloadPage() {
      await CommonHelper.reloadPage(this.page);
  }

  @step('Check company added to the user')
  checkCompanyAdded(company: string | undefined): Promise<boolean> {
      return this.checkAdded('company', company);
  }

  @step('Open "Manage Company" from user management')
  async openManageCompany(company: any): Promise<void> {
      for (const row of (await this.ultraRow)) {
          const companyRow = await row.$eval(this.companyRowSelector, (el) => el.textContent?.trim());
          if (companyRow === company) {
              await CommonHelper.scrollToElement(row);
              await row.hover();
              break;
          }
      }
      await CommonHelper.scrollAndClick(await this.ultraDropdown);
      await CommonHelper.scrollAndClick(await this.manageCompanyBtn);
  }

  @step('Remove company or user in Master Center')
  private async removeRowMasterCenter(type: string, data: string): Promise<void> {
      let selector;
      for (const row of (await this.ultraRow)) {
          switch (type) {
              case 'user':
                  selector = this.userRowSelector;
                  break;
              case 'company':
                  selector = this.companyRowSelector;
                  break;
              default:
                  throw new Error('Wrong type given!');
          }
          const rowElement = await row.$eval(selector, (el) => el.textContent?.trim());
          if (rowElement === data) {
              await CommonHelper.scrollToElement(row);
              await row.hover();
              break;
          }
      }
      await CommonHelper.hoverAndClick((await this.ultraDropdown));
      await CommonHelper.hoverAndClick((await this.removeUserBtn));
      await (await this.confirmMemberRemoval)!.click();
      await this.page.waitForTimeout(5000); //for update info
  }

  @step('Remove company from user')
  async removeCompanyFromUser(company: any): Promise<void> {
      await this.removeRowMasterCenter('company', company);
  }

  @step('Remove user from company')
  async removeUserFromCompany(user: any): Promise<void> {
      await this.removeRowMasterCenter('user', user.username);
  }

  @step('Load all containers')
  async loadAllContainers(number: number): Promise<any> {
      while (!(number === (await this.getUltraRow()))) {
          await (await this.footer)!.hover();
          await this.page.waitForTimeout(1000);
      }
  }
}
