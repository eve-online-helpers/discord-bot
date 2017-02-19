import * as Bluebird from 'bluebird';
import * as _ from 'lodash';
import { getReminders } from '../persistance';
import { BaseReminder, resolveReminderInstance } from '../reminders/base-reminder';
import { sendMessage } from '../discord';

let _isSchedulerActive = false;
let _repeatInterval: number;
export function startScheduler(repeatInterval: number) {
    console.info('scheduler:: startScheduler:: started');

    _repeatInterval = repeatInterval;
    _isSchedulerActive = true;
    iterationRun();
}

export function stopScheduler() {
    console.info('scheduler:: stopScheduler:: stopped');

    _isSchedulerActive = false;
}

function iterationRun() {
    setTimeout(() => {
        console.info('scheduler:: iterationRun:: iteration start');
        getReminders()
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

                            sendMessage(result.response, result.respondTo);
                        });

                        if (_isSchedulerActive) {
                            iterationRun();
                        }
                    }));
            });
    }, _repeatInterval);
}

function getReminderHandlers(reminders: BaseReminder<any>[]) {
    let handlers: { [id: string]: () => Bluebird<string> } = {};
    reminders.forEach(reminder => {
        const reminderInstance = resolveReminderInstance(reminder);
        if (!reminderInstance) {
            console.error(`scheduler:: iterationRun:: reminder of type ${reminder.reminderType} not found`);
            return;
        }

        handlers[reminder._id.toString()] = resolveReminderInstance(reminder).handleReminder();
    });
    return handlers;
}