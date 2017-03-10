"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
require("reflect-metadata");
var Bluebird = require("bluebird");
var inversify_1 = require("inversify");
var HelpResolver = (function () {
    function HelpResolver() {
    }
    HelpResolver.prototype.resolveMessage = function (input) {
        return new Bluebird(function (resolve, reject) {
            var help = 'Hello, and welcome to eve-helper! \n' +
                'You can use eve-helper from public channel by referencing it buy name or you can write a private message.\n\n' +
                '__The following commands are avaiable without registration:__\n' +
                '```' +
                '!help           This help message\n' +
                '!p <item>       Get sell and buy prices for items that match item (full or partial) for additional info run <!p !help>\n' +
                '!c <character>  Get details for character, it\'s corporation and alliance if any. (note: search is strict)\n\n' +
                '```\n';
            // help +=
            // '__The following commands are available but require authentication:__\n' +
            // '```' +
            // 'get pi      Get information about planetary interaction, please run `get pi --help` for more info```';
            resolve(help);
        });
    };
    return HelpResolver;
}());
HelpResolver = __decorate([
    inversify_1.injectable()
], HelpResolver);
exports.HelpResolver = HelpResolver;
