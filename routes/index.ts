import * as express from 'express';
import * as moment from 'moment';
import * as auth from '../eve-client/auth';
import * as persistanse from '../persistance';
import * as discord from '../discord';
import { UserModel } from '../models/user.model';
import { IVerifyReponseModel } from '../models/verify-response.model';
var router = express.Router();

const CLIENT_ID = '52051e61f940445591822159d8e958d9';
const CLIENT_SECRET = 'SuY41E0dgsDPAwNQQn9fFAe23B03L5WIedRbZc4Z';

const BASIC_AUTH = new Buffer(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

/* GET home page. */
router.get('/', function (req: express.Request, res: express.Response, next) {
  res.render('index', { title: 'Express' });
});

router.get('/callback', function (req: express.Request, res: express.Response) {
  let code = req.query['code'];
  let author_id = req.query['state'];

  let user = new UserModel();
  auth.getToken(code)
    .then((response) => {
      user.accessToken = response.data.access_token;
      user.refreshToken = response.data.refresh_token;
      user.authorId = author_id;
      user.accessTokenTTL = moment().add(response.data.expires_in, 'seconds').toDate();

      return user;
    })
    .then(auth.verifyUser)
    .then((verifyResponse) => {
      user.characterName = verifyResponse.data.CharacterName;
      user.characterId = verifyResponse.data.CharacterID

      // persistanse.registerUser(user);

      discord.sendMessage('Hurray! User registered successfully, type help to see what else you can do', user);
      res.send(`<h2>User registered successfully, you can now close the tab</h2>`);
    })
    .catch((error) => {
      res.send('error');
    });
});

router.get('/authorize/:author_id', function (req, res) {
  res.redirect(`https://login.eveonline.com/oauth/authorize/?response_type=code&redirect_uri=http://dev.eve-pi-manager.space:3000/callback&client_id=${auth.CLIENT_ID}&scope=publicData esi-planets.manage_planets.v1&state=${req.params.author_id}`);
});

module.exports = router;
