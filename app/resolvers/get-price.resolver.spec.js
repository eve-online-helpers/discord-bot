"use strict";
var get_price_resolver_1 = require("./get-price.resolver");
var input_param_model_1 = require("../models/input-param.model");
var parsed_input_model_1 = require("../models/parsed-input.model");
var chai_1 = require("chai");
describe('getPriceResolver', function () {
    before(function () {
    });
    after(function () {
    });
    it('should return help message for !p!help input', function (done) {
        var input = new parsed_input_model_1.ParsedInput();
        input.params.push(new input_param_model_1.InputParam('p'));
        input.params.push(new input_param_model_1.InputParam('help'));
        get_price_resolver_1.getPriceResolver(input)
            .then(function (res) {
            chai_1.expect(res.includes('price usage')).to.be.true;
            done();
        })
            .catch(function (err) {
            done(err);
        });
    });
    it('should return `item name is mandatory` error if no items has been sent', function (done) {
        var input = new parsed_input_model_1.ParsedInput();
        input.params.push(new input_param_model_1.InputParam('p'));
        get_price_resolver_1.getPriceResolver(input)
            .then(function (res) {
            done(new Error('test failed'));
        })
            .catch(function (err) {
            chai_1.expect(err.message.includes('item name is mandatory')).to.be.true;
            done();
        });
    });
    it('should return error if item string is less than 3 characters', function (done) {
        var input = new parsed_input_model_1.ParsedInput();
        input.params.push(new input_param_model_1.InputParam('p', '11'));
        get_price_resolver_1.getPriceResolver(input)
            .then(function (res) {
            done(new Error('test failed'));
        })
            .catch(function (err) {
            chai_1.expect(err.message.includes('least 3 chatacter long')).to.be.true;
            done();
        });
    });
    // it('should return error if no items were found that match search', (done) => {
    //     let input = new ParsedInput();
    //     input.params.push(new InputParam('p', 'UNKNOWN_ITEM'));
    //     getPriceResolver(input)
    //         .then((res) => {
    //             done(new Error('test failed'));
    //         })
    //         .catch(err => {
    //             ex(err.message.includes('least 3 chatacter long')).to.be.true;
    //             done();
    //         });
    // });
});
