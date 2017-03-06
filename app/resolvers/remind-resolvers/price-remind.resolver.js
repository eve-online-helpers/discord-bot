"use strict";
var Bluebird = require("bluebird");
var price_reminder_1 = require("../../reminders/price-reminder");
var base_reminder_1 = require("../../reminders/base-reminder");
var inversify_config_1 = require("../../configurations/inversify.config");
var inversify_types_1 = require("../../configurations/inversify.types");
var persistance = inversify_config_1.container.get(inversify_types_1.TYPES.Perisistance);
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
        ops.push(persistance.getItemByName(yargs['item']));
        ops.push(persistance.getStationByName(yargs['from'] || 'jita'));
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
            persistance.addReminder(priceReminder)
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
