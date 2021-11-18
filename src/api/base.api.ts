import { Request } from '../servers/Request'
import { Response } from '../servers/Response'
import { EMsg, EStatus } from '../services/message'
import { EObject } from '../services/object'
import { Service } from '../services/services'
import { MemberApi } from './member.api'
import { LoginApi } from './login.api'
import { MessageApi } from './message.api'
import { RoomApi } from './room.api'
import { UsersApi } from './user.api'

export class BaseApi {

    public static checkObject(obj: Request): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {

            if (!Service.validateToken(obj.token) && obj.object !== EObject.login) {
                resolve(Service.getRes([], EMsg.noAuthorize, EStatus.fail))
            } else {

                switch (obj.object) {
                    case EObject.login:
                        resolve(LoginApi.checkMethod(obj))
                        break;
                    case EObject.users:
                        resolve(UsersApi.checkMethod(obj))
                        break;
                    case EObject.message:
                        resolve(MessageApi.checkMethod(obj))
                        break;
                    case EObject.room:
                        resolve(RoomApi.checkMethod(obj))
                        break;
                    case EObject.member:
                        resolve(MemberApi.checkMethod(obj))
                        break;
                    default:
                        resolve(Service.getRes([], EMsg.objectNotFound, EStatus.fail))
                        break;
                }
            }
        })
    }
}