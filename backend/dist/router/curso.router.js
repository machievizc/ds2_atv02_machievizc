"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const curso_controller_1 = __importDefault(require("../controller/curso.controller"));
class CursoRoute {
    constructor() {
        this.router = express_1.Router();
        //Inicio as rotas de curso
        this.init();
    }
    init() {
        //Rota raíz
        this.router.route('/')
            .get(curso_controller_1.default.findAll)
            .post(curso_controller_1.default.create);
        //Reta para um registro especificado pelo ID
        this.router.route('/:id([0-9]+)')
            .get(curso_controller_1.default.findByID)
            .put(curso_controller_1.default.update)
            .delete(curso_controller_1.default.delete);
    }
}
exports.default = new CursoRoute().router;
//# sourceMappingURL=curso.router.js.map