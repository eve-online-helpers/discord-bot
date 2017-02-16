export class ParsedInput {
    params: InputParam[]
    constructor() {
        this.params = [];
    }
}

export class InputParam {
    constructor(public key?: string, public value?: string) {

    }
}
export function parseInput(input: string): ParsedInput {
    if (!input.startsWith('!')) {
        return null;
    }

    let result = new ParsedInput();

    let parts = input.split('!').filter(el => el.length !== 0);
    for (let part of parts) {
        let param = new InputParam();
        
        let innerParts = part.split(' ');
        param.key = innerParts.splice(0, 1)[0];
        param.value = innerParts.join(' ');

        result.params.push(param);
    }
    return result;
}