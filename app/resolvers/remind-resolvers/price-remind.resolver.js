"use strict";
var Bluebird = require("bluebird");
var persistance_1 = require("../../persistance");
var price_reminder_1 = require("../../reminders/price-reminder");
var base_reminder_1 = require("../../reminders/base-reminder");
function priceRemindResolver(yargs, from) {
    return new Bluebird(function (resolve, reject) {
        if (!yargs['item'] || yargs['item'] === '') {
            resolve('`--item` parameter is mandatory');
            return;
        }
        if (!yargs['operator'] || yargs['operator'] === '' || !['<', '>'].includes(yargs['operator'])) {
            resolve('`--operator` parameter is mandatory');
            return;
        }
        if (!yargs['price'] || yargs['price'] === '') {
            resolve('`--price` parameter is mandatory');
            return;
        }
        if (!yargs['type'] || yargs['type'] === '' || !['buy', 'sell'].includes(yargs['type'])) {
            resolve('`--type` parameter is mandatory, and can be only "buy" or "sell"');
            return;
        }
        var ops = [];
        ops.push(persistance_1.getItemByName(yargs['item']));
        ops.push(persistance_1.getStationByName(yargs['from'] || 'jita'));
        Promise.all(ops)
            .then(function (res) {
            var item = res[0];
            var station = res[1];
            var orderType = yargs['type'] || 'sell';
            if (!item) {
                resolve("Item " + yargs['item'] + " not found in EVE universe");
                return;
            }
            if (!station) {
                resolve("Station " + yargs['from'] + " not found in EVE universe");
                return;
            }
            var priceReminder = new price_reminder_1.PriceReminder();
            priceReminder.reminderType = base_reminder_1.ReminderType[base_reminder_1.ReminderType.PRICE];
            priceReminder.reminderData.itemId = item.id;
            priceReminder.reminderData.stationId = station.stationID;
            priceReminder.reminderData.regionId = station.regionID;
            priceReminder.reminderData.operator = yargs['operator'];
            priceReminder.reminderData.price = +yargs['price'];
            priceReminder.reminderData.type = yargs['operator'] || 'sell';
            priceReminder.from = from;
            persistance_1.addReminder(priceReminder)
                .then(function (res) {
                resolve('Reminder as successfuly saves, it will be activated upon reaching condition.');
            })
                .catch(function (err) {
                reject(err);
            });
        });
    });
}
exports.priceRemindResolver = priceRemindResolver;
