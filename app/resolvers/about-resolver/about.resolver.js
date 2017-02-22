"use strict";
var Bluebird = require("bluebird");
var version = require('../../../version.json').version;
function aboutResolver(input) {
    var result = "```EVE discord bot, version " + version + "```";
    return new Bluebird(function (resolve, reject) {
        resolve(result);
    });
}
exports.aboutResolver = aboutResolver;
