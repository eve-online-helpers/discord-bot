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
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const Bluebird = require("bluebird");
const mongodb_1 = require("mongodb");
const configurations_1 = require("../configurations");
const inversify_1 = require("inversify");
const EXCEPTION_ITEMS = {};
const config = configurations_1.getConfigurations();
const client = new mongodb_1.MongoClient();
const tradeHubsMap = new Map();
tradeHubsMap.set('jita', 'Jita IV - Moon 4 - Caldari Navy Assembly Plant');
tradeHubsMap.set('amarr', 'Amarr VIII (Oris) - Emperor Family Academy');
tradeHubsMap.set('rens', 'Rens VI - Moon 8 - Brutor Tribe Treasury');
tradeHubsMap.set('dodixie', 'Dodixie IX - Moon 20 - Federation Navy Assembly Plant');
tradeHubsMap.set('hek', 'Hek VIII - Moon 12 - Boundless Creation Factory');
let Persistance = class Persistance {
    constructor() {
        client.connect(process.env.MONGODB_URI || config.mongodbConnection)
            .then(conn => {
            this._connection = conn;
            console.info('connected to db');
        })
            .catch(err => {
            console.error(err);
        });
    }
    getConnection() {
        return this._connection;
    }
    getItemsByName(itemName) {
        if (EXCEPTION_ITEMS[itemName]) {
            return this._connection.collection('items').find({ name: EXCEPTION_ITEMS[itemName] }).toArray();
        }
        let regexString = '';
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
    }
    getStationByName(stationName) {
        stationName = tradeHubsMap.get(stationName) || stationName;
        stationName = stationName.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
        return this._connection.collection('stations').findOne({ stationName: new RegExp(stationName, 'i') });
    }
    getItemByName(itemName) {
        return this._connection.collection('items').findOne({ name: new RegExp(`^${itemName}`, 'i') });
    }
    addUser(user) {
        return new Bluebird((resolve, reject) => {
            const usersColl = this._connection.collection('users');
            usersColl
                .findOne({ authorId: user.authorId, characterId: user.characterId })
                .then(dbUser => {
                if (dbUser) {
                    reject(user);
                }
                usersColl.insertOne(user)
                    .then(result => {
                    resolve(user);
                })
                    .catch(err => {
                    reject(err);
                });
            });
        });
    }
    addReminder(reminder) {
        return this._connection.collection('reminders').insertOne(reminder);
    }
    getReminders() {
        return this._connection.collection('reminders').find({})
            .toArray();
    }
    getItemsByIds(itemsIds) {
        return this._connection.collection('items').find({
            id: { $in: itemsIds }
        }).toArray();
    }
};
Persistance = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], Persistance);
exports.Persistance = Persistance;
