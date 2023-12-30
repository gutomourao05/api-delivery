import { Router } from 'express';
import userController from '../controllers/UserController';
import { validRouteMiddleware } from '../middleware/validRouteMiddleware';

const userRouter = Router();

userRouter.post('/login', userController.login);
userRouter.post('/create', validRouteMiddleware, userController.create);

export default userRouter;