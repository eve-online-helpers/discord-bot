import { CommandsBucket as _CommandsBucket} from './command-bucket';
import * as resolvers from '../resolvers';

_CommandsBucket.addResolver('get price', resolvers.getPriceResolver);
_CommandsBucket.addResolver('help', resolvers.helpResolver);

export const CommandsBucket = _CommandsBucket;