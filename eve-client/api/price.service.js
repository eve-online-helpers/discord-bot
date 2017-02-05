"use strict";
var Bluebird = require("bluebird");
var _ = require("lodash");
var axios = require("axios");
var PRICE_ENDPOINT = 'https://esi.tech.ccp.is/latest/markets/{regionId}/orders/?type_id={itemId}&order_type={orderType}';
var OrderType = (function () {
    function OrderType() {
    }
    return OrderType;
}());
OrderType.BUY = 'buy';
OrderType.SELL = 'sell';
exports.OrderType = OrderType;
function getPriceForItemOnStation(itemId, regionId, stationId, orderType) {
    return new Bluebird(function (resolve, reject) {
        axios.get(PRICE_ENDPOINT.replace('{regionId}', regionId.toString()).replace('{itemId}', itemId.toString()).replace('{orderType}', orderType))
            .then(function (result) {
            if (result.data.length === 0) {
                reject({ code: 404 });
                return;
            }
            var relevantOrder;
            if (orderType === OrderType.BUY) {
                relevantOrder = _.maxBy(_.filter(result.data, function (order) {
                    return order.location_id === stationId;
                }), function (record) { return record.price; });
            }
            else if (orderType === OrderType.SELL) {
                relevantOrder = _.minBy(_.filter(result.data, function (order) {
                    return order.location_id === stationId;
                }), function (record) { return record.price; });
            }
            resolve(relevantOrder);
        })
            .catch(function (err) {
            console.error(err);
            reject(err);
        });
    });
}
exports.getPriceForItemOnStation = getPriceForItemOnStation;
//# sourceMappingURL=price.service.js.map