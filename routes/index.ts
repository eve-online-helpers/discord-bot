import * as express from 'express';
import * as moment from 'moment';
import * as path from 'path';
import * as auth from '../eve-client/auth';
import * as persistanse from '../persistance';
import { UserModel } from '../models/user.model';
import { IVerifyReponseModel } from '../models/verify-response.model';
import { getConfigurations } from '../configurations';

const conf = getConfigurations();
const BASIC_AUTH = new Buffer(`${conf.eveClientId}:${conf.eveClientSecret}`).toString('base64');
const redirectUri = conf.redirectUri + auth.CLIENT_ID;

const router = express.Router();
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
      user.characterId = verifyResponse.data.CharacterID;

      persistanse.addUser(user)
        .then(user => {
          res.send(`<h2>Character ${user.characterName} registered successfully, you can now close the tab</h2>`);
          console.info(`character authenticated successfully: ${JSON.stringify(user, null, 2)}`);
        })
        .catch(errOrUser => {
          if (errOrUser instanceof UserModel) {
            res.send(`<h2>Character ${user.characterName} already registered. you can close window and activate eve-helper</h2>`);
            console.warn(`character already registered: ${JSON.stringify(user, null, 2)}`);
            return;
          }

          res.send(`<h2>Unknown error accured please try again later, or contact ashtar.veres@gmail.com</h2>`);
          console.error(errOrUser);
        });
    })
    .catch((error) => {
      res.send('error');
    });
});

router.get('/authorize/:author_id', function (req, res) {
  res.redirect(`https://login.eveonline.com/oauth/authorize/?response_type=code&redirect_uri=${redirectUri}&scope=publicData esi-planets.manage_planets.v1&state=${req.params.author_id}`);
});

module.exports = router;
