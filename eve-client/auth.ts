import * as axios from 'axios';
import { ITokenModel } from '../models/token-reponse.model';
import { IVerifyReponseModel } from '../models/verify-response.model';
import { UserModel } from '../models/user.model';

export const CLIENT_ID = '52051e61f940445591822159d8e958d9';
export const CLIENT_SECRET = 'SuY41E0dgsDPAwNQQn9fFAe23B03L5WIedRbZc4Z';
const BASIC_AUTH = new Buffer(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

export function getToken(code: string) {
  return axios.post<ITokenModel>('https://login.eveonline.com/oauth/token',
    {
      grant_type: 'authorization_code',
      code: code
    },
    {
      headers: {
        'Authorization': `Basic ${BASIC_AUTH}`,
        'Content-Type': 'application/json'
      }
    }
  );
}  

export function verifyUser(user: UserModel) {
  return axios.get<IVerifyReponseModel>('https://login.eveonline.com/oauth/verify',
    {
      headers: {
        'Authorization': `Bearer ${user.accessToken}`,
        'Content-Type': 'application/json'
      }
    }
  );
}