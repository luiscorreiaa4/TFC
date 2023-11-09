import { DataTypes, Model, Optional, ModelDefined } from 'sequelize';
import IUser from '../../Interfaces/IUser';
import db from '.';

type UserModelSequelizeAttributes = Optional<IUser, 'id'>;
type UserModelCreator = ModelDefined<IUser, UserModelSequelizeAttributes>;
export type IUserModel = Model<IUser, UserModelSequelizeAttributes>;
const UserModelSequelize: UserModelCreator = db.define('Team', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
  underscored: true,
  timestamps: false,
});

export default UserModelSequelize;
