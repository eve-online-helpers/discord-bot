"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const memotyCache = require("memory-cache");
const moment = require("moment");
const Bluebird = require("bluebird");
const _ = require("lodash");
const axios_1 = require("axios");
const PRICE_ENDPOINT = 'https://esi.tech.ccp.is/latest/markets/{regionId}/orders/?type_id={itemId}';
class PriceServiceResponse {
}
exports.PriceServiceResponse = PriceServiceResponse;
function getPriceForItemOnStation(itemId, regionId, stationId) {
    let priceSearchKey = '' + itemId + regionId;
    let pricesOrError = memotyCache.get(priceSearchKey);
    if (pricesOrError) {
        console.info(`price for ${priceSearchKey} has been found in cache, skipping CCP call`);
        if (pricesOrError.code && pricesOrError.code === 404) {
            return Bluebird.reject(pricesOrError);
        }
        return Bluebird.resolve(filterPrices(pricesOrError, stationId));
    }
    console.info(`price for ${priceSearchKey} not found in cache, executing CCP call`);
    return new Bluebird((resolve, reject) => {
        axios_1.default.get(PRICE_ENDPOINT.replace('{regionId}', regionId.toString()).replace('{itemId}', itemId.toString()))
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
exports.getPriceForItemOnStation = getPriceForItemOnStation;
function filterPrices(prices, stationId) {
    let result = new PriceServiceResponse();
    result.buy = _.maxBy(_.filter(prices, (order) => {
        return order.location_id === stationId && order.is_buy_order;
    }), record => record.price) || prices[0];
    result.sell = _.minBy(_.filter(prices, (order) => {
        return order.location_id === stationId && !order.is_buy_order;
    }), record => record.price) || prices[0];
    return result;
}
//# sourceMappingURL=price.service.js.map