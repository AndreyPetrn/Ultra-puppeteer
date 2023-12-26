import { step } from '../allure.helper';

const config = require('../../../config/config.data.json').env;
const request = require('request').defaults();
const accessUrl = config.KEYCLOAK.ACC_URL;
const userUrl = config.KEYCLOAK.USR_URL;
const groupUrl = config.KEYCLOAK.GRP_URL;
const userCook = config.KEYCLOAK.USR_COOK;
const userPassword = config.STORE.PASSWORD;
let infoResponse;

export class KeycloakHelper {
  @step('[API] Wait for get Access Token')
  static async getAccessToken(grantType: string, clientId: string, clientSecret: string): Promise<any> {
    return new Promise((resolve, reject) => {
      request.post({
          url: accessUrl,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          form: {
            grant_type: grantType,
            client_id: clientId,
            client_secret: clientSecret,
          },
        },
        (error: any, response: { statusCode: string | number; }, body: string) => {
          if ((!error && response.statusCode === 200) || response.statusCode === 201) {
            const info = JSON.parse(body);
            infoResponse = info.access_token;
            resolve(infoResponse);
          } else {
            reject({ error: error, status: response.statusCode });
            throw '[getAccessToken] ERROR: API request responded with status code: ' + response.statusCode + ' EXPECTED: 200 or 201';
          }
        }
      );
    });
  }

  @step('[API] Get the "Access Token" value')
  static async login(username: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      request.post({
          url: accessUrl,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          form: {
            grant_type: 'password',
            client_id: 'ultraWebapp',
            username,
            password,
          },
        },
        (error: any, response: { statusCode: string | number; }, body: string) => {
          if (!error && (response.statusCode === 200)) {
            const info = JSON.parse(body);
            resolve(info.access_token);
          } else {
            reject({ error: error, status: response?.statusCode });
          }
        }
      );
    });
  }


  @step('[API] Wait for create user')
  static async createUser(
    token: string, user:any
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      request.post(
        {
          url: userUrl,
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
            Cookie: userCook,
          },
          body: JSON.stringify({
            username: await user['username'],
            email: await user['email'],
            emailVerified: true,
            firstName: await user['firstName'],
            lastName: await user['lastName'],
            attributes: {
              countryCode: 'FR',
              countryCodeVerified: true,
              mobilePhoneNumber: '+33610203040',
              mobilePhoneNumberVerified: true,
              termsAndConditionsAcceptedAt: '1',
            },
            credentials: [
              {
                type: 'password',
                value: userPassword,
              },
            ],
            enabled: true,
          }),
        },
        (error: any, response: { statusCode: string | number; }, body: { access_token: unknown; }) => {
          if ((!error && response.statusCode === 200) || response.statusCode === 201) {
            infoResponse = body.access_token;
            resolve(infoResponse);
          } else {
            reject({ error: error, status: response.statusCode });
            throw 'ERROR: API request responded with status code: ' + response.statusCode + ' EXPECTED: 200 or 201';
          }
        }
      );
    });
  }

  @step('[API] Wait for get USER ID')
  static async getUserId(token: string, user:any): Promise<any> {
    const email1 = (await user['email']).split('+')[0];
    const email2 = (await user['email']).split('+')[1];
    return new Promise((resolve, reject) => {
      request.get(
        {
          url: `${userUrl}?briefRepresentation=true&first=0&max=20&search=${email1}%2B${email2}`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
            Cookie: userCook,
          },
        },
        (error: any, response: any) => {
          if ((!error && response.statusCode === 200) || response.statusCode === 201) {
            infoResponse = response;
            resolve(infoResponse);
          } else {
            reject({ error: error, status: response.statusCode });
            throw 'ERROR: API request responded with status code: ' + response.statusCode + ' EXPECTED: 200 or 201';
          }
        }
      );
    });
  }

  @step('[API] Wait for put user to platform')
  static async putUserToGroup(token: string, userId: string, groups: string): Promise<any> {
    await page.waitForTimeout(2000); // for stability
    return new Promise((resolve, reject) => {
      request.put(
        {
          url: `${userUrl}/${userId}/groups/${groups}`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
            Cookie: userCook,
          },
        },
        (error: any, response: any) => {
          if ((!error && response.statusCode === 200) || response.statusCode === 204) {
            infoResponse = response;
            resolve(infoResponse);
          } else {
            reject({ error: error, status: response.statusCode });
            throw 'ERROR: API request responded with status code: ' + response.statusCode + ' EXPECTED: 200 or 201';
          }
        }
      );
    });
  }

  @step('[API] Wait for remove user from USERS platform')
  static async removeUserFromGroup(token: string, userId: string,  groups: string): Promise<any> {
    return new Promise((resolve, reject) => {
      request.delete(
        {
          url: `${groupUrl}/${userId}/groups/${groups}`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
            Cookie: userCook,
          },
        },
        (error: any, response: any) => {
          if ((!error && response.statusCode === 200) || response.statusCode === 201 || response.statusCode === 204) {
            infoResponse = response;
            resolve(infoResponse);
          } else {
            reject({ error: error, status: response.statusCode });
            throw 'ERROR: API request responded with status code: ' + response.statusCode + ' EXPECTED: 200 or 201';
          }
        }
      );
    });
  }

  @step('[API] Wait for get USER data')
  static async getUserData(token: string, id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      request.get(
        {
          url: `${userUrl}/${id}`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
            Cookie: userCook,
          },
        },
        (error: any, response: any) => {
          if ((!error && response.statusCode === 200) || response.statusCode === 201) {
            infoResponse = response;
            resolve(infoResponse);
          } else {
            reject({ error: error, status: response.statusCode });
            throw 'ERROR: API request responded with status code: ' + response.statusCode + ' EXPECTED: 200 or 201';
          }
        }
      );
    });
  }
}
