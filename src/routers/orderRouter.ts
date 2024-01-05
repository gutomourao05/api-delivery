import { Router } from 'express';
import { authRouteMiddleware } from '../middleware/authRouteMiddleware';

const orderRouter = Router();

orderRouter.use(authRouteMiddleware);
orderRouter.post('/order');

export default orderRouter;