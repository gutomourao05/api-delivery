import { Router } from 'express';
import { authRouteMiddleware } from '../middleware/authRouteMiddleware';
import PaymentController from '../controllers/PaymentController';

const paymentRouter = Router();

paymentRouter.use(authRouteMiddleware);
paymentRouter.get('/payment', PaymentController.status);


export default paymentRouter;