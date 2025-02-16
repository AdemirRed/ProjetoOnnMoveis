import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import authMiddleware from './middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ProductController from './app/controllers/ProductController';

const routes = new Router();
const upload = multer(multerConfig);

// Rota para criar um novo usuário
routes.post('/usuarios', UserController.store);
// Rota para criar uma nova sessão
routes.post('/sessao', SessionController.store);


// Rota para criar um novo produto com upload de arquivo
routes.post('/produtos', upload.single('file'), ProductController.store);
// Rota para listar todos os produtos
routes.get('/produtos', authMiddleware,ProductController.index);

export default routes;