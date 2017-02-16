import { expect } from 'chai';
import { parseInput } from './input-parser';

describe('imput parser tests', () => {
    it('shoud return null if string not starts with !', () => {
        expect(parseInput('aaa')).to.be.null;
    });

    it('should return object with command and no parameters for for the input "!p"', () => {
        let result = parseInput('!p');
        expect(result.params.length).to.be.equal(1);
        expect(result.params[0].key).to.be.equal('p')
    });

    it('should return object with command and and multi word value parameter for the input "!p rifter blueprint"', () => {
        let result = parseInput('!p rifter blueprint');
        expect(result.params[0].key).to.be.equal('p');
        expect(result.params[0].value).to.be.equal('rifter blueprint');
    });

    it('should return true for existing item', ()=>{
        let result = parseInput('!p');
        expect(result.has('p')).to.be.true;
    });

    it('should return false for non existing item', ()=>{
        let result = parseInput('!p');
        expect(result.has('a')).to.be.false;
    });

    it('should return InputParam with key "p"', ()=>{
        let result = parseInput('!p');
        expect(result.get('p').key).to.be.equal('p');
    });

    it('should return null for non existing key', ()=>{
        let result = parseInput('!p');
        expect(result.get('a')).to.be.null;
    });
});