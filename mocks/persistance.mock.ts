import { ItemDBResponse } from '../app/models/item-db-response.model';
import { StationDBResponse } from '../app/models/station-db-response';
import { IPersistance } from '../app/persistance/i-persistance';
export class PersistanceMock implements IPersistance {
    getItemsByName(mockItemName: string): Promise<ItemDBResponse[]> {
        switch (mockItemName) {
            case 'UNKNOWN_ITEM':
                return Promise.resolve([]);
            case 'MANY_ITEMS':
                return Promise.resolve(new Array(21));
        }
    }

    getStationByName(stationNme: string): Promise<StationDBResponse> {
        return Promise.resolve(new StationDBResponse());
    }
}