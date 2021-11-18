import { MessageModel } from "../models/message.model";
import { Service } from "../services/services";
import { Response } from '../servers/Response';
import { EMsg, EStatus } from "../services/message";
import { Op } from "sequelize";
import { MessageEntity } from "../databases/database.entity";

export class MessageController {

    public static add(data: MessageModel): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {
            MessageEntity.create(data).then(result => {
                resolve(Service.getRes(result, EMsg.addSuccess, EStatus.success));
            }).catch(error => {
                resolve(Service.getRes([error], EMsg.addFail, EStatus.fail));
            })
        })
    }

    public static update(data: MessageModel): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {
            MessageEntity.findByPk(data.id).then(async result => {
                if (result) {
                    Service.copyObject(data, result);
                    await result.save();
                    resolve(Service.getRes(result, EMsg.updateSuccess, EStatus.success));
                } else {
                    resolve(Service.getRes([], EMsg.updateFail, EStatus.fail));
                }
            })
        })
    }

    public static setActive(data: MessageModel): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {
            MessageEntity.findByPk(data.id).then(async result => {
                if (result) {
                    result.isActive = data.isActive;
                    await result.save();
                    resolve(Service.getRes(result, EMsg.updateSuccess, EStatus.success));
                } else {
                    resolve(Service.getRes([], EMsg.updateFail, EStatus.fail));
                }
            })
        })
    }

    public static delete(data: MessageModel): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {
            MessageEntity.findByPk(data.id).then(async result => {
                if (result) {
                    await result.destroy();
                    resolve(Service.getRes(result, EMsg.deleteSuccess, EStatus.success));
                } else {
                    resolve(Service.getRes([], EMsg.deleteFail, EStatus.fail));
                }
            })
        })
    }

    public static listOne(data: MessageModel): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {
            MessageEntity.findByPk(data.id).then(async result => {
                resolve(Service.getRes(result, EMsg.listOne, EStatus.success));
            })
        })
    }

    public static listAll(data: MessageModel): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {
            MessageEntity.findAll().then(async result => {
                resolve(Service.getRes(result, EMsg.listAll, EStatus.success));
            })
        })
    }

    public static listPage(data: MessageModel): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {

            const limit = data.limit ? Number(data.limit) : 10;
            const Customer = data.page ? Number(data.page) : 1;
            const offset: number = ((Customer - 1) * limit);
            const keyword: string = data.keyword ? String(data.keyword) : '';

            MessageEntity.findAndCountAll({
                where: {
                    [Op.or]: [
                        { CustomerName: { [Op.like]: `%${keyword}%` } },
                        { CustomerId: { [Op.like]: `%${keyword}%` } }

                    ]
                }, order: [
                    ['id', 'desc']
                ], limit: limit, offset: offset
            }).then(result => {
                resolve(Service.getRes(result, EMsg.listPage, EStatus.success));
            })
        })
    }
}
