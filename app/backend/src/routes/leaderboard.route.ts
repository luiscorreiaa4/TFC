import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const leaderboardController = new LeaderboardController();

const leaderboardRouter = Router();

leaderboardRouter.get(
  '/leaderboard/home',
  (req, res) => leaderboardController.getHomeTeamMatches(req, res),
);
leaderboardRouter.get(
  '/leaderboard/away',
  (req, res) => leaderboardController.getAwayTeamMatches(req, res),
);

export default leaderboardRouter;
