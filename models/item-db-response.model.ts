import * as mongo from 'mongodb';

export class ItemDBResponse{
    _id: mongo.ObjectID;
    id:number;
    name: string;
    groupId: number;
}