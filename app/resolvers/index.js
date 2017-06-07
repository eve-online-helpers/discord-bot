"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const register_resolver_1 = require("./register.resolver");
const get_pi_resolver_1 = require("./get-pi.resolver");
const about_resolver_1 = require("./about-resolver/about.resolver");
const price_remind_resolver_1 = require("./remind-resolvers/price-remind.resolver");
const inversify_config_1 = require("../configurations/inversify.config");
const inversify_types_1 = require("../configurations/inversify.types");
const pResolver = inversify_config_1.container.get(inversify_types_1.TYPES.PriceResolver);
const iResolver = inversify_config_1.container.get(inversify_types_1.TYPES.InfoResolver);
const hResolver = inversify_config_1.container.get(inversify_types_1.TYPES.HelpResolver);
exports.getPriceResolver = pResolver;
exports.infoResolver = iResolver;
exports.helpResolver = hResolver;
exports.registerResolver = register_resolver_1.registerResolver;
exports.getPiResolver = get_pi_resolver_1.getPiResolver;
exports.priceRemindResolver = price_remind_resolver_1.priceRemindResolver;
exports.aboutResolver = about_resolver_1.aboutResolver;
//# sourceMappingURL=index.js.map