
export function formatCurrency(price: number): string {
    return price.toString().replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}