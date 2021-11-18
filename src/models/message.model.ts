import { BaseModel } from "./base.model";

export class MessageModel extends BaseModel {
    roomId: number;
    fromId: number;
    toId: number;
    message: string;
}