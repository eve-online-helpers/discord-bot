import 'reflect-metadata';
import * as axios from 'axios';

import { injectable } from 'inversify';
import { ISearchService } from './i-search-service';
import { ISearchResult } from '../../../models/i-seach-result.model';
import { getConfigurations, ConfigModel } from '../../../configurations';

@injectable()
export class SearchService implements ISearchService {
    private config: ConfigModel;

    constructor() {
        this.config = getConfigurations();
    }
    searchByStringForCategories(search: string, categores: string[], strict: boolean = true): Promise<ISearchResult> {
        let endpoint = this.config.esiApi.searchEndpoint
            .replace('{searchString}', search)
            .replace('{seachCategories}', categores.join(','))
            .replace('{strict}', strict.toString());

        return axios.get<ISearchResult>(endpoint)
            .then(r => r.result);
    }

}