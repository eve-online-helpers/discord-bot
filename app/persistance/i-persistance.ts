import { ItemDBResponse } from '../models/item-db-response.model';
export interface IPersistance {
    getItemsByName(itemName: string): Promise<ItemDBResponse[]>;
}