import * as yaml from 'js-yaml';
import * as fs from 'fs';

import { IPersistance } from '../i-persistance';
import { container } from '../../configurations/inversify.config';
import { TYPES } from '../../configurations/inversify.types';

let persistance = container.get<IPersistance>(TYPES.Perisistance);
export function importStations(filePath) {
    let stations = yaml.safeLoad(fs.readFileSync(filePath, {encoding: 'utf8'}));
    const conn = persistance.getConnection();

    conn.dropCollection('stations');
    conn.collection('stations').insertMany(stations)
        .then(res => {
            console.log('import of stations complete with');
        })
        .catch(err => {
            console.error(err);
        });
}

export function importItems(filePath) {
    const items = yaml.safeLoad(fs.readFileSync(filePath, {encoding: 'utf8'}));
    const conn = persistance.getConnection();
    conn.dropCollection('items');

    const keys = Object.keys(items);
    let ops = [];
    keys.forEach(key => {
        let dbItem = {
            id: key,
            name: items[key].name.en,
            groupId: items[key].groupID
        };
        ops.push(conn.collection('items').insertOne(dbItem));
    });

    Promise.all(ops)
        .then(res => {
            console.log('import of items complete');
        })
        .catch(err => {
            console.error(err);
        });
}

export function importGroups(filePath) {

}