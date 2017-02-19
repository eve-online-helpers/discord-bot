"use strict";
var Bluebird = require("bluebird");
var string_error_1 = require("../models/string-error");
function getPriceResolver(input) {
    return new Bluebird(function (resolve, reject) {
        if (input.has('help')) {
            resolve('\n\ngp usage: `!gp <item name> <!jita !amarr !hek !dodixie !rens|>`\n\n' +
                '__Defaults (default values for parameters)__\n' +
                '```' +
                'locations defaults to: !jita\n' +
                '```');
            return;
        }
        var item = (input.get('gp')).value;
        if (!item) {
            reject(new string_error_1.StringError('item name is mandatory'));
        }
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
