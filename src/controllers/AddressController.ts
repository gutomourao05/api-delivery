import { Response } from 'express';
import { prismaClient } from '../database/prismaClient';
import { BadRequestError, NotFoundError } from '../helpers/ApiError';
import { IRequestProps } from '../model/IRequestProps';
import * as yup from 'yup';

class AddressController {
	async create(request: IRequestProps, response: Response){

		const schema = yup.object().shape({
			nameEndereco: yup.string().required('Necessário preencher o campo nome'),
			zipCode: yup.string().required('Necessário preencher o campo Cep'),
			state: yup.string().required('Necessário preencher o campo estado'),
			district: yup.string().required('Necessário preencher o campo bairro'),
			street: yup.string().required('Necessário preencher o campo rua'),
			number: yup.number().required('Necessário preencher o campo numero'),
			isDefault: yup.boolean().required('Necessário dizer se o campo é padrão')
		});

		try {
			await schema.validate(request.body);
		} catch (error) {
			throw new BadRequestError(error.errors);
		}

		const { nameEndereco, zipCode, state, district, street, number, isDefault } = request.body;

		const userId = request.user.id;

		const address = await prismaClient.address.create({
			data: {
				name: nameEndereco,
				zipCode,
				state,
				district,
				street,
				number,
				isDefault,
				userId
			}
		});

		if(!address){
			throw new BadRequestError('Erro ao cadastrar endereço');
		}

		return response.status(201).json({
			success: true,
			address
		});
	}

	async listAdressesByUser(request: IRequestProps, response: Response){
		const id = request.user.id;

		const adresses = await prismaClient.address.findMany({where: {userId: id}});

		if(!adresses){
			throw new NotFoundError('Nenhum endereço encontrado');
		}

		return response.status(200).json({
			success: true,
			adresses
		});

	}
}

export default new AddressController;