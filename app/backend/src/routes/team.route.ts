import { Router } from 'express';
import TeamController from '../controllers/team.controller';

const teamController = new TeamController();

const teamRouter = Router();

teamRouter.get('/teams', (req, res) => teamController.getAll(req, res));
teamRouter.get('/teams/:id', (req, res) => teamController.getById(req, res));

export default teamRouter;
