import { Message } from 'discord.js';
import { ParsedMessage } from '../parsers/message-parser';
import * as Bluebird from 'bluebird';

export class Parser {
    private _subParsers: { [id: string]: Parser } = {};
    constructor(public name: string, public isLowerLevelParser: boolean, private _resolveMessage?: (parsedLevel: number, messageParts: ParsedMessage) => Bluebird<string>) { }

    addParser(name: string, parser: Parser, ) {
        this._subParsers[name] = parser;
    }

    removeParser(name: string) {
        this._subParsers[name] = undefined;
    }
    resolveSubParser(parsedLevel: number, parsedMessage: ParsedMessage): Bluebird<string> {
        if (this.isLowerLevelParser) {
            return Bluebird.reject('lower level parsers cannot have subParsers, try to resolveMessage');
        }

        parsedMessage.parts[parsedLevel].type
        const subParser = this._subParsers[parsedMessage.parts[parsedLevel].content];
        if (!subParser) {
            return Bluebird.reject(`parser ${parsedMessage.parts[parsedLevel].content} not found`);
        }

        if (subParser.isLowerLevelParser) {
            return subParser._resolveMessage(parsedLevel + 1, parsedMessage);
        }

        return subParser.resolveSubParser(parsedLevel + 1, parsedMessage);
    }
}