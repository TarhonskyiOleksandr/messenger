import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { refreshToken } from './controllers/auth';
import { IProtectedRequest } from './type';

export const verifyToken = (req: IProtectedRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
    req.userId = (decoded as { userId: string }).userId;
    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') return refreshToken(req, res, next);
    return res.status(401).json({ message: 'Invalid token' });
  }
};
