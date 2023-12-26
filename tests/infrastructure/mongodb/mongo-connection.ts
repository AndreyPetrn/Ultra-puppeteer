import * as dotenv from 'dotenv';

import { GameSchema, GameUniqsSchema, LibraryItemSchema } from './models/game/game.schema';

import { CompanySchema } from './models/company/company.schema';
import { ObjectId } from 'bson';
import { UserSchema } from './models/user/user.schema';

const { MongoClient } = require('mongodb');
const config = require('../../../config/config.data.json');
const path = require('path');
const MONGO_URL = config.env.MONGO.URL;
dotenv.config({ path: path.join(__dirname, '../../.env') });

export async function connectToDatabase(dbName: string): Promise<any> {
    try {
        const client = new MongoClient(MONGO_URL);
        await client.connect();

        const db = client.db(dbName);
        console.log('--> Connected to DB');

        return { client, db };
    } catch (err: any) {
        console.log('<-XXX-> Connection to db failed');
        console.log(JSON.stringify(err.message));
        return null;
    }
}

export async function disconnectFromDatabase(client: any) {
    try {
        await client.close();
        console.log('<-- Connection to db closed');
    } catch (err: any) {
        console.log('<-XXX-> Error closing db connection');
        console.log(JSON.stringify(err.message));
    }
}

async function universalRequest(usersDB: any, request: any) {
    if (!usersDB) {
        return null;
    }
    try {
        await request;
        console.log('Request fetched');
    } catch (err: any) {
        console.log('Request was not fetched');
        console.log(JSON.stringify(err.message));
    }
    return request;
}

export async function findUserByEmail(usersDB: any, userEmail: string) {
    const usersModel = usersDB.collection('users', UserSchema);
    const findOne = await usersModel.findOne({ 'personalData.email': userEmail });
    return universalRequest(usersDB, findOne);
}

export async function findUserByUsername(usersDB: any, username: string | undefined) {
    const usersModel = usersDB.collection('users', UserSchema);
    const findOne = await usersModel.findOne({ 'username': username });
    return universalRequest(usersDB, findOne);
}

export async function getCompanyCount(companiesDB: any) {
    const companiesModel = await companiesDB.collection('companies', CompanySchema);
    const count = await companiesModel.count();
    return universalRequest(companiesDB, count);
}

export async function getLibraryGameType(
    companiesDB: any,
    userOnChainId: string,
    tokenId: string,
    maxRetries: number = 6
){
    let retries = 0;
    let data = null;
    const purchasedGame = await companiesDB.collection('libraryitems', LibraryItemSchema);
    const tokenFactoryId = new ObjectId(tokenId);

    while ( retries < maxRetries) {
        data = await purchasedGame.findOne({ userOnChainId, tokenFactoryId });
        if (data !== null) { break; } retries++;
        await page.waitForTimeout(5000);
    }
    return data !== null ? universalRequest(companiesDB, data.type) : data;
}

export async function getGameUniqData(companiesDB: any, userOnChainId: string, uniqFactoryOnChainId: number) {
    const purchasedGame = await companiesDB.collection('gameuniqs', GameUniqsSchema);
    const data = await purchasedGame.findOne({ userOnChainId, uniqFactoryOnChainId });
    return universalRequest(companiesDB, data);
}

export async function getUserCount(usersDB: any) {
    const usersModel = await usersDB.collection('users', UserSchema);
    const aggregate = await usersModel
        .aggregate([
            {
                $match: {
                    isDeleted: false,
                },
            },
            {
                $count: 'string',
            },
        ])
        .toArray();
    const userCount = await universalRequest(usersModel, aggregate);
    return userCount[0].string;
}

export async function getCompanyMembersCount(companiesDB: any, companyTitle: string | undefined) {
    const companiesModel = await companiesDB.collection('companies', CompanySchema);
    const aggregate = await companiesModel
        .aggregate([
            {
                $match: {
                    name: `${companyTitle}`,
                },
            },
            {
                $unwind: {
                    path: '$users',
                },
            },
            {
                $count: 'users',
            },
        ])
        .toArray();
    const companyMembersCount = await universalRequest(companiesModel, aggregate);
    return companyMembersCount[0].users;
}

export async function getGamesCount(gamesDB: any, status: string) {
    let filter;
    switch (status){
        case 'all':
            filter = ['published', 'enabled', 'disabled'];
            break;
        case 'published':
        case 'enabled':
        case 'disabled':
            filter = [status];
            break;
        default:
            throw new Error('Wrong parameter! You must choose between "all", "published", "enabled", and "disabled".');
    }
    const gamesModel = await gamesDB.collection('games', GameSchema);
    const aggregate = await gamesModel
        .aggregate([
            {
                $match: {
                    storePageStatus: {
                        $in: filter
                    }
                }},
            {
                $count: 'storePageStatus',
            },
        ])
        .toArray();
    const gamesCount = await universalRequest(gamesModel, aggregate);
    let count;
    gamesCount[0]? count = gamesCount[0].storePageStatus: count = 0;
    return count.toString();
}

export async function getLaunchpadCollection(db: any): Promise<string[]> {
    const collection = await db.collection('uniqfactorystaticcollections');
    const request = await collection.findOne({'name': 'default'});
    const data = await universalRequest(collection, request);
    const uniqIds = [];
    for (const i of data.itemIds) {
        uniqIds.unshift(i.toString());
    };
    return uniqIds;
}
