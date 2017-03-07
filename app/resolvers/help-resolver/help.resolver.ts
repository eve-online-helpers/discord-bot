import 'reflect-metadata';
import * as Bluebird from 'bluebird';

import { IResolvable } from '../i-resolvable';
import { ParsedInput } from '../../models/parsed-input.model';
import { injectable } from 'inversify';

@injectable()
export class HelpResolver implements IResolvable {
    resolveMessage(input: ParsedInput) {
        return new Bluebird<string>((resolve, reject) => {
            let help =
                'Hello, and welcome to eve-helper! \n' +
                'You can use eve-helper from public channel by referencing it buy name or you can write a private message.\n\n' +
                '__The following commands are avaiable without registration:__\n' +
                '```' +
                '!help           This help message\n' +
                '!p <item>       Get sell and buy prices for items that match item (full or partial) for additional info run <!p !help> ```\n\n';

            // help +=
            // '__The following commands are available but require authentication:__\n' +
            // '```' +
            // 'get pi      Get information about planetary interaction, please run `get pi --help` for more info```';

            resolve(help);
        });
    }
}