import * as Bluebird from 'bluebird';
import { ParsedInput } from '../../models/parsed-input.model';

const version = require('../../../version.json').version;
export function aboutResolver(input: ParsedInput): Bluebird<string> {
    let result = `\`\`\`EVE discord bot, version ${version}\`\`\``;

    return new Bluebird<string>((resolve, reject) => {
        resolve(result);
    });
}