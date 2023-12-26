import { UserDataHelper } from '../data-helpers/user.data.helper';
import { KeycloakHelper } from './keycloak.helper';
import { TransactionApiHelper } from './transaction.api.helper';
import { step } from '../allure.helper';
import { GameHelper } from './game.api.helper';
import { Browser } from 'puppeteer';
import { login } from '../login';
const config = require('../../../config/config.data.json').env;
const fs = require('fs');
require('dotenv').config();
const grantType = config.KEYCLOAK.TYPE;
const clientId = config.KEYCLOAK.CLIENTID;
const clientSecret = config.KEYCLOAK.CLIENTSECRET;
let accessToken: string, userId:string;
const UOSAmount = '100';


export class CommonApiHelper {
  @step('Wait for delete json file')
  static async deleteJson(fileName: any): Promise<any> {
    let checker = false;
    do {
      const path = `test-data/${fileName}.data.json`;
      await fs.access(path, fs.constants.F_OK, async (errException: any) => {
        if (!errException) {
          await fs.unlink(path, (err: any) => {
            if (err) {
              throw err;
            }
          });
        }
      });
      if (!fs.existsSync(path)) {
        checker = true;
      }
      await page.waitForTimeout(100); // wait for file to be deleted
    } while (!checker);
  }

  @step('Wait for write to json file')
  static async writeToJson(fileName: any, responseBody: any): Promise<any> {
    fs.writeFile(
      `test-data/${fileName}.data.json`,
      JSON.stringify(responseBody, null, '\t'),
      (err: any) => {
        if (err) {
          throw err;
        }
      }
    );
    await page.waitForTimeout(100); // wait for write to json file
  }

  @step('Check that the list of games sorted from the most recent release date to the oldest one.')
  static async checkSortGamesByReleaseDate(): Promise<any> {
    const arr = await GameHelper.getGameReleaseDateList();
    const test = JSON.stringify(arr.sort((a: number, b: number) => b - a));
    if( test === JSON.stringify(arr) ) {
      return true
    }
    return false
  }

  @step('[API] Wait for complete user creation')
  static async completeUserCreation(browser: Browser, type: string): Promise<any> {
    // Get access token
    await KeycloakHelper.getAccessToken(grantType, clientId, clientSecret).then((value: any) => {
      accessToken = value;
    });
    // Create new user
    const user = await UserDataHelper.getUser('new');
    await KeycloakHelper.createUser(accessToken, user);
    await KeycloakHelper.getUserId(accessToken, user).then(async (value: { body: string; }) => {
      userId = JSON.parse(value.body)[0].id;
    });
    // Create user.data file
    await KeycloakHelper.getUserData(accessToken, userId).then(async (value) => {
      const userData = JSON.parse(value.body);
      await this.deleteJson('user');
      await this.writeToJson('user', userData);
    });
    // Login by new user
    await console.log('wait for login')
    await login(await browser, user);
    // Add user to platform group
    switch (type) {
      case 'WOC user': {
        break;
      }
      case 'default user': {
        await KeycloakHelper.putUserToGroup(accessToken, userId, config.KEYCLOAK.Game_User);
        await KeycloakHelper.putUserToGroup(accessToken, userId, config.KEYCLOAK.Marketplace_User);
        break;
      }
      case 'admin user': {
        await KeycloakHelper.putUserToGroup(accessToken, userId, config.KEYCLOAK.Platform_Admin);
        await KeycloakHelper.putUserToGroup(accessToken, userId, config.KEYCLOAK.Company_Admin);
        await KeycloakHelper.putUserToGroup(accessToken, userId, config.KEYCLOAK.Company_Owner);
        await KeycloakHelper.putUserToGroup(accessToken, userId, config.KEYCLOAK.Game_Admin);
        await KeycloakHelper.putUserToGroup(accessToken, userId, config.KEYCLOAK.Wallet_Admin);
        await KeycloakHelper.putUserToGroup(accessToken, userId, config.KEYCLOAK.Marketplace_Admin);
        await KeycloakHelper.putUserToGroup(accessToken, userId, config.KEYCLOAK.Ultra_Admin);
        break;
      }
    }
    await console.log('A new user was created');
    return user;
  }

  @step('Send UOS to user')
  static async sendUOS(walletId: any): Promise<any> {
    await TransactionApiHelper.sendUOS(UOSAmount, walletId);
  }

  // todo https://ultraio.atlassian.net/browse/AUT-47 - Game upload
  @step('Upload game in SSN repositories')
  static async uploadGameInSSN(repository: string): Promise<any> {
    const data = [
      {
        "repositoryName": `${repository}`,
        "source": "C:/Users/a/WebstormProjects/e2e-client/tests/infrastructure/game/tetris.exe"
      }
    ];
    await this.writeToJson('game', data);
    const child_process = require('child_process');
    await child_process.exec('C:/Users/a/WebstormProjects/e2e-client/tests/infrastructure/game/repositories.bat', function(error: any, stdout: string, stderr: string) {});
  }
}
