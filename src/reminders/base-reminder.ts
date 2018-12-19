import * as Bluebird from 'bluebird';
import { PriceReminder } from './price-reminder';

// const _reminders = {
//     PRICE: PriceReminder.getInstance
// };
export function resolveReminderInstance(reminder: BaseReminder<any>): BaseReminder<any> {
    switch (reminder.reminderType) {
        case 'PRICE':
            let priceRem = new PriceReminder();
            priceRem.reminderData = reminder.reminderData;
            priceRem.from = reminder.from;
            priceRem.reminderType = reminder.reminderType;
            return priceRem;

        default:
            return null;
    }
}

export enum ReminderType {
    PRICE
}

export class HandlerResult {
    constructor(public response: string, public respondTo: string, public channel?: string) { }
}

export abstract class BaseReminder<T>{
    _id: string;
    from: string;
    reminderType: string;
    reminderData: T;
    abstract handleReminder(): Bluebird<HandlerResult>;
}