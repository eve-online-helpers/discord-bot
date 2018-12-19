import { InputParam } from '../models/input-param.model';
import { ParsedInput } from '../models/parsed-input.model';

export function parseInput(input: string): ParsedInput | null {
    input = input.trim();
    if (!input.startsWith('!')) {
        return null;
    }

    let result = new ParsedInput();

    let parts = input.split('!').filter(el => el.length !== 0);
    for (let part of parts) {
        let param = new InputParam('');

        let innerParts = part.split(' ');
        param.key = innerParts.splice(0, 1)[0];
        param.value = innerParts.join(' ').trim();

        result.params.push(param);
    }
    return result;
}