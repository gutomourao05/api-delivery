import { Response } from 'express';
import { IOrderItenProps } from '../model/IOrderItenProps';
import { IRequestProps } from '../model/IRequestProps';
import { prismaClient } from '../database/prismaClient';
import { BadRequestError } from '../helpers/ApiError';

class OrderController {
	async create(request: IRequestProps, response: Response) {
		const { itensOrder, idAddress } = request.body;
		const userId = request.user.id;
		const orderIten = itensOrder as IOrderItenProps[];
		let valueTotal = 0;

		orderIten?.map((item) => {
			const calc = item?.quantity * item?.price;
			valueTotal = valueTotal + calc;
		});

		// const order = await prismaClient.order.create({
		// 	data: {	}
		// });

		// if(!order){
		// 	throw new BadRequestError('Erro ao efetuar pedido');
		// }

		// return response.status(201).json({
		// 	success: true,
		// 	order
		// });

	}
}

export default new OrderController;