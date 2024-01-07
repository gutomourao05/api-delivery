import { NextFunction, Request, Response } from 'express';
import { jwtServices } from '../services/jwtServices';
import { UnauthorizedError } from '../helpers/ApiError';
import { prismaClient } from '../database/prismaClient';

const authRouteMiddleware = async (request: Request, response: Response, next: NextFunction) => {
	const { authorization } = request.headers;

	if (!authorization) {
		throw new UnauthorizedError('Sem permissão de acesso');
	}

	const arrayToken = authorization.split(' ');

	if (arrayToken[0] !== 'Bearer') {
		throw new UnauthorizedError('Sem permissão de acesso');
	}

	if(!arrayToken[1]){
		throw new UnauthorizedError('Sem permissão de acesso');
	}

	const token = arrayToken[1];

	const verifyToken = await jwtServices.verifyToken(token);

	if(verifyToken === 'JWT_SECRET_NOT_FOUND' || verifyToken === 'JWT_TOKEN_INVALID'){
		throw new UnauthorizedError('Sem permissão de acesso');
	}

	const user = prismaClient.user.findUnique({where: {id: verifyToken.id}});

	if(!user){
		throw new UnauthorizedError('Sem Permissão de acesso');
	}

	return next();
};

export { authRouteMiddleware };