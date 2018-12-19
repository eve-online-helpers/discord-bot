import * as dotenv from 'dotenv';
dotenv.config();

import './configurations/inversify.config';
import * as discord from './discord';

discord.init();
