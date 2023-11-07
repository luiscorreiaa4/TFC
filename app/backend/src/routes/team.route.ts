import { Router } from 'express';
import TeamController from '../controllers/team.controller';

const teamController = new TeamController();

const teamRouter = Router();

teamRouter.get('/teams', (req, res) => teamController.getAll(req, res));

export default teamRouter;
