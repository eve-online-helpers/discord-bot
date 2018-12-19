import axios from 'axios';
import { injectable } from 'inversify';
import { IZkillboardPublicResponse } from '../../../models/i-zkillboard-public-response.model';
import { IZkillboardLossesPublicResponse } from '../../../models/i-zkillboard-losses-public-response-model';
import { IZkillboardService } from './i-zkillboard.service';
import { getConfigurations, ConfigModel } from '../../../configurations';

@injectable()
export class ZkillboardService implements IZkillboardService {
    private config: ConfigModel;
    constructor() {
        this.config = getConfigurations();
    }

    getZkillboardInfoById(id: number): Promise<IZkillboardPublicResponse> {
        if (!id) {
            return Promise.resolve(null);
        }

        return axios.get(this.config.esiApi.zkillboardInfoEndpoint.replace('{characterId}', id.toString()))
            .then(r => r.data);
    }

    getZkillboardLossesById(id: number): Promise<IZkillboardLossesPublicResponse[]> {
        if (!id) {
            return Promise.resolve(null);
        }

        return axios.get(this.config.esiApi.zkillboardLossesEndpoint.replace('{characterId}', id.toString()))
            .then(r => r.data);
    }

}
