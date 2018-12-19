import { IAlliancePublicResponse } from '../../../models/i-alliance-public-response.model';

export interface IAllianceService {
    getAllianceInfoById(id: number): Promise<IAlliancePublicResponse | null>;
}