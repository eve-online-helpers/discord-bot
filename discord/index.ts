import * as discord from 'discord.js';
import * as yargs from 'yargs-parser';

import { UserModel } from '../models/user.model';
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
        if (message.author.id === '262599809347747842' || message.content.indexOf('<@262599809347747842>') === -1 && message.channel.type !== 'dm') {
            console.info('message not for me, ignoring');
            return;
        }

        console.info('message recieved: ', message.content);
        message.content = normalizeMessage(message.content);

        const parsedMessage = <YargsResult>yargs(message.content);
        CommandsBucket.getResult(parsedMessage, message.author.id)
            .then(result => {
                console.info(result);
                if(config.replyDisabled){
                    return;
                }

                message.reply(result);
            })
            .catch(err => {
                console.log(err);
                if(config.replyDisabled){
                    return;
                }

                message.reply('Weird error happened, some cov-ops and stealth bombers were dispached to assess the situation, additional info: ', err);
            })
    });

    client.login(config.discordToken)
}

function normalizeMessage(message: string) {
    message = message.toLowerCase();
    if (message.includes('<@262599809347747842>')) {
        message = message.replace('<@262599809347747842>', '');
    }
    return message.trim().replace(/ +(?= )/g, '');
}

export function sendMessage(message: string, user: UserModel) {
    client.users.get(user.authorId).sendMessage(message);
}