import { Sequelize } from "sequelize";
import { EDB } from "../config/config";
import { TableName } from "../services/services";
import { MemberFactory } from "./member.entity";
import { MessageFactory } from "./message.entity";
import { RoomFactory } from "./room.entity";
import { UsersFactory } from "./users.entity";

export const DBconnection = new Sequelize(EDB.dbname, EDB.dbuser, EDB.dbpass, { host: EDB.dbhost, dialect: EDB.dbdialect, timezone: EDB.timezone, logging: false });

export const UsersEntity = UsersFactory(TableName.users, DBconnection);
export const MessageEntity = MessageFactory(TableName.message, DBconnection);
export const RoomEntity = RoomFactory(TableName.room, DBconnection);
export const MemberEntity = MemberFactory(TableName.member, DBconnection);

export function initDB(): Promise<Sequelize> {
    return new Promise<Sequelize>(async (resolve, rejects) => {
        try {
            await UsersEntity.sync({ alter: true });
            await MessageEntity.sync({ alter: true });
            await RoomEntity.sync({ alter: true });
            await MemberEntity.sync({ alter: true });

            resolve(DBconnection);
        } catch (e) {
            rejects(e)
        }
    });
};

initDB();