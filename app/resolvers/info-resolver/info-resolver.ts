import 'reflect-metadata';

import * as _ from 'lodash';

import { inject, injectable } from 'inversify';
import { TYPES } from '../../configurations/inversify.types';
import { ISearchService, SearchCategories } from '../../eve-client/api/search-service';
import { ICharacterService } from '../../eve-client/api/character-service';
import { ICorporationService } from '../../eve-client/api/corporation-service';
import { IAllianceService } from '../../eve-client/api/alliance-service';
import { IZkillboardService } from '../../eve-client/api/zkillboard-service';
import { IPersistance } from '../../persistance/i-persistance';
import { ParsedInput } from '../../models/parsed-input.model';
import { IZkillboardLossesPublicResponse } from '../../models/i-zkillboard-losses-public-response-model';
import { ISearchResult } from '../../models/i-seach-result.model';
import { IResolvable } from '../i-resolvable';
import { StringError } from '../../models/string-error';

@injectable()
export class InfoResolver implements IResolvable {

    constructor(
        @inject(TYPES.Perisistance) private persistance: IPersistance,
        @inject(TYPES.SearchService) private searchService: ISearchService,
        @inject(TYPES.CharacterService) private characterService: ICharacterService,
        @inject(TYPES.AllianceService) private allianceService: IAllianceService,
        @inject(TYPES.ZkillboardService) private zkillboardService: IZkillboardService,
        @inject(TYPES.CorporationService) private corporationService: ICorporationService) { }

    async resolveMessage(input: ParsedInput): Promise<string> {
        try {
            const query = input.get('c').value;
            const searchResult = await this.searchService.searchByStringForCategories(query, [SearchCategories.CORPORATION, SearchCategories.CHARACTER]);

            if (!searchResult.character || searchResult.character.length === 0) {
                return Promise.reject(new StringError(`Character with name ${query} not found`));
            }

            const characterId = _.first(searchResult.character);
            const characterResult = await this.characterService.getCharacterInfoById(characterId);

            const [corporationResult, allianceResult, zkillboardResult, zkillboardLosses] = await Promise.all([
                this.corporationService.getCorporationInfoById(characterResult.corporation_id),
                this.allianceService.getAllianceInfoById(characterResult.alliance_id),
                this.zkillboardService.getZkillboardInfoById(characterId),
                this.zkillboardService.getZkillboardLossesById(characterId)]);

            const shipsIdsFlown = this.getShipsIdsFlown(zkillboardLosses);
            const shipsFlown = await this.persistance.getItemsByIds(shipsIdsFlown);

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
            result += `Ships Destroyed:    ${zkillboardResult.shipsDestroyed || '0'}\n`;
            result += `Ships Lost:         ${zkillboardResult.shipsLost || '0'}\n`;
            result += `Solo Kills:         ${zkillboardResult.soloKills || '0'}\n`;
            result += `Solo Losses:        ${zkillboardResult.soloLosses || '0'}\n`;
            result += `Ships Flown:        ${_.map(shipsFlown, s => s.name).join(', ')}\n`;
            result += '```\n';
            result += `More info on zkillboard: https://zkillboard.com/character/${characterId}/`;

            return Promise.resolve(result);
        }
        catch (e) {
            return Promise.reject(e);
        }
    }

    private getShipsIdsFlown(zkillboarLossesResponse: IZkillboardLossesPublicResponse[]): string[] {
        let ships: number[] = [];
        let losses = _.uniqBy(zkillboarLossesResponse, l => l.victim.ship_type_id)
            .map(l => l.victim.ship_type_id.toString());

        return losses;
    }
}