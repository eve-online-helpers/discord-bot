import * as Bluebird from 'bluebird';

export interface ICharacterService {
    getCharactersIds(searchParam: string, strict: boolean): Bluebird<number[]>;
    getCharacterInfoById(id: number): Bluebird<any>;
}