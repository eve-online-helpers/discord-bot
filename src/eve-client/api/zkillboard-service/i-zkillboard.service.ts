import { IZkillboardPublicResponse } from '../../../models/i-zkillboard-public-response.model';
import { IZkillboardLossesPublicResponse } from '../../../models/i-zkillboard-losses-public-response-model';
import { KillmailDetailsResponse } from '../../../models/killmail-details.response';

export interface IZkillboardService {
    getZkillboardInfoById(id: number): Promise<IZkillboardPublicResponse>;
    getZkillboardLossesById(id: number): Promise<IZkillboardLossesPublicResponse[]>;
    getKillmailsDetails(killmailDataRequests: { killmail_id: number, hash: string }[]): Promise<KillmailDetailsResponse[]>;
}