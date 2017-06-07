"use strict";
const axios_1 = require("axios");
const Bluebird = require("bluebird");
const SEARCH_ENDPOINT = 'https://esi.tech.ccp.is/latest/search/?search={searchString}&categories={seachCategories}&strict={strict}';
const NAME_RESOLTION_ENDPOINT = 'https://esi.tech.ccp.is/latest/universe/names/?datasource=tranquility';
function resolveStringToNames(str, isStrict) {
    return new Bluebird((resolve, reject) => {
        axios_1.default.get(SEARCH_ENDPOINT
            .replace('{searchString}', str)
            .replace('{seachCategories}', 'inventorytype')
            .replace('{strict}', isStrict.toString()))
            .then((results) => {
            return (results.data.inventorytype);
        })
            .then((itemsIds) => {
            axios_1.default.post(NAME_RESOLTION_ENDPOINT, itemsIds)
                .then((response) => {
                resolve(response.data);
            })
                .catch(err => {
                reject(err);
            });
        })
            .catch(err => {
            reject(err);
        });
    });
}
exports.resolveStringToNames = resolveStringToNames;
