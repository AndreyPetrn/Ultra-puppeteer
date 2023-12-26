// @ts-ignore
import * as faker from 'faker';

export class GameDataHelper {

  private static uniqueFirstName() {
    return faker.name.firstName();
  }

  static async uniqueGameName() {
    return faker.name.jobTitle();
  }


  static async uniqueUserName2() {
    return faker.name.firstName();
  }

  static async uniqueTokenName() {
    return `Token_${faker.random.alphaNumeric(5)}`;
  }

  static async getGameInfo(type: any) {
    switch (type) {
      case 'new': {
        return {
          gameName: await this.uniqueGameName(),
          randomName: await this.uniqueUserName2(),
          firstTag: '2022',
          secondTag: 'New',
          thirdTag: 'Race',
          fourthTag: 'TopCars',
          firstTagline: 'One rule - no rules',
          secondTagline: 'Extinction is the rule. Survival is the exception.',
          firstDescription: 'This is a completely insane racing arcade about the sea of adrenaline, a lot of objects on the same track and too active drivers.',
          secondDescription: 'There are 9 game modes including Speed, Night Shift, Stunt Man, Off Road, Challenge, Monster Truck, and Battle Arena.',
          firstYoutubeURL: 'https://www.youtube.com/watch?v=zGpVuknnN78&ab_channel=GOG.com',
          secondYoutubeURL: 'https://www.youtube.com/watch?v=AUwBs3gJpIU&ab_channel=Secr740',
          thirdYoutubeURL: 'https://www.youtube.com/watch?v=sPtGrlyBmmU&ab_channel=FlatOut-2GEKK-ML',
          awardName: 'BAFTA',
          awardCategory: 'Best racing game',
          awardURL: 'https://en.wikipedia.org/wiki/FlatOut_2',
          ratingDescription: 'Game 18+!!!',
          ratingAdultsOnly: 'ESRB : Adults only',
          ratingCountry: 'United States',
          minOsInput: 'Windows 7',
          maxOsInput: 'Windows 10',
          minProcessorInput: 'Intel Core i3-7100 (3.9 GHz)',
          maxProcessorInput: 'Intel Core i5-7500 (3.4GHz)',
          minRamInput: '4',
          maxRamInput: '8',
          minGraphCardInput: 'AMD #1',
          maxGraphCardInput: 'AMD #2',
          directxInput: 'DX11',
          resolutionInput: 'Minimum resolution 1280 x 720',
          typeRepository1: 'Game: Core Game Files',
          typeRepository2: 'Demo: Core Game Files',
          tokenName: await this.uniqueTokenName(),
          tokenType: 'Game Builds Only',
          firstCountry: 'United State',
          secondCountry: 'Canada',
          thirdCountry: 'Bahamas',
          revenueMessage: '100% of the revenue shares are distributed',
        }
      }
      case 'const': {
        return {
          gameName: await this.uniqueGameName(),
          randomName: await this.uniqueUserName2(),
          tag: 'new',
          tagline: 'One rule - no rules',
          shortDescription: 'This is a completely insane racing arcade about the sea of adrenaline, a lot of objects on the same track and too active drivers.',
          youtubeURL: 'https://www.youtube.com/watch?v=zGpVuknnN78&ab_channel=GOG.com',
          awardName: 'BAFTA',
          awardCategory: 'Best racing game',
          awardURL: 'https://en.wikipedia.org/wiki/FlatOut_2',
          ratingDescription: 'Game 18+!!!',
          ratingAdultsOnly: 'ESRB : Adults only',
          ratingCountry: 'United States',
          minOsInput: 'Windows 7',
          maxOsInput: 'Windows 10',
          minProcessorInput: 'Intel Core i3-7100 (3.9 GHz)',
          maxProcessorInput: 'Intel Core i5-7500 (3.4GHz)',
          minRamInput: '4',
          maxRamInput: '8',
          minGraphCardInput: 'AMD #1',
          maxGraphCardInput: 'AMD #2',
          directxInput: 'DX11',
          resolutionInput: 'Minimum resolution 1280 x 720',
          typeRepository1: 'Game: Core Game Files',
          typeRepository2: 'Demo: Core Game Files',
          tokenName: await this.uniqueTokenName(),
          tokenType: 'Game Builds Only',
          countryUS: 'United State',
          prise: '1.00',
          beneficiaries: '40',
          promoter: '45',
          minimumResell: '10',
        }
      }
    }
  }
}
