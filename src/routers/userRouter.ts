import { Router } from 'express';
import UserController from '../controllers/UserController';

const userRouter = Router();

userRouter.post('/login', UserController.login);
userRouter.post('/user', UserController.create);

export default userRouter;