"use strict";
var yaml = require("js-yaml");
var fs = require("fs");
var inversify_config_1 = require("../../configurations/inversify.config");
var inversify_types_1 = require("../../configurations/inversify.types");
var persistance = inversify_config_1.container.get(inversify_types_1.TYPES.Perisistance);
function importStations(filePath) {
    var stations = yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
    var conn = persistance.getConnection();
    conn.dropCollection('stations');
    conn.collection('stations').insertMany(stations)
        .then(function (res) {
        console.log('import of stations complete with');
    })
        .catch(function (err) {
        console.error(err);
    });
}
exports.importStations = importStations;
function importItems(filePath) {
    var items = yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
    var conn = persistance.getConnection();
    conn.dropCollection('items');
    var keys = Object.keys(items);
    var ops = [];
    keys.forEach(function (key) {
        var dbItem = {
            id: key,
            name: items[key].name.en,
            groupId: items[key].groupID
        };
        ops.push(conn.collection('items').insertOne(dbItem));
    });
    Promise.all(ops)
        .then(function (res) {
        console.log('import of items complete');
    })
        .catch(function (err) {
        console.error(err);
    });
}
exports.importItems = importItems;
