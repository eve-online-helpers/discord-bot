import { IZkillboardPublicResponse } from '../../../models/i-zkillboard-public-response.model';

export interface IZkillboardService {
    getZkillboardInfoById(id: number): Promise<IZkillboardPublicResponse>;
}