import * as path from 'path';
import * as importers from './import-data';

const FILE_BASE_DIRECTORY = process.argv[2];
setTimeout(() => {
    importers.importStations(path.join(FILE_BASE_DIRECTORY, 'bsd/staStations.yaml'));
    importers.importItems(path.join(FILE_BASE_DIRECTORY, 'fsd/typeIDs.yaml'));
}, 3000);