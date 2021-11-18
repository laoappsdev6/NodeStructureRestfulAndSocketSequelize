import { BuildOptions, DataTypes, Model, ModelAttributes, Sequelize } from 'sequelize';
import { MemberModel } from '../models/member.model';

export interface MemberSequelizeModel extends Model<MemberModel>, MemberModel {
}

export type MemberStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): MemberSequelizeModel;
}

export const MemberFactory = (name: string, sequelize: Sequelize): MemberStatic => {
    const attributes: ModelAttributes<MemberSequelizeModel> = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
            autoIncrementIdentity: true,
            allowNull: false
        },
        roomId: {
            type: DataTypes.INTEGER, allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER, allowNull: false
        },
    }
    let table = sequelize.define(name, attributes, { tableName: name, freezeTableName: true, timestamps: true });
    return table;
}