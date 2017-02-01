"use strict";
var discord = require("discord.js");
var messageParser = require("./parsers/message-parser");
var top_parser_1 = require("./parsers/top-parser");
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
        var messageParts = message.content.split(' ');
        if (messageParts[0].includes('<@262599809347747842>')) {
            messageParts.splice(0, 1);
        }
        var parsedMessage = messageParser.parseMessage(messageParts.join(' '));
        top_parser_1.topParser.resolveSubParser(0, parsedMessage)
            .then(function (response) {
            message.reply(response);
        })
            .catch(function (err) {
            console.error(err);
            message.reply('Error processing message, CONCORD forces has been dispached to deal with the problem ASAP. If you see them please pass them this message: ' + err.toString());
        });
    });
    client.login('MjYyNTk5ODA5MzQ3NzQ3ODQy.C1kfyw.FCRoB8zbrSEzcgXzuXb563SgsBQ');
}
exports.init = init;
function sendMessage(message, user) {
    client.users.get(user.authorId).sendMessage(message);
}
exports.sendMessage = sendMessage;
//# sourceMappingURL=index.js.map