export interface IZkillboardLossesPublicResponse {
    killID: number;
    solarSystemID: number;
    killTime: string;
    moonID: number;
    victim: {
        shipTypeID: number;
        characterID: number;
        characterName: string;
        corporationID: number;
        corporationName: number;
        allianceID: number;
        allianceName: string;
        factionID: number;
        factionName: string;
        damageTaken: string;
    };
}