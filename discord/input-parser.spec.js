"use strict";
var chai_1 = require("chai");
var input_parser_1 = require("./input-parser");
describe('imput parser tests', function () {
    it('shoud return null if string not starts with !', function () {
        chai_1.expect(input_parser_1.parseInput('aaa')).to.be.null;
    });
    it('should return object with command and no parameters for for the input "!p"', function () {
        var result = input_parser_1.parseInput('!p');
        chai_1.expect(result.params.length).to.be.equal(1);
        chai_1.expect(result.params[0].key).to.be.equal('p');
    });
    it('should return object with command and and multi word value parameter for the input "!p rifter blueprint"', function () {
        var result = input_parser_1.parseInput('!p rifter blueprint');
        chai_1.expect(result.params[0].key).to.be.equal('p');
        chai_1.expect(result.params[0].value).to.be.equal('rifter blueprint');
    });
});
