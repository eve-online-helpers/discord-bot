"use strict";
var path = require("path");
var importers = require("./import-data");
var FILE_BASE_DIRECTORY = process.argv[2];
importers.importStations(path.join(FILE_BASE_DIRECTORY, 'bsd/staStations.yaml'));
importers.importItems(path.join(FILE_BASE_DIRECTORY, 'fsd/typeIDs.yaml'));
//# sourceMappingURL=start-import.js.map