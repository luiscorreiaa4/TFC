import IMatch from './IMatch';
import ILeaderboardTeam from './ILeaderboardTeam';

export interface ILeaderboard {
  findMatchesHome(homeTeamId: number): Promise<IMatch[]>;
  findMatchesAway(awayTeamId: number): Promise<IMatch[]>;
  getArrHome(): Promise<ILeaderboardTeam[]>
  getArrAway(): Promise<ILeaderboardTeam[]>
}
