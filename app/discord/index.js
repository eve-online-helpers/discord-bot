"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord = require("discord.js");
const parser = require("./input-parser");
const string_error_1 = require("../models/string-error");
const commands_1 = require("../commands");
const configurations_1 = require("../configurations");
const config = configurations_1.getConfigurations();
const client = new discord.Client();
function init() {
    client.on('ready', () => {
        console.info('discord::connected');
    });
    client.on('message', (message) => {
        if (message.author.id === '262599809347747842' || !message.content.startsWith('!')) {
            console.info('message not for me, ignoring');
            return;
        }
        console.info('message recieved: ', message.content);
        message.content = normalizeMessage(message.content);
        const parsedMessage = parser.parseInput(message.content);
        commands_1.CommandsBucket.getResult(parsedMessage, message.author.id)
            .then(result => {
            console.info(result);
            if (config.replyDisabled) {
                return;
            }
            message.reply(result);
        })
            .catch(err => {
            console.log(err);
            if (config.replyDisabled) {
                return;
            }
            if (err instanceof string_error_1.StringError) {
                message.reply(err.message);
                return;
            }
            message.reply(`Weird error happened, some cov-ops and stealth bombers were dispached to assess the situation, additional info: ${err ? err.toString() : err}`);
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
