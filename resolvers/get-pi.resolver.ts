import * as Bluebird from 'bluebird';

import { YargsResult } from '../models/yargs-result.model';

export function getPiResolver(yargs: YargsResult) {
    return new Bluebird<string>((resolve, reject) => {
        if (yargs['help']) {
            resolve('Get PI usage:\n' +
                '`get pi --planets`               PLanets summary with planed Ids, number of facilities and other interesting stuff\n' +
                '`get pi --status "<planetId>"`   Planet full status with jobs duration (planetId can be aquired from previous request)');
        }
        

        
    });
}