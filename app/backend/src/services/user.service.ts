import { compareSync } from 'bcryptjs';
import IToken from '../Interfaces/IToken';
import UserModelSequelize from '../database/models/user.model';
import ServiceResponse from '../Interfaces/Response';
import jwt from '../util/jwt';
import IUser from '../Interfaces/IUser';

export default class UserService {
  private model = UserModelSequelize;

  async getToken(email: string, password: string): ServiceResponse<IToken> {
    const user = await this.model.findOne({ where: { email } });
    const isPasswordValid = (user && compareSync(password, user.dataValues.password));
    if (!isPasswordValid) {
      return {
        status: 'error',
        data: { message: 'Invalid email or password' },
      };
    }
    const token = jwt.fSign({ email, password });
    return { status: 'success', data: { token } };
  }

  async getByEmail(email: string): ServiceResponse<IUser> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) {
      return {
        status: 'error',
        data: { message: 'User not found' },
      };
    }
    return {
      status: 'success',
      data: user.dataValues,
    };
  }
}
