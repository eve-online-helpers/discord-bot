import * as Bluebird from 'bluebird';
import { Parser } from '../parser';
import { getPriceParser } from './price-resolver/get-price-resolver'

export const getParser = new Parser('get', false);
getParser.addParser('price', getPriceParser);