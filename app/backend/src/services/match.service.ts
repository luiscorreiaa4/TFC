import ServiceResponse from '../Interfaces/Response';
import MatchModelSequelize from '../database/models/match.model';
import IMatch from '../Interfaces/IMatch';
import TeamModelSequelize from '../database/models/team.model';

export default class MatchService {
  private model = MatchModelSequelize;

  async getAll(): ServiceResponse<IMatch[]> {
    const matches = await this.model.findAll({
      include: [
        { model: TeamModelSequelize, attributes: ['teamName'], as: 'homeTeam' },
        { model: TeamModelSequelize, attributes: ['teamName'], as: 'awayTeam' },
      ],
    });
    const data = matches.map((match) => match.dataValues);

    return {
      status: 'success',
      data,
    };
  }

  async getById(id: number): ServiceResponse<IMatch> {
    const result = await this.model.findByPk(id);
    result?.update({ inProgress: false });
    return {
      status: 'success',
      data: { message: 'finished' },
    };
  }
}
