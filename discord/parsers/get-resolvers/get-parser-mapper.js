"use strict";
var parser_1 = require("../parser");
var get_price_resolver_1 = require("./price-resolver/get-price-resolver");
exports.getParser = new parser_1.Parser('get', false);
exports.getParser.addParser('price', get_price_resolver_1.getPriceParser);
//# sourceMappingURL=get-parser-mapper.js.map