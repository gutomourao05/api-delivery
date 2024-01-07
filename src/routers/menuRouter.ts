import { Router } from 'express';
import { authRouteMiddleware } from '../middleware/authRouteMiddleware';
import MenuController from '../controllers/MenuController';
import multer from 'multer';
import { storage } from '../services/multerConfig';

const menuRouter = Router();
const upload = multer({storage: storage});

menuRouter.use(authRouteMiddleware);
menuRouter.post('/menu', upload.single('file'), MenuController.create);
menuRouter.get('/menu', MenuController.list);

export default menuRouter;