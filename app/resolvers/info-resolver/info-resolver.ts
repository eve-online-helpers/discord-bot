import 'reflect-metadata';

import * as Bluebird from 'bluebird';
import * as _ from 'lodash';

import { inject, injectable } from 'inversify';
import { TYPES } from '../../configurations/inversify.types';
import { ISearchService, SearchCategories } from '../../eve-client/api/search-service';
import { ICharacterService } from '../../eve-client/api/character-service';
import { ICorporationService } from '../../eve-client/api/corporation-service';
import { ParsedInput } from '../../models/parsed-input.model';
import { ISearchResult } from '../../models/i-seach-result.model';
import { IResolvable } from '../i-resolvable';
import { StringError } from '../../models/string-error';

@injectable()
export class InfoResolver implements IResolvable {

    constructor(
        @inject(TYPES.SearchService) private searchService: ISearchService,
        @inject(TYPES.CharacterService) private characterService: ICharacterService,
        @inject(TYPES.CorporationService) private corporationService: ICorporationService) { }

    async resolveMessage(input: ParsedInput): Bluebird<string> {
        const query = input.get('c').value;

        const searchResult = await this.searchService.searchByStringForCategories(query, [SearchCategories.CORPORATION, SearchCategories.CHARACTER]);

        if (!searchResult.character || searchResult.character.length === 0) {
            return Bluebird.reject(new StringError(`Character with name ${query} not found`));
        }

        const characterId = _.first(searchResult.character);
        const characterResult = await this.characterService.getCharacterInfoById(characterId);

        const corporationResult = await this.corporationService.getCorporationInfoById(characterResult.corporation_id);

        let result = '\n```';
        result += `Name:             ${characterResult.name}`;
        result += characterId === corporationResult.ceo_id ? ' (CEO)\n' : '\n';
        result += `Security Status:  ${characterResult.security_status}\n`;
        result += `Corporation Name: ${corporationResult.corporation_name}\n`;
        result += `Member Count:     ${corporationResult.member_count}`;
        result += '```';

        return Bluebird.resolve(result);



        // return new Bluebird<string>((resolve, reject) => {
        //     if (!query) {
        //         return reject(new StringError('Search is mandatory!'));
        //     }

        //     let searchResultPromise = this.searchService.searchByStringForCategories(query, [SearchCategories.CORPORATION, SearchCategories.CHARACTER]);
        //     let seachResult = awair searchResultPromise();

        //     this.searchService.searchByStringForCategories(query, [SearchCategories.CORPORATION, SearchCategories.CHARACTER])
        //         .then((res: ISearchResult) => {
        //             if (!res.character) {
        //                 return reject(new StringError(`Character with name ${query} not found`));
        //             }

        //             return _.first(res.character);
        //         })
        //         .then(this.characterService.getCharacterInfoById.bind(this.characterService))
        //         .then((c) => {

        //             resolve(JSON.stringify(c));
        //         })
        //         .catch(err => reject(err));
        // });
    }
}