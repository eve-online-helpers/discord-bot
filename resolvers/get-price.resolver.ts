import * as Bluebird from 'bluebird';
import * as priceService from '../eve-client/api/price.service';

import { YargsResult } from '../models/yargs-result.model';
import { getItemByName, getStationByName } from '../persistance';
import { StationDBResponse } from '../models/station-db-response';
import { ItemDBResponse } from '../models/item-db-response.model';
import { formatCurrency } from '../formatters/currency-formatter';

export function getPriceResolver(yargs: YargsResult) {
    return new Bluebird<string>((resolve, reject) => {
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
            reject('`--item` parameter is mandatory')
        }

        const ops = [];
        ops.push(getItemByName(<string>yargs['item']));
        ops.push(getStationByName(<string>yargs['from'] || 'jita'));

        Promise.all(ops)
            .then(res => {
                const item = <ItemDBResponse>res[0];
                const station = <StationDBResponse>res[1];
                const orderType = <string>yargs['type'] || 'sell';

                priceService.getPriceForItemOnStation(item.id, station.regionID, station.stationID, orderType)
                    .then(res => {
                        resolve(`${res.volume_remain} ${item.name} ${res.volume_remain === 1 ? 'is' : 'are'} available for ${orderType} at ${station.stationName} for **${formatCurrency(res.price)} ISK**`)
                    })
                    .catch(err => {
                        reject(err);
                    });
            })
            .catch(err => {
                reject(err);
            });
    });
}