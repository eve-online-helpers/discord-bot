"use strict";
var Bluebird = require("bluebird");
var priceService = require("../eve-client/api/price.service");
var persistance_1 = require("../persistance");
var currency_formatter_1 = require("../formatters/currency-formatter");
function getPriceResolver(yargs) {
    return new Bluebird(function (resolve, reject) {
        if (yargs['help']) {
            resolve('Get Price usage: `get price --item "<item name>" --from "<jita|amarr|hek|dodixie|rens|(another station name)>" --type "<buy|sell>"`\n\n' +
                '__Defaults (default values for parameters)__\n' +
                '```' +
                '--from: "Jita"\n' +
                '--type: "sell"' +
                '```');
            return;
        }
        if (!yargs['item'] || yargs['item'] === '') {
            reject('`--item` parameter is mandatory');
        }
        var ops = [];
        ops.push(persistance_1.getItemByName(yargs['item']));
        ops.push(persistance_1.getStationByName(yargs['from'] || 'jita'));
        Promise.all(ops)
            .then(function (res) {
            var item = res[0];
            var station = res[1];
            var orderType = yargs['type'] || 'sell';
            priceService.getPriceForItemOnStation(item.id, station.regionID, station.stationID, orderType)
                .then(function (res) {
                resolve(res.volume_remain + " " + item.name + " " + (res.volume_remain === 1 ? 'is' : 'are') + " available for " + orderType + " at " + station.stationName + " for **" + currency_formatter_1.formatCurrency(res.price) + " ISK**");
            })
                .catch(function (err) {
                reject(err);
            });
        })
            .catch(function (err) {
            reject(err);
        });
    });
}
exports.getPriceResolver = getPriceResolver;
//# sourceMappingURL=get-price.resolver.js.map