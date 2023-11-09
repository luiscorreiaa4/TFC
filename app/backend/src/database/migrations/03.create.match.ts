import { Model, QueryInterface, DataTypes } from 'sequelize';
import IMatch from '../../Interfaces/IMatch';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IMatch>>('matches', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      homeTeamId: {
        type: DataTypes.INTEGER,
        field: 'home_team_id',
        allowNull: false,
      },
      awayTeamId: {
        type: DataTypes.INTEGER,
        field: 'away_team_id',
        allowNull: false,
      },
      homeTeamGoals: {
        type: DataTypes.INTEGER,
        field: 'home_team_goals',
        allowNull: false,
      },
      awayTeamGoals: {
        type: DataTypes.INTEGER,
        field: 'away_team_goals',
        allowNull: false,
      },
      inProgress: {
        type: DataTypes.BOOLEAN,
        field: 'in_progress',
        allowNull: false,
      },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('matches');
  },
};