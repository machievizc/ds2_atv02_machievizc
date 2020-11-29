import { Router } from 'express';
import faculdadeController from '../controller/faculdade.controller'

class FaculdadeRoute {

    public router: Router;

    constructor() {
        this.router = Router();

        //Inicio as rotas de faculdade
        this.init();
    }

    private init(): void {
        //Rota raíz
        this.router.route('/')
            .get(faculdadeController.findAll)
            .post(faculdadeController.create);

        //Reta para um registro especificado pelo ID
        this.router.route('/:id([0-9]+)')
            .get(faculdadeController.findByID)
            .put(faculdadeController.update)
            .delete(faculdadeController.delete);
    }

}

export default new FaculdadeRoute().router;