import * as Bluebird from 'Bluebird';
import { BaseReminder } from './base-reminder';

export class PriceReminderModel {
    itemId: number;
    stationId: number;
    regionId: number;
    operator: string;
    price: number;
    type: string;
}

export class PriceReminder extends BaseReminder<PriceReminderModel>{
    constructor() {
        super();
        this.reminderData = new PriceReminderModel();
    }

    handleReminder(): Bluebird<string> {

    }
}