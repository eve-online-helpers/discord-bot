"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
require("reflect-metadata");
const _ = require("lodash");
const inversify_1 = require("inversify");
const inversify_types_1 = require("../../configurations/inversify.types");
const search_service_1 = require("../../eve-client/api/search-service");
const string_error_1 = require("../../models/string-error");
let InfoResolver = class InfoResolver {
    constructor(persistance, searchService, characterService, allianceService, zkillboardService, corporationService) {
        this.persistance = persistance;
        this.searchService = searchService;
        this.characterService = characterService;
        this.allianceService = allianceService;
        this.zkillboardService = zkillboardService;
        this.corporationService = corporationService;
    }
    resolveMessage(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = input.get('c').value;
                const searchResult = yield this.searchService.searchByStringForCategories(query, [search_service_1.SearchCategories.CORPORATION, search_service_1.SearchCategories.CHARACTER]);
                if (!searchResult.character || searchResult.character.length === 0) {
                    return Promise.reject(new string_error_1.StringError(`Character with name ${query} not found`));
                }
                const characterId = _.first(searchResult.character);
                const characterResult = yield this.characterService.getCharacterInfoById(characterId);
                const [corporationResult, allianceResult, zkillboardResult, zkillboardLosses] = yield Promise.all([
                    this.corporationService.getCorporationInfoById(characterResult.corporation_id),
                    this.allianceService.getAllianceInfoById(characterResult.alliance_id),
                    this.zkillboardService.getZkillboardInfoById(characterId),
                    this.zkillboardService.getZkillboardLossesById(characterId)
                ]);
                const shipsIdsFlown = this.getShipsIdsFlown(zkillboardLosses);
                const shipsFlown = yield this.persistance.getItemsByIds(shipsIdsFlown);
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
        });
    }
    getShipsIdsFlown(zkillboarLossesResponse) {
        let ships = [];
        let losses = _.uniqBy(zkillboarLossesResponse, l => l.victim.shipTypeID)
            .map(l => l.victim.shipTypeID.toString());
        return losses;
    }
};
InfoResolver = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(inversify_types_1.TYPES.Perisistance)),
    __param(1, inversify_1.inject(inversify_types_1.TYPES.SearchService)),
    __param(2, inversify_1.inject(inversify_types_1.TYPES.CharacterService)),
    __param(3, inversify_1.inject(inversify_types_1.TYPES.AllianceService)),
    __param(4, inversify_1.inject(inversify_types_1.TYPES.ZkillboardService)),
    __param(5, inversify_1.inject(inversify_types_1.TYPES.CorporationService)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object])
], InfoResolver);
exports.InfoResolver = InfoResolver;
