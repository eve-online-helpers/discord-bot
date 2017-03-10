"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
require("reflect-metadata");
var axios_1 = require("axios");
var inversify_1 = require("inversify");
var configurations_1 = require("../../../configurations");
var SearchService = (function () {
    function SearchService() {
        this.config = configurations_1.getConfigurations();
    }
    SearchService.prototype.searchByStringForCategories = function (search, categores, strict) {
        if (strict === void 0) { strict = true; }
        var endpoint = this.config.esiApi.searchEndpoint
            .replace('{searchString}', search)
            .replace('{seachCategories}', categores.join(','))
            .replace('{strict}', strict.toString());
        endpoint = encodeURI(endpoint);
        return axios_1.default.get(endpoint)
            .then(function (r) { return r.data; });
    };
    return SearchService;
}());
SearchService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], SearchService);
exports.SearchService = SearchService;
