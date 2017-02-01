import * as _ from 'lodash';

export enum PartType {
    COMMAND,
    INPUT
}
export class ParsedMessage {
    parts: Part[];

    constructor() {
        this.parts = []
    }
}

class Part {
    type: PartType;
    content: string;

    constructor() {
        this.content = '';
    }
}


export function parseMessage(message: string): ParsedMessage {
    let parsedMessage = new ParsedMessage();

    let chars = message.toLowerCase().split('');
    let part = new Part();
    chars.forEach((char) => {
        if (char === '"') {
            if (!part.type) {
                part.type = PartType.INPUT;
                return;
            }
            part.content = part.content.trim()
            parsedMessage.parts.push(part);
            part = new Part();
            return;
        }

        if (char === ' ' && part.type === PartType.COMMAND) {
            part.content = part.content.trim()
            parsedMessage.parts.push(part);
            part = new Part();
            return;
        }

        part.type = part.type || PartType.COMMAND
        part.content += char;
    });

    if (part.content !== '') {
        part.content = part.content.trim()
        parsedMessage.parts.push(part);
    }


    return parsedMessage;
}

export function getInputForCommand(command: string, parsedMessage: ParsedMessage): string {
    const commandPartIndex = _.findIndex(parsedMessage.parts, (part: Part) => { return part.content === command; });
    if (commandPartIndex === parsedMessage.parts.length - 1 || commandPartIndex === -1) {
        return null;
    }

    return parsedMessage.parts[commandPartIndex + 1].content;
}