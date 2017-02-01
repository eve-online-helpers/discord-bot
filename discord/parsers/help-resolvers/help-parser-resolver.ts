import * as Bluebird from 'bluebird';
import { Parser } from '../parser';

export const helpParser = new Parser('help', true, (messageParts) => {
    return Bluebird.resolve('Hello, \nI\'m EVE helper bot. I can do nany things and I\'m learning to do new things every day.\n' +
        'You can activate the following commands with the `help` word to get additional info on what they do\n\n'+
        '```help:          This help message\n'+
        'get price:     Get price of specific item, write `get prices help` for more info\n```');
}); 