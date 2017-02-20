"use strict";
var command_bucket_1 = require("./command-bucket");
var resolvers = require("../resolvers");
command_bucket_1.CommandsBucket.addResolver('p', resolvers.getPriceResolver);
command_bucket_1.CommandsBucket.addResolver('help', resolvers.helpResolver);
// _CommandsBucket.addResolver('register', resolvers.registerResolver);
// _CommandsBucket.addResolver('remind price', resolvers.priceRemindResolver);
// _CommandsBucket.addResolver('get pi', resolvers.getPiResolver);
exports.CommandsBucket = command_bucket_1.CommandsBucket;
