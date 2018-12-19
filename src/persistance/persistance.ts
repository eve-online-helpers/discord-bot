import 'reflect-metadata';
import * as Bluebird from 'bluebird';
import { MongoClient, Db, InsertOneWriteOpResult } from 'mongodb';
import { StationDBResponse } from '../models/station-db-response';
import { ItemDBResponse } from '../models/item-db-response.model';
import { UserModel } from '../models/user.model';
import { getConfigurations, ConfigModel } from '../configurations';
import { BaseReminder } from '../reminders/base-reminder';
import { IPersistance } from './i-persistance';
import { injectable } from 'inversify';

const EXCEPTION_ITEMS: { [id: string]: string } = {

};

const tradeHubsMap = new Map<string, string>();
tradeHubsMap.set('jita', 'Jita IV - Moon 4 - Caldari Navy Assembly Plant');
tradeHubsMap.set('amarr', 'Amarr VIII (Oris) - Emperor Family Academy');
tradeHubsMap.set('rens', 'Rens VI - Moon 8 - Brutor Tribe Treasury');
tradeHubsMap.set('dodixie', 'Dodixie IX - Moon 20 - Federation Navy Assembly Plant');
tradeHubsMap.set('hek', 'Hek VIII - Moon 12 - Boundless Creation Factory');

@injectable()
export class Persistance implements IPersistance {
    private connection!: Db;
    private config: ConfigModel;
    private client: MongoClient;

    constructor() {
        this.initializeConnection();
        this.config = getConfigurations();
        this.client = new MongoClient();

    }

    async initializeConnection() {
        if (!process.env.MONGODB_URI || !this.config.mongodbConnection) {
            throw new Error('mongodb connection is required, please populate MONGODB_URI env variable')
        }

        try {
            this.connection = await this.client.connect(process.env.MONGODB_URI || this.config.mongodbConnection);
            console.log('persistence::initializeConnection:: connected to DB');
        } catch (error) {
            console.log('persistence::initializeConnection:: error creating connection to db');
            throw error;
        }
    }

    getConnection() {
        return this.connection;
    }
    getItemsByName(itemName: string): Promise<ItemDBResponse[]> {
        if (EXCEPTION_ITEMS[itemName]) {
            return this.connection.collection('items').find({ name: EXCEPTION_ITEMS[itemName] }).toArray();
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

        return this.connection.collection('items').find({ name: new RegExp(itemName, 'i') }).toArray();
    }

    getStationByName(stationName: string): Promise<StationDBResponse | null> {
        stationName = tradeHubsMap.get(stationName) || stationName;
        stationName = stationName.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');

        return this.connection.collection('stations').findOne({ stationName: new RegExp(stationName, 'i') });
    }

    getItemByName(itemName: string): Promise<ItemDBResponse | null> {
        return this.connection.collection('items').findOne({ name: new RegExp(`^${itemName}`, 'i') });
    }

    // addUser(user: UserModel): Bluebird<UserModel> {
    //     return new Bluebird<UserModel>((resolve, reject) => {
    //         const usersColl = this.connection.collection('users');
    //         usersColl
    //             .findOne({ authorId: user.authorId, characterId: user.characterId })
    //             .then(dbUser => {
    //                 if (dbUser) {
    //                     reject(user);
    //                 }

    //                 usersColl.insertOne(user)
    //                     .then(result => {
    //                         resolve(user);
    //                     })
    //                     .catch(err => {
    //                         reject(err);
    //                     });
    //             });
    //     });
    // }

    addReminder(reminder: BaseReminder<any>): Promise<InsertOneWriteOpResult> {
        return this.connection.collection('reminders').insertOne(reminder);
    }

    getReminders(): Promise<BaseReminder<any>[]> {
        return this.connection.collection('reminders').find({})
            .toArray();
    }

    getItemsByIds(itemsIds: string[]): Promise<ItemDBResponse[]> {
        return this.connection.collection('items').find({
            id: { $in: itemsIds }
        }).toArray();
    }
}