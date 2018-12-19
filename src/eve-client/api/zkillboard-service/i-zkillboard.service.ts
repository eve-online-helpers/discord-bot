import { IZkillboardPublicResponse } from '../../../models/i-zkillboard-public-response.model';
import { IZkillboardLossesPublicResponse } from '../../../models/i-zkillboard-losses-public-response-model';

export interface IZkillboardService {
    getZkillboardInfoById(id: number): Promise<IZkillboardPublicResponse>;
    getZkillboardLossesById(id: number): Promise<IZkillboardLossesPublicResponse[]>;
}