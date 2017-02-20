"use strict";
var Bluebird = require("bluebird");
function helpResolver(input) {
    return new Bluebird(function (resolve, reject) {
        var help = 'Hello, and welcome to eve-helper! \n' +
            'You can use eve-helper from public channel by referencing it buy name or you can write a private message.\n\n' +
            '__The following commands are avaiable without registration:__\n' +
            '```' +
            '!help    This help message\n' +
            '!p       Get sell and buy prices for items thar match search param for additional info run <!p !help> ```\n\n';
        // help +=
        // '__The following commands are available but require authentication:__\n' +
        // '```' +
        // 'get pi      Get information about planetary interaction, please run `get pi --help` for more info```';
        resolve(help);
    });
}
exports.helpResolver = helpResolver;
