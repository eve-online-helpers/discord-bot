import * as Bluebird from 'bluebird';

import { expect as ex } from 'chai';
import { CommandsBucket } from './command-bucket';
import { ParsedInput } from '../models/parsed-input.model';
import { StringError } from '../models/string-error';

describe('command-bucket tests', () => {
    let inputMock: ParsedInput;
    let resolveFn = (yargsMock, form): Bluebird<string> => {
        return Bluebird.resolve('true');
    };
    before(() => {
        inputMock = <ParsedInput>{
            params: [{
                key: 'gp',
                value: ''
            }]
        };
    });
    it('should add command without errors', () => {
        CommandsBucket.addResolver('testResolver', resolveFn);
    });
    it('should get result from command by args', (done) => {
        CommandsBucket.addResolver('gp', resolveFn);
        CommandsBucket.getResult(inputMock, 'someUser')
            .then((result) => {
                ex(result).to.be.equal('true');
                done();
            })
            .catch(err => {
                done(err);
            });
    });
    it('should return error if resolver not found', (done) => {
        let _inputMock = <ParsedInput>{
            params: [{
                key: 'unknown',
                value: ''
            }]
        };
        CommandsBucket.getResult(_inputMock, 'someUser')
            .then(res => {
                done(new Error('resolver found'));
            })
            .catch((err: Error) => {
                ex(err).to.be.instanceOf(StringError);
                done();
            });
    });
});