import { ParsedInput } from '../models/parsed-input.model';
export interface IResolvable {
    resolveMessage(parsedMessage: ParsedInput, from?: string): Promise<string>;
}