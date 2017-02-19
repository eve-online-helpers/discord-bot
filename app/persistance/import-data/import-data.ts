import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as persistence from '../';

export function importStations(filePath) {
    let stations = yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
    const conn = persistence.getConnection();

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
    const items = yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
    const conn = persistence.getConnection();
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