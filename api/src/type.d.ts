import { Request } from 'express';

export interface IProtectedRequest extends Request {
  userId?: string;
}
