"use strict";
var Bluebird = require("bluebird");
function helpResolver(yargs) {
    return new Bluebird(function (resolve, reject) {
        var help = 'Hello, and welcome to eve-helper! \n' +
            'You can use eve-helper from public channel by referencing it buy name or you can write a private message.\n\n' +
            '__The following commands are avaiable without registration:__\n' +
            '```' +
            'help        This help message\n' +
            'get price   Get sell or buy price for item in system please run `get price --help` for more info```\n\n';
        // help +=
        // '__The following commands are available but require authentication:__\n' +
        // '```' +
        // 'get pi      Get information about planetary interaction, please run `get pi --help` for more info```';
        resolve(help);
    });
}
exports.helpResolver = helpResolver;
//# sourceMappingURL=help.resolver.js.map