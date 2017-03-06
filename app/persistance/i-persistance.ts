import * as Bluebird from 'bluebird';

import { InsertOneWriteOpResult, Db } from 'mongodb';
import { BaseReminder } from '../reminders/base-reminder';
import { UserModel } from '../models/user.model';
import { ItemDBResponse } from '../models/item-db-response.model';
import { StationDBResponse } from '../models/station-db-response';

export interface IPersistance {
    getConnection(): Db;
    getItemsByName(itemName: string): Promise<ItemDBResponse[]>;
    getStationByName(stationName: string): Promise<StationDBResponse>;
    getItemByName(itemName: string): Promise<ItemDBResponse>;
    addUser(user: UserModel): Bluebird<UserModel>;
    addReminder(reminder: BaseReminder<any>): Promise<InsertOneWriteOpResult>;
    getReminders(): Promise<BaseReminder<any>[]>;
}