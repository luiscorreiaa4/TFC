import { Request, Response } from 'express';
import UserService from '../services/user.service';
import validateEmail from '../util/validateEmail';
import jwt from '../util/jwt';

export default class UserController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  public async getAll(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!validateEmail(email) || password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const serviceResponse = await this.userService.getToken(email, password);
    if (serviceResponse.status === 'error') {
      return res.status(401).json(serviceResponse.data);
    }
    return res.status(200).json(serviceResponse.data);
  }

  public async getByEmail(req: Request, res: Response) {
    const { authorization } = req.headers;
    const token = authorization?.split(' ')[1];
    if (!token) {
      return;
    }
    const decoded = jwt.fVerify(token);
    if (!decoded) {
      return;
    }
    const { status, data } = await this.userService.getByEmail(decoded.email);
    if (status === 'error') {
      return res.status(404).json(data);
    }
    return res.status(200).json(data);
  }
}
