import 'reflect-metadata';

import * as Bluebird from 'bluebird';

import { inject, injectable } from 'inversify';
import { TYPES } from '../../configurations/inversify.types';
import { ISearchService } from '../../eve-client/api/search-service';
import { ParsedInput } from '../../models/parsed-input.model';
import { IResolvable } from '../i-resolvable';

@injectable()
export class InfoResolver implements IResolvable {

    constructor( @inject(TYPES.SearchService) private searchService: ISearchService) {

    }
    resolveMessage(input: ParsedInput): Bluebird<string> {
        return Bluebird.resolve('!!!!!');
    }
}