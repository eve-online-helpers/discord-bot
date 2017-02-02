"use strict";
function formatCurrency(price) {
    return price.toString().replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}
exports.formatCurrency = formatCurrency;
//# sourceMappingURL=currency-formatter.js.map