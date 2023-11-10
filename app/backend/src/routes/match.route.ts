import { Router } from 'express';
import MatchController from '../controllers/match.controller';

const matchController = new MatchController();

const matchRouter = Router();

matchRouter.get('/matches', (req, res) => matchController.getAll(req, res));
// teamRouter.get('/teams/:id', (req, res) => teamController.getById(req, res));

export default matchRouter;
