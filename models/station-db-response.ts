import * as mongo from 'mongodb';

export class StationDBResponse {
    _id: mongo.ObjectID;
    regionID: number;
    solarSystemID: number;
    stationID: number;
    stationName: string;
    reprocessingEfficiency: number;
    security: number;
}