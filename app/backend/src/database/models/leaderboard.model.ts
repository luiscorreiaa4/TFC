import MatchModelSequelize from './match.model';
import TeamModelSequelize from './team.model';
import IMatch from '../../Interfaces/IMatch';
import { ILeaderboard } from '../../Interfaces/ILeaderboard';
import ILeaderboardTeam from '../../Interfaces/ILeaderboardTeam';

export default class leaderboardModel implements ILeaderboard {
  private model = MatchModelSequelize;
  private home: ILeaderboardTeam = {
    name: '',
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    draws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
  };

  // name: string;
  // totalPoints: number;
  // totalGames: number;
  // totalVictories: number;
  // draws: number;
  // totalLosses: number;
  // goalsFavor: number;
  // goalsOwn: number;

  private away: ILeaderboardTeam = {
    name: '',
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    draws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
  };

  private homeRray = new Array(16).fill(0);
  private awayRray = new Array(16).fill(0);

  async findMatchesHome(homeTeamId: number): Promise<IMatch[]> {
    const matches = await this.model.findAll({
      attributes: ['id', 'homeTeamId', 'homeTeamGoals', 'awayTeamGoals', 'inProgress'],
      include: [
        {
          model: TeamModelSequelize,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
      ],
      where: {
        homeTeamId,
        inProgress: false,
      },
    });

    return matches.map((match) => match.toJSON() as IMatch);
  }

  async findMatchesAway(awayTeamId: number): Promise<IMatch[]> {
    const matches = await this.model.findAll({
      attributes: ['id', 'homeTeamGoals', 'awayTeamGoals', 'inProgress', 'awayTeamId'],
      include: [
        {
          model: TeamModelSequelize,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
      where: {
        awayTeamId,
        inProgress: false,
      },
    });

    return matches.map((match) => match.toJSON() as IMatch);
  }

  static countVictoriesHome(data: IMatch[]): number {
    let victories = 0;
    data.forEach((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) victories += 1;
    });
    return victories;
  }

  static countVictoriesAway(data: IMatch[]): number {
    let victories = 0;
    data.forEach((match) => {
      if (match.homeTeamGoals < match.awayTeamGoals) victories += 1;
    });
    return victories;
  }

  static countDraws(data: IMatch[]): number {
    let draws = 0;
    data.forEach((match) => {
      if (match.homeTeamGoals === match.awayTeamGoals) draws += 1;
    });
    return draws;
  }

  static countLossesHome(data: IMatch[]): number {
    let losses = 0;
    data.forEach((match) => {
      if (match.homeTeamGoals < match.awayTeamGoals) losses += 1;
    });
    return losses;
  }

  static countLossesAway(data: IMatch[]): number {
    let losses = 0;
    data.forEach((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) losses += 1;
    });
    return losses;
  }

  static countGoalsForHome(data: IMatch[]): number {
    let goalsFor = 0;
    data.forEach((match) => {
      goalsFor += match.homeTeamGoals;
    });
    return goalsFor;
  }

  static countGoalsForAway(data: IMatch[]): number {
    let goalsFor = 0;
    data.forEach((match) => {
      goalsFor += match.awayTeamGoals;
    });
    return goalsFor;
  }

  static countGoalsConcededHome(data: IMatch[]): number {
    let goalsConceded = 0;
    data.forEach((match) => {
      goalsConceded += match.awayTeamGoals;
    });
    return goalsConceded;
  }

  static countGoalsConcededAway(data: IMatch[]): number {
    let goalsConceded = 0;
    data.forEach((match) => {
      goalsConceded += match.homeTeamGoals;
    });
    return goalsConceded;
  }

  static calculatePointsHome(data: IMatch[]): number {
    let points = 0;
    points += leaderboardModel.countVictoriesHome(data) * 3;
    points += leaderboardModel.countDraws(data);
    return points;
  }

  static calculatePointsAway(data: IMatch[]): number {
    let points = 0;
    points += leaderboardModel.countVictoriesAway(data) * 3;
    points += leaderboardModel.countDraws(data);
    return points;
  }

  async getArrHome(): Promise<ILeaderboardTeam[]> {
    return Promise.all(this.homeRray.map(async (e, index) => {
      const matches = await this.findMatchesHome(index + 1);
      if (matches[0].homeTeam) {
        this.home = {
          name: matches[0].homeTeam.teamName,
          totalPoints: leaderboardModel.calculatePointsHome(matches),
          totalGames: matches.length,
          totalVictories: leaderboardModel.countVictoriesHome(matches),
          draws: leaderboardModel.countDraws(matches),
          totalLosses: leaderboardModel.countLossesHome(matches),
          goalsFavor: leaderboardModel.countGoalsForHome(matches),
          goalsOwn: leaderboardModel.countGoalsConcededHome(matches),
        };
      }
      return this.home;
    }));
  }

  async getArrAway(): Promise<ILeaderboardTeam[]> {
    return Promise.all(this.awayRray.map(async (e, index) => {
      const matches = await this.findMatchesAway(index + 1);
      if (matches[0].awayTeam) {
        this.away = {
          name: matches[0].awayTeam.teamName,
          totalPoints: leaderboardModel.calculatePointsAway(matches),
          totalGames: matches.length,
          totalVictories: leaderboardModel.countVictoriesAway(matches),
          draws: leaderboardModel.countDraws(matches),
          totalLosses: leaderboardModel.countLossesAway(matches),
          goalsFavor: leaderboardModel.countGoalsForAway(matches),
          goalsOwn: leaderboardModel.countGoalsConcededAway(matches),
        };
      }
      return this.away;
    }));
  }
}
