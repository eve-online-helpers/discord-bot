import * as discord from 'discord.js';
import * as messageParser from './parsers/message-parser';

import { UserModel } from '../models/user.model';
import { topParser } from './parsers/top-parser';

const client = new discord.Client();
export function init() {
    client.on('ready', () => {
        console.info('discord::connected');
    });

    client.on('message', (message: discord.Message) => {
        if (message.author.id === '262599809347747842' || message.content.indexOf('<@262599809347747842>') === -1 && message.channel.type !== 'dm') {
            console.info('message not for me, ignoring');
            return;
        }

        console.info('message recieved: ', message.content);
        let messageParts = message.content.split(' ');
        if (messageParts[0].includes('<@262599809347747842>')) {
            messageParts.splice(0, 1);
        }

        let parsedMessage = messageParser.parseMessage(messageParts.join(' '));

        topParser.resolveSubParser(0, parsedMessage)
            .then((response) => {
                message.reply(response);
            })
            .catch(err => {
                console.error(err);
                message.reply('Error processing message, CONCORD forces has been dispached to deal with the problem ASAP. If you see them please pass them this message: ' + err.toString());
            })
    });

    client.login('MjYyNTk5ODA5MzQ3NzQ3ODQy.C1kfyw.FCRoB8zbrSEzcgXzuXb563SgsBQ')
}

export function sendMessage(message: string, user: UserModel) {
    client.users.get(user.authorId).sendMessage(message);
}