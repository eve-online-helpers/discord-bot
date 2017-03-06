import * as Bluebird from 'bluebird';

import { InsertOneWriteOpResult, Db } from 'mongodb';
import { BaseReminder } from '../app/reminders/base-reminder';
import { UserModel } from '../app/models/user.model';
import { ItemDBResponse } from '../app/models/item-db-response.model';
import { StationDBResponse } from '../app/models/station-db-response';
import { IPersistance } from '../app/persistance/i-persistance';
export class PersistanceMock implements IPersistance {
    getConnection(): Db {
        return null;
    }

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

    getItemByName(itemName: string): Promise<ItemDBResponse> {
        return Promise.resolve(null);
    }
    addUser(user: UserModel): Bluebird<UserModel> {
        return Bluebird.resolve(null);
    }
    addReminder(reminder: BaseReminder<any>): Promise<InsertOneWriteOpResult> {
        return Promise.resolve(null);
    }
    getReminders(): Promise<BaseReminder<any>[]> {
        return Promise.resolve(null);
    }
}