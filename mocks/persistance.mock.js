"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bluebird = require("bluebird");
const station_db_response_1 = require("../app/models/station-db-response");
class PersistanceMock {
    getConnection() {
        return null;
    }
    getItemsByName(mockItemName) {
        switch (mockItemName) {
            case 'UNKNOWN_ITEM':
                return Promise.resolve([]);
            case 'MANY_ITEMS':
                return Promise.resolve(new Array(21));
        }
    }
    getStationByName(stationNme) {
        return Promise.resolve(new station_db_response_1.StationDBResponse());
    }
    getItemByName(itemName) {
        return Promise.resolve(null);
    }
    addUser(user) {
        return Bluebird.resolve(null);
    }
    addReminder(reminder) {
        return Promise.resolve(null);
    }
    getReminders() {
        return Promise.resolve(null);
    }
    getItemsByIds(itemsIds) {
        return Promise.resolve([]);
    }
}
exports.PersistanceMock = PersistanceMock;
//# sourceMappingURL=persistance.mock.js.map