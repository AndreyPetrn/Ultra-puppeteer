import { LoginPage } from '../pageobjects';
import { Browser } from 'puppeteer';
// @ts-ignore
import * as faker from 'faker';

export async function login(browser: Browser, user:any) {
  const loginPage = await LoginPage.getInstance(browser);
  await loginPage.fillUsername(await user.email);
  await loginPage.fillPassword(await user.password);
  await loginPage.clickLogin();
  await loginPage.confirmLogin(await user);
}

export async function keepMeLoggedIn(browser: Browser, user:any) {
  const loginPage = await LoginPage.getInstance(browser);
  await loginPage.fillUsername(await user.email);
  await loginPage.fillPassword(await user.password);
  await loginPage.clickKeepMeLoggedIn();
  await loginPage.clickLogin();
  await loginPage.confirmLogin(await user);
}

export async function resendEmailCode(browser: Browser, user:any) {
  const loginPage = await LoginPage.getInstance(browser);
  await loginPage.fillUsername(await user.email);
  await loginPage.fillPassword(await user.password);
  await loginPage.clickLogin();
  const ecode = faker.random.alphaNumeric(6);
  await loginPage.fillWrongEmailCode(ecode);
  await expect(await loginPage.getEmailErrorMessage()).toEqual('The code is incorrect.');
  await loginPage.clickResendEmailCode();
  await expect(await loginPage.getResendCodeMessage()).toContain('A new code has been sent to');
  await loginPage.confirmLogin(await user);
}

