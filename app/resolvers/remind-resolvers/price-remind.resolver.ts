import { ItemDBResponse } from '../../models/item-db-response.model';
import { StationDBResponse } from '../../models/station-db-response';
import { YargsResult } from '../../models/yargs-result.model';
import { PriceReminder } from '../../reminders/price-reminder';
import { ReminderType } from '../../reminders/base-reminder';

import { IPersistance } from '../../persistance/i-persistance';
import { container } from '../../configurations/inversify.config';
import { TYPES } from '../../configurations/inversify.types';

let persistance = container.get<IPersistance>(TYPES.Perisistance);

export function priceRemindResolver(yargs: YargsResult, from: string) {
    return new Promise<string>((resolve, reject) => {
        if (!yargs['item'] || yargs['item'] === '') {
            resolve('`--item` parameter is mandatory');
            return;
        }
        if (!yargs['operator'] || yargs['operator'] === '' || !['<', '>'].includes(<string>yargs['operator'])) {
            resolve('`--operator` parameter is mandatory');
            return;
        }
        if (!yargs['price'] || yargs['price'] === '') {
            resolve('`--price` parameter is mandatory');
            return;
        }
        if (!yargs['type'] || yargs['type'] === '' || !['buy', 'sell'].includes(<string>yargs['type'])) {
            resolve('`--type` parameter is mandatory, and can be only "buy" or "sell"');
            return;
        }

        const ops = [];
        ops.push(persistance.getItemByName(<string>yargs['item']));
        ops.push(persistance.getStationByName(<string>yargs['from'] || 'jita'));

        Promise.all(ops)
            .then(res => {
                const item = <ItemDBResponse>res[0];
                const station = <StationDBResponse>res[1];
                const orderType = <string>yargs['type'] || 'sell';

                if (!item) {
                    resolve(`Item ${yargs['item']} not found in EVE universe`);
                    return;
                }
                if (!station) {
                    resolve(`Station ${yargs['from']} not found in EVE universe`);
                    return;
                }

                let priceReminder = new PriceReminder();
                priceReminder.reminderType = ReminderType[ReminderType.PRICE];
                priceReminder.reminderData.itemId = item.id;
                priceReminder.reminderData.stationId = station.stationID;
                priceReminder.reminderData.regionId = station.regionID;
                priceReminder.reminderData.operator = <string>yargs['operator'];
                priceReminder.reminderData.price = +<string>yargs['price'];
                priceReminder.reminderData.type = <string>yargs['operator'] || 'sell';
                priceReminder.from = from;

                persistance.addReminder(priceReminder)
                    .then(res => {
                        resolve('Reminder as successfuly saves, it will be activated upon reaching condition.');
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
    });
}