"use strict";
var inversify_1 = require("inversify");
var persistance_1 = require("../persistance/persistance");
var get_price_resolver_1 = require("../resolvers/get-price.resolver");
var inversify_types_1 = require("./inversify.types");
exports.container = new inversify_1.Container();
exports.container.bind(inversify_types_1.TYPES.Perisistance).toConstantValue(new persistance_1.Persistance());
exports.container.bind(inversify_types_1.TYPES.PriceResolver).to(get_price_resolver_1.PriceResolver);
