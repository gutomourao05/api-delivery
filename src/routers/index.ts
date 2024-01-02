import { Router } from 'express';
import userRouter from './userRouter';
import menuRouter from './menuRouter';
import addressRouter from './addressRouter';

const router = Router();

router.use(userRouter);
router.use(menuRouter);
router.use(addressRouter);

export default router;