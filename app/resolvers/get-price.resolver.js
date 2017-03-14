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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
require("reflect-metadata");
const priceService = require("../eve-client/api/price.service");
const inversify_1 = require("inversify");
const currency_formatter_1 = require("../formatters/currency-formatter");
const string_error_1 = require("../models/string-error");
const inversify_types_1 = require("../configurations/inversify.types");
let PriceResolver = class PriceResolver {
    constructor(persistance) {
        this.persistance = persistance;
    }
    resolveMessage(input) {
        const persistance = this.persistance;
        return new Promise((resolve, reject) => {
            if (input.has('help')) {
                resolve('\n\nprice usage: `!p <item name> <!jita !amarr !hek !dodixie !rens|>`\n\n' +
                    '__Wildcards, you can use wildcards to make search more advanced:__\n' +
                    '```!p *vexor  will search all items that end with `vexor`\n' +
                    '!p vexor*  will search all items that start with `vexor`\n' +
                    '!p *vexor* will search all items that include `vexor` ```\n\n' +
                    '__Defaults (default values for parameters)__\n' +
                    '```' +
                    'locations defaults to: !jita\n' +
                    '```');
                return;
            }
            let item = input.get('p').value;
            let stationParam = input.getFirst(['jita', 'amarr', 'hek', 'dodixie']);
            if (!item) {
                return reject(new string_error_1.StringError('item name is mandatory'));
            }
            if (item.length < 3) {
                return reject(new string_error_1.StringError(`Item name should be at least 3 chatacter long, \`${item}\` is too short.`));
            }
            const ops = [];
            ops.push(persistance.getItemsByName(item));
            ops.push(persistance.getStationByName(stationParam ? stationParam.key : 'jita'));
            Promise.all(ops)
                .then(res => {
                const items = res[0];
                const station = res[1];
                if (items.length === 0) {
                    reject(new string_error_1.StringError(`No items found that match search criteria (${item})`));
                    return;
                }
                if (items.length > 20) {
                    // TODO: beutify response
                    reject(new string_error_1.StringError(`Search returned too many items (${items.length}), please refine your search and try again! (max of 20 items display is available)`));
                    return;
                }
                let pricesInspections = [];
                for (let item of items) {
                    pricesInspections.push(priceService.getPriceForItemOnStation(item.id, station.regionID, station.stationID).reflect());
                }
                Promise.all(pricesInspections)
                    .then(priceResultsInspections => {
                    let discordResponse = `**Results for ${station.stationName}**\n\n`;
                    let itemsNotFound = '';
                    for (let i = 0; i < priceResultsInspections.length; i++) {
                        if (priceResultsInspections[i].isRejected()) {
                            console.log(`item not found: ${items[i].name}`);
                            itemsNotFound += `No orders for ${items[i].name} were found\n`;
                            continue;
                        }
                        let priceResult = priceResultsInspections[i].value();
                        discordResponse += `__${items[i].name}__\n`;
                        if (priceResult.sell) {
                            discordResponse += `sell: ${priceResult.sell.volume_remain} items for **${currency_formatter_1.formatCurrency(priceResult.sell.price, 2)} ISK**\n`;
                        }
                        if (priceResult.buy) {
                            discordResponse += `buy: ${priceResult.buy.volume_remain} items for **${currency_formatter_1.formatCurrency(priceResult.buy.price, 2)} ISK**\n`;
                            discordResponse += '\n';
                        }
                    }
                    discordResponse += itemsNotFound;
                    resolve(discordResponse);
                })
                    .catch(err => {
                    reject(err);
                });
            });
        });
    }
};
PriceResolver = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(inversify_types_1.TYPES.Perisistance)),
    __metadata("design:paramtypes", [Object])
], PriceResolver);
exports.PriceResolver = PriceResolver;
