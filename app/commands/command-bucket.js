"use strict";
var Bluebird = require("bluebird");
var string_error_1 = require("../models/string-error");
var CommandsBucket = (function () {
    function CommandsBucket() {
    }
    CommandsBucket.getResult = function (input, from) {
        if (!CommandsBucket._resolvers.has(input.params[0].key)) {
            return Bluebird.reject(new string_error_1.StringError("Operation `" + input.params[0].key + "` is not a know command. Please check spelling or run `!help`"));
        }
        var resolver = CommandsBucket._resolvers.get(input.params[0].key);
        return resolver.resolveMessage(input, from);
    };
    CommandsBucket.addResolver = function (name, resolver) {
        CommandsBucket._resolvers.set(name, resolver);
    };
    return CommandsBucket;
}());
CommandsBucket._resolvers = new Map();
exports.CommandsBucket = CommandsBucket;
