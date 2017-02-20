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
    ParsedInput.prototype.getFirst = function (keys) {
        for (var key in keys) {
            if (this.has(key)) {
                return this.get(key);
            }
        }
        return null;
    };
    return ParsedInput;
}());
exports.ParsedInput = ParsedInput;
