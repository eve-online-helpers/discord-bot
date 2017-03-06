import * as Bluebird from 'bluebird';
import { ICharacterService } from './i-character-service';
import { injectable } from 'inversify';


@injectable()
export class CharacterService implements ICharacterService {
    getCharactersIds(searchParam: string, strict: boolean): Bluebird<number[]> {
        // return axios.get
        return Bluebird.resolve([]);
    }

    getCharacterInfoById(id: number): Bluebird<any> {
        return Bluebird.resolve([]);
    }
}