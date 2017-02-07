"use strict";
var Bluebird = require("bluebird");
var mongodb_1 = require("mongodb");
var configurations_1 = require("../configurations");
var config = configurations_1.getConfigurations();
var client = new mongodb_1.MongoClient();
var _connection;
var tradeHubsMap = new Map();
tradeHubsMap.set('jita', 'Jita IV - Moon 4 - Caldari Navy Assembly Plant');
tradeHubsMap.set('amarr', 'Amarr VIII (Oris) - Emperor Family Academy');
tradeHubsMap.set('rens', 'Rens VI - Moon 8 - Brutor Tribe Treasury');
tradeHubsMap.set('dodixie', 'Dodixie IX - Moon 20 - Federation Navy Assembly Plant');
tradeHubsMap.set('hek', 'Hek VIII - Moon 12 - Boundless Creation Factory');
client.connect(process.env.MONGODB_URI || config.mongodbConnection)
    .then(function (conn) {
    _connection = conn;
    console.info('connected to db');
})
    .catch(function (err) {
    console.error(err);
});
function getConnection() {
    return _connection;
}
exports.getConnection = getConnection;
function getItemByName(itemName) {
    var conn = getConnection();
    return conn.collection('items').findOne({ name: new RegExp("^" + itemName, 'i') });
}
exports.getItemByName = getItemByName;
function getStationByName(stationName) {
    stationName = tradeHubsMap.get(stationName) || stationName;
    stationName = stationName.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    var conn = getConnection();
    return conn.collection('stations').findOne({ stationName: new RegExp(stationName, 'i') });
}
exports.getStationByName = getStationByName;
function addUser(user) {
    return new Bluebird(function (resolve, reject) {
        var usersColl = _connection.collection('users');
        usersColl
            .findOne({ authorId: user.authorId, characterId: user.characterId })
            .then(function (dbUser) {
            if (dbUser) {
                reject(user);
            }
            usersColl.insertOne(user)
                .then(function (result) {
                resolve(user);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    });
}
exports.addUser = addUser;
//# sourceMappingURL=index.js.map