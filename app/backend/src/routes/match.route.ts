import { Router } from 'express';
import MatchController from '../controllers/match.controller';
import validateToken from '../middlewares/auth.middleware';

const matchController = new MatchController();

const matchRouter = Router();

matchRouter.get('/matches', (req, res) => matchController.getAll(req, res));
matchRouter.patch(
  '/matches/:id/finish',
  validateToken,
  (req, res) => matchController.getById(req, res),
);

export default matchRouter;
