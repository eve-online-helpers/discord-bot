import { ConfigModel } from './';

const _config: ConfigModel = {
    mongodbConnection: 'mongodb://localhost:27017/eve-discord-bot',
    redirectUri: 'http://dev.eve-pi-manager.space:3000/callback&client_id=',
    registerUri: 'http://dev.eve-pi-manager.space:3000/authorize/:author_id',
    replyDisabled: false
};

export default _config;