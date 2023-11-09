import { Request, Response, NextFunction } from 'express';
import jwt from '../util/jwt';

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const splitToken = token.split(' ')[1];
  const decoded = jwt.fVerify(splitToken);
  if (!decoded) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  next();
};

export default validateToken;
