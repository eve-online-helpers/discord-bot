import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as persistence from '../';

export function importStations(filePath) {
    var stations = yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
    persistence.getConnection()
        .then(conn => {
            conn.dropCollection('stations')
            conn.collection('stations').insertMany(stations)
                .then(res => {
                    console.log('import of stations complete with, ', res);
                })
                .catch(err => {
                    console.error(err);
                })
        });
}