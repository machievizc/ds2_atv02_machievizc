import { Router } from 'express';
import turmaController from '../controller/turma.controller'

class TurmaRoute {

    public router: Router;

    constructor() {
        this.router = Router();

        //Inicio as rotas de turma
        this.init();
    }

    private init(): void {
        //Rota raíz
        this.router.route('/')
            .get(turmaController.findAll)
            .post(turmaController.create);

        //Reta para um registro especificado pelo ID
        this.router.route('/:id([0-9]+)')
            .get(turmaController.findByID)
            .put(turmaController.update)
            .delete(turmaController.delete);
    }

}

export default new TurmaRoute().router;