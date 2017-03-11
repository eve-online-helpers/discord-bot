import 'reflect-metadata';

import * as Bluebird from 'bluebird';
import * as _ from 'lodash';

import { inject, injectable } from 'inversify';
import { TYPES } from '../../configurations/inversify.types';
import { ISearchService, SearchCategories } from '../../eve-client/api/search-service';
import { ICharacterService } from '../../eve-client/api/character-service';
import { ICorporationService } from '../../eve-client/api/corporation-service';
import { IAllianceService } from '../../eve-client/api/alliance-service';
import { IZkillboardService } from '../../eve-client/api/zkillboard-service';
import { ParsedInput } from '../../models/parsed-input.model';
import { ISearchResult } from '../../models/i-seach-result.model';
import { IResolvable } from '../i-resolvable';
import { StringError } from '../../models/string-error';

@injectable()
export class InfoResolver implements IResolvable {

    constructor(
        @inject(TYPES.SearchService) private searchService: ISearchService,
        @inject(TYPES.CharacterService) private characterService: ICharacterService,
        @inject(TYPES.AllianceService) private allianceService: IAllianceService,
        @inject(TYPES.ZkillboardService) private zkillboardService: IZkillboardService,
        @inject(TYPES.CorporationService) private corporationService: ICorporationService) { }

    async resolveMessage(input: ParsedInput): Bluebird<string> {
        try {

            const query = input.get('c').value;
            const searchResult = await this.searchService.searchByStringForCategories(query, [SearchCategories.CORPORATION, SearchCategories.CHARACTER]);

            if (!searchResult.character || searchResult.character.length === 0) {
                return Bluebird.reject(new StringError(`Character with name ${query} not found`));
            }

            const characterId = _.first(searchResult.character);
            const characterResult = await this.characterService.getCharacterInfoById(characterId);

            const [corporationResult, allianceResult, zkillboardResult] = await Promise.all([
                this.corporationService.getCorporationInfoById(characterResult.corporation_id),
                this.allianceService.getAllianceInfoById(characterResult.alliance_id),
                this.zkillboardService.getZkillboardInfoById(characterId)]);

            let result = '\n```';
            result += `Name:               ${characterResult.name}`;
            result += characterId === corporationResult.ceo_id ? ' (CEO)\n' : '\n';
            result += `Security Status:    ${characterResult.security_status}\n`;
            result += `Corporation Name:   ${corporationResult.corporation_name}\n`;
            result += `Corporation Ticker: ${corporationResult.ticker}\n`;
            result += `Member Count:       ${corporationResult.member_count}\n`;
            if (allianceResult) {
                result += `Alliance Name:      ${allianceResult.alliance_name}\n`;
                result += `Alliance Ticker:    ${allianceResult.ticker}\n`;
            }
            result += `Ships Destroyed:    ${zkillboardResult.shipsDestroyed}\n`;
            result += `Ships Lost:         ${zkillboardResult.shipsLost}\n`;
            result += `Solo Kills:         ${zkillboardResult.soloKills}\n`;
            result += `Solo Losses:        ${zkillboardResult.soloLosses}\n`;
            result += '```\n';
            result += `More info on zkillboard: https://zkillboard.com/character/${characterId}/`;

            return Bluebird.resolve(result);
        }
        catch (e) {
            return Bluebird.reject(e);
        }
    }
}