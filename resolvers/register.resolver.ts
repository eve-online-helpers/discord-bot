import * as Bluebird from 'bluebird';
import * as config from '../configurations';
import { YargsResult } from '../models/yargs-result.model';

const conf = config.getConfigurations();

export function registerResolver(yargs: YargsResult, from: string) {
    return new Bluebird<string>((resolve, reject) => {
        resolve('To register you will need to go to the URL below and accept permissions for user you would like to  have access to\n' +
            conf.registerUri.replace(':author_id', from));
    });
}
