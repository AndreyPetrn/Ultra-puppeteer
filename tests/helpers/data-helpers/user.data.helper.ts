// @ts-ignore

import * as faker from 'faker';

const config = require('../../../config/config.data.json');
const preconditionUser = require('../../../test-data/user.data.json');

const env = config.env.ENV;
const email = config.env.STORE.USERNAME;
const password = config.env.STORE.PASSWORD;
const WOCEmail = config.env.WALLET.USERNAME;
const nonWhitelistedEmail = config.env.WALLET.NON_WHITELISTED_USERNAME;
const walletEmail = config.env.WALLET.WALLETONLY_USERNAME;
const recipientAddress = config.env.WALLET.recipientAddress;
const GDCEmail = config.env.GDC.USERNAME;
const gdcUserName = config.env.GDCHELP.USERNAME;
const gdcEmail = config.env.GDCHELP.EMAIL;
const companyName = config.env.GDCHELP.COMPANY;
const marketplaceEmail = config.env.MARKETPLACE.USERNAME;
const marketplaceSecondUser = config.env.SECONDUSER.USERNAME;
const marketplaceSecondUserName = config.env.SECONDUSER.NAME;
const authenticationUser = config.env.AUTHORISATION.USERNAME;
const macterCenterEmail = config.env.MASTERCENTER.USERNAME;
const europeanEmail = config.env.EUROPEAN.EMAIL;

export class UserDataHelper {
  static async uniqueFirstName() {
    return faker.name.firstName();
  }

  static async uniqueLastName() {
    return faker.name.lastName();
  }

  static async uniqueUserName() {
    return faker.name.firstName() + new Date().getTime();
  }

  static async uniqueUserName2() {
    return faker.name.firstName();
  }

  static async uniqueGameName() {
    return `Survival_Race_${faker.random.alphaNumeric(5)}`;
  }

  static async uniqueTokenName() {
    return `Token_${faker.random.alphaNumeric(5)}`;
  }

  static async uniqueEmail() {
    return `testapiapitest+at.${faker.random.alphaNumeric(5)}@gmail.com`;
  }

  static async uniquePassword() {
    const regexPassword: RegExp = /\w+|[A-Z]+|[~!@#$%^&*()-_+=]+|\d+$/;
    return faker.internet.password(8, false, regexPassword) + '1At/';
  }

  static async getUser(type: string) {
    switch (type) {
      case 'new': {
        return {
          env: env,
          username: await this.uniqueUserName(),
          firstName: await this.uniqueFirstName(),
          lastName: await this.uniqueLastName(),
          email: await this.uniqueEmail(),
          password: password,
        };
      }
      case 'const': {
        return {
          env: env,
          email: email,
          password: password,
        };
      }
      case 'precondition': {
        return {
          env: env,
          email: preconditionUser.email,
          password: password,
          country: preconditionUser.attributes.countryCode,
          username: preconditionUser.username,
          firstName: preconditionUser.firstName,
          lastName: preconditionUser.lastName,
        };
      }
      case 'WOC': {
        return {
          env: env,
          email: WOCEmail,
          password: password,
          receiverEmail: walletEmail,
          recipientAddress: recipientAddress,
        };
      }
      case 'nonWhitelisted': {
        return {
          env: env,
          email: nonWhitelistedEmail,
          password: password,
        };
      }
      case 'GDC': {
        return {
          env: env,
          email: GDCEmail,
          password: password,
        };
      }
      case 'gdcTestUser': {
        return {
          name: gdcUserName,
          email: gdcEmail,
          password: password,
          companyName: companyName
        };
      }
      case 'marketplace': {
        return {
          env: env,
          email: marketplaceEmail,
          password: password,
        };
      }
      case 'second_user': {
        return {
          env: env,
          email: marketplaceSecondUser,
          password: password,
          username: marketplaceSecondUserName,
        };
      }
      case 'authorisation': {
        return {
          env: env,
          email: authenticationUser,
          password: await this.uniquePassword(),
        };
      }
      case 'masterCenter': {
        return {
          env: env,
          email: macterCenterEmail,
          password: password,
        };
      }
      case 'european': {
        return {
          env: env,
          email: europeanEmail,
          password: password,
        };
      }
    }
  }
}
