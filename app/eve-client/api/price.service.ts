import * as memotyCache from 'memory-cache';
import * as moment from 'moment';
import * as Bluebird from 'bluebird';
import * as _ from 'lodash';
import axios from 'axios';
import { HubData } from '../../eve-client/api/id-names-mapper';

const PRICE_ENDPOINT = 'https://esi.tech.ccp.is/latest/markets/{regionId}/orders/?type_id={itemId}';
export class PriceServiceResponse {
    sell: PriceResponse;
    buy: PriceResponse;
}

export function getPriceForItemOnStation(itemId: number, regionId: number, stationId: number) {
    let priceSearchKey = '' + itemId + regionId;
    let pricesOrError: PriceResponse[] & { code: number } = memotyCache.get(priceSearchKey);

    if (pricesOrError) {
        console.info(`price for ${priceSearchKey} has been found in cache, skipping CCP call`);
        if (pricesOrError.code && pricesOrError.code === 404) {
            return Bluebird.reject(pricesOrError);
        }

        return Bluebird.resolve(filterPrices(pricesOrError, stationId));
    }
    console.info(`price for ${priceSearchKey} not found in cache, executing CCP call`);

    return new Bluebird<PriceServiceResponse>((resolve, reject) => {
        axios.get(PRICE_ENDPOINT.replace('{regionId}', regionId.toString()).replace('{itemId}', itemId.toString()))
            .then(result => {
                let expires = moment(result.headers['expires'] + '+0000', 'ddd, DD MMM YYYY HH:mm:ss Z');
                let diff = expires.diff(moment());
                if (result.data.length === 0) {
                    memotyCache.put(priceSearchKey, { code: 404 }, diff);
                    reject({ code: 404 });
                    return;
                }
                memotyCache.put(priceSearchKey, result.data, diff);
                console.info(`cache key ${priceSearchKey} has been added with ${(diff / 1000).toFixed(0)}s TTL`);

                resolve(filterPrices(result.data, stationId));
            })
            .catch(err => {
                console.error(err);
                reject(err);
            });
    });
}

function filterPrices(prices: PriceResponse[], stationId: number): PriceServiceResponse {
    let result = new PriceServiceResponse();
    result.buy = _.maxBy(_.filter(prices, (order) => {
        return order.location_id === stationId && order.is_buy_order;
    }), record => record.price) || prices[0];
    result.sell = _.minBy(_.filter(prices, (order) => {
        return order.location_id === stationId && !order.is_buy_order;
    }), record => record.price) || prices[0];

    return result;
}

export interface PriceResponse {
    order_id: number;
    type_id: number;
    location_id: number;
    volume_total: number;
    volume_remain: number;
    min_volume: number;
    price: number;
    is_buy_order: number;
    duration: number;
    issued: string;
    range: string;
}