"use strict";
var PersistanceMock = (function () {
    function PersistanceMock() {
    }
    PersistanceMock.prototype.getItemsByName = function (mockItemName) {
        switch (mockItemName) {
            case 'UNKNOWN_ITEM':
                return Promise.resolve([]);
        }
    };
    return PersistanceMock;
}());
exports.PersistanceMock = PersistanceMock;
