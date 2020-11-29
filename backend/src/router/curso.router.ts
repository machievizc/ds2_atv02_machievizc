import { Router } from 'express';
import cursoController from '../controller/curso.controller'

class CursoRoute {

    public router: Router;

    constructor() {
        this.router = Router();

        //Inicio as rotas de curso
        this.init();
    }

    private init(): void {
        //Rota raíz
        this.router.route('/')
            .get(cursoController.findAll)
            .post(cursoController.create);

        //Reta para um registro especificado pelo ID
        this.router.route('/:id([0-9]+)')
            .get(cursoController.findByID)
            .put(cursoController.update)
            .delete(cursoController.delete);
    }

}

export default new CursoRoute().router;