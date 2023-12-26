import { Browser, ElementHandle } from 'puppeteer';
import { CommonHelper } from '../../helpers/common.helper';
import { step } from '../../helpers/allure.helper';
const config = require('../../../config/config.data.json').env.APP;
const data = require('../../../test-data/page-data.json').Signup;

export class SignupPage extends CommonHelper {
  @step('Wait for open Signup page')
    static async getInstance(browser: Browser): Promise<SignupPage> {
        return new SignupPage(await this.getPageFromClient(browser, config.LAUNCH));
    }

  private get signupLink(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="login-registration-link');
  }

  private get usernameInput(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="register-username-field"]');
  }

  private get firstNameInput(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="register-firstname-field"]');
  }

  private get lastNameInput(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="register-lastname-field"]');
  }

  private get emailInput(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="register-email-field"]');
  }

  private get passwordInput(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="register-password-field"]');
  }

  private get termsCheckbox(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="register-terms-conditions-checkbox"]');
  }

  private get nextButton(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="next-step-button"]');
  }

  private get emailCodeInput(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="email-verification-code-field"]');
  }

  private get countryDropdown(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[class="select2-selection__rendered"]');
  }

  private get countryInput(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, 'input[type="search"]');
  }

  private get country(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '.iti__us');
  }

  private get phoneInput(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="register-geolocation-phone-field"]');
  }

  private get phoneCodeInput(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="phone-verification-code-field"]');
  }

  private get checkRegisterStep(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="register-step-content"]');
  }

  private get checkCompletedStep(): Promise<ElementHandle[]> {
      return this.page
          .waitForSelector('[data-id="register-completed-step-container"]', { timeout: 50000, visible: true })
          .then(() => this.page.$$('[class="completed step"]'));
  }

  private get checkPageTitle(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="page-title-content"]');
  }

  private get changePhoneNumberBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="change-phone-numer-link"]');
  }

  private get errorEmailCode(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="error-field-content"]');
  }

  private get resendMobileCodeBtn(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="resend-phone-code-link"]');
  }

  private get resendCodeMessage(): Promise<ElementHandle | null> {
      return CommonHelper.waitForSelector(this.page, '[data-id="resend-code-message-content"]');
  }

  @step('Get the "Error message" value')
  async getPhoneErrorMessage(): Promise<string | undefined> {
      return CommonHelper.getTextContent(await this.errorEmailCode);
  }

  @step('Get the "Error message" value')
  async getResendCodeMessage(): Promise<string | undefined> {
      return CommonHelper.getTextContent(await this.resendCodeMessage);
  }

  @step('Get the "Register step" value')
  async registerStepText(): Promise<any> {
      return CommonHelper.getTextContent(await this.checkRegisterStep);
  }

  @step('Get the "Page Title" value')
  async pageTitleText(): Promise<string | undefined> {
      return CommonHelper.getTextContent(await this.checkPageTitle);
  }

  @step('Click on the "Signup" button')
  async clickSignup(stepName: any): Promise<void> {
      await (await this.signupLink)!.click();
      await expect(await this.registerStepText()).toBe(data.first);
      await expect(await this.pageTitleText()).toContain(stepName.first);
  }

  @step('Fill username data')
  async fillUsername(username: string): Promise<void> {
      await (await this.usernameInput)!.type(username, { delay: 100 });
  }

  @step('Fill first name data')
  async fillFirstName(firstName: string): Promise<void> {
      await (await this.firstNameInput)!.type(firstName, { delay: 100 });
  }

  @step('Fill last name data')
  async fillLastname(lastName: string): Promise<void> {
      await (await this.lastNameInput)!.type(lastName, { delay: 100 });
  }

  @step('Fill email data')
  async fillEmail(email: string): Promise<void> {
      await (await this.emailInput)!.type(email, { delay: 100 });
  }

  @step('Fill password data')
  async fillPassword(password: string): Promise<void> {
      await (await this.passwordInput)!.type(password, { delay: 100 });
  }

  @step('Check terms data')
  async checkTerms(): Promise<void> {
      await (await this.termsCheckbox)!.click();
  }

  @step('Fill code from email')
  async fillEmailCode(ecode: string, stepName: any): Promise<void> {
      await expect(await this.registerStepText()).toBe(data.second);
      await expect(await this.completedStep()).toBe(1);
      await expect(await this.pageTitleText()).toContain(stepName.second);
      await (await this.emailCodeInput)!.type(ecode, { delay: 100 });
  }

  @step('Click on the "Next" button')
  async clickNext(): Promise<void> {
      await (await this.nextButton)!.click();
  }

  @step('Select country')
  async selectCountry(stepName: any): Promise<void> {
      await expect(await this.registerStepText()).toBe(data.third);
      await expect(await this.completedStep()).toBe(2);
      await expect(await this.pageTitleText()).toContain(stepName.third);
      await (await this.countryDropdown)!.click();
  }

  @step('Fill country data')
  async fillCountry(country: string): Promise<void> {
      await (await this.countryInput)!.type(country, { delay: 100 });
  }

  @step('Click on the country from list')
  async clickCountry(): Promise<void> {
      await (await this.country)!.click();
  }

  @step('Clear phone number data')
  async clearOldPhone(): Promise<void> {
      await (await this.phoneInput)!.click({clickCount: 3});
      await (await this.phoneInput)!.press('Backspace');
  }

  @step('Fill phone number')
  async fillPhone(phone: string): Promise<void> {
      await (await this.phoneInput)!.type(phone, { delay: 100 });
  }

  @step('Fill code from phone')
  async fillPhoneCode(mcode:string, stepName:any):Promise<void> {
      await expect(await this.registerStepText()).toBe(data.fourth);
      await expect(await this.completedStep()).toBe(3);
      await expect(await this.pageTitleText()).toContain(stepName.fourth);
      await (await this.phoneCodeInput)!.type(mcode,{delay: 100 });
  }

  @step('Fill user data')
  async fillUserData(user:any): Promise<void> {
      await this.fillUsername(await user.username);
      await this.fillFirstName(await user.firstName);
      await this.fillLastname(await user.lastName);
      await this.fillEmail(await user.email);
      await this.fillPassword(await user.password);
  }

  @step('Get the "Completed step" value')
  async completedStep(): Promise<number> {
      return (await this.checkCompletedStep).length;
  }

  @step('Click on the "Change phone number" button')
  async changePhoneNumber(): Promise<void> {
      await (await this.changePhoneNumberBtn)!.click();
  }

  @step('Click on the "Resend mobile code" button')
  async resendMobileCode(): Promise<void> {
      await (await this.resendMobileCodeBtn)!.click();
  }
}
