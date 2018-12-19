import { CommandsBucket as _CommandsBucket } from './command-bucket';
import * as resolvers from '../resolvers';

_CommandsBucket.addResolver('p', resolvers.getPriceResolver);
_CommandsBucket.addResolver('c', resolvers.infoResolver);
_CommandsBucket.addResolver('help', resolvers.helpResolver);
_CommandsBucket.addResolver('roll', resolvers.rollResolver);
// _CommandsBucket.addResolver('about', resolvers.aboutResolver);
// _CommandsBucket.addResolver('remind price', resolvers.priceRemindResolver);
// _CommandsBucket.addResolver('get pi', resolvers.getPiResolver);

export const CommandsBucket = _CommandsBucket;