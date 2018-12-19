import { ICharacterPublicResponse } from '../../../models/i-character-public-response.model';

export interface ICharacterService {
    getCharacterInfoById(id: number): Promise<ICharacterPublicResponse>;
}