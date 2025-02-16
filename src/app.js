import express from "express";
import routes from './routes';
import './database';
import { resolve } from 'node:path';

class App {
    constructor() {
        this.app = express();
        this.middlewares();
        this.routs();
    }

    middlewares() {
        // Middleware para parsear JSON
        this.app.use(express.json());
        // Middleware para servir arquivos estáticos
        this.app.use('/product-file', express.static(resolve(__dirname, '..', 'uploads')));
    }

    routs() {
        // Middleware para usar as rotas definidas
        this.app.use(routes);
    }
}

export default new App().app;