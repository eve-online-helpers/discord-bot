import { Container } from 'inversify';
import { IPersistance } from '../persistance/i-persistance';
import { Persistance } from '../persistance/index';

const container = new Container();
// container.bind<IPersistance>('Persistance').to(Persistance);