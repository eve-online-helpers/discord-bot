import { Container } from 'inversify';
import { ISearchService, SearchService } from '../eve-client/api/search-service';
import { ICharacterService, CharacterService } from '../eve-client/api/character-service';
import { ICorporationService, CorporationService } from '../eve-client/api/corporation-service';
import { IAllianceService, AllianceService } from '../eve-client/api/alliance-service';
import { IPersistance } from '../persistance/i-persistance';
import { Persistance } from '../persistance/persistance';
import { IResolvable } from '../resolvers/i-resolvable';
import { InfoResolver } from '../resolvers/info-resolver/info-resolver';
import { PriceResolver } from '../resolvers/get-price.resolver';
import { HelpResolver } from '../resolvers/help-resolver/help.resolver';
import { TYPES } from './inversify.types';

export const container = new Container();
container.bind<IPersistance>(TYPES.Perisistance).toConstantValue(new Persistance());
container.bind<ISearchService>(TYPES.SearchService).toConstantValue(new SearchService());
container.bind<ICharacterService>(TYPES.CharacterService).toConstantValue(new CharacterService());
container.bind<ICorporationService>(TYPES.CorporationService).toConstantValue(new CorporationService());
container.bind<IAllianceService>(TYPES.AllianceService).toConstantValue(new AllianceService());
container.bind<IResolvable>(TYPES.PriceResolver).to(PriceResolver);
container.bind<IResolvable>(TYPES.InfoResolver).to(InfoResolver);
container.bind<IResolvable>(TYPES.HelpResolver).to(HelpResolver);

