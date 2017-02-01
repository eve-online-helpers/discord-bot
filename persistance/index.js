"use strict";
var registeredUsers = {};
function getUser(user) {
    return registeredUsers[user.authorId + user.characterId];
}
exports.getUser = getUser;
function registerUser(user) {
    registeredUsers[user.authorId + user.characterId];
}
exports.registerUser = registerUser;
//# sourceMappingURL=index.js.map