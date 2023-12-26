import { GraphQLClient } from 'graphql-request';
import { gqlDataHelper } from '../../data-helpers/gql.data.helper';
import { KeycloakHelper } from '../keycloak.helper';
import { braincloud } from './braincloud-wrapper';
import { IGenerateRedemptionCodeData, RedemptionCodeState } from './generate-redemption-code-data.interface';
const request = require('request');
const config = require('../../../../config/config.data.json').env;

const ultraCloudGqlUrl = `${config.API.URL}/explorer/ultracloud/v1/graphql`;
const ultraCloudUrl = config.ULTRACLOUD.URL;
const redeemAppId = config.REDEEM.ULTRA_CLOUD.APP_ID;
const redeemAppSecret = config.REDEEM.ULTRA_CLOUD.APP_SECRET;
const redeemAdminUsername = config.REDEEM.ULTRA_CLOUD.ADMIN_USERNAME;
const redeemAdminPassword = config.REDEEM.ULTRA_CLOUD.ADMIN_PASSWORD;
const jSessionCookieName = 'JSESSIONID';

const graphQLClient = new GraphQLClient(ultraCloudGqlUrl);
const ultraCloudRequest = request.defaults({
  baseUrl: ultraCloudUrl,
  json: true,
});

export class UltraCloudApiHelper {
  jSessionId =  '';
  apiSessionId =  '';

  async ultraCloudLogin(accessToken: string): Promise<string> {
    const data: any = await graphQLClient.request(gqlDataHelper.ultraCloudLogin(), undefined,{
      Authorization: `Bearer ${accessToken}`,
    });
    return this.jSessionId = data.ultraCloudLogin.jSessionId;
  }

  async authenticateAPI(username: string = redeemAdminUsername, password: string = redeemAdminPassword, appId: string = redeemAppId, appSecret: string = redeemAppSecret): Promise<string> {
    const accessToken = await KeycloakHelper.login(username, password);
    await this.ultraCloudLogin(accessToken);
    const brainCloudWrapper = new braincloud.BrainCloudWrapper();
    brainCloudWrapper.initialize(appId, appSecret, '1.0.0');
    brainCloudWrapper.brainCloudClient.setServerUrl(ultraCloudUrl);
    const apiSessionId: string = await new Promise((resolve, reject) => {
      brainCloudWrapper.authenticateUltra(
        username,
        accessToken,
        true,
        (result: any) => {
          if (result.status === 200) {
            resolve(result.data.sessionId);
          } else {
            reject(result);
          }
        },
      );
    });
    return this.apiSessionId = apiSessionId;
  }

  /**
   * Generates a list of redemption codes that can be redeemed by users to unlock rewards
   * Redemption codes docs: https://help.getbraincloud.com/en/articles/3272678-design-marketplace-redemption-codes
   * @param codeType - Code inventory name. Should exist in Ultracloud dashboard: https://portal.qa.ultracloud.ultra.io/admin/dashboard#/development/marketplace-redemption-codes
   * @param codeState - Initial status of the code generated
   * @param quantity - The number of codes to generate
   * @param customCodeInfo - Additional data sent to redeem process
   */
  async generateRedemptionCodes({codeType, codeState, quantity, customCodeInfo}: IGenerateRedemptionCodeData): Promise<string[]> {
    const cookies = request.jar();
    cookies.setCookie(request.cookie(`${jSessionCookieName}=${this.jSessionId}`), ultraCloudUrl);
    return new Promise((resolve, reject) => {
      ultraCloudRequest.post({
        url: '/admin/development/direct-api-call',
        jar: cookies,
        body: {
          "bypassUserEnabledCheck": true,
          "sessionId": this.apiSessionId,
          "packetId": 1,
          "messages": [
            {
              "service": "redemptionCode",
              "operation": "GENERATE_CODES_INLINE",
              "data": {
                "codeType": codeType,
                "codeState": codeState ?? RedemptionCodeState.Available,
                "quantity": quantity ?? 1,
                "customCodeInfo": customCodeInfo ?? {},
                "algorithmName": "FiveByFive",
                "algorithmDetailsJson": {
                  "includeCheck": false
                },
                "ccCall": true
              }
            }
          ]
        }
      }, (error: any, response: any, body: any) => {
        if (error) {
          reject(error);
          return;
        }
        if (response.statusCode === 200) {
          resolve(body.data.generatedScanCodes);
          return;
        } else {
          reject(response);
        }
      })
    });
  }

  /**
   * Generate a code and redeems using the admin user
   * @param data IGenerateRedemptionCodeData
   * @returns redeem code
   */
  async generateRedeemedCode(data: IGenerateRedemptionCodeData): Promise<string> {
    const codes = await this.generateRedemptionCodes(data)
    const accessToken = await KeycloakHelper.login(redeemAdminUsername, redeemAdminPassword);
    // redeem code
    const d = await graphQLClient.request(gqlDataHelper.redeemCode(), {code: codes[0]},{
      Authorization: `Bearer ${accessToken}`,
    });
    return codes[0];
  }
}
