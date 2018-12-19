import * as Bluebird from 'bluebird';

import { InsertOneWriteOpResult, Db, MinKey } from 'mongodb';
import { BaseReminder } from '../reminders/base-reminder';
import { UserModel } from '../models/user.model';
import { ItemDBResponse } from '../models/item-db-response.model';
import { StationDBResponse } from '../models/station-db-response';

export interface IPersistance {
    getConnection(): Db;
    getItemsByIds(itemsIds: string[]): Promise<ItemDBResponse[]>;
    getItemsByName(itemName: string): Promise<ItemDBResponse[]>;
    getStationByName(stationName: string): Promise<StationDBResponse | null>;
    getItemByName(itemName: string): Promise<ItemDBResponse | null>;
    // addUser(user: UserModel): Bluebird<UserModel>;
    addReminder(reminder: BaseReminder<any>): Promise<InsertOneWriteOpResult>;
    getReminders(): Promise<BaseReminder<any>[]>;
}