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
var Bluebird = require("bluebird");
var priceService = require("../eve-client/api/price.service");
var inversify_1 = require("inversify");
var persistance_1 = require("../persistance");
var currency_formatter_1 = require("../formatters/currency-formatter");
var string_error_1 = require("../models/string-error");
var PriceResolver = (function () {
    function PriceResolver() {
    }
    PriceResolver.prototype.getPriceResolver = function (input) {
        var persistance = this.persistance;
        return new Bluebird(function (resolve, reject) {
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
            var item = input.get('p').value;
            var stationParam = input.getFirst(['jita', 'amarr', 'hek', 'dodixie']);
            if (!item) {
                reject(new string_error_1.StringError('item name is mandatory'));
            }
            if (item.length < 3) {
                reject(new string_error_1.StringError("Item name should be at least 3 chatacter long, `" + item + "` is too short."));
            }
            var ops = [];
            ops.push(persistance.getItemsByName(item));
            ops.push(persistance_1.getStationByName(stationParam ? stationParam.key : 'jita'));
            Promise.all(ops)
                .then(function (res) {
                var items = res[0];
                var station = res[1];
                if (items.length === 0) {
                    reject(new string_error_1.StringError("No items found that match search criteria (" + item + ")"));
                    return;
                }
                if (items.length > 20) {
                    // TODO: beutify response
                    reject(new string_error_1.StringError("Search returned too many items (" + items.length + "), please refine your search and try again! (max of 20 items display is available)"));
                    return;
                }
                var pricesInspections = [];
                for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                    var item_1 = items_1[_i];
                    pricesInspections.push(priceService.getPriceForItemOnStation(item_1.id, station.regionID, station.stationID).reflect());
                }
                Promise.all(pricesInspections)
                    .then(function (priceResultsInspections) {
                    var discordResponse = "**Results for " + station.stationName + "**\n\n";
                    var itemsNotFound = '';
                    for (var i = 0; i < priceResultsInspections.length; i++) {
                        if (priceResultsInspections[i].isRejected()) {
                            console.log("item not found: " + items[i].name);
                            itemsNotFound += "No orders for " + items[i].name + " were found\n";
                            continue;
                        }
                        var priceResult = priceResultsInspections[i].value();
                        discordResponse += "__" + items[i].name + "__\n";
                        if (priceResult.sell) {
                            discordResponse += "sell: " + priceResult.sell.volume_remain + " items for **" + currency_formatter_1.formatCurrency(priceResult.sell.price, 2) + " ISK**\n";
                        }
                        if (priceResult.buy) {
                            discordResponse += "buy: " + priceResult.buy.volume_remain + " items for **" + currency_formatter_1.formatCurrency(priceResult.buy.price, 2) + " ISK**\n";
                            discordResponse += '\n';
                        }
                    }
                    discordResponse += itemsNotFound;
                    resolve(discordResponse);
                })
                    .catch(function (err) {
                    reject(err);
                });
            });
        });
    };
    return PriceResolver;
}());
__decorate([
    inversify_1.inject('Persistance'),
    __metadata("design:type", Object)
], PriceResolver.prototype, "persistance", void 0);
exports.PriceResolver = PriceResolver;
