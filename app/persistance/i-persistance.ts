import { ItemDBResponse } from '../models/item-db-response.model';
import { StationDBResponse } from '../models/station-db-response';
export interface IPersistance {
    getItemsByName(itemName: string): Promise<ItemDBResponse[]>;
    getStationByName(stationName: string): Promise<StationDBResponse>;
}