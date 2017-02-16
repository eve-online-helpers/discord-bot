import * as Bluebird from 'bluebird';

import { expect as ex } from 'chai';
import { CommandsBucket } from './command-bucket';
import { YargsResult } from '../models/yargs-result.model';
import { StringError } from '../models/string-error';

describe('command-bucket tests', () => {
    let yargsMock: YargsResult;
    let resolveFn = (yargsMock, form): Bluebird<string> => {
        return Bluebird.resolve('true');
    };
    before(() => {
        yargsMock = {
            _: ['get', 'prices'],
        };
    })
    it('should add command without errors', () => {
        CommandsBucket.addResolver('testResolver', resolveFn);
    });
    it('should get result from command by args', (done) => {
        CommandsBucket.addResolver('get prices', resolveFn);
        CommandsBucket.getResult(yargsMock, 'someUser')
            .then((result) => {
                ex(result).to.be.equal('true');
                done();
            })
            .catch(err => {
                done(err);
            });
    });
    it('should return error if resolver not found', (done) => {
        let _yargsMock = { _: ['unknown', 'resolver'] }
        CommandsBucket.getResult(_yargsMock, 'someUser')
            .then(res => {
                done(new Error('resolver found'));
            })
            .catch((err: Error) => {
                ex(err).to.be.instanceOf(StringError)
                done();
            });
    })
});