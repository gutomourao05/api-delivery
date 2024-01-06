import { Router } from 'express';
import { authRouteMiddleware } from '../middleware/authRouteMiddleware';
import OrderController from '../controllers/OrderController';

const orderRouter = Router();

orderRouter.use(authRouteMiddleware);
orderRouter.post('/order', OrderController.create);

export default orderRouter;