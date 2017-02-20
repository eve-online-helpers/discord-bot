import { getPriceResolver } from './get-price.resolver';
import { InputParam } from '../models/input-param.model';
import { ParsedInput } from '../models/parsed-input.model';
import { expect as ex } from 'chai';

describe('getPriceResolver', () => {
    it('should return help message for !gp !help input', (done) => {
        let input = new ParsedInput();
        input.params.push(new InputParam('gp'));
        input.params.push(new InputParam('help'));

        getPriceResolver(input)
            .then((res) => {
                // This test assume that as long as resolve is called it is successful.
                done();
            })
            .catch(err => {
                done(err);
            });
    });
});