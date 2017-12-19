import { ParsedInput } from '../../models/parsed-input.model';

// const version = require('../../../version.json').version;
export function aboutResolver(input: ParsedInput): Promise<string> {
    let result = `\`\`\`EVE discord bot, version alpha\`\`\``;

    return new Promise<string>((resolve, reject) => {
        resolve(result);
    });
}