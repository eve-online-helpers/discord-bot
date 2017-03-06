import 'reflect-metadata';
import * as Bluebird from 'bluebird';
import * as priceService from '../eve-client/api/price.service';

import { inject, injectable } from 'inversify';
import { ParsedInput } from '../models/parsed-input.model';
import { IPersistance } from '../persistance/i-persistance';
import { StationDBResponse } from '../models/station-db-response';
import { ItemDBResponse } from '../models/item-db-response.model';
import { formatCurrency } from '../formatters/currency-formatter';
import { StringError } from '../models/string-error';
import { IResolvable } from './i-resolvable';
import { TYPES } from '../configurations/inversify.types';

// TODO: move PriceResponse to models!
import { PriceResponse, PriceServiceResponse } from '../eve-client/api/price.service';

@injectable()
export class PriceResolver implements IResolvable {
    constructor( @inject(TYPES.Perisistance) private persistance: IPersistance) {
    }

    resolveMessage(input: ParsedInput): Bluebird<string> {
        const persistance = this.persistance;
        return new Bluebird<string>((resolve, reject) => {
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
                return reject(new StringError('item name is mandatory'));
            }
            if (item.length < 3) {
                return reject(new StringError(`Item name should be at least 3 chatacter long, \`${item}\` is too short.`));
            }

            const ops = [];
            ops.push(persistance.getItemsByName(item));
            ops.push(persistance.getStationByName(stationParam ? stationParam.key : 'jita'));

            Promise.all(ops)
                .then(res => {
                    const items = <ItemDBResponse[]>res[0];
                    const station = <StationDBResponse>res[1];

                    if (items.length === 0) {
                        reject(new StringError(`No items found that match search criteria (${item})`));
                        return;
                    }

                    if (items.length > 20) {
                        // TODO: beutify response
                        reject(new StringError(`Search returned too many items (${items.length}), please refine your search and try again! (max of 20 items display is available)`));
                        return;
                    }

                    let pricesInspections: Bluebird<Bluebird.Inspection<PriceServiceResponse>>[] = [];
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
                                    discordResponse += `sell: ${priceResult.sell.volume_remain} items for **${formatCurrency(priceResult.sell.price, 2)} ISK**\n`;
                                }
                                if (priceResult.buy) {
                                    discordResponse += `buy: ${priceResult.buy.volume_remain} items for **${formatCurrency(priceResult.buy.price, 2)} ISK**\n`;
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
}