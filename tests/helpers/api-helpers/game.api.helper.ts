import { step } from '../allure.helper';
import { gql, GraphQLClient } from 'graphql-request';
import { gqlDataHelper } from '../data-helpers/gql.data.helper';
const config = require('../../../config/config.data.json').env;
const accessUrl = config.KEYCLOAK.ACC_URL;
const gameListUrl = config.GAMELIST.URL;
const secondUserName = config.SECONDUSER.USERNAME;
const password = config.SECONDUSER.PASSWORD;
const graphQLClient = new GraphQLClient(gameListUrl);
const graphQLUniq = new GraphQLClient(config.UNIQLIST.URL);
const request = require('request').defaults();
let infoResponse;

export class GameHelper {
  @step('[API] Get the "Access Token" value')
  static async getAccessToken(username: string = secondUserName): Promise<any> {
    return new Promise((resolve, reject) => {
      request.post({
          url: accessUrl,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          form: {
            grant_type: 'password',
            username: username,
            password: password,
            client_id: 'ultraWebapp',
          },
        },
        (error: any, response: { statusCode: string | number; }, body: string) => {
          if ((!error && response.statusCode === 200) || response.statusCode === 201) {
            const info = JSON.parse(body);
            infoResponse = info.access_token;
            resolve({
              authorization: `Bearer ${infoResponse}`
            });
          } else {
            reject({ error: error, status: response.statusCode });
            throw '[getAccessToken] ERROR: API request responded with status code: ' + response.statusCode + ' EXPECTED: 200 or 201';
          }
        }
      );
    });
  }

  @step('[API] Get the game release list')
  static async getGameReleaseDateList(): Promise<any> {
    const query = gql`${await gqlDataHelper.gameReleaseDateList()}`;
    const variables = gqlDataHelper.gqlParams('RELEASE_DATE',0);

    const data: any = await graphQLClient.rawRequest(query, variables, await this.getAccessToken());
    const games = data.data.games.nodes;
    return games.map((game: any) => `${game.liveGame.releaseDate.year}.${game.liveGame.releaseDate.month}.${game.liveGame.releaseDate.day}`);
  }

  @step('[API] Get the game list')
  static async getGameList(by: any, skip: number): Promise<any> {
    const query = gql`${await gqlDataHelper.gameList()}`;
    const variables = gqlDataHelper.gqlParams(by, skip);

    const data: any = await graphQLClient.rawRequest(query, variables, await this.getAccessToken());
    const games = data.data.games.nodes;
    return games.map((game: any) => game.liveGame.title.substring(0, 10));
  }

  @step('[API] Get the "Game total" value')
  static async getGameTotal(): Promise<any> {
    const query = gql`${await gqlDataHelper.gameTotal()}`;
    const variables = gqlDataHelper.gqlParams('RELEVANCE',0);

    const data:any = await graphQLClient.rawRequest(query, variables, await this.getAccessToken());
    const totalCount = data.data.games.totalCount;
    const limit = data.data.games.pagination.limit;

    return {
      totalCount: totalCount,
      limit: limit
    };
  }

  @step('[API] Get the link to the game image from wish list')
  static async getLinkToGameImageFromWishList(): Promise<any> {
    const query = gql`${await gqlDataHelper.linkGameImageFromWishList()}`;

    const data:any = await graphQLClient.rawRequest(query, {}, await this.getAccessToken());
    const url = data.data.currentUserGameAccount.gamesWishlist[0].liveGame.multimedia.imageGalleryList[0].images[0].url;
    return url.substring(url.length - 50);
  }

  @step('[API] Get the link to the game image from the game list')
  static async getLinkToGameImageFromList(): Promise<any> {
    const query = gql`${gqlDataHelper.linkGameImageFromList()}`;
    const variables = gqlDataHelper.gqlParams('RELEVANCE',0);

    const data:any = await graphQLClient.rawRequest(query, variables, await this.getAccessToken());
    const url = data.data.games.nodes[0].liveGame.multimedia.imageGalleryList[0].images[0].url;
    return url.substring(url.length - 50);
  }

  @step('[API] Get first game ID from list')
  static async getFirstGameIdFromList(gameName: string = ''): Promise<any> {
    const query = gql`${gqlDataHelper.firstGameIdFromList()}`;
    const variables = gqlDataHelper.gqlParams('RELEASE_DATE',0, gameName);

    const data:any = await graphQLClient.rawRequest(query, variables, await this.getAccessToken());
    return data.data.games.nodes[0].id;
  }

  @step('[API] Get game details by ID')
  static async getAllGameDataFromList(gameID: any): Promise<any> {
    const query = gql`${gqlDataHelper.allGameDataFromList()}`;
    const variables = { id: gameID };

    const data:any = await graphQLClient.rawRequest(query, variables, await this.getAccessToken());
    const game = data.data.game.liveGame;
    return {
      title: game.title,
      description: game.description,
      descriptionShort: game.descriptionShort,
      largeHeroImage: game.multimedia.largeHeroImage.images[0].url,
      boxArtImage: game.multimedia.boxArtImage.images[0].url,
      videoId: game.multimedia.videosPreviews[0].videoId,
      genres: game.categories,
      tags: game.tags,
      developer: game.developerName,
      editor: game.editorName,
      playingModes: game.playingModes,
      releaseDate: game.releaseDate,
      links: game.links,
      features: game.features,
      minimumRequirements: game.systemsRequirements[0].minimum,
      recommendedRequirements: game.systemsRequirements[0].recommended,
    };
  }

  @step('[API] Get published Token Factories ID by game ID')
  static async getPublishedTokenFactoriesID(gameID: any, number: number): Promise<any> {
    const query = gql`${gqlDataHelper.publishedTokenFactoriesByGame()}`;
    const variables = { gameId: gameID };

    const data:any = await graphQLClient.rawRequest(query, variables, await this.getAccessToken());
    return data.data.publishedTokenFactoriesByGame.nodes[number].id;
  }

  @step('[API] Get published Token Factory by ID')
  static async getPublishedTokenFactoryById(tokenFactoryID: any): Promise<any> {
    const query = gql`${gqlDataHelper.publishedTokenFactoryById()}`;
    const variables = { id: tokenFactoryID };

    const data:any = await graphQLClient.rawRequest(query, variables, await this.getAccessToken());
    const tokenFactory = data.data.findPublishedTokenFactoryById;
    return {
      name: tokenFactory.name,
      price: tokenFactory.prices,
      description: tokenFactory.description,
      contentTypeCode: tokenFactory.contentType.code,
      contentTypeName: tokenFactory.contentType.name,
      multimedia: tokenFactory.multimedia.imageGalleryList[0].base.url
    };
  }

  @step('[API] Get the recommended game list')
  static async getRecommendedGameList(genre: any): Promise<any> {
    const query = gql`${await gqlDataHelper.gameList()}`;
    const variables = gqlDataHelper.gqlFilterGameByGenre(genre);

    const data: any = await graphQLClient.rawRequest(query, variables, await this.getAccessToken());
    const games = data.data.games.nodes.slice(0, 4);
    return games.map((game: any) => game.liveGame.title.substring(0, 10));
  }

  @step('[API] Create GameFactoryDiscount to a token factory')
  static async createGameFactoryDiscount(discountValues: any): Promise<any> {
    const query = gql`${await gqlDataHelper.createDiscountUpdate()}`;
    const { tokenFactoryId, ...rest } = discountValues;
    const modifiedDiscountValues = { gameFactoryId: tokenFactoryId, ...rest };
    const data: any = await graphQLClient.rawRequest(query, modifiedDiscountValues, await this.getAccessToken());
    const discounts = data.data.gameFactoryDiscount.create;
    return {id: discounts.gameFactoryId, discounts: [{ id: discounts.id }],};
  }

  @step('[API] Get the discount id of a token factory')
  static async getTokenDiscountId(discount: any): Promise<any> {
    const query = gql`${await gqlDataHelper.tokenFactoriesByGameId()}`;
    const data: any = await graphQLClient.rawRequest(query, discount, await this.getAccessToken());
    const games = data.data.tokenFactoriesByGame.nodes;
    discount.tokenFactoryId = games[0].id;
    return games[0].discounts == null ? this.createGameFactoryDiscount(discount) : games[0];
  }

  @step('[API] Edit/Update existing discount from token factory')
  static async updateGameFactoryDiscount(discount: any): Promise<any> {
    const query = gql`${await gqlDataHelper.updateGameFactoryDiscount()}`;
    return await graphQLClient.rawRequest(query, discount, await this.getAccessToken());
  }

  @step('[API] Get the purchased games count')
  static async getPurchasedGamesCount(user: any): Promise<any> {
    const query = gql`${await gqlDataHelper.purchasedGamesData()}`;

    const data:any = await graphQLClient.rawRequest(query, {}, await this.getAccessToken(await user.email));
    return (data.data.userGame.list).length;
  }

  @step('[API] Get the current user\'s blockchainId')
  static async getBlockchainId(user: any): Promise<any> {
    const query = gql`${await gqlDataHelper.blockchainIdData()}`;

    const data:any = await graphQLClient.rawRequest(query, {}, await this.getAccessToken(await user.email));
    return data.data.currentUser.blockchainId;
  }

  @step('[API] Get the purchased game ID')
  static async getGameId(user: any, tokenName: string): Promise<any> {
    const query = gql`${await gqlDataHelper.purchasedGamesData()}`;

    const data:any = await graphQLClient.rawRequest(query, {}, await this.getAccessToken(await user.email));
    const games = data.data.userGame.list;

    const id = games.filter((game: any) => game.buildContentNodes[0].content.tokens[0].tokenFactory.name === tokenName);
    return String(id.map((game: any) => game.buildContentNodes[0].content.tokens[0].tokenFactory.id));
  }

  @step('[API] Get the purchased uniq ID')
  static async getUniqId(user: any, factoryName: string): Promise<number> {
    const query = gql`${await gqlDataHelper.purchasedUniqData()}`;
    const variables = gqlDataHelper.gqlUniqPagination();

    const data: any = await graphQLUniq.rawRequest(query, variables, await this.getAccessToken(await user.email));
    const factories = data.data.uniq.inventory.data;

    const filteredFactories = factories.filter((factory: any) => factory.factory.name === factoryName);
    return Number(filteredFactories.map((factory: any) => factory.factory.onChainId));
  }
};

