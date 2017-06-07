"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bluebird = require("bluebird");
const _ = require("lodash");
const inversify_config_1 = require("../configurations/inversify.config");
const inversify_types_1 = require("../configurations/inversify.types");
const base_reminder_1 = require("../reminders/base-reminder");
const discord_1 = require("../discord");
const persistance = inversify_config_1.container.get(inversify_types_1.TYPES.Perisistance);
let _isSchedulerActive = false;
let _repeatInterval;
function startScheduler(repeatInterval) {
    console.info('scheduler:: startScheduler:: started');
    _repeatInterval = repeatInterval;
    _isSchedulerActive = true;
    iterationRun();
}
exports.startScheduler = startScheduler;
function stopScheduler() {
    console.info('scheduler:: stopScheduler:: stopped');
    _isSchedulerActive = false;
}
exports.stopScheduler = stopScheduler;
function iterationRun() {
    setTimeout(() => {
        console.info('scheduler:: iterationRun:: iteration start');
        persistance.getReminders()
            .then(reminders => {
            console.info('scheduler:: iterationRun:: reminders recieved from db');
            let handlers = getReminderHandlers(reminders);
            Bluebird.props(handlers)
                .then((results => {
                console.log(JSON.stringify(results));
                console.info('scheduler:: iterationRun:: reminders resolved');
                _.forOwn(results, (result) => {
                    if (!result) {
                        return;
                    }
                    discord_1.sendMessage(result.response, result.respondTo);
                });
                if (_isSchedulerActive) {
                    iterationRun();
                }
            }));
        });
    }, _repeatInterval);
}
function getReminderHandlers(reminders) {
    let handlers = {};
    reminders.forEach(reminder => {
        const reminderInstance = base_reminder_1.resolveReminderInstance(reminder);
        if (!reminderInstance) {
            console.error(`scheduler:: iterationRun:: reminder of type ${reminder.reminderType} not found`);
            return;
        }
        handlers[reminder._id.toString()] = base_reminder_1.resolveReminderInstance(reminder).handleReminder;
    });
    return handlers;
}
//# sourceMappingURL=index.js.map