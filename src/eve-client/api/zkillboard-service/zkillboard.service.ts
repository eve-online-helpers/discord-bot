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

    async getZkillboardInfoById(id: number): Promise<IZkillboardPublicResponse | null> {
        if (!id) {
            return null;
        }

        const response = await axios.get(this.config.esiApi.zkillboardInfoEndpoint.replace('{characterId}', id.toString()));
        return response.data;
    }

    async getZkillboardLossesById(id: number): Promise<IZkillboardLossesPublicResponse[] | null> {
        if (!id) {
            return null;
        }

        const response = await axios.get(this.config.esiApi.zkillboardLossesEndpoint.replace('{characterId}', id.toString()));
        return response.data;
    }

}
