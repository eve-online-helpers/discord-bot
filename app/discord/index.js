"use strict";
var discord = require("discord.js");
var yargs = require("yargs-parser");
var string_error_1 = require("../models/string-error");
var commands_1 = require("../commands");
var configurations_1 = require("../configurations");
var config = configurations_1.getConfigurations();
var client = new discord.Client();
function init() {
    client.on('ready', function () {
        console.info('discord::connected');
    });
    client.on('message', function (message) {
        if (message.author.id === '262599809347747842' || message.content.indexOf('<@262599809347747842>') === -1 && message.channel.type !== 'dm') {
            console.info('message not for me, ignoring');
            return;
        }
        console.info('message recieved: ', message.content);
        message.content = normalizeMessage(message.content);
        var parsedMessage = yargs(message.content);
        commands_1.CommandsBucket.getResult(parsedMessage, message.author.id)
            .then(function (result) {
            console.info(result);
            if (config.replyDisabled) {
                return;
            }
            message.reply(result);
        })
            .catch(function (err) {
            console.log(err);
            if (config.replyDisabled) {
                return;
            }
            if (err instanceof string_error_1.StringError) {
                message.reply(err.message);
                return;
            }
            message.reply('Weird error happened, some cov-ops and stealth bombers were dispached to assess the situation, additional info: ', err);
        });
    });
    client.login(config.discordToken);
}
exports.init = init;
function normalizeMessage(message) {
    message = message.toLowerCase();
    if (message.includes('<@262599809347747842>')) {
        message = message.replace('<@262599809347747842>', '');
    }
    return message.trim().replace(/ +(?= )/g, '');
}
function sendMessage(message, userId) {
    client.users.get(userId).sendMessage(message);
}
exports.sendMessage = sendMessage;
