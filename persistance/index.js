"use strict";
var mongodb_1 = require("mongodb");
var client = new mongodb_1.MongoClient();
var _connection;
var tradeHubsMap = new Map();
tradeHubsMap.set('jita', 'Jita IV - Moon 4 - Caldari Navy Assembly Plant');
tradeHubsMap.set('amarr', 'Amarr VIII (Oris) - Emperor Family Academy');
tradeHubsMap.set('rens', 'Rens VI - Moon 8 - Brutor Tribe Treasury');
tradeHubsMap.set('dodixie', 'Dodixie IX - Moon 20 - Federation Navy Assembly Plant');
tradeHubsMap.set('hek', 'Hek VIII - Moon 12 - Boundless Creation Factory');
client.connect('mongodb://localhost:27017/eve-discord-bot')
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
    return conn.collection('items').findOne({ name: new RegExp(itemName, 'i') });
}
exports.getItemByName = getItemByName;
function getStationByName(stationName) {
    stationName = tradeHubsMap.get(stationName) || stationName;
    stationName = stationName.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    var conn = getConnection();
    return conn.collection('stations').findOne({ stationName: new RegExp(stationName, 'i') });
}
exports.getStationByName = getStationByName;
//# sourceMappingURL=index.js.map