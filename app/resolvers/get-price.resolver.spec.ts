import * as persistance from '../persistance';

import { PriceResolver } from './get-price.resolver';
import { InputParam } from '../models/input-param.model';
import { ParsedInput } from '../models/parsed-input.model';
import { expect as ex } from 'chai';

import { PersistanceMock } from '../../mocks/persistance.mock';

describe('getPriceResolver', () => {
    let pResolver: PriceResolver;
    before(() => {
        pResolver = new PriceResolver(new PersistanceMock());
    });

    after(() => {

    });

    it('should return help message for !p!help input', (done) => {
        let input = new ParsedInput();
        input.params.push(new InputParam('p'));
        input.params.push(new InputParam('help'));

        pResolver.resolveMessage(input)
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

        pResolver.resolveMessage(input)
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

        pResolver.resolveMessage(input)
            .then((res) => {
                done(new Error('test failed'));
            })
            .catch(err => {
                ex(err.message.includes('least 3 chatacter long')).to.be.true;
                done();
            });
    });

    it('should return error if no items were found that match search', (done) => {
        let input = new ParsedInput();
        input.params.push(new InputParam('p', 'UNKNOWN_ITEM'));

        pResolver.resolveMessage(input)
            .then((res) => {
                done(new Error('test failed'));
            })
            .catch(err => {
                ex(err.message.includes('UNKNOWN_ITEM')).to.be.true;
                done();
            });
    });

    it('should return error if more than 20 item results returned from search', (done) => {
        let input = new ParsedInput();
        input.params.push(new InputParam('p', 'MANY_ITEMS'));

        pResolver.resolveMessage(input)
            .then((res) => {
                done(new Error('test failed'));
            })
            .catch(err => {
                ex(err.message.includes('21')).to.be.true;
                done();
            });
    });
});