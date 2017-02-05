"use strict";
var Bluebird = require("bluebird");
function helpResolver(yargs) {
    return new Bluebird(function (resolve, reject) {
        resolve('Hello, and welcome to eve-helper! \n' +
            'You can use eve-helper from public channel by referencing it buy name or you can write a private message.\n' +
            'The following commands are avaiable for in eve helper: \n\n' +
            '```' +
            'help        This help message\n' +
            'get price   Get sell or buy price for item in system please run `get price --help` for more info```');
    });
}
exports.helpResolver = helpResolver;
//# sourceMappingURL=help.resolver.js.map