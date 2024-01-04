import { Request, Response } from 'express';
import { prismaClient } from '../database/prismaClient';
import { BadRequestError } from '../helpers/ApiError';
import * as yup from 'yup';
import { MenuType } from '../enums/menuType';

class MenuController {
	async create(request: Request, response: Response) {

		const schema = yup.object().shape({
			name: yup.string().required('Necessário preencher o campo nome'),
			description: yup.string().required('Necessário preencher o campo descrição'),
			category: yup.array(yup.mixed<MenuType>().oneOf(Object.values(MenuType)).required('Necessário preencher o campo categoria')).ensure(),
			price: yup.string().required('Necessário preencher o campo preço'),
		});

		try {
			await schema.validate(request.body);
		} catch (error) {
			throw new BadRequestError(error.errors);
		}

		const { name, description, category, price } = request.body;

		const menu = await prismaClient.itenMenu.create({
			data: {
				name, description, category, price
			}
		});

		if (!menu) {
			throw new BadRequestError('Erro ao cadastrar item no menu');
		}

		return response.status(201).json({
			success: true,
			menu
		});
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async list(_request: Request, response: Response) {
		const listMenu = await prismaClient.itenMenu.findMany();

		if (!listMenu) {
			throw new BadRequestError('Erro ao listar menu');
		}

		return response.status(200).json({
			success: true,
			listMenu
		});
	}
}

export default new MenuController;