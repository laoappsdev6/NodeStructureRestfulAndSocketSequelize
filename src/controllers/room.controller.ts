import { RoomModel } from "../models/room.model";
import { Service } from "../services/services";
import { Response } from '../servers/Response';
import { EMsg, EStatus } from "../services/message";
import { Op } from "sequelize";
import { DBconnection, RoomEntity } from "../databases/database.entity";

export class RoomController {

    public static add(data: RoomModel): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {
            RoomEntity.create(data).then(result => {
                resolve(Service.getRes(result, EMsg.addSuccess, EStatus.success));
            }).catch(error => {
                resolve(Service.getRes([error], EMsg.addFail, EStatus.fail));
            })
        })
    }

    public static update(data: RoomModel): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {
            RoomEntity.findByPk(data.id).then(async result => {
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

    public static delete(data: RoomModel): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {
            RoomEntity.findByPk(data.id).then(async result => {
                if (result) {
                    await result.destroy();
                    resolve(Service.getRes(result, EMsg.deleteSuccess, EStatus.success));
                } else {
                    resolve(Service.getRes([], EMsg.deleteFail, EStatus.fail));
                }
            })
        })
    }

    public static listOne(data: RoomModel): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {
            RoomEntity.findByPk(data.id).then(async result => {
                resolve(Service.getRes(result, EMsg.listOne, EStatus.success));
            })
        })
    }

    public static listAll(data: RoomModel): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {
            RoomEntity.findAll().then(async result => {
                resolve(Service.getRes(result, EMsg.listAll, EStatus.success));
            })
        })
    }

    public static listRoom(data: RoomModel): Promise<Response> {
        return new Promise<Response>(async (resolve, reject) => {
            const limit = data.limit ? Number(data.limit) : 10;
            const Users = data.page ? Number(data.page) : 1;
            const offset: number = ((Users - 1) * limit);
            const keyword: string = data.keyword ? String(data.keyword) : '';

            let sqlCount = `select count(*) as num from Room as po INNER JOIN page as pa ON po.pageId = pa.id `
            if (keyword && keyword != "") sqlCount += `where RoomId like '%${keyword}%' or type like '%${keyword}%' `;

            const resultCount: any = await DBconnection.query(sqlCount)
            const number: any = resultCount[0][0].num;

            let sqlPage = `select po.*,pa.pageName from Room as po INNER JOIN page as pa ON po.pageId = pa.id `
            if (keyword && keyword != "") sqlPage += `where RoomId like '%${keyword}%' or type like '%${keyword}%' `;
            sqlPage += `  order by po.id desc limit ${limit} offset ${offset}`

            const resultPage: any = await DBconnection.query(sqlPage)
            const dataPage = resultPage[0]

            const obj = {
                count: number,
                rows: dataPage
            }

            resolve(Service.getRes(obj, EMsg.listPage, EStatus.success));
        })
    }

    public static listLastRoom(data: RoomModel): Promise<Response> {
        return new Promise<Response>(async (resolve, reject) => {

            const sqlLive = "select * from Room where type='live' order by RoomDate desc limit 1"
            const resultLive = await DBconnection.query(sqlLive)
            const dataLive = resultLive[0][0]

            const sqlPhoto = "select * from Room where type='photo' order by RoomDate desc limit 1"
            const resultPhoto = await DBconnection.query(sqlPhoto)
            const dataPhoto = resultPhoto[0][0]

            const sqlVideo = "select * from Room where type='video' order by RoomDate desc limit 1"
            const resultVideo = await DBconnection.query(sqlVideo)
            const dataVideo = resultVideo[0][0]

            const obj = {
                live: dataLive,
                photo: dataPhoto,
                video: dataVideo,
            }
            resolve(Service.getRes(obj, EMsg.listPage, EStatus.success));
        })
    }
}
