import * as discord from 'discord.js';
import * as parser from './input-parser';

import { UserModel } from '../models/user.model';
import { StringError } from '../models/string-error';
import { YargsResult } from '../models/yargs-result.model';
import { CommandsBucket } from '../commands';
import { getConfigurations } from '../configurations';

const config = getConfigurations();
const client = new discord.Client();
export function init() {
    client.on('ready', () => {
        console.info('discord::connected');
    });

    client.on('message', (message: discord.Message) => {
        if (message.author.id === '262599809347747842' || !message.content.startsWith('!')) {
            console.info('message not for me, ignoring');
            return;
        }

        console.info('message recieved: ', message.content);
        message.content = normalizeMessage(message.content);

        const parsedMessage = parser.parseInput(message.content);
        CommandsBucket.getResult(parsedMessage, message.author.id)
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

                if (err instanceof StringError) {
                    message.reply(err.message);
                    return;
                }

                message.reply(`Weird error happened, some cov-ops and stealth bombers were dispached to assess the situation, additional info: ${err ? err.toString() : err}`);
            });
    });

    client.login(config.discordToken);
}

function normalizeMessage(message: string) {
    message = message.toLowerCase();
    if (message.includes('<@262599809347747842>')) {
        message = message.replace('<@262599809347747842>', '');
    }
    return message.trim().replace(/ +(?= )/g, '');
}

export function sendMessage(message: string, userId: string) {
    client.users.get(userId).sendMessage(message);
}

