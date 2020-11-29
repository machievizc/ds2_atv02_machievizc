import express from 'express';
import cors from 'cors';
import {createServer, Server} from 'http';
import socketIO from 'socket.io';

import usuarioRoute from './router/usuario.router'
import cursoRoute from './router/curso.router'
import turmaRoute from './router/turma.router'
import faculdadeRoute from './router/faculdade.router'

export class App {
    private express: express.Application;
    private io: socketIO.Server;

    public server: Server;

    constructor() {
        this.express = express();

        this.middleware();
        this.socket();
        this.routes();
    }

    private middleware(): void {
        this.express.use(express.json());
        this.express.use(cors());
    }

    private socket(): void {
        this.server = createServer( this.express );
        this.io = socketIO(this.server);
    }

    private routes(): void {
        this.express.use((req, res, next) => {
            req.io = this.io;
            
            next();
        });

        this.express.use('/usuarios', usuarioRoute);
        this.express.use('/cursos', cursoRoute);
        this.express.use('/turmas', turmaRoute);
        this.express.use('/faculdades', faculdadeRoute);
    }

}

export default new App();