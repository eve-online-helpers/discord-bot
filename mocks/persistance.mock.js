"use strict";
var station_db_response_1 = require("../app/models/station-db-response");
var PersistanceMock = (function () {
    function PersistanceMock() {
    }
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
    return PersistanceMock;
}());
exports.PersistanceMock = PersistanceMock;
