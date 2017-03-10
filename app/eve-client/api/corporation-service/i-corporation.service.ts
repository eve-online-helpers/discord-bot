import { ICorporationPublicResponse } from '../../../models/i-corporation-public-response.model';

export interface ICorporationService {
    getCorporationInfoById(id: number): Promise<ICorporationPublicResponse>;
}