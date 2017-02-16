"use strict";
var express = require("express");
var moment = require("moment");
var auth = require("../eve-client/auth");
var persistanse = require("../persistance");
var user_model_1 = require("../models/user.model");
var configurations_1 = require("../configurations");
var conf = configurations_1.getConfigurations();
var BASIC_AUTH = new Buffer(conf.eveClientId + ":" + conf.eveClientSecret).toString('base64');
var redirectUri = conf.redirectUri + auth.CLIENT_ID;
var router = express.Router();
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get('/callback', function (req, res) {
    var code = req.query['code'];
    var author_id = req.query['state'];
    var user = new user_model_1.UserModel();
    auth.getToken(code)
        .then(function (response) {
        user.accessToken = response.data.access_token;
        user.refreshToken = response.data.refresh_token;
        user.authorId = author_id;
        user.accessTokenTTL = moment().add(response.data.expires_in, 'seconds').toDate();
        return user;
    })
        .then(auth.verifyUser)
        .then(function (verifyResponse) {
        user.characterName = verifyResponse.data.CharacterName;
        user.characterId = verifyResponse.data.CharacterID;
        persistanse.addUser(user)
            .then(function (user) {
            res.send("<h2>Character " + user.characterName + " registered successfully, you can now close the tab</h2>");
            console.info("character authenticated successfully: " + JSON.stringify(user, null, 2));
        })
            .catch(function (errOrUser) {
            if (errOrUser instanceof user_model_1.UserModel) {
                res.send("<h2>Character " + user.characterName + " already registered. you can close window and activate eve-helper</h2>");
                console.warn("character already registered: " + JSON.stringify(user, null, 2));
                return;
            }
            res.send("<h2>Unknown error accured please try again later, or contact ashtar.veres@gmail.com</h2>");
            console.error(errOrUser);
        });
    })
        .catch(function (error) {
        res.send('error');
    });
});
router.get('/authorize/:author_id', function (req, res) {
    res.redirect("https://login.eveonline.com/oauth/authorize/?response_type=code&redirect_uri=" + redirectUri + "&scope=publicData esi-planets.manage_planets.v1&state=" + req.params.author_id);
});
module.exports = router;
