import * as Bluebird from 'bluebird';
import * as priceService from '../eve-client/api/price.service';

import { ParsedInput } from '../models/parsed-input.model';
import { getItemsByName, getStationByName } from '../persistance';
import { StationDBResponse } from '../models/station-db-response';
import { ItemDBResponse } from '../models/item-db-response.model';
import { formatCurrency } from '../formatters/currency-formatter';
import { StringError } from '../models/string-error';
// TODO: move PriceResponse to models!
import { PriceResponse, PriceServiceResponse } from '../eve-client/api/price.service';

export function getPriceResolver(input: ParsedInput): Bluebird<string> {
    return new Bluebird<string>((resolve, reject) => {
        if (input.has('help')) {
            resolve('\n\ngp usage: `!gp <item name> <!jita !amarr !hek !dodixie !rens|>`\n\n' +
                '__Defaults (default values for parameters)__\n' +
                '```' +
                'locations defaults to: !jita\n' +
                '```');
            return;
        }

        let item = input.get('gp').value;
        let station = input.getFirst(['jita', 'amarr', 'hek', 'dodixie']);
        if (!item) {
            reject(new StringError('item name is mandatory'));
        }
        if (item.length < 3) {
            reject(new StringError(`item name should be at least 3 chatacter long, "${item}" is too short.`));
        }

        const ops = [];
        ops.push(getItemsByName(item));
        ops.push(getStationByName(station ? station.key : 'jita'));

        Promise.all(ops)
            .then(res => {
                const items = <ItemDBResponse[]>res[0];
                const station = <StationDBResponse>res[1];

                if (items.length > 10) {
                    // TODO: beutify response
                    reject(new StringError(`Too many items!`));
                    return;
                }

                let pricesInspections: Bluebird<Bluebird.Inspection<PriceServiceResponse>>[] = [];
                for (let item of items) {
                    pricesInspections.push(priceService.getPriceForItemOnStation(item.id, station.regionID, station.stationID).reflect());
                }
                Promise.all(pricesInspections)
                    .then(priceResultsInspections => {
                        let discordResponse = '';
                        for (let i = 0; i < priceResultsInspections.length; i++) {
                            if (priceResultsInspections[i].isRejected()) {
                                console.log(`item not found: ${items[i].name}`);
                                continue;
                            }
                            let priceResult = priceResultsInspections[i].value();
                            discordResponse += `${items[i].name} ==> sell: ${priceResult.sell.volume_remain} items for ${formatCurrency(priceResult.sell.price)} ISK, buy: ${priceResult.buy.volume_remain} items for ${formatCurrency(priceResult.buy.price)} ISK`;
                            discordResponse += '\n';
                        }

                        resolve(discordResponse);
                    })
                    .catch(err => {
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