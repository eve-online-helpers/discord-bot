

export interface HubData {
    hubName: string;
    hubPrettyName: string;
    hubId: number;
    regionId: number;
}

export const tradeHubsIds = new Map<string, HubData>();
tradeHubsIds.set('jita', {
    hubId: 60003760,
    hubName: 'jita',
    hubPrettyName: 'Jita',
    regionId: 10000002
});
tradeHubsIds.set('amarr', {
    hubId: 60008494,
    hubName: 'amarr',
    hubPrettyName: 'Amarr',
    regionId: 10000043
});
tradeHubsIds.set('dodixie', {
    hubId: 60011866,
    hubName: 'dodixie',
    hubPrettyName: 'Dodixie',
    regionId: 10000032
});
tradeHubsIds.set('rens', {
    hubId: 60004588,
    hubName: 'rens',
    hubPrettyName: 'Rens',
    regionId: 10000030
});
tradeHubsIds.set('hek', {
    hubId: 60005686,
    hubName: 'hek',
    hubPrettyName: 'Hek',
    regionId: 10000042
});
