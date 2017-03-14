"use strict";
const price_reminder_1 = require("./price-reminder");
// const _reminders = {
//     PRICE: PriceReminder.getInstance
// };
function resolveReminderInstance(reminder) {
    switch (reminder.reminderType) {
        case 'PRICE':
            let priceRem = new price_reminder_1.PriceReminder();
            priceRem.reminderData = reminder.reminderData;
            priceRem.from = reminder.from;
            priceRem.reminderType = reminder.reminderType;
            return priceRem;
        default:
            return null;
    }
}
exports.resolveReminderInstance = resolveReminderInstance;
var ReminderType;
(function (ReminderType) {
    ReminderType[ReminderType["PRICE"] = 0] = "PRICE";
})(ReminderType = exports.ReminderType || (exports.ReminderType = {}));
class HandlerResult {
    constructor(response, respondTo, channel) {
        this.response = response;
        this.respondTo = respondTo;
        this.channel = channel;
    }
}
exports.HandlerResult = HandlerResult;
class BaseReminder {
}
exports.BaseReminder = BaseReminder;
