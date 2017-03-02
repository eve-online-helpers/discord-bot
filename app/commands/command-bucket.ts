import * as Bluebird from 'bluebird';

import { ParsedInput } from '../models/parsed-input.model';
import { StringError } from '../models/string-error';
import { IResolvable } from './../resolvers/i-resolvable';

export class CommandsBucket {
    private static _resolvers = new Map<string, IResolvable>();

    static getResult(input: ParsedInput, from: string): Bluebird<string> {
        if (!CommandsBucket._resolvers.has(input.params[0].key)) {
            return Bluebird.reject(new StringError(`Operation \`${input.params[0].key}\` is not a know command. Please check spelling or run \`!help\``));
        }

        const resolver = CommandsBucket._resolvers.get(input.params[0].key);
        return resolver.resolveMessage(input, from);
    }

    static addResolver(name: string, resolver: IResolvable) {
        CommandsBucket._resolvers.set(name, resolver);
    }
}