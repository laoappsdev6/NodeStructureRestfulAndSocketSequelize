import { BuildOptions, DataTypes, Model, ModelAttributes, Sequelize } from 'sequelize';
import { RoomModel } from '../models/room.model';

export interface RoomSequelizeModel extends Model<RoomModel>, RoomModel {
}

export type RoomStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): RoomSequelizeModel;
}

export const RoomFactory = (name: string, sequelize: Sequelize): RoomStatic => {
    const attributes: ModelAttributes<RoomSequelizeModel> = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
            autoIncrementIdentity: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING, allowNull: false
        },
        type: {
            type: DataTypes.STRING, allowNull: false
        },
    }
    let table = sequelize.define(name, attributes, { tableName: name, freezeTableName: true, timestamps: true });
    return table;
}