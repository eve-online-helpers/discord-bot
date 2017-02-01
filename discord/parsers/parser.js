"use strict";
var Bluebird = require("bluebird");
var Parser = (function () {
    function Parser(name, isLowerLevelParser, _resolveMessage) {
        this.name = name;
        this.isLowerLevelParser = isLowerLevelParser;
        this._resolveMessage = _resolveMessage;
        this._subParsers = {};
    }
    Parser.prototype.addParser = function (name, parser) {
        this._subParsers[name] = parser;
    };
    Parser.prototype.removeParser = function (name) {
        this._subParsers[name] = undefined;
    };
    Parser.prototype.resolveSubParser = function (parsedLevel, parsedMessage) {
        if (this.isLowerLevelParser) {
            return Bluebird.reject('lower level parsers cannot have subParsers, try to resolveMessage');
        }
        parsedMessage.parts[parsedLevel].type;
        var subParser = this._subParsers[parsedMessage.parts[parsedLevel].content];
        if (!subParser) {
            return Bluebird.reject("parser " + parsedMessage.parts[parsedLevel].content + " not found");
        }
        if (subParser.isLowerLevelParser) {
            return subParser._resolveMessage(parsedLevel + 1, parsedMessage);
        }
        return subParser.resolveSubParser(parsedLevel + 1, parsedMessage);
    };
    return Parser;
}());
exports.Parser = Parser;
//# sourceMappingURL=parser.js.map