"use strict";
var Bluebird = require("bluebird");
var config = require("../configurations");
var conf = config.getConfigurations();
function registerResolver(yargs, from) {
    return new Bluebird(function (resolve, reject) {
        resolve('To register you will need to go to the URL below and accept permissions for user you would like to  have access to\n' +
            conf.registerUri.replace(':author_id', from));
    });
}
exports.registerResolver = registerResolver;
