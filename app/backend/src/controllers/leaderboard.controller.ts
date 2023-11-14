import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  constructor(
    private leaderboardService: LeaderboardService = new LeaderboardService(),
  ) { }

  public async getHomeTeamMatches(req: Request, res: Response) {
    const matches = await this.leaderboardService.getHomeTeamMatches();
    res.status(200).json(matches.data);
  }

  public async getAwayTeamMatches(req: Request, res: Response) {
    const matches = await this.leaderboardService.getAwayTeamMatches();
    res.status(200).json(matches.data);
  }
}
