"use strict";
var memotyCache = require("memory-cache");
var moment = require("moment");
var Bluebird = require("bluebird");
var _ = require("lodash");
var axios = require("axios");
var PRICE_ENDPOINT = 'https://esi.tech.ccp.is/latest/markets/{regionId}/orders/?type_id={itemId}';
var PriceServiceResponse = (function () {
    function PriceServiceResponse() {
    }
    return PriceServiceResponse;
}());
exports.PriceServiceResponse = PriceServiceResponse;
function getPriceForItemOnStation(itemId, regionId, stationId) {
    var priceSearchKey = '' + itemId + regionId;
    var pricesOrError = memotyCache.get(priceSearchKey);
    if (pricesOrError) {
        console.info("price for " + priceSearchKey + " has been found in cache, skipping CCP call");
        if (pricesOrError.code && pricesOrError.code === 404) {
            return Bluebird.reject(pricesOrError);
        }
        return Bluebird.resolve(filterPrices(pricesOrError, stationId));
    }
    console.info("price for " + priceSearchKey + " not found in cache, executing CCP call");
    return new Bluebird(function (resolve, reject) {
        axios.get(PRICE_ENDPOINT.replace('{regionId}', regionId.toString()).replace('{itemId}', itemId.toString()))
            .then(function (result) {
            var expires = moment(result.headers['expires'] + '+0000', 'ddd, DD MMM YYYY HH:mm:ss Z');
            var diff = expires.diff(moment());
            if (result.data.length === 0) {
                memotyCache.put(priceSearchKey, { code: 404 }, diff);
                reject({ code: 404 });
                return;
            }
            memotyCache.put(priceSearchKey, result.data, diff);
            console.info("cache key " + priceSearchKey + " has been added with " + (diff / 1000).toFixed(0) + "s TTL");
            resolve(filterPrices(result.data, stationId));
        })
            .catch(function (err) {
            console.error(err);
            reject(err);
        });
    });
}
exports.getPriceForItemOnStation = getPriceForItemOnStation;
function filterPrices(prices, stationId) {
    var result = new PriceServiceResponse();
    result.buy = _.maxBy(_.filter(prices, function (order) {
        return order.location_id === stationId && order.is_buy_order;
    }), function (record) { return record.price; }) || prices[0];
    result.sell = _.minBy(_.filter(prices, function (order) {
        return order.location_id === stationId && !order.is_buy_order;
    }), function (record) { return record.price; }) || prices[0];
    return result;
}
