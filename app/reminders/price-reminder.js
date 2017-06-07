"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bluebird = require("bluebird");
const base_reminder_1 = require("./base-reminder");
class PriceReminderModel {
}
exports.PriceReminderModel = PriceReminderModel;
class PriceReminder extends base_reminder_1.BaseReminder {
    constructor() {
        super();
        this.reminderData = new PriceReminderModel();
    }
    static getInstance() {
        return new PriceReminder();
    }
    handleReminder() {
        return Bluebird.resolve(new base_reminder_1.HandlerResult('done', this.from));
    }
}
exports.PriceReminder = PriceReminder;
//# sourceMappingURL=price-reminder.js.map