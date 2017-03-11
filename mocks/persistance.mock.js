"use strict";
var Bluebird = require("bluebird");
var station_db_response_1 = require("../app/models/station-db-response");
var PersistanceMock = (function () {
    function PersistanceMock() {
    }
    PersistanceMock.prototype.getConnection = function () {
        return null;
    };
    PersistanceMock.prototype.getItemsByName = function (mockItemName) {
        switch (mockItemName) {
            case 'UNKNOWN_ITEM':
                return Promise.resolve([]);
            case 'MANY_ITEMS':
                return Promise.resolve(new Array(21));
        }
    };
    PersistanceMock.prototype.getStationByName = function (stationNme) {
        return Promise.resolve(new station_db_response_1.StationDBResponse());
    };
    PersistanceMock.prototype.getItemByName = function (itemName) {
        return Promise.resolve(null);
    };
    PersistanceMock.prototype.addUser = function (user) {
        return Bluebird.resolve(null);
    };
    PersistanceMock.prototype.addReminder = function (reminder) {
        return Promise.resolve(null);
    };
    PersistanceMock.prototype.getReminders = function () {
        return Promise.resolve(null);
    };
    PersistanceMock.prototype.getItemsByIds = function (itemsIds) {
        return Promise.resolve([]);
    };
    return PersistanceMock;
}());
exports.PersistanceMock = PersistanceMock;
