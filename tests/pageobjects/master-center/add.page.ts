import { Browser, ElementHandle } from 'puppeteer';

import { CommonHelper } from '../../helpers/common.helper';
import { step } from '../../helpers/allure.helper';

const config = require('../../../config/config.data.json').env.MASTERCENTER;

export class AddPage extends CommonHelper {
  @step('Wait for open Add User page')
    static async getInstance(browser: Browser): Promise<AddPage> {
        return new AddPage(await this.getPageFromClient(browser, config.MCCOMPANY));
    }

  private get companyNameField(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="company-name-field"]');
  }

  private get phoneField(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="phone-field"]');
  }

  private get emailField(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="email-field"]');
  }

  private get streetField(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="street-field"]');
  }

  private get stateField(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="state-field"]');
  }

  private get cityField(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="city-field"]');
  }

  private get countryField(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="country-field"]');
  }

  private get zipcodeField(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="zipcode-field"]');
  }

  private get userToAddField(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="user-to-add-field"]');
  }

  private get createCompanyBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="create-company-button"]');
  }

  private get addMembersBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="add-members-button"]');
  }

  private get message(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="success-message-container"]');
  }

  private get createCompanyPageTitle(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="create-company-title-content"]');
  }

  private get addUserPageTitle(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="add-user-title-content"]');
  }

  private get companyCreatedMessage(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="company-created-message-content"]');
  }

  private get companyDropdown(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="company-dropdown"] [data-id="dropdown-toggle-button"]');
  }

  @step('Wait for "Add user page" title')
  async waitForAddUserPageTitle(title: string): Promise<void> {
      await CommonHelper.waitForText(this.page, await this.addUserPageTitle, title);
  }

  @step('Wait for "Create company" title')
  async waitForCreateCompanyPageTitle(title: string): Promise<void> {
      await CommonHelper.waitForText(this.page, await this.createCompanyPageTitle, title);
  }

  @step('Get the "Message" value')
  async getMessageText(): Promise<string|undefined> {
      return CommonHelper.getTextContent(await this.message);
  }

  @step('Get the "Company message" value')
  async getCompanyCreatedMessage(): Promise<string|undefined> {
      return CommonHelper.getTextContent(await this.companyCreatedMessage);
  }

  @step('Add user to company')
  async addUserToCompany(data: any): Promise<void> {
      data.email?
          await CommonHelper.setValue(await this.userToAddField, data.email):
          await CommonHelper.setValue(await this.userToAddField, data);
      await (await this.addMembersBtn)!.click();
  }

  @step('Close page')
  closeTab(): Promise<void> {
      return this.page.close();
  }

  @step('Created new company')
  async createNewCompany(data: any, user: any): Promise<any> {
      await (await this.companyNameField)!.focus();
      await CommonHelper.setValue(await this.companyNameField, await data.companyName);

      await (await this.phoneField)!.focus();
      await CommonHelper.setValue(await this.phoneField, await data.phone);

      await (await this.emailField)!.focus();
      await CommonHelper.setValue(await this.emailField, await user.email);//Owner

      await (await this.streetField)!.focus();
      await CommonHelper.setValue(await this.streetField, await data.streetName);

      await (await this.stateField)!.focus();
      await CommonHelper.setValue(await this.stateField, await data.state);

      await (await this.cityField)!.focus();
      await CommonHelper.setValue(await this.cityField, await data.city);

      await (await this.countryField)!.focus();
      await CommonHelper.setValue(await this.countryField, await data.country);

      await (await this.zipcodeField)!.focus();
      await CommonHelper.setValue(await this.zipcodeField, await data.zipCode);
      await (await this.createCompanyBtn)!.click();
  }

  @step('Check message')
  async checkCompanyMessage(data: any): Promise<void> {
      expect(await this.getCompanyCreatedMessage()).toEqual(`The company ${data.companyName} has been successfully created.`);
  }

  @step('Extract company name from Add page')
  async getCompanyName(): Promise<string | undefined> {
      return CommonHelper.getTextContent(await this.companyDropdown);
  }
}
