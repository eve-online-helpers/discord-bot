import * as Bluebird from 'bluebird';
import { MongoClient, Db, InsertOneWriteOpResult } from 'mongodb';
import { StationDBResponse } from '../models/station-db-response';
import { ItemDBResponse } from '../models/item-db-response.model';
import { UserModel } from '../models/user.model';
import { getConfigurations } from '../configurations';
import { BaseReminder } from '../reminders/base-reminder';

const config = getConfigurations();
const client = new MongoClient();
let _connection: Db;

const tradeHubsMap = new Map<string, string>();
tradeHubsMap.set('jita', 'Jita IV - Moon 4 - Caldari Navy Assembly Plant');
tradeHubsMap.set('amarr', 'Amarr VIII (Oris) - Emperor Family Academy');
tradeHubsMap.set('rens', 'Rens VI - Moon 8 - Brutor Tribe Treasury');
tradeHubsMap.set('dodixie', 'Dodixie IX - Moon 20 - Federation Navy Assembly Plant');
tradeHubsMap.set('hek', 'Hek VIII - Moon 12 - Boundless Creation Factory');


client.connect(process.env.MONGODB_URI || config.mongodbConnection)
    .then(conn => {
        _connection = conn;
        console.info('connected to db');
    })
    .catch(err => {
        console.error(err);
    });

export function getConnection(): Db {
    return _connection;
}

export function getItemByName(itemName: string): Promise<ItemDBResponse> {
    const conn = getConnection();
    return conn.collection('items').findOne({ name: new RegExp(`^${itemName}`, 'i') });
}

export function getStationByName(stationName: string): Promise<StationDBResponse> {
    stationName = tradeHubsMap.get(stationName) || stationName;
    stationName = stationName.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");

    const conn = getConnection();
    return conn.collection('stations').findOne({ stationName: new RegExp(stationName, 'i') });
}

export function addUser(user: UserModel): Bluebird<UserModel> {
    return new Bluebird<UserModel>((resolve, reject) => {
        const usersColl = _connection.collection('users');
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

export function addReminder(reminder: BaseReminder<any>): Promise<InsertOneWriteOpResult> {
    return _connection.collection('reminders').insertOne(reminder);
}

export function getReminders(): Promise<BaseReminder<any>[]> {
    return _connection.collection('reminders').find({})
        .toArray();
}