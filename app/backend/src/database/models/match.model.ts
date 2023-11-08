import { DataTypes, Model, Optional, ModelDefined } from 'sequelize';
import IMatch from '../../Interfaces/IMatch';
import TeamModelSequelize from './team.model';
import db from '.';

type MatchModelSequelizeAttributes = Optional<IMatch, 'id'>;
type MatchModelCreator = ModelDefined<IMatch, MatchModelSequelizeAttributes>;
export type IMatchModel = Model<IMatch, MatchModelSequelizeAttributes>;
const MatchModelSequelize: MatchModelCreator = db.define('Match', {
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
  user: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'matches',
  underscored: true,
  timestamps: false,
});

export default MatchModelSequelize;
