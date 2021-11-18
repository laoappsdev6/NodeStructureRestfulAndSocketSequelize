import { BuildOptions, DataTypes, Model, ModelAttributes, Sequelize } from 'sequelize';
import { UsersModel } from '../models/users.model';
import * as bcryptjs from 'bcryptjs';


export interface UsersSequelizeModel extends Model<UsersModel>, UsersModel {
}

export type UsersStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): UsersSequelizeModel;
}

export const UsersFactory = (name: string, sequelize: Sequelize): UsersStatic => {
    const attributes: ModelAttributes<UsersSequelizeModel> = {
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
        phoneNumber: {
            type: DataTypes.STRING, allowNull: false
        },
        username: {
            type: DataTypes.STRING, allowNull: false
        },
        password: {
            type: DataTypes.STRING, allowNull: false
        }
    }
    let table = sequelize.define(name, attributes, { tableName: name, freezeTableName: true, timestamps: true });

    table.prototype.hashPassword = function (password: string): string {
        if (!password) return '';
        const str = password + this.username + this.phoneNumber;
        return this.password = bcryptjs.hashSync(str, bcryptjs.genSaltSync())
    }

    table.prototype.validPassword = function (password: string): boolean {
        const str = password + this.username + this.phoneNumber;
        if (bcryptjs.compareSync(str, this.password)) return true;
        return false;
    }

    table.beforeCreate(async (user, options) => {
        if (user.changed('password')) {
            if (user.password && user.username && user.phoneNumber) {
                const str = user.password + user.username + user.phoneNumber;
                return bcryptjs.hash(str, bcryptjs.genSaltSync())
                    .then(hash => {
                        user.password = hash;
                    })
                    .catch(Error => {
                        throw new Error(Error);
                    });
            }
        }
    });

    table.beforeUpdate(async (user, option) => {
        if (user.changed('password')) {
            if (user.password && user.username && user.phoneNumber) {
                const str = user.password + user.username + user.phoneNumber;
                return bcryptjs.hash(str, bcryptjs.genSaltSync())
                    .then(hash => {
                        user.password = hash;
                    })
                    .catch(err => {
                        throw new Error(err);
                    });
            }
        }
    });
    return table;
}