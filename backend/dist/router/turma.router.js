"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const turma_controller_1 = __importDefault(require("../controller/turma.controller"));
class TurmaRoute {
    constructor() {
        this.router = express_1.Router();
        //Inicio as rotas de turma
        this.init();
    }
    init() {
        //Rota raíz
        this.router.route('/')
            .get(turma_controller_1.default.findAll)
            .post(turma_controller_1.default.create);
        //Reta para um registro especificado pelo ID
        this.router.route('/:id([0-9]+)')
            .get(turma_controller_1.default.findByID)
            .put(turma_controller_1.default.update)
            .delete(turma_controller_1.default.delete);
    }
}
exports.default = new TurmaRoute().router;
//# sourceMappingURL=turma.router.js.map