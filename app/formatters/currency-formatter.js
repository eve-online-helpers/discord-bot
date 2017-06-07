"use strict";
function formatCurrency(price, n, x) {
    const re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return price.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
}
exports.formatCurrency = formatCurrency;
