import { Request, Response } from 'express';
import MatchService from '../services/match.service';
import IMatch from '../Interfaces/IMatch';

export default class MatchController {
  private matchService: MatchService;
  constructor() {
    this.matchService = new MatchService();
  }

  public async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    const { data } = await this.matchService.getAll();
    if (inProgress) {
      const inProgressMatch = inProgress === 'true';
      const matchesInProgress = JSON.parse(JSON.stringify(data))
        .filter((match: IMatch) => match.inProgress === inProgressMatch);
      return res.status(200).json(matchesInProgress);
    }
    return res.status(200).json(data);
  }

  public async getById(req: Request, res: Response) {
    const serviceResponse = await this.matchService.getById(Number(req.params.id));
    if (serviceResponse.status === 'error') {
      return res.status(404).json(serviceResponse.data);
    }
    return res.status(200).json(serviceResponse.data);
  }
}

// CRIAR TEAMNAME
// cannot read property 'teamName' of undefined
