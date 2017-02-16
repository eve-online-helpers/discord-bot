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
var InputParam = (function () {
    function InputParam(key, value) {
        this.key = key;
        this.value = value;
    }
    return InputParam;
}());
exports.InputParam = InputParam;
function parseInput(input) {
    if (!input.startsWith('!')) {
        return null;
    }
    var result = new ParsedInput();
    var parts = input.split('!').filter(function (el) { return el.length !== 0; });
    for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
        var part = parts_1[_i];
        var param = new InputParam();
        var innerParts = part.split(' ');
        param.key = innerParts.splice(0, 1)[0];
        param.value = innerParts.join(' ');
        result.params.push(param);
    }
    return result;
}
exports.parseInput = parseInput;
