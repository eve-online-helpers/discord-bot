"use strict";
var Bluebird = require("bluebird");
var parser_1 = require("../parser");
exports.helpParser = new parser_1.Parser('help', true, function (messageParts) {
    return Bluebird.resolve('Hello, \nI\'m EVE helper bot. I can do nany things and I\'m learning to do new things every day.\n' +
        'You can activate the following commands with the `help` word to get additional info on what they do\n\n' +
        '```help:          This help message\n' +
        'get price:     Get price of specific item, write `get prices help` for more info\n```');
});
//# sourceMappingURL=help-parser-resolver.js.map