"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_bucket_1 = require("./command-bucket");
const resolvers = require("../resolvers");
command_bucket_1.CommandsBucket.addResolver('p', resolvers.getPriceResolver);
command_bucket_1.CommandsBucket.addResolver('c', resolvers.infoResolver);
command_bucket_1.CommandsBucket.addResolver('help', resolvers.helpResolver);
// _CommandsBucket.addResolver('about', resolvers.aboutResolver);
// _CommandsBucket.addResolver('remind price', resolvers.priceRemindResolver);
// _CommandsBucket.addResolver('get pi', resolvers.getPiResolver);
exports.CommandsBucket = command_bucket_1.CommandsBucket;
//# sourceMappingURL=index.js.map