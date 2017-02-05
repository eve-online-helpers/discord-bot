"use strict";
var discord = require("discord.js");
var yargs = require("yargs-parser");
var commands_1 = require("../commands");
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
        commands_1.CommandsBucket.getResult(parsedMessage)
            .then(function (result) {
            message.reply(result);
        })
            .catch(function (err) {
            message.reply(err);
        });
    });
    client.login('MjYyNTk5ODA5MzQ3NzQ3ODQy.C1kfyw.FCRoB8zbrSEzcgXzuXb563SgsBQ');
}
exports.init = init;
function normalizeMessage(message) {
    message = message.toLowerCase();
    if (message.includes('<@262599809347747842>')) {
        message = message.replace('<@262599809347747842>', '');
    }
    return message.trim().replace(/ +(?= )/g, '');
}
function sendMessage(message, user) {
    client.users.get(user.authorId).sendMessage(message);
}
exports.sendMessage = sendMessage;
//# sourceMappingURL=index.js.map