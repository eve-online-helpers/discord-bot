"use strict";
var Bluebird = require("bluebird");
var CommandsBucket = (function () {
    function CommandsBucket() {
    }
    CommandsBucket.getResult = function (yargs, from) {
        var op = yargs._.join(' ');
        if (!CommandsBucket._resolvers.has(op)) {
            return Bluebird.reject("Operation `" + op + "` is not a know command. Please check spelling or run `@eve-helper help`");
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
//# sourceMappingURL=command-bucket.js.map