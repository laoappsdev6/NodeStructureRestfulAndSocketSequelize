import { BuildOptions, DataTypes, Model, ModelAttributes, Sequelize } from 'sequelize';
import { MessageModel } from '../models/message.model';

export interface MessageSequelizeModel extends Model<MessageModel>, MessageModel {
}

export type MessageStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): MessageSequelizeModel;
}

export const MessageFactory = (name: string, sequelize: Sequelize): MessageStatic => {
    const attributes: ModelAttributes<MessageSequelizeModel> = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
            autoIncrementIdentity: true,
            allowNull: false
        },
        roomId: {
            type: DataTypes.INTEGER, allowNull: true
        },
        userId: {
            type: DataTypes.INTEGER, allowNull: false
        },
        message: {
            type: DataTypes.TEXT, allowNull: false
        },
    }
    let table = sequelize.define(name, attributes, { tableName: name, freezeTableName: true, timestamps: true });
    return table;
}