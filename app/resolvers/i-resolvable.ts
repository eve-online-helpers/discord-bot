import * as Bluebird from 'bluebird';
import { ParsedInput } from '../models/parsed-input.model';
export interface IResolvable {
    resolveMessage(parsedMessage: ParsedInput, from?: string): Bluebird<string>;
}