import { Router } from 'express';
import userRouter from './userRouter';
import menuRouter from './menuRouter';
import addressRouter from './addressRouter';
import orderRouter from './orderRouter';
import authRouter from './authRouter';


const router = Router();

router.use(authRouter);
router.use(userRouter);
router.use(menuRouter);
router.use(addressRouter);
router.use(orderRouter);

export default router;