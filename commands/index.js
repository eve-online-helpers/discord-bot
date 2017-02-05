"use strict";
var command_bucket_1 = require("./command-bucket");
var resolvers = require("../resolvers");
command_bucket_1.CommandsBucket.addResolver('get price', resolvers.getPriceResolver);
command_bucket_1.CommandsBucket.addResolver('help', resolvers.helpResolver);
exports.CommandsBucket = command_bucket_1.CommandsBucket;
//# sourceMappingURL=index.js.map