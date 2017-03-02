import { PriceResolver } from './get-price.resolver';
import { helpResolver as _helpResolver } from './help.resolver';
import { registerResolver as _registerResolver } from './register.resolver';
import { getPiResolver as _getPiResolver } from './get-pi.resolver';
import { aboutResolver as _aboutResolver } from './about-resolver/about.resolver';
import { priceRemindResolver as _priceRemindResolver } from './remind-resolvers/price-remind.resolver';
import { container } from '../configurations/inversify.config';
import { TYPES } from '../configurations/inversify.types';
import { IResolvable } from '../resolvers/i-resolvable';

const pResolver = container.get<IResolvable>(TYPES.PriceResolver);
export const getPriceResolver = pResolver;
export const helpResolver = _helpResolver;
export const registerResolver = _registerResolver;
export const getPiResolver = _getPiResolver;
export const priceRemindResolver = _priceRemindResolver;
export const aboutResolver = _aboutResolver;