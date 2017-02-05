import * as Bluebird from 'bluebird';

import { YargsResult } from '../models/yargs-result.model';

export class CommandsBucket {
    private static _resolvers = new Map<string, (parsedMessage: YargsResult) => Bluebird<string>>();

    static getResult(yargs: YargsResult): Bluebird<string> {
        const op = yargs._.join(' ');
        if (!CommandsBucket._resolvers.has(op)) {
            return Bluebird.reject(`Operation \`${op}\` is not a know command. Please check spelling or run \`@eve-helper help\``);
        }
        
        return CommandsBucket._resolvers.get(op)(yargs);
    }

    static addResolver(name: string, resolverFn: (parsedMessage: YargsResult) => Bluebird<string>) {
        CommandsBucket._resolvers.set(name, resolverFn);
    }
}