import 'reflect-metadata';
import * as Bluebird from 'bluebird';
import { MongoClient, Db, InsertOneWriteOpResult } from 'mongodb';
import { StationDBResponse } from '../models/station-db-response';
import { ItemDBResponse } from '../models/item-db-response.model';
import { UserModel } from '../models/user.model';
import { getConfigurations } from '../configurations';
import { BaseReminder } from '../reminders/base-reminder';
import { IPersistance } from './i-persistance';
import { injectable } from 'inversify';

const EXCEPTION_ITEMS = {
    plex: `30 Day Pilot's License Extension (PLEX)`
};
const config = getConfigurations();
const client = new MongoClient();

const tradeHubsMap = new Map<string, string>();
tradeHubsMap.set('jita', 'Jita IV - Moon 4 - Caldari Navy Assembly Plant');
tradeHubsMap.set('amarr', 'Amarr VIII (Oris) - Emperor Family Academy');
tradeHubsMap.set('rens', 'Rens VI - Moon 8 - Brutor Tribe Treasury');
tradeHubsMap.set('dodixie', 'Dodixie IX - Moon 20 - Federation Navy Assembly Plant');
tradeHubsMap.set('hek', 'Hek VIII - Moon 12 - Boundless Creation Factory');

@injectable()
export class Persistance implements IPersistance {
    private _connection: Db;

    constructor() {
        client.connect(process.env.MONGODB_URI || config.mongodbConnection)
            .then(conn => {
                this._connection = conn;
                console.info('connected to db');
            })
            .catch(err => {
                console.error(err);
            });
    }

    getConnection(): Db {
        return this._connection;
    }
    getItemsByName(itemName: string): Promise<ItemDBResponse[]> {
        if (EXCEPTION_ITEMS[itemName]) {
            return this._connection.collection('items').find({ name: EXCEPTION_ITEMS[itemName] }).toArray();
        }

        let regexString = '';
        if (itemName.startsWith('*')) {
            itemName = itemName.substr(1, itemName.length);
        } else {
            itemName = '^' + itemName;
        }

        if (itemName.endsWith('*')) {
            itemName = itemName.substr(0, itemName.length - 1);
        } else {
            itemName = itemName + '$';
        }

        return this._connection.collection('items').find({ name: new RegExp(itemName, 'i') }).toArray();
    }

    getStationByName(stationName: string): Promise<StationDBResponse> {
        stationName = tradeHubsMap.get(stationName) || stationName;
        stationName = stationName.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');

        return this._connection.collection('stations').findOne({ stationName: new RegExp(stationName, 'i') });
    }

    getItemByName(itemName: string): Promise<ItemDBResponse> {
        return this._connection.collection('items').findOne({ name: new RegExp(`^${itemName}`, 'i') });
    }

    addUser(user: UserModel): Bluebird<UserModel> {
        return new Bluebird<UserModel>((resolve, reject) => {
            const usersColl = this._connection.collection('users');
            usersColl
                .findOne({ authorId: user.authorId, characterId: user.characterId })
                .then(dbUser => {
                    if (dbUser) {
                        reject(user);
                    }

                    usersColl.insertOne(user)
                        .then(result => {
                            resolve(user);
                        })
                        .catch(err => {
                            reject(err);
                        });
                });
        });
    }

    addReminder(reminder: BaseReminder<any>): Promise<InsertOneWriteOpResult> {
        return this._connection.collection('reminders').insertOne(reminder);
    }

    getReminders(): Promise<BaseReminder<any>[]> {
        return this._connection.collection('reminders').find({})
            .toArray();
    }
}