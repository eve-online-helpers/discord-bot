"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_price_resolver_1 = require("./get-price.resolver");
const input_param_model_1 = require("../models/input-param.model");
const parsed_input_model_1 = require("../models/parsed-input.model");
const chai_1 = require("chai");
const persistance_mock_1 = require("../../mocks/persistance.mock");
describe('getPriceResolver', () => {
    let pResolver;
    before(() => {
        pResolver = new get_price_resolver_1.PriceResolver(new persistance_mock_1.PersistanceMock());
    });
    after(() => {
    });
    it('should return help message for !p!help input', (done) => {
        let input = new parsed_input_model_1.ParsedInput();
        input.params.push(new input_param_model_1.InputParam('p'));
        input.params.push(new input_param_model_1.InputParam('help'));
        pResolver.resolveMessage(input)
            .then((res) => {
            chai_1.expect(res.includes('price usage')).to.be.true;
            done();
        })
            .catch(err => {
            done(err);
        });
    });
    it('should return `item name is mandatory` error if no items has been sent', (done) => {
        let input = new parsed_input_model_1.ParsedInput();
        input.params.push(new input_param_model_1.InputParam('p'));
        pResolver.resolveMessage(input)
            .then((res) => {
            done(new Error('test failed'));
        })
            .catch(err => {
            chai_1.expect(err.message.includes('item name is mandatory')).to.be.true;
            done();
        });
    });
    it('should return error if item string is less than 3 characters', (done) => {
        let input = new parsed_input_model_1.ParsedInput();
        input.params.push(new input_param_model_1.InputParam('p', '11'));
        pResolver.resolveMessage(input)
            .then((res) => {
            done(new Error('test failed'));
        })
            .catch(err => {
            chai_1.expect(err.message.includes('least 3 chatacter long')).to.be.true;
            done();
        });
    });
    it('should return error if no items were found that match search', (done) => {
        let input = new parsed_input_model_1.ParsedInput();
        input.params.push(new input_param_model_1.InputParam('p', 'UNKNOWN_ITEM'));
        pResolver.resolveMessage(input)
            .then((res) => {
            done(new Error('test failed'));
        })
            .catch(err => {
            chai_1.expect(err.message.includes('UNKNOWN_ITEM')).to.be.true;
            done();
        });
    });
    it('should return error if more than 20 item results returned from search', (done) => {
        let input = new parsed_input_model_1.ParsedInput();
        input.params.push(new input_param_model_1.InputParam('p', 'MANY_ITEMS'));
        pResolver.resolveMessage(input)
            .then((res) => {
            done(new Error('test failed'));
        })
            .catch(err => {
            chai_1.expect(err.message.includes('21')).to.be.true;
            done();
        });
    });
});
