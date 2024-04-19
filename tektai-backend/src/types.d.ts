// types.d.ts
import { Request } from 'express';
import { User } from './schemas/user.schema';

export interface CustomRequest extends Request {
  user: User
}
