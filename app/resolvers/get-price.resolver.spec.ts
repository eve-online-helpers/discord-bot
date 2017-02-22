import { getPriceResolver } from './get-price.resolver';
import { InputParam } from '../models/input-param.model';
import { ParsedInput } from '../models/parsed-input.model';
import * as persistance from '../persistance';
import { expect as ex } from 'chai';

describe('getPriceResolver', () => {
    before(() => {
    });

    after(() => {

    });

    it('should return help message for !p!help input', (done) => {
        let input = new ParsedInput();
        input.params.push(new InputParam('p'));
        input.params.push(new InputParam('help'));

        getPriceResolver(input)
            .then((res) => {
                ex(res.includes('price usage')).to.be.true;
                done();
            })
            .catch(err => {
                done(err);
            });
    });

    it('should return `item name is mandatory` error if no items has been sent', (done) => {
        let input = new ParsedInput();
        input.params.push(new InputParam('p'));

        getPriceResolver(input)
            .then((res) => {
                done(new Error('test failed'));
            })
            .catch(err => {
                ex(err.message.includes('item name is mandatory')).to.be.true;
                done();
            });
    });

    it('should return error if item string is less than 3 characters', (done) => {
        let input = new ParsedInput();
        input.params.push(new InputParam('p', '11'));

        getPriceResolver(input)
            .then((res) => {
                done(new Error('test failed'));
            })
            .catch(err => {
                ex(err.message.includes('least 3 chatacter long')).to.be.true;
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