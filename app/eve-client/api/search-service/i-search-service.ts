import { ISearchResult } from '../../../models/i-seach-result.model';

export interface ISearchService {
    searchByStringForCategories(search: string, categores: string[]): Promise<ISearchResult>;
}