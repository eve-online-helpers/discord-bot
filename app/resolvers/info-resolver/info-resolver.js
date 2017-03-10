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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
require("reflect-metadata");
var Bluebird = require("bluebird");
var _ = require("lodash");
var inversify_1 = require("inversify");
var inversify_types_1 = require("../../configurations/inversify.types");
var search_service_1 = require("../../eve-client/api/search-service");
var string_error_1 = require("../../models/string-error");
var InfoResolver = (function () {
    function InfoResolver(searchService, characterService, allianceService, corporationService) {
        this.searchService = searchService;
        this.characterService = characterService;
        this.allianceService = allianceService;
        this.corporationService = corporationService;
    }
    InfoResolver.prototype.resolveMessage = function (input) {
        return __awaiter(this, void 0, Bluebird, function () {
            var query, searchResult, characterId, characterResult, _a, corporationResult, allianceResult, result, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        query = input.get('c').value;
                        return [4 /*yield*/, this.searchService.searchByStringForCategories(query, [search_service_1.SearchCategories.CORPORATION, search_service_1.SearchCategories.CHARACTER])];
                    case 1:
                        searchResult = _b.sent();
                        if (!searchResult.character || searchResult.character.length === 0) {
                            return [2 /*return*/, Bluebird.reject(new string_error_1.StringError("Character with name " + query + " not found"))];
                        }
                        characterId = _.first(searchResult.character);
                        return [4 /*yield*/, this.characterService.getCharacterInfoById(characterId)];
                    case 2:
                        characterResult = _b.sent();
                        return [4 /*yield*/, Promise.all([
                                this.corporationService.getCorporationInfoById(characterResult.corporation_id),
                                this.allianceService.getAllianceInfoById(characterResult.alliance_id)
                            ])];
                    case 3:
                        _a = _b.sent(), corporationResult = _a[0], allianceResult = _a[1];
                        console.log(characterResult.alliance_id);
                        result = '\n```';
                        result += "Name:               " + characterResult.name;
                        result += characterId === corporationResult.ceo_id ? ' (CEO)\n' : '\n';
                        result += "Security Status:    " + characterResult.security_status + "\n";
                        result += "Corporation Name:   " + corporationResult.corporation_name + "\n";
                        result += "Corporation Ticker: " + corporationResult.ticker + "\n";
                        result += "Member Count:       " + corporationResult.member_count + "\n";
                        if (allianceResult) {
                            result += "Alliance Name:      " + allianceResult.alliance_name + "\n";
                            result += "Alliance Ticker:    " + allianceResult.ticker;
                        }
                        result += '```';
                        return [2 /*return*/, Bluebird.resolve(result)];
                    case 4:
                        e_1 = _b.sent();
                        return [2 /*return*/, Bluebird.reject(e_1)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return InfoResolver;
}());
InfoResolver = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(inversify_types_1.TYPES.SearchService)),
    __param(1, inversify_1.inject(inversify_types_1.TYPES.CharacterService)),
    __param(2, inversify_1.inject(inversify_types_1.TYPES.AllianceService)),
    __param(3, inversify_1.inject(inversify_types_1.TYPES.CorporationService)),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], InfoResolver);
exports.InfoResolver = InfoResolver;
