"use strict";
class ParsedInput {
    constructor() {
        this.params = [];
    }
    get(key) {
        if (!this.has(key)) {
            return null;
        }
        return this.params.filter(p => p.key === key)[0];
    }
    has(key) {
        return this.params.findIndex(p => p.key === key) !== -1;
    }
    getFirst(keys) {
        for (let key of keys) {
            if (this.has(key)) {
                return this.get(key);
            }
        }
        return null;
    }
}
exports.ParsedInput = ParsedInput;
