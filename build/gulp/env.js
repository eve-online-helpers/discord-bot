const fs = require('fs');
const env = require('gulp-env');

try {
    const vars = fs.readFileSync('./env.json');
    env({
        DISCORD_TOKEN: vars.DISCORD_TOKEN,
        EVE_CLIENT_ID: vars.EVE_CLIENT_ID,
        EVE_CLIENT_SECRET: vars.EVE_CLIENT_SECRET
    });
} catch (e) {
    console.error(e);
}
