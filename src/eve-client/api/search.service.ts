import axios from 'axios';
import * as Bluebird from 'bluebird';

const SEARCH_ENDPOINT = 'https://esi.evetech.net/latest/search/?search={searchString}&categories={seachCategories}&strict={strict}';
const NAME_RESOLTION_ENDPOINT = 'https://esi.evetech.net/latest/universe/names/?datasource=tranquility';

export function resolveStringToNames(str: string, isStrict: boolean): Bluebird<NameResolutionResponse[]> {
    return new Bluebird<NameResolutionResponse[]>((resolve, reject) => {
        axios.get(SEARCH_ENDPOINT
            .replace('{searchString}', str)
            .replace('{seachCategories}', 'inventorytype')
            .replace('{strict}', isStrict.toString()))
            .then((results) => {
                return (results.data.inventorytype);
            })
            .then((itemsIds: number[]) => {
                axios.post(NAME_RESOLTION_ENDPOINT, itemsIds)
                    .then((response) => {
                        resolve(response.data);
                    })
                    .catch(err => {
                        reject(err);
                    });
            })
            .catch(err => {
                reject(err);
            });
    });

}

interface SearchStringResult {
    inventorytype: number[];
}

interface NameResolutionResponse {
    id: number;
    name: string;
    category: string;
}