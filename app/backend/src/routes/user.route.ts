import { Router } from 'express';
import UserController from '../controllers/user.controller';
import validateToken from '../middlewares/auth.middleware';

const userController = new UserController();

const userRouter = Router();

userRouter.post('/login', (req, res) => userController.getAll(req, res));
userRouter.get('/login/role', validateToken, (req, res) => userController.getByEmail(req, res));

export default userRouter;
