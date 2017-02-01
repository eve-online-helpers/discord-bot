"use strict";
var parser_1 = require("./parser");
var help_parser_resolver_1 = require("./help-resolvers/help-parser-resolver");
var get_parser_mapper_1 = require("./get-resolvers/get-parser-mapper");
exports.topParser = new parser_1.Parser('top', false);
exports.topParser.addParser('help', help_parser_resolver_1.helpParser);
exports.topParser.addParser('get', get_parser_mapper_1.getParser);
//# sourceMappingURL=top-parser.js.map