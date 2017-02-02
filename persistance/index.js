"use strict";
var Bluebird = require("bluebird");
var mongodb_1 = require("mongodb");
var client = new mongodb_1.MongoClient();
var _connection;
function getConnection() {
    return new Bluebird(function (resolve, reject) {
        if (_connection) {
            resolve(_connection);
            return;
        }
        client.connect('mongodb://localhost:27017/eve-discord-bot')
            .then(function (conn) {
            _connection = conn;
            resolve(conn);
        })
            .catch(function (err) {
            reject(err);
        });
    });
}
exports.getConnection = getConnection;
//# sourceMappingURL=index.js.map