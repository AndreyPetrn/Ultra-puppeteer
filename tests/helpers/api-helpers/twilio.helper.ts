import { step } from '../allure.helper';

const config = require('../../../config/config.data.json').env;
const request = require('request').defaults();
const twilioUrl = config.TWILIO.URL;
const twilioAuth = config.TWILIO.AUTH;
let infoResponse;

export class   TwilioHelper {
  @step('[API] Get the "Code" value from mobile')
  static async getNewMobileCode(number: string): Promise<any> {
    await page.waitForTimeout(5000);  //wait for the mobile code
    return new Promise((resolve) => {
      request.get(
        {
          url: `https://api.twilio.com/2010-04-01/Accounts/AC685f60ab26ec3959da8946a4c5dd486d/Messages.json?To=%2B1${number}&PageSize=20`,
          headers: {
            Authorization: 'Basic ' + twilioAuth,
          },
        },
        (error: any, response: any) => {
          infoResponse = JSON.parse(response.body);
          infoResponse = infoResponse.messages[0].body;
          infoResponse = infoResponse.split('is:')[1].trim();
          resolve(infoResponse);
        },
      );
    });
  }

  @step('[API] Get the number from mobile')
  static async getNewMobileNumber(): Promise<any> {
    return new Promise((resolve) => {
      request.get(
        {
          url: twilioUrl,
          headers: {
            Authorization: 'Basic ' + twilioAuth,
          },
        },
        (error: any, response: any ) => {
          infoResponse = response.body;
          resolve(infoResponse.split('PhoneNumber>+1')[1].split('</PhoneNumber')[0]);
        }
      );
    });
  }
}
