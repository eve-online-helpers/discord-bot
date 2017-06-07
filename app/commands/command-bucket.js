"use strict";
const string_error_1 = require("../models/string-error");
class CommandsBucket {
    static getResult(input, from) {
        if (!CommandsBucket._resolvers.has(input.params[0].key)) {
            return Promise.reject(new string_error_1.StringError(`Operation \`${input.params[0].key}\` is not a know command. Please check spelling or run \`!help\``));
        }
        const resolver = CommandsBucket._resolvers.get(input.params[0].key);
        return resolver.resolveMessage(input, from);
    }
    static addResolver(name, resolver) {
        CommandsBucket._resolvers.set(name, resolver);
    }
}
CommandsBucket._resolvers = new Map();
exports.CommandsBucket = CommandsBucket;
