import { gql } from 'graphql-request';

export class gqlDataHelper {
  static async gameReleaseDateList() {
    return `query games($filter: FilterInput, $pagination: PaginationInput) {
  games(filter: $filter, pagination: $pagination) {
    nodes {
      liveGame {
        releaseDate {
          year
          month
          day
        }
      }
    }
  }
}`
  }

  static gameList() {
    return `query games($filter: FilterInput, $pagination: PaginationInput) {
  games(filter: $filter, pagination: $pagination) {
    nodes {
      liveGame {
        title
      }
    }
  }
}`
  }

  static gameTotal() {
    return `query games($filter: FilterInput, $pagination: PaginationInput) {
  games(filter: $filter, pagination: $pagination) {
    totalCount
    pagination {
      limit
    }
  }
}`
  }

  static linkGameImageFromWishList() {
    return `query currentUserGameAccount {
 currentUserGameAccount {
  gamesWishlist {
    liveGame {
      multimedia {
        imageGalleryList {
          images {
            url
          }
        }
      }
    }
  }
  createdAt
}
}`
  }

  static linkGameImageFromList() {
    return `query games($filter: FilterInput, $pagination: PaginationInput) {
  games(filter: $filter, pagination: $pagination) {
    nodes {
      liveGame {
      multimedia {
        imageGalleryList {
          images {
            url
          }
        }
      }
    }
    }
  }
}`
  }

  static gqlParams(by: any, skip: number, gameName: string = '') {
    return {
      filter: {
        orderBy: by,
        search: gameName,
        withFiltersCount: true
      },
      pagination: {
        skip: skip,
        limit: 15
      }
    };
  }

  static gqlGameID(id: any) {
    return {
      id: id
    };
  }

  static firstGameIdFromList() {
    return `query games($filter: FilterInput, $pagination: PaginationInput) {
  games(filter: $filter, pagination: $pagination) {
    nodes {
      id
    }
  }
}`
  }

  static allGameDataFromList() {
    return `query game($id: OID!) {
  game(id: $id) {
    id
    publisher {
      id
      name
    }
    liveGame {
      title
      description
      descriptionShort
      categories
      developerName
      editorName
      releaseDate {
        year
        month
        day
      }
      systemsRequirements {
        osName
        minimum {
          os
          processor
          memory
          graphics
          storage
          soundCard
          minimumResolution
        }
        recommended {
          os
          processor
          memory
          graphics
          storage
          soundCard
          minimumResolution
        }
      }
      multimedia {
        largeHeroImage {
          name
          images {
            url
          }
        }
        boxArtImage {
          images {
            url
          }
        }
        imageGalleryList {
          name
          images {
            url
          }
        }
        videosPreviews {
          videoId
        }
      }
      tags
      links {
        name
        url
      }
      playingModes
      features
    }
  }
}`
  }

  static publishedTokenFactoriesByGame() {
    return `query publishedTokenFactoriesByGame($gameId: String!, $pagination: PaginationInput) {
  publishedTokenFactoriesByGame(gameId: $gameId, pagination: $pagination) {
    nodes {
      id
    }
  }
}`
  }

  static publishedTokenFactoryById() {
    return `query findPublishedTokenFactoryById($id: ID!) {
  findPublishedTokenFactoryById(id: $id) {
    id
    name
    description
    factoryType
    image {
      base {
        url
      }
      images {
        url
      }
    }
    prices {
      currency
      amount
      symbol
    }
    contentType {
      code
      name
    }
    multimedia {
      backGroundImage {
        base {
          url
        }
        images {
          url
        }
      }
      imageGalleryList {
        base {
          url
        }
        images {
          url
        }
      }
    }
  }
}`
  }

  static gqlFilterGameByGenre(genre: any) {
    return {
      filter: {
        categories: [genre]
      },
      pagination: {
        skip: 0,
        limit: 4
      }
    };
  }

  static ultraCloudLogin() {
    return gql`mutation ultraCloudLogin {
        ultraCloudLogin {
          jSessionId
        }
      }`
  }

  static purchasedGamesData() {
    return `query userGame{
   userGame{
      list{
         buildContentNodes{
             content{
                 tokens{
                     tokenFactory{
                         name
                         id
                        }
                    }
                }
            }
        }
    }
}`
  }

  static blockchainIdData() {
    return `query currentUser {
      currentUser {
        blockchainId
      }
    }`
  }

  static purchasedUniqData() {
    return `query ($pagination: PaginationInput) {
    uniq {
      inventory(pagination: $pagination) {
        data {
          factory {
            onChainId
            name
          }
        }
      }
    }
  }`;
  }

  static gqlUniqPagination() {
    return {
      pagination: {
        skip: 0,
        limit: 12
      }
    };
  }

  static redeemCode() {
    return gql`
      mutation redeem($code: String!) {
        redeem(code: $code) {
          onChainId
          transactionId
        }
      }
    `;
  }

  static tokenFactoriesByGameId() {
    return `query tokenFactoriesByGame($gameId: String!) {
      tokenFactoriesByGame(gameId: $gameId) {
        nodes {
          id
          name
          discounts {
            id
            discountBasisPoint
            startDate
            endDate
          }
        }
        totalCount
      }
    }`
  }

  static updateGameFactoryDiscount() {
    return gql`
      mutation gameFactoryDiscount(
        $discountId: OID!
        $discountBasisPoint: Int
        $endDate: DateTime
        $startDate: DateTime
      ) {
        gameFactoryDiscount {
          update(
            input: {
              id: $discountId
              discountBasisPoint: $discountBasisPoint
              endDate: $endDate
              startDate: $startDate
            }
          ) {
            id
            discountBasisPoint
            startDate
            endDate
          }
        }
      }
    `;
  }

  static createDiscountUpdate() {
    return gql`
      mutation gameFactoryDiscount(
        $gameFactoryId: OID!
        $discountBasisPoint: Int!
        $endDate: DateTime!
        $startDate: DateTime!
      ) {
        gameFactoryDiscount {
          create(
            gameFactoryId: $gameFactoryId
            input: { discountBasisPoint: $discountBasisPoint, endDate: $endDate, startDate: $startDate }
          ) {
            id
            discountBasisPoint
            startDate
            endDate
            gameFactoryId
          }
        }
      }
    `;
  }
}
