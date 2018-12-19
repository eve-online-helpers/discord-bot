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

    async getAllianceInfoById(id: number): Promise<IAlliancePublicResponse | null> {
        if (!id) {
            return null;
        }

        const response = await axios.get<IAlliancePublicResponse>(this.config.esiApi.allianceInfoEndpoint.replace('{allianceId}', id.toString()));
        return response.data;
    }
}
