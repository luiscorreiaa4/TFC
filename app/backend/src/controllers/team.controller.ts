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

  public async getById(req: Request, res: Response) {
    const serviceResponse = await this.teamService.getById(Number(req.params.id));
    if (serviceResponse.status === 'error') {
      return res.status(404).json(serviceResponse.data);
    }
    return res.status(200).json(serviceResponse.data);
  }
}
