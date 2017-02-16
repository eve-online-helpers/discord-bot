"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Bluebird = require("bluebird");
var base_reminder_1 = require("./base-reminder");
var PriceReminderModel = (function () {
    function PriceReminderModel() {
    }
    return PriceReminderModel;
}());
exports.PriceReminderModel = PriceReminderModel;
var PriceReminder = (function (_super) {
    __extends(PriceReminder, _super);
    function PriceReminder() {
        var _this = _super.call(this) || this;
        _this.reminderData = new PriceReminderModel();
        return _this;
    }
    PriceReminder.getInstance = function () {
        return new PriceReminder();
    };
    PriceReminder.prototype.handleReminder = function () {
        return Bluebird.resolve(new base_reminder_1.HandlerResult('done', this.from));
    };
    return PriceReminder;
}(base_reminder_1.BaseReminder));
exports.PriceReminder = PriceReminder;
