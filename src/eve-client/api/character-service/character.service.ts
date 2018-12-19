import axios from 'axios';
import { injectable } from 'inversify';
import { ICharacterPublicResponse } from '../../../models/i-character-public-response.model';
import { ICharacterService } from './i-character.service';
import { getConfigurations, ConfigModel } from '../../../configurations';

@injectable()
export class CharacterService implements ICharacterService {
    private config: ConfigModel;
    constructor() {
        this.config = getConfigurations();
    }

    getCharacterInfoById(id: number): Promise<ICharacterPublicResponse> {
        return axios.get(this.config.esiApi.characterInfoEnpoint.replace('{characterId}', id.toString()))
            .then<ICharacterPublicResponse>(r => r.data);
    }
}