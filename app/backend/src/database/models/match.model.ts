import { DataTypes, Model, Optional, ModelDefined } from 'sequelize';
import IMatch from '../../Interfaces/IMatch';
import db from '.';
import TeamModelSequelize from './team.model';

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

MatchModelSequelize.belongsTo(TeamModelSequelize, {
  foreignKey: 'homeTeamId',
  as: 'homeTeam',
  targetKey: 'id',
});

MatchModelSequelize.belongsTo(TeamModelSequelize, {
  foreignKey: 'awayTeamId',
  as: 'awayTeam',
  targetKey: 'id',
});

export default MatchModelSequelize;
