import * as path from 'path';
import * as importers from './import-data';
import * as fs from 'fs';
import * as https from 'https';
import * as unzipper from 'unzipper';

const TRANQUILITY_STATIC_DATA = 'https://cdn1.eveonline.com/data/sde/tranquility/sde-20170522-TRANQUILITY.zip';
const TEMP_ZIP_FILE = 'static-data.zip';

console.log(`Initiating download from: ${TRANQUILITY_STATIC_DATA}`);
const staticDataFile = fs.createWriteStream(TEMP_ZIP_FILE);

const request = https.get(TRANQUILITY_STATIC_DATA).on('response', res => {
    const fileSize = +res.headers['content-length'] / 1000;
    let totalDownloaded = 0;
    console.log(`connected, starting download of: ${fileSize}KB`);

    res.on('data', chunk => {
        staticDataFile.write(chunk);
        totalDownloaded += chunk.length / 1000;
        console.log(`downloaded ${(100.0 * totalDownloaded / fileSize).toFixed(2)}%`);
    })
        .on('end', () => {
            staticDataFile.end();
            console.log('finished download');
            unzip();
        });
});

function unzip() {
    console.log('unzipping file');
    fs.createReadStream(TEMP_ZIP_FILE)
        .pipe(unzipper.Extract({ path: __dirname + '/eve_resources' })).on('finish',
        () => {
            console.log('unzip complete');
            console.log('importing items');
            importers.importItems(__dirname + '/eve_resources/sde/fsd/typeIDs.yaml');
            importers.importStations(path.join(__dirname, '/eve_resources/sde/bsd/staStations.yaml'));
        });
}
