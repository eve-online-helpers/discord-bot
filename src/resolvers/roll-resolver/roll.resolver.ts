import { YargsResult } from "../../models/yargs-result.model";
import { ParsedInput } from "../../models/parsed-input.model";
import { StringError } from "../../models/string-error";
import { IResolvable } from "../i-resolvable";
import { injectable } from "inversify";

@injectable()
export class RollResolver implements IResolvable {
    async resolveMessage(parsedMessage: ParsedInput, from?: string): Promise<string> {
        const roll = parsedMessage.get('roll').value;
        const rollNumber = +roll;
        if (isNaN(rollNumber) || rollNumber > 100000) {
            throw new StringError('!roll <number> must be of `number` type and of value `0-100000`');
        }

        return `🎲 Rolled: \`${Math.floor(Math.random() * rollNumber)}\``;
    }

}