import { Request, Response } from 'express';
import TeamService from '../services/team.service';

export default class TeamController {
  private teamService: TeamService;
  constructor() {
    this.teamService = new TeamService();
  }

  public async getAll(req: Request, res: Response) {
    const serviceResponse = await this.teamService.getAll();
    return res.status(200).json(serviceResponse.data);
  }
}
