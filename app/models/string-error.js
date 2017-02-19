"use strict";
var StringError = (function () {
    function StringError(message) {
        this.message = message;
    }
    return StringError;
}());
exports.StringError = StringError;
