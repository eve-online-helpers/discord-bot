import * as Bluebird from 'bluebird';
import { MongoClient, Db } from 'mongodb';
import { StationDBResponse } from '../models/station-db-response';
import { ItemDBResponse } from '../models/item-db-response.model';

const client = new MongoClient();
let _connection: Db;

const tradeHubsMap = new Map<string, string>();
tradeHubsMap.set('jita', 'Jita IV - Moon 4 - Caldari Navy Assembly Plant');
tradeHubsMap.set('amarr', 'Amarr VIII (Oris) - Emperor Family Academy');
tradeHubsMap.set('rens', 'Rens VI - Moon 8 - Brutor Tribe Treasury');
tradeHubsMap.set('dodixie', 'Dodixie IX - Moon 20 - Federation Navy Assembly Plant');
tradeHubsMap.set('hek', 'Hek VIII - Moon 12 - Boundless Creation Factory');


client.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eve-discord-bot')
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
    return conn.collection('items').findOne({ name: new RegExp(itemName, 'i') });
}

export function getStationByName(stationName: string): Promise<StationDBResponse> {
    stationName = tradeHubsMap.get(stationName) || stationName;
    stationName = stationName.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");

    const conn = getConnection();
    return conn.collection('stations').findOne({ stationName: new RegExp(stationName, 'i') });
}