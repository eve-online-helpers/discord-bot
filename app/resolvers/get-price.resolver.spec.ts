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
                ex(res).to.be.equal('\n\ngp usage: `!gp <item name> <!jita !amarr !hek !dodixie !rens|>`\n\n' +
                    '__Defaults (default values for parameters)__\n' +
                    '```' +
                    'locations defaults to: !jita\n' +
                    '```');
                done();
            })
            .catch(err => {
                done(err);
            });
    });
});