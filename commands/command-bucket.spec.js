"use strict";
var Bluebird = require("bluebird");
var chai_1 = require("chai");
var command_bucket_1 = require("./command-bucket");
var string_error_1 = require("../models/string-error");
describe('command-bucket tests', function () {
    var yargsMock;
    var resolveFn = function (yargsMock, form) {
        return Bluebird.resolve('true');
    };
    before(function () {
        yargsMock = {
            _: ['get', 'prices'],
        };
    });
    it('should add command without errors', function () {
        command_bucket_1.CommandsBucket.addResolver('testResolver', resolveFn);
    });
    it('should get result from command by args', function (done) {
        command_bucket_1.CommandsBucket.addResolver('get prices', resolveFn);
        command_bucket_1.CommandsBucket.getResult(yargsMock, 'someUser')
            .then(function (result) {
            chai_1.expect(result).to.be.equal('true');
            done();
        })
            .catch(function (err) {
            done(err);
        });
    });
    it('should return error if resolver not found', function (done) {
        var _yargsMock = { _: ['unknown', 'resolver'] };
        command_bucket_1.CommandsBucket.getResult(_yargsMock, 'someUser')
            .then(function (res) {
            done(new Error('resolver found'));
        })
            .catch(function (err) {
            chai_1.expect(err).to.be.instanceOf(string_error_1.StringError);
            done();
        });
    });
});
