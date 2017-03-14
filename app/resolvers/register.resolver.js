"use strict";
const Bluebird = require("bluebird");
const config = require("../configurations");
const conf = config.getConfigurations();
function registerResolver(yargs, from) {
    return new Bluebird((resolve, reject) => {
        resolve('To register you will need to go to the URL below and accept permissions for user you would like to  have access to\n' +
            conf.registerUri.replace(':author_id', from));
    });
}
exports.registerResolver = registerResolver;
