import * as _ from 'lodash';
import * as Bluebird from 'bluebird';
import * as mapper from '../../../../eve-client/api/id-names-mapper';
import * as priceService from '../../../../eve-client/api/price.service';
import * as searchService from '../../../../eve-client/api/search.service';

import { Parser } from '../../parser';
import { PartType, getInputForCommand } from '../../../parsers/message-parser';
import { formatCurrency } from '../../../../formatters/currency-formatter';


export const getPriceParser = new Parser('get', true, (parsedLevel, messageParts) => {
    if (messageParts.parts[parsedLevel].content === 'help' && messageParts.parts[parsedLevel].type === PartType.COMMAND) {
        return Bluebird.resolve('usage:\n```get price "<item full or partial name>" from "<jita|amarr|rens|dodixie|hek>" type "<buy|sell>"```\nthis will return the min buy price or the max sell price.' +
            ' If partial name was supplied a list of full names will be returnes and new query must be created to get result. `Item name`, `system name` and `type` should be enclosed with quotes ""');
    }

    return new Bluebird<string>((resolve, reject) => {
        if (messageParts.parts[parsedLevel].type === PartType.COMMAND) {
            reject(`Error: ${messageParts.parts[parsedLevel].content} is not a valid command. Please ensure it is enclosed with quotes ""`);
        }

        let searchString = messageParts.parts[parsedLevel].content;
        let isStrict = false
        if (searchString[searchString.length - 1] === '!') {
            searchString = searchString.substr(0, searchString.length - 1);
            isStrict = true;
        }
        searchService.resolveStringToNames(searchString, isStrict)
            .then(results => {
                if (results.length === 1) {
                    const from = getInputForCommand('from', messageParts);
                    const type = getInputForCommand('type', messageParts);

                    if (!mapper.tradeHubsIds.has(from)) {
                        reject(`No trade hub by name \`${from}\` exit`);
                        return;
                    }
                    //only one items has been chosen, getting prices
                    const hub = mapper.tradeHubsIds.get(from);
                    priceService.getPriceForItemOnStation(results[0].id, hub, type)
                        .then(price => {
                            let response: string;
                            if (type === priceService.OrderType.SELL) {
                                response = `Minimum sell price at ${hub.hubPrettyName} for ${results[0].name} is ${formatCurrency(price.price)} ISK`;
                            } else {
                                response = `Maximum buy price at ${hub.hubPrettyName} for ${results[0].name} is ${formatCurrency(price.price)} ISK`;
                            }

                            resolve(response);
                        })
                        .catch(err => {
                            reject(err)
                        });
                    return;
                }

                let mutipleItemsResponse = '__There are multiple items available for your request, please choose one and re-run request, if this is the exact name please add "!" at the end__\n\n';
                _.forEach(results, (result) => {
                    mutipleItemsResponse += `${result.name}\n`
                });
                resolve(mutipleItemsResponse);
            })
            .catch(err => {
                reject(err);
            });
    });
});