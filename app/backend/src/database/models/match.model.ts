import { DataTypes, Model, Optional, ModelDefined } from 'sequelize';
import IMatch from '../../Interfaces/IMatch';
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
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  tableName: 'matches',
  underscored: true,
  timestamps: false,
});

export default MatchModelSequelize;
