import { DataTypes, Model, ModelDefined, Optional } from 'sequelize';
import Team from '../../Interfaces/Team';
import db from '.';

type TeamInputtableTypes = Optional<Team, 'id'>;
type TeamSequilizeModelCreator = ModelDefined<Team, TeamInputtableTypes>;
export type TeamModel = Model<Team, TeamInputtableTypes>;

const TeamModelCreator: TeamSequilizeModelCreator = db.define('team', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'teams',
  timestamps: false,
  underscored: true,
});

export default TeamModelCreator;
