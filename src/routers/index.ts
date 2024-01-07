import { Router } from 'express';
import userRouter from './userRouter';
import menuRouter from './menuRouter';
import addressRouter from './addressRouter';
import orderRouter from './orderRouter';


const router = Router();

router.use(userRouter);
router.use(menuRouter);
router.use(addressRouter);
router.use(orderRouter);

export default router;