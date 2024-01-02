import { Router } from 'express';
import { authRouteMiddleware } from '../middleware/authRouteMiddleware';
import MenuController from '../controllers/MenuController';

const menuRouter = Router();

menuRouter.use(authRouteMiddleware);
menuRouter.post('/menu', MenuController.create);
menuRouter.get('/menu', MenuController.list);

export default menuRouter;