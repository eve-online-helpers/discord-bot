import { PriceResolver } from './get-price.resolver';
import { helpResolver as _helpResolver } from './help.resolver';
import { registerResolver as _registerResolver } from './register.resolver';
import { getPiResolver as _getPiResolver } from './get-pi.resolver';
import { aboutResolver as _aboutResolver } from './about-resolver/about.resolver';
import { priceRemindResolver as _priceRemindResolver } from './remind-resolvers/price-remind.resolver';

const pResolver = new PriceResolver();

export const getPriceResolver = pResolver.getPriceResolver;
export const helpResolver = _helpResolver;
export const registerResolver = _registerResolver;
export const getPiResolver = _getPiResolver;
export const priceRemindResolver = _priceRemindResolver;
export const aboutResolver = _aboutResolver;