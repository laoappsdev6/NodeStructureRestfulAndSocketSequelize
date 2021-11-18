import { EMemberMethod } from "../services/method";
import { Request } from '../servers/Request'
import { Response } from '../servers/Response'
import { EMsg, EStatus } from "../services/message";
import { Service } from "../services/services";
import { MemberController } from "../controllers/member.controller";
import { MemberModel } from '../models/member.model';

export class MemberApi {

    public static checkMethod(obj: Request): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {

            const MemberModel = obj.data as MemberModel;

            switch (obj.method) {
                case EMemberMethod.add:
                    resolve(MemberController.add(MemberModel))
                    break
                case EMemberMethod.update:
                    resolve(MemberController.update(MemberModel))
                    break
                case EMemberMethod.delete:
                    resolve(MemberController.delete(MemberModel))
                    break
                case EMemberMethod.listOne:
                    resolve(MemberController.listOne(MemberModel))
                    break
                case EMemberMethod.listAll:
                    resolve(MemberController.listAll(MemberModel))
                    break
                case EMemberMethod.listPage:
                    resolve(MemberController.listMember(MemberModel))
                    break
                case EMemberMethod.countMember:
                    resolve(MemberController.listCount(MemberModel))
                    break
                default:
                    resolve(Service.getRes([], EMsg.methodNotFound, EStatus.fail))
                    break;
            }
        })
    }
}