import { ItenMenu } from '@prisma/client';

export interface IOrderItenProps extends Partial<ItenMenu> {
	quantity: number
}