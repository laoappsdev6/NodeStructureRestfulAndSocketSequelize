import { ERoomMethod } from "../services/method";
import { Request } from '../servers/Request'
import { Response } from '../servers/Response'
import { EMsg, EStatus } from "../services/message";
import { Service } from "../services/services";
import { RoomController } from "../controllers/room.controller";
import { RoomModel } from '../models/room.model';

export class RoomApi {

    public static checkMethod(obj: Request): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {

            const RoomModel = obj.data as RoomModel;

            switch (obj.method) {
                case ERoomMethod.add:
                    resolve(RoomController.add(RoomModel))
                    break
                case ERoomMethod.update:
                    resolve(RoomController.update(RoomModel))
                    break
                case ERoomMethod.delete:
                    resolve(RoomController.delete(RoomModel))
                    break
                case ERoomMethod.listOne:
                    resolve(RoomController.listOne(RoomModel))
                    break
                case ERoomMethod.listAll:
                    resolve(RoomController.listAll(RoomModel))
                    break
                case ERoomMethod.listPage:
                    resolve(RoomController.listRoom(RoomModel))
                    break
                case ERoomMethod.listLastRoom:
                    resolve(RoomController.listLastRoom(RoomModel))
                    break
                default:
                    resolve(Service.getRes([], EMsg.methodNotFound, EStatus.fail))
                    break;
            }
        })
    }
}