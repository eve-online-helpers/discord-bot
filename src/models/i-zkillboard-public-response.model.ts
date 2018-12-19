export interface IZkillboardPublicResponse {
    calcTrophies: boolean;
    groups: {
        [id: string]: {
            groupID: number;
            shipsLost: number;
            pointsLost: number;
            iskLost: number;
            shipsDestroyed: number;
            pointsDestroyed: number;
            iskDestroyed: number;
        }
    };
    id: number;
    iskDestroyed: number;
    iskLost: number;
    months: {
        [id: string]: {
            year: number;
            month: number;
            shipsLost: number;
            pointsLost: number;
            iskLost: number;
        }
    };
    pointsDestroyed: number;
    pointsLost: number;
    sequence: number;
    shipsDestroyed: number;
    shipsLost: number;
    soloKills: number;
    soloLosses: number;
    topAllTime: any;
    trophies: {
        levels: number;
        max: number;
    };
    type: string;
    activepvp: any[];
    info: {
        allianceID: number;
        corporationID: number;
        factionID: number;
        id: number;
        killID: number;
        lastApiUpdate: {
            sec: number;
            usec: number;
        };
        name: string;
        secStatus: number;
        type: string;
    };
}