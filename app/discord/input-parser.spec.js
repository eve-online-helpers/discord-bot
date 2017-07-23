"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const input_parser_1 = require("./input-parser");
describe('imput parser tests', () => {
    it('shoud return null if string not starts with !', () => {
        chai_1.expect(input_parser_1.parseInput('aaa')).to.be.null;
    });
    it('should return object with command and no parameters for for the input "!p"', () => {
        let result = input_parser_1.parseInput('!p');
        chai_1.expect(result.params.length).to.be.equal(1);
        chai_1.expect(result.params[0].key).to.be.equal('p');
    });
    it('should return object with command and and multi word value parameter for the input "!p rifter blueprint"', () => {
        let result = input_parser_1.parseInput('!p rifter blueprint');
        chai_1.expect(result.params[0].key).to.be.equal('p');
        chai_1.expect(result.params[0].value).to.be.equal('rifter blueprint');
    });
    it('should return true for existing item', () => {
        let result = input_parser_1.parseInput('!p');
        chai_1.expect(result.has('p')).to.be.true;
    });
    it('should return false for non existing item', () => {
        let result = input_parser_1.parseInput('!p');
        chai_1.expect(result.has('a')).to.be.false;
    });
    it('should return InputParam with key "p"', () => {
        let result = input_parser_1.parseInput('!p');
        chai_1.expect(result.get('p').key).to.be.equal('p');
    });
    it('should return null for non existing key', () => {
        let result = input_parser_1.parseInput('!p');
        chai_1.expect(result.get('a')).to.be.null;
    });
    it('should parse input correctly with a lot of spaces', () => {
        let result = input_parser_1.parseInput('   !p  some input         !help   ');
        chai_1.expect(result.has('p')).to.be.true;
        chai_1.expect(result.has('help')).to.be.true;
    });
    it('should parse input correctly with a lot of spaces and trim the value', () => {
        let result = input_parser_1.parseInput('   !p  some input         !help   ');
        chai_1.expect(result.has('p')).to.be.true;
        chai_1.expect(result.get('p').value).to.be.equal('some input');
    });
});
