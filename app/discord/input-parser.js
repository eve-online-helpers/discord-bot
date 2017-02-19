"use strict";
var input_param_model_1 = require("../models/input-param.model");
var parsed_input_model_1 = require("../models/parsed-input.model");
function parseInput(input) {
    if (!input.startsWith('!')) {
        return null;
    }
    var result = new parsed_input_model_1.ParsedInput();
    var parts = input.split('!').filter(function (el) { return el.length !== 0; });
    for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
        var part = parts_1[_i];
        var param = new input_param_model_1.InputParam();
        var innerParts = part.split(' ');
        param.key = innerParts.splice(0, 1)[0];
        param.value = innerParts.join(' ');
        result.params.push(param);
    }
    return result;
}
exports.parseInput = parseInput;
