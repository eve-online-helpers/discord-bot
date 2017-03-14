"use strict";
const _config = {
    redirectUri: 'http://dev.eve-pi-manager.space:3000/callback&client_id=',
    registerUri: 'http://dev.eve-pi-manager.space:3000/authorize/:author_id',
    esiApi: {
        searchEndpoint: 'https://esi.tech.ccp.is/latest/search/?search={searchString}&categories={seachCategories}&strict={strict}',
        characterInfoEnpoint: 'https://esi.tech.ccp.is/latest/characters/{characterId}',
        corporationInfoEnpoint: 'https://esi.tech.ccp.is/latest/corporations/{corporationId}',
        allianceInfoEndpoint: 'https://esi.tech.ccp.is/latest/alliances/{allianceId}',
        zkillboardInfoEndpoint: 'https://zkillboard.com/api/stats/characterID/{characterId}/',
        zkillboardLossesEndpoint: 'https://zkillboard.com/api/losses/characterID/{characterId}/'
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = _config;
