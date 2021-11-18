import { UsersModel } from "../models/users.model";
import { Service } from "../services/services";
import { Response } from '../servers/Response';
import { EMsg, EStatus } from "../services/message";
import { Op } from "sequelize";
import { UsersEntity } from "../databases/database.entity";
import { already } from "../models/validate.model";

export class UsersController {

    public static add(data: UsersModel): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {
            UsersEntity.findOne({ where: { username: data.username } }).then(result => {
                if (result) {
                    const msg = already("username", data.username);
                    resolve(Service.getRes([], msg, 0));
                } else {
                    UsersEntity.create(data).then(result => {
                        resolve(Service.getRes(result, EMsg.addSuccess, EStatus.success));
                    }).catch(error => {
                        resolve(Service.getRes([error], EMsg.addFail, EStatus.fail));
                    })
                }
            })
        })
    }

    public static update(data: UsersModel): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {
            UsersEntity.findOne({ where: { username: data.username, id: { [Op.not]: data.id } } }).then(result => {
                if (result) {
                    const msg = already("username", data.username);
                    resolve(Service.getRes([], msg, 0));
                } else {
                    UsersEntity.findByPk(data.id).then(async result => {
                        if (result) {
                            Service.copyObject(data, result);
                            await result.save();
                            resolve(Service.getRes(result, EMsg.updateSuccess, EStatus.success));
                        } else {
                            resolve(Service.getRes([], EMsg.updateFail, EStatus.fail));
                        }
                    }
                    )
                }
            })
        })
    }

    public static delete(data: UsersModel): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {
            UsersEntity.findByPk(data.id).then(async result => {
                if (result) {
                    await result.destroy();
                    resolve(Service.getRes(result, EMsg.deleteSuccess, EStatus.success));
                } else {
                    resolve(Service.getRes([], EMsg.deleteFail, EStatus.fail));
                }
            })
        })
    }

    public static listOne(data: UsersModel): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {
            UsersEntity.findByPk(data.id).then(async result => {
                resolve(Service.getRes(result, EMsg.listOne, EStatus.success));
            })
        })
    }

    public static listAll(data: UsersModel): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {
            UsersEntity.findAll().then(async result => {
                resolve(Service.getRes(result, EMsg.listAll, EStatus.success));
            })
        })
    }

    public static listPageUsers(data: UsersModel): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {

            const limit = data.limit ? Number(data.limit) : 10;
            const Users = data.page ? Number(data.page) : 1;
            const offset: number = ((Users - 1) * limit);
            const keyword: string = data.keyword ? String(data.keyword) : '';


            UsersEntity.findAndCountAll({
                where: {
                    [Op.or]: [
                        { name: { [Op.like]: `%${keyword}%` } },
                        { phoneNumber: { [Op.like]: `%${keyword}%` } },
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
