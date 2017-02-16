"use strict";
var Bluebird = require("bluebird");
var string_error_1 = require("../models/string-error");
var CommandsBucket = (function () {
    function CommandsBucket() {
    }
    CommandsBucket.getResult = function (yargs, from) {
        var op = yargs._.join(' ');
        if (!CommandsBucket._resolvers.has(op)) {
            return Bluebird.reject(new string_error_1.StringError("Operation `" + op + "` is not a know command. Please check spelling or run `@eve-helper help`"));
        }
        return CommandsBucket._resolvers.get(op)(yargs, from);
    };
    CommandsBucket.addResolver = function (name, resolverFn) {
        CommandsBucket._resolvers.set(name, resolverFn);
    };
    return CommandsBucket;
}());
CommandsBucket._resolvers = new Map();
exports.CommandsBucket = CommandsBucket;
