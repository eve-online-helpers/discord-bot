import * as memotyCache from 'memory-cache';
import * as moment from 'moment';
import * as Bluebird from 'bluebird';
import * as _ from 'lodash';
import * as axios from 'axios';
import { HubData } from '../../eve-client/api/id-names-mapper';

const PRICE_ENDPOINT = 'https://esi.tech.ccp.is/latest/markets/{regionId}/orders/?type_id={itemId}&order_type={orderType}';

export class OrderType {
    static BUY = 'buy';
    static SELL = 'sell';
}

export function getPriceForItemOnStation(itemId: number, regionId: number, stationId: number, orderType: string) {
    let priceSearchKey ='' + itemId + regionId + orderType;
    let prices: PriceResponse[] = memotyCache.get(priceSearchKey);
    if (prices) {
        console.info(`price for ${priceSearchKey} has been found in cache, skipping CCP call`);
        return Bluebird.resolve(filterPrices(prices, stationId, orderType));
    }
    console.info(`price for ${priceSearchKey} not found in cache, executing CCP call`);

    return new Bluebird<PriceResponse>((resolve, reject) => {
        axios.get<PriceResponse[]>(PRICE_ENDPOINT.replace('{regionId}', regionId.toString()).replace('{itemId}', itemId.toString()).replace('{orderType}', orderType))
            .then(result => {
                let expires= moment(result.headers['expires']+ '+0000', 'ddd, DD MMM YYYY HH:mm:ss Z');
                let diff = expires.diff(moment());
                memotyCache.put(priceSearchKey, result.data, diff)
                console.info(`cache key ${priceSearchKey} has been added with ${(diff/1000).toFixed(0)}s TTL`);
                if (result.data.length === 0) {
                    reject({ code: 404 });
                    return;
                }
                let relevantOrder: PriceResponse;
                if (orderType === OrderType.BUY) {
                    relevantOrder = _.maxBy(_.filter(result.data, (order) => {
                        return order.location_id === stationId;
                    }), record => record.price);
                } else if (orderType === OrderType.SELL) {
                    relevantOrder = _.minBy(_.filter(result.data, (order) => {
                        return order.location_id === stationId;
                    }), record => record.price);
                }
                resolve(relevantOrder);
            })
            .catch(err => {
                console.error(err);
                reject(err);
            });
    });
}

function filterPrices(prices: PriceResponse[], stationId: number, orderType: string): PriceResponse {
    let relevantOrder: PriceResponse;
    if (orderType === OrderType.BUY) {
        relevantOrder = _.maxBy(_.filter(prices, (order) => {
            return order.location_id === stationId;
        }), record => record.price);
    } else if (orderType === OrderType.SELL) {
        relevantOrder = _.minBy(_.filter(prices, (order) => {
            return order.location_id === stationId;
        }), record => record.price);
    }

    return relevantOrder;
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