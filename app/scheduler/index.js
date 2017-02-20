"use strict";
var Bluebird = require("bluebird");
var _ = require("lodash");
var persistance_1 = require("../persistance");
var base_reminder_1 = require("../reminders/base-reminder");
var discord_1 = require("../discord");
var _isSchedulerActive = false;
var _repeatInterval;
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
    setTimeout(function () {
        console.info('scheduler:: iterationRun:: iteration start');
        persistance_1.getReminders()
            .then(function (reminders) {
            console.info('scheduler:: iterationRun:: reminders recieved from db');
            var handlers = getReminderHandlers(reminders);
            Bluebird.props(handlers)
                .then((function (results) {
                console.log(JSON.stringify(results));
                console.info('scheduler:: iterationRun:: reminders resolved');
                _.forOwn(results, function (result) {
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
    var handlers = {};
    reminders.forEach(function (reminder) {
        var reminderInstance = base_reminder_1.resolveReminderInstance(reminder);
        if (!reminderInstance) {
            console.error("scheduler:: iterationRun:: reminder of type " + reminder.reminderType + " not found");
            return;
        }
        handlers[reminder._id.toString()] = base_reminder_1.resolveReminderInstance(reminder).handleReminder;
    });
    return handlers;
}
