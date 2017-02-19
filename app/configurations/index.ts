export interface ConfigModel {
    mongodbConnection?: string;
    redirectUri: string;
    registerUri: string;
    eveClientId?: string;
    eveClientSecret?: string;
    discordToken?: string;
    replyDisabled?: boolean;
}

let _config: ConfigModel;
export function getConfigurations() {
    if (_config) {
        return _config;
    }

    const env = process.env.NODE_ENV || 'dev';
    console.info(`running with ${env} configurations`);

    _config = <ConfigModel>require(`./${env}`).default;
    if (!process.env.DISCORD_TOKEN) {
        throw new Error('DISCORD_TOKEN env variable is required, please set it and run application again');
    }
    if (!process.env.EVE_CLIENT_ID || !process.env.EVE_CLIENT_SECRET) {
        throw new Error('EVE_CLIENT_ID and EVE_CLIENT_SECRET env variables are required, please set them and run application again');
    }
    _config.discordToken = process.env.DISCORD_TOKEN;
    _config.eveClientId = process.env.EVE_CLIENT_ID;
    _config.eveClientSecret = process.env.EVE_CLIENT_SECRET;

    return _config;
}