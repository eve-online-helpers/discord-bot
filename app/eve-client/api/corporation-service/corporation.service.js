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
var axios_1 = require("axios");
var inversify_1 = require("inversify");
var configurations_1 = require("../../../configurations");
var CorporationService = (function () {
    function CorporationService() {
        this.config = configurations_1.getConfigurations();
    }
    CorporationService.prototype.getCorporationInfoById = function (id) {
        return axios_1.default.get(this.config.esiApi.corporationInfoEnpoint.replace('{corporationId}', id.toString()))
            .then(function (r) { return r.data; });
    };
    return CorporationService;
}());
CorporationService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], CorporationService);
exports.CorporationService = CorporationService;