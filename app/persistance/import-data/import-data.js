"use strict";
const yaml = require("js-yaml");
const fs = require("fs");
const inversify_config_1 = require("../../configurations/inversify.config");
const inversify_types_1 = require("../../configurations/inversify.types");
let persistance = inversify_config_1.container.get(inversify_types_1.TYPES.Perisistance);
function importStations(filePath) {
    let stations = yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
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
exports.importStations = importStations;
function importItems(filePath) {
    const items = yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
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
exports.importItems = importItems;
function importGroups(filePath) {
}
exports.importGroups = importGroups;
