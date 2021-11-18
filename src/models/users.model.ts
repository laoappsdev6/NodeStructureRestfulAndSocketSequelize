import { BaseModel } from "./base.model";

export class UsersModel extends BaseModel {
    name: string;
    phoneNumber: string;
    username: string;
    password: string;
    hashPassword: (password: string) => string;
    validPassword: (password: string) => boolean;
}