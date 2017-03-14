"use strict";
const Bluebird = require("bluebird");
function getPiResolver(yargs) {
    return new Bluebird((resolve, reject) => {
        if (yargs['help']) {
            resolve('Get PI usage:\n' +
                '`get pi --planets`               PLanets summary with planed Ids, number of facilities and other interesting stuff\n' +
                '`get pi --status "<planetId>"`   Planet full status with jobs duration (planetId can be aquired from previous request)');
        }
    });
}
exports.getPiResolver = getPiResolver;
