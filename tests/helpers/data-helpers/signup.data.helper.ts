export class signupDataHelper {

  static async getSignupInfo(type: string) {
    switch (type) {
      case 'const': {
        return {
          first: 'Account Creation',
          second: 'Email Confirmation',
          third: 'Geolocation setup',
          fourth: 'SMS confirmation',
        }
      }
    }
  }
}
