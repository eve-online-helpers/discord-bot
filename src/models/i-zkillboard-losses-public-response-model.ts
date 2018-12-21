export interface IZkillboardLossesPublicResponse {
    killmail_id: number;
    zkb: {
        locationID: number;
        hash: string;
        fittedValue: number;
        totalValue: number;
        points: number;
        npc: boolean;
        solo: boolean;
        awox: boolean;
    };
}