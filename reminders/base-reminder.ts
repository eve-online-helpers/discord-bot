import * as Bluebird from 'Bluebird';

export function resolveReminder() {
    
}

export enum ReminderType{
    PRICE
}

export abstract class BaseReminder<T>{
    from:string;
    reminderType: string;
    reminderData: T;

    abstract handleReminder(): Bluebird<string>;
}