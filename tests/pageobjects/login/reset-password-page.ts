import { Browser, ElementHandle } from 'puppeteer';
import { CommonHelper } from '../../helpers/common.helper';
import {EmailHelper} from '../../helpers/api-helpers/email.helper';
import { step } from '../../helpers/allure.helper';

const config = require('../../../config/config.data.json').env.APP;

export class ResetPasswordPage extends CommonHelper {
    static async getInstance(browser: Browser): Promise<ResetPasswordPage> {
        return new ResetPasswordPage(await this.getPageFromClient(browser, config.LAUNCH));
    }

    private get mailField(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page,'[data-id="reset-password-username-field"]');
    }

    get mailCodeField(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page,'[data-id="reset-password-mail-code-field"]');
    }

    private get nextButton(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page,'[data-id="reset-password-next-button"]');
    }

    private get resetCredentialLink(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page,'[data-id="login-reset-credentials-link"]');
    }

    private get usernameField(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page,'[data-id="reset-password-username-field"]');
    }

    private get continueButton(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page,'[data-id="reset-password-continue-button"]');
    }

    private get newPasswordField(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page,'[data-id="reset-password-new-field"]');
    }

    private get confirmPasswordField(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page,'[data-id="reset-password-confirm-field"]');
    }

    private get passwordConfirmationForm(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page,'[data-id="update-password-confirmation-form"]');
    }

    private get resetPasswordButton(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page,'[data-id="reset-password-button"]');
    }

    private get loginButton(): Promise<ElementHandle | null> {
        return CommonHelper.waitForSelector(this.page,'[data-id="update-password-login-button"]');
    }

  @step('Wait for fill forgot password mail')
    async fillMail(user:any): Promise<void> {
        await CommonHelper.slowType(await this.mailField, user.email, 10);
    }

  @step('Fill email code')
  async fillMailCode(ecode: string): Promise<void> {
      await CommonHelper.slowType(await this.mailCodeField, ecode, 10);
  }

  @step('Click next button')
  async clickNext(): Promise<void> {
      await CommonHelper.hoverAndClick(await this.nextButton);
  }

  @step('Click reset password button')
  async clickResetPassword(): Promise<void> {
      await CommonHelper.hoverAndClick(await this.resetPasswordButton);
  }

  @step('Click login button')
  async clickLogin(): Promise<void> {
      await CommonHelper.hoverAndClick(await this.loginButton);
  }

  @step('Fill username')
  async fillUsername(user: string): Promise<void> {
      await CommonHelper.slowType(await this.usernameField, user, 100);
  }

  @step('Click reset credential')
  async clickResetCredential(): Promise<void> {
      await CommonHelper.hoverAndClick(await this.resetCredentialLink);
  }

  @step('Click continue')
  async clickContinue(): Promise<void> {
      await CommonHelper.hoverAndClick(await this.continueButton);
  }

  @step('Fill new password')
  async fillNewPassword(user:any): Promise<void> {
      await CommonHelper.slowType(await this.newPasswordField, user.password, 10);
  }

  @step('Fill confirm password')
  async fillConfirmPassword(user:any): Promise<void> {
      await CommonHelper.slowType(await this.confirmPasswordField, user.password, 10);
  }

  @step('Check password confirmation text')
  async getPasswordConfirmationText(): Promise<string | undefined> {
      return CommonHelper.getTextContent(await this.passwordConfirmationForm);
  }

  @step('Reset password')
  async fillConfirmationMailCode(user:any): Promise<void> {
      if (await this.mailCodeField !== null){
          await page.waitForTimeout(5000); // needed for stabilization
          await this.fillMailCode(await EmailHelper.getEmailCode(user,'reset your password'));
          await this.clickNext();
      }
  }
}
