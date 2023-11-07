import {
  DataTypes,
  ModelDefined,
  Model,
  Optional,
} from 'sequelize';
import ITeam from '../../Interfaces/ITeam';
import db from '.';

type TeamModelSequelizeAttributes = Optional<ITeam, 'id'>;
type TeamModelCreator = ModelDefined<ITeam, TeamModelSequelizeAttributes>;
export type ITeamModel = Model<ITeam, TeamModelSequelizeAttributes>;
const TeamModelSequelize: TeamModelCreator = db.define('Team', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'teams',
  underscored: true,
  timestamps: false,
});

export default TeamModelSequelize;
