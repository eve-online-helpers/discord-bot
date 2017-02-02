import { UserModel } from '../models/user.model';

let registeredUsers: { [id: string]: UserModel } = {};

export function getUser(user: UserModel) {
    return registeredUsers[user.authorId + user.characterId];
}

export function registerUser(user: UserModel) {
    registeredUsers[user.authorId + user.characterId];
}