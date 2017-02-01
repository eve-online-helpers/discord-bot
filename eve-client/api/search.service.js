"use strict";
var axios = require("axios");
var Bluebird = require("bluebird");
var SEARCH_ENDPOINT = 'https://esi.tech.ccp.is/latest/search/?search={searchString}&categories={seachCategories}&strict={strict}';
var NAME_RESOLTION_ENDPOINT = 'https://esi.tech.ccp.is/latest/universe/names/?datasource=tranquility';
function resolveStringToNames(str, isStrict) {
    return new Bluebird(function (resolve, reject) {
        axios.get(SEARCH_ENDPOINT
            .replace('{searchString}', str)
            .replace('{seachCategories}', 'inventorytype')
            .replace('{strict}', isStrict.toString()))
            .then(function (results) {
            return (results.data.inventorytype);
        })
            .then(function (itemsIds) {
            axios.post(NAME_RESOLTION_ENDPOINT, itemsIds)
                .then(function (response) {
                resolve(response.data);
            })
                .catch(function (err) {
                reject(err);
            });
        })
            .catch(function (err) {
            reject(err);
        });
    });
}
exports.resolveStringToNames = resolveStringToNames;
//# sourceMappingURL=search.service.js.map