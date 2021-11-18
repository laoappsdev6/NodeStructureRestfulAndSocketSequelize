import { EUsersMethod } from "../services/method";
import { Request } from '../servers/Request'
import { Response } from '../servers/Response'
import { EMsg, EStatus } from "../services/message";
import { Service } from "../services/services";
import { UsersController } from "../controllers/users.controller";
import { UsersModel } from '../models/users.model';

export class UsersApi {

    public static checkMethod(obj: Request): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {

            const UsersModel = obj.data as UsersModel;

            switch (obj.method) {
                case EUsersMethod.add:
                    resolve(UsersController.add(UsersModel))
                    break
                case EUsersMethod.update:
                    resolve(UsersController.update(UsersModel))
                    break
                case EUsersMethod.delete:
                    resolve(UsersController.delete(UsersModel))
                    break
                case EUsersMethod.listOne:
                    resolve(UsersController.listOne(UsersModel))
                    break
                case EUsersMethod.listAll:
                    resolve(UsersController.listAll(UsersModel))
                    break
                case EUsersMethod.listPage:
                    resolve(UsersController.listPageUsers(UsersModel))
                    break
                default:
                    resolve(Service.getRes([], EMsg.methodNotFound, EStatus.fail))
                    break;
            }
        })
    }
}