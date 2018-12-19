import * as Bluebird from 'bluebird';
import { BaseReminder, HandlerResult } from './base-reminder';

export class PriceReminderModel {
    itemId: number;
    stationId: number;
    regionId: number;
    operator: string;
    price: number;
    type: string;
}

export class PriceReminder extends BaseReminder<PriceReminderModel> {
    constructor() {
        super();
        this.reminderData = new PriceReminderModel();
    }

    static getInstance() {
        return new PriceReminder();
    }

    handleReminder(): Bluebird<HandlerResult> {
        return Bluebird.resolve(new HandlerResult('done', this.from));
    }
}