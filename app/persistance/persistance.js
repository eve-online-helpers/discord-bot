"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
require("reflect-metadata");
var Bluebird = require("bluebird");
var mongodb_1 = require("mongodb");
var configurations_1 = require("../configurations");
var inversify_1 = require("inversify");
var EXCEPTION_ITEMS = {
    plex: "30 Day Pilot's License Extension (PLEX)"
};
var config = configurations_1.getConfigurations();
var client = new mongodb_1.MongoClient();
var tradeHubsMap = new Map();
tradeHubsMap.set('jita', 'Jita IV - Moon 4 - Caldari Navy Assembly Plant');
tradeHubsMap.set('amarr', 'Amarr VIII (Oris) - Emperor Family Academy');
tradeHubsMap.set('rens', 'Rens VI - Moon 8 - Brutor Tribe Treasury');
tradeHubsMap.set('dodixie', 'Dodixie IX - Moon 20 - Federation Navy Assembly Plant');
tradeHubsMap.set('hek', 'Hek VIII - Moon 12 - Boundless Creation Factory');
var Persistance = (function () {
    function Persistance() {
        var _this = this;
        client.connect(process.env.MONGODB_URI || config.mongodbConnection)
            .then(function (conn) {
            _this._connection = conn;
            console.info('connected to db');
        })
            .catch(function (err) {
            console.error(err);
        });
    }
    Persistance.prototype.getConnection = function () {
        return this._connection;
    };
    Persistance.prototype.getItemsByName = function (itemName) {
        if (EXCEPTION_ITEMS[itemName]) {
            return this._connection.collection('items').find({ name: EXCEPTION_ITEMS[itemName] }).toArray();
        }
        var regexString = '';
        if (itemName.startsWith('*')) {
            itemName = itemName.substr(1, itemName.length);
        }
        else {
            itemName = '^' + itemName;
        }
        if (itemName.endsWith('*')) {
            itemName = itemName.substr(0, itemName.length - 1);
        }
        else {
            itemName = itemName + '$';
        }
        return this._connection.collection('items').find({ name: new RegExp(itemName, 'i') }).toArray();
    };
    Persistance.prototype.getStationByName = function (stationName) {
        stationName = tradeHubsMap.get(stationName) || stationName;
        stationName = stationName.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
        return this._connection.collection('stations').findOne({ stationName: new RegExp(stationName, 'i') });
    };
    Persistance.prototype.getItemByName = function (itemName) {
        return this._connection.collection('items').findOne({ name: new RegExp("^" + itemName, 'i') });
    };
    Persistance.prototype.addUser = function (user) {
        var _this = this;
        return new Bluebird(function (resolve, reject) {
            var usersColl = _this._connection.collection('users');
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
    };
    Persistance.prototype.addReminder = function (reminder) {
        return this._connection.collection('reminders').insertOne(reminder);
    };
    Persistance.prototype.getReminders = function () {
        return this._connection.collection('reminders').find({})
            .toArray();
    };
    Persistance.prototype.getItemsByIds = function (itemsIds) {
        return this._connection.collection('items').find({
            id: { $in: itemsIds }
        }).toArray();
    };
    return Persistance;
}());
Persistance = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], Persistance);
exports.Persistance = Persistance;
