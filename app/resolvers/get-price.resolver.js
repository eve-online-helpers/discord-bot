"use strict";
var Bluebird = require("bluebird");
var priceService = require("../eve-client/api/price.service");
var persistance_1 = require("../persistance");
var currency_formatter_1 = require("../formatters/currency-formatter");
var string_error_1 = require("../models/string-error");
function getPriceResolver(input) {
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
        ops.push(persistance_1.getItemsByName(item));
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
        //     if (!yargs['item'] || yargs['item'] === '') {
        //         reject('`--item` parameter is mandatory');
        //     }
        //     const ops = [];
        //     ops.push(getItemByName(<string>yargs['item']));
        //     ops.push(getStationByName(<string>yargs['from'] || 'jita'));
        //     Promise.all(ops)
        //         .then(res => {
        //             const item = <ItemDBResponse>res[0];
        //             const station = <StationDBResponse>res[1];
        //             const orderType = <string>yargs['type'] || 'sell';
        //             if (!item) {
        //                 resolve(`Item ${yargs['item']} not found in EVE universe`);
        //                 return;
        //             }
        //             if (!station) {
        //                 resolve(`Station ${yargs['from']} not found in EVE universe`);
        //                 return;
        //             }
        //             priceService.getPriceForItemOnStation(item.id, station.regionID, station.stationID, orderType)
        //                 .then(res => {
        //                     resolve(`${res.volume_remain} ${item.name} ${res.volume_remain === 1 ? 'is' : 'are'} available for ${orderType} at ${station.stationName} for **${formatCurrency(res.price)} ISK**`);
        //                 })
        //                 .catch(err => {
        //                     if (err && err.code === 404) {
        //                         resolve(`No items named "${item.name}" has been found on ${station.stationName}`);
        //                         return;
        //                     }
        //                     reject(err);
        //                 });
        //         })
        //         .catch(err => {
        //             reject(err);
        //         });
    });
}
exports.getPriceResolver = getPriceResolver;
