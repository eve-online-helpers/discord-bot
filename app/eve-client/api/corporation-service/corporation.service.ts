import axios from 'axios';
import { injectable } from 'inversify';
import { ICorporationPublicResponse } from '../../../models/i-corporation-public-response.model';
import { ICorporationService } from './i-corporation.service';
import { getConfigurations, ConfigModel } from '../../../configurations';

@injectable()
export class CorporationService implements ICorporationService {
    private config: ConfigModel;
    constructor() {
        this.config = getConfigurations();
    }

    getCorporationInfoById(id: number): Promise<ICorporationPublicResponse> {
        return axios.get(this.config.esiApi.corporationInfoEnpoint.replace('{corporationId}', id.toString()))
            .then(r => r.data);
    }

}
