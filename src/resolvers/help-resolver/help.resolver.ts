import 'reflect-metadata';

import { IResolvable } from '../i-resolvable';
import { ParsedInput } from '../../models/parsed-input.model';
import { injectable } from 'inversify';

@injectable()
export class HelpResolver implements IResolvable {
    resolveMessage(input: ParsedInput) {
        return new Promise<string>((resolve, reject) => {
            let help =
                'Hello, and welcome to eve-helper! \n' +
                'You can use eve-helper from public channel by referencing it buy name or you can write a private message.\n\n' +
                '__The following commands are avaiable without registration:__\n' +
                '```' +
                '!help           This help message\n' +
                '!p <item>       Get sell and buy prices for items that match item (full or partial) for additional info run <!p !help>\n' +
                '!c <character>  Get details for character, it\'s corporation and alliance if any. (note: search is strict)\n\n' +
                '!roll <number>  Will roll random number between 0 and <number>' +
                '```\n';
            resolve(help);
        });
    }
}