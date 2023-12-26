export class MasterCenterHelper {

  static async ultraDefaultModalText() {
    return {
      header: 'Are you sure?',
      body: 'Are you sure you want to remove the user from the company?',
    }
  }

  static async pageTitle() {
    return {
      ultraOS: 'User Management',
      ultraGames: 'Games Management',
      ultraMarketplace: 'Launchpad Management',
    }
  }

  static async appItemsText() {
    return {
      ultraOS: 'Ultra OS\n' + 'Manage everything related to Users & Companies in Ultra.',
      ultraDimensions: 'Ultra Dimensions\n' + 'Quis sint aliquip sint excepteur culpa ex lit occaecat pariatur adipisicing.',
      ultraApplications: 'Ultra Applications\n' + 'Nisi enim incididunt pariatur sint ipsum qui occaecat ex est aliquip sint.',
      ultraGames: 'Ultra Games\n' + 'Manage Games Dev Center & Players Libraries',
      ultraGamesStore: 'Ultra Games Store\n' + 'Manage the Ultra Games Store content & features.',
      ultraMarketplace: 'Ultra Marketplace\n' + 'Manage Marketplace home page and various parameters...'
    }
  }

  static async manageCompaniesPage() {
    return {
      title: 'Companies',
      createBtn: 'Add user to company'
    }
  }

  static async storePage() {
    return {
      infoFirst: 'Status of the Store Page on Ultra Games Store.',
      infoSecond: 'From here, you can quicky disable a Game’s Store Page, it won’t be displayed in the Store anymore.',
      infoThird: 'You can enable it back later so the Publisher can publish it again.',
      disableGameText: 'The game does not meet standards'
    }
  }

  static async marketplacePage() {
    return {
      slotMax: '18',
      slotMin: '6',
      slotMessage: 'Minimum number of visible Uniqs: 6',
      uniqList: ['40', '41', '45', '46', '47', '49']
    }
  }

  static async gameStatus() {
    return {
      all: 'all',
      published: 'published',
      enabled: 'enabled',
      disabled: 'disabled',
      readyToPublish: 'publishing_allowed'
    }
  }

  static async gamePageTitle(gameTitle: string | null) {
    return `${ gameTitle }: Store Page Management`
  }
}
