import { Request, Response } from 'express';
import { prismaClient } from '../database/prismaClient';
import { BadRequestError, NotFoundError } from '../helpers/ApiError';
import { IOrderItenProps } from '../model/IOrderItenProps';
import { Order } from '@prisma/client';
import { clientMercadoPago } from '../services/configMercadoPago';

class OrderController {
	async create(request: Request, response: Response): Promise<Response<Order>> {
		const { itensOrder, idAddress, userId } = request.body;
		const orderIten = itensOrder as IOrderItenProps[];
		let arrayProducts = [];

		orderIten?.map((item) => {
			const product = {
				title: item.name,
				picture_url: item.urlFile,
				unit_price: parseFloat(item.price),
				quantity: item.quantity,
			};
			arrayProducts = [...arrayProducts, product];
		});

		const paymentClient = await clientMercadoPago.create({
			body: {
				items: arrayProducts,
				statement_descriptor: 'Pizzaria delivery Guto',
				back_urls: {
					success: 'http://192.168.100.103:3000/success',
					failure: 'http://192.168.100.103:3000/failure'
				},
				auto_return: 'approved',
				notification_url: 'http://www.updatepro.com.br/payment'
			},
		});

		// const order = await prismaClient.order.create({
		// 	data: {
		// 		total: 100,
		// 		itensOrder,
		// 		users: {
		// 			connect: {
		// 				id: userId
		// 			}
		// 		},
		// 		adresses: {
		// 			connect: {
		// 				id: idAddress
		// 			}
		// 		}
		// 	}
		// });

		// if (!order) {
		// 	throw new BadRequestError('Erro ao efetuar pedido');
		// }

		return response.status(201).json({
			success: true,
			teste: paymentClient
		});

	}

	async list(request: Request, response: Response): Promise<Response<Order[]>> {
		const userId = request.params.id;

		const orders = await prismaClient.order.findMany({
			where: {
				userId
			}, include: {
				adresses: true,
				users: true
			}
		});

		if (!orders) {
			throw new NotFoundError('Nenhum pedido encontrado');
		}

		return response.status(200).json({
			success: true,
			orders
		});
	}
}

export default new OrderController;