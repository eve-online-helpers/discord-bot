import * as Bluebird from 'bluebird';
import { MongoClient, Db } from 'mongodb';

const client = new MongoClient();
let _connection: Db;
export function getConnection(): Bluebird<Db> {
    return new Bluebird<Db>((resolve, reject) => {
        if (_connection) {
            resolve(_connection);
            return;
        }

        client.connect('mongodb://localhost:27017/eve-discord-bot')
            .then(conn => {
                _connection = conn;
                resolve(conn);
            })  
            .catch(err => {
                reject(err);
            });
    });
} 