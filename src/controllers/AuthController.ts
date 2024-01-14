import { prismaClient } from '../database/prismaClient';
import { BadRequestError, NotFoundError } from '../helpers/ApiError';
import { jwtServices } from '../services/jwtServices';
import { passwordCrypt } from '../services/passwordCrypt';
import { Response, Request } from 'express';

class AuthController {
	async login(request: Request, responde: Response) {

		const { email, password } = request.body;

		const user = await prismaClient.user.findUnique({
			where: {
				email
			}
		});

		if (!user) {
			throw new NotFoundError('Usuario não encontrado');
		}

		const comparePassword = await passwordCrypt.verifyPassword(password, user.password);

		if (!comparePassword) {
			throw new BadRequestError('Senha incorreta');
		}

		const token = await jwtServices.signToken({ id: user.id });

		if (!token) {
			throw new BadRequestError('Erro ao tentar logar');
		}

		const { id, name } = user;

		return responde.status(200).json({
			success: true,
			user: { id, name, email },
			token
		});
	}
}

export default new AuthController;