import { Router } from 'express';
import { authRouteMiddleware } from '../middleware/authRouteMiddleware';
import AddressController from '../controllers/AddressController';

const addressRouter = Router();

addressRouter.use(authRouteMiddleware);
addressRouter.post('/address', AddressController.create);


export default addressRouter;