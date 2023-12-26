// @ts-ignore
import * as faker from 'faker';

export class CompanyDataHelper {
  static async uniqueCompanyName() {
    return faker.company.companyName();
  }
  static async uniquePhone() {
    return faker.phone.phoneNumber('##########');
  }
  static async uniqueStreetName() {
    return faker.address.streetAddress();
  }
  static async uniqueState() {
    return faker.address.state();
  }
  static async uniqueCity() {
    return faker.address.city();
  }
  static async uniqueCountry() {
    return faker.address.country();
  }
  static async uniqueZipCode() {
    return faker.address.zipCode('####');
  }

  static async getCompanyInfo(type: any) {
    switch (type) {
      case 'new': {
        return {
          companyName: await this.uniqueCompanyName(),
          phone: await this.uniquePhone(),
          streetName: await this.uniqueStreetName(),
          state: await this.uniqueState(),
          city: await this.uniqueCity(),
          country: await this.uniqueCountry(),
          zipCode: await this.uniqueZipCode()
        }
      }
    }
  }
}
