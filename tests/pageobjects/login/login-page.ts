import { Browser, ElementHandle } from 'puppeteer';
import { CommonHelper } from '../../helpers/common.helper';
import {EmailHelper} from '../../helpers/api-helpers/email.helper';
import { step } from '../../helpers/allure.helper';

const config = require('../../../config/config.data.json').env.APP;
const data = require('../../../test-data/page-data.json').Login;

export class LoginPage extends CommonHelper {
    static async getInstance(browser: Browser): Promise<LoginPage> {
        return new LoginPage(await this.getPageFromClient(browser, config.LAUNCH));
    }

    private get usernameField(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page,'[data-id="login-username-field"]');
    }

    private get passwordField(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page,'[data-id="login-password-field"]');
    }

    private get loginButton(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page,'[data-id="login-button"]');
    }

    get mailCodeField(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page,'#kc-verification_code');
    }

    private get nextButton(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page,'[data-id="login-next-button"]');
    }

    private get keepMeCheckbox(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page,'[data-id="login-keep-me-checkbox"]');
    }

    get keepMeNameContent(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page,'[data-id="login-keep-me-name-content"]');
    }

    private get keepMeMessageContent(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page,'[data-id="login-keep-me-message-content"]');
    }

    private get errorCodeContent(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page,'[data-id="error-field-content"]');
    }

    private get resendCodeLink(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page,'[data-id="login-resend-code-link"]');
    }

    private get resendCodeMessage(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page,'[data-id="resend-code-message-content"]');
    }

  @step('Get email error message')
    async getEmailErrorMessage(): Promise<string | undefined> {
        return CommonHelper.getTextContent(await this.errorCodeContent);
    }

  @step('Get resend code message')
  async getResendCodeMessage(): Promise<string | undefined> {
      return CommonHelper.getTextContent(await this.resendCodeMessage);
  }

  @step('Fill user name')
  async fillUsername(username: string): Promise<void> {
      await CommonHelper.slowType(await this.usernameField, username, 100);
  }

  @step('Fill password data')
  async fillPassword(password: string): Promise<void> {
      await CommonHelper.slowType(await this.passwordField, password, 100);
  }

  @step('Click login button')
  async clickLogin(): Promise<void> {
      await CommonHelper.hoverAndClick(await this.loginButton);
  }

  @step('Fill login email code')
  async fillMailCode(ecode: string): Promise<void> {
      await CommonHelper.slowType(await this.mailCodeField, ecode, 10);
  }

  @step('Fill wrong email code')
  async fillWrongEmailCode(ecode: string): Promise<void> {
      await CommonHelper.slowType(await this.mailCodeField, ecode, 10);
      await this.clickNext();
  }

  @step('Click resend email code')
  async clickResendEmailCode(): Promise<void> {
      await CommonHelper.hoverAndClick(await this.resendCodeLink);
  }

  @step('Click login next button')
  async clickNext(): Promise<void> {
      await CommonHelper.hoverAndClick(await this.nextButton);
  }

  @step('Confirm login')
  async confirmLogin(user:any): Promise<void> {
      if (await this.mailCodeField !== null){
          await page.waitForTimeout(5000); // needed for stabilization
          await this.fillMailCode(await EmailHelper.getEmailCode(user,'login'));
          await this.clickNext();
      }
  }

  @step('Get keep me name info')
  async getKeepMeNameText(): Promise<string | undefined> {
      return CommonHelper.getTextContent(await this.keepMeNameContent);
  }

  @step('Get keep me message')
  async getKeepMeMessageText(): Promise<string | undefined> {
      return CommonHelper.getTextContent(await this.keepMeMessageContent);
  }

  @step('Click on "Keep me logged in" checkbox')
  async clickKeepMeLoggedIn():Promise<void> {
      expect(await this.getKeepMeNameText()).toContain(data.keepMeName);
      expect(await this.getKeepMeMessageText()).toContain(data.keepMeMessage);
      await CommonHelper.hoverAndClick(await this.keepMeCheckbox);
  }

  @step('Log in using another account from other region (that has another currency)')
  async logInUsingAnotherAccount(user:any): Promise<void> {
      await this.fillUsername(await user.email);
      await this.fillPassword(await user.password);
      await this.clickLogin();
      await this.confirmLogin(await user);
  }
}
