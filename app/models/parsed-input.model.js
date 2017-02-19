"use strict";
var ParsedInput = (function () {
    function ParsedInput() {
        this.params = [];
    }
    ParsedInput.prototype.get = function (key) {
        if (!this.has(key)) {
            return null;
        }
        return this.params.filter(function (p) { return p.key === key; })[0];
    };
    ParsedInput.prototype.has = function (key) {
        return this.params.findIndex(function (p) { return p.key === key; }) !== -1;
    };
    return ParsedInput;
}());
exports.ParsedInput = ParsedInput;
