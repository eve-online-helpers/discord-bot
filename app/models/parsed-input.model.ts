import { InputParam } from './input-param.model';
export class ParsedInput {
    params: InputParam[];
    constructor() {
        this.params = [];
    }

    get(key: string): InputParam {
        if (!this.has(key)) {
            return null;
        }
        return this.params.filter(p => p.key === key)[0];
    }

    has(key: string) {
        return this.params.findIndex(p => p.key === key) !== -1;
    }
}

