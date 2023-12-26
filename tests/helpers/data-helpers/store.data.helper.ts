// @ts-ignore
export class storeDataHelper {

  static getPaymentData() {
    return {
      address: 'Address',
      zipCode: '12345',
      city: 'City'
    }
  }

  static getDefaultGame() {
    return {
      gameName: 'Auto Default Test Game',
      tokenisedGame: 'Default Tokenised Game',
      legacyGame: 'Default Game',
      dlcGame: 'Default DLC',
      priceDollar: '$1.00',
      priceEuro: '€1.00'
    }
  }

  static getDLCGameData() {
    return {
      gameName: 'Auto Game with DLC',
      priceDollar: '$1.00',
      priceEuro: '€1.00'
    }
  }

  static getFreeGameData() {
    return {
      gameName: 'Auto Free Game',
      tokenName: 'Free Game',
      tokenType: 'Game',
      companyName: 'Automation',
      gameImage: 'profile_picture2.png',
      price: 'Free'
    };
  }

  static getGameWithEmptyRepository() {
    return {
      gameName: 'Auto Game with Empty Repository',
      price: 'Details',
    };
  }

  static getTokenizedGame() {
    return {
      gameName: 'Auto Tokenized Game',
      tokenName: 'Tokenized Game',
      uniqName: 'Auto First Game Uniq',
      tokenType: 'game',
      companyName: 'Automation',
      gameImage: 'profile_picture3.png',
      price: 'Free'
    };
  }

  static getSecondTokenizedGame() {
    return {
      gameName: 'Auto Second Tokenized Game',
      tokenName: 'Game Token',
      uniqName: 'Auto Second Game Uniq',
      tokenType: 'game',
      companyName: 'Automation',
      gameImage: 'profile_picture2.png',
      price: 'Free'
    };
  }

  static getMasterCenterTestGame() {
    return {
      gameName: 'Auto Master Center Game',
      companyName: 'Automation',
    };
  }

  static getGameForEditing() {
    return {
      gameName: 'Auto Game For Editing',
      companyName: 'Automation',
    };
  }

  static getGameForDiscount() {
    return {
      gameName: 'Auto game with discount',
      companyName: 'Automation',
      gameId: '',
      discountBasisPoint: 5000,
      startDate: '2030-05-22T09:28:28.128Z',
      endDate: '2030-05-26T01:09:07.376Z',
      discountId: '',
      tokenFactoryId: '',
    };
  }
}
