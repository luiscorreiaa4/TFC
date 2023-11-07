import ServiceResponse from '../Interfaces/Response';
import TeamModelSequelize from '../database/models/team.model';
import ITeam from '../Interfaces/ITeam';

export default class TeamService {
  private model = TeamModelSequelize;
  async getAll(): ServiceResponse<ITeam[]> {
    const result = await this.model.findAll();
    return {
      status: 'success',
      data: result.map((e) => ({
        id: e.dataValues.id,
        teamName: e.dataValues.teamName,
      })),
    };
  }
}
