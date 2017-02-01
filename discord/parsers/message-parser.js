"use strict";
var _ = require("lodash");
var PartType;
(function (PartType) {
    PartType[PartType["COMMAND"] = 0] = "COMMAND";
    PartType[PartType["INPUT"] = 1] = "INPUT";
})(PartType = exports.PartType || (exports.PartType = {}));
var ParsedMessage = (function () {
    function ParsedMessage() {
        this.parts = [];
    }
    return ParsedMessage;
}());
exports.ParsedMessage = ParsedMessage;
var Part = (function () {
    function Part() {
        this.content = '';
    }
    return Part;
}());
function parseMessage(message) {
    var parsedMessage = new ParsedMessage();
    var chars = message.toLowerCase().split('');
    var part = new Part();
    chars.forEach(function (char) {
        if (char === '"') {
            if (!part.type) {
                part.type = PartType.INPUT;
                return;
            }
            part.content = part.content.trim();
            parsedMessage.parts.push(part);
            part = new Part();
            return;
        }
        if (char === ' ' && part.type === PartType.COMMAND) {
            part.content = part.content.trim();
            parsedMessage.parts.push(part);
            part = new Part();
            return;
        }
        part.type = part.type || PartType.COMMAND;
        part.content += char;
    });
    if (part.content !== '') {
        part.content = part.content.trim();
        parsedMessage.parts.push(part);
    }
    return parsedMessage;
}
exports.parseMessage = parseMessage;
function getInputForCommand(command, parsedMessage) {
    var commandPartIndex = _.findIndex(parsedMessage.parts, function (part) { return part.content === command; });
    if (commandPartIndex === parsedMessage.parts.length - 1 || commandPartIndex === -1) {
        return null;
    }
    return parsedMessage.parts[commandPartIndex + 1].content;
}
exports.getInputForCommand = getInputForCommand;
//# sourceMappingURL=message-parser.js.map