import { ParsedInput } from '../models/parsed-input.model';
import { StringError } from '../models/string-error';
import { IResolvable } from './../resolvers/i-resolvable';

export class CommandsBucket {
    private static resolvers = new Map<string, IResolvable>();

    static getResult(input: ParsedInput, from: string): Promise<string> {
        if (!CommandsBucket.resolvers.has(input.params[0].key)) {
            return Promise.reject(new StringError(`Operation \`${input.params[0].key}\` is not a know command. Please check spelling or run \`!help\``));
        }

        const resolver = CommandsBucket.resolvers.get(input.params[0].key);
        return resolver!.resolveMessage(input, from);
    }

    static addResolver(name: string, resolver: IResolvable) {
        CommandsBucket.resolvers.set(name, resolver);
    }
}