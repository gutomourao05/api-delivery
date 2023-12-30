import { Request, Response } from 'express';
import { prismaClient } from '../database/prismaClient';
import * as yup from 'yup';
import { passwordCrypt } from '../services/passwordCrypt';
import { jwtServices } from '../services/jwtServices';
import { BadRequestError, NotFoundError } from '../helpers/ApiError';


class UserController {

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

		const { id } = user;

		return responde.status(200).json({
			success: true,
			user: { id, token }
		});
	}

	async create(request: Request, response: Response) {

		const schema = yup.object().shape({
			name: yup.string().required('Necessário preencher o campo nome'),
			email: yup.string().required('Necessário preencher o campo email').email('Email não é valido'),
			password: yup.string().required('Necessário preencher o campo senha').min(6, 'Senha deve ter no minimo 6 caracteres')
		});

		try {
			await schema.validate(request.body);
		} catch (error) {
			throw new BadRequestError(error.errors);
		}

		const { name, email, password } = request.body;

		const existUser = await prismaClient.user.findFirst({
			where: {
				email
			}
		});

		if (existUser) {
			throw new BadRequestError('Usuario já cadastrado');
		}

		const hash = await passwordCrypt.createHash(password);

		if(!hash){
			throw new BadRequestError('erro ao criar a senha');
		}

		const user = await prismaClient.user.create({
			data: {
				name,
				email,
				password: hash
			}
		});

		if(!user){
			throw new BadRequestError('Erro ao cruar usuario');
		}

		const { id } = user;

		return response.status(201).json({ success: true, user: { id, name, email } });

	}
}

export default new UserController;