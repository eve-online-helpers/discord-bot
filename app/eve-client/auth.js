"use strict";
var axios = require("axios");
exports.CLIENT_ID = '52051e61f940445591822159d8e958d9';
exports.CLIENT_SECRET = 'SuY41E0dgsDPAwNQQn9fFAe23B03L5WIedRbZc4Z';
var BASIC_AUTH = new Buffer(exports.CLIENT_ID + ":" + exports.CLIENT_SECRET).toString('base64');
function getToken(code) {
    return axios.post('https://login.eveonline.com/oauth/token', {
        grant_type: 'authorization_code',
        code: code
    }, {
        headers: {
            'Authorization': "Basic " + BASIC_AUTH,
            'Content-Type': 'application/json'
        }
    });
}
exports.getToken = getToken;
function verifyUser(user) {
    return axios.get('https://login.eveonline.com/oauth/verify', {
        headers: {
            'Authorization': "Bearer " + user.accessToken,
            'Content-Type': 'application/json'
        }
    });
}
exports.verifyUser = verifyUser;
