export class DbHelper {

  static async dbName() {
    return {
      companyData: 'company-data',
      gameExplorer: 'game-explorer',
      userData: 'user-data',
      tokenExplorer: 'token-explorer'
    }
  }
}