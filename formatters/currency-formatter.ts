
export function formatCurrency(price: number, n?: number, x?: number): string {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return price.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
}