import { Browser, ElementHandle } from 'puppeteer';
import { CommonHelper } from '../../helpers/common.helper';
import { findUserByEmail } from '../../infrastructure/mongodb/mongo-connection';
import { step } from '../../helpers/allure.helper';

const config = require('../../../config/config.data.json').env.PROFILESETTINGS;
const data = require('../../../test-data/page-data.json').AccountSettings;

export class AccountPage extends CommonHelper {
  @step('Wait for open Account page')
    static async getInstance(browser: Browser): Promise<AccountPage> {
        return new AccountPage(await this.getPageFromClient(browser, config.URL));
    }

  private get checkAccountPageHeader(): Promise<ElementHandle<HTMLElement> | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="profile-title-content"]');
  }

  private get checkAccountEmail(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="email-content"]');
  }

  private get personalInfo(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="profile-link"]');
  }

  private get nickName(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="username-field"][type="text"]');
  }

  private get firstName(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="firstname-field"][type="text"]');
  }

  private get lastName(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="lastname-field"][type="text"]');
  }

  private get phoneNumber(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="phone-number-content"]');
  }

  private get save(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="save-changes"]');
  }

  private get discard(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="discard-changes"]');
  }

  private get logOutBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="logout-button"]');
  }

  private get legalTab(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="legal-link"]');
  }

  @step('Get the "Account page header" value')
  async getAccountPageHeaderText(): Promise<string | undefined> {
      return CommonHelper.getTextContent(await this.checkAccountPageHeader);
  }

  @step('Get the "Account email" value')
  async getAccountEmailText(): Promise<string | undefined> {
      return CommonHelper.getTextContent(await this.checkAccountEmail);
  }

  @step('Get "Phone number" value')
  async getPhoneNumberText(): Promise<string | undefined> {
      return CommonHelper.getTextContent(await this.phoneNumber);
  }

  @step('Get the "Nickname" value')
  async getNicknameText(): Promise<string | null> {
      return (await (await this.nickName)!.getProperty('value')).jsonValue();
  }

  @step('Get the "First name" value')
  async getFirstNameText(): Promise<string | null> {
      return (await (await this.firstName)!.getProperty('value')).jsonValue();
  }

  @step('Get the "Last name" value')
  async getLastNameText(): Promise<string | null> {
      return (await (await this.lastName)!.getProperty('value')).jsonValue();
  }

  @step('Click the "Log out" button')
  async clickLogOut(): Promise<void> {
      await (await this.logOutBtn)!.click();
  }

  @step('Open the "Personal Info" page')
  async openInfoTab(): Promise<void> {
      await (await this.personalInfo)!.click();
      await this.page.waitForTimeout(3000); // wait for load page info
  }

  @step('Save changes')
  async saveChanges(): Promise<void> {
      await CommonHelper.scrollAndClick(await this.save);
      await this.page.waitForTimeout(3000); // wait for the info to be saved
      await this.clickLegal();
      await this.openInfoTab();
  }

  @step('Click the "Legal" tab')
  async clickLegal(): Promise<void> {
      await CommonHelper.scrollAndClick(await this.legalTab);
  }

  @step('Click the "Discard changes" button')
  async discardChanges(): Promise<void> {
      await CommonHelper.scrollAndClick(await this.discard);
      await this.clickLegal();
      await this.openInfoTab();
  }

  @step('Check the "Account settings"')
  async checkAccountPage(user: any): Promise<void> {
      expect(await this.getAccountPageHeaderText()).toContain(data.header);
      expect(await this.getAccountEmailText()).toContain(user.email);
  }

  @step('Change Nickname')
  async changeNickName(username: string): Promise<void> {
      await AccountPage.setValue(await this.nickName, username);
  }

  @step('Change First Name')
  async changeFirstName(firstname: string): Promise<void> {
      await AccountPage.setValue(await this.firstName, firstname);
  }

  @step('Change Last Name')
  async changeLastName(lastname: string): Promise<void> {
      await AccountPage.setValue(await this.lastName, lastname);
  }

  @step('Check all user data and compare from DB')
  async checkUserData(usersDB: any, user: any):Promise<void> {
      const bdEmail = await findUserByEmail(usersDB, user.email);
      expect(bdEmail.username.toString()).toEqual(await this.getNicknameText());
      expect(bdEmail.personalData.firstname.toString()).toEqual(await this.getFirstNameText());
      expect(bdEmail.personalData.lastname.toString()).toEqual(await this.getLastNameText());
      expect(bdEmail.personalData.email.toString()).toEqual((await this.getAccountEmailText())?.trim());
      expect(bdEmail.personalData.phones[0].number.toString()).toEqual((await this.getPhoneNumberText())?.split(' ').join(''));
  }

  @step('Update user data')
  async updateUserData(user:any): Promise<void> {
      await this.changeNickName(user.username);
      await this.changeFirstName(user.firstName);
      await this.changeLastName(user.lastName);
  }

  @step('Check received personal data from DB')
  async checkReceivedData(usersDB: any, user:any):Promise<void> {
      const bdEmail = await findUserByEmail(usersDB, config.USERNAME);
      expect(bdEmail.username.toString()).toEqual(user.username);
      expect(bdEmail.personalData.firstname.toString()).toEqual(user.firstName);
      expect(bdEmail.personalData.lastname.toString()).toEqual(user.lastName);
  }

  @step('Wait for legal page to be displayed')
  async waitForLegal(): Promise<void> {
      await this.logOutBtn;
  }
}
