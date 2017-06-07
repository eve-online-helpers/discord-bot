"use strict";
const chai_1 = require("chai");
const command_bucket_1 = require("./command-bucket");
const string_error_1 = require("../models/string-error");
describe('command-bucket tests', () => {
    let inputMock;
    let resolver;
    class MockResolver {
        resolveMessage(input) {
            return Promise.resolve('true');
        }
    }
    before(() => {
        resolver = new MockResolver();
        inputMock = {
            params: [{
                    key: 'gp',
                    value: ''
                }]
        };
    });
    it('should add command without errors', () => {
        command_bucket_1.CommandsBucket.addResolver('testResolver', resolver);
    });
    it('should get result from command by args', (done) => {
        command_bucket_1.CommandsBucket.addResolver('gp', resolver);
        command_bucket_1.CommandsBucket.getResult(inputMock, 'someUser')
            .then((result) => {
            chai_1.expect(result).to.be.equal('true');
            done();
        })
            .catch(err => {
            done(err);
        });
    });
    it('should return error if resolver not found', (done) => {
        let _inputMock = {
            params: [{
                    key: 'unknown',
                    value: ''
                }]
        };
        command_bucket_1.CommandsBucket.getResult(_inputMock, 'someUser')
            .then(res => {
            done(new Error('resolver found'));
        })
            .catch((err) => {
            chai_1.expect(err).to.be.instanceOf(string_error_1.StringError);
            done();
        });
    });
});
