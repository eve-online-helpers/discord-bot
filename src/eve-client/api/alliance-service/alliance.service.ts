import axios from 'axios';
import { injectable } from 'inversify';
import { IAlliancePublicResponse } from '../../../models/i-alliance-public-response.model';
import { IAllianceService } from './i-alliance.service';
import { getConfigurations, ConfigModel } from '../../../configurations';

@injectable()
export class AllianceService implements IAllianceService {
    private config: ConfigModel;
    constructor() {
        this.config = getConfigurations();
    }

    getAllianceInfoById(id: number): Promise<IAlliancePublicResponse> {
        if (!id) {
            return Promise.resolve(null);
        }

        return axios.get(this.config.esiApi.allianceInfoEndpoint.replace('{allianceId}', id.toString()))
            .then<IAlliancePublicResponse>(r => r.data);
    }
}
