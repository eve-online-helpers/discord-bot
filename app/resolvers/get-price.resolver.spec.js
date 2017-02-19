"use strict";
var get_price_resolver_1 = require("./get-price.resolver");
var input_param_model_1 = require("../models/input-param.model");
var parsed_input_model_1 = require("../models/parsed-input.model");
var chai_1 = require("chai");
describe('getPriceResolver', function () {
    it('should return help message for !gp !help input', function (done) {
        var input = new parsed_input_model_1.ParsedInput();
        input.params.push(new input_param_model_1.InputParam('gp'));
        input.params.push(new input_param_model_1.InputParam('help'));
        get_price_resolver_1.getPriceResolver(input)
            .then(function (res) {
            chai_1.expect(res).to.be.equal('\n\ngp usage: `!gp <item name> <!jita !amarr !hek !dodixie !rens|>`\n\n' +
                '__Defaults (default values for parameters)__\n' +
                '```' +
                'locations defaults to: !jita\n' +
                '```');
            done();
        })
            .catch(function (err) {
            done(err);
        });
    });
});
