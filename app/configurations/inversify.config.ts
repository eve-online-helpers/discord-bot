import { Container } from 'inversify';
import { IPersistance } from '../persistance/i-persistance';
import { Persistance } from '../persistance/persistance';
import { IResolvable } from '../resolvers/i-resolvable';
import { PriceResolver } from '../resolvers/get-price.resolver';
import { TYPES } from './inversify.types';

export const container = new Container();
container.bind<IPersistance>(TYPES.Perisistance).toConstantValue(new Persistance());
container.bind<IResolvable>(TYPES.PriceResolver).to(PriceResolver);

