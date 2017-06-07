"use strict";
const version = require('../../../version.json').version;
function aboutResolver(input) {
    let result = `\`\`\`EVE discord bot, version ${version}\`\`\``;
    return new Promise((resolve, reject) => {
        resolve(result);
    });
}
exports.aboutResolver = aboutResolver;
