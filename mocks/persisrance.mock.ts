export function getItemsByName(mockItemName: string) {
    switch (mockItemName) {
        case 'UNKNOWN_ITEM':
            return Promise.resolve([]);
    }
}