"use strict";
const input_param_model_1 = require("../models/input-param.model");
const parsed_input_model_1 = require("../models/parsed-input.model");
function parseInput(input) {
    input = input.trim();
    if (!input.startsWith('!')) {
        return null;
    }
    let result = new parsed_input_model_1.ParsedInput();
    let parts = input.split('!').filter(el => el.length !== 0);
    for (let part of parts) {
        let param = new input_param_model_1.InputParam();
        let innerParts = part.split(' ');
        param.key = innerParts.splice(0, 1)[0];
        param.value = innerParts.join(' ').trim();
        result.params.push(param);
    }
    return result;
}
exports.parseInput = parseInput;
