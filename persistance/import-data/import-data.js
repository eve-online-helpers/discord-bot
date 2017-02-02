"use strict";
var yaml = require("js-yaml");
var fs = require("fs");
var persistence = require("../");
function importStations(filePath) {
    var stations = yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
    persistence.getConnection()
        .then(function (conn) {
        conn.dropCollection('stations');
        conn.collection('stations').insertMany(stations)
            .then(function (res) {
            console.log('import of stations complete with, ', res);
        })
            .catch(function (err) {
            console.error(err);
        });
    });
}
exports.importStations = importStations;
//# sourceMappingURL=import-data.js.map