"use strict";
var _ = require("lodash");
var Bluebird = require("bluebird");
var mapper = require("../../../../eve-client/api/id-names-mapper");
var priceService = require("../../../../eve-client/api/price.service");
var searchService = require("../../../../eve-client/api/search.service");
var parser_1 = require("../../parser");
var message_parser_1 = require("../../../parsers/message-parser");
exports.getPriceParser = new parser_1.Parser('get', true, function (parsedLevel, messageParts) {
    if (messageParts.parts[parsedLevel].content === 'help' && messageParts.parts[parsedLevel].type === message_parser_1.PartType.COMMAND) {
        return Bluebird.resolve('usage:\n```get price "<item full or partial name>" from "<jita|amarr|rens|dodixie|hek>" type "<buy|sell>"```\nthis will return the min buy price or the max sell price.' +
            ' If partial name was supplied a list of full names will be returnes and new query must be created to get result. `Item name`, `system name` and `type` should be enclosed with quotes ""');
    }
    return new Bluebird(function (resolve, reject) {
        if (messageParts.parts[parsedLevel].type === message_parser_1.PartType.COMMAND) {
            reject("Error: " + messageParts.parts[parsedLevel].content + " is not a valid command. Please ensure it is enclosed with quotes \"\"");
        }
        var searchString = messageParts.parts[parsedLevel].content;
        var isStrict = false;
        if (searchString[searchString.length - 1] === '!') {
            searchString = searchString.substr(0, searchString.length - 1);
            isStrict = true;
        }
        searchService.resolveStringToNames(searchString, isStrict)
            .then(function (results) {
            if (results.length === 1) {
                var from = message_parser_1.getInputForCommand('from', messageParts);
                var type_1 = message_parser_1.getInputForCommand('type', messageParts);
                if (!mapper.tradeHubsIds.has(from)) {
                    reject("No trade hub by name `" + from + "` exit");
                    return;
                }
                //only one items has been chosen, getting prices
                var hub_1 = mapper.tradeHubsIds.get(from);
                priceService.getPriceForItemOnStation(results[0].id, hub_1, type_1)
                    .then(function (price) {
                    var response;
                    if (type_1 === priceService.OrderType.SELL) {
                        response = "Minimum sell price at " + hub_1.hubPrettyName + " for " + results[0].name + " is " + price.price + " ISK";
                    }
                    else {
                        response = "Maximum buy price at " + hub_1.hubPrettyName + " for " + results[0].name + " is " + price.price + " ISK";
                    }
                    resolve(response);
                })
                    .catch(function (err) {
                    reject(err);
                });
                return;
            }
            var mutipleItemsResponse = '__There are multiple items available for your request, please choose one and re-run request, if this is the exact name please add "!" at the end__\n\n';
            _.forEach(results, function (result) {
                mutipleItemsResponse += result.name + "\n";
            });
            resolve(mutipleItemsResponse);
        })
            .catch(function (err) {
            reject(err);
        });
    });
});
//# sourceMappingURL=get-price-resolver.js.map