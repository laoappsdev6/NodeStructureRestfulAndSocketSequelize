import { MemberModel } from "../models/member.model";
import { Service } from "../services/services";
import { Response } from '../servers/Response';
import { EMsg, EStatus } from "../services/message";
import { Op } from "sequelize";
import { MemberEntity, DBconnection } from "../databases/database.entity";

export class MemberController {

    public static add(data: MemberModel): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {
            MemberEntity.create(data).then(result => {
                resolve(Service.getRes(result, EMsg.addSuccess, EStatus.success));
            }).catch(error => {
                resolve(Service.getRes([error], EMsg.addFail, EStatus.fail));
            })
        })
    }

    public static update(data: MemberModel): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {
            MemberEntity.findByPk(data.id).then(async result => {
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

    public static delete(data: MemberModel): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {
            MemberEntity.findByPk(data.id).then(async result => {
                if (result) {
                    await result.destroy();
                    resolve(Service.getRes(result, EMsg.deleteSuccess, EStatus.success));
                } else {
                    resolve(Service.getRes([], EMsg.deleteFail, EStatus.fail));
                }
            })
        })
    }

    public static listOne(data: MemberModel): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {
            MemberEntity.findByPk(data.id).then(async result => {
                resolve(Service.getRes(result, EMsg.listOne, EStatus.success));
            })
        })
    }

    public static listAll(data: MemberModel): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {
            MemberEntity.findAll().then(async result => {
                resolve(Service.getRes(result, EMsg.listAll, EStatus.success));
            })
        })
    }

    public static listMember(data: MemberModel): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {

            const limit = data.limit ? Number(data.limit) : 10;
            const Member = data.page ? Number(data.page) : 1;
            const offset: number = ((Member - 1) * limit);
            const keyword: string = data.keyword ? String(data.keyword) : '';

            MemberEntity.findAndCountAll({
                where: {
                    [Op.or]: [
                        { MemberName: { [Op.like]: `%${keyword}%` } },
                        { MemberId: { [Op.like]: `%${keyword}%` } }

                    ]
                }, order: [
                    ['id', 'desc']
                ], limit: limit, offset: offset
            }).then(result => {
                resolve(Service.getRes(result, EMsg.listPage, EStatus.success));
            })
        })
    }

    public static listCount(data: MemberModel): Promise<Response> {
        return new Promise<Response>(async (resolve, reject) => {
            const sqlAll = "select count(*) as num from Member";
            const resultAll: any = await DBconnection.query(sqlAll)
            const numberAll: any = resultAll[0][0].num;

            const sqlComment = "select count(*) as num from Member where id IN (select MemberId from comment)"
            const resultComment: any = await DBconnection.query(sqlComment)
            const numberComment: any = resultComment[0][0].num;

            const sqlNoActivity = "select count(*) as num from Member where id NOT IN (select MemberId from comment)"
            const resultNoActivity: any = await DBconnection.query(sqlNoActivity)
            const numberNoActivity: any = resultNoActivity[0][0].num;

            const obj = {
                countAll: numberAll,
                countComment: numberComment,
                countNoActivity: numberNoActivity
            }

            resolve(Service.getRes(obj, EMsg.listPage, EStatus.success));
        })
    }


}
