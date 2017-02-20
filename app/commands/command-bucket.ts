import * as Bluebird from 'bluebird';

import { ParsedInput } from '../models/parsed-input.model';
import { StringError } from '../models/string-error';

export class CommandsBucket {
    private static _resolvers = new Map<string, (parsedMessage: ParsedInput, from: string) => Bluebird<string>>();

    static getResult(input: ParsedInput, from: string): Bluebird<string> {
        if (!CommandsBucket._resolvers.has(input.params[0].key)) {
            return Bluebird.reject(new StringError(`Operation \`${input.params[0].key}\` is not a know command. Please check spelling or run \`!help\``));
        }

        return CommandsBucket._resolvers.get(input.params[0].key)(input, from);
    }

    static addResolver(name: string, resolverFn: (parsedMessage: ParsedInput, from: string) => Bluebird<string>) {
        CommandsBucket._resolvers.set(name, resolverFn);
    }
}