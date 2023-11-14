import { ILeaderboard } from '../Interfaces/ILeaderboard';
import ServiceResponse from '../Interfaces/Response';
import ILeaderboardTeam from '../Interfaces/ILeaderboardTeam';
import LeaderboardModel from '../database/models/leaderboard.model';

export default class LeaderboardService {
  constructor(
    private leaderboardModel: ILeaderboard = new LeaderboardModel(),
  ) { }

  public async getHomeTeamMatches(): Promise<ServiceResponse<ILeaderboardTeam[]>> {
    const matches = await this.leaderboardModel.getArrHome();
    return {
      status: 'success',
      data: matches,
    };
  }

  public async getAwayTeamMatches(): Promise<ServiceResponse<ILeaderboardTeam[]>> {
    const matches = await this.leaderboardModel.getArrAway();
    return {
      status: 'success',
      data: matches,
    };
  }
}
