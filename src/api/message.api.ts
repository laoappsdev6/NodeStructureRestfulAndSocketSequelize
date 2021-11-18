import { EMessageMethod } from "../services/method";
import { Request } from '../servers/Request'
import { Response } from '../servers/Response'
import { EMsg, EStatus } from "../services/message";
import { Service } from "../services/services";
import { MessageController } from "../controllers/message.controller";
import { MessageModel } from '../models/message.model';

export class MessageApi {

    public static checkMethod(obj: Request): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {

            const MessageModel = obj.data as MessageModel;

            switch (obj.method) {
                case EMessageMethod.add:
                    resolve(MessageController.add(MessageModel))
                    break
                case EMessageMethod.update:
                    resolve(MessageController.update(MessageModel))
                    break
                case EMessageMethod.delete:
                    resolve(MessageController.delete(MessageModel))
                    break
                case EMessageMethod.listOne:
                    resolve(MessageController.listOne(MessageModel))
                    break
                case EMessageMethod.listAll:
                    resolve(MessageController.listAll(MessageModel))
                    break
                case EMessageMethod.listPage:
                    resolve(MessageController.listPage(MessageModel))
                    break
                default:
                    resolve(Service.getRes([], EMsg.methodNotFound, EStatus.fail))
                    break;
            }
        })
    }
}