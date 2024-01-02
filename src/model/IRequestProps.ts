import { User } from '@prisma/client';
import { Request } from 'express';

export interface IRequestProps extends Request {
	user: Partial<User>,
	token: string
}