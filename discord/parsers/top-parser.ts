import { Parser } from './parser';
import { helpParser } from './help-resolvers/help-parser-resolver';
import { getParser } from './get-resolvers/get-parser-mapper';

export const topParser = new Parser('top', false);
topParser.addParser('help', helpParser);
topParser.addParser('get', getParser);