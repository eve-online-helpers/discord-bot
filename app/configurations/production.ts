import { ConfigModel } from './';

const _config: ConfigModel = {
    redirectUri: 'http://dev.eve-pi-manager.space:3000/callback&client_id=',
    registerUri: 'http://dev.eve-pi-manager.space:3000/authorize/:author_id',
    esiApi: {
        searchEndpoint: 'https://esi.tech.ccp.is/latest/search/?search={searchString}&categories={seachCategories}&strict={strict}'
    }
};

export default _config;