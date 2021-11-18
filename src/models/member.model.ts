import { BaseModel } from "./base.model";

export class MemberModel extends BaseModel {
    userId: number;
    roomId: string;
}